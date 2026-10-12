import React from "react";
import UniversityContentHeading from "./UniversityContentHeading";
import Image from "next/image";
import PrimaryButton from "../custom/shared/PrimaryButton";
import SecondaryButton from "../custom/shared/SecondaryButton";
import { IndianRupee, Phone, Wallet } from "lucide-react";
import { cleanHTML } from "@/lib/cleanHTML";
import formatFee from "@/lib/formatFee";
import Link from "next/link";
import Info from "../custom/shared/Info";
import { useLeadForm } from "@/context/LeadFormContext";
import { useLeadGuard } from "../auth/useLeadGuard";
import { toast } from "sonner";

const UniversityEmi = ({
  id,
  title,
  universityData,
  courseData,
  specializationData,
}) => {
  const emiPartners = specializationData?.sections_transformed?.University_Emi
    ? specializationData?.sections_transformed?.University_Emi
    : courseData?.sections_transformed?.University_Emi
    ? courseData?.sections_transformed?.University_Emi
    : universityData?.sections?.University_Emi;

  const emiTable =
    courseData?.specialization_data ?? universityData?.course_data ?? null;

  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();
 
  return (
    <>
      <div id={id} className="content_card">
        <UniversityContentHeading title={title} />
        <div
          className="rich_text"
          dangerouslySetInnerHTML={{ __html: cleanHTML(emiPartners) }}
        />
        {/* <p>Type id 4 means it is a distance university</p> */}
{(universityData?.university_type_id !== 4 && emiTable?.length > 0) && <div>
          <table className="w-full">
            <tbody>
              <tr className="font-bold">
                <td>Courses</td>
                <td className="flex items-center gap-1">
                  No Cost EMI (Per Month)
                  <Info
                    trigger={<span>*</span>}
                    content="EMI is available for a limited time only. Please check with the bank for the latest rates and terms."
                    icon="false"
                  />
                </td>
                <td>EMI Duration</td>
                <td>Full Fees</td>
               
              </tr>
              {emiTable?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.name}</td>
                  <td className="flex items-center">{formatFee(item?.fees?.emi_monthly || "-")}</td>
                  <td>{item?.emi_duration ? item?.emi_duration + " Months" : "-"}</td>
                  <td className="flex items-center">{formatFee(item?.fees?.full_fee || "-")}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div> }
        


    {universityData?.emi_partners?.length > 0 && (
        <div className="flex items-center gap-3 mt-8 justify-between">
          <h3 className={`font-bold text-xl mb-4`}>Emi Partners</h3>
        </div>
        )}
        <div className="flex flex-wrap gap-4 items-center placement_partner mb-8">
          {universityData?.emi_partners?.map((item, index) => (
            <span key={index}>
              <Image
                className="border py-2 px-3 rounded-xl bg-white"
                src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${item?.logo}`}
                width="100"
                height="40"
                alt={item.name}
                style={{ objectFit: "contain" }}
              />
            </span>
          ))}
        </div>
        <div className="content_card !bg-gray-900">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-9">
              <p className="font-bold text-xl mb-3 text-white">
              Don&apos;t  Let EMI Confusion Delay Your Goals

              </p>
              <p className="text-gray-100 !mb-0">
              Seats are filling fast, don&apos;t lose yours over fees. Apply for EMI now and lock your admission today.

              </p>
            </div>
            <div className="col-span-12 lg:col-span-3">
              <div className="flex flex-col gap-4">
                <div
                 onClick={(e) => {
                  if (!withVerification()) {
                    e.preventDefault(); // ⛔ stop navigation
                    showLeadForm("Apply for Easy EMI - EMI section");
                    return;
                  }
                  toast.success("Applied for Easy EMI Successfully.");
                }}
                >
                  <PrimaryButton title="Apply for Easy EMI" />
                </div>
                <div
                  onClick={(e) => {
                    if (!withVerification()) {
                      e.preventDefault(); // ⛔ stop navigation
                      showLeadForm("Schedule a call - EMI section");
                      return;
                    }
                    toast.success("Our counselor will contact you shortly 📞");
                  }}
                >
                  <SecondaryButton
                    title="Schedule a call"
                    className="bg-secondary"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <p className="font-bold text-xl mb-3 text-white">
            Take the next step
          </p>
          <p className="text-gray-100">
            Apply to the program now or schedule a call with a program advisor
          </p> */}
          {/* <div className="flex gap-4">
          <div onClick={() => showLeadForm("apply for loan from EMI section")}>
              <PrimaryButton title="Apply for Loan" />
              </div>
              <div onClick={() => showLeadForm("schedule a call from EMI section")}>
              <SecondaryButton title="Schedule a call" />
              </div>
          </div> */}
        
        </div>
      </div>
    </>
  );
};

export default UniversityEmi;
