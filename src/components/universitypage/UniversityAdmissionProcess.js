import React from "react";
import UniversityContentHeading from "./UniversityContentHeading";
import Image from "next/image";
import PrimaryButton from "../custom/shared/PrimaryButton";
import { cleanHTML } from "@/lib/cleanHTML";
import { useLeadForm } from "@/context/LeadFormContext";
import { useLeadGuard } from "../auth/useLeadGuard";
import { toast } from "sonner";

const UniversityAdmissionProcess = ({
  id,
  title,
  universityData,
  courseData,
  specializationData,
}) => {
  const admissionProcess = specializationData?.sections_transformed?.Admission_Process
    ? specializationData?.sections_transformed?.Admission_Process
    : courseData?.sections_transformed?.Admission_Process
    ? courseData?.sections_transformed?.Admission_Process
    : universityData?.sections?.Admission_Process;

  const admissionProcessImage = specializationData?.sections_transformed?.image
    ? specializationData?.sections_transformed?.image
    : courseData?.sections_transformed?.image
    ? courseData?.sections_transformed?.image
    : universityData?.sections?.image;


  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();

  return (
    <div id={id} className="content_card">
      <UniversityContentHeading
        title={title}
      />
      <div
        className="rich_text"
        dangerouslySetInnerHTML={{ __html: cleanHTML(admissionProcess) }}
      />
      {admissionProcessImage  ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${admissionProcessImage}`}
          className="w-full"
          width={500}
          height={300}
          alt="admission process"
          quality={100}
          
        />
      ) : (
        <Image
          src="/images/university/university-admission-process-learningshala.webp"
          className="w-full mb-4"
          width={500}
          height={300}
          alt="admission process"
          quality={100}
        />
      )}

      <div className="content_card !bg-[#f4f2ea] flex flex-wrap gap-2 justify-between items-center">
        <div>
          <p className="font-bold !mb-0 text-red-700">
          Not Sure About This Degree?

          </p>
          <p className="!mb-0">We&apos;ll Help You Choose the Right One With Personalized Guidance!
          </p>
        </div>
        <div onClick={(e) => {
                      if (!withVerification()) {
                        e.preventDefault(); // ⛔ stop navigation
                        showLeadForm("Apply now limited seats available - admission process section");
                        return;
                      }
                      toast.success("University will contact you shortly 📞");
                    }}>
          <PrimaryButton title="Call Now!" />
        </div>
      </div>
    </div>
  );
};

export default UniversityAdmissionProcess;
