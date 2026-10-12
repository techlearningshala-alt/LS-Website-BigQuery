import React from "react";
import UniversityContentHeading from "./UniversityContentHeading";
import Image from "next/image";
import PrimaryButton from "../custom/shared/PrimaryButton";
import { cleanHTML } from "@/lib/cleanHTML";
import { useLeadForm } from "@/context/LeadFormContext";
import { useLeadGuard } from "../auth/useLeadGuard";
import { toast } from "sonner";

const UniversityPlacement = ({ id, title, universityData,courseData,specializationData }) => {
  const placement =
  specializationData?.sections_transformed?.Placements_Details ? specializationData?.sections_transformed?.Placements_Details : courseData?.sections_transformed?.Placements_Details ? courseData?.sections_transformed?.Placements_Details : universityData?.sections?.Placements_Details;
  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();
  return (
    <>
      <div id={id} className="content_card">
        <>
          <UniversityContentHeading title={title} />
          <div
            className="rich_text"
            dangerouslySetInnerHTML={{
              __html: cleanHTML(placement),
            }}
          />
        </>

        {universityData?.placement_partners?.length > 0 && (
          <>
            {" "}
   
            <h3 className={`font-bold text-2xl mb-4`}>{universityData?.university_name} Placement Partners</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-4 placement_partner mb-6">
              {universityData?.placement_partners?.map((item, index) => (
                <span
                  className="border px-3 py-2 rounded-xl bg-white"
                  key={index}
                >
                  <Image
                    className="object-contain"
                    src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${item?.logo}`}
                    width="100"
                    height="40"
                    alt={item.name}
                  />
                </span>
              ))}
            </div>
            <div className="content_card flex-wrap md:flex-nowrap !bg-[#f4f2ea] flex justify-between items-center gap-4">
              <Image
                src="/images/university/job-offer.png"
                width={70}
                height={70}
                alt="placement banner"
              />
              <div>
                <p className="font-bold !mb-0 text-red-700">
                Live Placement Updates Are Rolling In!

                </p>
                <p className="!mb-0">
                Learners from recent batches are already getting shortlisted by hiring partners. Don&apos;t miss your chance to be part of the next success story.
                </p>
              </div>
              <div onClick={(e) => {
                      if (!withVerification()) {
                        e.preventDefault(); // ⛔ stop navigation
                        showLeadForm("Apply now from placement section");
                        return;
                      }
                      toast.success("Applied for placement Updates.");
                    }}>
                <PrimaryButton title="Apply Now" />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UniversityPlacement;
