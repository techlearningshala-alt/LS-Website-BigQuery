import React from "react";
import UniversityContentHeading from "./UniversityContentHeading";
import { cleanHTML } from "@/lib/cleanHTML";

const UniversityLMS = ({ id, title, universityData ,courseData,specializationData}) => {
  const lms =
  specializationData?.sections_transformed?.Learning_Management_SystemLMS ? specializationData?.sections_transformed?.Learning_Management_SystemLMS : courseData?.sections_transformed?.Learning_Management_SystemLMS ? courseData?.sections_transformed?.Learning_Management_SystemLMS : universityData?.sections?.Learning_Management_SystemLMS;
  return (
    <>
      <div id={id} className="content_card">
          <div className="flex items-center flex-wrap justify-between mb-4">
            <UniversityContentHeading title={title} />
          </div>
          <div className="rich_text" dangerouslySetInnerHTML={{ __html: cleanHTML(lms) }} />
        </div>
    </>
  );
};

export default UniversityLMS;
