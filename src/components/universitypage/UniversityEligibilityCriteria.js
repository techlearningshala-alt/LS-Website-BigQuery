import React from "react";
import UniversityContentHeading from "./UniversityContentHeading";
import { cleanHTML } from "@/lib/cleanHTML";

const UniversityEligibilityCriteria = ({
  id,
  title,
  universityData,
  courseData,
  specializationData,
}) => {
  const eligibilityCriteria =
  specializationData?.sections_transformed?.Eligibility_Criteria ?
  specializationData?.sections_transformed?.Eligibility_Criteria :
  courseData?.sections_transformed?.Eligibility_Criteria ?
  courseData?.sections_transformed?.Eligibility_Criteria :
  null;

  // console.log(specializationData,"eligibilityCriteria");
  

  return (
    <div id={id} className="content_card">
      <UniversityContentHeading title={title} />
      <div
        className="rich_text"
        dangerouslySetInnerHTML={{ __html: cleanHTML(eligibilityCriteria) }}
      />
    </div>
  );
};

export default UniversityEligibilityCriteria;
