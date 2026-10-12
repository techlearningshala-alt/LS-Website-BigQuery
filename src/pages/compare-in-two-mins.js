import SuggestMe from "@/components/SuggestMe";
import { getCoursesByDomain } from "@/services/MenuService";
import Head from "next/head";

export async function getStaticProps() {
  const menuResponse = await getCoursesByDomain();
  const menuDataSchema = menuResponse?.data?.data ?? null;

  return {
    props: {
      menuDataSchema,
    },
    revalidate: 60,
  };
}

const HelpMeToChoose = ({ menuDataSchema }) => {
  const menuData = menuDataSchema ? { data: menuDataSchema } : null;

  return (
    <div className="h-dvh w-full overflow-hidden">
      <Head>
        <title>Compare Online Universities & Courses in 2 Mins | LearningShala</title>
        <meta
          name="description"
          content="Do not waste hours researching. Compare India's best online universities on 40+ factors like approvals, LMS quality, fees and ROI with our 2-min tool."
        />
        <link
          rel="canonical"
          href="https://learningshala.com/compare-in-two-mins/"
        />
      </Head>
      <SuggestMe menuData={menuData} />
    </div>
  );
};

export default HelpMeToChoose;
