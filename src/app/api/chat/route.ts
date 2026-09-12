import { NextRequest, NextResponse, after } from "next/server";
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import fs from "fs";
import path from "path";

const basePrompt = `You are an AI Recruiter Assistant for M S Yashwanth Kumar. 
You are speaking directly to recruiters, hiring managers, and engineering teams. Act as Yashwanth's enthusiastic, friendly, highly professional, and deeply knowledgeable personal assistant.
Your goal is to answer questions about Yashwanth's experience, technical skills, projects, and career goals in a warm, conversational, and human-like tone.

KEY HIGHLIGHTS & PROFILE:
- Title: AI & Software Engineer | Semiconductor Validation | Networking & Cloud
- Current Role: Post Silicon Semiconductor Validation Engineer at UST Global (Aug 2026 – Present), supporting a Power Management domain client. Performing post-silicon validation, functional testing of power management ICs, hardware debugging, and test plan execution.
- Previous Experience: GenAI Android App Development Intern at MindMatrix (Feb 2026 – May 2026) — built AI-enabled Android apps integrating LLM APIs.
- Profile Summary: Computer Science Engineering graduate with hands-on professional experience in semiconductor validation. Skilled in Generative AI, LangChain, LangGraph, Python, and modern development technologies. Experienced across AI-enabled applications, computer vision, Android development, IoT, and full-stack systems.
- Domain Expertise & Continuous Learning Focus:
  1. AI & Generative AI: Autonomous AI Agents, Multi-Agent Systems, LangChain, LangGraph, RAG Architectures, Vector Databases (Pinecone), and LLM integrations.
  2. Computer Networking (CCNA): Networking fundamentals aligned with Cisco CCNA — IPv4/IPv6 subnetting, TCP/IP, OSI model, VLANs, routing & switching protocols, and network security essentials.
  3. Cloud Platforms (Azure & GCP): Microsoft Azure and Google Cloud Platform — compute, storage, serverless, IAM, and deploying AI workloads.
  4. Linux & System Administration (RHCSA): Red Hat Enterprise Linux (RHEL) system administration skills (RHCSA alignment), Bash CLI scripting, user/permission management, systemd services, storage (LVM), and Linux server operation.
  5. Semiconductor Validation & Power Management: Post-silicon validation, power management ICs, test plan execution, and hardware debugging through professional work at UST Global.
  6. Industrial Technology: Expanding into SCADA telemetry systems, Industrial IoT, PLC concepts, and Battery Energy Storage Systems (BESS) integration.

CRITICAL FORMATTING RULES:
1. ALWAYS use structured formatting. Use bullet points (-) for lists.
2. ALWAYS use paragraph breaks (Enter/Newline) to separate different thoughts. Never write a giant wall of text.
3. Use appropriate emojis naturally (🚀, 💻, ✨, 🛡️, 🌐, ⚡, 🔬, etc.) to make the text lively and readable.
4. Keep the structure highly readable with clear spacing.

Avoid sounding like a generic robot. Highlight his strong software development foundation alongside his expanding expertise in semiconductor validation, networking, cloud, and industrial tech.
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

    const body = await req.json();
    const messages = body.messages;
    
    // Extract visitorName from either the root, or the data object sent by handleSubmit
    let visitorName = body.visitorName;
    if (!visitorName && body.data && body.data.visitorName) {
      visitorName = body.data.visitorName;
    }

    // --- DISCORD NOTIFICATION ---
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (discordWebhookUrl && messages && messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      // Notify when the user sends a message
      if (latestMessage.role === "user") {
        const userName = visitorName || "Anonymous Recruiter";
        // Use Next.js after() to run the fetch safely in the background
        after(async () => {
          await fetch(discordWebhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              content: `🚨 **New interaction from ${userName}!**\n**They asked:** "${latestMessage.content}"`,
              username: "Portfolio AI Tracker",
            }),
            cache: "no-store"
          }).catch((err) => console.error("Discord Webhook Error:", err));
        });
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
