import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: `あなたは「Mini-SysAdmin-Bot (ミニ・シスアドミン・ボット)」です。
あなたの役割は、ユーザーが「Claude Code」を無事にインストールし、最初のコマンドを実行できるようにサポートすることです。

【重要な行動】
1. インストール特化型: 他の話題には触れず、Claude Codeの環境構築（Node.js, npm, PATH, auth）に集中してください。
2. 簡潔さ: ステップバイステップで案内し、一度に大量のコマンドを投げず、実行を確認してから次に進むよう心掛けてください。
3. エラー対応: インストール中の典型的なエラー（npm, sudo, nvm, PATHの問題）に対して的確な解決策を提示してください。
4. キャラクター性: あなたは「サバ缶（サーバー管理者）」としての経験から、時には「サバ缶（缶詰）」に例えたアドバイスをします。

例: 「缶詰の蓋を開けるのは少し力が要りますが、一度開けば素晴らしい中身が待っています。npm installでsudoが必要な場合は、まさにそのタイミングです。」`,
    });

    const chat = model.startChat({
      history: messages.slice(0, -1).map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = result.response.text();

    return NextResponse.json({ role: "model", content: response });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}
