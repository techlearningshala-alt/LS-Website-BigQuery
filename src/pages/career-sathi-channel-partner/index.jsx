import Hero from "@/components/careerSathiChannelPartner/Hero";
import Head from "next/head";
import React from "react";
import About from "@/components/careerSathiChannelPartner/About";
import Benefits from "@/components/careerSathiChannelPartner/Benefits";
import HowWorks from "@/components/careerSathiChannelPartner/HowWorks";
import WhoBecomeCareerSathi from "@/components/careerSathiChannelPartner/WhoBecomeCareerSathi";
import SalesGuidance from "@/components/careerSathiChannelPartner/SalesGuidance";
import Faq from "@/components/careerSathiChannelPartner/Faq";
import Trust from "@/components/careerSathiChannelPartner/Trust";
import Cta from "@/components/careerSathiChannelPartner/Cta";
import Header from "@/components/careerSathiChannelPartner/Header";
import PartnerFooter from "@/components/careerSathiChannelPartner/PartnerFooter";

const CareerSathiChannelPartner = () => {
  return (
    <>
      <Head>
        <title>Career Sathi Channel Partner Program | LearningShala</title>
        <meta
          key="description"
          name="description"
          content="Join LearningShala as a Career Sathi partner. Guide students to online degree programs and earn with zero investment."
        />
        <link
          rel="canonical"
          href="https://learningshala.com/career-sathi-channel-partner/"
        />
      </Head>
      <Header />
      <Hero />
      <About />
      <Benefits />
      <HowWorks />
      <WhoBecomeCareerSathi />
      <SalesGuidance />
      <Faq />
      <Trust />
      <Cta />
      <PartnerFooter />
    </>
  );
};

export default CareerSathiChannelPartner;
