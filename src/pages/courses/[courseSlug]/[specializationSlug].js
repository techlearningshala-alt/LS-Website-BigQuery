import CoursePageAdmissionProcess from "@/components/coursePage/CoursePageAdmissionProcess";
import CoursePageBanner from "@/components/coursePage/CoursePageBannerImage";
import CoursePageBannerInfo from "@/components/coursePage/CoursePageBannerInfo";
import CoursePageDegreeWorthIt from "@/components/coursePage/CoursePageDegreeWorthIt";
import CoursePageEligibility from "@/components/coursePage/CoursePageEligibility";
import CoursePageFees from "@/components/coursePage/CoursePageFee";
import CoursePageJobs from "@/components/coursePage/CoursePageCareerOpportunities";
import CoursePageKeyHighlight from "@/components/coursePage/CoursePageKeyHighlight";
import CoursePageLoan from "@/components/coursePage/CoursePageEMI";
import CoursePageToc from "@/components/coursePage/CoursePageToc";
import CoursePageWhyChoose from "@/components/coursePage/CoursePageWhyChoose";
import React, { useEffect } from "react";
import CoursePageWhoCanPursue from "@/components/coursePage/CoursePageWhoCanPursue";
import CoursePageOverview from "@/components/coursePage/CoursePageOverview";
import CoursePageSyllabusSubjects from "@/components/coursePage/CoursePageSyllabusSubjects";
import CoursePageSpecialization from "@/components/coursePage/CoursePageSpecialization";
import {
    getCoursesByDomain,
  getCoursesBySlug,
  getSpecializationBySlug,
} from "@/services/MenuService";
import UniversityFaq from "@/components/universitypage/UniversityFaq";
import { ChevronLeftIcon, ChevronRightIcon, List } from "lucide-react";
import CoursePageTopRecruiters from "@/components/coursePage/CoursePageTopRecruiters";
import CoursePagePlacementPartners from "@/components/coursePage/CoursePagePlacementPartners";
import Head from "next/head";
import CoursePageDuration from "@/components/coursePage/CoursePageDuration";
import CoursePageExamPattern from "@/components/coursePage/CoursePageExamPattern";
import StickyBlogFooter from "@/components/blog/StickyBlogFooter";


export async function getStaticPaths() {
    const res = await getCoursesByDomain();
    const grouped = res?.data?.data || {};
    const flatCourses = Object.values(grouped).flat();
  
    const paths = [];
  
    flatCourses.forEach((course) => {
      const courseSlug = course.course_slug?.toLowerCase();
  
      // ✅ If specializations exist
      if (Array.isArray(course.specialization_data)) {
        course.specialization_data.forEach((specialization) => {
          paths.push({
            params: {
              courseSlug,
              specializationSlug: specialization.slug.toLowerCase(),
            },
          });
        });
      }
    });
  
    return {
      paths,
      fallback: "blocking",
    };
  }
  
  
  export async function getStaticProps({ params }) {
    try {
      const { courseSlug, specializationSlug } = params;
  
      const res = await getCoursesBySlug(courseSlug);
      const courseData = res?.data?.data || null;

      const resSpecialization = await getSpecializationBySlug({
        courseSlug,
        specializationSlug,
      });
      const specializationData = resSpecialization?.data?.data || null;
  
      if (!courseData) {
        return { notFound: true };
      }

      if (!specializationData) {
        return { notFound: true };
      }
  
      return {
        props: { courseData, courseSlug, specializationData },
        revalidate: 60,
      };
    } catch (error) {
      console.error("❌ Error in getStaticProps:", error);
      return { notFound: true };
    }
  }





const SpecializationPage = ({
  courseData,
  specializationData,
  screenSize,
  
}) => {
  // console.log(params, "params");
  // console.log(courseData, "courseData");
  // console.log(specializationData, "specializationData");
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
    specializationData?.faq_data?.flatMap(category => category.items) || [];

  // console.log(specializationData, "specializationData");

  return (
    <>
         <Head>
        <title>
        
          {specializationData?.meta_title ? specializationData?.meta_title : `${specializationData?.h1Tag} - Fees, Syllabus, Career in 2026`}
        </title>
        <meta
          key="description"
          name="description" 
          content={
            
            specializationData?.meta_description ? specializationData?.meta_description : `Explore ${specializationData?.h1Tag} 2026 with details on fees, eligibility, UGC-approved universities, admission, syllabus, exams, EMI and career options.
`
          }
        />
        <link rel="canonical" href={`https://learningshala.com/courses/${courseData && courseData?.slug}/${specializationData && specializationData?.slug}/`} />



        <meta property="og:type" content="website" />
<meta property="og:title" content={specializationData?.meta_title ? specializationData?.meta_title : `${specializationData?.h1Tag} - Course Fees, Syllabus, Admission, Jobs in 2026`} />
<meta property="og:description" content={specializationData?.meta_description ? specializationData?.meta_description : `Explore ${specializationData?.h1Tag} 2026 with details on fees, eligibility, UGC-approved colleges, admission, syllabus, exams, and career options. Enroll now!`} />
<meta property="og:url" content={`https://learningshala.com/courses/${courseData && courseData?.slug}/${specializationData && specializationData?.slug}/`} />
<meta property="og:site_name" content="LearningShala" />
<meta property="og:image" content={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${specializationData?.banners[0]?.banner_image}`} />
<meta property="og:image:alt" content="LearningShala Logo" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="en_IN" />
<meta property="og:image:type" content="image/webp" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={specializationData?.meta_title ? specializationData?.meta_title : `${specializationData?.h1Tag} - Course Fees, Syllabus, Admission, Jobs in 2026`} />
<meta name="twitter:description" content={specializationData?.meta_description ? specializationData?.meta_description : `Explore ${specializationData?.h1Tag} 2026 with details on fees, eligibility, UGC-approved colleges, admission, syllabus, exams, and career options. Enroll now!`} />
<meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${specializationData?.banners[0]?.banner_image}`} />
<meta name="twitter:image:alt" content={specializationData?.meta_image_alt ? specializationData?.meta_image_alt : "LearningShala Logo"} />
<meta name="twitter:creator" content="@Learning_shala" />
<meta name="twitter:site" content="@Learning_shala" />



<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `https://learningshala.com/courses/${courseData?.slug}/${specializationData?.slug}/#webpage`,
      "url": `https://learningshala.com/courses/${courseData?.slug}/${specializationData?.slug}/`,
      "name": specializationData?.meta_title
        ? specializationData?.meta_title
        : `${specializationData?.h1Tag} - Course Fees, Syllabus, Admission, Jobs in 2026`,
      "description": specializationData?.meta_description
        ? specializationData?.meta_description
        : `Explore ${specializationData?.h1Tag} 2026 with details on fees, eligibility, UGC-approved colleges, admission, syllabus, exams, and career options. Enroll now!`,
      "inLanguage": "en-IN",
      "isPartOf": {
        "@id": "https://learningshala.com/#website"
      },
      "about": {
        "@id": "https://learningshala.com/#organization"
      },
      "mainEntity": [
        {
          "@id": `https://learningshala.com/courses/${courseData?.slug}/${specializationData?.slug}/#course`
        },
        {
          "@id": `https://learningshala.com/courses/${courseData?.slug}/${specializationData?.slug}/#specializations`
        },
        {
          "@id": `https://learningshala.com/courses/${courseData?.slug}/${specializationData?.slug}/#faq`
        }
      ],
      "potentialAction": {
        "@type": "ReadAction",
        "target": `https://learningshala.com/courses/${courseData?.slug}/${specializationData?.slug}/`
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
      "@id": `https://learningshala.com/courses/${courseData?.slug}/${specializationData?.slug}/#breadcrumb`,
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
          "item": `https://learningshala.com/courses/${courseData?.slug}/`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": specializationData?.name,
          "item": `https://learningshala.com/courses/${courseData?.slug}/${specializationData?.slug}/`
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
      "@id": `https://learningshala.com/courses/${courseData?.slug}/${specializationData?.slug}/#course`,
      "name": courseData?.name,
      "description": specializationData?.meta_description
        ? specializationData?.meta_description
        : `Explore ${specializationData?.h1Tag} 2026 with details on fees, eligibility, UGC-approved colleges, admission, syllabus, exams, and career options. Enroll now!`,
      "inLanguage": "en-IN",
      "educationalCredentialAwarded": `${specializationData?.name} Degree`,
     "timeRequired": `${specializationData?.duration_for_schema?.month ? `P${specializationData?.duration_for_schema?.month}M` : `P${specializationData?.duration_for_schema?.year}Y`}`,
              "competencyRequired": `${specializationData?.eligibility}`,
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
      "url": `https://learningshala.com/courses/${courseData?.slug}/${specializationData?.slug}/`
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
                "@id": `https://learningshala.com/courses/${courseData?.slug}/${specializationData?.slug}/#faq`,
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
            <CoursePageToc id="course-overview" title="Course Overview" />
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
            <CoursePageToc id="course-duration" title="Course Duration" />

            <CoursePageToc id="course-subjects" title="Syllabus / Subjects" />
{courseData?.sections?.exam_pattern && (
            <CoursePageToc id="exam-pattern" title="Exam Pattern" />
            )}

            <CoursePageToc id="course-fee" title="Course Fee Details" />
            <CoursePageToc id="course-emi" title="EMI & Financial Support" />
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
            <CoursePageBanner courseData={courseData} screenSize={screenSize} specializationData={specializationData} title={specializationData?.h1Tag} />
          </div>
          <div className="col-span-12 md:col-span-8 shadow-sm p-6 rounded-lg flex relative">
            <CoursePageBannerInfo
              courseData={courseData}
              screenSize={screenSize}
              specializationData={specializationData}
            />
          </div>
         
        </div>
      </div>
      <div className="bg-gray-100 py-10 sec_mb">
        <div className="container">
          <CoursePageOverview
            id="course-overview"
            title={`${specializationData?.sections?.course_overview_heading ? specializationData?.sections?.course_overview_heading : `What is ${specializationData?.h1Tag}?`}`}
            courseData={courseData}
            specializationData={specializationData}
            screenSize={screenSize}
          />
          <CoursePageWhyChoose
            id="course-why-choose"
            title={`${specializationData?.sections?.why_choose_heading ? specializationData?.sections?.why_choose_heading : `Why Choose ${specializationData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
            specializationData={specializationData}
          />
          <CoursePageWhoCanPursue
            id="course-who-can-pursue"
            title={`${specializationData?.sections?.who_can_pursue_1_heading ? specializationData?.sections?.who_can_pursue_1_heading : `Who Can Pursue ${specializationData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
            specializationData={specializationData}
          />
          <CoursePageKeyHighlight
            id="course-key-highlights"
            title={`${specializationData?.sections?.key_highlights_heading ? specializationData?.sections?.key_highlights_heading : `Key Highlights of ${specializationData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
            specializationData={specializationData}
          />
          {courseData?.specialization_data?.length > 0 && (
            <CoursePageSpecialization
              id="course-specializations"
              title={`Other Specializations of ${courseData?.h1Tag}`}
              courseData={courseData}
              screenSize={screenSize}
            />
          )}

          <CoursePageEligibility
            id="course-eligibility"
            title={`${specializationData?.sections?.eligibility_criteria_heading ? specializationData?.sections?.eligibility_criteria_heading : `Eligibility Criteria of ${specializationData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
            specializationData={specializationData}
          />

<CoursePageDuration
            id="course-duration"
            title={`${specializationData?.sections?.course_duration_heading ? specializationData?.sections?.course_duration_heading : `Duration of ${specializationData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
            specializationData={specializationData}
          />

          <CoursePageSyllabusSubjects
            id="course-subjects"
            title={`${specializationData?.sections?.syllabus_subjects_heading ? specializationData?.sections?.syllabus_subjects_heading : `Syllabus & Subjects of ${specializationData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
            specializationData={specializationData}
          />

{courseData?.sections?.exam_pattern && (
<CoursePageExamPattern
           id="exam-pattern"
           title={`${specializationData?.sections?.exam_pattern_heading ? specializationData?.sections?.exam_pattern_heading : `Exam Pattern of ${specializationData?.h1Tag}`}`}
           courseData={courseData}
           specializationData={specializationData}
           screenSize={screenSize}
          />
          )}

          <CoursePageFees
            id="course-fee"
            title={`${specializationData?.sections?.course_fee_details_heading ? specializationData?.sections?.course_fee_details_heading : `Fee Details of ${specializationData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
            specializationData={specializationData}
          />

          <CoursePageLoan
            id="course-emi"
            title={`${specializationData?.sections?.emi_financial_support_heading ? specializationData?.sections?.emi_financial_support_heading : `EMI & Financial Support for ${specializationData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
            specializationData={specializationData}
          />
          <CoursePageAdmissionProcess
            id="course-admission-process"
            title={`${specializationData?.sections?.admission_process_heading ? specializationData?.sections?.admission_process_heading : `Admission Process of ${specializationData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
            specializationData={specializationData}
          />
          <CoursePageDegreeWorthIt
            id="course-worth-it"
            title={`${specializationData?.sections?.worth_it_heading ? specializationData?.sections?.worth_it_heading : `Is an ${specializationData?.h1Tag} Worth It?`}`}
            courseData={courseData}
            screenSize={screenSize}
            specializationData={specializationData}
          />
          <CoursePageJobs
            id="course-career-opportunities"
            title={`${specializationData?.sections?.career_opportunities_heading ? specializationData?.sections?.career_opportunities_heading : `Career Opportunities After ${specializationData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
            specializationData={specializationData}
          />
            <CoursePageTopRecruiters
            id="course-top-recruiters"
            title={`${specializationData?.sections?.top_recruiters_heading ? specializationData?.sections?.top_recruiters_heading : `Top Recruiters of ${specializationData?.h1Tag}`}`}
            courseData={courseData}
            screenSize={screenSize}
            specializationData={specializationData}
          />
            <CoursePagePlacementPartners
            id="course-placement-partners"
            title={`${specializationData?.sections?.placement_partners_heading ? specializationData?.sections?.placement_partners_heading : `Top Employers in Demand`}`}
            courseData={courseData}
            screenSize={screenSize}
            specializationData={specializationData}
          />
          <UniversityFaq
            id="course-faqs"
            title={`FAQs of ${specializationData?.h1Tag}`}
            courseDegreeData={courseData}
            specializationDegreeData={specializationData}
          />
        </div>
      </div>

      <div className="hidden md:block">
<StickyBlogFooter />
</div>
    </>
  );
};

export default SpecializationPage;
