import About from "@/components/custom/homepage/About";
import AllUniversitySection from "@/components/custom/homepage/allUniversitySection/AllUniversitySection";
import Banner from "@/components/custom/homepage/Banner";
import ComparePairs from "@/components/custom/homepage/ComparePairs";
import CourseSection from "@/components/custom/homepage/courseSection/CourseSection";
import ExpertSlider from "@/components/custom/homepage/expert/ExpertSlider";
import MediaSlider from "@/components/custom/homepage/media/MediaSlider";
import NewAbout from "@/components/custom/homepage/NewAbout";
import ReelSlider from "@/components/custom/homepage/reels/ReelSlider";
import FaqCategory from "@/components/custom/shared/FaqCategory";
import MainHeading from "@/components/custom/shared/MainHeading";
import useWindowSize from "@/lib/use-window-size";
import {
  getFaqData,
  getMediaData,
  getMentorData,
  getTestimonialData,
} from "@/services/HomepageService";
import { getCoursesByDomain } from "@/services/MenuService";
import { getUniversityData } from "@/services/UniversitypageService";
import { getComparePairData } from "@/services/ComparePair";
import { Plus_Jakarta_Sans } from "next/font/google";
import Head from "next/head";

import React from "react";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});


export async function getStaticProps() {

  const menuResponse = await getCoursesByDomain();
  const menuDataSchema = menuResponse?.data?.data ?? null;
  const mentorData = await getMentorData().then(
    (response) => response?.data?.data?.data || []
  );
  const universitiesList = await getUniversityData().then(
    (response) => response?.data?.data?.data || []
  );
  const mediaData = await getMediaData().then(
    (response) => response?.data?.data?.data || []
  );
  const testimonialData = await getTestimonialData().then(
    (response) => response?.data?.data?.data || []
  );
  const faqData = await getFaqData().then(
    (response) => response?.data?.data?.data || []
  );
  const comparePairs = await getComparePairData().then(
    (response) => response?.data?.data?.data || []
  );

  return {
    props: {
      mentorData: mentorData,
      universitiesList: universitiesList,
      mediaData: mediaData,
      testimonialData: testimonialData,
      faqData: faqData,
      menuDataSchema: menuDataSchema,
      comparePairs: comparePairs,
    },
    revalidate: 60,
  };
}
export default function Home({
  menuData,
  menuDataSchema,
  mentorData,
  universitiesList,
  mediaData,
  testimonialData,
  faqData,
  comparePairs,
 
}) {

  const screenSize = useWindowSize();
  // const [loading, setLoading] = React.useState(true);
  //  if (!menuData) return null;

  // console.log(universitiesList, "universitiesList");

  const allFaqItemsForSchema =
    faqData?.flatMap(category => category.items) || [];

  const allCourseNameForSchema = Object.values(menuDataSchema || {})
    .flat()
    .map(course => ({
      name: course.course_name,
      slug: course.course_slug
    }));

  // console.log(allCourseNameForSchema);

  const title = "Compare Top Online Universities in India | LearningShala";
  const description = "LearningShala helps you make confident decisions when choosing online degrees and universities. Compare 100+ UGC-approved online universities on 40+ factors.";

// console.log(faqData, "faqData");

  return (

    <>

      <Head>
        <title>{title}</title>
        <meta name="description" key="description" content={description} />

       
        <link rel="canonical" href="https://learningshala.com/" />
        <link rel="alternate" hrefLang="en-IN" href="https://learningshala.com/" />
        <link rel="alternate" hrefLang="en" href="https://learningshala.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://learningshala.com/" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://learningshala.com/" />
        <meta property="og:site_name" content="LearningShala" />
        <meta property="og:image" content="https://learningshala.com/images/icons/logo.webp" />
        <meta property="og:image:alt" content="LearningShala Logo" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_IN" />
<meta property="og:image:type" content="image/webp" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://learningshala.com/images/icons/logo.webp" />
        <meta name="twitter:image:alt" content="LearningShala Logo" />
        <meta name="twitter:creator" content="@Learning_shala" />
        <meta name="twitter:site" content="@Learning_shala" />



        <script
          id="schema-webpage"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": "https://learningshala.com/#webpage",
              url: "https://learningshala.com/",
              name: title,
              description:
                description,
              inLanguage: "en-IN",
              about: {
                "@id": "https://learningshala.com/#organization",
              },
              potentialAction: {
                "@type": "ReadAction",
                target: "https://learningshala.com/",
              },
              mainEntity: [
                { "@id": "https://learningshala.com/#popular-courses" },
                { "@id": "https://learningshala.com/#top-university" },
                { "@id": "https://learningshala.com/#faq" },
              ],
            }),
          }}
        />


        <script

          id="schema-popular-courses"
          type="application/ld+json"
          
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "@id": "https://learningshala.com/#popular-courses",
                "name": "Top Online Degree Courses",
                "description": "Browse popular online degree courses from top Indian universities, aligned with your career goals & unlock new opportunities for your future.",
                "url": "https://learningshala.com/",
                "itemListOrder": "https://schema.org/ItemListOrderAscending",
                "numberOfItems": allCourseNameForSchema?.length || 0,
                "itemListElement":
                  allCourseNameForSchema.map((course, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": course?.name,
                    "url": `https://learningshala.com/courses/${course?.slug}`
                  })) || []
              },
              // null,
              // 2 
            )
          }}
        />



        {/* university schema */}

        <script

          id="schema-top-university"
          type="application/ld+json"
          
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "@id": "https://learningshala.com/#top-university",
                "name": "Top UGC-Approved University - LearningShala",
                "description":
                  "Choose UGC-approved online universities in India for UG, PG, diploma, certificate, and job-ready programs, and protect yourself from fake online institutions.",
                "url": "https://learningshala.com/",
                "itemListOrder": "https://schema.org/ItemListOrderAscending",
                "numberOfItems": universitiesList?.filter(university => university.university_type_id !== 4).length || 0,
                "itemListElement":
                  universitiesList?.filter(university => university.university_type_id !== 4).map((university, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": university?.university_name,
                    "url": `https://learningshala.com/university/${university?.university_slug}/`
                  })) || []
              },
              // null,
              // 2 
            )
          }}
        />

        {/* faq schema */}

        <script
          id="schema-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "@id": "https://learningshala.com/#faq",
                "mainEntity": allFaqItemsForSchema.map(item => ({
                  "@type": "Question",
                  "name": item?.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item?.answer.replace(/<[^>]*>/g, "")
                  }

                }))


              },
              // null,
              // 2 

            )
          }}
        />


      </Head>
      <div className={`${plusJakartaSans.className}`}>
        <main>
          {/* test update */}
          <Banner screenSize={screenSize} />
          <div id="course-section" className="container">

          {screenSize && screenSize.width < 768 ? (
  <MainHeading
    title="Find the Right Online Degree With Us!"
    className="text-center !text-[1.6rem]"
  />
) : (
  <MainHeading
    title={<><span className="bg-gradient-to-r from-[#e64053] via-[#fa586b] to-[#C8A84E] bg-clip-text text-transparent">Online Courses</span> You Can Choose From!</>}
    className="text-center"
  />
)}
            {/* <MainHeading
              title="Online Courses You Can Choose From!"
              className="text-center hidden lg:block"
            />

            <MainHeading title="Find the Right Online Degree With Us!" className="text-center block lg:hidden !text-[1.6rem]" /> */}


          </div>
          <section className="sec_mb bg-gray-50 py-10">
           <div className="container">
           <CourseSection screenSize={screenSize} menuData={menuData} />
           </div>
          </section>
          <ExpertSlider mentorData={mentorData || []} />
          <NewAbout />
          {/* <About /> */}
          <AllUniversitySection universitiesList={universitiesList || []} />
          {/* <ComparePairs comparePairs={comparePairs || []} /> */}
          <ReelSlider testimonialData={testimonialData || []} />
          <MediaSlider mediaData={mediaData || []} />
          <div className="container sec_mb">
            <div className="mx-auto">
              <div className="text-center">
                <MainHeading title="Frequently Asked Questions" />
              </div>
              <FaqCategory faqData={faqData || []} fromHomepage={true} />{" "}
            </div>
          </div>
        </main>
      </div></>
  );
}
