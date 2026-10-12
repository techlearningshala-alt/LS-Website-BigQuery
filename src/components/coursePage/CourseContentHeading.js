import React from "react";

const CourseContentHeading = (props) => {
  return <h2 className={`font-bold text-lg md:text-2xl mb-5 ${props.className}`}>{props.title}</h2>;
};

export default CourseContentHeading;
