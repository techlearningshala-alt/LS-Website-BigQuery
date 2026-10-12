import CourseSection from "@/components/custom/homepage/courseSection/CourseSection";
import useWindowSize from "@/lib/use-window-size";
import Head from "next/head";
import React from "react";
import { getCoursesByDomain } from "@/services/MenuService";

export async function getStaticProps() {
  const menuResponse = await getCoursesByDomain();
  const menuDataSchema = menuResponse?.data?.data ?? null;

  return {
    props: {
      menuDataSchema: menuDataSchema,
    },
    revalidate: 60,
  };
}

const UgCourses = ({ menuData }) => {
  const size = useWindowSize();
  return (
    <>
    <Head>
      <title>UGC-Approved Online PG Courses - LearningShala</title>
      <meta key="description" name="description" content="Earn a recognized master’s degree online in India with affordable fees, expert faculty, and industry-relevant curricula with LearningShala." />
      <link rel="canonical" href="https://learningshala.com/category/pg-courses/" />
    </Head>
    <section className="sec_mb">
      <div className="container">
        <div className="bg-[#faf9f7] py-8 px-6 rounded-2xl mb-6 flex flex-col items-center justify-center">
          {" "}
         <h1 className="text-2xl font-bold">UGC-Approved Online PG Courses</h1>

        </div>
        <CourseSection
          screenSize={size}
          menuData={menuData}
          defaultCategory="pg-courses"
        />
      </div>
    </section></>
  );
};

export default UgCourses;
