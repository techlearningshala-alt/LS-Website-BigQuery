import React from "react";
import CourseContentHeading from "./CourseContentHeading";
import { cleanHTML } from "@/lib/cleanHTML";

const CoursePageOverview = ({ id, courseData, screenSize, title, specializationData }) => {
  const courseOverview = courseData?.sections?.course_overview;
  const specializationOverview = specializationData?.sections?.course_overview;

  const overview = specializationOverview ?? courseOverview;
  return (
    <div id={id} className="content_card">
      <CourseContentHeading title={title} />

      <div
        className="rich_text"
        dangerouslySetInnerHTML={{ __html: cleanHTML(overview) }}
      />
    </div>
  );
};

export default CoursePageOverview;
