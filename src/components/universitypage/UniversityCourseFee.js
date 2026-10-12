import React from "react";
import UniversityContentHeading from "./UniversityContentHeading";
import { cleanHTML } from "@/lib/cleanHTML";

const UniversityCourseFee = ({ id, title, courseData,specializationData }) => {
  // console.log(specializationData,"specializationData");
 
  const courseFee =
  specializationData?.sections_transformed?.Course_Fees ?? courseData?.sections_transformed?.Course_Fees ?? null;


  return (
    <>
      <div id={id} className="content_card">
        <div className="flex items-center mb-4 gap-3">
          <UniversityContentHeading
            className="!m-0"
            title={title}
          />
        </div>
        <div
          className="rich_text"
          dangerouslySetInnerHTML={{
            __html: cleanHTML(courseFee),
          }}
        />
      </div>
    </>
  );
};

export default UniversityCourseFee;
