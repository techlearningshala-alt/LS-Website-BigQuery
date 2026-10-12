"use client";

import React from "react";
import Image from "next/image";
import { Home } from "lucide-react";
import { useLeadForm } from "@/context/LeadFormContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Header = ({
  title = "NAAC Accredited Universities in 2026",
  description = "NAAC is an autonomous body that provides ratings from A++ to D by institutes in teaching, research, infrastructure, student support, and governance areas.",
  breadcrumbLabel = "NAAC Approved University",
  logoAlt = "NAAC - National Assessment and Accreditation Council",
}) => {
  const { showLeadForm } = useLeadForm();

  const handleGetHelp = () => {
    showLeadForm("get help from naac accredited universities page");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fffafa] via-white to-[#f8f4f2]">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-rose-100/40 blur-3xl"
        aria-hidden
      />

      <div className="container relative mx-auto px-4 py-8 md:py-12 lg:py-14">
        <div className="grid items-center gap-5 sm:gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left */}
          <div className="lg:col-span-9">
            <Breadcrumb className="mb-4">
              <BreadcrumbList className="text-xs text-[#94a3b8] sm:text-sm">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className="inline-flex items-center gap-1.5 text-[#94a3b8] hover:text-primary"
                  >
                    <Home className="size-3.5" />
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[#cbd5e1]" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-medium text-[#64748b]">
                    {breadcrumbLabel}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-[#0f172a] sm:text-4xl md:text-[2.5rem]">
              {title}
            </h1>

            <p className="mb-7 max-w-xl text-sm leading-relaxed text-[#64748b] sm:text-base md:text-[17px]">
              {description}
            </p>

            <button
              type="button"
              onClick={handleGetHelp}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-[#f5b5b8] bg-white px-6 text-sm font-bold text-[#e62a38] shadow-sm transition hover:bg-[#fff5f5] active:scale-[0.98]"
            >
              Get help
            </button>
          </div>

          {/* Right */}
          <div className="lg:col-span-3">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl border border-[#f1e8e8] bg-white p-2.5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] sm:h-auto sm:w-full sm:max-w-[200px] sm:aspect-[4/3] sm:rounded-[28px] sm:p-6 sm:shadow-[0_20px_50px_rgba(15,23,42,0.08)] md:max-w-[240px] md:p-8 lg:max-w-none lg:p-10">
              <Image
                src={"/images/approvals/naac-img.webp"}
                alt={logoAlt}
                width={320}
                height={320}
                className="h-full w-full max-h-[72px] object-contain sm:max-h-none sm:max-w-[180px] md:max-w-[220px] lg:max-w-[260px]"
                sizes="(max-width: 640px) 96px, (max-width: 1024px) 200px, 260px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
