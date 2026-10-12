import { getAuthorDetailData, getNewsData } from "@/services/NewsService";
import moment from "moment";

const SITE_URL = "https://learningshala.com";

function formatUrlEntry({ loc, lastmod }) {
  return `  <url>
    <loc>${loc}</loc>
${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ""}  </url>`;
}

function generateSiteMap(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(formatUrlEntry).join("\n")}
</urlset>`;
}

function getLastMod(entity) {
  const updatedValue = entity?.updated_date || entity?.updated_at;
  return updatedValue ? moment(updatedValue).format("YYYY-MM-DD") : null;
}

function isActiveEntity(entity) {
  return (
    entity?.is_active !== false &&
    entity?.is_active !== 0 &&
    entity?.is_page_created !== false
  );
}

export async function getServerSideProps({ res }) {
  const urls = [];
  const addedUrls = new Set();

  const addUrl = (loc, lastmod) => {
    if (!loc || addedUrls.has(loc)) return;
    addedUrls.add(loc);
    urls.push({ loc, lastmod: lastmod || null });
  };

  // Primary: authors list API (all pages)
  try {
    const authorRes = await getAuthorDetailData();
    const authors = authorRes?.data?.data?.data || [];

    authors.forEach((author) => {
      const slug = author?.author_slug?.toString?.().trim?.();
      if (!slug || !isActiveEntity(author)) return;

      addUrl(`${SITE_URL}/news/author/${slug}/`, getLastMod(author));
    });
  } catch (err) {
    console.error("❌ News authors sitemap error", err);
  }

  // Also merge author slugs from news posts
  try {
    const newsRes = await getNewsData();
    const news = (newsRes?.data?.data?.data || []).filter(isActiveEntity);

    news.forEach((item) => {
      const slug = item?.author_slug?.toString?.().trim?.();
      if (!slug) return;
      addUrl(`${SITE_URL}/news/author/${slug}/`, getLastMod(item));
    });
  } catch (err) {
    console.error("❌ News authors sitemap fallback error", err);
  }

  const sitemap = generateSiteMap(urls);

  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function SitemapNewsAuthors() {
  return null;
}
