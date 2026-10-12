import React from "react";
import CourseContentHeading from "./CourseContentHeading";
import { cleanHTML } from "@/lib/cleanHTML";

const CoursePageDuration = ({
  id,
  courseData,
  screenSize,
  title,
  specializationData,
}) => {
  const duration =
    specializationData?.sections?.course_duration ??
    courseData?.sections?.course_duration;

  return (
    <div id={id} className="content_card">
      <CourseContentHeading title={title} />
      <div
        className="rich_text"
        dangerouslySetInnerHTML={{ __html: cleanHTML(duration) }}
      />
    </div>
  );
};

export default CoursePageDuration;
