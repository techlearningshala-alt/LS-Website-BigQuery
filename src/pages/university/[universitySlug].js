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
import UniversityCourses from "@/components/universitypage/UniversityCourses";
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
  getUniversityData,
  getUniversityDetailData,
} from "@/services/UniversitypageService";
import { List, VerifiedIcon } from "lucide-react";
import React from "react";
import Head from "next/head";
import ContentModal from "@/components/custom/shared/modal/ContentModal";
import Image from "next/image";
import UniversityWorthIt from "@/components/universitypage/UniversityWorthIt";

export async function getStaticPaths() {
  const res = await getUniversityData();
  const universityList = (await res?.data?.data?.data) || [] || null;
  // console.log(universityList, "universityList");
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

  if (!universityDetailData || universityDetailData.is_page_created === false || universityDetailData.is_active === 0) {
    return { notFound: true }; // ✅ Avoids TypeError during build
  }
  return {
    props: {
      universityDetailData: universityDetailData,
      universitiesList: universitiesList,
    },
    revalidate: 60,
  };
}

const University = ({ screenSize, universityDetailData, universitiesList }) => {
  const checkUniversityReviews =
    universityDetailData?.sections?.Student_Ratings?.length > 0 && universityDetailData?.sections?.Student_Ratings[0]?.name?.trim() !== "";
  const universityReviews =
    universityDetailData?.sections?.Student_Ratings || [];

  const universityCourseList = universityDetailData?.course_data || [];

  const allFaqItemsForSchema =
  universityDetailData?.university_faqs?.flatMap(category => category.items) || [];


  const title = universityDetailData?.meta_title ? universityDetailData?.meta_title : `${universityDetailData?.university_name} - Fees, Admission 2026 & Placement`;
  const description = universityDetailData?.meta_description ? universityDetailData?.meta_description : `Explore ${universityDetailData?.university_name} courses fees, university facts, approvals, scholarship, emi details, how to apply, reviews, exams, placements, faqs and more.`;

  // console.log(universityDetailData, "universityDetailData");

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
<link rel="canonical" href={`https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/`} />
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={`https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/`} />
<meta property="og:site_name" content="LearningShala" />
<meta property="og:image" content={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${universityDetailData?.banners?.[0]?.banner_image}`} />
<meta property="og:image:alt" content="LearningShala Logo" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="en_IN" />
<meta property="og:image:type" content="image/webp" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${universityDetailData?.banners?.[0]?.banner_image}`} />
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
        }
      ]
    },
    null,
    2 
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
      "@id": `https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/#college`,
      "name": universityDetailData?.university_name,
      "url": `https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/`,
      "description": description,
      "mainEntityOfPage": {
        "@id": `https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/#webpage`
      },
      "address": {
        "@type": "PostalAddress",
        "addressRegion": universityDetailData?.university_location,
        "addressCountry": "IN"
      },
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_S3_BASE_URL}${universityDetailData?.university_logo ? universityDetailData?.university_logo : "https://learningshala.com/images/icons/logo.webp"}`
      },
      "award": universityDetailData?.approvals?.map(approval => approval?.title),
    },
    null,
    2
  ),
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
      "@id": `https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/#courses`,
      "name": `${universityDetailData?.university_name} Courses`,
      "description": `UGC-approved Online UG and PG degree programs offered by ${universityDetailData?.university_name}.`,
      "url": `https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/`,
      "numberOfItems": universityCourseList?.length || 0,
      "itemListOrder": "https://schema.org/ItemListOrderAscending",
      "itemListElement": [
        universityDetailData?.course_data?.map((course, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": course?.name,
          "url": `https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/${course?.slug}/`
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
      "@id": `https://learningshala.com/university/${universityDetailData && universityDetailData?.university_slug}/#faq`,
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
            {universityDetailData?.university_name?.replace(/-/g, " ")}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <UniversityBanner
        universityDetailData={universityDetailData || []}
        screenSize={screenSize}
        bannerHeading={universityDetailData?.university_name}
        allReviews={universityReviews}
      />
      

      {/* new Design */}
      <div className="bg-gray-100 py-4 md:py-10 sec_mb">
        <div className="container">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-3 hidden md:block">
          
            </div>
            <div className="col-span-12 md:col-span-9">

        


        <div className="flex justify-between items-end gap-2 flex-wrap mb-2">
<ContentModal trigger={ <div className="flex items-center gap-2">
           <span className="rounded-full flex items-center justify-center text-xl font-bold"> <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${universityDetailData?.author_image}`} alt={universityDetailData?.author_name} width={50} height={50} className='rounded-md mb-2 border-2 border-white' /></span>
            <p className="flex flex-col !m-0 text-left">
              {" "}
              <span className="italic text-[12px]">Written By</span>
              <span className="font-semibold text-sm">
                {universityDetailData?.author_name}
              </span>
            </p>
          </div>} content={<>
  <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${universityDetailData?.author_image}`} alt={universityDetailData?.author_name} width={100} height={100} className='rounded-xl mb-2 border-2 border-white' />
  <p className='text-md font-bold'>{universityDetailData?.author_name}</p>
  <p className='text-black mb-2 text-sm font-semibold'>{universityDetailData?.author_label}</p>
  <p className='text-muted-foreground mb-2 text-sm font-semibold'>{universityDetailData?.author_designation}</p>
  <div className='text-muted-foreground mb-4 text-sm' dangerouslySetInnerHTML={{ __html: universityDetailData?.author_details }} />
</>} />


{universityDetailData?.verifier_name !== null && <ContentModal trigger={ <div className="flex items-center gap-2">
           <span className="rounded-full flex items-center justify-center text-xl font-bold"> <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${universityDetailData?.verifier_image}`} alt={universityDetailData?.verifier_name} width={50} height={50} className='rounded-md mb-2 border-2 border-white' /></span>
            <p className="flex flex-col !m-0 text-left">
              {" "}
              <span className="italic text-[12px]">Reviewed by</span>
              <span className="font-semibold text-[12px] flex items-center gap-1">
              <b>{universityDetailData?.verifier_name}</b> 
              </span>
              <span className="font-semibold text-[12px] flex items-center gap-1">
             <VerifiedIcon className="w-4 h-4 text-green-500" /> LS Certified Expert
              </span>
            </p>
          
          </div>} content={<>
  <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${universityDetailData?.verifier_image}`} alt={universityDetailData?.verifier_name} width={100} height={100} className='rounded-xl mb-2 border-2 border-white' />
  <p className='text-md font-bold'>{universityDetailData?.verifier_name}</p>
  <p className="font-semibold text-[12px] flex items-center gap-1 mb-4">
             <VerifiedIcon className="w-4 h-4 text-green-500" /> LS Certified Expert
              </p>
  <p className='text-black mb-2 text-sm font-semibold'>{universityDetailData?.verifier_label}</p>
  <p className='text-muted-foreground mb-2 text-sm font-semibold'>{universityDetailData?.verifier_designation}</p>
  <div className='text-muted-foreground mb-4 text-sm' dangerouslySetInnerHTML={{ __html: universityDetailData?.verifier_details }} />
</>} />}

  
        </div> 




            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-3 left_wrapper hidden md:block">
              <nav className="content_card sticky top-0 z-10">
                <p className="!text-lg font-semibold mb-3 flex items-center gap-2">
                  <List className="w-4 h-4" /> Table of Contents
                </p>

                <ol
                  className="sticky top-0"
                  style={{ listStyleType: "none", paddingLeft: "0px" }}
                >
                  {/* <TocList id="latest-updates" title="Latest Updates" /> */}
                  <TocList id="university-desc" title="About University" />
                  <TocList id="university-why-choose" title="Why Choose" />
                  <TocList
                    id="university-approval-logos"
                    title="Approvals"
                  />
                  <TocList
                    id="university-key-benefits"
                    title="Key Highlights"
                  />
                  {universityCourseList?.length > 0 && (
                    <TocList id="courses-offered" title="Courses & Fees" />
                  )}
                  <TocList
                    id="university-admission-process"
                    title="Admission Process"
                  />
                  {universityDetailData?.sections?.University_Emi &&  <TocList
                    id="university-emi"
                    title="EMI & Financial Support"
                  />}
                 
                  {universityDetailData?.sections?.Scholarships_Program && <TocList id="university-scholarship" title="Scholarship" /> }
                  
                  <TocList id="university-lms" title="LMS & Study Materials" />
                  <TocList id="university-examination" title="Examination" />
                  <TocList
                    id="university-sample-certificate"
                    title="Sample Certificate"
                  />
                  {/* <TocList id="university-fee-detail" title="Fee Detail" /> */}

                  <TocList
                    id="university-placement"
                    title="Career & Placement Details"
                  />
  {universityDetailData?.sections?.Worth_It && (
                    <TocList id="university-worth-it" title="Worth It" />
                  )}

                  {universityDetailData?.sections?.University_Faculties?.length > 0 && <TocList id="university-faculties" title="Faculty" />}
                  

                  {checkUniversityReviews && (
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
            Last Updated : {universityDetailData?.updated_at ? formatDate(universityDetailData?.updated_at) : ''}
          </p>
              <UniversityLatestUpdate
                id="latest-updates"
                title={'Latest Updates'}
                universityData={universityDetailData}
              />

              <UniversityDesc
                id="university-desc"
                title={universityDetailData?.sections?.About_University_heading || `About ${universityDetailData?.university_name}`}
                universityData={universityDetailData}
              />
              <UniversityWhyChoose
                id="university-why-choose"
                title={universityDetailData?.sections?.Why_Choose_heading || `Why Choose ${universityDetailData?.university_name}`}
                universityData={universityDetailData}
              />
              <UniversityApprovalLogos
                id="university-approval-logos"
                title={`Approvals of ${universityDetailData?.university_name}`}
                universityData={universityDetailData}
              />
              <UniversityKeyBenefits
                id="university-key-benefits"
                title={universityDetailData?.sections?.Key_Highlights_heading || `Key Highlights of ${universityDetailData?.university_name}`}
                universityData={universityDetailData}
              />

              <UniversityCourses
                id="courses-offered"
                title={`Courses & Fees at ${universityDetailData?.university_name}`}
                universityData={universityDetailData}
                courseListData={universityCourseList}
                
              />

              <UniversityAdmissionProcess
                id="university-admission-process"
                title={universityDetailData?.sections?.Admission_Process_heading || `Admission Process 2026 ${universityDetailData?.university_name}`}
                universityData={universityDetailData}
              />
              {universityDetailData?.sections?.University_Emi && <UniversityEmi
                id="university-emi"
                title={universityDetailData?.sections?.University_Emi_heading || `EMI & Financial Support of ${universityDetailData?.university_name}`}
                universityData={universityDetailData}
              />}
              
              <UniversityScholarship
                id="university-scholarship"
                title={universityDetailData?.sections?.Scholarships_Program_heading || `Scholarships of ${universityDetailData?.university_name}`}
                universityData={universityDetailData}
              />
              <UniversityLMS
                id="university-lms"
                title={universityDetailData?.sections?.Learning_Management_SystemLMS_heading || `LMS & Study Materials of ${universityDetailData?.university_name}`}
                universityData={universityDetailData}
              />
              <UniversityExamination
                id="university-examination"
                title={universityDetailData?.sections?.Examination_Pattern_heading || `Examination Pattern of ${universityDetailData?.university_name}`}
                universityData={universityDetailData}
              />
              <UniversitySampleCertificate
                id="university-sample-certificate"
                title={universityDetailData?.sections?.Sample_Certificate_heading || `Sample Certificate of ${universityDetailData?.university_name}`}
                universityData={universityDetailData}
              />
              {/* <UniversityFeeDetail
                id="university-fee-detail"
                title={`Fee Details of ${universityDetailData?.university_name}`}
                universityData={universityDetailData}
              /> */}

              <UniversityPlacement
                id="university-placement"
                title={universityDetailData?.sections?.Placements_Details_heading || `Career & Placement Details of ${universityDetailData?.university_name}`}
                universityData={universityDetailData}
              />
              {universityDetailData?.sections?.Worth_It && (
              <UniversityWorthIt
                id="university-worth-it"
                title={universityDetailData?.sections?.Worth_It_heading || `Is ${universityDetailData?.university_name} Worth It?`}
                universityData={universityDetailData}
              />
              )}
              <UniversityFaculties
                id="university-faculties"
                title={universityDetailData?.sections?.University_Faculties_heading || `Faculty of ${universityDetailData?.university_name}`}
                universityData={universityDetailData}
              />

              {checkUniversityReviews && (
                <UniversityReviews
                  id="university-reviews"
                  title={universityDetailData?.sections?.Student_Ratings_heading || `Student Reviews & Ratings ${universityDetailData?.university_name}`}
                  allReviews={universityReviews}
                  universityData={universityDetailData}
                />
              )}


              <UniversityFaq
                id="university-faq"
                title="FAQs"
                universityData={universityDetailData}
              />

              <UniversityOtherPopularColleges
                id="university-other-popular-colleges"
                title="Other Popular Online Universities"
                universityData={universityDetailData}
                universitiesList={universitiesList}
              />

{universityDetailData?.author_details && (
<div className="p-6 bg-white rounded-lg mb-6" id='university-author-details'>
 <div className='flex items-center gap-2'>
 <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${universityDetailData?.author_image}`} alt={universityDetailData?.author_name} width={60} height={60} className='rounded-full mb-2 border-2 border-white' />
 <div>
 <p className='text-md font-bold'>{universityDetailData?.author_name}</p>
 <p className='text-muted-foreground mb-2 text-sm font-semibold'>{universityDetailData?.author_label}</p>
 </div>
 </div>

<div className='text-muted-foreground mb-4 text-sm' dangerouslySetInnerHTML={{ __html: universityDetailData?.author_details }} />
</div>
)}


            </div>
          </div>
        </div>
      </div>

      {/* new Design end */}
    </div>
  );
};

export default University;
