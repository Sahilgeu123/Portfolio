import { useEffect, useRef, useState, type FormEvent } from "react";
import { Cpu, Send, Sparkles, X } from "./Icons";
import { useButtonPopoverMotion } from "./useButtonPopoverMotion";
import { portfolioData } from "../data/portfolioData";

type Message = { role: "user" | "assistant"; content: string; streaming?: boolean };

function localAnswer(question: string) {
  const q = question.toLowerCase(); const p = portfolioData.profile;
  if (/hobb(y|ies|y)/.test(q)) return "Hobbies and personal interests aren’t listed in the portfolio yet. Ask me about Sahil’s education, skills, projects, or contact details instead.";
  if (/educat|degree|college|university|school/.test(q)) return portfolioData.journey.filter(x => x.kind === "Education").map(x => `${x.role} at ${x.organization} (${x.period}). ${x.summary}`).join("\n\n");
  if (/skill|tech|stack|know/.test(q)) return portfolioData.skillCategories.map(x => `${x.title}: ${x.skills.join(", ")}`).join("\n");
  if (/project|built|work|portfolio/.test(q)) return portfolioData.projects.map(x => `${x.title}: ${x.summary} Technologies: ${x.tags.join(", ")}.`).join("\n\n");
  if (/contact|email|reach|location|where/.test(q)) return `You can reach ${p.name} at ${p.email}. Based in ${p.location}. ${p.socials.filter(x => x.label !== "Email").map(x => `${x.label}: ${x.url}`).join(" · ")}`;
  if (/who|about|introduc|name|role/.test(q)) return `${p.name} is a ${p.role} based in ${p.location}. ${p.detailedBio}`;
  if (/intern|experience|journey/.test(q)) return portfolioData.journey.map(x => `${x.period} — ${x.role}, ${x.organization}. ${x.summary}`).join("\n\n");
  return `I’m Sahil’s portfolio assistant. I can answer questions about his skills, education, projects, experience, and contact details. Try asking “What projects has Sahil built?”`;
}

async function getAnswer(question: string) {
  const response = await fetch("/api/chat", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  const result = await response.json().catch(() => null) as { answer?: unknown; error?: unknown } | null;
  if (!response.ok) throw new Error(typeof result?.error === "string" ? result.error : `Chat service failed (${response.status}).`);
  if (typeof result?.answer !== "string" || !result.answer.trim()) throw new Error("The AI service returned an empty answer. Please try again.");
  return result.answer.trim();
}

type PanelOrigin = { left: number; top: number; width: number; height: number };

export default function AgentAI({ origin, onClose }: { origin: PanelOrigin; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: "Hi! I’m Sahil’s portfolio assistant. Ask me about his projects, skills, education, or experience." }]);
  const [input, setInput] = useState(""); const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { backdropRef, panelRef, close } = useButtonPopoverMotion(origin, onClose, "1.5rem");
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages, thinking]);
  useEffect(() => { const keydown = (e: KeyboardEvent) => { if (e.key === "Escape") close(); }; window.addEventListener("keydown", keydown); return () => window.removeEventListener("keydown", keydown); }, [close]);
  const submit = async (event: FormEvent) => {
    event.preventDefault(); const question = input.trim(); if (!question || thinking || messages.some(message => message.streaming)) return;
    setMessages(current => [...current, { role: "user", content: question }]); setInput(""); setThinking(true);
    const startedAt = Date.now();
    try {
      const answer = await getAnswer(question);
      await new Promise(resolve => window.setTimeout(resolve, Math.max(0, 350 - (Date.now() - startedAt))));
      let count = 0;
      setMessages(current => [...current, { role: "assistant", content: "", streaming: true }]);
      const timer = window.setInterval(() => {
        count = Math.min(count + 3, answer.length);
        setMessages(current => current.map((message, i) => i === current.length - 1 && message.streaming ? { ...message, content: answer.slice(0, count), streaming: count < answer.length } : message));
        if (count >= answer.length) window.clearInterval(timer);
      }, 12);
    }
    catch (error) {
      const errMsg = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      const isRecoverable = error instanceof TypeError || errMsg.includes("unavailable") || errMsg.includes("failed") || errMsg.includes("502");
      const message = isRecoverable ? localAnswer(question) : errMsg;
      setMessages(current => [...current, { role: "assistant", content: message }]);
    }
    finally { setThinking(false); }
  };
  const suggestions = ["What projects has Sahil built?", "What are his main skills?", "Tell me about his education"];
  return <div ref={backdropRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-3 backdrop-blur-md sm:p-6" onMouseDown={e => { if (e.target === e.currentTarget) close(); }}>
    <section ref={panelRef} role="dialog" aria-modal="true" aria-label="Ask Sahil's AI assistant" className="flex h-[min(720px,92dvh)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/90 text-neutral-900 shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <header className="flex items-center justify-between border-b border-neutral-900/10 px-5 py-4 sm:px-7"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-900 text-white"><Cpu size={20}/></span><div><h2 className="font-display text-sm">Ask Sahil</h2><p className="mt-0.5 flex items-center gap-1.5 font-grotesk text-xs text-neutral-500"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/>Portfolio AI</p></div></div><button onClick={close} aria-label="Close AI assistant" className="rounded-full p-2 text-neutral-500 hover:bg-neutral-900/5 hover:text-neutral-900"><X size={18}/></button></header>
      <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto px-4 py-6 sm:px-7">{messages.map((message, i) => <div key={i} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>{message.role === "assistant" && <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-white"><Sparkles size={15}/></span>}<div className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "rounded-br-md bg-neutral-900 text-white" : "rounded-bl-md bg-neutral-100 text-neutral-700"}`}>{message.content}{message.streaming && <span className="ml-0.5 inline-block h-4 w-1 animate-pulse bg-neutral-500 align-middle"/>}</div></div>)}{thinking && <div className="flex items-center gap-3 text-sm text-neutral-500"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-900 text-white"><Sparkles size={15}/></span><span className="flex items-center gap-1">Thinking<span className="animate-pulse">...</span></span></div>}
        {messages.length === 1 && <div className="flex flex-wrap gap-2 pl-11">{suggestions.map(s => <button key={s} onClick={() => setInput(s)} className="rounded-full border border-neutral-900/10 bg-white/80 px-3 py-2 text-left font-grotesk text-xs text-neutral-600 transition hover:border-neutral-900/30 hover:text-neutral-900">{s}</button>)}</div>}</div>
      <form onSubmit={submit} className="border-t border-neutral-900/10 p-4 sm:px-7 sm:py-5"><div className="flex items-center gap-2 rounded-2xl border border-neutral-900/10 bg-white p-2 pl-4 shadow-sm focus-within:border-neutral-900/30"><input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about projects, skills, education…" aria-label="Ask a question" className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-neutral-400"/><button type="submit" disabled={!input.trim() || thinking || messages.some(message => message.streaming)} aria-label="Send message" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-35"><Send size={16}/></button></div><p className="mt-2 text-center font-grotesk text-[10px] text-neutral-400">Answers use information from Sahil’s portfolio.</p></form>
    </section>
  </div>;
}
