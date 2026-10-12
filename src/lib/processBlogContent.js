import { markExternalEditorLinks } from "./markExternalEditorLinks";

export const BLOG_CONTENT_KEYS = ["content", "content_1", "content_2"];

function normalizeBlogHtml(html) {
  if (!html) return "";
  if (Array.isArray(html)) {
    return html.filter(Boolean).join("");
  }
  return html;
}

function createHeadingProcessor() {
  const toc = [];
  const usedSlugs = new Map();

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  const processHtml = (html) => {
    if (!html) return "";

    return html.replace(
      /<h2([^>]*)>([\s\S]*?)<\/h2>/gi,
      (match, attrs, inner) => {
        const text = inner.replace(/<[^>]+>/g, "").trim();
        let slug = slugify(text) || `section-${toc.length}`;

        const count = usedSlugs.get(slug) ?? 0;
        usedSlugs.set(slug, count + 1);
        if (count > 0) slug = `${slug}-${count}`;

        toc.push({ id: slug, text });

        if (/\bid\s*=/i.test(attrs)) {
          return match;
        }

        return `<h2${attrs} id="${slug}">${inner}</h2>`;
      }
    );
  };

  return { processHtml, getToc: () => toc };
}

/**
 * Process each blog editor field separately while building one shared TOC.
 */
export function processBlogContentSections(source = {}) {
  const { processHtml, getToc } = createHeadingProcessor();

  const sections = BLOG_CONTENT_KEYS.map((key) => {
    const raw = source?.[key];
    if (!raw) return null;

    const content = markExternalEditorLinks(processHtml(raw));
    if (!content.trim()) return null;

    return { key, content };
  }).filter(Boolean);

  return { sections, toc: getToc() };
}

/**
 * Process blog HTML at build time (getStaticProps) so article body
 * and TOC are present in the initial HTML for crawlers.
 * Accepts a single HTML string or an array of editor fields (content, content_1, content_2).
 */
export function processBlogContent(html) {
  const mergedHtml = normalizeBlogHtml(html);
  if (!mergedHtml) return { content: "", toc: [] };

  const { processHtml, getToc } = createHeadingProcessor();
  const content = markExternalEditorLinks(processHtml(mergedHtml));

  return { content, toc: getToc() };
}
