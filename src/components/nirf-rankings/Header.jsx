"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Home } from "lucide-react";
import { Syne } from "next/font/google";
import { useLeadForm } from "@/context/LeadFormContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const Header = ({
  title = "NIRF Ranking 2026 List of Universities in India",
  description = "The National Institutional Ranking Framework (NIRF) offers transparent & fair comparisons between different institutes. You can now compare HEIs based on student-teacher ratio, sustainability, and outcome-based metrics to make a data-driven decision.",
  breadcrumbLabel = "NIRF Rankings",
  breadcrumbItems,
  logoAlt = "NIRF - National Institutional Ranking Framework",
  logoSrc = "/images/approvals/nirf.webp",
}) => {
  const { showLeadForm } = useLeadForm();

  const handleGetHelp = () => {
    showLeadForm("get help from nirf rankings page");
  };

  const crumbs =
    Array.isArray(breadcrumbItems) && breadcrumbItems.length > 0
      ? breadcrumbItems
      : [{ label: breadcrumbLabel }];

  return (
    <section
      className="nirf-header relative overflow-hidden"
      style={{
        "--nirf-ink": "#0c1222",
        "--nirf-mist": "#f4f6f9",
        "--nirf-accent": "#e62a38",
        "--nirf-line": "rgba(12, 18, 34, 0.08)",
      }}
    >
      <style>{`
        .nirf-header {
          background:
            radial-gradient(ellipse 80% 60% at 100% 0%, rgba(230, 42, 56, 0.09), transparent 55%),
            radial-gradient(ellipse 50% 45% at 0% 100%, rgba(12, 18, 34, 0.05), transparent 50%),
            linear-gradient(165deg, #fafbfc 0%, var(--nirf-mist) 48%, #ffffff 100%);
        }

        .nirf-header::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--nirf-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--nirf-line) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 75% 70% at 70% 40%, black 20%, transparent 75%);
          pointer-events: none;
          opacity: 0.7;
        }

        .nirf-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(48px);
          pointer-events: none;
          animation: nirf-drift 12s ease-in-out infinite;
        }

        .nirf-orb--a {
          top: -6rem;
          right: -4rem;
          width: 18rem;
          height: 18rem;
          background: rgba(230, 42, 56, 0.12);
        }

        .nirf-orb--b {
          bottom: -5rem;
          left: 8%;
          width: 14rem;
          height: 14rem;
          background: rgba(12, 18, 34, 0.06);
          animation-delay: -4s;
          animation-direction: reverse;
        }

        .nirf-fade-up {
          animation: nirf-fade-up 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .nirf-fade-up-delay {
          animation: nirf-fade-up 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.12s both;
        }

        .nirf-fade-up-delay-2 {
          animation: nirf-fade-up 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.22s both;
        }

        .nirf-logo-stage {
          animation: nirf-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
        }

        .nirf-rank-bar {
          transform-origin: bottom;
          animation: nirf-bar-grow 1.1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .nirf-rank-bar:nth-child(1) { animation-delay: 0.25s; }
        .nirf-rank-bar:nth-child(2) { animation-delay: 0.35s; }
        .nirf-rank-bar:nth-child(3) { animation-delay: 0.45s; }
        .nirf-rank-bar:nth-child(4) { animation-delay: 0.55s; }
        .nirf-rank-bar:nth-child(5) { animation-delay: 0.65s; }

        .nirf-cta {
          position: relative;
          overflow: hidden;
        }

        .nirf-cta::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 30%,
            rgba(255, 255, 255, 0.22) 48%,
            transparent 65%
          );
          transform: translateX(-120%);
          transition: transform 0.6s ease;
        }

        .nirf-cta:hover::after {
          transform: translateX(120%);
        }

        @keyframes nirf-fade-up {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes nirf-rise {
          from {
            opacity: 0;
            transform: translateY(28px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes nirf-drift {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-18px, 14px);
          }
        }

        @keyframes nirf-bar-grow {
          from {
            transform: scaleY(0);
            opacity: 0;
          }
          to {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nirf-orb,
          .nirf-fade-up,
          .nirf-fade-up-delay,
          .nirf-fade-up-delay-2,
          .nirf-logo-stage,
          .nirf-rank-bar {
            animation: none !important;
          }
        }
      `}</style>

      <div className="nirf-orb nirf-orb--a" aria-hidden />
      <div className="nirf-orb nirf-orb--b" aria-hidden />

      <div className="container relative mx-auto px-4 py-10 md:py-14 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7 xl:col-span-8">
            <Breadcrumb className="nirf-fade-up mb-5">
              <BreadcrumbList className="flex-wrap text-xs text-slate-400 sm:text-sm">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className="inline-flex items-center gap-1.5 text-slate-400 transition-colors hover:text-(--nirf-accent)"
                  >
                    <Home className="size-3.5" />
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {crumbs.map((crumb, index) => {
                  const isLast = index === crumbs.length - 1;
                  return (
                    <React.Fragment key={`${crumb.label}-${index}`}>
                      <BreadcrumbSeparator className="text-slate-300" />
                      <BreadcrumbItem>
                        {!isLast && crumb.href ? (
                          <BreadcrumbLink
                            href={crumb.href}
                            className="text-slate-400 transition-colors hover:text-(--nirf-accent)"
                          >
                            {crumb.label}
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage className="font-medium text-slate-500">
                            {crumb.label}
                          </BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>

            <p
              className={`${syne.className} nirf-fade-up mb-3 text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-(--nirf-ink)`}
            >
              NIRF
              <span className="text-(--nirf-accent)">.</span>
            </p>

            <h1
              className={`${syne.className} nirf-fade-up-delay mb-4 max-w-2xl text-2xl font-bold leading-snug tracking-tight text-(--nirf-ink) sm:text-3xl md:text-[2.15rem]`}
            >
              {title}
            </h1>

            <p className="nirf-fade-up-delay mb-8 text-sm leading-relaxed text-slate-500 sm:text-[15px]">
              {description}
            </p>

            <div className="nirf-fade-up-delay-2">
              <button
                type="button"
                onClick={handleGetHelp}
                className="nirf-cta inline-flex h-11 items-center gap-2 rounded-xl bg-(--nirf-accent) px-6 text-sm font-bold text-white transition hover:bg-[#d12532] active:scale-[0.98]"
              >
                Get help
                <ArrowUpRight className="size-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="nirf-logo-stage relative lg:col-span-5 xl:col-span-4">
            <div
              className="pointer-events-none absolute -inset-x-6 bottom-0 top-1/3 z-0"
              aria-hidden
            >
              <div className="flex h-full items-end justify-center gap-2.5 opacity-40 sm:gap-3">
                {[38, 56, 72, 48, 64].map((h, i) => (
                  <span
                    key={i}
                    className="nirf-rank-bar w-3 rounded-t-sm sm:w-4"
                    style={{
                      height: `${h}%`,
                      background:
                        i === 2
                          ? "var(--nirf-accent)"
                          : "linear-gradient(180deg, rgba(12,18,34,0.18), rgba(12,18,34,0.05))",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="relative z-10 mx-auto flex max-w-[220px] items-center justify-center sm:max-w-[260px] lg:max-w-none">
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={280}
                height={280}
                className="h-auto w-full max-w-[160px] object-contain drop-shadow-[0_24px_40px_rgba(12,18,34,0.12)]"
              
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-(--nirf-accent)/35 to-transparent"
        aria-hidden
      />
    </section>
  );
};

export default Header;
