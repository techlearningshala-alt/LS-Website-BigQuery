import React from "react";
import { Building2, GitCompareArrows, Scale } from "lucide-react";

const FEATURES = [
  {
    icon: Building2,
    text: "100+ UGC-approved universities",
  },
  {
    icon: GitCompareArrows,
    text: "40+ factors par comparison",
  },
  {
    icon: Scale,
    text: "Unbiased guidance",
  },
];

const KeyFeature = () => {
  return (
    <section className="border-y border-[#efeae3] bg-white">
      <div className="container py-5 md:py-6">
        <ul className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap sm:gap-x-0 sm:gap-y-3">
          {FEATURES.map(({ icon: Icon, text }, index) => (
            <li key={text} className="flex items-center">
              {index > 0 ? (
                <span
                  className="mx-4 hidden text-[#cfc8be] sm:inline md:mx-6"
                  aria-hidden
                >
                  ·
                </span>
              ) : null}

              <span className="inline-flex items-center gap-2.5 text-sm font-semibold text-[#2d2a26] md:text-[15px]">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#fdf9f3] text-primary ring-1 ring-[#efeae3]">
                  <Icon className="size-3.5" strokeWidth={2.25} />
                </span>
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default KeyFeature;
