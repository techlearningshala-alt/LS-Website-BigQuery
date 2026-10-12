import FreeCounsellingOnlineDegreeAdmissionGuidanceForm from "@/components/freeCounsellingOnlineDegreeAdmissionGuidance/OnlineForm";
import FreeCounsellingHero from "@/components/freeCounsellingOnlineDegreeAdmissionGuidance/Hero";
import KeyFeature from "@/components/freeCounsellingOnlineDegreeAdmissionGuidance/KeyFeature";



import Head from "next/head";
import React from "react";
import OnlineForm from "@/components/freeCounsellingOnlineDegreeAdmissionGuidance/OnlineForm";
import IgnouVsDusol from "@/components/freeCounsellingOnlineDegreeAdmissionGuidance/IgnouVsDusol";
import UniversityList from "@/components/freeCounsellingOnlineDegreeAdmissionGuidance/UniversityList";
import UgPg from "@/components/freeCounsellingOnlineDegreeAdmissionGuidance/UgPg";
import Benefits from "@/components/freeCounsellingOnlineDegreeAdmissionGuidance/Benefits";
import Whyus from "@/components/freeCounsellingOnlineDegreeAdmissionGuidance/Whyus";
import Cta from "@/components/freeCounsellingOnlineDegreeAdmissionGuidance/Cta";
import FreeHeader from "@/components/freeCounsellingOnlineDegreeAdmissionGuidance/FreeHeader";

const FreeCounsellingOnlineDegreeAdmissionGuidance = () => {
  return (
    <>
      <Head>
        <title>Free Counselling for Online Degree Admission | LearningShala</title>
        <meta
          key="description"
          name="description"
          content="Get free counselling for online degree admission. Talk to verified mentors and choose the right course with LearningShala."
        />
        <link
          rel="canonical"
          href="https://learningshala.com/free-counselling-online-degree-admission-guidance/"
        />
      </Head>
      <FreeHeader />

      <section className=" bg-[#fdf9f3]">
        <div className="container py-10 md:py-14 lg:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <FreeCounsellingHero />

            <div
              id="counselling-form"
              className="mx-auto w-full scroll-mt-24 rounded-3xl border border-[#efeae3] bg-white shadow-[0_12px_40px_rgba(26,32,44,0.06)] lg:mx-0 lg:ml-auto"
            >
              <OnlineForm />
            </div>
          </div>
        </div>
      </section>
      <KeyFeature />
      <IgnouVsDusol />
      <UniversityList />
      <UgPg />
      <Benefits />
      <Whyus />
      <Cta />
    </>
  );
};

export default FreeCounsellingOnlineDegreeAdmissionGuidance;
