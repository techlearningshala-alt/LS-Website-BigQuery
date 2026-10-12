import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  Columns2,
  GraduationCap,
  Star,
} from "lucide-react";
import { useCompare } from '@/context/CompareContext'
import { useModal } from '@/context/ModalContext'
import { useLeadForm } from '@/context/LeadFormContext'
import { useLeadGuard } from '../auth/useLeadGuard'
import { toast } from 'sonner'
import Image from 'next/image';
import StarRating from '../universitypage/review/StarRating';
import { Checkbox } from '../ui/checkbox';
import GlobalContentModal from '../custom/shared/modal/GlobalContentModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import ContentModal from '../custom/shared/modal/ContentModal';
import Link from 'next/link';
import { getUniversityDetailData } from '@/services/UniversitypageService'
import useWindowSize from '@/lib/use-window-size';


const stars = [1, 2, 3, 4];

function normalizeReviews(reviews) {
  if (!reviews) return [];
  if (Array.isArray(reviews)) return reviews;
  if (typeof reviews === "object") return Object.values(reviews);
  return [];
}

function getReviewRating(review) {
  const raw = review?.value ?? review?.rating ?? review?.stars;
  const num = Number.parseFloat(raw);
  return Number.isFinite(num) ? num : null;
}

function getAverageRating(reviews) {
  const ratings = normalizeReviews(reviews)
    .map(getReviewRating)
    .filter((rating) => rating !== null);

  if (ratings.length === 0) return 0;
  return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
}

export default function UniversityBarNew({university,feeData}) {

const screenSize = useWindowSize();


    const { compareList, toggleCompare } = useCompare();
    const { showLeadForm } = useLeadForm();
    const { withVerification } = useLeadGuard();
  
    const isChecked = compareList.some(
      (u) => u.university_slug === university.university_slug
    );
  
      const [universityData, setUniversityData] = useState(null);
      const [loading, setLoading] = useState(false);
      const { openModal } = useModal();
      const reviews = normalizeReviews(university?.Student_Ratings);
      const averageRating = getAverageRating(reviews);
      const reviewsModalId = `reviews-${university?.university_slug || university?.id || "item"}`;
    
      const fetchUniversityDetail = async (slug) => {
        if (!slug) return;
    
        try {
          setLoading(true);
    
          const res = await getUniversityDetailData({
            universitySlug: slug, // ✅ correct key
          });
    
          const data = res?.data?.data?.data || null;
    
          // console.log("DETAIL DATA:", data);
    
          setUniversityData(data); // ✅ update state here
        } catch (error) {
          console.error("Fetch error:", error);
        } finally {
          setLoading(false);
        }
      };

    
      // console.log("universityData", university);
      


  
  return (
   <>
    <div className="flex flex-col gap-2 mb-4">
    

    {/* Dark luxury card */}
    <Card
      className="overflow-hidden border-0 rounded-xl py-0 gap-2 shadow-xl"
    >
      {/* Top section */}
      <CardContent className="p-0 relative mt-0 ">
{university?.label && (
      <div
            className="inline-flex items-center gap-2 px-3 py-0.5 rounded-e-xl  bg-green-100 absolute top-0 start-0"
            
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />

            <span className="text-[11px] font-medium tracking-widest text-green-700">
            {university?.label}
            </span>
            
          </div>
)}
        <div className="px-6 pt-6 pb-2 bg-primary/5">
          {/* In-demand chip */}
         

          {/* University identity */}
          <div className="flex items-center gap-4">
            {/* Logo box */}
            <div
              className="rounded-2xl flex items-center justify-center shrink-0"
           
            >
              <div className="text-center leading-tight">
              <Image
              className='border rounded-md p-2 bg-white'
                  style={{minWidth: '100px', minHeight: '30px'}}
                  src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${university?.university_logo}`} alt="college-university" width={120} height={40} />
              </div>
            </div>

            {/* Name + rating */}
            <div>
              <p className="text-lg font-bold text-primary line-clamp-1" style={{ letterSpacing: "-0.01em" }}>
              {university?.university_name}
              </p>
              {/* <p className="text-xs mb-2" style={{ color: "#7a6a58" }}>
                {university?.university_location}· Online Mode
              </p> */}
              {reviews.length > 0 ? (
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => openModal(reviewsModalId)}>
                <div className="flex gap-0.5">
                <StarRating value={averageRating} />
                </div>
                <span className="text-sm font-medium text-primary">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-xs underline" style={{ color: "#7a6a58" }}> reviews</span>
              </div>
              ) : null}
            </div>
          </div>

          {/* Score bar */}
          {/* <div className="mb-5">
            <p className="text-[10px] tracking-[0.1em] uppercase font-medium mb-2" style={{ color: "#7a6a58" }}>
              Overall score
            </p>
            <Progress
              value={84}
              className="h-1 rounded-full"
              style={{ background: "#2e2018" }}
            />
            <div className="flex justify-between mt-1.5">
              <span className="text-xs font-medium text-red-400">84 / 100</span>
              <span className="text-xs" style={{ color: "#7a6a58" }}>Industry avg: 71</span>
            </div>
          </div> */}
        </div>

        {/* <Separator style={{ background: "#2e2018" }} /> */}

        {/* Stats row */}
        <div className="grid grid-cols-3 divide-x px-6 py-3">
          {[
            { 
              label: "Fee", 
              value: university?.fee_types?.semester_fee 
                ? `₹${university.fee_types.semester_fee}` 
                : `₹${university?.fee_types?.full_fee || "N/A"}`,
              sub: university?.fee_types?.semester_fee ? "Per Semester" : "full course",
              icon: <BookOpen className="w-3.5 h-3.5" style={{ color: "#7a6a58" }} /> 
            },
            { label: "Duration", value: university?.duration, sub: "", icon: <GraduationCap className="w-3.5 h-3.5" style={{ color: "#7a6a58" }} /> },
            { label: "Location", value: university?.university_location, sub: "", icon: <Building2 className="w-3.5 h-3.5" style={{ color: "#7a6a58" }} /> },
          ].map((stat) => (
            <div key={stat.label} className="px-4 first:pl-0 last:pr-0" style={{ borderColor: "#f2f2f0" }}>
              <div className="flex items-center gap-1 mb-1">
                {stat.icon}
                <p className="text-[10px] tracking-[0.1em] uppercase font-medium" style={{ color: "#7a6a58" }}>
                  {stat.label}
                </p>
              </div>
              <p className="text-[14px] sm:text-lg font-bold text-black" style={{letterSpacing: "-0.02em" }}>
                {stat.value}
              </p>
              <p className="text-[11px]" style={{ color: "#7a6a58" }}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* <Separator style={{ background: "#2e2018" }} /> */}

        {/* Approvals */}
        <div className="px-6 py-3">
          <p className="text-[10px] tracking-[0.1em] uppercase font-medium mb-3" style={{ color: "#7a6a58" }}>
            Approvals & rankings
          </p>
          <div className="flex flex-wrap gap-2 line-clamp-1">
         

{university?.approvals?.map((approval, index) => (
                          <Badge
                          key={approval.id}
                          className="rounded-full bg-gray-200 text-black px-3 py-1 text-[11px] font-medium border-0"
                          
                        >
                          {approval.title}
                        </Badge>
                      ))}
           
          </div>
        </div>
      </CardContent>

      {/* Footer CTAs */}
      <CardFooter
        className="flex gap-2.5 px-6 mb-2 md:mb-5 justify-end md:justify-between"
       
      >
        {/* Desktop university features modal */}


{screenSize && screenSize.width > 768 ? <ContentModal title={university?.university_name + " Features"} trigger={<ul className="text-[12px] flex flex-col gap-1">
  {university?.university_features?.slice(0, 2).map((feature, index) => (
    <li key={index} className="flex items-center gap-2 text-green-600">
      <ArrowUpRight className="w-3 h-3 text-green-600" />
      {feature}
    </li>
   
  ))}
  {university?.university_features?.length > 2 && (
    <li className="flex items-center gap-2 text-green-600 font-semibold ps-5 underline">More+</li>
  )}
</ul>} content={<ul className="text-[12px] font-semibold flex flex-col gap-1">
  {university?.university_features?.map((feature, index) => (
    <li key={index} className="flex items-center gap-2 text-green-600">
      <ArrowUpRight className="w-3 h-3 text-green-600" />
      {feature}
    </li>
  ))}
</ul>}  /> :""}


           {/* <div className="text-[11px] opacity-55">{university?.fee_types?.semester_fee 
  ? `₹${university.fee_types.semester_fee}` 
  : `₹${university?.fee_types?.full_fee || "N/A"}`} {university?.fee_types?.semester_fee ? "Per Sem" : "full course"}</div> */}

        
<div className='flex w-full items-stretch gap-2 flex-1 md:flex-0'>
<label className='flex h-12 flex-1 min-w-0 items-center justify-center gap-2 rounded-2xl bg-gray-800 px-4 text-sm font-bold text-nowrap text-white cursor-pointer'>
<Checkbox
checked={isChecked}
onCheckedChange={() => toggleCompare(university)}
className='border-white border-2'
/>
 <span className='hidden md:inline'> Add to</span> Compare
</label>
   
     

        {/* Apply CTA */}
        <div className="flex min-w-0 flex-1">
        <Dialog>
<DialogTrigger asChild>
        <Button
          className="h-12 w-full rounded-2xl border-0 bg-primary px-4 text-white justify-center gap-2 cursor-pointer"
          onClick={() => fetchUniversityDetail(university.university_slug)}
        >
          <div className="text-sm font-bold">Apply now</div>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
            <ArrowUpRight className="h-3.5 w-3.5 text-white" />
          </div>
        </Button>
</DialogTrigger>
<DialogContent className="flex max-h-[92vh] w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] flex-col overflow-hidden p-4 sm:max-h-[90vh] sm:max-w-3xl sm:p-6">
<DialogHeader className="min-w-0 shrink-0 text-left">
<DialogTitle className="space-y-2">
<Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${university?.university_logo}`} alt="college-university" width={120} height={40} className="mb-1 max-h-10 w-auto object-contain" />
<span className="block text-base font-bold leading-snug sm:text-lg">{university?.university_name}</span>
</DialogTitle>
<DialogDescription asChild>
<div className="min-w-0 text-foreground">
<div className="no-scrollbar min-h-0 max-h-[min(68vh,640px)] overflow-x-hidden overflow-y-auto overscroll-contain">
<Tabs defaultValue="sample-certificate" className="content_card mb-0 w-full min-w-0 max-w-full p-0!">
<TabsList className="mb-3 flex h-auto w-full max-w-full flex-nowrap justify-start gap-1 overflow-x-auto rounded-lg p-1 [&::-webkit-scrollbar]:hidden">
<TabsTrigger value="sample-certificate" className="shrink-0 flex-none px-2 text-[11px] sm:text-sm">Sample Certificate</TabsTrigger>
<TabsTrigger value="fee" className="shrink-0 flex-none px-2 text-[11px] sm:text-sm">Fee Structure</TabsTrigger>
<TabsTrigger value="about" className="shrink-0 flex-none px-2 text-[11px] sm:text-sm">Overview</TabsTrigger>
<TabsTrigger value="admission" className="shrink-0 flex-none px-2 text-[11px] sm:text-sm">Admission Process</TabsTrigger>
<TabsTrigger value="lms" className="shrink-0 flex-none px-2 text-[11px] sm:text-sm">LMS & Study Materials</TabsTrigger>
</TabsList>
<TabsContent value="sample-certificate" className="min-w-0 max-w-full overflow-x-hidden">
<div className="rich_text max-w-full break-words [&_img]:h-auto [&_img]:max-w-full" dangerouslySetInnerHTML={{ __html: universityData?.sections?.Sample_Certificate }} />
<ContentModal


ContentClassName="sm:max-w-2xl"
title={
<>
Sample Certificate of {universityData?.university_name}{" "}
<span>
<Link
download={true}
target="_self"
href={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${universityData?.sections?.sampleImg}`}
className="bg-primary text-[12px] text-white inline-flex items-center gap-1 rounded-md py-1 px-2"
>
Download <ArrowDown className="w-3 h-3" />
</Link>
</span>
</>
}
trigger={
universityData?.sections?.sampleImg && (
<Image
className="mt-3 h-auto max-w-full cursor-zoom-in rounded-md border p-1 w-full sm:w-[200px]"
src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${universityData?.sections?.sampleImg}`}
width={200}
height={300}
alt="sample certificate"
/>
)
}

content={
<span> <img
className="rounded-sm w-full object-contain max-h-[calc(100vh-200px)]"
src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${universityData?.sections?.sampleImg}`}
//  width={500}
//  height={500}
alt="sample certificate"
//  layout="responsive"

/></span>
}
/>
</TabsContent>
<TabsContent value="fee" className="min-w-0 max-w-full overflow-x-hidden">
<div className="rounded-2xl bg-white text-slate-900">
  <div className="flex items-center justify-between mb-0">
    <p className="text-sm md:text-base font-semibold tracking-wide">
      Fee Breakdown
    </p>
    {/* <span className="text-[11px] md:text-xs text-slate-500">
      Latest updated Fees
    </span> */}
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
    {feeData?.full_fee && (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
        <p className="text-[12px]! uppercase tracking-wider text-slate-500 mb-0">Full Fee</p>
        <p className="text-sm md:text-base font-semibold break-words mb-0!">{feeData?.full_fee}</p>
      </div>
    )}
    {feeData?.semester_fee && (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
        <p className="text-[12px]! uppercase tracking-wider text-slate-500 mb-0">Semester Fee</p>
        <p className="text-sm md:text-base font-semibold break-words mb-0!">{feeData?.semester_fee}</p>
      </div>
    )}
    {feeData?.registration_fee && (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
        <p className="text-[12px]! uppercase tracking-wider text-slate-500 mb-0">Registration Fee</p>
        <p className="text-sm md:text-base font-semibold break-words mb-0!">{feeData?.registration_fee}</p>
      </div>
    )}
    {feeData?.exam_fee_sem_wise && (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
        <p className="text-[12px]! uppercase tracking-wider text-slate-500 mb-0">Exam Fee Semwise</p>
        <p className="text-sm md:text-base font-semibold break-words mb-0!">{feeData?.exam_fee_sem_wise}</p>
      </div>
    )}
    {feeData?.emi_monthly && (
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 sm:col-span-2">
        <p className="text-[12px]! uppercase tracking-wider text-primary/80 mb-1">Emi Monthly</p>
        <p className="text-sm md:text-base font-semibold break-words mb-0! text-primary">{feeData?.emi_monthly}</p>
      </div>
    )}
  </div>
</div>


</TabsContent>
<TabsContent value="about" className="min-w-0 max-w-full overflow-x-auto">
<div className="rich_text max-w-full break-words [&_img]:h-auto [&_img]:max-w-full [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto" dangerouslySetInnerHTML={{ __html: universityData?.sections?.About_University }} />
</TabsContent>
<TabsContent value="admission" className="min-w-0 max-w-full overflow-x-auto">
<div className="rich_text max-w-full break-words [&_img]:h-auto [&_img]:max-w-full [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto" dangerouslySetInnerHTML={{ __html: universityData?.sections?.Admission_Process }} />
</TabsContent>
<TabsContent value="lms" className="min-w-0 max-w-full overflow-x-auto">
<div className="rich_text max-w-full break-words [&_img]:h-auto [&_img]:max-w-full [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto" dangerouslySetInnerHTML={{ __html: universityData?.sections?.Learning_Management_SystemLMS }} />
</TabsContent>


</Tabs>
</div>
</div>
</DialogDescription>
</DialogHeader>
</DialogContent>
</Dialog>
</div>
</div>
      </CardFooter>
      
  {/* Mobile university features modal */}

{university?.university_features?.length > 0 && screenSize?.width < 768 ? <ContentModal title={university?.university_name + " Features"} trigger={<p className='bg-green-100 font-semibold text-green-700 text-center text-sm py-2 w-full flex items-center justify-center gap-2'>University Features <ArrowRight className="w-3 h-3 text-green-600" /></p>} content={<ul className="text-[12px]   font-semibold flex flex-col gap-1">
  {university?.university_features?.map((feature, index) => (
    <li key={index} className="flex items-center gap-2 text-green-600">
      <ArrowUpRight className="w-3 h-3 text-green-600" />
      {feature}
    </li>
  ))}
</ul>} />:""}


      
    </Card>
  </div>
  

  <GlobalContentModal
              id={reviewsModalId}
              title={university?.university_name || "Reviews"}
              ContentClassName="sm:max-w-3xl"
         
              content={
                <div>
                  <Image
                    className="object-contain mb-3 border rounded-md p-1"
                    src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${university?.university_logo}`}
                    width={100}
                    height={40}
                    alt={university?.university_name || "University Logo"}
                  />
                  <p className="mb-5">
                    <span className="font-bold text-md">
                      {averageRating.toFixed(1)}
                      /5 (Total {reviews.length} Reviews)
                    </span>
                  </p>

                  {reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.map((data, index) => (
                        <div key={index} className="border rounded-xl p-4">
                          <p className="font-semibold mb-1">{data?.name || "Student"}</p>
                          <p className="text-sm text-muted-foreground mb-2">
                        
                            <StarRating value={getReviewRating(data) ?? 0} />
                          </p>
                          <p className="text-sm">{data?.reviewContent || "No review content provided."}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No reviews available.</p>
                  )}
                </div>
              }
            />
  




  </>
  );
}