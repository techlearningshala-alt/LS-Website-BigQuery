import CourseSection from "@/components/custom/homepage/courseSection/CourseSection";
import useWindowSize from "@/lib/use-window-size";
import Head from "next/head";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getCoursesByDomain } from "@/services/MenuService";

export async function getStaticProps() {
  const menuResponse = await getCoursesByDomain();
  const menuDataSchema = menuResponse?.data?.data ?? null;

  return {
    props: {
      menuDataSchema: menuDataSchema,
    },
    revalidate: 60,
  };
}


const Courses = ({ menuData,menuDataSchema }) => {
  const size = useWindowSize();

const title = "Top Online Degree Courses - LearningShala";
const description = "Browse popular online degree courses from top Indian universities, aligned with your career goals & unlock new opportunities for your future with LearningShala.";

const allCourseNameForSchema = Object?.values(menuDataSchema)
.flat()
.map(course => ({
  name: course.course_name,
  slug: course.course_slug
}));

  return (
    <section className="sec_mb">
      <Head>
       
 <title>{title}</title>
<meta key="description" name="description" content={description} />
<link rel="canonical" href="https://learningshala.com/courses/" />
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content="https://learningshala.com/courses/" />
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://learningshala.com/#website",
                "name": "LearningShala",
                "url": "https://learningshala.com/",
                "publisher": {
                  "@id": "https://learningshala.com/#organization"
                },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://learningshala.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              null,
              2 // 👈 This adds line breaks + indentation

            )
          }}
        />


<script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "@id": "https://learningshala.com/courses/#webpage",
                "url": "https://learningshala.com/courses/",
                "name": "Top Online Degree Courses - LearningShala",
                "description": description,
                "inLanguage": "en-IN",
                "isPartOf": {
                  "@id": "https://learningshala.com/#website"
                },
                "about": {
                  "@id": "https://learningshala.com/#organization"
                },
                "mainEntity": {
                  "@id": "https://learningshala.com/courses/#popular-courses"
                },
                "potentialAction": {
                  "@type": "ReadAction",
                  "target": "https://learningshala.com/courses/"
                }
              },
              null,
              2 // 👈 This adds line breaks + indentation

            )
          }}
        />



<script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "@id": "https://learningshala.com/courses/#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://learningshala.com/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Courses",
                    "item": "https://learningshala.com/courses/"
                  }
                ]
              },
              null,
              2 // 👈 This adds line breaks + indentation

            )
          }}
        />

<script

id="schema-website"
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
      "numberOfItems": allCourseNameForSchema?.length || 0,
      "itemListElement":
        allCourseNameForSchema.map((course, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": course?.name,
          "url": `https://learningshala.com/courses/${course?.slug}`
        })) || []
    },
    null,
    2 
  )
}}
/> 


      </Head>
      <div className="container">
        <div className="bg-[#faf9f7] py-8 px-6 rounded-2xl mb-6 flex flex-col items-center justify-center">
          {" "}
          <Breadcrumb className="text-center">
            <BreadcrumbList className="mb-3">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold mb-2">
            Top Online <span className="text-primary">Courses</span>
          </h1>
          <p>
            Browse popular online degree courses from top Indian universities, aligned with your career goals and unlock new opportunities for your future
          </p>
        </div>
        <CourseSection screenSize={size} menuData={menuData} />
      </div>
    </section>
  );
};

export default Courses;
