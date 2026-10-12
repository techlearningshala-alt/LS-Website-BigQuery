import ToolsBanner1 from "@/components/tools/ToolsBanner1";
import AllTools from "@/components/tools/AllTools";
import Head from "next/head";
import React, { useState } from "react";

const Tools = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Head>
        <title>
          Free Online Calculators - Academic & Financial Tools | LearningShala
        </title>
        <meta
          name="description"
          content="Use free online calculators for percentage, CGPA, SGPA, attendance, ROI and more. Instant results with no sign up."
        />
      </Head>

      <ToolsBanner1 search={search} onSearchChange={setSearch} />
      <AllTools search={search} onSearchChange={setSearch} />
    </div>
  );
};

export default Tools;
