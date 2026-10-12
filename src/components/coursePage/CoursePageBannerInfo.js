import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { ChevronRight, Dot, Download, GitCompareArrows, VerifiedIcon } from "lucide-react";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { cleanHTML } from "@/lib/cleanHTML";
import { useLeadForm } from "@/context/LeadFormContext";
import { useLeadGuard } from "../auth/useLeadGuard";
import { toast } from "sonner";
import ContentModal from "../custom/shared/modal/ContentModal";

const CoursePageBannerInfo = ({ courseData,screenSize, specializationData }) => {
  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();
  const isMobile = screenSize.width < 768;
  const [showCompareAfterScroll, setShowCompareAfterScroll] = useState(false);
  const label = specializationData?.label ?? courseData?.label;
  const name = specializationData?.name ?? courseData?.name;
  const h1Tag = specializationData?.h1Tag ?? courseData?.h1Tag;
  const description = specializationData?.description ?? courseData?.description;
  const upload_brochure = specializationData?.upload_brochure ?? courseData?.upload_brochure;
 
  const author_data = specializationData ?? courseData;

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      setShowCompareAfterScroll(scrollPosition > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);
 


  // console.log(specializationData);
  return (
    <div className="flex flex-col justify-between">
      <p className="mb-1 text-[12px] text-muted-foreground">
            Last Updated : {author_data?.updated_at ? formatDate(author_data?.updated_at) : ''}
          </p>
      <div>
        <Badge asChild className="absolute top-0 right-0 mt-3 mr-3 text-white hidden sm:block">
          {label && (
          <span className="text-sm">{label}</span>
          )}
        </Badge>
        <p className="text-[10px] md:text-[14px] mb-3 flex flex-wrap items-center gap-1">
          <Link href="/">Home</Link>
          <Link href="/courses" className="flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Courses</Link>
          <Link href={`/courses/${courseData?.slug}`} className="flex items-center gap-1"><ChevronRight className="w-3 h-3" /> {courseData?.name}</Link>
{specializationData?.slug && (
          <Link href={`/courses/${courseData?.slug}/${specializationData?.slug}`} className="flex items-center gap-1"><ChevronRight className="w-3 h-3" /> {specializationData?.name}</Link>
)}
        </p>
        <h1 className="text-xl md:text-3xl font-bold mb-3 flex items-center justify-between">{h1Tag} 
      
        </h1>
        <div
          className="mb-4 text-sm rich_text"
          dangerouslySetInnerHTML={{ __html: cleanHTML(description) }}
        />

        <div className="flex gap-2">
          <div
        
        onClick={(e) => {
          if (!withVerification()) {
            e.preventDefault(); // ⛔ stop navigation
            showLeadForm("connect from course page banner - connect now");
            return;
          }
          toast.success("Our counselor will contact you shortly 📞");
        }}
            className="bg-secondary cursor-pointer inline-flex gap-2 text-white border-2 border-secondary  items-center font-bold rounded-3xl text-[10px] md:text-sm px-3 py-2 text-nowrap"
          >
            <span className="flex -space-x-[0.45rem]">
              <Image
                className="ring-background rounded-full ring-1"
                src="/images/university/avatar/a4.webp"
                width={24}
                height={24}
                alt="Counsellor"
              />
              <Image
                className="ring-background rounded-full ring-1"
                src="/images/university/avatar/a5.webp"
                width={24}
                height={24}
                alt="Counsellor"
              />
              <Image
                className="ring-background rounded-full ring-1"
                src="/images/university/avatar/a6.webp"
                width={24}
                height={24}
                alt="Counsellor"
              />
            </span>
        
           Connect Now  <ChevronRight className="w-5 h-5" />
          </div>


          <div className={`${
            isMobile
              ? showCompareAfterScroll
                ? "fixed bottom-20 right-3 z-50 bg-primary p-4 shadow-lg max-w-fit"
                : "hidden"
              : ""
          } flex items-center gap-2 text-[10px] md:text-sm font-bold border-2 border-primary text-white bg-primary rounded-3xl px-3 py-2 cursor-pointer text-nowrap`} onClick={() => {
          if (!withVerification()) {
            
            showLeadForm(
              "connect from course page banner - enquire now",
              {
                type: "redirect",
                url: specializationData?.slug
                ? `/colleges-universities/${courseData?.slug}/${specializationData.slug}`
                : `/colleges-universities/${courseData?.slug}`
              }
            );
            return;
          }

          // already verified
          window.open(
            specializationData?.slug
              ? `/colleges-universities/${courseData?.slug}/${specializationData.slug}`
              : `/colleges-universities/${courseData?.slug}`
          );
        }}> <GitCompareArrows className="w-3 h-3" />Compare Top Universities</div>

          {courseData?.upload_brochure && (
          <Link
            download={true}
            target="_self"
            href={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${upload_brochure}`}
            className="bg-white gap-2 inline-flex text-secondary border-2 border-secondary items-center font-bold rounded-3xl text-sm px-4 py-2"
          >
            Download Ebook <Download className="w-5 h-5" />
          </Link>
          )}
        </div>
      </div>
      <div>
        {" "}
        <hr className="my-4" />
        <div className="flex justify-between items-end gap-2 flex-wrap">
<ContentModal trigger={ <div className="flex items-center gap-2">
           <span className="rounded-full flex items-center justify-center text-xl font-bold"> <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${author_data?.author_image}`} alt={author_data?.author_name} width={50} height={50} className='rounded-md mb-2 border-2 border-white' /></span>
            <p className="flex flex-col !m-0 text-left">
              {" "}
              <span className="italic text-[12px]">Written By</span>
              <span className="font-semibold text-sm">
                {author_data?.author_name}
              </span>
            </p>
          </div>} content={<>
  <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${author_data?.author_image}`} alt={author_data?.author_name} width={100} height={100} className='rounded-xl mb-2 border-2 border-white' />
  <p className='text-md font-bold'>{author_data?.author_name}</p>
  <p className='text-black mb-2 text-sm font-semibold'>{author_data?.author_label}</p>
  <p className='text-muted-foreground mb-2 text-sm font-semibold'>{author_data?.author_designation}</p>
  <div className='text-muted-foreground mb-4 text-sm' dangerouslySetInnerHTML={{ __html: author_data?.author_details }} />
</>} />

{author_data?.verifier_name !== null && <ContentModal trigger={ <div className="flex items-center gap-2">
           <span className="rounded-full flex items-center justify-center text-xl font-bold"> <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${author_data?.verifier_image}`} alt={author_data?.verifier_name} width={50} height={50} className='rounded-md mb-2 border-2 border-white' /></span>
            <p className="flex flex-col !m-0 text-left">
              {" "}
              <span className="italic text-[12px]">Reviewed by</span>
              <span className="font-semibold text-[12px] flex items-center gap-1">
              <b>{author_data?.verifier_name}</b> 
              </span>
              <span className="font-semibold text-[12px] flex items-center gap-1">
             <VerifiedIcon className="w-4 h-4 text-green-500" /> LS Certified Expert
              </span>
            </p>
          
          </div>} content={<>
  <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${author_data?.verifier_image}`} alt={author_data?.author_name} width={100} height={100} className='rounded-xl mb-2 border-2 border-white' />
  <p className='text-md font-bold'>{author_data?.verifier_name}</p>
  <p className="font-semibold text-[12px] flex items-center gap-1 mb-4">
             <VerifiedIcon className="w-4 h-4 text-green-500" /> LS Certified Expert
              </p>
  <p className='text-black mb-2 text-sm font-semibold'>{author_data?.verifier_label}</p>
  <p className='text-muted-foreground mb-2 text-sm font-semibold'>{author_data?.verifier_designation}</p>
  <div className='text-muted-foreground mb-4 text-sm' dangerouslySetInnerHTML={{ __html: author_data?.verifier_details }} />
</>} />}


         
        </div>
      </div>
    </div>
  );
};

export default CoursePageBannerInfo;
