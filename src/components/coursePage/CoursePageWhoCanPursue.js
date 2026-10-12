import React from 'react'
import CourseContentHeading from './CourseContentHeading'
import PrimaryButton from '../custom/shared/PrimaryButton'
import { GraduationCap, PersonStanding, Rocket, ShieldCheck, Star } from 'lucide-react'
import { Marquee } from '../magicui/marquee'
import Image from 'next/image'
import { cleanHTML } from '@/lib/cleanHTML'
import { useLeadForm } from '@/context/LeadFormContext'
import { useLeadGuard } from '../auth/useLeadGuard'
import { toast } from 'sonner'


const CoursePageWhoCanPursue = ({id,title,courseData,screenSize, specializationData}) => {
  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();
   
    const whoCanPursue1 = specializationData?.sections?.who_can_pursue_1 ?? courseData?.sections?.who_can_pursue_1;
    const whoCanPursue2 = specializationData?.sections?.who_can_pursue_2 ?? courseData?.sections?.who_can_pursue_2;
    const whoCanPursue3 = specializationData?.sections?.who_can_pursue_3 ?? courseData?.sections?.who_can_pursue_3;
    const whoCanPursue4 = specializationData?.sections?.who_can_pursue_4 ?? courseData?.sections?.who_can_pursue_4;
    const reviews = [
        {
          name: "Mayank",
          img: "/images/homepage/experts/mayank.webp",
        },
        {
          name: "Palak",
    
          img: "/images/homepage/experts/palak.webp",
        },
        {
          name: "Surabhi",
    
          img: "/images/homepage/experts/surabhi.webp",
        },
        {
          name: "Shoaib",
    
          img: "/images/homepage/experts/shoaib.webp",
        },
        {
          name: "Sudhanshu",
    
          img: "/images/homepage/experts/sudhanshu.webp",
        },
        {
          name: "Danish",
    
          img: "/images/homepage/experts/danish.webp",
        },
        {
          name: "Shirsti",
    
          img: "/images/homepage/experts/shirsti.webp",
        },
        {
          name: "Aman",
    
          img: "/images/homepage/experts/aman.webp",
        },
      ]
      const firstRow = reviews.slice(0, reviews.length / 2);
      const secondRow = reviews.slice(reviews.length / 2);


      const ReviewCard = ({ img, name }) => {
        return (
          <figure
          className='d-flex flex-col items-center justify-center'
          >
            <Image className='rounded-full mx-auto mb-1' width={60} height={60} alt={name} src={img} />
            <p className="!text-[14px] text-center dark:text-white/40 m-0">{name}</p>
          </figure>
        );
      };
  return (
    <div id={id} className='content_card'> 
    <CourseContentHeading title={title} />

<div className='grid grid-cols-12 gap-6'>
<div className='col-span-12 lg:col-span-8'><div className="grid gap-6 md:grid-cols-2">
                <div className="bg-[#faf9f7] p-6 rounded-lg flex flex-col space-y-4">
           
                   <GraduationCap className='text-primary w-12 h-12 bg-[#f5f0e8] p-3 rounded-md' />
                   <div className="rich_text" dangerouslySetInnerHTML={{ __html: cleanHTML(whoCanPursue1) }} />
                </div>
                <div className="bg-[#faf9f7] p-6 rounded-lg flex flex-col space-y-4">
                   <Rocket className='text-primary w-12 h-12 bg-[#f5f0e8] p-3 rounded-md' />
                   <div className="rich_text" dangerouslySetInnerHTML={{ __html: cleanHTML(whoCanPursue2) }} />
                </div>


                <div className="bg-[#faf9f7] p-6 rounded-lg flex flex-col space-y-4">
                   <Star className='text-primary w-12 h-12 bg-[#f5f0e8] p-3 rounded-md' />
                   <div className="rich_text" dangerouslySetInnerHTML={{ __html: cleanHTML(whoCanPursue3) }} />
                </div>

                <div className="bg-[#faf9f7] p-6 rounded-lg flex flex-col space-y-4">
                   <PersonStanding className='text-primary w-12 h-12 bg-[#f5f0e8] p-3 rounded-md' />
                   <div className="rich_text" dangerouslySetInnerHTML={{ __html: cleanHTML(whoCanPursue4) }} />
                </div>

                </div></div>

<div className='col-span-12 lg:col-span-4'>
<div className="border rounded-3xl flex flex-col justify-between h-full">
          <div className='p-6'>  <p className='font-bold !text-xl mb-4'><strong>Talk to our Counsellors</strong></p>
            <p>Get personalized guidance and support from our experienced counselors. Schedule a free consultation today!</p></div>
          <div className='relative'>  <Marquee pauseOnHover className="[--duration:20s] ">
            {firstRow?.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              {secondRow?.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div></div>
          <div className='p-6' onClick={(e) => {
            if (!withVerification()) {
              e.preventDefault(); // ⛔ stop navigation
              showLeadForm("schedule a consultation from course page who can pursue");
              return;
            }
            toast.success("Our counselor will contact you shortly 📞");
          }}>    <PrimaryButton title="Schedule a Consultation" /></div>
        </div>
</div>
</div>

    
              

           
    </div>
  )
}

export default CoursePageWhoCanPursue