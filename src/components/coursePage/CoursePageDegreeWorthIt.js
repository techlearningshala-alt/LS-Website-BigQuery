import React from "react";
import CourseContentHeading from "./CourseContentHeading";
import { cleanHTML } from "@/lib/cleanHTML";

const CoursePageDegreeWorthIt = ({ id, courseData, screenSize, title, specializationData }) => {
  const degreeWorthIt =  specializationData?.sections?.worth_it ?? courseData?.sections?.worth_it;
  return (
    <div id={id} className="content_card">
      <CourseContentHeading title={title} />
      <div
        className="rich_text"
        dangerouslySetInnerHTML={{ __html: cleanHTML(degreeWorthIt) }}
      />
    </div>
  );
};

export default CoursePageDegreeWorthIt;
