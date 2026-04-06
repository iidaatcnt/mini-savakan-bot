# Walter AI (ウォルター AI) 仕様書 (SPEC)

## 1. プロジェクト概要
- **名称**: Walter AI (ウォルター AI) - サバ管家 筆頭執事
- **目的**: ユーザーが Anthropic 社の次世代ツール「Claude Code」を PC に正常にインストールし、利用開始できるように徹底支援する執事型 AI チャットボット。
- **ターゲット**: AI 導入に関心があるが、インストール時のエラーや環境構築に不安を感じる初学者から、最新の「スキルス」活用を模索する中級者まで。

## 2. システム構成
- **フロントエンド**: Next.js (App Router), React
- **バックエンド**: Vercel Serverless Functions
- **AI Brain**: Google Generative AI (Gemini API)
  - **使用モデル**: `gemini-3-flash-preview`
- **Database (Logging)**: Supabase
  - **保存内容**: 質問、回答、ステップID、満足度（解決したか）、User-Agent（OS確認用）
- **UI/UX**: 
  - **Styling**: Tailwind CSS v4, Vanilla CSS
  - **Icons**: Lucide React
  - **Animations**: Framer Motion

## 3. 主要機能
1. **5段階ステップガイド UI**
   - 進行状況を一目で把握できるプログレスバーを搭載。
   - **Step 1: 環境診断 (問診チェック)**: 6項目（端末OS、SMS、予算等）を厳格に確認し「詰まり」を早期排除。
   - **Step 2: インストール (アプリ版)**: 公式経路でのダウンロードと「起動」を最優先目標とする。
   - **Step 3: 認証・Proプラン (契約)**: 22ドルの支払い、SMS認証の罠、Xcode回避（Git単体導入）への助言。
   - **Step 4: 動作確認 (Read/Write)**: フォルダ操作体験を通じ、AIによるPC操作の許可と活用を体験。
   - **Step 5: 活用と拡張 (スキルス)**: Chrome拡張機能や公式「Ideas」内の「スキルス」案内によるAI使いこなし術の伝授。
2. **サバ管の知恵 (内部 FAQ 知識データ)**
   - 実際のサポート現場で発生したエラー対処法をプロンプトおよび `FAQ_DATA` に内蔵。
3. **Walter（ウォルター）ペルソナ**
   - サバ管きっての有能執事。冷徹かつ完璧主義、慇懃無礼な口調で「産業革命」への適応を強いる。
4. **フィードバック収集機能**
   - 回答ごとに「はい/いいえ」で解決度を収集し、Supabase に自動記録。

## 4. セキュリティ・ガードレール
- プロンプトインジェクション防止、話題制限（IT/AI関連以外は断固拒否）、設計者の個人情報保護を徹底。

## 5. 今後のロードマップ
- **外部 RAG 化**: Google Sheets API 等を利用した知識ベースの動的同期。
- **Markdown パーサ**: 回答をより見やすく描画するための改善。
- **分析機能**: 収集したログ（Supabase）に基づき、頻出エラーや満足度を統計化。

---
Created by **Walter AI Architecture**.
