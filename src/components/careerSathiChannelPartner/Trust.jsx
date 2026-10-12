import {
  ArrowRight,
  Check,
  Headphones,
  IdCard,
  Lock,
  ShieldCheck,
  Store,
} from "lucide-react";
import Link from "next/link";
import React from "react";

function scrollToSection(id) {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

const TRUST_CARDS = [
  {
    tag: "Secure KYC",
    title: "100% Verified Onboarding",
    description:
      "Poori KYC aur Video KYC ke baad hi official partner banaya jata hai.",
    illustration: (
      <div className="relative mx-auto flex h-28 w-full max-w-[180px] items-center justify-center rounded-2xl border border-[#dcfce7] bg-[#f0fdf4]">
        <div className="w-28 rounded-xl border-2 border-[#16a34a] bg-white p-3 shadow-sm">
          <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-[#eff6ff]">
            <IdCard className="size-5 text-[#2563eb]" strokeWidth={2} />
          </div>
          <div className="mt-2 space-y-1">
            <div className="h-1.5 rounded-full bg-[#e5e7eb]" />
            <div className="h-1.5 w-2/3 rounded-full bg-[#e5e7eb]" />
          </div>
        </div>
        <span className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-[#16a34a] text-white shadow-md">
          <Check className="size-4" strokeWidth={3} />
        </span>
      </div>
    ),
  },
  {
    tag: "Direct Contact",
    title: "Dedicated HO Support",
    description:
      "Har Career Sathi ke liye Head Office se dedicated manager milega.",
    illustration: (
      <div className="relative mx-auto flex h-28 w-full max-w-[180px] items-center justify-center rounded-2xl border border-[#dbeafe] bg-[#eff6ff]">
        <div className="flex items-end gap-2">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-[#2563eb] text-white shadow-sm">
            <Headphones className="size-7" strokeWidth={2} />
          </div>
          <div className="mb-1 rounded-2xl rounded-bl-sm bg-[#9333ea] px-3 py-2 text-[10px] font-semibold text-white shadow-sm">
            HO Support
          </div>
        </div>
      </div>
    ),
  },
  {
    tag: "Zero Delays",
    title: "Transparent Reporting",
    description:
      "Leads, admissions aur payouts ka 100% clear real-time record.",
    illustration: (
      <div className="relative mx-auto flex h-28 w-full max-w-[180px] items-end justify-center gap-1.5 rounded-2xl border border-[#dbeafe] bg-[#eff6ff] px-4 pb-4 pt-6">
        {[40, 55, 45, 70, 60].map((height, index) => (
          <div
            key={index}
            className="w-4 rounded-t-md bg-[#2563eb]"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    ),
  },
  {
    tag: "Official Status",
    title: "Official Branding Kit",
    titleColor: "text-[#92400e]",
    description:
      "Aapki dukaan ki branding ke saath certified partner status.",
    illustration: (
      <div className="relative mx-auto flex h-28 w-full max-w-[180px] items-center justify-center rounded-2xl border border-[#fde68a] bg-[#fffbeb]">
        <div className="relative">
          <div className="flex size-16 flex-col items-center justify-end overflow-hidden rounded-xl border-2 border-[#f59e0b] bg-white shadow-sm">
            <div className="flex h-5 w-full items-center justify-center bg-[#f59e0b]">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className="size-1 rounded-full bg-white/80" />
                ))}
              </div>
            </div>
            <Store className="my-2 size-7 text-[#f59e0b]" strokeWidth={2} />
          </div>
          <span className="absolute -bottom-1 -right-2 flex size-6 items-center justify-center rounded-full bg-[#f59e0b] text-white shadow-md">
            <Check className="size-3.5" strokeWidth={3} />
          </span>
        </div>
      </div>
    ),
  },
];

function TrustCard({ tag, title, titleColor = "text-[#1a1a1a]", description, illustration }) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-[#ece7df] bg-white p-5 shadow-[0_8px_24px_rgba(26,32,44,0.04)] sm:p-6">
      <span className="inline-flex w-fit rounded-full bg-[#111827] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
        {tag}
      </span>

      <div className="my-5 flex flex-1 items-center justify-center rounded-2xl border border-[#f3f4f6] bg-[#fafafa] p-4">
        {illustration}
      </div>

      <h3 className={`text-base font-bold ${titleColor}`}>{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
        {description}
      </p>
    </div>
  );
}

const Trust = () => {
  return (
    <section className="bg-white">
      <div className="container py-10 md:py-14 lg:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#ecfdf3] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#16a34a]">
            <Lock className="size-3.5" strokeWidth={2.5} />
            07 · Trust & Verification
          </span>

          <h2 className="mt-5 text-[2rem] font-bold leading-[1.15] tracking-tight text-[#1a1a1a] sm:text-[2.35rem]">
            Aap bharose ke saath jud rahe hain
          </h2>

          <p className="mt-4 text-[15px] leading-relaxed text-[#6b7280] sm:text-base">
            Hamara partner program poore bharose, legal compliance aur
            transparency par chalta hai.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {TRUST_CARDS.map((card) => (
            <TrustCard key={card.title} {...card} />
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-5 rounded-3xl bg-[#111827] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 lg:p-8">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-[#16a34a]/30 bg-[#16a34a]/10">
              <ShieldCheck className="size-6 text-[#22c55e]" strokeWidth={2.25} />
            </span>
            <div>
              <p className="text-lg font-bold text-white sm:text-xl">
                100% Safe & Transparent Partnership
              </p>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#9ca3af]">
                Aapki details aur earnings bank-grade security standards ke
                saath fully encrypted hain.
              </p>
            </div>
          </div>

          <Link href="/career-sathi-channel-partner-kyc-registration-form">
              <button
                type="button"
               
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_28px_rgba(168,50,38,0.28)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                Career Sathi Banein
                <ArrowRight className="size-4" strokeWidth={2.5} />
              </button>
              </Link>
        </div>
      </div>
    </section>
  );
};

export default Trust;
