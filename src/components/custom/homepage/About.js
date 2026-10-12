import React from "react";
import MainHeading from "../shared/MainHeading";
import Image from "next/image";

const About = () => {
  return (
    <div className="container sec_mb">
      <MainHeading
        title="What Makes LearningShala Different?"
        className="text-center !mb-2"
      />
      <p className="text-center mb-8">
      Because our priority isn&apos;t selling courses, it&apos;s helping you make the right career choice!

      </p>
      <div className="grid grid-cols-12 md:gap-8 mx-auto">
        <div className="col-span-12  md:col-span-4 mb-6 md:mb-0">
          <div className="bg-primary-foreground rounded-4xl p-8 h-full">
            <p className="text-primary font-bold mb-4 text-xl">
              Guidance that actually gets you & your dreams
            </p>
            <p className="mb-4">
              Forget generic advice. Our mentors are industry insiders who offer
              candid advice and personalised guidance. They’ve navigated the
              paths you’re exploring and are here to champion your ambition, not
              just give you a brochure.
            </p>
            <Image
              src="/images/Guidance.webp"
              className="rounded-2xl"
              alt="generic"
              width={400}
              height={200}
            />
          </div>
        </div>
        <div className="col-span-12  md:col-span-4 mb-6 md:mb-0">
          <div className="bg-[#f4f4f4] rounded-4xl p-8 h-full">
            <p className="text-black font-bold mb-4 text-xl">
              Find Your Perfect Degree with Data, Not Guesses
            </p>
            <p className="mb-4">
              Don&apos;t just choose a popular name; choose the right program &
              university for you. Our platform lets you compare 100+
              universities across 40+ critical factors from faculty ratings and
              placement stats to student support and real-world ROI.
            </p>

            <Image
              src="/images/Degree.webp"
              className="rounded-2xl"
              alt="Perfect Degree"
              width={400}
              height={200}
            />
          </div>
        </div>
        <div className="col-span-12  md:col-span-4 mb-6 md:mb-0">
          <div className="bg-[#f4f4f4] rounded-4xl p-8 h-full">
            <p className="text-black font-bold mb-4 text-xl">
              From Application to Graduation, We&apos;ve Got Your Back
            </p>
            <p className="mb-4">
              Your journey with us doesn&apos;t end at admission. It starts with
              your admission. We handle the entire process, from seamless
              application submission to fee payment, and provide dedicated
              support throughout your course.
            </p>
            <Image
              src="/images/Application.webp"
              className="rounded-2xl"
              alt="Application to Graduation"
              width={400}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
