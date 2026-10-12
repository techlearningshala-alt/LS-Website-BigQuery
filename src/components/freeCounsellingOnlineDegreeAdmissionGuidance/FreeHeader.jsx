"use client";

import React from "react";
import Logo from "../custom/shared/Logo";

function scrollToForm() {
  if (typeof document === "undefined") return;
  document.getElementById("counselling-form")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

const FreeHeader = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-[#efeae3] bg-[#fdf9f3]/95 backdrop-blur-md">
      <div className="container flex items-center justify-between gap-3 py-3 md:py-3.5">
        <Logo />

        <button
          type="button"
          onClick={scrollToForm}
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary px-3.5 py-2 text-xs font-bold text-white shadow-[0_6px_18px_rgba(178,51,48,0.2)] transition-transform hover:scale-[1.02] active:scale-[0.99] sm:px-4 sm:text-sm"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/70 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-white" />
          </span>
          <span className="whitespace-nowrap">
            Admissions Open
            <span className="mx-1.5 opacity-70">·</span>
            प्रवेश शुरू
          </span>
        </button>
      </div>
    </header>
  );
};

export default FreeHeader;
