import moment from "moment";
import { getUniversityData } from "@/services/UniversitypageService";

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
    const uniResponse = await getUniversityData();
    const universityList = uniResponse?.data?.data?.data || [];

    universityList.forEach((uni) => {
      const uniSlug = uni?.university_slug?.toLowerCase();

      if (
        !uniSlug ||
        !uni?.is_active ||
        uni?.is_active === 0 ||
        uni?.is_page_created === false
      ) {
        return;
      }

      urls.push({
        loc: `${SITE_URL}/university/${uniSlug}/admission-process/`,
        lastmod: getLastMod(uni),
      });
    });
  } catch (err) {
    console.error("❌ Admission process sitemap error", err);
  }

  const sitemap = generateSiteMap(urls);

  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function SitemapAdmissionProcess() {
  return null;
}
