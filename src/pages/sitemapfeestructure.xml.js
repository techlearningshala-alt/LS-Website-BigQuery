import moment from "moment";
import {
  getUniversityData,
  getUniversityDetailData,
} from "@/services/UniversitypageService";

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
  const addedUrls = new Set();

  const addUrl = (loc, lastmod) => {
    if (!loc || addedUrls.has(loc)) return;
    addedUrls.add(loc);
    urls.push({ loc, lastmod });
  };

  try {
    const uniResponse = await getUniversityData();
    const universityList = uniResponse?.data?.data?.data || [];

    await Promise.all(
      universityList.map(async (uni) => {
        const uniSlug = uni?.university_slug?.toLowerCase();

        if (
          !uniSlug ||
          !uni?.is_active ||
          uni?.is_active === 0 ||
          uni?.is_page_created === false
        ) {
          return;
        }

        try {
          const uniDetailRes = await getUniversityDetailData({
            universitySlug: uniSlug,
          });
          const uniDetail = uniDetailRes?.data?.data?.data;
          const courses = uniDetail?.course_data || [];

          courses.forEach((course) => {
            const courseSlug = course?.slug?.toLowerCase();

            if (
              !courseSlug ||
              course?.is_page_created === false ||
              course?.is_active === 0
            ) {
              return;
            }

            addUrl(
              `${SITE_URL}/university/${uniSlug}/${courseSlug}/fee-structure/`,
              getLastMod(course) || getLastMod(uniDetail) || getLastMod(uni)
            );
          });
        } catch (error) {
          console.error(
            `❌ Fee sitemap uni detail error: ${uniSlug}`,
            error?.message || error
          );
        }
      })
    );
  } catch (err) {
    console.error("❌ Fee structure sitemap error", err);
  }

  const sitemap = generateSiteMap(urls);

  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function SitemapFeeStructure() {
  return null;
}
