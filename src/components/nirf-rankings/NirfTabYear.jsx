"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainHeading from "../custom/shared/MainHeading";
import { YEARS, yearCategories } from "./yearCategories";

const CategoryGrid = ({ categories, year }) => {
  if (!categories?.length) {
    return (
      <p className="rounded-md border border-dashed border-gray-200 bg-gray-50 px-5 py-10 text-center text-sm text-gray-500">
        NIRF rankings for {year} coming soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/nirf-rankings/${year}/${category.slug}/`}
          className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm transition hover:border-primary/30 hover:shadow-md"
        >
          <Image
            src={category.logo}
            alt={category.name}
            width={100}
            height={100}
            className="h-14 w-14"
          />
          <span className="text-sm font-semibold leading-snug text-gray-800">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

const NirfTabYear = ({ activeYear = "2025" }) => {
  const router = useRouter();
  const yearValue = String(activeYear);

  const handleYearChange = (year) => {
    if (year === yearValue) return;
    router.push(`/nirf-rankings/${year}/`, undefined, { scroll: false });
  };

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <Tabs
        value={yearValue}
        onValueChange={handleYearChange}
        className="gap-4"
      >
        <TabsList className="h-auto w-full max-w-full justify-start gap-1 overflow-x-auto bg-rose-50/80 p-1 whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] sm:w-fit [&::-webkit-scrollbar]:hidden">
          {YEARS.map((year) => (
            <TabsTrigger
              key={year}
              value={String(year)}
              className="shrink-0 rounded-md px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              {year}
            </TabsTrigger>
          ))}
        </TabsList>

        {YEARS.map((year) => (
          <TabsContent key={year} value={String(year)}>
            <CategoryGrid
              categories={yearCategories[year]}
              year={year}
            />
          </TabsContent>
        ))}
      </Tabs>

      <section className="mt-6 md:mt-10">
      <div className="space-y-5">

        {/* What is NIRF */}
        <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 mt-4">
            <MainHeading title="What is NIRF?"/>

            <p className="mb-2 md:mb-4 leading-relaxed text-gray-700 text-sm md:text-md lg:text-lg">
                NIRF stands for the National Institutional Ranking Framework
                (NIRF). This ranking framework was introduced by the Ministry of
                Education (formerly the Ministry of Human Resource Development,
                MHRD) of the Government of India on 29th September 2015.
            </p>

            <p className="mb-2 md:mb-4 leading-relaxed text-gray-700 text-sm md:text-md lg:text-lg">
                It helps students, parents, and policymakers compare institutions
                and universities based on various data-driven and fair metrics. It
                includes five core parameters: Teaching, Learning & Resources,
                Research and Professional Practice, Graduation Outcomes, Outreach &
                Inclusivity, and Perception.
            </p>

            <p className="leading-relaxed text-gray-700 text-sm md:text-md lg:text-lg">
                The institutes are ranked in 17 different categories, like Overall,
                University, Management, Open, and Engineering.
            </p>
        </div>

        {/* Cycle and Validity */}
        <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 mt-4">
            <MainHeading title=" What is the Cycle and Validity of NIRF Ranking?"/>
          
            <p className="mb-4 leading-relaxed text-gray-700 text-sm md:text-md lg:text-lg">
                The MoE releases the NIRF ranking list every year based on
                different categories. It is a dynamic certification and is measured
                based on year-on-year performance, and the ranking is valid for the
                respective year only.
            </p>

            <h3 className="mb-4 text-lg md:text-xl font-bold text-gray-900">
                NIRF Cycle
            </h3>

            <p className="mb-4 leading-relaxed text-gray-700 text-sm md:text-md lg:text-lg">
                It follows a recurring annual cycle and follows these steps:
            </p>

            <div className="space-y-5">

                {/* Registration */}
                <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 md:p-5">
                <h4 className="mb-2 text-md md:text-lg font-semibold text-gray-900">
                    Registration & Data Submission:
                </h4>

                <p className="mb-2 leading-relaxed text-gray-700 text-sm md:text-md lg:text-lg">
                    HEIs register themselves and submit institutional data in the
                    NIRF Data Capturing System.
                </p>

                <p className="mb-3 leading-relaxed text-gray-700 text-sm md:text-md lg:text-lg">
                    Its window generally opens in January, and the submission
                    deadline is extended to the last week of March.
                </p>

                <p className="font-semibold text-gray-900 text-sm md:text-lg">
                    Window: Jan-March
                </p>
                </div>

                {/* Verification */}
                <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 md:p-5">
                <h4 className="mb-2 text-md md:text-lg font-semibold text-gray-900">
                    Verification & Audit:
                </h4>

                <p className="mb-2 leading-relaxed text-gray-700 text-sm md:text-md lg:text-lg">
                    The National Board of Accreditation (NBA) and the Ministry of
                    Education (MoE) conduct extensive cross-verification,
                    evaluation, data audit stages, auditing publications, checking
                    & referencing citations, research, and setting parameter rules.
                </p>

                <p className="mb-3 leading-relaxed text-gray-700 text-sm md:text-md lg:text-lg">
                    It generally follows a cycle of 3-4 months, from April to the
                    last week of September.
                </p>

                <p className="font-semibold text-gray-900 text-sm md:text-lg">
                    Window: April-September
                </p>
                </div>

                {/* Rank Publication */}
                <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 md:p-5">
                <h4 className="mb-2 text-md md:text-lg font-semibold text-gray-900">
                    Rank Publication:
                </h4>

                <p className="mb-3 leading-relaxed text-gray-700 text-sm md:text-md lg:text-lg">
                    The MoE releases the final list of institutions for all 17
                    categories. This list is generally published in the last week
                    of September or October.
                </p>

                <p className="font-semibold text-gray-900 text-sm md:text-lg">
                    Window: Last Week of September or October
                </p>
                </div>

            </div>

            {/* NIRF Validity */}
            <div className="mt-6">
                <h3 className="mb-3 text-lg md:text-xl font-bold text-gray-900">
                NIRF Validity
                </h3>

                <p className="mb-3 leading-relaxed text-gray-700 text-sm md:text-md lg:text-lg">
                The validity of the NIRF ranking is only valid for the respective
                year until the next final list is published.
                </p>

                <p className="leading-relaxed text-gray-700 text-sm md:text-md lg:text-lg">
                Institutes need to submit new data and undergo fresh extensive
                audits on an annual basis. Additionally, institutions must publish
                archived raw data submissions and keep them visible for a window
                of three years for transparency and audit trail.
                </p>
            </div>
        </div>

        {/* How NIRF Rank Universities */}
        <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 mt-4">
            <MainHeading title="How does NIRF Rank Universities and Institutions?"/>

            <p className="mb-5 leading-relaxed text-gray-700 text-sm md:text-md lg:text-lg">
                The NIRF ranks universities based on five strict key parameters
                and a total of 100 marks. Each parameter is assigned a specific
                weightage to assess the institution's overall academic performance,
                research strength, student outcomes, inclusivity, and reputation.
            </p>

          <div className="overflow-x-auto ">
            <table className="w-full min-w-[800px] border-collapse">
                <thead>
                    <tr className="bg-rose-50">
                    <th className="border border-rose-100 px-4 py-3 text-left font-semibold text-gray-900">
                        Ranking Parameter
                    </th>
                    <th className="border border-rose-100 px-4 py-3 text-left font-semibold text-gray-900">
                        Weightage
                    </th>
                    <th className="border border-rose-100 px-4 py-3 text-left font-semibold text-gray-900">
                        What It Measures
                    </th>
                    </tr>
                </thead>

                <tbody className="bg-gray-50/50">
                    {[
                    {
                        parameter: "Teaching, Learning & Resources (TLR)",
                        weightage: "30%",
                        measures:
                        "Faculty strength, student-faculty ratio, infrastructure, and learning resources",
                    },
                    {
                        parameter: "Research & Professional Practice (RP)",
                        weightage: "30%",
                        measures:
                        "Research publications, patents, projects, and professional practices",
                    },
                    {
                        parameter: "Graduation Outcomes (GO)",
                        weightage: "20%",
                        measures:
                        "Graduation rates, academic performance, placements, and higher studies",
                    },
                    {
                        parameter: "Outreach & Inclusivity (OI)",
                        weightage: "10%",
                        measures:
                        "Diversity, accessibility, scholarships, and representation of different student groups",
                    },
                    {
                        parameter: "Perception (PR)",
                        weightage: "10%",
                        measures:
                        "Reputation of the institution among academics, employers, and other stakeholders",
                    },
                    ].map((row, index) => (
                        <tr key={index}>
                            <td className="border border-rose-100 px-4 py-3 font-semibold text-gray-900">
                            {row.parameter}
                            </td>

                            <td className="border border-rose-100 px-4 py-3 text-gray-700">
                            {row.weightage}
                            </td>

                            <td className="border border-rose-100 px-4 py-3 text-gray-700">
                            {row.measures}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </div>

        {/* Different Categories */}
        <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 mt-4">
            <MainHeading title="Different Categories of NIRF Ranking?"/>

            <ol className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {[
                "Overall",
                "Universities",
                "Colleges",
                "Research Institutions",
                "Engineering",
                "Management",
                "Pharmacy",
                "Medical",
                "Dental",
                "Law",
                "Architecture and Planning",
                "Agriculture and Allied Sectors",
                "Innovation",
                "Open University",
                "Skill University",
                "State Public University",
                "Sustainable Development Goals",
                ].map((item, index) => (
                <li
                    key={item}
                    className="flex items-start gap-2 text-gray-700 bg-gray-50/50 border border-gray-200 px-4 py-2 rounded-xl text-sm md:text-lg"
                >
                    <span>
                    {index + 1}.
                    </span>

                    <span>{item}</span>
                </li>
                ))}
            </ol>
        </div>

        {/* Eligibility */}
        <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 mt-4">
            <MainHeading title="What is the eligibility for HEIs for NIRF?"/>

            <p className="mb-5 leading-relaxed text-gray-700 text-sm md:text-md lg:text-lg">
                To submit their institutional data and get published in the final
                list, HEIs must pass these strict eligibility criteria:
            </p>

            <h3 className="mb-3 text-md md:text-lg font-semibold text-gray-800">
                Overall Category
            </h3>

            <ul className="space-y-3 mb-6">
                {[
                "Must have 1000 or more students enrolled in approved UG and PG degrees in the current year.",
                "Have at least 3 graduated batches before the current year",
                "Offers full-time programs that meet minimum duration requirements as per UGC norms.",
                ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                    <img
                    src="https://learningshala.com/images/icons/check-mark.webp"
                    alt="Check"
                    width={30}
                    height={30}
                    className="mt-0.5 h-[30px] w-[30px] shrink-0"
                    />

                    <span className="text-gray-700 text-sm md:text-md lg:text-lg">
                    {item}
                    </span>
                </li>
                ))}
            </ul>

            <h3 className="mb-3 text-md md:text-lg font-semibold text-gray-800">
                Discipline-specific Rankings
            </h3>

            <ul className="space-y-3">
                {[
                "Must meet participation criteria set defined by NIRF",
                "Offer programs in the respective discipline",
                "Submit tailored data to that selected category",
                ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                    <img
                    src="https://learningshala.com/images/icons/check-mark.webp"
                    alt="Check"
                    width={30}
                    height={30}
                    className="mt-0.5 h-[30px] w-[30px] shrink-0"
                    />

                    <span className="text-gray-700 text-sm md:text-md lg:text-lg">
                    {item}
                    </span>
                </li>
                ))}
            </ul>
        </div>

        {/* What does NIRF Ranking Say */}
        <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 mt-4">
            <MainHeading title="What does NIRF Ranking Say about Univerity/HEIs"/>

            <ul className="grid gap-3">
                {[
                <>
                    <strong>Academic Quality:</strong> Indicates an institution’s
                    teaching, learning resources, and academic environment.
                </>,
                <>
                    <strong>Research Strength:</strong> Reflects stronger
                    performance in research, publications, patents, and
                    professional practices.
                </>,
                <>
                    <strong>Student Outcomes:</strong> NIRF considers graduation
                    rates, placements, higher education, and other student
                    outcomes.
                </>,
                <>
                    <strong>Inclusivity:</strong> Highlights an institution’s
                    efforts toward diversity, accessibility, and inclusive
                    education.
                </>,
                <>
                    <strong>Overall reputation:</strong> It also considers the
                    perception of an institution among academics, employers, and
                    other stakeholders.
                </>,
                ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                    <img
                    src="https://learningshala.com/images/icons/check-mark.webp"
                    alt="Check"
                    width={30}
                    height={30}
                    className="mt-0.5 h-[30px] w-[30px] shrink-0"
                    />

                    <span className="text-gray-700 text-sm md:text-md lg:text-lg">
                    {item}
                    </span>
                </li>
                ))}
            </ul>
        </div>

        {/* How to Check / Verify */}
        <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 mt-4">
            <MainHeading title="How to Check/Verify NIRF Ranking?"/>

            <ol className="space-y-3">
                {[
                <>
                    Visit the official website at{" "}
                    <a
                    href="https://www.nirfindia.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#e62a38] hover:underline"
                    >
                    www.nirfindia.org
                    </a>
                </>,
                <>
                    Click on the Ranking Menu and select the year
                </>,
                <>Select the ranking category</>,
                <>Search “Istitution/University Name”</>,
                <>
                    The institute's NIRF overall score, rank, and other details
                    will be displayed.
                </>,
                ].map((item, index) => (
                    <li
                        key={index}
                        className="flex items-start gap-3 text-gray-700 text-sm md:text-lg"
                    >
                        <span className="font-semibold text-[#e62a38] shrink-0">
                        {index + 1}.
                        </span>

                        <span>{item}</span>
                    </li>
                ))}
            </ol>

            {/* Note */}
            <div className="mt-5 rounded-2xl bg-rose-50/50 px-4 py-2">
                <p className="leading-relaxed text-gray-700 text-sm md:text-md lg:text-lg">
                    <em> <strong>Note:</strong> You can also download a PDF to get more
                        details on various parameters
                    </em>
                </p>
            </div>
        </div>
      </div>

    
    </section>


    </section>
  );
};

export default NirfTabYear;
