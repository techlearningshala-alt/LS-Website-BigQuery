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
  getUniversitySpecializationDetailData,
} from "@/services/UniversitypageService";
import { List, VerifiedIcon } from "lucide-react";
import React from "react";
import UniversityEligibilityCriteria from "@/components/universitypage/UniversityEligibilityCriteria";
import UniversitySyllabusCurriculum from "@/components/universitypage/UniversitySyllabusCurriculum";
import UniversityJobOpportunities from "@/components/universitypage/UniversityJobOpportunities";
import Head from "next/head";
import Image from "next/image";
import ContentModal from "@/components/custom/shared/modal/ContentModal";
import UniversityCourseFee from "@/components/universitypage/UniversityCourseFee";
import UniversityWorthIt from "@/components/universitypage/UniversityWorthIt";

export async function getStaticPaths() {
  const res = await getUniversityData();
  const universityList = res?.data?.data?.data || [];
  const paths = [];

  universityList.forEach((university) => {
    (university.course_data || []).forEach((course) => {
      (course.specialization_data || []).forEach((specialization) => {
        paths.push({
          params: {
            universitySlug: university.university_slug,
            courseSlug: course.slug,
            specializationSlug: specialization.slug,
          },
        });
      });
    });
  });

  return {
    paths,
    fallback: "blocking",
  };
}
export async function getStaticProps({ params }) {
  const { universitySlug, courseSlug, specializationSlug } = params;

  const resUniversityList = await getUniversityData();
  const resUniversityData = await getUniversityDetailData(params);
  const res = await getUniversityCourseDetailData({
    universitySlug,
    courseSlug,
  });
  const resSpecialization = await getUniversitySpecializationDetailData({
    universitySlug,
    courseSlug,
    specializationSlug,
  });

  const courseDetail = res?.data?.data || null;
  const specializationDetail = resSpecialization?.data?.data || null;
  const universitiesList = resUniversityList?.data?.data?.data || [];
  const universityDetailData =
    (await resUniversityData?.data?.data?.data) || null;
  if (!courseDetail || !specializationDetail || specializationDetail.is_page_created === false) {
    return { notFound: true };
  }

  return {
    props: {
      courseDetail,
      specializationDetail,
      params,
      universityDetailData,
      universitiesList,
    },
    revalidate: 60,
  };
}

const CoursePage = ({
  courseDetail,
  specializationDetail,
  params,
  universityDetailData,
  universitiesList,
}) => {
  //   console.log("Course Details:", courseDetail);
  // console.log("Specialization Details:", specializationDetail);
  // console.log("Params in Component:", params);

  // const otherCourseList = universityDetailData?.course_data;
  // console.log(otherCourseList, "otherCourseList");

  const checkUniversityReviews =
    universityDetailData?.sections?.Student_Ratings?.length > 0 && universityDetailData?.sections?.Student_Ratings[0]?.name?.trim() !== "";
  const checkCourseReviews =
    courseDetail?.sections_transformed.Student_Ratings[0]?.name?.trim() !== "";
  const checkSpecializationReviews =
    specializationDetail?.sections_transformed.Student_Ratings[0]?.name?.trim() !== "";
  const universityReviews =
    universityDetailData?.sections?.Student_Ratings || [];
  const courseReviews =
    courseDetail?.sections_transformed.Student_Ratings || [];
  const specializationReviews =
    specializationDetail?.sections_transformed.Student_Ratings || [];



  const otherSpecializationList = courseDetail?.specialization_data.filter(
    (specialization) => specialization.slug !== specializationDetail?.slug
  );

  // console.log(otherSpecializationList, "checkSpecializationChild");


  const title = specializationDetail?.meta_title ? specializationDetail?.meta_title : `${specializationDetail?.h1Tag} - Fees & Admission 2026`;
  const description = specializationDetail?.meta_description ? specializationDetail?.meta_description : `Explore ${specializationDetail?.h1Tag} in 2026, including fees, eligibility, admission process, syllabus, exams, placements, and career options.`;


  const allFaqItemsForSchema =
  specializationDetail?.university_faqs?.flatMap(category => category?.items) || [];

// console.log(allFaqItemsForSchema, "allFaqItemsForSchema");


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
        <link rel="canonical" href={`https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/${specializationDetail?.slug}/`} />
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={`https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/${courseDetail?.slug}/${specializationDetail?.slug}/`} />
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
      "@id": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/${specializationDetail?.slug}/#webpage`,
      "url": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/${specializationDetail?.slug}/`,
      "name": title,
      "description": description,
      "inLanguage": "en-IN",
      "isPartOf": {
        "@id": "https://learningshala.com/#website"
      },
      "about": {
        "@id": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/${specializationDetail?.slug}/#specialization`
      },
      "mainEntity": [
        {
          "@id": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/${specializationDetail?.slug}/#course`,
        },
        {
          "@id": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/${specializationDetail?.slug}/#faq`
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
        "target": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/${specializationDetail?.slug}/`
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
       },
       {
        "@type": "ListItem",
        "position": 5,
        "name": specializationDetail?.name,
        "item": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/${specializationDetail?.slug}/`
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
      "name": specializationDetail?.name,
      "url": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/${specializationDetail?.slug}/`,
      "description": specializationDetail?.meta_description
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
      "@id": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/${specializationDetail?.slug}/#specialization`,
      "name": specializationDetail?.name,
      "description": specializationDetail?.meta_description,
      "url": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/${specializationDetail?.slug}/`,
      "inLanguage": "en-IN",
      "timeRequired": `${specializationDetail?.duration_for_schema?.month ? `P${specializationDetail?.duration_for_schema?.month}M` : `P${specializationDetail?.duration_for_schema?.year}Y`}`,
      "competencyRequired": specializationDetail?.eligibility,
      "provider": {
        "@type": "CollegeOrUniversity",
        "@id": `https://learningshala.com/university/${universityDetailData?.university_slug}/`
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
        "category": `${specializationDetail?.h1Tag} Fees`,
        "price": specializationDetail?.fee_type_values?.full_fee,
        "priceCurrency": "INR",
        "url": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/${specializationDetail?.slug}/`
      },
   
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
      "@id": `https://learningshala.com/university/${universityDetailData?.university_slug}/${courseDetail?.slug}/${specializationDetail?.slug}/#faq`,
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
            <BreadcrumbLink href={`/university/${universityDetailData?.university_slug}/${courseDetail?.slug}`}>{courseDetail?.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{specializationDetail?.name}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <UniversityBanner
        universityDetailData={universityDetailData || []}
        courseData={courseDetail}
        specializationData={specializationDetail}
        bannerHeading={specializationDetail?.h1Tag ? specializationDetail?.h1Tag : specializationDetail?.name}
        allReviews={
          checkSpecializationReviews
            ? specializationReviews
            : checkCourseReviews
              ? courseReviews
              : universityReviews
        }
      />

      <div className="bg-gray-100 py-4 md:py-10 sec_mb">
        <div className="container">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-3 hidden md:block"></div>
            <div className="col-span-12 md:col-span-9">
            {/* <div className="flex justify-between items-end gap-2 mb-3 flex-wrap">

            <div className="flex items-center gap-4 cursor-pointer">
           <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold"> <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${specializationDetail?.author_image}`} alt={specializationDetail?.author_name} width={30} height={30} className='rounded-full mb-2 border-2 border-white' /></span>
            <p className="flex flex-col !m-0 text-left">
              {" "}
              <span className="italic text-[12px]">Written By</span>
              <span className="font-semibold text-sm">
                {specializationDetail?.author_name}
              </span>
            </p>
          </div>

          <p className="!m-0 text-[12px] text-muted-foreground">
            Last Updated : {specializationDetail?.updated_at ? formatDate(specializationDetail?.updated_at) : ''}
          </p>



        </div> */}



        <div className="flex justify-between items-end gap-2 flex-wrap mb-2">
<ContentModal trigger={ <div className="flex items-center gap-2">
           <span className="rounded-full flex items-center justify-center text-xl font-bold"> <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${specializationDetail?.author_image}`} alt={specializationDetail?.author_name} width={50} height={50} className='rounded-md mb-2 border-2 border-white' /></span>
            <p className="flex flex-col !m-0 text-left">
              {" "}
              <span className="italic text-[12px]">Written By</span>
              <span className="font-semibold text-sm">
                {specializationDetail?.author_name}
              </span>
            </p>
          </div>} content={<>
  <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${specializationDetail?.author_image}`} alt={specializationDetail?.author_name} width={100} height={100} className='rounded-xl mb-2 border-2 border-white' />
  <p className='text-md font-bold'>{specializationDetail?.author_name}</p>
  <p className='text-black mb-2 text-sm font-semibold'>{specializationDetail?.author_label}</p>
  <p className='text-muted-foreground mb-2 text-sm font-semibold'>{specializationDetail?.author_designation}</p>
  <div className='text-muted-foreground mb-4 text-sm' dangerouslySetInnerHTML={{ __html: specializationDetail?.author_details }} />
</>} />


{specializationDetail?.verifier_name !== null &&

<ContentModal trigger={ <div className="flex items-center gap-2">
           <span className="rounded-full flex items-center justify-center text-xl font-bold"> <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${specializationDetail?.verifier_image}`} alt={specializationDetail?.verifier_name} width={50} height={50} className='rounded-md mb-2 border-2 border-white' /></span>
            <p className="flex flex-col !m-0 text-left">
              {" "}
              <span className="italic text-[12px]">Reviewed by</span>
              <span className="font-semibold text-[12px] flex items-center gap-1">
              <b>{specializationDetail?.verifier_name}</b> 
              </span>
              <span className="font-semibold text-[12px] flex items-center gap-1">
             <VerifiedIcon className="w-4 h-4 text-green-500" /> LS Certified Expert
              </span>
            </p>
          
          </div>} content={<>
  <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${specializationDetail?.verifier_image}`} alt={specializationDetail?.verifier_name} width={100} height={100} className='rounded-xl mb-2 border-2 border-white' />
  <p className='text-md font-bold'>{specializationDetail?.verifier_name}</p>
  <p className="font-semibold text-[12px] flex items-center gap-1 mb-4">
             <VerifiedIcon className="w-4 h-4 text-green-500" /> LS Certified Expert
              </p>
  <p className='text-black mb-2 text-sm font-semibold'>{specializationDetail?.verifier_label}</p>
  <p className='text-muted-foreground mb-2 text-sm font-semibold'>{specializationDetail?.verifier_designation}</p>
  <div className='text-muted-foreground mb-4 text-sm' dangerouslySetInnerHTML={{ __html: specializationDetail?.verifier_details }} />
</>} />}

  
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

                  {specializationDetail?.sections_transformed?.Course_Fees && (
                    <TocList id="university-course-fee" title="Course Fee" />
                  )}
                  <TocList id="university-eligibility-criteria" title="Eligibility Criteria" />
                  <TocList id="specialization-offered" title={otherSpecializationList ? 'Other Specializations' : ""} />
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
                  <TocList id="university-faculties" title="Faculty" />


                  <TocList id="university-job-opportunities" title="Career & Job Options" />
                  {specializationDetail?.sections_transformed?.Worth_It && (
                    <TocList id="university-worth-it" title="Worth It" />
                  )}
                  {(checkSpecializationReviews) && (
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
            <p className="!m-0 text-[12px] text-muted-foreground">
            Last Updated : {specializationDetail?.updated_at ? formatDate(specializationDetail?.updated_at) : ''}
          </p>
              <UniversityLatestUpdate
                id="latest-updates"
                title={`Latest Updates`}
                courseData={courseDetail}
                specializationData={specializationDetail}
                universityData={universityDetailData}
              />

              <UniversityDesc
                id="university-desc"
                title={specializationDetail?.sections_transformed?.About_University_heading || `About ${specializationDetail?.h1Tag}`}
                courseData={courseDetail}
                universityData={universityDetailData}
                specializationData={specializationDetail}
              />
              <UniversityWhyChoose
                id="university-why-choose"
                title={specializationDetail?.sections_transformed?.Why_Choose_heading || `Why Choose ${specializationDetail?.h1Tag}`}
                courseData={courseDetail}
                universityData={universityDetailData}
                specializationData={specializationDetail}
              />
              <UniversityApprovalLogos
                id="university-approval-logos"
                title={`Approvals of ${specializationDetail?.h1Tag}`}
                universityData={universityDetailData}
              />
              <UniversityKeyBenefits
                id="university-key-benefits"
                title={specializationDetail?.sections_transformed?.Key_Highlights_heading || `Course Highlight & Benefits ${specializationDetail?.h1Tag}`}
                courseData={courseDetail}
                universityData={universityDetailData}
                specializationData={specializationDetail}
              />

              {specializationDetail?.sections_transformed?.Course_Fees && (
                <UniversityCourseFee
                  id="university-course-fee"
                  title={specializationDetail?.sections_transformed?.Course_Fees_heading || `${specializationDetail?.h1Tag} Fee Structure`}
                  courseData={courseDetail}
                  specializationData={specializationDetail}
                />
              )}
              <UniversityEligibilityCriteria
                id="university-eligibility-criteria"
                title={specializationDetail?.sections_transformed?.Eligibility_Criteria_heading || `Eligibility Criteria for ${specializationDetail?.h1Tag}`}
                courseData={courseDetail}
                universityData={universityDetailData}
                specializationData={specializationDetail}
              />
              <UniversityCourses
                id="specialization-offered"
                title={otherSpecializationList ? 'Other Specializations by ' + courseDetail?.h1Tag : ""}
                universityData={universityDetailData}
                courseData={courseDetail}
                specializationData={specializationDetail}


                courseListData={otherSpecializationList}
                
              />
              <UniversityAdmissionProcess
                id="university-admission-process"
                title={specializationDetail?.sections_transformed?.Admission_Process_heading || `${specializationDetail?.h1Tag} Admission Process 2026 (Step-by-Step)`}
                courseData={courseDetail}
                universityData={universityDetailData}
                specializationData={specializationDetail}
              />
              {universityDetailData?.sections?.University_Emi && <UniversityEmi
                id="university-emi"
                title={specializationDetail?.sections_transformed?.University_Emi_heading || `EMI & Financial Support of ${specializationDetail?.h1Tag}`}
                courseData={courseDetail}
                universityData={universityDetailData}
                specializationData={specializationDetail}
              /> }
              <UniversitySyllabusCurriculum
                id="university-syllabus-curriculum"
                title={specializationDetail?.sections_transformed?.Syllabus_Curriculum_heading || `Syllabus & Curriculum of ${specializationDetail?.h1Tag}`}
                courseData={courseDetail}
                universityData={universityDetailData}
                specializationData={specializationDetail}
              />
              <UniversityScholarship
                id="university-scholarship"
                title={specializationDetail?.sections_transformed?.Scholarships_Program_heading || `Scholarships of ${specializationDetail?.h1Tag}`}
                courseData={courseDetail}
                universityData={universityDetailData}
                specializationData={specializationDetail}
              />
              <UniversityLMS
                id="university-lms"
                title={specializationDetail?.sections_transformed?.Learning_Management_SystemLMS_heading || `LMS & Study Materials of ${specializationDetail?.h1Tag}`}
                courseData={courseDetail}
                universityData={universityDetailData}
                specializationData={specializationDetail}
              />
              <UniversityExamination
                id="university-examination"
                title={specializationDetail?.sections_transformed?.Examination_Pattern_heading || `Examination Pattern of ${specializationDetail?.h1Tag}`}
                courseData={courseDetail}
                universityData={universityDetailData}
                specializationData={specializationDetail}
              />
              <UniversitySampleCertificate
                id="university-sample-certificate"
                title={specializationDetail?.sections_transformed?.Sample_Certificate_heading || `Sample Certificate of ${specializationDetail?.h1Tag}`}
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
                specializationData={specializationDetail}
              /> */}
              <UniversityFaculties
                id="university-faculties"
                title={`Know Your Faculty Before Enrolling`}
                courseData={courseDetail}
                universityData={universityDetailData}
                specializationData={specializationDetail}
              />


              <UniversityJobOpportunities
                id="university-job-opportunities"
                title={specializationDetail?.sections_transformed?.Job_Opportunities_heading || `Career & Job Opportunities After ${specializationDetail?.h1Tag}`}
                courseData={courseDetail}
                universityData={universityDetailData}
                specializationData={specializationDetail}
              />
              {specializationDetail?.sections_transformed?.Worth_It && (
              <UniversityWorthIt
                id="university-worth-it"
                title={specializationDetail?.sections_transformed?.Worth_It_heading || `Is ${specializationDetail?.h1Tag} Worth It?`}
                courseData={courseDetail}
                universityData={universityDetailData}
                specializationData={specializationDetail}
              />
              )}
              {(checkSpecializationReviews) && (
                <UniversityReviews
                  id="university-reviews"
                  title={specializationDetail?.sections_transformed?.Student_Ratings_heading || `Student Reviews & Ratings`}
                  courseData={courseDetail}
                  universityData={universityDetailData}
                  allReviews={specializationReviews || []}
                />
              )}



              <UniversityFaq
                id="university-faq"
                title="FAQs"
                courseData={courseDetail}
                universityData={universityDetailData}
                specializationData={specializationDetail}

              />

              <UniversityOtherPopularColleges
                id="university-other-popular-colleges"
                title="Other Popular Online Universities"
                universityData={universityDetailData}
                universitiesList={universitiesList}
              />

{specializationDetail?.author_details && (
<div className="p-6 bg-white rounded-lg mb-6" id='university-author-details'>
 <div className='flex items-center gap-2'>
 <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${specializationDetail?.author_image}`} alt={specializationDetail?.author_name} width={60} height={60} className='rounded-full mb-2 border-2 border-white' />
 <div>
 <p className='text-md font-bold'>{specializationDetail?.author_name}</p>
 <p className='text-muted-foreground mb-2 text-sm font-semibold'>{specializationDetail?.author_label}</p>
 </div>
 </div>

<div className='text-muted-foreground mb-4 text-sm' dangerouslySetInnerHTML={{ __html: specializationDetail?.author_details }} />
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
