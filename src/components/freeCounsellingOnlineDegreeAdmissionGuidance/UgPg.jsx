"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const COURSE_CATEGORIES = [
  {
    title: "Undergraduate (UG)",
    tags: ["BA", "BBA", "BCA", "B.Com", "B.Sc"],
  },
  {
    title: "Postgraduate (PG)",
    tags: ["MBA", "MCA", "M.Com", "MA", "M.Sc"],
  },
];

function scrollToForm() {
  if (typeof document === "undefined") return;
  document.getElementById("counselling-form")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

const UgPg = () => {
  return (
    <section className="border-t border-[#efeae3] bg-[#fdf8f1] py-12 md:py-16">
      <div className="container">
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
            Courses
          </p>
          <h2
            className={` mt-3 text-[2rem] leading-tight text-[#1a1a1a] sm:text-[2.35rem] md:text-[2.5rem] font-bold`}
          >
            Aapka course, <span className="text-primary">aapki</span> degree
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5">
          {COURSE_CATEGORIES.map(({ title, tags }) => (
            <div
              key={title}
              className="rounded-2xl border border-[#ece7df] bg-white px-5 py-5 shadow-[0_6px_24px_rgba(26,32,44,0.04)] sm:px-6 sm:py-6 font-semibold"
            >
              <h3
                className={` text-xl text-primary sm:text-[1.35rem]`}
              >
                {title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#f5f0e8] px-3 py-1.5 text-xs font-semibold text-[#3d3a36] sm:text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-[#7a7570] sm:text-[15px]">
          Sabhi programs UGC-approved universities se - EMI{" "}
          <span className="font-bold text-[#1a1a1a]">₹2,500/month</span> se shuru.
        </p>

        <button
          type="button"
          onClick={scrollToForm}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_28px_rgba(178,51,48,0.24)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
        >
          Get My Free Guidance Call
          <ArrowRight className="size-4" strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
};

export default UgPg;
