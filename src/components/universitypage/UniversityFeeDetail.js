import React from "react";
import UniversityContentHeading from "./UniversityContentHeading";
import SpanButton from "./SpanButton";
import { Banknote } from "lucide-react";
import { cleanHTML } from "@/lib/cleanHTML";

const UniversityFeeDetail = ({ id, title, universityData,courseData }) => {
  const feeDetail =
  courseData?.sections_transformed?.Fee_Details ? courseData?.sections_transformed?.Fee_Details : universityData?.sections?.Fee_Details;
  return (
    <div id={id} className="content_card">
      <div className="flex flex-wrap items-center justify-between mb-4"><UniversityContentHeading className="!m-0" title={title} />
        <SpanButton title="Apply for loan" icon={<Banknote className="w-5 h-5" />} /></div>
      <div className="rich_text" dangerouslySetInnerHTML={{ __html: cleanHTML(feeDetail) }} />
    </div>
  );
};

export default UniversityFeeDetail;
