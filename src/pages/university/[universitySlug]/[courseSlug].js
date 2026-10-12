import UniversityCourses from "@/components/universitypage/UniversityCourses";
import TocList from "@/components/universitypage/TocList";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import UniversityAdmissionProcess from "@/components/universitypage/UniversityAdmissionProcess";
import UniversityApprovalLogos from "@/components/universitypage/UniversityApprovalLogos";
import UniversityBanner from "@/components/universitypage/UniversityBanner";
import UniversityDesc from "@/components/universitypage/UniversityDesc";
import UniversityEmi from "@/components/universitypage/UniversityEmi";
import UniversityExamination from "@/components/universitypage/UniversityExamination";
import UniversityFaculties from "@/components/universitypage/UniversityFaculties";
import UniversityFaq from "@/components/universitypage/UniversityFaq";
import UniversityFeeDetail from "@/components/universitypage/UniversityFeeDetail";
import UniversityKeyBenefits from "@/components/universitypage/UniversityKeyBenefits";
import UniversityLatestUpdate from "@/components/universitypage/UniversityLatestUpdate";
import UniversityLMS from "@/components/universitypage/UniversityLMS";
import UniversityOtherPopularColleges from "@/components/universitypage/UniversityOtherPopularColleges";
import UniversityPlacement from "@/components/universitypage/UniversityPlacement";
import UniversityReviews from "@/components/universitypage/UniversityReviews";
import UniversitySampleCertificate from "@/components/universitypage/UniversitySampleCertificate";
import UniversityScholarship from "@/components/universitypage/UniversityScholarship";
import UniversityWhyChoose from "@/components/universitypage/UniversityWhyChoose";
import { formatDate } from "@/lib/utils";
import {
  getUniversityCourseDetailData,
  getUniversityData,
  getUniversityDetailData,
} from "@/services/UniversitypageService";
import { List, VerifiedIcon } from "lucide-react";
import React from "react";
import UniversityEligibilityCriteria from "@/components/universitypage/UniversityEligibilityCriteria";
import UniversitySyllabusCurriculum from "@/components/universitypage/UniversitySyllabusCurriculum";
import UniversityJobOpportunities from "@/components/universitypage/UniversityJobOpportunities";
import Head from "next/head";
import ContentModal from "@/components/custom/shared/modal/ContentModal";
import Image from "next/image";
import UniversityCourseFee from "@/components/universitypage/UniversityCourseFee";
import UniversityWorthIt from "@/components/universitypage/UniversityWorthIt";

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

  if (!courseDetail || courseDetail.is_page_created === false) {
    return { notFound: true };
  }

  return {
    props: {
      courseDetail,
      params,
      universityDetailData,
      universitiesList,
    },
    revalidate: 60,
  };
}

const CoursePage = ({
  courseDetail,
  params,
  universityDetailData,
  universitiesList,
}) => {
  // console.log("Course Details:", courseDetail);
  // console.log("Params in Component:", params);

  // const otherCourseList = universityDetailData?.course_data;
  // console.log(otherCourseList, "otherCourseList");

  const checkUniversityReviews =
  universityDetailData?.sections?.Student_Ratings?.length > 0 && universityDetailData?.sections?.Student_Ratings[0]?.name?.trim() !== "";
  const checkCourseReviews =
    courseDetail?.sections_transformed.Student_Ratings[0]?.name?.trim() !== "";
const universityReviews =
  universityDetailData?.sections?.Student_Ratings || [];
  const courseReviews =
    courseDetail?.sections_transformed.Student_Ratings || [];

    const universityCourseList = universityDetailData?.course_data || [];
    const universityOtherCourseList = universityCourseList.filter(course => course.slug !== courseDetail?.slug);

    const universitySpecializationList = courseDetail?.specialization_data?.map(specialization => specialization);

    // console.log(universitySpecializationList, "universitySpecializationList");

    const title = courseDetail?.meta_title ? courseDetail?.meta_title : `${courseDetail?.h1Tag} - Fees, Eligibility, Admission 2026`;
    const description = courseDetail?.meta_description ? courseDetail?.meta_description : `Explore ${courseDetail?.h1Tag} in 2026, including fees, eligibility, admission process, syllabus, EMI options, exams, placements, and career options.`;

const allFaqItemsForSchema =
courseDetail?.university_faqs?.flatMap(category => category.items) || [];


// console.log(universityDetailData?.banners[0]?.banner_image, "courseDetail");

// console.log(courseDetail, "courseDetail");

  return (
    <div>
         <Head>
        <title>
            {title}
        </title>
        <meta
        key="description"
          name="description"
          content={
            description
          }
        />
        <link rel="canonical" href={`https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/`} />
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={`https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/`} />
<meta property="og:site_name" content="LearningShala" />
<meta property="og:image" content={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${universityDetailData?.banners[0]?.banner_image}`} />
<meta property="og:image:alt" content="LearningShala Logo" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="en_IN" />
<meta property="og:image:type" content="image/webp" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${universityDetailData?.banners[0]?.banner_image}`} />
<meta name="twitter:image:alt" content="LearningShala Logo" />
<meta name="twitter:creator" content="@Learning_shala" />
<meta name="twitter:site" content="@Learning_shala" />


<script
id="WebPage-schema"
type="application/ld+json"

dangerouslySetInnerHTML={{
  __html: JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/#webpage`,
      "url": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/`,
      "name": title,
      "description": description,
      "inLanguage": "en-IN",
      "isPartOf": {
        "@id": "https://learningshala.com/#website"
      },
      "about": {
        "@id": `https://learningshala.com/university/${universityDetailData?.university_slug}/#university`
      },
      
      "mainEntity": [
        {
          "@id": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/#course`,
        },
        {
          "@id": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/#faq`
        }
      ],
 
      "publisher": {
        "@id": "https://learningshala.com/#organization"
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1"]
      },
      "potentialAction": {
        "@type": "ReadAction",
        "target": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/`
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
      "@id": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/`,
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
        "item": `https://learningshala.com/university/${universityDetailData?.university_slug}/`
       },
       {
        "@type": "ListItem",
        "position": 4,
        "name": courseDetail?.name,
        "item": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/`
       }
      ]
     },
   
  )
}}
/>



<script
id="CollegeOrUniversity-schema"
type="application/ld+json"

dangerouslySetInnerHTML={{
  __html: JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "CollegeOrUniversity",
      "@id": `https://learningshala.com/university/${universityDetailData?.university_slug}/#university`,
      "name": universityDetailData?.university_name,
      "url": `https://learningshala.com/university/${universityDetailData?.university_slug}/`,
      "address": {
        "@type": "PostalAddress",
        "addressRegion": universityDetailData?.university_location,
        "addressCountry": "IN"
      }
     },
    null,
    2 
  )
}}
/>

<script
id="Course-schema"
type="application/ld+json"

dangerouslySetInnerHTML={{
  __html: JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "@id": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/#course`,
      "name": courseDetail?.name,
      "description": description,
      "url": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/`,
      "inLanguage": "en-IN",
      "timeRequired": `${courseDetail?.duration_for_schema?.month ? `P${courseDetail?.duration_for_schema?.month}M` : `P${courseDetail?.duration_for_schema?.year}Y`}`,
      "competencyRequired": courseDetail?.eligibility,

              "audience": {
  "@type": "Audience",
  "audienceType": [ "Working Professional", "Student", "Housewife", "Teacher", "Dropout", "Government Job Aspirant","CA Aspirant" ],
  "geographicArea": {
    "@type": "Country",
    "name": "India"
   }
  },
     
      "provider": {
        "@type": "CollegeOrUniversity",
        "@id": `https://learningshala.com/university/${universityDetailData?.university_slug}/#university`
      },
     
      "hasCourseInstance": [
       {
        "@type": "CourseInstance",
        "courseMode": "Online",
        "inLanguage": "en-IN"
       }
      ],
     
      "offers": {
        "@type": "Offer",
        "category": `${courseDetail?.name} Fees`,
        "price": courseDetail?.fee_type_values?.full_fee,
        "priceCurrency": "INR",
        "url": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/`
      },
     
      // "hasCourse": universitySpecializationList.map(specialization => ({
      //   "@type": "Course",
      //   "name": `${specialization?.name}`,
      //   "description": `${courseDetail?.name} specialization in ${specialization?.name}`,
        
      // }))
     },
    null,
    2 
  )
}}
/>


<script
id="ItemList-schema"
type="application/ld+json"

dangerouslySetInnerHTML={{
  __html: JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/${courseDetail?.slug}/#courses`,
      "name": `${courseDetail?.h1Tag} Specializations`,
      "description": `Explore popular specializations of ${courseDetail?.h1Tag} to choose the best career path.`,
      "url": `https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/${courseDetail?.slug}/`,
      "numberOfItems": universitySpecializationList?.length || 0,
      "itemListOrder": "https://schema.org/ItemListOrderAscending",
      "itemListElement": [
        universitySpecializationList?.map((specialization, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": specialization?.name,
         
        })) || []
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
      "@id": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/#faq`,
      "mainEntity": allFaqItemsForSchema.map(faq => ({
        "@type": "Question",
        "name": faq?.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq?.answer.replace(/<[^>]*>/g, "")
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
              <BreadcrumbLink href={`/university/${universityDetailData?.university_slug}`}>{universityDetailData?.university_name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {courseDetail?.name
                ?.replace(/-/g, " ")
               }
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      <UniversityBanner
        universityDetailData={universityDetailData || []}
        courseData={courseDetail}
        bannerHeading={courseDetail?.h1Tag ? courseDetail?.h1Tag : courseDetail?.name}
        allReviews={checkCourseReviews ? courseReviews : universityReviews}
      />
      
      <div className="bg-gray-100 py-4 md:py-10 sec_mb">
        <div className="container">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-3 hidden md:block"></div>
            <div className="col-span-12 md:col-span-9">

<div className="flex justify-between items-end gap-2 flex-wrap mb-2">
<ContentModal trigger={ <div className="flex items-center gap-2">
           <span className="rounded-full flex items-center justify-center text-xl font-bold"> <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${courseDetail?.author_image}`} alt={courseDetail?.author_name} width={50} height={50} className='rounded-md mb-2 border-2 border-white' /></span>
            <p className="flex flex-col !m-0 text-left">
              {" "}
              <span className="italic text-[12px]">Written By</span>
              <span className="font-semibold text-sm">
                {courseDetail?.author_name}
              </span>
            </p>
          </div>} content={<>
  <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${courseDetail?.author_image}`} alt={courseDetail?.author_name} width={100} height={100} className='rounded-xl mb-2 border-2 border-white' />
  <p className='text-md font-bold'>{courseDetail?.author_name}</p>
  <p className='text-black mb-2 text-sm font-semibold'>{courseDetail?.author_label}</p>
  <p className='text-muted-foreground mb-2 text-sm font-semibold'>{courseDetail?.author_designation}</p>
  <div className='text-muted-foreground mb-4 text-sm' dangerouslySetInnerHTML={{ __html: courseDetail?.author_details }} />
</>} />


{courseDetail?.verifier_name !== null && 

(<ContentModal trigger={ <div className="flex items-center gap-2">
  <span className="rounded-full flex items-center justify-center text-xl font-bold"> <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${courseDetail?.verifier_image}`} alt={courseDetail?.verifier_name} width={50} height={50} className='rounded-md mb-2 border-2 border-white' /></span>
   <p className="flex flex-col !m-0 text-left">
     {" "}
     <span className="italic text-[12px]">Reviewed by</span>
     <span className="font-semibold text-[12px] flex items-center gap-1">
     <b>{courseDetail?.verifier_name}</b> 
     </span>
     <span className="font-semibold text-[12px] flex items-center gap-1">
    <VerifiedIcon className="w-4 h-4 text-green-500" /> LS Certified Expert
     </span>
   </p>
 
 </div>} content={<>
<Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${courseDetail?.verifier_image}`} alt={courseDetail?.verifier_name} width={100} height={100} className='rounded-xl mb-2 border-2 border-white' />
<p className='text-md font-bold'>{courseDetail?.verifier_name}</p>
<p className="font-semibold text-[12px] flex items-center gap-1 mb-4">
    <VerifiedIcon className="w-4 h-4 text-green-500" /> LS Certified Expert
     </p>
<p className='text-black mb-2 text-sm font-semibold'>{courseDetail?.verifier_label}</p>
<p className='text-muted-foreground mb-2 text-sm font-semibold'>{courseDetail?.verifier_designation}</p>
<div className='text-muted-foreground mb-4 text-sm' dangerouslySetInnerHTML={{ __html: courseDetail?.verifier_details }} />
</>} />)}

  
        </div> 


            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-3 left_wrapper hidden md:block">
              <nav className="content_card sticky top-0 z-10">
                <p className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <List className="w-4 h-4" /> Table of Contents
                </p>

                <ol
                  className="sticky top-0"
                  style={{ listStyleType: "none", paddingLeft: "0px" }}
                >
                  
                  {/* <TocList id="latest-updates" title="Latest Updates" /> */}
                  <TocList id="university-desc" title="About Course" />
                  <TocList id="university-why-choose" title="Why Choose" />
                  <TocList
                    id="university-approval-logos"
                    title="Approvals"
                  />
                  <TocList
                    id="university-key-benefits"
                    title="Course Highlights"
                  />
{courseDetail?.sections_transformed?.Course_Fees && (
                  <TocList id="university-course-fee" title="Course Fee" />
)}
                  <TocList id="university-eligibility-criteria" title="Eligibility Criteria/Who Can Apply" />
                  <TocList id="courses-offered"  title={`${universitySpecializationList.length > 0 ? 'Specializations & Fees ' :  'Other Courses '}`} />
                  <TocList
                    id="university-admission-process"
                    title="Admission Process"
                  />
                  {universityDetailData?.sections?.University_Emi &&
                  <TocList
                    id="university-emi"
                    title="EMI & Financial Support"
                  /> }
                  <TocList id="university-syllabus-curriculum" title="Syllabus & Curriculum" />
                  <TocList id="university-scholarship" title="Scholarship" />
                  <TocList id="university-lms" title="LMS & Study Materials" />
                  <TocList id="university-examination" title="Examination" />
                  <TocList
                    id="university-sample-certificate"
                    title="Sample Certificate"
                  />
                  {/* <TocList id="university-fee-detail" title="Fee Detail" /> */}

                  {/* <TocList
                    id="university-placement"
                    title="Placement Details"
                  /> */}
                   <TocList id="university-job-opportunities" title="Career & Job Options" />

                   {courseDetail?.sections_transformed?.Worth_It && (
                    <TocList id="university-worth-it" title="Worth It" />
                  )}

                    {universityDetailData?.sections?.University_Faculties?.length > 0 && <TocList id="university-faculties" title="Faculty" />}

                 
                  {(checkCourseReviews) && (
                  <TocList id="university-reviews" title="Reviews" />
                  )}


                 
                  <TocList id="university-faq" title="FAQs" />

                  <TocList
                    id="university-other-popular-colleges"
                    title="Other Popular Universities"
                  />
                </ol>
              </nav>
            </div>
            <div className="col-span-12 lg:col-span-9 right_wrapper"> 
            <p className="mb-1 text-[12px] text-muted-foreground">
            Last Updated : {courseDetail?.updated_at ? formatDate(courseDetail?.updated_at) : ''}
          </p>
              <UniversityLatestUpdate
                id="latest-updates"
                title={`Latest Updates`}
                courseData={courseDetail}
                universityData={universityDetailData}
              />

              <UniversityDesc
                id="university-desc"
                title={courseDetail?.sections_transformed?.About_University_heading || `About ${courseDetail?.h1Tag}`}
                courseData={courseDetail}
                universityData={universityDetailData}
              />
              <UniversityWhyChoose
                id="university-why-choose"
                title={courseDetail?.sections_transformed?.Why_Choose_heading || `Why Choose ${courseDetail?.h1Tag}`}
                courseData={courseDetail}
                universityData={universityDetailData}
              />
              <UniversityApprovalLogos
                id="university-approval-logos"
                title={`Approvals of ${courseDetail?.h1Tag}`}
                universityData={universityDetailData}
              />
              <UniversityKeyBenefits
                id="university-key-benefits"
                title={courseDetail?.sections_transformed?.Key_Highlights_heading || `Course Highlight & Benefits ${courseDetail?.h1Tag}`}
                courseData={courseDetail}
                universityData={universityDetailData}
              />
              {courseDetail?.sections_transformed?.Course_Fees && (
                <UniversityCourseFee
                  id="university-course-fee"
                  title={courseDetail?.sections_transformed?.Course_Fees_heading || `${courseDetail?.h1Tag} Fee Structure`}
                  courseData={courseDetail}
                />
              )}
              <UniversityEligibilityCriteria
                id="university-eligibility-criteria"
                title={courseDetail?.sections_transformed?.Eligibility_Criteria_heading || `Eligibility Criteria for ${courseDetail?.h1Tag}`}
                courseData={courseDetail}
                universityData={universityDetailData}
               
              />
              
               <UniversityCourses
                id="courses-offered"
                title={`${universitySpecializationList.length > 0 ? 'Specializations and Fees 2026 - ' + courseDetail?.h1Tag :  'Other Courses by ' + universityDetailData?.university_name}`}
                universityData={universityDetailData}
                courseData={courseDetail}
                specializationListData= { universitySpecializationList.length > 0 ? universitySpecializationList : universityOtherCourseList}
              />
              
              <UniversityAdmissionProcess
                id="university-admission-process"
                title={courseDetail?.sections_transformed?.Admission_Process_heading || `${courseDetail?.h1Tag} Admission Process 2026 (Step-by-Step)`}
                courseData={courseDetail}
                universityData={universityDetailData}
              />

{universityDetailData?.sections?.University_Emi && <UniversityEmi
                id="university-emi"
                title={courseDetail?.sections_transformed?.University_Emi_heading || `EMI & Financial Support of ${courseDetail?.h1Tag}`}
                courseData={courseDetail}
                universityData={universityDetailData}
              />}

              <UniversitySyllabusCurriculum
                id="university-syllabus-curriculum"
                title={courseDetail?.sections_transformed?.Syllabus_Curriculum_heading || `Syllabus & Curriculum of ${courseDetail?.h1Tag}`}
                courseData={courseDetail}
                universityData={universityDetailData}
              />
              <UniversityScholarship
                id="university-scholarship"
                title={courseDetail?.sections_transformed?.Scholarships_Program_heading || `Scholarships of ${courseDetail?.h1Tag}`}
                courseData={courseDetail}
                universityData={universityDetailData}
              />
              <UniversityLMS
                id="university-lms"
                title={courseDetail?.sections_transformed?.Learning_Management_SystemLMS_heading || `LMS & Study Materials of ${courseDetail?.h1Tag}`}
                courseData={courseDetail}
                universityData={universityDetailData}
              />
              <UniversityExamination
                id="university-examination"
                title={courseDetail?.sections_transformed?.Examination_Pattern_heading || `Examination Pattern of ${courseDetail?.h1Tag}`}
                courseData={courseDetail}
                universityData={universityDetailData}
              />
               <UniversitySampleCertificate
                id="university-sample-certificate"
                title={courseDetail?.sections_transformed?.Sample_Certificate_heading || `Sample Certificate of ${courseDetail?.h1Tag}`}
                universityData={universityDetailData}
              />
              {/* <UniversityFeeDetail
                id="university-fee-detail"
                title="Fee Detail"
                courseData={courseDetail}
                universityData={universityDetailData}
              /> */}

              {/* <UniversityPlacement
                id="university-placement"
                title="Career & Placement Details"
                courseData={courseDetail}
                universityData={universityDetailData}
              /> */}
                <UniversityJobOpportunities
                id="university-job-opportunities"
                title={courseDetail?.sections_transformed?.Job_Opportunities_heading || `Career & Job Opportunities After ${courseDetail?.h1Tag}`}
                courseData={courseDetail}
                universityData={universityDetailData}
              />
              {courseDetail?.sections_transformed?.Worth_It && (
              <UniversityWorthIt
                id="university-worth-it"
                title={courseDetail?.sections_transformed?.Worth_It_heading || `Is ${courseDetail?.h1Tag} Worth It?`}
                courseData={courseDetail}
                universityData={universityDetailData}
              />
              )}
              <UniversityFaculties
                id="university-faculties"
                title={courseDetail?.sections_transformed?.University_Faculties_heading || `Know Your Faculty Before Enrolling`}
                courseData={courseDetail}
                universityData={universityDetailData}
              />

             
            
              {(checkCourseReviews) && (
              <UniversityReviews
                id="university-reviews"
              
                title={courseDetail?.sections_transformed?.Student_Ratings_heading || `Student Reviews & Ratings`}
                courseData={courseDetail}
                universityData={universityDetailData}
                allReviews={courseReviews || []}
              />
              )}



              <UniversityFaq
                id="university-faq"
                title="FAQs"
                courseData={courseDetail}
                universityData={universityDetailData}
              />

              <UniversityOtherPopularColleges
                id="university-other-popular-colleges"
                title={`Explore Other ${courseDetail?.name} Universities`}
                universityData={universityDetailData}
                universitiesList={universitiesList}
              />


{courseDetail?.author_details && (
<div className="p-6 bg-white rounded-lg mb-6" id='university-author-details'>
 <div className='flex items-center gap-2'>
 <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${courseDetail?.author_image}`} alt={courseDetail?.author_name} width={60} height={60} className='rounded-full mb-2 border-2 border-white' />
 <div>
 <p className='text-md font-bold'>{courseDetail?.author_name}</p>
 <p className='text-muted-foreground mb-2 text-sm font-semibold'>{courseDetail?.author_label}</p>
 </div>
 </div>

<div className='text-muted-foreground mb-4 text-sm' dangerouslySetInnerHTML={{ __html: courseDetail?.author_details }} />
</div>
)}


            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CoursePage;
