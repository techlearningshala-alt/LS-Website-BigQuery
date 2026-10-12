import React from "react";
import CourseContentHeading from "./CourseContentHeading";
import PrimaryButton from "../custom/shared/PrimaryButton";
import SecondaryButton from "../custom/shared/SecondaryButton";
import { cleanHTML } from "@/lib/cleanHTML";
import { useLeadForm } from "@/context/LeadFormContext";
import { useLeadGuard } from "../auth/useLeadGuard";
import { toast } from "sonner";

const CoursePageEligibility = ({ id, courseData, screenSize, title, specializationData }) => {
  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();
  const eligibilityCriteria = specializationData?.sections?.eligibility_criteria ?? courseData?.sections?.eligibility_criteria;
 


  return (
    <div id={id} className="content_card">
      <CourseContentHeading title={title} />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8 border rounded-3xl p-6 flex flex-col justify-between">
          <div
            className="rich_text"
            dangerouslySetInnerHTML={{ __html: cleanHTML(eligibilityCriteria) }}
          />

          <div className="flex justify-between items-center gap-4">
            {" "}
            <div  onClick={(e) => {
            if (!withVerification()) {
              e.preventDefault(); // ⛔ stop navigation
              showLeadForm("talk to our expert from course page eligibility");
              return;
            }
            toast.success("Our counselor will contact you shortly 📞");
          }}><PrimaryButton title="Apply Now" /></div>
            {courseData?.upload_brochure && (
           <div onClick={() => {
                  if (!withVerification()) {
                    showLeadForm(
                      "download brochure from course page eligibility",
                      {
                        type: "download",
                        url: `${process.env.NEXT_PUBLIC_S3_BASE_URL}${courseData?.upload_brochure}`,
                      }
                    );
                    return;
                  }
              
                  // already verified
                  window.open(
                    `${process.env.NEXT_PUBLIC_S3_BASE_URL}${courseData?.upload_brochure}`,
                    "_self"
                  );
                }}> <SecondaryButton title="Download Brochure" /></div>
                )}

          </div>
        </div>

        <div className="bg-primary-foreground p-6 rounded-lg flex flex-col justify-between col-span-12 lg:col-span-4">
          <div>
            <p className="!text-xl font-bold mb-4">Growth of Online Education</p>
            <ul>
              <li><span className="font-bold">Value of Online Degree:</span> UGC-DEB has made it equal in value to a regular degree.</li>
              <li><span className="font-bold">Market Demand of Online Degree:</span> Forecasted to reach $8.93 billion with a CAGR of 8.6% (2020-29).</li>
              <li><span className="font-bold">Global Employee Acceptance:</span> 92% Acceptance rate of online graduates by leading global MNCs.</li>
              <li><span className="font-bold">Salary Hike:</span>Professionals receive a 40-60% salary hike after completing an online degree.</li>
            </ul>
          </div>

          <div onClick={(e) => {
            if (!withVerification()) {
              e.preventDefault(); // ⛔ stop navigation
              showLeadForm("talk to our expert from course page eligibility");
              return;
            }
            toast.success("Our counselor will contact you shortly 📞");
          }}><PrimaryButton title=" Talk to our expert" /></div>
        </div>
      </div>
    </div>
  );
};

export default CoursePageEligibility;
