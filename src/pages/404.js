import CourseSection from "@/components/custom/homepage/courseSection/CourseSection";
import MainHeading from "@/components/custom/shared/MainHeading";
import useWindowSize from "@/lib/use-window-size";
import React from "react";

const NotFound = ({ menuData }) => {
  const size = useWindowSize();
  return (
    <section className="sec_mb">
      <div className="container">
        <div className="bg-[#faf9f7] py-8 px-6 rounded-2xl mb-6 flex flex-col items-center justify-center">
          {" "}
          <MainHeading
            className="!mb-4"
            title={
              <>
                Not Found <span className="text-primary">Page</span>
              </>
            }
          />
          <p>
            The page you are looking for does not exist. Please Explore our courses.
          </p>
        </div>
        <CourseSection screenSize={size} menuData={menuData} />
      </div>
    </section>
  );
};

export default NotFound;
