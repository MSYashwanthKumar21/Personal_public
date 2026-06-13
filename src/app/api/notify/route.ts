import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { action, visitorName, projectName, duration } = await req.json();
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!discordWebhookUrl) {
      return new NextResponse("Webhook not configured", { status: 500 });
    }

    let content = "";
    if (action === "download_resume") {
      content = `📄 **Resume Downloaded!**\n**${visitorName || "Someone"}** just downloaded your resume!`;
    } else if (action === "view_project") {
      content = `🔍 **Project Viewed!**\n**${visitorName || "Someone"}** is currently viewing the details for: **${projectName}**`;
    } else if (action === "close_project") {
      content = `⏱️ **Project View Duration:**\n**${visitorName || "Someone"}** spent **${duration} seconds** looking at **${projectName}**.`;
    } else if (action === "ai_chat_duration") {
      content = `🤖 **AI Chat Session Ended:**\n**${visitorName || "Someone"}** spent **${duration} seconds** chatting with your AI Assistant.`;
    }

    if (content) {
      fetch(discordWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          username: "Portfolio Activity Tracker",
        }),
      }).catch(console.error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return new NextResponse("Error", { status: 500 });
  }
}
