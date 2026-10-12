import React from "react";
import CourseContentHeading from "./CourseContentHeading";
import { cleanHTML } from "@/lib/cleanHTML";

const CoursePageCareerOpportunities = ({ id, courseData, screenSize, title, specializationData }) => {
  const careerOpportunities = specializationData?.sections?.career_opportunities ?? courseData?.sections?.career_opportunities;
  return (
    <div id={id} className="content_card">
      <CourseContentHeading title={title} />
      <div
        className="rich_text"
        dangerouslySetInnerHTML={{ __html: cleanHTML(careerOpportunities) }}
      />
    </div>
  );
};

export default CoursePageCareerOpportunities;
