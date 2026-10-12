"use client";

import React from "react";
import { ArrowRight, Check, Lock } from "lucide-react";


function scrollToForm() {
  if (typeof document === "undefined") return;
  document.getElementById("counselling-form")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

const Cta = () => {
  return (
    <section className="bg-[#faf7f2] py-14 md:py-20">
      <div className="container">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-[#1a1a1a]/80 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1a1a1a]">
            15 Seconds
          </span>

          <h2
            className={` mt-5 text-[1.85rem] leading-tight text-[#1a1a1a] sm:text-[2.25rem] md:text-[2.5rem] font-bold`}
          >
            Bas 15 seconds - aur aapki{" "}
            <em className="italic text-primary">free call</em> book ho jayegi
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#666] sm:text-[15px]">
            Ek expert counsellor aapko call karega. Bina kisi pressure ke - sirf
            clarity.
          </p>

          <ul className="mt-6 space-y-2.5">
            <li className="inline-flex items-center justify-center gap-2 text-sm text-[#666]">
              <Check className="size-3.5 shrink-0 text-primary" strokeWidth={3} />
              100% free · No obligation
            </li>
            <li className="flex items-center justify-center gap-2 text-sm text-[#666]">
              <Check className="size-3.5 shrink-0 text-primary" strokeWidth={3} />
              Aapki details 100% safe. Koi spam nahi.
              <Lock className="size-3.5 shrink-0 text-[#8a8580]" />
            </li>
          </ul>

          <button
            type="button"
            onClick={scrollToForm}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_28px_rgba(177,57,47,0.28)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            Get My Free Guidance Call
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cta;
