import React from "react";
import Head from "next/head";
import Header from "@/components/naacAccreditedUniversities/Header";
import NaacData from "@/components/naacAccreditedUniversities/NaacData";
import WhatIs from "@/components/naacAccreditedUniversities/WhatIs";
import Faq from "@/components/naacAccreditedUniversities/Faq";

const NaacAccreditedUniversitiesInIndia = () => {
  const title = "NAAC Accredited Universities in 2026";
  const description =
    "NAAC is an autonomous body that provides ratings from A++ to D by institutes in teaching, research, infrastructure, student support, and governance areas.";

  return (
    <div>
      <Head>
        <title>{title} | LearningShala</title>
        <meta key="description" name="description" content={description} />
        <link
          rel="canonical"
          href="https://learningshala.com/naac-accredited-universities-in-india/"
        />
      </Head>

      <Header
        title={title}
        description={description}
        breadcrumbLabel="NAAC Approved University"
        logoSrc="/images/approvals/naac.svg"
      />
      <NaacData />
      <WhatIs />
      <Faq />
    </div>
  );
};

export default NaacAccreditedUniversitiesInIndia;
