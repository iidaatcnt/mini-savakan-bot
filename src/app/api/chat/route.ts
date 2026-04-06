import { NextResponse } from "next/server";
import { getGeminiResponse } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { messages, stepId, stepLabel } = await req.json();

    const responseText = await getGeminiResponse(messages, stepId, stepLabel);

    return NextResponse.json({ role: "model", content: responseText });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}
