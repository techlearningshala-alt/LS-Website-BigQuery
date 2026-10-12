import React from "react";
import UniversityContentHeading from "./UniversityContentHeading";
import VideoModal from "../custom/shared/modal/VideoModal";
import { cleanHTML } from "@/lib/cleanHTML";

const UniversityDesc = ({ id, title, universityData,courseData,specializationData }) => {
 
  // const aboutUniversity =
  // specializationData?.sections_transformed?.About_University ? specializationData?.sections_transformed?.About_University : courseData?.sections_transformed?.About_University ? courseData?.sections_transformed?.About_University : universityData?.sections?.About_University;


  const aboutUniversity =
  specializationData?.sections_transformed?.About_University ??
  (courseData?.sections_transformed?.About_University ?? 
  (universityData?.sections?.About_University ?? null));


  const videoID =
  specializationData?.sections_transformed?.videoID ? specializationData?.sections_transformed?.videoID : courseData?.sections_transformed?.videoID ? courseData?.sections_transformed?.videoID : universityData?.sections?.videoID;

  const videoTitle =
  specializationData?.sections_transformed?.videoTitle ? specializationData?.sections_transformed?.videoTitle : courseData?.sections_transformed?.videoTitle ? courseData?.sections_transformed?.videoTitle : universityData?.sections?.videoTitle;



  return (
    <>
      <div id={id} className="content_card">
        <div className="flex items-center mb-4 gap-3">
          <UniversityContentHeading
            className="!m-0"
            title={title}
          />
          {/* {videoID && (
            <VideoModal
              videoID={videoID}
              title={videoTitle}
            />
          )} */}
        </div>
        <div
          className="rich_text"
          dangerouslySetInnerHTML={{
            __html: cleanHTML(aboutUniversity),
          }}
        />
      </div>
    </>
  );
};

export default UniversityDesc;
