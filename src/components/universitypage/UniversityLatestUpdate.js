import React from "react";
import UniversityContentHeading from "./UniversityContentHeading";
import { BellRing, ChevronRight, DownloadIcon } from "lucide-react";
import SpanButton from "./SpanButton";
import { cleanHTML } from "@/lib/cleanHTML";
import Link from "next/link";

const UniversityLatestUpdate = ({
  id,
  title,
  universityData,
  courseData,
  specializationData,
}) => {
  const universityUpdate = universityData?.sections?.Latest_Updates;
  const courseUpdate = courseData?.sections_transformed?.Latest_Updates;
  const specializationUpdate = specializationData?.sections_transformed?.Latest_Updates;

  const latestUpdate = specializationUpdate ? specializationUpdate : courseUpdate ? courseUpdate : universityUpdate;
  return (
    <>
      <div id={id} className="content_card">

        <div className="flex items-center flex-wrap justify-between">
          {/* <UniversityContentHeading
            title={
              <span className="flex items-center gap-2">
                <BellRing className="bg-gray-200 p-2 w-10 h-10 rounded-md " />{" "}
                {title}
              </span>
            }
          /> */}
          <p className={`font-bold !text-lg mb-4 flex items-center gap-2`}><BellRing className="bg-white p-2 w-10 h-10 rounded-md text-red-600 animate-bounce" />{" "}
          {title}</p>
          {/* <SpanButton
            title="Get Latest Updates"
            icon={<ChevronRight className="w-4 h-4" />}
          /> */}
        </div>
        <div
          className="rich_text"
          dangerouslySetInnerHTML={{ __html: cleanHTML(latestUpdate || "India has become the second largest e-learning market after the US. The Indian Higher Education Market is expected to grow nearly 2X in 2033 from 2024 at a CAGR of 8.1%, according to the IMARC Group.") }}
        />
{!latestUpdate && <p className="flex justify-end mb-0! text-[12px]!">Source:<Link href="https://www.ibef.org/industry/education-sector-india" className="text-[11px]! text-blue-500 font-semibold underline text-end" rel="nofollow" target="_blank"> IBEF</Link></p>}


      </div>
    </>
  );
};

export default UniversityLatestUpdate;
