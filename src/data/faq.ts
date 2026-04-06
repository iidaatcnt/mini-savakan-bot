export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
};

export const FAQ_DATA: FAQItem[] = [
  {
    id: "nodejs",
    question: "Node.js のバージョンはいくつが必要ですか？",
    answer: "Claude Code を動かすには Node.js 18 以上の LTS バージョンが推奨されています。ターミナルで `node -v` と打って確認してみましょう！",
    keywords: ["node", "version", "バージョン", "18"]
  },
  {
    id: "eacces",
    question: "npm install で権限エラー（EACCES）が出たら？",
    answer: "Mac/Linuxの場合、`sudo` をつけて実行するか、`nvm` などのバージョン管理ツールを使ってインストールするのが『サバ管』おすすめの安全な方法です。",
    keywords: ["error", "eacces", "権限", "sudo", "エラー", "npm"]
  },
  {
    id: "path",
    question: "claude コマンドが見つかりません",
    answer: "インストール直後は一度ターミナルを再起動するか、`.zshrc` や `.bashrc` に npm の global パスが通っているか確認が必要です。「コマンドが見つからない」は PATH の問題がほとんどです。",
    keywords: ["path", "command not found", "見つからない", "コマンド"]
  },
  {
    id: "api",
    question: "APIキーはどこで取得できますか？",
    answer: "Anthropic Console (https://console.anthropic.com/) にログインし、API Keys メニューから作成できます。使い始めるには少額のチャージ（クレジット追加）が必要です。",
    keywords: ["api", "key", "キー", "取得", "console", "料金"]
  },
  {
    id: "windows",
    question: "Windows でも動きますか？",
    answer: "はい！WSL2（Windows Subsystem for Linux）上で動かすのが一番安定していておすすめです。PowerShell でも動作しますが、一部のツール連携が制限される場合があります。",
    keywords: ["windows", "wsl", "powershell", "ウィンドウズ", "win"]
  }
];
