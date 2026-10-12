import {
  ArrowRight,
  Check,
  Clock,
  GraduationCap,
  Phone,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const STEPS = [
  {
    title: "Student se baat kariye",
    description:
      "Aapke paas aane wale students ko online degrees ke baare me bataiye.",
  },
  {
    title: "Details share kariye",
    description:
      "Aapko koi expert banne ki zaroorat nahi, bas basic info humein bhejiye.",
  },
  {
    title: "Har student par kamaiye",
    description:
      "Aapke reference se admission hone par direct payout seedha account mein.",
  },
];

const STATS = [
  {
    icon: Users,
    value: "500+",
    label: "Active Career Sathis",
    iconBg: "bg-[#dbeafe]",
    iconColor: "text-[#2563eb]",
    valueColor: "text-[#2563eb]",
    cardBg: "bg-[#f8fbff]",
    borderColor: "border-[#dbeafe]",
  },
  {
    icon: GraduationCap,
    value: "20+",
    label: "Partner Universities",
    iconBg: "bg-[#dcfce7]",
    iconColor: "text-[#16a34a]",
    valueColor: "text-[#16a34a]",
    cardBg: "bg-[#f7fdf9]",
    borderColor: "border-[#dcfce7]",
  },
  {
    icon: Phone,
    value: "24 hr",
    label: "Onboarding Call",
    iconBg: "bg-[#fef3c7]",
    iconColor: "text-[#d97706]",
    valueColor: "text-[#d97706]",
    cardBg: "bg-[#fffdf5]",
    borderColor: "border-[#fef3c7]",
  },
  {
    icon: Clock,
    value: "1 day",
    label: "Fast Payout",
    iconBg: "bg-[#ede9fe]",
    iconColor: "text-[#7c3aed]",
    valueColor: "text-[#7c3aed]",
    cardBg: "bg-[#faf8ff]",
    borderColor: "border-[#ede9fe]",
  },
];

function scrollToSection(id) {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

const About = () => {
  return (
    <section id="about" className="scroll-mt-24 bg-white">
      <div className="container py-10 md:py-14 lg:py-16">
        <div className="max-w-xl">
          <span className="inline-flex w-fit items-center rounded-full bg-[#fff5f4] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
            01 · Introduction
          </span>

          <h2 className="mt-5 text-[2rem] font-bold leading-[1.15] tracking-tight text-[#1a1a1a] sm:text-[2.35rem]">
            Career Sathi{" "}
            <span className="text-primary">kya hai?</span>
          </h2>

          <p className="mt-4 text-[15px] leading-relaxed text-[#4a4a4a] sm:text-base">
            Career Sathi ek simple aur profitable partnership hai. Aapke paas
            jo students aate hain, unme se kai aage padhna chahte hain — par
            unhe sahi guidance nahi milti.
          </p>
        </div>

        <div className="mt-8 grid items-start gap-8 lg:mt-10 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <div className="rounded-3xl border border-[#dbeafe] bg-[#f3f8ff] p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6b7280]">
              Ye kaise kaam karta hai?
            </p>

            <div className="mt-4 space-y-3">
              {STEPS.map((step, index) => (
                <div
                  key={step.title}
                  className="flex items-start gap-4 rounded-2xl border border-[#ece7df] bg-white p-4 shadow-[0_4px_16px_rgba(26,32,44,0.04)]"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-[15px] font-bold text-[#1a1a1a]">
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[#6b7280]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`relative flex min-h-[148px] flex-col rounded-3xl border ${stat.borderColor} ${stat.cardBg} p-5 sm:min-h-[160px] sm:p-6`}
                >
                  <span className="absolute right-4 top-4 size-2 rounded-full bg-[#22c55e]" />

                  <span
                    className={`inline-flex size-11 items-center justify-center rounded-full ${stat.iconBg}`}
                  >
                    <Icon className={`size-5 ${stat.iconColor}`} strokeWidth={2} />
                  </span>

                  <p
                    className={`mt-auto pt-5 text-[2rem] font-bold leading-none sm:text-[2.25rem] ${stat.valueColor}`}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-[#6b7280]">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center">
        <Link href="/career-sathi-channel-partner-kyc-registration-form">
              <button
                type="button"
               
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_28px_rgba(168,50,38,0.28)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                Career Sathi Banein
                <ArrowRight className="size-4" strokeWidth={2.5} />
              </button>
              </Link>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-4 py-2.5 text-sm font-semibold text-[#16a34a]">
            <span className="flex size-5 items-center justify-center rounded-full bg-[#dcfce7]">
              <Check className="size-3" strokeWidth={3} />
            </span>
            Koi technical experience zaroori nahi
          </span>
        </div>
      </div>
    </section>
  );
};

export default About;
