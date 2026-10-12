import React from "react";
import UniversityContentHeading from "./UniversityContentHeading";
import SpanButton from "./SpanButton";
import { ChevronRight } from "lucide-react";
import { cleanHTML } from "@/lib/cleanHTML";
import { useLeadForm } from "@/context/LeadFormContext";
import { useLeadGuard } from "../auth/useLeadGuard";
import { toast } from "sonner";

const UniversityWhyChoose = ({ id, title, universityData,courseData,specializationData }) => {
 

  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();

  const whyChoose =
  specializationData?.sections_transformed?.Why_Choose ? specializationData?.sections_transformed?.Why_Choose : courseData?.sections_transformed?.Why_Choose ? courseData?.sections_transformed?.Why_Choose : universityData?.sections?.Why_Choose;
  // courseData?.sections_transformed?.Why_Choose ? courseData?.sections_transformed?.Why_Choose : universityData?.sections?.Why_Choose;



const isEmpty = (v) => v == null || v === "";
const isNotEmpty = (v) => v != null && v !== "";

const specializationGrid = specializationData?.sections_transformed?.gridContent;
const courseGrid = courseData?.sections_transformed?.gridContent;
const universityGrid = universityData?.sections?.gridContent;

// 👉 Check if ALL items in courseData are empty
// const allCourseEmpty = courseGrid?.some(
//   (item) => isEmpty(item?.title)
// );

// const allSpecializationEmpty = specializationGrid?.some(
//   (item) => isEmpty(item?.title)
// );
// 👉 Final output
// const gridContent = allSpecializationEmpty ? allCourseEmpty ? universityGrid : courseGrid || universityGrid : specializationGrid;

// let gridContent;

// if (!allSpecializationEmpty) {
//   gridContent = specializationGrid || courseGrid || universityGrid;
// } else if (!allCourseEmpty) {
//   gridContent = courseGrid || universityGrid;
// } else {
//   gridContent = universityGrid;
// }


const hasSpecializationData = specializationGrid?.some(
  (item) => item?.title || item?.content
);

const hasCourseData = courseGrid?.some(
  (item) => item?.title || item?.content
);

const hasUniversityData = universityGrid?.some(
  (item) => item?.title || item?.content
);

let gridContent;

if (hasSpecializationData) {
  gridContent = specializationGrid;
} else if (hasCourseData) {
  gridContent = courseGrid;
} else if (hasUniversityData) {
  gridContent = universityGrid;
} else {
  gridContent = []; // fallback if everything is empty
}


  return (
    <div id={id} className="content_card">
      <div className="flex flex-wrap gap-3 items-center justify-between mb-4">
        {" "}
        <UniversityContentHeading
          className="!m-0"
          title={title}
        />
        <div onClick={(e) => {
                      if (!withVerification()) {
                        e.preventDefault(); // ⛔ stop navigation
                        showLeadForm("talk to university from university why choose");
                        return;
                      }
                      toast.success("University will contact you shortly 📞");
                    }}>
        <SpanButton
          title="Talk to university"
          icon={<ChevronRight className="w-4 h-4" />}
        />
        </div>

      </div>
      <div
        className="rich_text"
        dangerouslySetInnerHTML={{ __html: cleanHTML(whyChoose) }}
       
      />
      <div className="grid grid-cols-12 gap-4">
        {gridContent?.map((data, index) => (
          <div
            className={`col-span-12 lg:col-span-4 rounded-xl p-6`}
            style={{ backgroundColor: data?.bgColor }}
            key={index}
          >
           
            <p className="font-bold mb-2 text-[18px]">{data?.title}</p>
            <div
              dangerouslySetInnerHTML={{ __html: cleanHTML(data?.content || "") }}
              className="rich_text"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversityWhyChoose;
