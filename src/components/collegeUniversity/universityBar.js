import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import StarRating from '../universitypage/review/StarRating'
import PrimaryButton from '../custom/shared/PrimaryButton'
import { Button } from '../ui/button'
import { ArrowDown, ChevronRight, IndianRupee, Star } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import ContentDrawer from '../custom/shared/drawer/ContentDrawer'
import ContentSheet from '../custom/shared/sheet/contentSheet'
import { getUniversityDetailData } from '@/services/UniversitypageService'
import { UniversityBarDetail } from './universityBarDetail'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import ContentModal from '../custom/shared/modal/ContentModal'
import Link from 'next/link'
import GlobalContentModal from '../custom/shared/modal/GlobalContentModal'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useCompare } from '@/context/CompareContext'
import { useModal } from '@/context/ModalContext'
import { useLeadForm } from '@/context/LeadFormContext'
import { useLeadGuard } from '../auth/useLeadGuard'
import { toast } from 'sonner'

const UniversityBar = ({ university,feeData }) => {
  const { compareList, toggleCompare } = useCompare();
  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();

  const isChecked = compareList.some(
    (u) => u.university_slug === university.university_slug
  );

    const [universityData, setUniversityData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { openModal } = useModal();
    const reviews = university?.Student_Ratings || [];
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
    

    // console.log("UNIVERSITY DATA:", universityData);

    return (
        <div className='rounded-md p-2 md:p-4 mb-6 bg-white relative' style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,.122)" }}>
            {/* <p className='m-0 absolute top-[0px] right-0 text-[10px] font-semibold text-green-500 bg-green-100 px-2 py-1 rounded-b-lg'> EMI Available</p> */}
            {university?.label && (
                <span className='text-[10px] font-semibold text-green-500 bg-green-100 px-2 py-1 rounded-e-lg absolute top-0 start-0 mt-2'>{university?.label}</span>
            )}
            <div className='flex gap-4 py-3 rounded-md'>
                <div className='col flex-1 flex items-center relative'>
                    <Image
                    style={{minWidth: '100px', minHeight: '30px'}}
                    src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${university?.university_logo}`} alt="college-university" width={120} height={40} />
 
                </div>


                <div className='col hidden sm:flex flex-1 justify-start items-center'>
                    <p className='text-[14px] md:text-md font-bold m-0'>{university?.university_name}</p>

                </div>
                
                <div className='col flex-1 flex flex-col justify-center gap-1'>
                {reviews?.length > 0 && (
                <span
                  onClick={() => openModal(reviewsModalId)}
                  className="flex flex-col  gap-1 cursor-pointer  text-sm"
                >
                  <span className='flex items-center gap-1'>
                    {reviews?.length} Reviews
                  </span>
                  <span className='flex items-center gap-1 font-bold underline'>
                  {(
                    reviews?.reduce(
                      (acc, review) => acc + parseFloat(review.value || 0),
                      0
                    ) / (reviews?.length || 1)
                  ).toFixed(1)}
                
                  <span className='inline-block md:hidden'>  <Star
            size={15}
            className="fill-yellow-400 text-yellow-400"
          /> </span>
                  <span className='hidden md:inline'> <StarRating value={(
                    reviews?.reduce(
                      (acc, review) => acc + parseFloat(review.value || 0),
                      0
                    ) / (reviews?.length || 1)
                  ).toFixed(1)} />{" "} </span>
                 
                  </span>
                
                </span>
                )}
                </div>

      
<div className='col flex-1 hidden md:flex items-center'>

<span   onClick={(e) => {
          if (!withVerification()) {
            e.preventDefault(); // ⛔ stop navigation
            showLeadForm("connect from course page banner - connect now");
            return;
          }
          toast.success("Our counselor will contact you shortly 📞");
        }} className='flex items-center gap-2 underline cursor-pointer text-nowrap text-[12px]'>  <span className="flex -space-x-[0.45rem] cursor-pointer">
                    <Image
                        className="ring-background rounded-full ring-1 min-w-5 min-h-5"
                        src="/images/university/avatar/a4.webp"
                        width={20}
                        height={20}
                        alt="Counsellor"
                    />
                    <Image
                        className="ring-background rounded-full ring-1 min-w-5 min-h-5"
                        src="/images/university/avatar/a5.webp"
                        width={20}
                        height={20}
                        alt="Counsellor"
                    />
                    <Image
                        className="ring-background rounded-full ring-1 min-w-5 min-h-5"
                        src="/images/university/avatar/a6.webp"
                        width={20}
                        height={20}
                        alt="Counsellor"
                    />
                </span> Talk to LS Experts</span>






</div>
<div className='col flex-1 flex flex-wrap'>
<p className='text-[12px] font-semibold mb-2 text-nowrap'>Approvals : </p>
<p className='flex flex-wrap gap-1 line-clamp-1'>
{university?.approvals?.slice(0,3).map((approval, index) => (
                            <span key={approval.id} className='capitalize border bg-gray-100 rounded-md px-2 py-1 text-nowrap items-center flex text-[10px]'>
                                {approval.title}
                            </span>
                        ))}
</p>
</div>

            </div>
            <hr className='my-3' />
<div className='flex items-center justify-end'>
{/* <p className='text-[12px] font-semibold m-0 flex items-center justify-between'>
                {university?.approvals?.length > 0 && (
                   <span className='flex flex-nowrap gap-1 overflow-x-scroll no-scrollbar'>
                    <span className='text-green-500 text-nowrap'>Approvals : </span>
                        {university?.approvals?.slice(0,2).map((approval, index) => (
                            <span key={approval.id} className='capitalize border bg-gray-100 rounded-md px-2 py-1 mx-1 text-nowrap items-center flex'>
                                {approval.title}
                            </span>
                        ))}</span>
                   
                )}

     
            </p> */}

 <div className='flex gap-2'>           <div className='flex items-center justify-center'>
  <label className='text-[10px] lg:text-sm font-semibold flex items-center gap-2 cursor-pointer  text-primary rounded-lg px-3 py-2 text-nowrap w-full justify-center bg-primary/10'>
  <Checkbox
  checked={isChecked}
  onCheckedChange={() => toggleCompare(university)}
  className='border-primary border-2'
/>
   <span className='hidden md:inline'> Add to</span> Compare
  </label>
</div>
            <div className='flex flex-col gap-1 items-end justify-end relative'>

<Dialog>
<DialogTrigger asChild><Button onClick={() => fetchUniversityDetail(university.university_slug)} className="gap-0 font-semibold cursor-pointer text-[10px] lg:text-sm"><IndianRupee /> {university?.fee_types?.semester_fee ? university?.fee_types?.semester_fee : university?.fee_types?.full_fee}/Sem <ChevronRight className="min-w-5 min-h-5" /></Button></DialogTrigger>
<DialogContent className="sm:max-w-3xl">
<DialogHeader>
<DialogTitle> <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${university?.university_logo}`} alt="college-university" width={120} height={40} className='mb-3' />
<p className='text-lg font-bold mb-3'>{university?.university_name}</p></DialogTitle>
<DialogDescription>
<div className="no-scrollbar max-h-[70vh] overflow-y-auto">
<Tabs defaultValue="sample-certificate" className="content_card p-0!">
<TabsList className="overflow-x-auto mb-3">
<TabsTrigger value="sample-certificate">Sample Certificate</TabsTrigger>
<TabsTrigger value="fee">Fee Structure</TabsTrigger>
<TabsTrigger value="about">Overview</TabsTrigger>

<TabsTrigger value="admission">Admission Process</TabsTrigger>
<TabsTrigger value="lms">LMS & Study Materials</TabsTrigger>
</TabsList>
<TabsContent value="sample-certificate">
<div dangerouslySetInnerHTML={{ __html: universityData?.sections?.Sample_Certificate }} />
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
className="border rounded-md p-1 cursor-zoom-in mt-3"
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
<TabsContent value="fee">

<table className="w-full">
<thead>
<tr>

{feeData?.full_fee && <th>Full Fee</th>}
{feeData?.semester_fee && <th>Semester Fee</th>}
{feeData?.registration_fee && <th>Registration Fee</th>}
{feeData?.exam_fee_sem_wise && <th>Exam Fee Semwise</th>}
{feeData?.emi_monthly && <th>Emi Monthly</th>}
</tr>
</thead>
<tbody>
<tr>
{feeData?.full_fee && <td>{feeData?.full_fee}</td>}
{feeData?.semester_fee && <td>{feeData?.semester_fee}</td>}
{feeData?.registration_fee && <td>{feeData?.registration_fee}</td>}
{feeData?.exam_fee_sem_wise && <td>{feeData?.exam_fee_sem_wise}</td>}
{feeData?.emi_monthly && <td>{feeData?.emi_monthly}</td>}
</tr>
</tbody>
</table>


</TabsContent>
<TabsContent value="about">
<div className="rich_text" dangerouslySetInnerHTML={{ __html: universityData?.sections?.About_University }} />
</TabsContent>
<TabsContent value="admission">
<div className="rich_text" dangerouslySetInnerHTML={{ __html: universityData?.sections?.Admission_Process }} />
</TabsContent>
<TabsContent value="lms">
<div className="rich_text" dangerouslySetInnerHTML={{ __html: universityData?.sections?.Learning_Management_SystemLMS }} />
</TabsContent>


</Tabs>
</div>


</DialogDescription>
</DialogHeader>
</DialogContent>
</Dialog> 

   
</div></div>


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
                      {(
                        reviews.reduce(
                          (acc, review) => acc + parseFloat(review?.value || 0),
                          0
                        ) / (reviews.length || 1)
                      ).toFixed(1)}
                      /5 (Total {reviews.length} Reviews)
                    </span>
                  </p>

                  {reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.map((data, index) => (
                        <div key={index} className="border rounded-xl p-4">
                          <p className="font-semibold mb-1">{data?.name || "Student"}</p>
                          <p className="text-sm text-muted-foreground mb-2">
                        
                            <StarRating value={data?.value || 0} />
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
        </div>
    )
}

export default UniversityBar