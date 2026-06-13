import fs from "fs";
import path from "path";
// @ts-ignore
import pdf from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { PineconeStore } from "@langchain/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

async function ingestResume() {
  try {
    console.log("Starting resume ingestion process...");

    // 1. Read PDF file
    const resumePath = path.resolve(__dirname, "../../M_S_Yashwanth_Kumar_Resume_JUNE.pdf");
    if (!fs.existsSync(resumePath)) {
      throw new Error(`Resume not found at ${resumePath}. Please make sure the PDF is present.`);
    }

    const dataBuffer = fs.readFileSync(resumePath);
    const pdfData = await pdf(dataBuffer);
    const textContent = pdfData.text;

    console.log(`Successfully extracted ${textContent.length} characters from PDF.`);

    // 2. Chunk content
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.createDocuments([textContent]);
    
    // Add metadata
    const documents = docs.map((doc) => new Document({
      pageContent: doc.pageContent,
      metadata: { source: "Yashwanth_Resume", type: "resume" },
    }));

    console.log(`Created ${documents.length} chunks from the resume.`);

    // 3. Initialize Pinecone and Embeddings
    if (!process.env.PINECONE_API_KEY || !process.env.GOOGLE_API_KEY || !process.env.PINECONE_INDEX) {
      throw new Error("Missing required environment variables (PINECONE_API_KEY, GOOGLE_API_KEY, PINECONE_INDEX)");
    }

    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });

    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

    const embeddings = new GoogleGenerativeAIEmbeddings({
      modelName: "embedding-001",
      apiKey: process.env.GOOGLE_API_KEY,
    });

    // 4. Store in vector database
    console.log("Storing embeddings in Pinecone...");
    await PineconeStore.fromDocuments(documents, embeddings, {
      pineconeIndex,
      textKey: "text",
    });

    console.log("Successfully ingested resume into Pinecone!");
  } catch (error) {
    console.error("Error during ingestion:", error);
    process.exit(1);
  }
}

// To run this script: npx ts-node scripts/ingest-resume.ts
if (require.main === module) {
  ingestResume();
}
