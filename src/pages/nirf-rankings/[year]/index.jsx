import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/nirf-rankings/Header";
import NirfTabYear from "@/components/nirf-rankings/NirfTabYear";

const VALID_YEARS = Array.from({ length: 2025 - 2016 + 1 }, (_, i) =>
  String(2025 - i)
);

const NirfRankingsYearPage = () => {
  const router = useRouter();
  const yearParam = String(router.query.year || "2025");
  const year = VALID_YEARS.includes(yearParam) ? yearParam : "2025";

  const title = `NIRF Ranking ${year} List of Universities in India`;
  const description =
    "The National Institutional Ranking Framework (NIRF) offers transparent & fair comparisons between different institutes. You can now compare HEIs based on student-teacher ratio, sustainability, and outcome-based metrics to make a data-driven decision.";

  return (
    <div>
      <Head>
        <title>{`${title} | LearningShala`}</title>
        <meta key="description" name="description" content={description} />
        <link
          rel="canonical"
          href={`https://learningshala.com/nirf-rankings/${year}/`}
        />
      </Head>

      <Header
        title={title}
        description={description}
        breadcrumbLabel={`NIRF Ranking ${year}`}
        logoSrc="/images/approvals/nirf.webp"
      />
      <NirfTabYear activeYear={year} />
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const year = String(params?.year || "");

  if (!VALID_YEARS.includes(year)) {
    return {
      redirect: {
        destination: "/nirf-rankings/2025/",
        permanent: false,
      },
    };
  }

  return { props: {} };
}

export default NirfRankingsYearPage;
