import React from "react";
import CourseContentHeading from "./CourseContentHeading";
import { FileUser, HandCoins } from "lucide-react";
import PrimaryButton from "../custom/shared/PrimaryButton";
import SecondaryButton from "../custom/shared/SecondaryButton";
import { cleanHTML } from "@/lib/cleanHTML";
import { useLeadForm } from "@/context/LeadFormContext";
import { useLeadGuard } from "../auth/useLeadGuard";
import { toast } from "sonner";
import Image from "next/image";

const CoursePageEMI = ({
  id,
  courseData,
  screenSize,
  title,
  specializationData,
}) => {
  const emiDetails = specializationData?.sections?.emi_financial_support
    ? specializationData?.sections?.emi_financial_support
    : courseData?.sections?.emi_financial_support;
  const emiPartners = specializationData?.emi_partners ? specializationData?.emi_partners : courseData?.emi_partners;
  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();
  
  return (
    <div id={id} className="content_card">
      <CourseContentHeading title={title} />
      <div
        className="rich_text"
        dangerouslySetInnerHTML={{ __html: cleanHTML(emiDetails) }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="bg-[#faf9f7] p-6 rounded-lg flex flex-col space-y-4">
        <HandCoins className="w-8 h-8 text-primary" />
         
          <h3 className="text-lg font-bold">Loan Process - 100% Online</h3>
          {/* <p className="font-medium">
            Follow these simple steps for a seamless procedure:
          </p> */}
          <ul>
            <li>Fill in Application Form & KYC</li>
            <li>Bank Verification</li>
            <li>E-mandate & Loan Agreement</li>
            <li>Disbursement</li>
          </ul>
         
          <div onClick={(e) => {
            if (!withVerification()) {
              e.preventDefault(); // ⛔ stop navigation
              showLeadForm("apply for loan from course page emi");
              return;
            }
            toast.success("Our counselor will contact you shortly to discuss the loan application");
          }}><SecondaryButton title="Apply for Loan" /></div>
        </div>
        <div className="bg-[#faf9f7] p-6 rounded-lg flex flex-col space-y-4">
        <FileUser className="w-8 h-8 text-primary" />
          <h3 className="text-lg font-bold">Loan Eligibility Criteria</h3>
          {/* <p className="font-medium">
            The eligibility criteria to avail a loan are as follows:
          </p> */}
          <ul>
            <li><b>Age -</b>  21- 59</li>
            <li><b>Cibil Score -</b>  650+</li>
            <li><b>Salary -</b>  Minimum 20K</li>
            <li>
              <b>Documents Required -</b>  Adhaar | Pan | Last 6 months' bank statement
            </li>
          </ul>
          <div onClick={(e) => {
            if (!withVerification()) {
              e.preventDefault(); // ⛔ stop navigation
              showLeadForm("check eligibility from course page emi");
              return;
            }
            toast.success("Our counselor will contact you shortly to discuss the eligibility");
          }}><PrimaryButton title="Check Eligibility" /></div>
        </div>
      </div>
{emiPartners?.length > 0 && (
      <h3 className="text-lg font-bold">EMI Partners</h3>
      )}

      <div className="flex flex-wrap gap-3 items-center placement_partner mb-8">
        {emiPartners?.map((item, index) => (
          <span key={index}>
            <Image className="border py-2 px-3 rounded-xl bg-white object-contain" src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${item?.logo}`} width={120} height={32} alt={item.name} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default CoursePageEMI;
