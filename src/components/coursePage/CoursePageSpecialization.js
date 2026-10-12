import React, { useState } from "react";
import {
  ArrowRight,
  Calculator,
  Clock,

} from "lucide-react";
import Link from "next/link";
import CourseContentHeading from "./CourseContentHeading";
import SpanButton from "../universitypage/SpanButton";
import { Badge } from "../ui/badge";

const CoursePageSpecialization = ({
  id,
  title,
  courseData,
  screenSize,
}) => {
  const specializationList = courseData?.specialization_data;

  // const otherSpecializationList = specializationList?.filter(specialization => specialization.slug !== courseData?.specialization_data[0]?.slug);


  return (
    <>
    
      <div id={id} className="content_card">
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <CourseContentHeading
            className="!m-0"
            title={title}
          />
          {/* <Link href="/tools/roi-calculator" className="text-nowrap">
            {" "}
            <SpanButton
              title="ROI Calculator"
              icon={<Calculator className="w-4 h-4" />}
            />
          </Link> */}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 mb-6">
          {specializationList?.map((data, index) => (
            <div key={index}>
              {" "}
              <Link href={`/courses/${courseData?.slug}/${data?.slug}`} className="group">
                <div className="border-0 rounded-2xl p-4 relative bg-[#faf9f7] h-full">
                  <p className="font-bold mb-3 text-lg">{data?.name}</p>

                  <p className="flex items-center justify-between !mb-0 gap-2 relative flex-wrap">
                    {" "}
                    <span className="flex items-center gap-1 text-sm text-nowrap">
                      <Clock className="w-5 h-5 bg-yellow-200 p-1 rounded-full" />{" "}
                      <span className="font-bold">{data?.duration}</span>
                    </span>
                    <Badge className="bg-primary text-white group-hover:bg-primary/90 group-hover:text-white transition-all duration-300 font-medium text-nowrap">
                      View <ArrowRight size={16} />
                    </Badge>
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      
      </div>
    
    </>
  );
};

export default CoursePageSpecialization;
