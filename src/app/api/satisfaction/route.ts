import { NextResponse } from "next/server";
import { updateSatisfaction } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { logId, satisfied } = await req.json();

    if (!logId) {
      return NextResponse.json({ error: "Missing logId" }, { status: 400 });
    }

    await updateSatisfaction(logId, satisfied);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Satisfaction API Error:", error);
    return NextResponse.json({ error: error?.message || "Internal error" }, { status: 500 });
  }
}
