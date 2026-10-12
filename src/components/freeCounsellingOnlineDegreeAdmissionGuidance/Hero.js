import { ArrowRight, Check } from "lucide-react";
import { Instrument_Serif } from "next/font/google";


const TRUST_ITEMS = ["100% free", "No obligation", "10-min personal call"];

function scrollToForm() {
  if (typeof document === "undefined") return;
  document.getElementById("counselling-form")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

const FreeCounsellingHero = () => {
  return (
    <div className="flex flex-col justify-center">
      <p className="text-sm text-[#8b8680]">अब सोच बदलो</p>

      <h1
        className={` mt-3 max-w-xl text-[2.15rem] leading-[1.18] tracking-tight text-[#1a1a1a] sm:text-[2.6rem] lg:text-[2.85rem] font-bold`}
      >
        <span className="text-primary">Top Private University</span>
        {" "}
        se Online Degree - apni{" "}
        <span className="text-primary">free 1:1 guidance</span>
        {" "}
        call abhi book karein
      </h1>

      <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#4a4a4a] sm:text-base">
        Ek expert counsellor ke saath baat karein. Apne liye best university,
        course aur fees samjhein - bina kisi pressure ke, bilkul FREE.
      </p>

      <div className="mt-7 w-fit rounded-2xl border border-[#e8e2d9] bg-white px-5 py-4 shadow-[0_4px_18px_rgba(26,32,44,0.04)]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9a948c]">
          Emi se shuru
        </p>
        <p className={` mt-1 text-[2rem] leading-none text-[#1a1a1a]`}>
          ₹2,500
          <span className="ml-1 text-base font-sans text-[#8b8680]">/month</span>
        </p>
        <p className="mt-2 text-sm text-[#8b8680]">Degree ab budget mein.</p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={scrollToForm}
          className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_28px_rgba(168,50,38,0.28)] transition-transform hover:scale-[1.02] active:scale-[0.99] text-nowrap"
        >
          Book My Free Session
          <ArrowRight className="size-4" strokeWidth={2.5} />
        </button>

        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {TRUST_ITEMS.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-1.5 text-sm text-[#4a4a4a]"
            >
              <Check className="size-3.5 shrink-0 text-[#a83226]" strokeWidth={3} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FreeCounsellingHero;
