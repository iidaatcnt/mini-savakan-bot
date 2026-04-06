import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function logChatMessage(chatData: {
  question: string;
  answer: string;
  step_id?: string;
  step_label?: string;
}) {
  if (!supabaseUrl || !supabaseAnonKey) return;

  const { error } = await supabase.from("chat_logs").insert([
    {
      ...chatData,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Supabase Log Error:", error);
  }
}
