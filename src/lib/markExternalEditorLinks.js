import { isExternalLink } from "./isExternalLink";

/**
 * Mark external links from the admin editor so the frontend can gate them
 * behind the lead form before opening.
 */
export function markExternalEditorLinks(html) {
  if (!html) return "";

  return html.replace(/<a\b([^>]*)>/gi, (match, attrs) => {
    if (/data-ls-external-link/i.test(attrs)) return match;

    const hrefMatch = attrs.match(/\bhref=["']([^"']+)["']/i);
    if (!hrefMatch || !isExternalLink(hrefMatch[1])) return match;

    return `<a${attrs} data-ls-external-link="true">`;
  });
}
