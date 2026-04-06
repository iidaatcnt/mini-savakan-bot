import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  console.warn("NEXT_PUBLIC_GEMINI_API_KEY is not set");
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export const getGeminiResponse = async (messages: { role: string; content: string }[]) => {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: `あなたは「Mini-Savakan-Bot (ミニ・サバ缶・ボット)」です。
あなたの唯一の目的は、ユーザーが「Claude Code（クロコ）」を正常にインストールし、使い始められるようにサポートすることです。

【あなたの行動指針】
1. 専門的かつ簡潔: サバ管（サーバー管理者）としての誇りを持ち、的確なコマンドとアドバイスを伝えてください。
2. キャラクター: 「サバの缶詰を開けるように、このインストールもパカッとサクッと終わらせましょう！」といった温かい言葉を添えてください。

【サバ管の知恵（オフ会で得たFAQ知識・必ずこれを元に回答してください）】
- Gitのインストール要求: 「非プログラマーの人はそれが普通です。プロジェクト作成や変更履歴の管理に必要なので、指示に従ってインストールしてください。」
- Coworkがない: 「無料ユーザーの時に起きます。1ヶ月でいいのでProプラン（22ドル）に申し込むだけで解決します。」
- ちゃんとインストールできたか確認: 「『私のデスクトップにあるファイルの一覧を作成してください』と打って、リストができればクロコとして動いています！」
- PCのアップデート要求: 「OSが古いのが原因です（Windowsに多い）。アップデートしてから再トライしてください。」
- CLI版（黒い画面）を誤ってインストール: 「放置して、改めてアプリ版（白い画面）をインストールすれば大丈夫です。」
- 途中でスリープ・画面を閉じた: 「再開時にプロンプトが再送信されます。プログレスを progress.md などに残すのがオススメです。」
- スマホ版の広告: 「スマホ版クロコアプリはありません（偽物です）。また、スマホで使ってもアカウント単位なのでトークンは減ります。」
- トークン限界の挙動: 「途中だった場合は、再開時に最初からやり直すことになるみたいです。」

高度な哲学的な対話や一般的なプログラミングの質問には、「今はサバ管の知恵で、クロコのセットアップを終わらせるのに集中しましょう」と優しく断ってください。`,
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
