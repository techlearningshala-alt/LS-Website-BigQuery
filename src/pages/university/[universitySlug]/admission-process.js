import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import UniversityAdmissionProcess from "@/components/universitypage/UniversityAdmissionProcess";
import UniversityBanner from "@/components/universitypage/UniversityBanner";
import React from "react";
import Head from "next/head";
import { getUniversityData, getUniversityDetailData } from "@/services/UniversitypageService";
import DocumentRequired from "@/components/programmticSeo/DocumentRequired";
import VisualTimeline from "@/components/programmticSeo/VisualTimeline";
import UniversityApprovalLogos from "@/components/universitypage/UniversityApprovalLogos";
import AdmissionFaqs from "@/components/programmticSeo/AdmissionFaqs";
import { getCommonFaqs } from "@/components/programmticSeo/CommonFaq";
import UniversityReviews from "@/components/universitypage/UniversityReviews";
import UniversityOtherPopularColleges from "@/components/universitypage/UniversityOtherPopularColleges";
import HowWeHelpYou from "@/components/programmticSeo/HowWeHelpYou";
import KeyPoints from "@/components/programmticSeo/KeyPoints";
import EligibilityCriteria from "@/components/programmticSeo/EligibilityCriteria";
import UniversityCourses from "@/components/universitypage/UniversityCourses";


export async function getStaticPaths() {
  const res = await getUniversityData();
  const universityList = (await res?.data?.data?.data) || [];
  const paths = universityList?.map((university) => ({
    params: { universitySlug: university?.university_slug },
  }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const universitiesList = await getUniversityData().then(
    (response) => response?.data?.data?.data || []
  );
  const res = await getUniversityDetailData(params);
  const universityDetailData = (await res?.data?.data?.data) || null;

  if (
    !universityDetailData ||
    universityDetailData.is_page_created === false ||
    universityDetailData.is_active === 0
  ) {
    return { notFound: true };
  }

  return {
    props: {
      universityDetailData,
      universitiesList,
    },
    revalidate: 60,
  };
}

const UniversityAdmissionProcessPage = ({
  screenSize,
  universityDetailData,
  universitiesList,
}) => {
  const universityReviews = universityDetailData?.sections?.Student_Ratings || [];

  const title = `${universityDetailData?.university_name} Admission Process - 2026 Guide`;
  const description = `Check ${universityDetailData?.university_name} admission process for 2026, including eligibility, documents required, application steps, fees and apply online.`;

// console.log(universityDetailData,'universityDetailData');

  const universityName = universityDetailData?.university_name || "";
  const commonFaqs = getCommonFaqs(universityName);
  const allFaqCategories = universityDetailData?.university_faqs ?? [];
  const admissionCategory = allFaqCategories.find((cat) =>
    cat?.category?.toLowerCase().includes("admission")
  );
  const faqSchemaItems = [
   
    ...(admissionCategory?.items ?? []), ...commonFaqs
  ];

  const universityCourseList = universityDetailData?.course_data || [];

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link
          rel="canonical"
          href={`https://learningshala.com/university/${universityDetailData?.university_slug}/admission-process/`}
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:url"
          content={`https://learningshala.com/university/${universityDetailData?.university_slug}/admission-process/`}
        />

<script
id="WebPage-schema"
type="application/ld+json"

dangerouslySetInnerHTML={{
  __html: JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/#webpage`,
      "url": `https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/`,
      "name": title,
      "description": description,
      "inLanguage": "en-IN",
      "isPartOf": {
        "@id": "https://learningshala.com/#website"
      },
      "about": {
        "@id": `https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/#university`
      },
      "mainEntity":[
        {
          "@id": `https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/#university`,
        },
        {
          "@id": `https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/#faq`
        }
      ],
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1"]
      },
      "potentialAction": {
        "@type": "ReadAction",
        "target": `https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/`
      },"publisher": {
      "@id": "https://learningshala.com/#organization"
     }
     },
    null,
    2 
  )
}}
/> 

<script
id="BreadcrumbList-schema"
type="application/ld+json"

dangerouslySetInnerHTML={{
  __html: JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/#breadcrumb`,
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
          "name": "University",
          "item": "https://learningshala.com/universities/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": universityDetailData?.university_name,
          "item": `https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Admission Process",
          "item": `https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/admission-process/`
        }
      ]
    },
    null,
    2 
  )
}}
/> 

<script

id="FAQPage-schema"
type="application/ld+json"

dangerouslySetInnerHTML={{
  __html: JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/#faq`,
      "mainEntity": faqSchemaItems.map((faq) => ({
        "@type": "Question",
        "name": faq?.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": String(faq?.answer ?? "").replace(/<[^>]*>/g, "")
        }
      }))
    },
    null,
    2 
  )
}}
/>


      </Head>

      <Breadcrumb className="container">
        <BreadcrumbList className="mb-3">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/universities">University</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {universityDetailData?.university_name?.replace(/-/g, " ")}
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Admission Process</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <UniversityBanner
        universityDetailData={universityDetailData || []}
        screenSize={screenSize}
        bannerHeading={`${universityDetailData?.university_name} Admission Process 2026`}
        allReviews={universityReviews}
      />

      <div className="bg-gray-100 py-4 md:py-10 sec_mb">
        <div className="container">
          <div className="grid grid-cols-12 gap-4">
            {/* <div className="col-span-12 lg:col-span-3 hidden md:block"></div> */}

            <div className="col-span-12">
              <KeyPoints
                id="key-points"
                title={`${universityDetailData?.university_name} Admission Highlights`}
                universityData={universityDetailData}
              />
                <VisualTimeline
                id="visual-timeline"
                title={`How Does the Admission Process Work?`}
                universityData={universityDetailData}
              />
              <EligibilityCriteria
                id="eligibility-criteria"
                title={`Eligibility Criteria for ${universityDetailData?.university_name} Admission`}
                
              />
              <UniversityAdmissionProcess
                id="university-admission-process"
                title={
                  `Step-by-Step ${universityDetailData?.university_name}  Admission Process
`
                }
                universityData={universityDetailData}
              />
              <DocumentRequired
                id="document-required"
                title={`Documents Required for ${universityDetailData?.university_name} Admission`}
                universityData={universityDetailData}
              />
            
                <UniversityApprovalLogos
                id="university-approval-logos"
                title={`Approvals of ${universityDetailData?.university_name}`}
                universityData={universityDetailData}
              />
              <AdmissionFaqs
                id="admission-faqs"
                title={"Frequently Asked Questions"}
                universityData={universityDetailData}
                commonFaqs={commonFaqs}
              />
              <HowWeHelpYou
                id="how-we-help-you"
                title={"How LearningShala Helps You"}
                universityData={universityDetailData}
              />
                 <UniversityReviews
                  id="university-reviews"
                  title={`Student Reviews for ${universityDetailData?.university_name}`}
                  allReviews={universityReviews}
                  universityData={universityDetailData}
                />
  <UniversityCourses
                id="courses-offered"
                title={`Courses & Fees at ${universityDetailData?.university_name}`}
                universityData={universityDetailData}
                courseListData={universityCourseList}
                
              />

                 <UniversityOtherPopularColleges
                id="university-other-popular-colleges"
                title="Other Popular Online Universities"
                universityData={universityDetailData}
                universitiesList={universitiesList}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityAdmissionProcessPage;

