import { getCategoryBlogList } from "@/services/BlogService";
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

  try {
    const categoryRes = await getCategoryBlogList();
    const categories = categoryRes?.data?.data?.data || [];

    categories.forEach((category) => {
      const slug = category?.category_slug?.toString?.().trim?.();
      if (!slug || !isActiveEntity(category)) return;

      addUrl(
        `${SITE_URL}/blog/category/${slug}/`,
        getLastMod(category)
      );
    });
  } catch (err) {
    console.error("❌ Blog categories sitemap error", err);
  }

  const sitemap = generateSiteMap(urls);

  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function SitemapBlogCategories() {
  return null;
}
