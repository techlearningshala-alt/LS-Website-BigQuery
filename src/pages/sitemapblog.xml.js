import { getBlogData } from "@/services/BlogService";
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
    const blogRes = await getBlogData();
    const blogs = (blogRes?.data?.data?.data || []).filter(
      (blog) =>
        blog?.is_active !== false &&
        blog?.is_active !== 0 &&
        blog?.is_page_created !== false
    );

    blogs.forEach((blog) => {
      if (!blog?.slug) return;

      urls.push({
        loc: `${SITE_URL}/blog/${blog.slug}/`,
        lastmod: getLastMod(blog),
      });
    });
  } catch (err) {
    console.error("❌ Blog sitemap error", err);
  }

  const sitemap = generateSiteMap(urls);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemapblog() {
  return null;
}