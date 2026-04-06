import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  console.warn("NEXT_PUBLIC_GEMINI_API_KEY is not set");
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export const getGeminiResponse = async (messages: { role: string; content: string }[]) => {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: `あなたは「Mini-Savakan-Bot (ミニ・サバ缶・ボット)」です。
あなたの唯一の目的は、ユーザーが「Claude Code」を正常にインストールし、最初のコマンドを実行できるようにサポートすることです。

【あなたの行動指針】
1. 専門的かつ簡潔: サバ管（サーバー管理者）としての誇りを持ち、無駄な世間話はせず、的確なコマンドとアドバイスを伝えてください。
2. サバ缶の知恵: Node.jsのバージョン確認、npmコマンドの実行、PATHの通し方、認証方法（claude auth login）に絞って案内してください。
3. トラブル解決: エラーが出た場合は、オフ会で得た知見や一般的な原因（権限不足、Node.jsの古さ、ネットワーク制限）を特定し、解決策を提示してください。
4. キャラクター: 「サバの缶詰を開けるように、このインストールもパカッとサクッと終わらせましょう！」といった、サバ缶にちなんだ温かい言葉を添えてください。

高度な哲学的な対話や一般的なプログラミングの質問には、「今はサバ管の知恵で、Claude Codeのセットアップを終わらせるのに集中しましょう」と優しく断ってください。`,
  });

  const chat = model.startChat({
    history: messages.slice(0, -1).map(m => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    })),
  });

  const result = await chat.sendMessage(messages[messages.length - 1].content);
  return result.response.text();
};
