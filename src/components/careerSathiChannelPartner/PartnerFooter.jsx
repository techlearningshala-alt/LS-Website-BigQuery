import Logo from "@/components/custom/shared/Logo";
import Link from "next/link";
import React from "react";

const FOOTER_LINKS = [
  { label: "LearningShala ke baare mein", href: "/about" },
  { label: "Terms & Conditions", href: "/term-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Helpline", href: "/contact-us" },
];

const PartnerFooter = () => {
  return (
    <footer className="border-t border-[#ece7df] bg-white">
      <div className="container flex flex-col gap-5 py-6 md:gap-6 md:py-7 lg:flex-row lg:items-center lg:justify-between">
        <Logo />

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:justify-center">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#6b7280] transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="shrink-0 text-sm text-[#6b7280] lg:text-right">
          ©{" "}
          <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
          LearningShala
        </p>
      </div>
    </footer>
  );
};

export default PartnerFooter;
