import React, { useState } from "react";
import UniversityContentHeading from "./UniversityContentHeading";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import ContentModal from "../custom/shared/modal/ContentModal";
import PrimaryButton from "../custom/shared/PrimaryButton";

const UniversityFaculties = ({ id, title, universityData,courseData,specializationData }) => {
 

  // const faculties =
  
  // courseData?.sections_transformed?.University_Faculties?.length > 0 ? universityData?.sections?.University_Faculties : courseData?.sections_transformed?.University_Faculties?.length > 0 ? courseData?.sections_transformed?.University_Faculties : universityData?.sections?.University_Faculties;

  
  const faculties = courseData?.sections_transformed?.University_Faculties?.length > 0 ? courseData?.sections_transformed?.University_Faculties : universityData?.sections?.University_Faculties;

  return (
    <>
      <div id={id} className={`content_card ${faculties?.length > 0 ? "" : "hidden"}`}>
        <UniversityContentHeading
          title={title}
        />
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-5 flex-wrap gap-x-2 gap-y-8 ">
            {faculties?.map((item, index) => (
              <ContentModal
                ContentClassName="w-md"
                key={index}
                title={""}
                trigger={
                  <div className="flex-1 bg-gray-900 rounded-md p-3 border border-gray-800">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${item?.img}`}
                      width={80}
                      height={80}
                      alt={item?.name || "Faculty Image"}
                      className="w-20 h-20 mb-2 rounded-2xl object-cover mx-auto transition-all duration-500 border-2 border-solid border-transparent"
                    />
                    <p className="text-sm! font-bold text-white text-center !mb-0 transition-all duration-500 !line-clamp-1">
                      {item?.name}
                    </p>
                    <p className="text-gray-400 !mb-1 text-center block transition-all duration-500 !line-clamp-1 text-[12px]!">
                      {item?.designation || ""}
                    </p>
                    <p className="text-center text-[10px]! text-white mb-1! bg-primary/10 text-primary px-2 py-1 rounded-md w-fit mx-auto line-clamp-1"> {item?.faculty_qualification}</p>
                    <p className="text-left text-[12px]! text-gray-300! line-clamp-2" style={{ lineHeight: "18px" }}>{item?.desc}</p>
                    <span className="cursor-pointer text-yellow-500 inline-flex items-center text-center transition-all duration-500 font-bold text-[12px]! sm:text-sm">
                      View More <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                }
                content={
                  <div>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${item?.img}`}
                      width={100}
                      height={100}
                      alt={item?.name || "Faculty Image"}
                      className="w-28 h-28 border-white rounded-2xl object-cover mx-auto ransition-all duration-500 border-4 border-solid border-transparent mb-4"
                    />
                    <p className="text-center font-bold mb-0 text-primary">
                      {" "}
                      {item?.name}
                    </p>
                    <p className="text-center font-bold mb-3 !line-clamp-1">
                      {" "}
                      {item?.designation || ""}
                    </p>
                    {item?.faculty_qualification && (
                    <p className="text-center text-sm mb-2 bg-primary/10 text-primary px-2 py-1 rounded-md w-fit mx-auto">Qualification: {item?.faculty_qualification}</p>
                    )}
                    <p className="text-center">{item?.desc}</p>
                  </div>
                }
                div
              />
            ))}
          </div>

          {/* <ContentModal
            ContentClassName="sm:max-w-5xl"
            title={`${title}`}
            triggerClassName={`w-full flex justify-center items-center mt-6 ${faculties?.length > 6 ? "block" : "hidden"}`}
            trigger={<PrimaryButton title={`View All ${faculties?.length} Faculty`} icon={<ChevronRight />} />}
            content={
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 mt-5 gap-x-2 md:gap-x-4 gap-y-8 ">
                {faculties?.map((item, index) => (
                  <ContentModal
                    ContentClassName="w-md"
                    key={index}
                    title={""}
                    trigger={
                      <div className=" rounded-md p-2 bg-gray-900 border border-gray-200 flex-1">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${item?.img}`}
                          width={100}
                          height={100}
                          alt={item?.name || "Faculty Image"}
                          className="w-28 h-28 mb-2 rounded-2xl object-cover mx-auto transition-all duration-500 border-2 border-solid border-transparent"
                        />
                        <h4 className="text-md font-bold text-white  text-center !mb-0 transition-all duration-500 !line-clamp-1">
                          {item?.name}
                        </h4>
                        <p className="text-gray-400 !mb-1 text-center block transition-all duration-500 !line-clamp-1 text-[12px]">
                          {item?.designation || ""}
                        </p>
                        <span className="cursor-pointer text-primary inline-flex items-center text-center transition-all duration-500 font-bold text-[12px] sm:text-sm">
                          View More<ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    }
                    content={
                      <div>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${item?.img}`}
                          width={100}
                          height={100}
                          alt={item?.name || "Faculty Image"}
                          className="w-28 h-28 border-white rounded-2xl object-cover mx-auto ransition-all duration-500 border-4 border-solid border-transparent mb-4"
                        />
                        <p className="text-center font-bold mb-0 text-primary">
                          {" "}
                          {item?.name}
                        </p>
                        <p className="text-center font-bold mb-3 !line-clamp-1">
                          {" "}
                          {item?.designation || ""}
                        </p>
                        {item?.faculty_qualification && (
                    <p className="text-center text-sm mb-2 bg-primary/10 text-primary px-2 py-1 rounded-md w-fit mx-auto">Qualification: {item?.faculty_qualification}</p>
                    )}
                       
                        <p className="text-center">{item?.desc}</p>
                      </div>
                    }
                    div
                  />
                ))}
              </div>
            }
          /> */}
        </section>
      </div>
    </>
  );
};

export default UniversityFaculties;
