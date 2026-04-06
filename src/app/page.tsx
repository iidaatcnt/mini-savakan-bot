"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Send, 
  Bot, 
  User, 
  Search,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Package,
  Key,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { FAQ_DATA, FAQItem } from "@/data/faq";
import Image from "next/image";

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
      content: "こんにちは！「Mini-Savakan-Bot（ミニ・サバ缶・ボット）」です。\nサバ管の知恵を絞って、あなたの PC に Claude Code をパカッとインストールするお手伝いをします。\nまずは、お使いの OS（Windows, Mac, Linux）を教えてください！"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // FAQ State
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const filteredFaqs = FAQ_DATA.filter(faq => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      faq.question.toLowerCase().includes(query) || 
      faq.keywords.some(k => k.toLowerCase().includes(query))
    );
  });

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
      setMessages(prev => [...prev, { role: "model", content: "すみません、通信エラーが発生しました。もう一度お試しください。" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8 font-sans selection:bg-sky-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-4rem)]">
        
        {/* Left Column: Branding, Progress & FAQ */}
        <div className="lg:col-span-4 flex flex-col h-full overflow-hidden pb-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="shrink-0 mb-6"
          >
            <h1 className="text-3xl lg:text-4xl font-black mb-2 flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0 drop-shadow-md rounded-xl overflow-hidden border-2 border-sky-200">
                <Image 
                  src="/avatar.png" 
                  alt="Mini-Savakan-Bot Avatar" 
                  fill 
                  className="object-cover"
                />
              </div>
              <span className="saba-gradient drop-shadow-sm">Mini-Savakan</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm">Claude Code 導入支援 AI チャットボット</p>
          </motion.div>

          {/* Progress Steps Section */}
          <div className="space-y-3 mb-6 shrink-0">
            {STEPS.map((step, idx) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center gap-4 p-3 rounded-2xl transition-all ${
                  idx === currentStep ? "glass ring-1 ring-sky-500/50 bg-sky-50" : "opacity-60 bg-transparent"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  idx <= currentStep ? "bg-sky-500 text-white shadow-md shadow-sky-500/20" : "bg-slate-200 text-slate-400"
                }`}>
                  {idx < currentStep ? <CheckCircle2 className="w-5 h-5 text-white" /> : <step.icon className="w-4 h-4" />}
                </div>
                <div>
                  <p className={`font-bold text-sm ${idx === currentStep ? "text-sky-600" : "text-slate-500"}`}>
                    Step {idx + 1}: {step.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="flex-1 flex flex-col glass rounded-3xl border border-slate-200/60 overflow-hidden shadow-sm bg-white/50">
            <div className="p-4 border-b border-slate-200/60 bg-white/80 shrink-0">
              <div className="flex items-center gap-2 mb-4 text-sky-600">
                <BookOpen className="w-5 h-5" />
                <h2 className="font-bold">よくある質問の缶詰</h2>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="キーワードで検索 (例: エラー, path...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-sky-500/50 transition-shadow outline-none"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-300">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <div key={faq.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <button
                      onClick={() => setExpandedFaqId(expandedFaqId === faq.id ? null : faq.id)}
                      className="w-full px-4 py-3 text-left flex items-start justify-between gap-2 hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-medium text-sm text-slate-700 leading-tight">{faq.question}</span>
                      {expandedFaqId === faq.id ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedFaqId === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 pb-3"
                        >
                          <p className="text-sm text-slate-600 pt-2 border-t border-slate-100 leading-relaxed font-mono whitespace-pre-wrap">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400 text-sm">
                  <p>「{searchQuery}」の知見はまだありません。</p>
                  <p className="mt-1">チャットで直接聞いてみてください！</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Chat Interface */}
        <div className="lg:col-span-8 flex flex-col bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50 relative">
          
          {/* Chat Header */}
          <div className="p-4 md:p-6 border-b border-slate-100 bg-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-500/20" />
              <span className="font-bold text-slate-700">Terminal Ready</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-400/80 border border-rose-500/20" />
              <div className="w-3 h-3 rounded-full bg-amber-400/80 border border-amber-500/20" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/80 border border-emerald-500/20" />
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 bg-slate-50/50">
            <AnimatePresence initial={false}>
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                      m.role === "user" ? "bg-sky-500 text-white" : "bg-white border border-slate-200 text-sky-500"
                    }`}>
                      {m.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div className={`p-4 rounded-3xl shadow-sm ${
                      m.role === "user" 
                        ? "bg-sky-500 text-white rounded-tr-none" 
                        : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                    }`}>
                      <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base font-medium">{m.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-slate-100 shadow-sm flex gap-2">
                  <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 md:p-6 bg-white border-t border-slate-100 shrink-0">
            <div className="relative group shadow-sm rounded-2xl">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="メッセージを入力、またはエラー文をコピペ..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all placeholder:text-slate-400 text-slate-700 font-medium"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white hover:bg-sky-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group-focus-within:scale-105 shadow-sm"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-[0.2em] font-medium">
              Mini-Savakan-Bot supported by Gemini 1.5 Flash
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
