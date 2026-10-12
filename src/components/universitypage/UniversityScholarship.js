import React from "react";
import UniversityContentHeading from "./UniversityContentHeading";
import { cleanHTML } from "@/lib/cleanHTML";

const UniversityScholarship = ({id,title,universityData,courseData,specializationData}) => {
  const scholarship =
  specializationData?.sections_transformed?.Scholarships_Program ? specializationData?.sections_transformed?.Scholarships_Program : courseData?.sections_transformed?.Scholarships_Program ? courseData?.sections_transformed?.Scholarships_Program : universityData?.sections?.Scholarships_Program;
  return (

   <>
   <div id={id} className={`content_card ${scholarship ? "" : "hidden"}`}>
      <UniversityContentHeading title={title} />
      <div className="rich_text" dangerouslySetInnerHTML={{ __html: cleanHTML(scholarship) }} />
    </div>
    </>
  );
};

export default UniversityScholarship;
