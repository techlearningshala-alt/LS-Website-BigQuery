import React from "react";

const UniversityContentHeading = (props) => {
  return <h2 className={`font-bold text-lg md:text-2xl mb-4 ${props.className}`}>{props.title}</h2>;
};

export default UniversityContentHeading;
