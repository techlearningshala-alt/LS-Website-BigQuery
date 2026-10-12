const SITE_HOST = "learningshala.com";

export function isExternalLink(href) {
  if (!href) return false;

  const trimmed = href.trim();
  if (!trimmed || trimmed.startsWith("#")) return false;
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return false;

  try {
    const url = new URL(trimmed, "https://learningshala.com");
    const host = url.hostname.replace(/^www\./i, "").toLowerCase();
    return host !== SITE_HOST;
  } catch {
    return false;
  }
}
