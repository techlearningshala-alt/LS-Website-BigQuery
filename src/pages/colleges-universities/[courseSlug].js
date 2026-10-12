import SidePanel from '@/components/collegeUniversity/sidePanel';
import UniversityBar from '@/components/collegeUniversity/universityBar'
import UniversityBarNew from '@/components/collegeUniversity/universityBarNew';
import CompareBar from '@/components/compare/CompareBar';
import PrimaryButton from '@/components/custom/shared/PrimaryButton';
import SecondaryButton from '@/components/custom/shared/SecondaryButton';
import { getCollegesUniversitiesData } from '@/services/CollegesUniversitiesService';
import { getCoursesByDomain, getCoursesBySlug } from '@/services/MenuService';
import Head from 'next/head';
import React from 'react'

export async function getStaticPaths() {
  const res = await getCoursesByDomain();
  const grouped = res?.data?.data || {};

  const flatCourses = Object.values(grouped).flat();

  return {
    paths: flatCourses.map((course) => ({
      params: { courseSlug: course.course_slug.toLowerCase() },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  try {
    const { courseSlug } = params;

    const [universitiesRes, courseRes] = await Promise.all([
      getCollegesUniversitiesData({ courseSlug }),
      getCoursesBySlug(courseSlug),
    ]);

    const universitiesList = universitiesRes?.data?.data || null;
    const courseData = courseRes?.data?.data || null;

    // ✅ return 404 if invalid slug OR no data
    if (!universitiesList || universitiesList.length === 0) {
      return { notFound: true };
    }

    return {
      props: { universitiesList, courseData, courseSlug },
      revalidate: 60,
    };
  } catch (error) {
    console.error("❌ Error in getStaticProps:", error);
    return { notFound: true };
  }
}


const CollegesUniversitiesPage = ({ universitiesList, courseData, courseSlug }) => {
  const courseName =
    courseData?.h1Tag || courseData?.name || courseSlug.replace(/-/g, " ");
  const headingTitle = courseName;
  const pageTitle = `Compare Top ${courseName} Universities in India`;
  const pageDescription = `Compare top ${courseName} universities in India based on fees, duration, EMI options, approvals, placements, and more to choose the right university.`;

  return (
    <div className='bg-gray-50 pt-5 sec_mb'>
      <Head>
        <title>{pageTitle}</title>
        <meta key="description" name="description" content={pageDescription} />
        <link
          rel="canonical"
          href={`https://learningshala.com/colleges-universities/${courseSlug}/`}
        />
      </Head>

      <div className='container'>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-12 lg:col-span-8'>
            <h1 className='text-lg sm:text-xl font-bold mb-4'>Compare Universities for <span className='text-primary'>{headingTitle}</span></h1>
            {/* <p className='text-sm text-gray-500 mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. - {courseData?.length} </p> */}

{universitiesList.filter((university) => university.university_type_id !== 4).map((university) => (
            <UniversityBarNew key={university.id} university={university} feeData={university.fee_types} />
            ))}

            {/* {courseData.map((university) => (
              <UniversityBar key={university.id} university={university} feeData={university.fee_types} />
            ))} */}

          </div>
          <div className='col-span-12 lg:col-span-4'>
            <SidePanel/>
          </div>
        </div>
      </div>
      <CompareBar />
    </div>
  )
}

export default CollegesUniversitiesPage