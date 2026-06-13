import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";

// Initialize Pinecone Client
export const getPineconeClient = () => {
  if (!process.env.PINECONE_API_KEY) {
    throw new Error("PINECONE_API_KEY is not set");
  }
  
  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
};

// Get the Vector Store
export const getVectorStore = async (indexName: string) => {
  const pinecone = getPineconeClient();
  const index = pinecone.Index(indexName);
  
  const embeddings = new GoogleGenerativeAIEmbeddings({
    modelName: "embedding-001", // Or suitable Gemini embedding model
    apiKey: process.env.GOOGLE_API_KEY,
  });

  return await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
    textKey: "text",
  });
};
