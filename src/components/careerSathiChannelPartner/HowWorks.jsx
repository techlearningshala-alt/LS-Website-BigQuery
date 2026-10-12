import {
  ArrowRight,
  Check,
  Coins,
  Phone,
  QrCode,
  ShieldCheck,
  Store,
  UserPlus,
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

const STEPS = [
  {
    step: "01",
    tag: "Fast Onboarding",
    icon: UserPlus,
    title: "Register kariye",
    description: "Chhota sa form bhariye. Hamari team 24 hr me call karegi.",
    cardBg: "bg-[#eff6ff]",
    borderColor: "border-[#bfdbfe]",
    iconBg: "bg-[#2563eb]",
    titleColor: "text-[#1e40af]",
    descColor: "text-[#3b82f6]",
    footer: (
      <div className="flex items-center gap-2 rounded-xl border border-[#bfdbfe] bg-white px-3 py-2.5">
        <span className="flex size-7 items-center justify-center rounded-lg bg-[#eff6ff]">
          <Phone className="size-3.5 text-[#2563eb]" strokeWidth={2.5} />
        </span>
        <span className="text-xs font-semibold text-[#1e40af]">
          Callback in 24h
        </span>
        <span className="ml-auto size-2 rounded-full bg-[#2563eb]" />
      </div>
    ),
  },
  {
    step: "02",
    tag: "Verified Partner",
    icon: ShieldCheck,
    title: "KYC complete kariye",
    description:
      "Field executive dukaan par aayega, phir HO Video KYC hoga.",
    cardBg: "bg-[#faf5ff]",
    borderColor: "border-[#e9d5ff]",
    iconBg: "bg-[#9333ea]",
    titleColor: "text-[#6b21a8]",
    descColor: "text-[#9333ea]",
    footer: (
      <div className="flex items-center gap-2 rounded-xl border border-[#e9d5ff] bg-white px-3 py-2.5">
        <span className="flex size-7 items-center justify-center rounded-lg bg-[#faf5ff]">
          <Store className="size-3.5 text-[#9333ea]" strokeWidth={2.5} />
        </span>
        <span className="text-xs font-semibold text-[#6b21a8]">
          Dukaan Visit + Video KYC
        </span>
      </div>
    ),
  },
  {
    step: "03",
    tag: "Free Branding",
    icon: QrCode,
    title: "Live ho jaiye",
    description:
      "Unique QR code & branded banner dukaan par lag jayega.",
    cardBg: "bg-[#fffbeb]",
    borderColor: "border-[#fde68a]",
    iconBg: "bg-[#f59e0b]",
    titleColor: "text-[#92400e]",
    descColor: "text-[#d97706]",
    footer: (
      <div className="flex items-center gap-2 rounded-xl border border-[#fde68a] bg-white px-3 py-2.5">
        <span className="flex size-7 items-center justify-center rounded-lg bg-[#fffbeb]">
          <QrCode className="size-3.5 text-[#f59e0b]" strokeWidth={2.5} />
        </span>
        <span className="text-xs font-semibold text-[#92400e]">
          QR Kit Ready
        </span>
        <span className="ml-auto rounded-full bg-[#ecfdf3] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#16a34a]">
          Active
        </span>
      </div>
    ),
  },
  {
    step: "04",
    tag: "Instant Earning",
    icon: Coins,
    title: "Kamana shuru kariye",
    description:
      "Students QR scan karke register karenge, aur kamai shuru!",
    cardBg: "bg-[#f0fdf4]",
    borderColor: "border-[#bbf7d0]",
    iconBg: "bg-[#16a34a]",
    titleColor: "text-[#166534]",
    descColor: "text-[#16a34a]",
    footer: (
      <div className="flex items-center justify-between rounded-xl border border-[#bbf7d0] bg-white px-3 py-2.5">
        <span className="text-xs font-semibold text-[#166534]">
          Har Referral par
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#16a34a]">
          Payout
          <Check className="size-3.5" strokeWidth={3} />
        </span>
      </div>
    ),
  },
];

function StepCard({
  step,
  tag,
  icon: Icon,
  title,
  description,
  cardBg,
  borderColor,
  iconBg,
  titleColor,
  descColor,
  footer,
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-3xl border ${borderColor} ${cardBg} p-5 shadow-[0_8px_24px_rgba(26,32,44,0.04)] sm:p-6`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9ca3af]">
          Step {step}
        </span>
        <span className="rounded-full border border-white/80 bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#6b7280] shadow-sm">
          {tag}
        </span>
      </div>

      <span
        className={`mt-5 inline-flex size-12 items-center justify-center rounded-2xl ${iconBg} text-white shadow-sm`}
      >
        <Icon className="size-6" strokeWidth={2.25} />
      </span>

      <h3 className={`mt-5 text-lg font-bold ${titleColor}`}>{title}</h3>
      <p className={`mt-2 flex-1 text-sm leading-relaxed ${descColor}`}>
        {description}
      </p>

      <div className="mt-5">{footer}</div>
    </div>
  );
}

const HowWorks = () => {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white">
      <div className="container py-10 md:py-14 lg:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[2rem] font-bold leading-[1.15] tracking-tight text-[#1a1a1a] sm:text-[2.35rem]">
            Kaise kaam karta hai?
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#6b7280] sm:text-base">
            Bas 4 aasan steps mein banein aadhunik Career Sathi
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {STEPS.map((step) => (
            <StepCard key={step.step} {...step} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
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

export default HowWorks;
