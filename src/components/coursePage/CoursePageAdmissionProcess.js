import React from 'react'
import Image from 'next/image'
import PrimaryButton from '../custom/shared/PrimaryButton'
import CourseContentHeading from './CourseContentHeading'
import { cleanHTML } from '@/lib/cleanHTML'
import { useLeadForm } from '@/context/LeadFormContext'
import { useLeadGuard } from '../auth/useLeadGuard'
import { toast } from 'sonner'


const CoursePageAdmissionProcess = ({ id, courseData,screenSize,title, specializationData }) => {
  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();
  const admissionProcess = specializationData?.sections?.admission_process ? specializationData?.sections?.admission_process : courseData?.sections?.admission_process;
  const admissionProcessImage = specializationData?.sections?.image ? specializationData?.sections?.image : courseData?.sections?.image;
  return (
    <div id={id} className='content_card'>
      <CourseContentHeading title={title} />
      <div className="rich_text" dangerouslySetInnerHTML={{ __html: cleanHTML(admissionProcess) }} />
      {admissionProcessImage ? (
        <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${admissionProcessImage}`} className='w-full md:w-[80%] mx-auto mb-5' width={500} height={300} alt="admission process" quality={100} />
      ) : (
        <Image src="/images/course/degree-course-admission-process.webp" className='w-full md:w-[80%] mx-auto mb-5' width={500} height={300} alt="admission process" quality={100} />
      )}
      <div className='content_card !bg-[#f4f2ea] flex justify-between items-center flex-wrap gap-3'>
        <div>
          <p className='font-bold !mb-0 text-red-700'>Not Sure About This Degree? </p>
          <p className='!mb-0'>We&apos;ll Help You Choose the Right One With Personalized Guidance!</p>
        </div>
        <div onClick={(e) => {
            if (!withVerification()) {
              e.preventDefault(); // ⛔ stop navigation
              showLeadForm("apply now from course page admission process");
              return;
            }
            toast.success("Our counselor will contact you shortly to discuss the application");
          }}>
          <PrimaryButton title="Call Now!" />
        </div>
      </div>
    </div>
  )
}

export default CoursePageAdmissionProcess