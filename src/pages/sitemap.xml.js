import moment from "moment";
import {
  getCoursesByDomain,
  getCoursesBySlug,
} from "@/services/MenuService";
import {
  getUniversityData,
  getUniversityDetailData,
  getUniversityCourseDetailData,
} from "@/services/UniversitypageService";

import {
  getFaqData,
} from "@/services/HomepageService";

const SITE_URL = "https://learningshala.com";

// Static pages that are not generated from API data
const STATIC_PATHS = [
  "/",
  "/about/",
  "/contact-us/",
  "/privacy-policy/",
  "/term-and-conditions/",
  "/tools/",
  "/blog/",
  "/news/",
  "/universities/",
  "/courses/",
  "/category/ug-courses/",
  "/category/pg-courses/",
  "/compare/",
  "/compare-university/",
  "/compare-in-two-mins/",
  "/verified-mentors/",
  "/post-admission-service/",
  "/free-counselling-online-degree-admission-guidance/",
  "/naac-accredited-universities-in-india/",
  "/career-sathi-channel-partner/",
  "/career-sathi-channel-partner-kyc-registration-form/",
  "/tools/education-loan-emi-calculator/",
  "/tools/age-calculator/",
  "/tools/roi-calculator/",
  "/tools/attendance-calculator/",
  "/tools/percentage-to-cgpa-calculator/",
  "/tools/sgpa-to-percentage-calculator/",
  "/tools/percentage-calculator/",
  "/tools/marks-to-percentage-calculator/",
  "/tools/cgpa-to-percentage-calculator/",
  "/tools/percentage-to-sgpa-calculator/",
];

// =====================================
// Helpers
// =====================================
const formatDate = (date) =>
  date ? moment(date).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");

const createUrlEntry = (loc, lastmod) => ({
  loc,
  lastmod: formatDate(lastmod),
});

// const faqResponse = await getFaqData();
// const faqData = faqResponse?.data?.data?.data || [];

const generateSiteMap = (urls) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, lastmod }) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  )
  .join("")}
</urlset>`;

// =====================================
// Main Sitemap Generator
// =====================================
export async function getServerSideProps({ res }) {
  const urls = [];
  const addedUrls = new Set();

  // Prevent duplicate URLs
  const addUrl = (loc, lastmod) => {
    if (!loc || addedUrls.has(loc)) return;

    addedUrls.add(loc);
    urls.push(createUrlEntry(loc, lastmod));
  };

  // =====================================
  // 0️⃣ Static pages (about, contact, legal, tools, etc.)
  // =====================================
  STATIC_PATHS.forEach((path) => {
    addUrl(`${SITE_URL}${path}`);
  });

  // =====================================
  // 1️⃣ Courses + Specializations
  // =====================================
  try {
    const courseResponse = await getCoursesByDomain();

    const groupedCourses = courseResponse?.data?.data || {};
    const courses = Object.values(groupedCourses).flat();

    // Run all course requests in parallel
    const coursePromises = courses.map(async (course) => {
      const courseSlug = course?.course_slug?.toLowerCase();

      if (!courseSlug) return;

      try {
        const courseRes = await getCoursesBySlug(courseSlug);
        const courseData = courseRes?.data?.data;

        if (!courseData || courseData?.is_page_created === false) {
          return;
        }

        addUrl(
          `${SITE_URL}/courses/${courseSlug}/`,
          courseData?.updated_at
        );

        // Specializations
        const specializations = courseData?.specialization_data || [];

        specializations.forEach((spec) => {
          if (!spec?.slug || spec?.is_page_created === false) return;

          addUrl(
            `${SITE_URL}/courses/${courseSlug}/${spec.slug.toLowerCase()}/`,
            spec?.updated_at
          );
        });
      } catch (error) {
        console.error(`❌ Error fetching course: ${courseSlug}`, error);
      }
    });

    await Promise.all(coursePromises);
  } catch (error) {
    console.error("❌ Course sitemap error", error);
  }

  // =====================================
  // 2️⃣ Universities + Courses + Specializations
  // =====================================
  try {
    const uniResponse = await getUniversityData();

    const universityList = uniResponse?.data?.data?.data || [];

    const universityPromises = universityList.map(async (uni) => {
      const uniSlug = uni?.university_slug?.toLowerCase();

      if (
        !uniSlug ||
        !uni?.is_active ||
        uni?.is_page_created === false
      ) {
        return;
      }

      addUrl(
        `${SITE_URL}/university/${uniSlug}/`,
        uni?.updated_at
      );

      try {
        const uniDetailRes = await getUniversityDetailData({
          universitySlug: uniSlug,
        });

        const uniDetail = uniDetailRes?.data?.data?.data;
        const courses = uniDetail?.course_data || [];

        const coursePromises = courses.map(async (course) => {
          const courseSlug = course?.slug?.toLowerCase();

          if (!courseSlug) return;

          try {
            const courseDetailRes =
              await getUniversityCourseDetailData({
                universitySlug: uniSlug,
                courseSlug,
              });

            const courseDetail = courseDetailRes?.data?.data;

            if (
              !courseDetail ||
              courseDetail?.is_page_created === false
            ) {
              return;
            }

            addUrl(
              `${SITE_URL}/university/${uniSlug}/${courseSlug}/`,
              courseDetail?.updated_at
            );

            // Specializations
            const specializations =
              courseDetail?.specialization_data || [];

            specializations.forEach((spec) => {
              if (
                !spec?.slug ||
                spec?.is_page_created === false
              ) {
                return;
              }

              addUrl(
                `${SITE_URL}/university/${uniSlug}/${courseSlug}/${spec.slug.toLowerCase()}/`,
                spec?.updated_at
              );
            });
          } catch (error) {
            console.error(
              `❌ Error fetching university course: ${uniSlug}/${courseSlug}`,
              error
            );
          }
        });

        await Promise.all(coursePromises);
      } catch (error) {
        console.error(
          `❌ Error fetching university detail: ${uniSlug}`,
          error
        );
      }
    });

    await Promise.all(universityPromises);
  } catch (error) {
    console.error("❌ University sitemap error", error);
  }

  // =====================================
  // XML Response
  // =====================================
  // console.log(`Sitemap total URLs generated: ${urls.length}`);
  const sitemap = generateSiteMap(urls);

  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");

  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}