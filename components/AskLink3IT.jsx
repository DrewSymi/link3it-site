"use client";

import { useState, useRef, useEffect } from "react";

// "Ask Link3IT" — floating chat widget. Talks ONLY to our own /api/chat
// endpoint (the Cloudflare Function), which holds the API key server-side.

const GREETING = "Hi — I'm Ask Link3IT. I can answer questions about privileged access, identity security, PAM health checks, and how an engagement works. What's on your mind?";

const SUGGESTIONS = [
  "What is a PAM health check?",
  "Do you work with small teams?",
  "What are the most common identity risks?",
];

export default function AskLink3IT() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy, open]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  async function send(text) {
    const content = (text ?? input).trim();
    if (!content || busy) return;
    setErr("");
    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m.role === "user" || m.role === "assistant") }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(data.error || "Something went wrong. Please try the contact page.");
      } else {
        setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setErr("Couldn't reach the assistant. Please try again, or use the contact page.");
    } finally {
      setBusy(false);
    }
  }

  function onKey(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close Ask Link3IT" : "Open Ask Link3IT assistant"}
        className="fixed z-[60] bottom-5 right-5 flex items-center gap-2.5 rounded-full pl-4 pr-5 py-3 font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
        style={{ background: open ? "#0f1115" : "#ff5436", boxShadow: "0 10px 30px -8px rgba(255,84,54,0.5)" }}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-white/70 animate-ping" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
        </span>
        <span className="text-[14px]">{open ? "Close" : "Ask Link3IT"}</span>
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed z-[60] bottom-[84px] right-5 w-[min(380px,calc(100vw-2.5rem))] rounded-2xl overflow-hidden border border-hair bg-white shadow-2xl flex flex-col"
             style={{ height: "min(560px, calc(100vh - 130px))" }}>
          {/* Header */}
          <div className="px-4 py-3.5 flex items-center gap-3 text-white shrink-0" style={{ background: "#0f1115" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#ff5436" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            </div>
            <div className="leading-tight">
              <div className="font-display text-[15px] font-semibold">Ask Link3IT</div>
              <div className="text-[11.5px] text-white/55">Identity security · baseline answers</div>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3" style={{ background: "#fafaf9" }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] text-[14px] leading-relaxed px-3.5 py-2.5 rounded-2xl whitespace-pre-wrap ${
                  m.role === "user"
                    ? "text-white rounded-br-sm"
                    : "text-ink border border-hair rounded-bl-sm bg-white"
                }`} style={m.role === "user" ? { background: "#2563eb" } : undefined}>
                  {m.content}
                </div>
              </div>
            ))}

            {busy && (
              <div className="flex justify-start">
                <div className="text-[14px] px-3.5 py-3 rounded-2xl rounded-bl-sm bg-white border border-hair">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-faint animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-faint animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-faint animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}

            {/* Suggestions (only before first user message) */}
            {messages.length === 1 && !busy && (
              <div className="pt-1 space-y-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)}
                          className="block w-full text-left text-[13px] text-ink-soft border border-hair rounded-xl px-3 py-2 bg-white hover:border-coral-line hover:text-ink transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            )}

            {err && <div className="text-[12.5px] text-signal-red px-1">{err}</div>}
          </div>

          {/* Input */}
          <div className="border-t border-hair p-3 shrink-0 bg-white">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Ask about PAM, Entra ID, AD…"
                className="flex-1 resize-none text-[14px] text-ink outline-none max-h-24 bg-transparent placeholder:text-ink-faint"
                style={{ lineHeight: 1.5 }}
              />
              <button onClick={() => send()} disabled={busy || !input.trim()}
                      aria-label="Send message"
                      className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-white transition-opacity disabled:opacity-40"
                      style={{ background: "#ff5436" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
              </button>
            </div>
            <div className="text-[10.5px] text-ink-faint mt-2 px-1">
              Baseline guidance only — not a substitute for an engagement. <a href="/contact" className="text-cobalt underline">Book a review</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
