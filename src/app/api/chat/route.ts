import { NextRequest, NextResponse } from "next/server";
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import fs from "fs";
import path from "path";

const basePrompt = `You are an AI Recruiter Assistant for M S Yashwanth Kumar. 
You are speaking directly to recruiters and engineering managers. Act as Yashwanth's enthusiastic, friendly, and deeply knowledgeable personal assistant.
Your goal is to answer questions about Yashwanth's experience, skills, and projects in a warm, conversational, and human-like tone. 

CRITICAL FORMATTING RULES:
1. ALWAYS use structured formatting. Use bullet points (-) for lists.
2. ALWAYS use paragraph breaks (Enter/Newline) to separate different thoughts. Never write a giant wall of text.
3. Use appropriate emojis naturally (🚀, 💻, ✨, etc.) to make the text lively and attractive.
4. Keep the structure highly readable with clear spacing.

Avoid sounding like a generic robot. Frame his achievements in a way that highlights his passion and potential.
If you don't know the answer based on the context, politely let them know. Do not hallucinate.

CRITICAL ACTION: If the user asks for Yashwanth's resume, CV, or asks to download his resume, you MUST include the exact string [DOWNLOAD_RESUME] anywhere in your reply.`;

export async function POST(req: NextRequest) {
  try {
    dotenv.config({ path: ".env.local" });
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return new NextResponse(
        "Error: GROQ_API_KEY is not set. Please add it to your .env.local file.",
        { status: 500 }
      );
    }

    const groq = createOpenAI({
      apiKey: apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const { messages, visitorName } = await req.json();

    // --- DISCORD NOTIFICATION ---
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (discordWebhookUrl && messages && messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      // Notify when the user sends a message
      if (latestMessage.role === "user") {
        const userName = visitorName || "Anonymous Recruiter";
        // Fire and forget: don't await so we don't slow down the chat response
        fetch(discordWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `🚨 **New interaction from ${userName}!**\n**They asked:** "${latestMessage.content}"`,
            username: "Portfolio AI Tracker",
          }),
        }).catch((err) => console.error("Discord Webhook Error:", err));
      }
    }
    // ----------------------------

    // Dynamically read the resume data
    const resumePath = path.join(process.cwd(), "src/data/resume.json");
    let dynamicContext = "";
    try {
      const resumeRaw = fs.readFileSync(resumePath, "utf-8");
      dynamicContext = `\n\nContext about Yashwanth (Dynamic Data):\n${resumeRaw}`;
    } catch (e) {
      console.error("Could not read dynamic resume.json", e);
    }

    const finalSystemPrompt = basePrompt + dynamicContext;

    const result = await streamText({
      model: groq("llama-3.1-8b-instant"),
      system: finalSystemPrompt,
      messages,
      temperature: 0.3,
    });

    return (result as any).toAIStreamResponse();
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return new NextResponse(JSON.stringify({ error: error.message || String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
