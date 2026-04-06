# 🥫 Mini-Savakan-Bot (ミニ・サバ缶・ボット)

> **「サバ管（Server Admin）」の知恵が詰まった、世界一パカッと開ける Claude Code 導入支援 AI。**

## 🌟 プロジェクト概要
このボットは、Anthropic 社の強力な CLI ツール「Claude Code」を、Windows、Mac、Linux の各環境にスムーズに導入することを目的としています。

単なるチャットボットではなく、何百人ものエンジニアをサポートしてきた「サバ管」さんの経験（オフ会でのQ&A知見）を Gemini 1.5 Flash に注入。インストール時の「躓き」を一瞬で解決することに特化しています。

## 🛠️ 技術スタック
- **Frontend**: [Next.js (App Router)](https://nextjs.org/)
- **AI Brain**: [Gemini 1.5 Flash](https://ai.google.dev/gemini-api)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 はじめかた
### 1. リポジトリをクローン
```bash
git clone https://github.com/iidaatcnt/mini-savakan-bot.git
cd mini-savakan-bot
```

### 2. 依存関係のインストール
```bash
npm install
```

### 3. 環境変数の設定
`.env.local` ファイルを作成し、Gemini API キーを設定してください。
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. 開発サーバーの起動
```bash
npm run dev
```

## 🥫 サバ管（SysAdmin）からのメッセージ
「インストールで迷ったら、まずは缶詰の蓋を開ける心意気で `node -v` を打ちましょう。鮮度の高い環境が、最高の Claude Code 体験を約束します。」

---
Powered by **Mini-Savakan AI Architecture**.
