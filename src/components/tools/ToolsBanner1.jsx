import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  BadgeCheck,
  Percent,
  GraduationCap,
  TrendingUp,
  CalendarCheck,
  Search,
} from "lucide-react";

const TRUST = [
  { icon: ShieldCheck, label: "100% Free" },
  { icon: Zap, label: "Instant Results" },
  { icon: BadgeCheck, label: "No Sign Up" },
];

const FLOATING_CARDS = [
  {
    label: "Attendance",
    value: "85%",
    icon: CalendarCheck,
    className: "left-0 top-[8%] sm:left-2",
    iconClass: "bg-[#f0fdf4] text-[#16a34a]",
  },
  {
    label: "CGPA",
    value: "8.7",
    icon: GraduationCap,
    className: "right-0 top-[4%] sm:right-4",
    iconClass: "bg-[#f5f3ff] text-[#7c3aed]",
  },
  {
    label: "Percentage",
    value: "95.4%",
    icon: Percent,
    className: "bottom-[18%] left-0 sm:left-4 sm:bottom-[22%]",
    iconClass: "bg-[#eff6ff] text-[#2563eb]",
  },
  {
    label: "ROI",
    value: "+18%",
    icon: TrendingUp,
    className: "bottom-[10%] right-0 sm:right-6 sm:bottom-[14%]",
    iconClass: "bg-[#fff1f2] text-primary",
  },
];

const ToolsBanner1 = ({ search = "", onSearchChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById("all-tools")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#e8f4fc]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(255,255,255,0.9),transparent),linear-gradient(180deg,#e8f4fc_0%,#f5fafd_55%,#ffffff_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-[#93c5fd]/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />

      <div className="container relative mx-auto px-4 py-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h1 className="mb-4 text-[2rem] font-extrabold leading-[1.15] tracking-tight text-[#0f172a] sm:text-4xl lg:text-[2.6rem]">
              Academic &amp; Daily Use
              <span className="text-primary"> Calculators For Everyone</span>
            </h1>
            <p className="mb-6 max-w-md text-[15px] leading-relaxed text-[#475569]">
              A complete collection of free online calculators for students,
              professionals, and everyday life.
            </p>

            <form onSubmit={handleSubmit} className="relative mb-5 max-w-xl">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8]"
                strokeWidth={2}
                aria-hidden
              />
              <input
                type="search"
                value={search}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Search calculators... e.g. CGPA, ROI, Attendance"
                className="h-12 w-full rounded-2xl border border-[#dbeafe] bg-white py-3 pl-12 pr-28 text-sm text-[#0f172a] shadow-[0_8px_30px_rgba(15,23,42,0.06)] outline-none transition placeholder:text-[#94a3b8] focus:border-primary/30 focus:ring-2 focus:ring-primary/15"
                aria-label="Search calculators"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-primary/90"
              >
                Search
              </button>
            </form>

            {/* <div className="mb-7 flex flex-wrap items-center gap-3">
              <a
                href="#all-tools"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white shadow-md shadow-primary/25 transition hover:bg-primary/90"
              >
                View all calculators
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/tools/roi-calculator/"
                className="inline-flex items-center gap-2 rounded-lg border border-[#cbd5e1] bg-white px-5 py-3 text-sm font-bold text-[#0f172a] transition hover:border-primary/30 hover:text-primary"
              >
                Try ROI Calculator
              </Link>
            </div> */}

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {TRUST.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#334155]"
                >
                  <Icon className="h-4 w-4 text-green-500" strokeWidth={2.2} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-[560px] lg:ml-auto lg:max-w-none">
              <div
                className="pointer-events-none absolute inset-[12%] rounded-full bg-white/70 blur-2xl"
                aria-hidden
              />

              {/* {FLOATING_CARDS.map(
                ({ label, value, icon: Icon, className, iconClass }) => (
                  <div
                    key={label}
                    className={`absolute z-20 flex items-center gap-2.5 rounded-2xl border border-white/90 bg-white/95 px-3 py-2.5 shadow-[0_12px_40px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:px-3.5 sm:py-3 ${className}`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94a3b8]">
                        {label}
                      </p>
                      <p className="text-sm font-extrabold leading-none text-[#0f172a] sm:text-base">
                        {value}
                      </p>
                    </div>
                  </div>
                )
              )} */}

              <div className="relative z-10 overflow-hidden rounded-[28px] bg-gradient-to-br from-white/60 to-white/20 p-3 sm:p-4">
                <Image
                  src="/images/tools/toolsHero.png"
                  alt="Smart calculators for academics and daily use"
                  width={900}
                  height={700}
                  priority
                  className="h-auto w-full object-contain drop-shadow-sm max-w-[460px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsBanner1;
