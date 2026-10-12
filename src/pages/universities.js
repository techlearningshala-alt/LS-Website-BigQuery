import MainHeading from "@/components/custom/shared/MainHeading";
import { getUniversityData } from "@/services/UniversitypageService";
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import UniversityCardSkeleton from "@/components/custom/homepage/allUniversitySection/UniversityCardSkeleton";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export async function getStaticProps() {
  const universitiesList = await getUniversityData().then(
    (response) => response?.data?.data?.data || []
  );

  return {
    props: {
      universitiesList: universitiesList,
    },
    revalidate: 60,
  };
}

const Universities = ({universitiesList}) => {
    const loading = !universitiesList || universitiesList.length === 0;

    const title = "Top UGC-Approved Universities - LearningShala";
    const description = "Choose UGC-approved online universities in India for UG, PG, diploma, certificate, and job-ready programs, and protect yourself from fake online institutions.";
  return (
    <div>
      <Head>
<title>{title}</title>
<meta key="description" name="description" content={description} />
<link rel="canonical" href="https://learningshala.com/universities/" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content="https://learningshala.com/universities/" />
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
              // null,
              // 2 

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
                "@id": "https://learningshala.com/universities/#webpage",
                "url": "https://learningshala.com/universities/",
                "name": "Top UGC-Approved Universities - LearningShala",
                "description": "Choose UGC-approved online universities in India for UG, PG, diploma, certificate, and job-ready programs, and protect yourself from fake online institutions.",
                "inLanguage": "en-IN",
                "isPartOf": {
                  "@id": "https://learningshala.com/#website"
                },
                "about": {
                  "@id": "https://learningshala.com/#organization"
                },
                "mainEntity": {
                  "@id": "https://learningshala.com/universities/#top-university"
                },
                "potentialAction": {
                  "@type": "ReadAction",
                  "target": "https://learningshala.com/universities/"
                }
              },
              // null,
              // 2 

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
                "@id": "https://learningshala.com/universities/#breadcrumb",
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
                    "name": "Universities",
                    "item": "https://learningshala.com/universities/"
                  }
                ]
              },
              // null,
              // 2 

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
      "numberOfItems": universitiesList?.length || 0,
      "itemListElement":
        universitiesList?.map((university, index) => ({
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

            </Head>
      <div className="container">
        <div className="bg-[#faf9f7] py-8 px-6 rounded-2xl mb-6 flex flex-col items-center justify-center">
          {" "}
        <h1 className="text-3xl font-bold mb-2"> All{" "}
        <span className="text-primary">Top UGC-Approved Universities</span></h1>
          <p className="text-center">
          Choose UGC-approved online universities in India for UG, PG, diploma, certificate, and job-ready programs, and protect yourself from fake online institutions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 mb-4 md:mb-10">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => (
                    <div className="text-center px-2 relative group" key={i}>
                      <UniversityCardSkeleton />
                    </div>
                    ))
                  : universitiesList.map((university, index) => (
                      <Card className="text-center px-2 relative group" key={index}>
                        <CardHeader className="px-1">
                          <CardTitle>
                            <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${university?.university_logo}`} alt="university" width={100} height={100} className="mb-3 mx-auto" style={{ objectFit: "contain", aspectRatio: "2/1" }} />
                            <p className="text-gray-500 text-xs line-clamp-2 font-black mb-0">{university?.university_name}</p>
                          </CardTitle>
                        </CardHeader>
                        <Link className="absolute inset-0" href={`/university/${university?.university_slug}`}></Link>
                      </Card>
                    ))}
                
              </div>
      </div>
    </div>
  );
};

export default Universities;
