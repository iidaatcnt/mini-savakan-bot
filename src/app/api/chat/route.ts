import { NextResponse } from "next/server";
import { getGeminiResponse } from "@/lib/gemini";
import { logChatMessage } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { messages, stepId, stepLabel } = await req.json();
    const userQuestion = messages[messages.length - 1]?.content || "";

    const responseText = await getGeminiResponse(messages, stepId, stepLabel);

    // ログを保存しIDを取得 (同期的に待つ)
    const logIdResult = await logChatMessage({
      question: userQuestion,
      answer: responseText,
      step_id: stepId,
      step_label: stepLabel
    });

    return NextResponse.json({ role: "model", content: responseText, logId: logIdResult });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error?.message || "Unknown error occurred in API" }, { status: 500 });
  }
}
