import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content");

// Minimal, dependency-light markdown -> HTML.
// Handles the subset used in our articles: headings, bold, italic, inline code,
// links, unordered lists, blockquotes, and paragraphs. Keeps the bundle tiny
// and avoids pulling a full markdown engine into a static export.
export function renderMarkdown(md) {
  const lines = md.split("\n");
  let html = "";
  let inList = false;
  let inQuote = false;

  const inline = (t) =>
    t
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");

  const closeList = () => { if (inList) { html += "</ul>"; inList = false; } };
  const closeQuote = () => { if (inQuote) { html += "</blockquote>"; inQuote = false; } };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { closeList(); closeQuote(); continue; }

    if (line.startsWith("### ")) { closeList(); closeQuote(); html += `<h3>${inline(line.slice(4))}</h3>`; }
    else if (line.startsWith("## ")) { closeList(); closeQuote(); html += `<h2>${inline(line.slice(3))}</h2>`; }
    else if (line.startsWith("# ")) { closeList(); closeQuote(); html += `<h1>${inline(line.slice(2))}</h1>`; }
    else if (line.startsWith("> ")) { closeList(); if (!inQuote) { html += "<blockquote>"; inQuote = true; } html += `<p>${inline(line.slice(2))}</p>`; }
    else if (line.startsWith("- ")) { closeQuote(); if (!inList) { html += "<ul>"; inList = true; } html += `<li>${inline(line.slice(2))}</li>`; }
    else { closeList(); closeQuote(); html += `<p>${inline(line)}</p>`; }
  }
  closeList(); closeQuote();
  return html;
}

export function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return { slug, meta: data, content };
  });
  // newest first by date in frontmatter
  return posts.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));
}

export function getPost(slug) {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { slug, meta: data, content, html: renderMarkdown(content) };
}

export function getPostSlugs() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
}
