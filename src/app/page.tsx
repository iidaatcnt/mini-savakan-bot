"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Send, 
  Bot, 
  User, 
  CheckCircle2, 
  Circle, 
  AlertCircle,
  Package,
  Key,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

type Message = {
  role: "user" | "model";
  content: string;
};

const STEPS = [
  { id: "env", label: "環境診断", icon: Terminal },
  { id: "install", label: "インストール", icon: Package },
  { id: "auth", label: "認証設定", icon: Key },
  { id: "ready", label: "準備完了", icon: ShieldCheck },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: "こんにちは！「Mini-Savakan-Bot（ミニ・サバ缶・ボット）」です。サバ管の知恵を絞って、あなたの PC に Claude Code をパカッとインストールするお手伝いをします。まずは、お使いの OS と Node.js のバージョンを教えてください！"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      const data = await res.json();
      if (data.content) {
        setMessages(prev => [...prev, { role: "model", content: data.content }]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 p-4 md:p-8 font-sans selection:bg-sky-500/30">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-4rem)]">
        
        {/* Left Column: Progress & Identity */}
        <div className="lg:col-span-4 flex flex-col justify-between py-4">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
                <span className="saba-gradient text-5xl">🥫</span>
                <span className="saba-gradient">Mini-Savakan-Bot</span>
              </h1>
              <p className="text-slate-400 font-medium">Claude Code 導入支援 AI チャットボット</p>
            </motion.div>

            <div className="space-y-6">
              {STEPS.map((step, idx) => (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    idx === currentStep ? "glass ring-1 ring-sky-500/50 bg-sky-500/5" : "opacity-50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    idx <= currentStep ? "bg-sky-500 text-white" : "bg-slate-800 text-slate-500"
                  }`}>
                    {idx < currentStep ? <CheckCircle2 className="w-6 h-6 text-white" /> : <step.icon className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className={`font-bold ${idx === currentStep ? "text-sky-400" : "text-slate-300"}`}>
                      Step {idx + 1}: {step.label}
                    </p>
                    {idx === currentStep && (
                      <p className="text-xs text-slate-500 mt-1">セットアップ実行中...</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass p-6 rounded-3xl mt-8 border-sky-500/10">
            <h3 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">SysAdmin Tip</h3>
            <p className="text-sm text-slate-300 leading-relaxed italic truncate">
              "インストールに迷ったら、まずは node -v で環境の鮮度を確認しましょう。"
            </p>
          </div>
        </div>

        {/* Right Column: Chat Interface */}
        <div className="lg:col-span-8 flex flex-col glass rounded-[2.5rem] overflow-hidden border-white/5 shadow-2xl relative">
          
          {/* Chat Header */}
          <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-bold text-slate-200">Terminal Session Active</span>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/20" />
              <div className="w-3 h-3 rounded-full bg-green-400/20" />
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
            <AnimatePresence initial={false}>
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                      m.role === "user" ? "bg-sky-500" : "bg-slate-800 border border-white/10"
                    }`}>
                      {m.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-sky-400" />}
                    </div>
                    <div className={`p-4 rounded-3xl ${
                      m.role === "user" 
                        ? "bg-sky-600 text-white rounded-tr-none" 
                        : "bg-slate-800/50 text-slate-200 rounded-tl-none border border-white/5"
                    }`}>
                      <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{m.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800/50 p-4 rounded-3xl rounded-tl-none border border-white/5 flex gap-2">
                  <span className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-sky-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 bg-sky-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-6 bg-white/5 border-t border-white/5">
            <div className="relative group">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="メッセージを入力するか、エラーをコピペしてください..."
                className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all placeholder:text-slate-600"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white hover:bg-sky-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group-focus-within:scale-105"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-600 mt-4 uppercase tracking-[0.2em]">
              Mini-Savakan-Bot supported by Gemini 1.5 Flash
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
