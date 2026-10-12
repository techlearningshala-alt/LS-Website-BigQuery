"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
;

function scrollToForm() {
  if (typeof document === "undefined") return;
  document.getElementById("counselling-form")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

const Whyus = () => {
  return (
    <section className="bg-[#faf9f6] py-12 md:py-16">
      <div className="container space-y-12 md:space-y-16">
        {/* CTA banner */}
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-[#efeae3] bg-white px-6 py-6 shadow-[0_8px_30px_rgba(26,32,44,0.05)] sm:flex-row sm:items-center sm:px-8 sm:py-7">
          <div className="max-w-xl">
            <h2
              className={` text-2xl leading-tight text-[#1a1a1a] sm:text-[1.75rem] font-bold`}
            >
              Aapki free call - bas 15 seconds mein
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#7a7570] sm:text-[15px]">
              Ek expert counsellor aapko call karega. Bina kisi pressure ke.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_28px_rgba(178,51,48,0.24)] transition-transform hover:scale-[1.02] active:scale-[0.99] sm:px-6 sm:text-[15px]"
          >
            Get My Free Guidance Call
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Why us */}
        <div className="grid items-start gap-8 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
              Why Us
            </p>
            <h2
              className={` mt-3 text-[2rem] font-bold leading-tight text-[#1a1a1a] sm:text-[2.35rem]`}
            >
              Kyun <em className="italic text-primary">LearningShala</em>?
            </h2>
          </div>

          <div className="border-l-2 border-primary/70 pl-5 md:col-span-8 md:pl-8 lg:pl-10">
            <h3
              className={` text-xl leading-snug text-[#1a1a1a] sm:text-[1.45rem]`}
            >
              Hum kisi ek university ke agent nahi hain. Hum{" "}
              <em className="italic text-primary">aapki side</em> par hain.
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#7a7570] sm:text-[15px]">
              100+ UGC-approved universities ko 40+ factors par compare karke aapke
              liye sahi choice nikaalte hain — commission ke liye nahi, aapke career
              ke liye.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whyus;
