import React from "react";
import CourseContentHeading from "./CourseContentHeading";
import { cleanHTML } from "@/lib/cleanHTML";
import Image from "next/image";

const CoursePagePlacementPartners = ({ id, courseData, screenSize, title, specializationData }) => {
  const coursePlacementPartners = courseData?.placement_partners;
  const specializationPlacementPartners = specializationData?.placement_partners;

  const placementPartners = specializationPlacementPartners ?? coursePlacementPartners;
  return (
    <div id={id} className="content_card">
        {/* <CourseContentHeading title={title} /> */}
        <p className="font-bold !text-lg md:!text-xl ">{title}</p>
     
      {placementPartners?.length > 0 && (
          <>
            {" "}
   
            {/* <h3 className={`font-bold text-2xl mb-4`}>{title}</h3> */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 md:gap-4 placement_partner mb-6">
              {placementPartners?.map((item, index) => (
                <span
                  className="border px-3 py-2 rounded-xl bg-white flex justify-center items-center"
                  key={index}
                >
                  <Image
                    className="object-contain"
                    src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${item?.logo}`}
                    width="100"
                    height="40"
                    alt={item.name}
                  />
                </span>
              ))}
            </div>
         
          </>
        )}
    </div>
  );
};

export default CoursePagePlacementPartners;
