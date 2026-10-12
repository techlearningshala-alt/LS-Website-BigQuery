import React from "react";
import Head from "next/head";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/nirf-rankings/Header";
import RankingTable from "@/components/nirf-rankings/RankingTable";
import { rankingData } from "@/components/nirf-rankings/rankings/rankingData";
import {
  YEARS,
  getCategoryMeta,
  yearCategories,
} from "@/components/nirf-rankings/yearCategories";

const VALID_YEARS = YEARS.map(String);

const NirfCategoryPage = ({
  year,
  category,
  categoryName,
  rows,
  prevCategory,
  nextCategory,
}) => {
  const title = `NIRF ${categoryName} Ranking ${year}`;
  const description =
    "The overall category of NIRF ranking evaluates higher institutions on various parameters, including teaching, learning resources, research, graduation outcomes, outreach, inclusivity, and perception. It helps you compare HEIs based on overall academic and institutional performance.";

  return (
    <div>
      <Head>
        <title>{`${title} | LearningShala`}</title>
        <meta key="description" name="description" content={description} />
        <link
          rel="canonical"
          href={`https://learningshala.com/nirf-rankings/${year}/${category}/`}
        />
      </Head>

      <Header
        title={title}
        description={description}
        breadcrumbLabel={`${categoryName} ${year}`}
        breadcrumbItems={[
          { label: "NIRF Rankings", href: "/nirf-rankings/" },
          { label: year, href: `/nirf-rankings/${year}/` },
          { label: categoryName },
        ]}
      />

      <section className="container mx-auto px-4 py-8 md:py-12">
        <RankingTable rows={rows} categoryName={categoryName} year={year} />

        {(prevCategory || nextCategory) && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            {prevCategory ? (
              <Link
                href={`/nirf-rankings/${year}/${prevCategory.slug}/`}
                className="inline-flex h-8 items-center gap-1 rounded-md border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 transition hover:border-[#e62a38]/40 hover:bg-rose-50 hover:text-[#e62a38]"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Prev: {prevCategory.name}
              </Link>
            ) : (
              <span />
            )}
            {nextCategory ? (
              <Link
                href={`/nirf-rankings/${year}/${nextCategory.slug}/`}
                className="inline-flex h-8 items-center gap-1 rounded-md border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 transition hover:border-[#e62a38]/40 hover:bg-rose-50 hover:text-[#e62a38]"
              >
                Next: {nextCategory.name}
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <span />
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const year = String(params?.year || "");
  const category = String(params?.category || "");

  if (!VALID_YEARS.includes(year)) {
    return {
      redirect: {
        destination: "/nirf-rankings/2025/",
        permanent: false,
      },
    };
  }

  const meta = getCategoryMeta(year, category);
  const yearData = rankingData[year] || {};
  const rows = yearData[category];
  const categories = yearCategories[year] || yearCategories[Number(year)] || [];
  const currentIndex = categories.findIndex((item) => item.slug === category);

  if (!meta || !Array.isArray(rows) || currentIndex < 0) {
    return { notFound: true };
  }

  const prev = categories[currentIndex - 1] || null;
  const next = categories[currentIndex + 1] || null;

  return {
    props: {
      year,
      category,
      categoryName: meta.name,
      rows,
      prevCategory: prev
        ? { name: prev.name, slug: prev.slug }
        : null,
      nextCategory: next
        ? { name: next.name, slug: next.slug }
        : null,
    },
  };
}

export default NirfCategoryPage;
