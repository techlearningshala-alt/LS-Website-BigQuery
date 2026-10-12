import KYCHeader from "@/components/careerSathiChannelPartner/KYCHeader";
import PartnerFooter from "@/components/careerSathiChannelPartner/PartnerFooter";
import PartnerLeadForm from "@/components/careerSathiChannelPartner/PartnerLeadForm";
import Head from "next/head";
import React from "react";

const CareerSathiChannelPartnerKYCRegistrationForm = () => {
  return (
    <>
      <Head>
        <title>Career Sathi KYC Registration Form | LearningShala</title>
        <meta
          key="description"
          name="description"
          content="Complete your Career Sathi partner onboarding and basic KYC registration with LearningShala."
        />
        <link
          rel="canonical"
          href="https://learningshala.com/Career-Sathi-Channel-Partner-KYC-Registration-Form/"
        />
      </Head>
      <KYCHeader />
      <section className="relative overflow-hidden bg-[#f6f3ee] py-10 md:py-14 lg:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,50,38,0.08),transparent_28%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.06),transparent_24%)]" />

        <div className="container relative max-w-5xl">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <span className="inline-flex rounded-full border border-primary/15 bg-white/80 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary shadow-sm backdrop-blur-sm">
              Premium Partner Onboarding
            </span>
            <h1 className="mt-4 text-[2rem] font-bold tracking-tight text-[#1a1a1a] sm:text-[2.4rem]">
            Career Sathi - Basic KYC Form
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#6b7280] sm:text-base">
              Secure, step-by-step KYC form. Bas 5 minutes mein apni details submit
              kariye aur official partner onboarding shuru kariye.
            </p>
          </div>

          <PartnerLeadForm />
        </div>
      </section>
      <PartnerFooter />
    </>
  );
};

export default CareerSathiChannelPartnerKYCRegistrationForm;
