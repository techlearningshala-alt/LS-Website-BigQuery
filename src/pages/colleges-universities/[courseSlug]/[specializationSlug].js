import UniversityBar from "@/components/collegeUniversity/universityBar";
import CompareBar from "@/components/compare/CompareBar";
import { getCoursesByDomain, getCoursesBySlug, getSpecializationBySlug } from "@/services/MenuService";
import { getUniversitiesBySpecialization } from "@/services/CollegesUniversitiesService";
import React from "react";
import SidePanel from "@/components/collegeUniversity/sidePanel";
import UniversityBarNew from "@/components/collegeUniversity/universityBarNew";
import Head from "next/head";

// ✅ Generate paths
export async function getStaticPaths() {
  const res = await getCoursesByDomain();
  const grouped = res?.data?.data || {};

  const flatCourses = Object.values(grouped).flat();

  // 🔥 Create paths for course + specialization
  const paths = [];

  flatCourses.forEach((course) => {
    course.specializations?.forEach((spec) => {
      paths.push({
        params: {
          courseSlug: course.course_slug.toLowerCase(),
          specializationSlug: spec.slug.toLowerCase(),
        },
      });
    });
  });

  return {
    paths,
    fallback: "blocking",
  };
}

// ✅ Fetch data
export async function getStaticProps({ params }) {
  try {
    const { courseSlug, specializationSlug } = params;

    const [res, specializationRes, courseRes] = await Promise.all([
      getUniversitiesBySpecialization({
        courseSlug,
        specializationSlug,
      }),
      getSpecializationBySlug({ courseSlug, specializationSlug }),
      getCoursesBySlug(courseSlug),
    ]);

    const specializationData = res?.data?.data || null;
    const specializationDetail = specializationRes?.data?.data || null;
    const courseData = courseRes?.data?.data || null;

    // ✅ 404 if no data
    if (!specializationData || specializationData.length === 0) {
      return { notFound: true };
    }

    return {
      props: {
        specializationData,
        specializationDetail,
        courseData,
        courseSlug,
        specializationSlug,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("❌ Error:", error);
    return { notFound: true };
  }
}


// ✅ Page Component
const SpecializationPage = ({
  specializationData,
  specializationDetail,
  courseData,
  courseSlug,
  specializationSlug,
}) => {
  const formatSlug = (slug) =>
    slug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const specializationName =
    specializationDetail?.h1Tag ||
    specializationDetail?.name ||
    `${formatSlug(courseSlug)} in ${formatSlug(specializationSlug)}`;

  const headingTitle = specializationName;
  const pageTitle = `Compare Top ${specializationName} Universities in India`;
  const pageDescription = `Compare top ${specializationName} universities in India based on fees, duration, approvals, placements and more to choose the right university.`;

  return (
    <div className="bg-gray-50 pt-5 sec_mb">
      <Head>
        <title>{pageTitle}</title>
        <meta key="description" name="description" content={pageDescription} />
        <link
          rel="canonical"
          href={`https://learningshala.com/colleges-universities/${courseSlug}/${specializationSlug}/`}
        />
      </Head>

      <div className="container">
        <div className="grid grid-cols-12 gap-4">
          
          {/* ✅ Left Section */}
          <div className="col-span-12 lg:col-span-8">
          <h1 className="text-lg sm:text-xl font-bold mb-4">
            Compare Universities for{" "}
            <span className="text-primary">{headingTitle}</span>
          </h1>

            {/* {specializationData.map((university) => (
              <UniversityBar
                key={university.university_id}
                university={university}
                feeData={university.fee_types}
              />
            ))} */}


{specializationData.filter((university) => university.university_type_id !== 4).map((university) => (
            <UniversityBarNew key={university.university_id} university={university} feeData={university.fee_types} />
            ))}





          </div>

          {/* ✅ Right Section (optional sidebar) */}
          <div className="col-span-12 lg:col-span-4">
            <SidePanel />
          </div>
        </div>
      </div>

      {/* ✅ Compare Bar */}
      <CompareBar />
    </div>
  );
};

export default SpecializationPage;