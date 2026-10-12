import React from 'react'
import {
    Card,
  } from "@/components/ui/card";
  import { Marquee } from '@/components/magicui/marquee';
import PrimaryButton from '../custom/shared/PrimaryButton';
import Image from 'next/image';
import { useLeadForm } from '@/context/LeadFormContext';
import { useLeadGuard } from '../auth/useLeadGuard';
import { toast } from 'sonner';

const BlogRightCard = () => {
    const { showLeadForm } = useLeadForm();
    const { withVerification } = useLeadGuard();
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
    <Card className="mb-4 py-0">

    <div className='p-6'>  <p className='font-bold text-xl! mb-2'><strong>Don&apos;t Feel Like Reading?</strong></p>
      <p className='text-sm text-muted-foreground font-bold'>Get all the details over the call from our experts!</p>
      </div>
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
    }}>    <PrimaryButton title="Schedule Your Free Session NOW!" /></div>
 


</Card>
  )
}

export default BlogRightCard