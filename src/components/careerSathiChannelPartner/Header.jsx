"use client";

import { ArrowRight } from "lucide-react";
import React from "react";
import Logo from "../custom/shared/Logo";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Kya Hai", id: "about" },
  { label: "Kaise Kaam Karta Hai", id: "how-it-works" },
  { label: "FAQ", id: "faq" },
];

function scrollToSection(id) {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-[#ece7df] bg-white/95 backdrop-blur-md">
      <div className="container flex items-center justify-between gap-4 py-3.5 md:py-4">
        <Logo />

        <div className="flex items-center gap-6 lg:gap-8">
          <nav className="hidden items-center gap-6 md:flex lg:gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-[#4a4a4a] transition-colors hover:text-primary"
              >
                {link.label}
              </button>
            ))}
          </nav>

        <Link href="/career-sathi-channel-partner-kyc-registration-form">
        <button
            type="button"
            
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-[0_6px_18px_rgba(168,50,38,0.22)] transition-transform hover:scale-[1.02] active:scale-[0.99] sm:px-5 sm:text-sm"
          >
            <span className="whitespace-nowrap">Career Sathi Banein</span>
            <ArrowRight className="size-4 shrink-0" strokeWidth={2.5} />
          </button></Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
