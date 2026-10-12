import CoursePageAdmissionProcess from "@/components/coursePage/CoursePageAdmissionProcess";
import CoursePageBanner from "@/components/coursePage/CoursePageBannerImage";
import CoursePageBannerInfo from "@/components/coursePage/CoursePageBannerInfo";
import CoursePageDegreeWorthIt from "@/components/coursePage/CoursePageDegreeWorthIt";
import CoursePageEligibility from "@/components/coursePage/CoursePageEligibility";
import CoursePageFees from "@/components/coursePage/CoursePageFee";
import CoursePageJobs from "@/components/coursePage/CoursePageCareerOpportunities";
import CoursePageKeyHighlight from "@/components/coursePage/CoursePageKeyHighlight";
import CoursePageLoan from "@/components/coursePage/CoursePageEMI";
import CoursePageRelatedArticle from "@/components/coursePage/CoursePageRelatedArticle";
import CoursePageToc from "@/components/coursePage/CoursePageToc";
import CoursePageWhyChoose from "@/components/coursePage/CoursePageWhyChoose";
import React, { useEffect } from "react";
import CoursePageWhoCanPursue from "@/components/coursePage/CoursePageWhoCanPursue";
import CoursePageOverview from "@/components/coursePage/CoursePageOverview";
import CoursePageSyllabusSubjects from "@/components/coursePage/CoursePageSyllabusSubjects";
import CoursePageSpecialization from "@/components/coursePage/CoursePageSpecialization";
import { getCoursesByDomain, getCoursesBySlug } from "@/services/MenuService";
import UniversityFaq from "@/components/universitypage/UniversityFaq";
import { ChevronLeftIcon, ChevronRightIcon, List } from "lucide-react";
import CoursePageDuration from "@/components/coursePage/CoursePageDuration";
import CoursePageTopRecruiters from "@/components/coursePage/CoursePageTopRecruiters";
import CoursePagePlacementPartners from "@/components/coursePage/CoursePagePlacementPartners";
import Head from "next/head";
import { yearsToMonthsExact } from "@/lib/utils";
import CoursePageExamPattern from "@/components/coursePage/CoursePageExamPattern";
import StickyBlogFooter from "@/components/blog/StickyBlogFooter";

export async function getStaticPaths() {
  const res = await getCoursesByDomain();
  const grouped = res?.data?.data || {};

  const flatCourses = Object.values(grouped).flat();

  return {
    paths: flatCourses.map((course) => ({
      params: { courseSlug: course.course_slug.toLowerCase() },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  try {
    const { courseSlug } = params;

    const res = await getCoursesBySlug(courseSlug);
    const courseData = res?.data?.data || null;

    if (!courseData) {
      return { notFound: true };
    }

    return {
      props: { courseData, courseSlug },
      revalidate: 60,
    };
  } catch (error) {
    console.error("❌ Error in getStaticProps:", error);
    return { notFound: true };
  }
}

const CoursePage = ({ courseData, screenSize, courseSlug }) => {
  // console.log(courseSlug, "courseSlug");
  const [scrollClass, setScrollClass] = React.useState("hidden");
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      // Add or remove the desired class based on the scroll position
      if (scrollPosition > 600) {
        setScrollClass("block");
      } else {
        setScrollClass("hidden");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollClass]);


  const allFaqItemsForSchema =
    courseData?.faq_data?.flatMap(category => category.items) || [];

// console.log(courseData, "courseData");


  return (
    <>
      <Head>
        <title>
          {courseData?.meta_title ? courseData?.meta_title : `${courseData?.h1Tag} - Course Fees, Top Colleges, Admission, Jobs in 2026`}
        </title>
        <meta
        key="description"
          name="description"
          content={

            courseData?.meta_description ? courseData?.meta_description : `Discover the best ${courseData?.h1Tag} degree course with details on fees, syllabus, eligibility, top colleges, admission process, and future career options. Enroll now!`
          }
        />
        <link rel="canonical" href={`https://learningshala.com/courses/${courseSlug && courseSlug}/`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={courseData?.meta_title ? courseData?.meta_title : `${courseData?.h1Tag} - Course Fees, Top Colleges, Admission, Jobs in 2026`} />
        <meta property="og:description" content={courseData?.meta_description ? courseData?.meta_description : `Discover the best ${courseData?.h1Tag} degree course with details on fees, syllabus, eligibility, top colleges, admission process, and future career options. Enroll now!`} />
        <meta property="og:url" content={`https://learningshala.com/courses/${courseSlug && courseSlug}/`} />
        <meta property="og:site_name" content="LearningShala" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${courseData?.banners[0]?.banner_image}`} />
        <meta property="og:image:alt" content="LearningShala Logo" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:image:type" content="image/webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={courseData?.meta_title ? courseData?.meta_title : `${courseData?.h1Tag} - Course Fees, Top Colleges, Admission, Jobs in 2026`} />
        <meta name="twitter:description" content={courseData?.meta_description ? courseData?.meta_description : `Discover the best ${courseData?.h1Tag} degree course with details on fees, syllabus, eligibility, top colleges, admission process, and future career options. Enroll now!`} />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${courseData?.banners[0]?.banner_image}`} />
        <meta name="twitter:image:alt" content="LearningShala Logo" />
        <meta name="twitter:creator" content="@Learning_shala" />
        <meta name="twitter:site" content="@Learning_shala" />


        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": `https://learningshala.com/courses/${courseSlug}/#webpage`,
              "url": `https://learningshala.com/courses/${courseSlug}/`,
              "name": courseData?.meta_title
                ? courseData?.meta_title
                : `${courseData?.h1Tag} - Course Fees, Top Colleges, Admission, Jobs in 2026`,
              "description": courseData?.meta_description
                ? courseData?.meta_description
                : `Discover the best ${courseData?.h1Tag} degree course with details on fees, syllabus, eligibility, top colleges, admission process, and future career options. Enroll now!`,
              "inLanguage": "en-IN",
              "isPartOf": {
                "@id": "https://learningshala.com/#website"
              },
              "about": {
                "@id": "https://learningshala.com/#organization"
              },
              // "mainEntity": [
              //   {
              //     "@id": `https://learningshala.com/courses/${courseSlug}/#course`
              //   },
              //   {
              //     "@id": `https://learningshala.com/courses/${courseSlug}/#specializations`
              //   },
              //   {
              //     "@id": `https://learningshala.com/courses/${courseSlug}/#faq`
              //   }
              // ],
              "potentialAction": {
                "@type": "ReadAction",
                "target": `https://learningshala.com/courses/${courseSlug}/`
              }
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "@id": `https://learningshala.com/courses/${courseSlug}/#breadcrumb`,
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
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": courseData?.name,
                  "item": `https://learningshala.com/courses/${courseSlug}/`
                }
              ]
            })
          }}
        />


        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              "@id": `https://learningshala.com/courses/${courseSlug}/#course`,
              "name": courseData?.name,
              "description": courseData?.meta_description
                ? courseData?.meta_description
                : `Discover the best ${courseData?.h1Tag} degree course with details on fees, syllabus, eligibility, top colleges, admission process, and future career options. Enroll now!`,
              "inLanguage": "en-IN",
              "educationalCredentialAwarded": `${courseData?.name} Degree`,
"timeRequired": `${courseData?.duration_for_schema?.month ? `P${courseData?.duration_for_schema?.month}M` : `P${courseData?.duration_for_schema?.year}Y`}`,
              "competencyRequired": `${courseData?.eligibility}`,
              "audience": {
  "@type": "Audience",
  "audienceType": [ "Working Professional", "Student", "Housewife", "Teacher", "Dropout", "Government Job Aspirant","CA Aspirant" ],
  "geographicArea": {
    "@type": "Country",
    "name": "India"
   }
  },
              "provider": {
                "@type": "EducationalOrganization",
                "@id": "https://learningshala.com/#organization",
                "name": "LearningShala",
                "url": "https://learningshala.com/"
              },
              "hasCourseInstance": {
                "@type": "CourseInstance",
                "courseMode": "Online",
                "inLanguage": "en-IN"
              },
              "url": `https://learningshala.com/courses/${courseSlug}/`
            })
          }}
        />


        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "@id": `https://learningshala.com/courses/${courseSlug}/#specializations`,
              "name": `Specializations of ${courseData?.name} Course`,
              "description": `Explore popular ${courseData?.name} specializations to choose the best career path.`,
              "url": `https://learningshala.com/courses/${courseSlug}/`,
              "itemListOrder": "https://schema.org/ItemListOrderAscending",
              "numberOfItems": courseData?.specialization_data?.length || 0,
              "itemListElement":
                courseData?.specialization_data?.map((specialization, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "name": specialization?.name,
                  "url": `https://learningshala.com/courses/${courseSlug}/${specialization?.slug}/`
                })) || []
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "@id": `https://learningshala.com/courses/${courseSlug}/#faq`,
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
      <div className={`sticky top-0 z-10 bg-white shadow ${scrollClass}`}>
        <nav className="container flex items-center gap-2">
          {/* Left Scroll Button */}
          <button
            onClick={() => {
              document
                .getElementById("toc-scroll")
                .scrollBy({ left: -200, behavior: "smooth" });
            }}
            className="px-2"
          >
            <ChevronLeftIcon className="w-4 h-4 cursor-pointer" />
          </button>

          {/* Scrollable TOC */}
          <ol
            id="toc-scroll"
            className="flex gap-6 overflow-x-auto whitespace-nowrap no-scrollbar py-2"
            style={{ listStyleType: "none", paddingLeft: 0 }}
          >
            <CoursePageToc id="course-overview" title="Overview" />
            <CoursePageToc id="course-why-choose" title="Why Choose" />
            <CoursePageToc id="course-who-can-pursue" title="Who Can Pursue" />
            <CoursePageToc id="course-key-highlights" title="Key Highlights" />
            {courseData?.specialization_data?.length > 0 && (
              <CoursePageToc
                id="course-specializations"
                title="Popular Specializations"
              />
            )}
            <CoursePageToc
              id="course-eligibility"
              title="Eligibility Criteria"
            />
            <CoursePageToc id="course-duration" title="Duration" />

            <CoursePageToc id="course-subjects" title="Syllabus / Subjects" />
{courseData?.sections?.exam_pattern && (
            <CoursePageToc id="exam-pattern" title="Exam Pattern" />
            )}
            <CoursePageToc id="course-fee" title="Fee Details" />
            {courseData?.sections?.emi_financial_support && <CoursePageToc id="course-emi" title="EMI Facility" />}

            <CoursePageToc
              id="course-admission-process"
              title="Admission Process"
            />
            <CoursePageToc id="course-worth-it" title="Worth It?" />
            <CoursePageToc
              id="course-career-opportunities"
              title="Career Opportunities"
            />
            <CoursePageToc id="course-faqs" title="FAQs" />
          </ol>

          {/* Right Scroll Button */}
          <button
            onClick={() => {
              document
                .getElementById("toc-scroll")
                .scrollBy({ left: 200, behavior: "smooth" });
            }}
            className="px-2"
          >
            <ChevronRightIcon className="w-4 h-4 cursor-pointer" />
          </button>
        </nav>
      </div>{" "}
      <div className="container sec_mb">
        <div className="grid grid-cols-12 gap-6 sec_mb">
        <div className="col-span-12 md:col-span-4 shadow-sm p-4 rounded-lg">
            <CoursePageBanner courseData={courseData} screenSize={screenSize} title={courseData?.h1Tag} />
          </div>
          <div className="col-span-12 md:col-span-8 shadow-sm p-6 rounded-lg flex relative">
            <CoursePageBannerInfo
              courseData={courseData}
              screenSize={screenSize}
            />
          </div>
        
        </div>
      </div>
      <div className="bg-gray-100 py-10 sec_mb">
        <div className="container">
          <CoursePageOverview
            id="course-overview"
            title={`${courseData?.sections?.course_overview_heading ? courseData?.sections?.course_overview_heading : `What is ${courseData?.h1Tag}?`}`}
            courseData={courseData}
            screenSize={screenSize}
          />
          <CoursePageWhyChoose
            id="course-why-choose"
            title={`${courseData?.sections?.why_choose_heading ? courseData?.sections?.why_choose_heading : `Why Choose ${courseData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
          />
          <CoursePageWhoCanPursue
            id="course-who-can-pursue"
            title={`${courseData?.sections?.who_can_pursue_1_heading ? courseData?.sections?.who_can_pursue_1_heading : `Who Can Pursue ${courseData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
          />
          <CoursePageKeyHighlight
            id="course-key-highlights"
            title={`${courseData?.sections?.key_highlights_heading ? courseData?.sections?.key_highlights_heading : `Key Highlights of ${courseData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
          />
          {courseData?.specialization_data?.length > 0 && (
            <CoursePageSpecialization
              id="course-specializations"
              title={`Specializations of ${courseData?.h1Tag}`}
              courseData={courseData}
              screenSize={screenSize}
            />
          )}

          <CoursePageEligibility
            id="course-eligibility"
            title={`${courseData?.sections?.eligibility_criteria_heading ? courseData?.sections?.eligibility_criteria_heading : `Eligibility Criteria of ${courseData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
          />
          <CoursePageDuration
            id="course-duration"
            title={`${courseData?.sections?.course_duration_heading ? courseData?.sections?.course_duration_heading : `Duration of ${courseData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
          />

          <CoursePageSyllabusSubjects
            id="course-subjects"
            title={`${courseData?.sections?.syllabus_subjects_heading ? courseData?.sections?.syllabus_subjects_heading : `Syllabus & Subjects of ${courseData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
          />
          {courseData?.sections?.exam_pattern && (
          <CoursePageExamPattern
           id="exam-pattern"
           title={`${courseData?.sections?.exam_pattern_heading ? courseData?.sections?.exam_pattern_heading : `Exam Pattern of ${courseData?.h1Tag}`}`}
           courseData={courseData}
           screenSize={screenSize}
          />
          )}

          <CoursePageFees
            id="course-fee"
            title={`${courseData?.sections?.course_fee_details_heading ? courseData?.sections?.course_fee_details_heading : `Fee Details of ${courseData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
          />
          {courseData?.sections?.emi_financial_support && <CoursePageLoan
            id="course-emi"
            title={`${courseData?.sections?.emi_financial_support_heading ? courseData?.sections?.emi_financial_support_heading : `EMI & Financial Support for ${courseData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
          />}

          <CoursePageAdmissionProcess
            id="course-admission-process"
            title={`${courseData?.sections?.admission_process_heading ? courseData?.sections?.admission_process_heading : `Admission Process for ${courseData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
          />
          <CoursePageDegreeWorthIt
            id="course-worth-it"
            title={`${courseData?.sections?.worth_it_heading ? courseData?.sections?.worth_it_heading : `Is an ${courseData?.h1Tag} Worth It?`}`}
            courseData={courseData}
            screenSize={screenSize}
          />
          <CoursePageJobs
            id="course-career-opportunities"
            title={`${courseData?.sections?.career_opportunities_heading ? courseData?.sections?.career_opportunities_heading : `Career Opportunities & Job Roles After ${courseData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
          />
          <CoursePageTopRecruiters
            id="course-top-recruiters"
            title={`${courseData?.sections?.top_recruiters_heading ? courseData?.sections?.top_recruiters_heading : `Top Recruiters of ${courseData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}

          />
          <CoursePagePlacementPartners
            id="course-placement-partners"
            title={`${courseData?.sections?.placement_partners_heading ? courseData?.sections?.placement_partners_heading : `Top Employers in Demand`}`}
            courseData={courseData}
            screenSize={screenSize}
          />
          <UniversityFaq
            id="course-faqs"
            title={`FAQs of ${courseData?.h1Tag}`}
            courseDegreeData={courseData}
          />
          {/* <CoursePageRelatedArticle allArticles={allArticles} /> */}
        </div>
      </div>


<div className="hidden md:block">
<StickyBlogFooter />
</div>

    </>
  );
};

export default CoursePage;
