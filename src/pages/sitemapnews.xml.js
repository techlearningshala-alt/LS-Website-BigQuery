import { getNewsData } from "@/services/NewsService";
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
export async function getServerSideProps({ res }) {
  const urls = [];
  try {
    const newsRes = await getNewsData();
    const news = (newsRes?.data?.data?.data || []).filter(
      (item) =>
        item?.is_active !== false &&
        item?.is_active !== 0 &&
        item?.is_page_created !== false
    );

    news.forEach((news) => {
      if (!news?.slug) return;

      urls.push({
        loc: `${SITE_URL}/news/${news.slug}/`,
        lastmod: getLastMod(news),
      });
    });
  } catch (err) {
    console.error("❌ News sitemap error", err);
  }

  const sitemap = generateSiteMap(urls);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return { props: {} };
}

export default function Sitemapnews() {
  return null;
}