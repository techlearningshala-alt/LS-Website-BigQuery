import React from "react";
import UniversityContentHeading from "./UniversityContentHeading";
import FaqCategory from "../custom/shared/FaqCategory";
import useWindowSize from "@/lib/use-window-size";

const UniversityFaq = ({ id, title, universityData,courseData,specializationData,courseDegreeData,specializationDegreeData }) => {
  // console.log(universityData?.university_faqs,'faq data');
  const size = useWindowSize();

  // const faqData =  
  // specializationData?.university_faqs.length > 0
  //   ? specializationData?.university_faqs
  //   : courseData?.university_faqs.length > 0
  //   ? courseData?.university_faqs
  //   : universityData?.university_faqs;

  const faqData =
  specializationDegreeData?.faq_data ??
  courseDegreeData?.faq_data ??
  specializationData?.university_faqs ??
  courseData?.university_faqs ??
  universityData?.university_faqs ??
  null;


  return (
    <div id={id} className="content_card">
      <UniversityContentHeading title={title} />
      <FaqCategory faqData={faqData} screenSize={size} />
    </div>
  );
};

export default UniversityFaq;
