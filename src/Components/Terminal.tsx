import { useEffect, useRef, useState, type FormEvent } from "react";
import { portfolioData } from "../data/portfolioData";
import { X, Terminal as TerminalIcon } from "./Icons";
import { useButtonPopoverMotion } from "./useButtonPopoverMotion";

type Line = { command?: string; output: string[] };
const files = ["about.txt", "education.txt", "hobbies.txt", "projects/", "skills/", "contact.txt", "README.md"];
const help = ["help                 show available commands", "ls, dir              list files", "tree                 show portfolio tree", "cd <folder>          navigate portfolio folders", "cat <file>           read a portfolio file", "read <file>          alias for cat", "whoami               show profile summary", "clear                clear terminal", "exit                 close terminal"];

function readFile(path: string) {
  const name = path.replace(/^\.\//, "").toLowerCase();
  if (["about.txt", "about", "readme.md", "readme"].includes(name)) return [portfolioData.profile.detailedBio, `Role: ${portfolioData.profile.role}`, `Location: ${portfolioData.profile.location}`];
  if (["education.txt", "education"].includes(name)) return portfolioData.journey.filter(item => item.kind === "Education").flatMap(item => [`${item.period} · ${item.role}`, item.organization, ...item.highlights.map(h => `  • ${h}`)]);
  if (["hobbies.txt", "hobbies"].includes(name)) return ["Hobbies and personal interests aren’t listed in the portfolio yet."];
  if (["contact.txt", "contact"].includes(name)) return [`Email: ${portfolioData.profile.email}`, `Location: ${portfolioData.profile.location}`, ...portfolioData.profile.socials.map(s => `${s.label}: ${s.url}`)];
  if (["projects", "projects/"].includes(name)) return portfolioData.projects.map(p => `${p.title} (${p.year}) — ${p.summary}`);
  if (["skills", "skills/"].includes(name)) return portfolioData.skillCategories.flatMap(c => [`${c.title}:`, `  ${c.skills.join(", ")}`]);
  return null;
}

type PanelOrigin = { left: number; top: number; width: number; height: number };

export default function Terminal({ origin, onClose }: { origin: PanelOrigin; onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>([{ output: ["SAHIL PORTFOLIO · interactive shell", "Type `help` to explore. Try `ls`, `tree`, `cat about.txt`, or `cat projects`.", ""] }]);
  const [value, setValue] = useState("");
  const [cwd, setCwd] = useState("~");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { backdropRef, panelRef, close } = useButtonPopoverMotion(origin, onClose, "1rem");
  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [lines]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key);
  }, [close]);

  const run = (raw: string) => {
    const command = raw.trim(); if (!command) return;
    const [cmd, ...args] = command.split(/\s+/); const target = args.join(" ");
    let output: string[];
    switch (cmd.toLowerCase()) {
      case "help": case "--help": output = help; break;
      case "ls": case "dir": output = files; break;
      case "tree": output = [".", "├── about.txt", "├── education.txt", "├── hobbies.txt", "├── projects/", ...portfolioData.projects.map((p, i) => `${i === portfolioData.projects.length - 1 ? "│   └── " : "│   ├── "}${p.id}/`), "├── skills/", "├── contact.txt", "└── README.md"]; break;
      case "pwd": output = [`/home/sahil${cwd === "~" ? "" : `/${cwd.slice(2)}`}`]; break;
      case "whoami": output = [`${portfolioData.profile.name} — ${portfolioData.profile.role}`, portfolioData.profile.tagline]; break;
      case "clear": setLines([]); return;
      case "exit": case "quit": onClose(); return;
      case "cd": {
        if (!target || target === "~" || target === "/") { setCwd("~"); output = []; break; }
        if (target === "..") { setCwd("~"); output = []; break; }
        if (["projects", "skills"].includes(target)) { setCwd(`~/${target}`); output = []; break; }
        output = [`cd: no such directory: ${target}`]; break;
      }
      case "cat": case "read": {
        const file = target || "";
        if (cwd === "~/projects" && !file.includes("/") && file) {
          const project = portfolioData.projects.find(p => p.id === file.replace(/\/$/, "") || p.title.toLowerCase().includes(file.toLowerCase()));
          output = project ? [project.title, project.description, `Stack: ${project.tags.join(", ")}`, `Live: ${project.liveUrl}`] : [`cat: ${file}: file not found`]; break;
        }
        const content = readFile(file);
        output = content ?? [`cat: ${file || ""}: file not found. Try ls to see available files.`]; break;
      }
      case "echo": output = [target]; break;
      default: output = [`${cmd}: command not found. Type help to see available commands.`];
    }
    setHistory(previous => [...previous, command]); setHistoryIndex(-1);
    setLines(previous => [...previous, { command: `${cwd === "~" ? "~" : cwd} $ ${command}`, output }]);
  };
  const submit = (event: FormEvent) => { event.preventDefault(); run(value); setValue(""); };
  return <div ref={backdropRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-3 backdrop-blur-md sm:p-6" onMouseDown={e => { if (e.target === e.currentTarget) close(); }}>
    <section ref={panelRef} role="dialog" aria-modal="true" aria-label="Portfolio terminal" className="flex h-[min(720px,92dvh)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#090b0d]/95 font-mono text-sm text-emerald-100 shadow-2xl shadow-black/50 backdrop-blur-xl">
      <header className="flex items-center justify-between border-b border-white/10 bg-white/[.04] px-4 py-3"><div className="flex items-center gap-3"><div className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-red-400"/><i className="h-2.5 w-2.5 rounded-full bg-amber-300"/><i className="h-2.5 w-2.5 rounded-full bg-emerald-400"/></div><span className="flex items-center gap-2 text-xs text-white/60"><TerminalIcon size={14}/> sahil@portfolio: {cwd}</span></div><button onClick={close} aria-label="Close terminal" className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"><X size={17}/></button></header>
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-7">{lines.map((line, i) => <div key={i} className="mb-4"><div className="whitespace-pre-wrap break-words text-emerald-300">{line.command}</div>{line.output.map((out, j) => <div key={j} className="whitespace-pre-wrap break-words leading-6 text-white/75">{out || " "}</div>)}</div>)}
        <form onSubmit={submit} className="flex items-center gap-2"><label htmlFor="terminal-command" className="shrink-0 text-emerald-300">{cwd} $</label><input ref={inputRef} id="terminal-command" value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => { if (e.key === "ArrowUp") { e.preventDefault(); const index = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1); setHistoryIndex(index); setValue(history[index] ?? ""); } if (e.key === "ArrowDown") { e.preventDefault(); const index = historyIndex + 1; setHistoryIndex(index >= history.length ? -1 : index); setValue(history[index] ?? ""); } }} autoComplete="off" spellCheck={false} className="min-w-0 flex-1 bg-transparent text-white outline-none" aria-label="Terminal command" /></form>
      </div><footer className="border-t border-white/10 px-4 py-2 text-[10px] tracking-wide text-white/35">PORTFOLIO SHELL <span className="mx-2">·</span> UP/DOWN HISTORY <span className="mx-2">·</span> ESC TO CLOSE</footer>
    </section>
  </div>;
}
