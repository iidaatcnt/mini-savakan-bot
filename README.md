# 🥫 Walter AI (ウォルター AI) - サバ管家 筆頭執事

> **「サバ管（Server Admin）」の知恵を宿した、死神の如き正確さで Claude Code 導入を完遂させる執事 AI。**

## 🌟 プロジェクト概要
このボットは、Anthropic 社の強力な次世代ツール「Claude Code」を、Windows、Mac の各環境にスムーズに導入することを目的としています。

単なるチャットボットではなく、何百人ものエンジニアをサポートしてきた「サバ管」様の経験（オフ会でのQ&A知見）を **Gemini 1.5 Flash (Preview)** に注入。「サバ管家」の筆頭執事 **ウォルター** が、インストール時の「躓き」を一瞬で解決することに特化しています。

## 🛠️ 技術スタック
- **Frontend**: [Next.js (App Router)](https://nextjs.org/)
- **AI Brain**: [Gemini 1.5 Flash (gemini-3-flash-preview)](https://ai.google.dev/gemini-api)
- **Database (Logging)**: [Supabase](https://supabase.com/)
- **Branding**: サバ管家 筆頭執事 ウォルター (Persona)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 機能の特徴
1. **5段階ステップガイド**:
   - Step 1: 環境診断 (問診チェック)
   - Step 2: インストール (アプリ版への誘導)
   - Step 3: 認証・Proプラン (SMS認証・Git単体導入)
   - Step 4: 動作確認 (Read/Write 権限の体験)
   - Step 5: 活用と拡張 (Claude for Chrome, Ideas/Skills)
2. **懃懃無礼な徹底サポート**: ウォルター執事による冷徹かつ有能なガイダンス。
3. **FAQ 缶詰**: 過去のオフ会で蓄積されたエラー対処法を内蔵。
4. **満足度フィードバック**: 回答ごとに解決したかどうかを収集し、継続的に改善。

## 🚀 セットアップ
### 1. 環境変数の設定
`.env.local` ファイルを作成し、必要なキーを設定してください。
```env
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. 開発サーバーの起動
```bash
npm install
npm run dev
```

## 📚 ドキュメント構成
- [`README.md`](./README.md): プロジェクト概要
- [`SPEC.md`](./SPEC.md): 詳細仕様 (ペルソナ・技術構成・全ステップ詳細)
- [`progress.md`](./progress.md): 開発進捗と完了済みタスク

---
Powered by **Walter AI Architecture** (Supported by Gemini 1.5 Flash).
