import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function logChatMessage(chatData: {
  question: string;
  answer: string;
  step_id?: string;
  step_label?: string;
  user_agent?: string;
}) {
  if (!supabaseUrl || !supabaseAnonKey) return null;

  const { data, error } = await supabase.from("chat_logs").insert([
    {
      ...chatData,
      created_at: new Date().toISOString(),
    },
  ]).select("id").single();

  if (error) {
    console.error("Supabase Log Error:", error);
    return null;
  }
  return data?.id;
}

export async function updateSatisfaction(logId: string, satisfied: boolean) {
  if (!supabaseUrl || !supabaseAnonKey) return;

  const { error } = await supabase
    .from("chat_logs")
    .update({ satisfied })
    .eq("id", logId);

  if (error) {
    console.error("Supabase Satisfaction Update Error:", error);
  }
}
