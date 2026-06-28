// Cloudflare Pages Function — POST /api/chat
// Runs at the edge. The Anthropic API key lives ONLY as an encrypted secret
// (context.env.ANTHROPIC_API_KEY) and never reaches the browser.
//
// Guardrails baked in: strict on-topic system prompt, short token cap,
// message-length limit, basic per-IP rate limiting, and a turn cap.

const MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 500;
const MAX_USER_CHARS = 1500;
const MAX_TURNS = 16; // user+assistant messages retained
const RATE_LIMIT = 12; // requests per window
const RATE_WINDOW_MS = 60_000;

const SYSTEM_PROMPT = `You are "Ask Link3IT," the assistant on the website of Link3IT — an independent identity security and privileged access management (PAM) advisory led by Andrew Symister, founder and principal advisor.

WHAT LINK3IT DOES:
- Independent identity security reviews and PAM health checks
- Privileged access (CyberArk — now Idira, part of Palo Alto Networks), Microsoft Entra ID, Active Directory, identity governance, Zero Trust architecture reviews
- Serves startups, growing/SMB teams, and regulated enterprises — right-sized engagements for any stage
- Andrew holds CyberArk Trustee, CyberArk Defender (PAM), and CompTIA Security+ certifications

YOUR JOB:
1. Answer baseline questions clearly and helpfully — what PAM is, what a health check covers, common identity risks (standing admin access, unrotated service accounts, MFA gaps, identity sprawl), how engagements work, who Link3IT helps, and general identity-security concepts.
2. Help a visitor understand their own situation at a high level, and surface where a review would help.
3. ALWAYS, naturally, nudge toward booking an executive review or starting a conversation via the contact page. End most answers with a light, non-pushy pointer to reach out (e.g. "If you'd like an independent look at your environment, the contact page is the place to start.").

STYLE:
- Direct, plain-spoken, knowledgeable. Short paragraphs. No corporate filler, no hype.
- You are a helpful first point of contact, NOT a replacement for an engagement. For anything specific to their environment, recommend they reach out.

STRICT BOUNDARIES:
- Only discuss identity security, PAM, Link3IT's services, and closely related cybersecurity topics. If asked about anything unrelated (coding help, general trivia, other companies, writing essays, etc.), politely decline and steer back: "I'm here to help with identity security and how Link3IT can help — happy to answer questions about that."
- Never invent specific pricing, specific client names, or credentials Link3IT doesn't have. If asked about exact pricing, explain it depends on scope and point them to a conversation via the contact page.
- Never claim Link3IT is a partner of, or endorsed by, any vendor (CyberArk, Microsoft, Okta, etc.). Link3IT is independent and works across these platforms.
- Do not provide attacker-useful instructions. Keep guidance defensive and high-level.
- Keep replies concise — a few short paragraphs at most.`;

function rateLimit(env, ip) {
  // Best-effort in-memory limiter (per isolate). Lightweight abuse guard.
  if (!globalThis.__rl) globalThis.__rl = new Map();
  const now = Date.now();
  const rec = globalThis.__rl.get(ip) || { count: 0, reset: now + RATE_WINDOW_MS };
  if (now > rec.reset) { rec.count = 0; rec.reset = now + RATE_WINDOW_MS; }
  rec.count++;
  globalThis.__rl.set(ip, rec);
  return rec.count <= RATE_LIMIT;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const cors = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://link3it.com",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    if (!env.ANTHROPIC_API_KEY) {
      return new Response(JSON.stringify({ error: "Assistant is not configured yet." }), { status: 503, headers: cors });
    }

    const ip = request.headers.get("CF-Connecting-IP") || "anon";
    if (!rateLimit(env, ip)) {
      return new Response(JSON.stringify({ error: "Too many messages right now. Please wait a moment and try again." }), { status: 429, headers: cors });
    }

    const body = await request.json().catch(() => null);
    if (!body || !Array.isArray(body.messages)) {
      return new Response(JSON.stringify({ error: "Bad request." }), { status: 400, headers: cors });
    }

    // Sanitize + clamp history
    let messages = body.messages
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-MAX_TURNS)
      .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_USER_CHARS) }));

    if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
      return new Response(JSON.stringify({ error: "No question provided." }), { status: 400, headers: cors });
    }

    const apiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!apiRes.ok) {
      const detail = await apiRes.text().catch(() => "");
      return new Response(JSON.stringify({ error: "Assistant is briefly unavailable. Please try again, or use the contact page." }), { status: 502, headers: cors });
    }

    const data = await apiRes.json();
    const reply = Array.isArray(data.content)
      ? data.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim()
      : "";

    return new Response(JSON.stringify({ reply: reply || "Sorry — I didn't catch that. Could you rephrase?" }), { status: 200, headers: cors });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Something went wrong. Please try again or use the contact page." }), { status: 500, headers: cors });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://link3it.com",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
