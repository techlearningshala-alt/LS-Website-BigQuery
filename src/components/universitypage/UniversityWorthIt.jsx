import React from "react";
import UniversityContentHeading from "./UniversityContentHeading";
import { cleanHTML } from "@/lib/cleanHTML";

const UniversityWorthIt = ({id,title,universityData,courseData,specializationData}) => {
  const scholarship =
  specializationData?.sections_transformed?.Worth_It ? specializationData?.sections_transformed?.Worth_It : courseData?.sections_transformed?.Worth_It ? courseData?.sections_transformed?.Worth_It : universityData?.sections?.Worth_It;
  return (

   <>
   <div id={id} className={`content_card ${scholarship ? "" : "hidden"}`}>
      <UniversityContentHeading title={title} />
      <div className="rich_text" dangerouslySetInnerHTML={{ __html: cleanHTML(scholarship) }} />
    </div>
    </>
  );
};

export default UniversityWorthIt;
