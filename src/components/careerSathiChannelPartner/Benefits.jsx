import {
  ArrowRight,
  ArrowUpRight,
  Check,
  QrCode,
  Target,
  TrendingUp,
  Trophy,
  Wallet,
  Zap,
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

const BENEFITS = [
  {
    badge: "100% Free",
    icon: Wallet,
    title: "Zero Investment",
    description: "Na kuch kharidna hai, na kuch dena hai.",
    cardBg: "bg-[#f0fdf4]",
    borderColor: "border-[#dcfce7]",
    iconBg: "bg-[#16a34a]",
    titleColor: "text-[#166534]",
    descColor: "text-[#15803d]",
    featured: false,
    footer: (
      <div className="flex items-center justify-between rounded-2xl border border-[#dcfce7] bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#ecfdf3]">
            <Check className="size-4 text-[#16a34a]" strokeWidth={3} />
          </span>
          <div>
            <p className="text-xs text-[#6b7280]">Joining Fee</p>
            <p className="text-sm font-bold text-[#1a1a1a]">₹0 / Lifetime</p>
          </div>
        </div>
        <span className="rounded-full bg-[#16a34a] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          Free
        </span>
      </div>
    ),
  },
  {
    badge: "No Pressure",
    icon: Target,
    title: "Koi Target Nahi",
    description: "Apni marzi se, apni speed se kamaiye.",
    cardBg: "bg-[#fffbeb]",
    borderColor: "border-[#fde68a]",
    iconBg: "bg-[#f59e0b]",
    titleColor: "text-[#92400e]",
    descColor: "text-[#b45309]",
    featured: true,
    footer: (
      <div className="rounded-2xl border border-[#fde68a] bg-white px-4 py-3">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold">
          <span className="text-[#92400e]">Work Flexibility</span>
          <span className="text-[#f59e0b]">100% Yours</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-[#fef3c7]">
          <div className="h-full w-full rounded-full bg-[#f59e0b]" />
        </div>
      </div>
    ),
  },
  {
    badge: "Marketing Support",
    icon: QrCode,
    title: "Free Branded Banner",
    description: "Aapki dukaan par, aapke unique QR code ke saath.",
    cardBg: "bg-[#eff6ff]",
    borderColor: "border-[#bfdbfe]",
    iconBg: "bg-[#2563eb]",
    titleColor: "text-[#1e40af]",
    descColor: "text-[#2563eb]",
    featured: false,
    footer: (
      <div className="flex items-center gap-3 rounded-2xl border border-[#bfdbfe] bg-white px-4 py-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff]">
          <QrCode className="size-5 text-[#2563eb]" strokeWidth={2} />
        </span>
        <div>
          <p className="text-sm font-bold text-[#1a1a1a]">Custom Printed QR</p>
          <p className="text-xs text-[#6b7280]">Directly linked to your ID</p>
        </div>
      </div>
    ),
  },
  {
    badge: "Instant Transfer",
    icon: Zap,
    title: "Fast, Transparent Payout",
    description: "Request daaliye, seedha aapke account mein.",
    cardBg: "bg-[#eef2ff]",
    borderColor: "border-[#c7d2fe]",
    iconBg: "bg-[#4f46e5]",
    titleColor: "text-[#3730a3]",
    descColor: "text-[#4f46e5]",
    featured: false,
    footer: (
      <div className="flex items-center justify-between rounded-2xl border border-[#c7d2fe] bg-white px-4 py-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#9ca3af]">
            Recent Payout
          </p>
          <p className="text-lg font-bold text-[#1a1a1a]">₹12,450.00</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#ecfdf3] px-2.5 py-1 text-[11px] font-semibold text-[#16a34a]">
          <ArrowUpRight className="size-3" strokeWidth={2.5} />
          Transferred
        </span>
      </div>
    ),
  },
  {
    badge: "Live Dashboard",
    icon: TrendingUp,
    title: "Apni Kamai Track Kariye",
    description: "Kitni leads aayin, kitne admission hue, sab pata chalega.",
    cardBg: "bg-[#faf5ff]",
    borderColor: "border-[#e9d5ff]",
    iconBg: "bg-[#9333ea]",
    titleColor: "text-[#6b21a8]",
    descColor: "text-[#9333ea]",
    featured: false,
    footer: (
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-[#e9d5ff] bg-white px-3 py-3 text-center">
          <p className="text-xs text-[#6b7280]">Leads</p>
          <p className="text-2xl font-bold text-[#9333ea]">42</p>
        </div>
        <div className="rounded-2xl border border-[#dcfce7] bg-white px-3 py-3 text-center">
          <p className="text-xs text-[#6b7280]">Admissions</p>
          <p className="text-2xl font-bold text-[#16a34a]">18</p>
        </div>
      </div>
    ),
  },
  {
    badge: "Rewards",
    icon: Trophy,
    title: "Top Partners ke liye Inaam",
    description: "Best performing Career Sathis ko exciting prizes.",
    cardBg: "bg-[#fff1f2]",
    borderColor: "border-[#fecdd3]",
    iconBg: "bg-primary",
    titleColor: "text-[#9f1239]",
    descColor: "text-primary",
    featured: false,
    footer: (
      <div className="flex items-center justify-between rounded-2xl border border-[#fecdd3] bg-white px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#fff7ed]">
            <Trophy className="size-4 text-[#f59e0b]" strokeWidth={2.5} />
          </span>
          <p className="text-sm font-bold text-[#1a1a1a]">Monthly Leaderboard</p>
        </div>
        <p className="text-sm font-bold text-primary">Prizes & Bonus</p>
      </div>
    ),
  },
];

function BenefitCard({
  badge,
  icon: Icon,
  title,
  description,
  cardBg,
  borderColor,
  iconBg,
  titleColor,
  descColor,
  featured,
  footer,
}) {
  return (
    <div
      className={`rounded-3xl border ${borderColor} ${cardBg} p-5 sm:p-6 ${
        featured
          ? "shadow-[0_16px_40px_rgba(245,158,11,0.12)] lg:-translate-y-1"
          : "shadow-[0_8px_24px_rgba(26,32,44,0.04)]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`flex size-11 items-center justify-center rounded-full ${iconBg} text-white shadow-sm`}
        >
          <Icon className="size-5" strokeWidth={2.25} />
        </span>
        <span className="rounded-full border border-white/80 bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#6b7280] shadow-sm">
          {badge}
        </span>
      </div>

      <h3 className={`mt-5 text-lg font-bold ${titleColor}`}>{title}</h3>
      <p className={`mt-1.5 text-sm leading-relaxed ${descColor}`}>
        {description}
      </p>

      <div className="mt-5">{footer}</div>
    </div>
  );
}

const Benefits = () => {
  return (
    <section className="bg-[#fafafa]">
      <div className="container py-10 md:py-14 lg:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex w-fit items-center rounded-full bg-[#eef2ff] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4f46e5]">
            02 · Benefits
          </span>

          <h2 className="mt-5 text-[2rem] font-bold leading-[1.15] tracking-tight text-[#1a1a1a] sm:text-[2.35rem]">
            Career Sathi kyun banein?
          </h2>

          <p className="mt-4 text-[15px] leading-relaxed text-[#6b7280] sm:text-base">
            Humare partner program ke saath judiye aur bina kisi risk ke apni
            nayi kamai shuru kariye.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {BENEFITS.map((benefit) => (
            <BenefitCard key={benefit.title} {...benefit} />
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

export default Benefits;
