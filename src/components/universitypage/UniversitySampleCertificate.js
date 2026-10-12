import React from "react";
import UniversityContentHeading from "./UniversityContentHeading";
import { cleanHTML } from "@/lib/cleanHTML";
import ContentModal from "../custom/shared/modal/ContentModal";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

const UniversitySampleCertificate = ({ id, title, universityData,courseData }) => {
  const sampleCertificate =
  courseData?.sections_transformed?.Sample_Certificate ? courseData?.sections_transformed?.Sample_Certificate : universityData?.sections?.Sample_Certificate;


  const sampleCertificateImage =
  courseData?.sections_transformed?.sampleImg ? courseData?.sections_transformed?.sampleImg : universityData?.sections?.sampleImg;
  return (
    <div id={id} className="content_card">
      
      <UniversityContentHeading title={title} />
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-8">
          <div
            className="rich_text"
            dangerouslySetInnerHTML={{
              __html: cleanHTML(sampleCertificate),
            }}
          />
        </div>
        <div className={`col-span-12 md:col-span-4 flex justify-center ${!sampleCertificateImage[0] ? "hidden" : ""}`}>
          <ContentModal
        
          
            ContentClassName="sm:max-w-2xl"
            title={
              <>
                Sample Certificate of {universityData?.university_name}{" "}
                <span>
                  <Link
                    download={true}
                    target="_self"
                    href={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${sampleCertificateImage}`}
                    className="bg-primary text-[12px] text-white inline-flex items-center gap-1 rounded-md py-1 px-2"
                  >
                    Download <ArrowDown className="w-3 h-3" />
                  </Link>
                </span>
              </>
            }
            trigger={
              sampleCertificateImage && (
              <Image
                className="border rounded-md p-1 cursor-zoom-in"
                src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${sampleCertificateImage}`}
                width={200}
                height={300}
                alt="sample certificate"
              />
              )
            }

            content={
             <span> <img
             className="rounded-sm w-full object-contain max-h-[calc(100vh-200px)]"
             src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${sampleCertificateImage}`}
            //  width={500}
            //  height={500}
             alt="sample certificate"
            //  layout="responsive"
           
           /></span>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default UniversitySampleCertificate;
