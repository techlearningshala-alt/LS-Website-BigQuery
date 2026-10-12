import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import UniversityBanner from "@/components/universitypage/UniversityBanner";
import UniversityCourseFee from "@/components/universitypage/UniversityCourseFee";
import UniversityEmi from "@/components/universitypage/UniversityEmi";
import UniversityScholarship from "@/components/universitypage/UniversityScholarship";
import UniversityApprovalLogos from "@/components/universitypage/UniversityApprovalLogos";
import UniversityReviews from "@/components/universitypage/UniversityReviews";
import UniversityOtherPopularColleges from "@/components/universitypage/UniversityOtherPopularColleges";
import FeeHighlights from "@/components/programmticSeo/FeeHighlights";
import FeeBreakdown from "@/components/programmticSeo/FeeBreakdown";
import FeeFaqs from "@/components/programmticSeo/FeeFaqs";
import HowWeHelpYou from "@/components/programmticSeo/HowWeHelpYou";
import Head from "next/head";
import React from "react";
import {
  getUniversityCourseDetailData,
  getUniversityData,
  getUniversityDetailData,
} from "@/services/UniversitypageService";
import PaymentMethods from "@/components/programmticSeo/PaymentMethods";
import RefundPolicy from "@/components/programmticSeo/RefundPolicy";
import UniversityCourses from "@/components/universitypage/UniversityCourses";
import { getFeeStructureCommonFaqs } from "@/components/programmticSeo/FeeStructureCommonFaqs";

export async function getStaticPaths() {
  const res = await getUniversityData();
  const universityList = res?.data?.data?.data || [];
  const paths = [];

  universityList.forEach((university) => {
    (university?.course_data || []).forEach((course) => {
      paths.push({
        params: {
          universitySlug: university.university_slug,
          courseSlug: course.slug,
        },
      });
    });
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { universitySlug, courseSlug } = params;

  const resUniversityList = await getUniversityData();
  const resUniversityData = await getUniversityDetailData(params);
  const res = await getUniversityCourseDetailData({
    universitySlug,
    courseSlug,
  });

  const courseDetail = res?.data?.data || null;
  const universitiesList = resUniversityList?.data?.data?.data || [];
  const universityDetailData =
    (await resUniversityData?.data?.data?.data) || null;

  if (
    !courseDetail ||
    courseDetail.is_page_created === false ||
    !universityDetailData ||
    universityDetailData.is_page_created === false ||
    universityDetailData.is_active === 0
  ) {
    return { notFound: true };
  }

  return {
    props: {
      courseDetail,
      universityDetailData,
      universitiesList,
    },
    revalidate: 60,
  };
}

const CourseFeeStructurePage = ({
  screenSize,
  courseDetail,
  universityDetailData,
  universitiesList,
}) => {
  const checkUniversityReviews =
    universityDetailData?.sections?.Student_Ratings?.length > 0 &&
    universityDetailData?.sections?.Student_Ratings[0]?.name?.trim() !== "";
  const checkCourseReviews =
    courseDetail?.sections_transformed?.Student_Ratings?.[0]?.name?.trim() !==
    "";
  const universityReviews =
    universityDetailData?.sections?.Student_Ratings || [];
  const courseReviews =
    courseDetail?.sections_transformed?.Student_Ratings || [];
  const allReviews = checkCourseReviews ? courseReviews : universityReviews;

  const courseName = courseDetail?.h1Tag || courseDetail?.name || "Course";
  const universityName = universityDetailData?.university_name || "";
  const universitySlug = universityDetailData?.university_slug;
  const courseSlug = courseDetail?.slug;

  const title = `${courseName} Fee Structure 2026 - EMI & Scholarship`;
  const description = `Check ${courseName} fee structure for 2026, including semester-wise fees, total course fees, EMI options, scholarships, and refund policy.`;
  const canonical = `https://learningshala.com/university/${universitySlug}/${courseSlug}/fee-structure/`;

  const universityCourseList = universityDetailData?.course_data.filter(course => course?.slug !== courseSlug) || [];

  const universityOtherCourseList = universityCourseList.filter(course => course.slug !== courseDetail?.slug);

  const universitySpecializationList = courseDetail?.specialization_data?.map(
    (specialization) => specialization
  );

  const commonFaqs = getFeeStructureCommonFaqs(universityName);
  const allFaqCategories =
    courseDetail?.university_faqs ?? universityDetailData?.university_faqs ?? [];
  const feeCategory = allFaqCategories.find((cat) => {
    const name = cat?.category?.toLowerCase() ?? "";
    return (
      name.includes("fee") ||
      name.includes("fees") ||
      name.includes("emi") ||
      name.includes("payment") ||
      name.includes("scholarship")
    );
  });
  const faqSchemaItems = [ ...(feeCategory?.items ?? []),...commonFaqs];

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />


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
          "name": courseDetail?.name || courseName,
          "item": `https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/${courseDetail?.slug}/fee-structure/`
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
            <BreadcrumbLink href={`/university/${universitySlug}/`}>
              {universityName?.replace(/-/g, " ")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/university/${universitySlug}/${courseSlug}/`}>
              {courseDetail?.name || courseName}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Fee Structure</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <UniversityBanner
        universityDetailData={universityDetailData || []}
        courseData={courseDetail}
        screenSize={screenSize}
        bannerHeading={`${courseName} Fee Structure 2026`}
        allReviews={allReviews}
      />

      <div className="bg-gray-100 py-4 md:py-10 sec_mb">
        <div className="container">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <FeeHighlights
                id="fee-highlights"
                title={`${courseName} Fee Highlights`}
                courseData={courseDetail}
              />

              {/* <FeeBreakdown
                id="fee-breakdown"
                title={`${courseName} Fee Breakdown`}
                courseData={courseDetail}
              /> */}

              {courseDetail?.sections_transformed?.Course_Fees && (
                <UniversityCourseFee
                  id="university-course-fee"
                  title={
                    // courseDetail?.sections_transformed?.Course_Fees_heading ||
                    `${courseName} Fee Structure`
                  }
                  courseData={courseDetail}
                />
              )}

              {universityDetailData?.sections?.University_Emi && (
                <UniversityEmi
                  id="university-emi"
                  title={
                    // courseDetail?.sections_transformed?.University_Emi_heading ||
                    `EMI & Financial Support of ${courseName}`
                  }
                  courseData={courseDetail}
                  universityData={universityDetailData}
                />
              )}

              <UniversityScholarship
                id="university-scholarship"
                title={
                  // courseDetail?.sections_transformed
                  //   ?.Scholarships_Program_heading ||
                  `Scholarships for ${courseName}`
                }
                courseData={courseDetail}
                universityData={universityDetailData}
              />
               <UniversityApprovalLogos
                id="university-approval-logos"
                title={`Approvals & Accreditations of ${universityName}`}
                universityData={universityDetailData}
              />
              <RefundPolicy
                id="refund-policy"
                title="Refund Policy"
                universityData={universityDetailData}
                courseData={courseDetail}
              />
              <PaymentMethods
                id="payment-methods"
                title="Payment Methods"
                universityData={universityDetailData}
                courseData={courseDetail}
              />

             

              <FeeFaqs
                id="fee-faqs"
                title="Fees & EMI FAQs"
                universityData={universityDetailData}
                courseData={courseDetail}
                commonFaqs={getFeeStructureCommonFaqs(universityName)}
              />

<UniversityCourses
                id="courses-offered"
                title={`${courseName} Specializations`}
                universityData={universityDetailData}
                // courseListData={universityCourseList}
                courseData={courseDetail}
                specializationListData= { universitySpecializationList.length > 0 ? universitySpecializationList : universityOtherCourseList}
                
              />

              {/* <HowWeHelpYou
                id="how-we-help-you"
                title="How LearningShala Helps You"
                universityData={universityDetailData}
              /> */}

              {(checkCourseReviews || checkUniversityReviews) && (
                <UniversityReviews
                  id="university-reviews"
                  title={
                    courseDetail?.sections_transformed
                      ?.Student_Ratings_heading ||
                    universityDetailData?.sections?.Student_Ratings_heading ||
                    `Student Reviews & Ratings - ${universityName}`
                  }
                  allReviews={allReviews}
                  universityData={universityDetailData}
                />
              )}

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

export default CourseFeeStructurePage;
