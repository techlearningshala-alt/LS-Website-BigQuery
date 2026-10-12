"use client";

import React from "react";
import { ArrowRight, Check, X } from "lucide-react";

const COMPARISON_ROWS = [
  {
    feature: "Live + recorded online classes",
    featured: "yes",
    ignou: "no",
    dusol: "no",
  },
  {
    feature: "Industry-ready, updated syllabus",
    featured: "yes",
    ignou: "limited",
    dusol: "limited",
  },
  {
    feature: "Placement aur career support",
    featured: "yes",
    ignou: "no",
    dusol: "no",
  },
  {
    feature: "Fast, paperless admission",
    featured: "yes",
    ignou: "limited",
    dusol: "no",
  },
  {
    feature: "UGC-DEB / NAAC A+ manyata",
    featured: "yes",
    ignou: "yes",
    dusol: "yes",
  },
];

function scrollToForm() {
  if (typeof document === "undefined") return;
  document.getElementById("counselling-form")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function StatusCell({ value }) {
  if (value === "yes") {
    return (
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <Check className="size-4" strokeWidth={2.75} />
      </span>
    );
  }

  if (value === "no") {
    return (
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-red-50 text-red-500">
        <X className="size-4" strokeWidth={2.75} />
      </span>
    );
  }

  return (
    <span className="text-sm font-semibold text-amber-600">Limited</span>
  );
}

const IgnouVsDusol = () => {
  return (
    <section className="bg-[#fdf9f3] py-12 md:py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            className={` text-[2rem] leading-tight text-[#1a1a1a] sm:text-[2.35rem] md:text-[2.6rem] font-bold`}
          >
            IGNOU aur DU SOL se{" "}
            <em className="not-italic text-primary">kahin behtar.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#6b6b6b] sm:text-[15px]">
            Smart, fast aur poori tarah convenient - ghar baithe padho aur asli career
            banao. Purane distance route ko kaho bye-bye.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-[#e8e2d9] bg-white shadow-[0_8px_30px_rgba(26,32,44,0.05)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#efeae3]">
                  <th className="w-[34%] px-4 py-4 text-xs font-semibold uppercase tracking-wide text-[#9a948c] sm:px-5 sm:text-sm">
                    &nbsp;
                  </th>
                  <th className="w-[22%] bg-[#fff5f4] px-3 py-0 sm:px-4">
                    <div className="rounded-t-xl bg-primary px-3 py-3 text-center">
                      <p className="text-[11px] font-bold uppercase leading-tight tracking-wide text-white sm:text-xs">
                        Top Private
                        <br />
                        University
                      </p>
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/80">
                        Online
                      </p>
                    </div>
                  </th>
                  <th className="w-[22%] px-3 py-4 text-center sm:px-4">
                    <p className="text-[11px] font-bold uppercase leading-tight text-[#6b6b6b] sm:text-xs">
                      IGNOU
                    </p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#9a948c]">
                      Distance
                    </p>
                  </th>
                  <th className="w-[22%] px-3 py-4 text-center sm:px-4">
                    <p className="text-[11px] font-bold uppercase leading-tight text-[#6b6b6b] sm:text-xs">
                      DU SOL
                    </p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#9a948c]">
                      Distance
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={
                      index < COMPARISON_ROWS.length - 1
                        ? "border-b border-[#f0ebe4]"
                        : undefined
                    }
                  >
                    <td className="px-4 py-4 text-sm font-medium text-[#2d2a26] sm:px-5 sm:text-[15px]">
                      {row.feature}
                    </td>
                    <td className="bg-[#fff5f4] px-3 py-4 text-center sm:px-4">
                      <StatusCell value={row.featured} />
                    </td>
                    <td className="px-3 py-4 text-center sm:px-4">
                      <StatusCell value={row.ignou} />
                    </td>
                    <td className="px-3 py-4 text-center sm:px-4">
                      <StatusCell value={row.dusol} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-5xl flex-col items-start justify-between gap-5 rounded-2xl bg-primary px-6 py-6 sm:flex-row sm:items-center sm:px-8 sm:py-7">
          <div className="max-w-xl">
            <h3
              className={` text-2xl font-bold leading-tight text-white sm:text-[1.75rem]`}
            >
              Abhi free guidance call book karein
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/85 sm:text-[15px]">
              Expert counsellor se baat karke apne liye best university choose karein.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-primary shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.99] sm:px-6 sm:text-[15px]"
          >
            Book My Free Session
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default IgnouVsDusol;
