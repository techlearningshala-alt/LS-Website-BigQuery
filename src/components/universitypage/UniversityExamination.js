import React from "react";
import UniversityContentHeading from "./UniversityContentHeading";
import { cleanHTML } from "@/lib/cleanHTML";

const UniversityExamination = ({ id, title, universityData,courseData,specializationData }) => {
  const examination =
  specializationData?.sections_transformed?.Examination_Pattern ? specializationData?.sections_transformed?.Examination_Pattern : courseData?.sections_transformed?.Examination_Pattern ? courseData?.sections_transformed?.Examination_Pattern : universityData?.sections?.Examination_Pattern;
  return (
    <>
    <div id={id} className="content_card">
          <div className="flex items-center flex-wrap justify-between mb-4">
            <UniversityContentHeading title={title} />
          </div>
          <div className="rich_text" dangerouslySetInnerHTML={{ __html: cleanHTML(examination) }} />
        </div>
    </>
  );
};

export default UniversityExamination;
