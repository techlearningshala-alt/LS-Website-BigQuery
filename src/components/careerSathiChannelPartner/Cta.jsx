import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

function scrollToSection(id) {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

const Cta = () => {
  return (
    <section className="bg-primary">
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[2rem] font-bold leading-[1.15] tracking-tight text-white sm:text-[2.35rem] lg:text-[2.5rem]">
            Aaj hi Career Sathi baniye
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/95 sm:text-base">
            Roz aapke paas aane wale students ko sahi raasta dikhaiye — aur apni
            kamai badhaiye. Registration bilkul free hai, aur koi obligation
            nahi.
          </p>

          <Link href="/career-sathi-channel-partner-kyc-registration-form">
              <button
                type="button"
               
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_28px_rgba(168,50,38,0.28)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                Career Sathi Banein
                <ArrowRight className="size-4" strokeWidth={2.5} />
              </button>
              </Link>
        </div>
      </div>
    </section>
  );
};

export default Cta;
