import {
  ArrowRight,
  BookOpen,
  Check,
  GraduationCap,
  IdCard,
  Landmark,
  Printer,
  ShieldCheck,
  Store,
  Users,
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

const SHOP_TYPES = [
  {
    title: "Cyber Cafe",
    tag: "High Demand",
    icon: Store,
    iconBg: "bg-[#2563eb]",
    cardBg: "bg-[#eff6ff]",
    borderColor: "border-[#bfdbfe]",
  },
  {
    title: "Photocopy / Xerox Shop",
    tag: "Daily Footfall",
    icon: Printer,
    iconBg: "bg-[#9333ea]",
    cardBg: "bg-[#faf5ff]",
    borderColor: "border-[#e9d5ff]",
  },
  {
    title: "Coaching Center",
    tag: "Direct Reach",
    icon: GraduationCap,
    iconBg: "bg-[#f59e0b]",
    cardBg: "bg-[#fffbeb]",
    borderColor: "border-[#fde68a]",
  },
  {
    title: "Stationery / Book Shop",
    tag: "High Trust",
    icon: BookOpen,
    iconBg: "bg-[#16a34a]",
    cardBg: "bg-[#f0fdf4]",
    borderColor: "border-[#bbf7d0]",
  },
];

const REQUIREMENTS = [
  {
    icon: Users,
    iconBg: "bg-[#eff6ff]",
    iconColor: "text-[#2563eb]",
    title: "Students ka regular footfall",
    description: "Aapke dukaan par daily students aate hon",
  },
  {
    icon: IdCard,
    iconBg: "bg-[#fff7ed]",
    iconColor: "text-[#f59e0b]",
    title: "Valid ID & PAN Card",
    description: "Aapki Identity aur Video KYC ke liye",
  },
  {
    icon: Landmark,
    iconBg: "bg-[#ecfdf3]",
    iconColor: "text-[#16a34a]",
    title: "Payout ke liye Bank Account",
    description: "Har admission par direct transfer ke liye",
  },
];

function ShopTypeCard({ title, tag, icon: Icon, iconBg, cardBg, borderColor }) {
  return (
    <div
      className={`relative flex min-h-[130px] flex-col justify-between rounded-2xl border ${borderColor} ${cardBg} p-4`}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={`flex size-10 items-center justify-center rounded-xl ${iconBg} text-white shadow-sm`}
        >
          <Icon className="size-5" strokeWidth={2.25} />
        </span>
        <span className="text-[10px] font-semibold text-[#9ca3af]">{tag}</span>
      </div>
      <p className="mt-4 text-sm font-bold text-[#1a1a1a]">{title}</p>
    </div>
  );
}

function RequirementRow({ icon: Icon, iconBg, iconColor, title, description }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#ece7df] bg-[#fafafa] p-4">
      <span
        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
      >
        <Icon className={`size-5 ${iconColor}`} strokeWidth={2.25} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-[#1a1a1a]">{title}</p>
        <p className="mt-0.5 text-xs text-[#6b7280]">{description}</p>
      </div>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#ecfdf3]">
        <Check className="size-3.5 text-[#16a34a]" strokeWidth={3} />
      </span>
    </div>
  );
}

const WhoBecomeCareerSathi = () => {
  return (
    <section className="bg-white">
      <div className="container py-10 md:py-14 lg:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex w-fit items-center rounded-full bg-[#fff5f4] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
            04 · Eligibility
          </span>

          <h2 className="mt-5 text-[2rem] font-bold leading-[1.15] tracking-tight text-[#1a1a1a] sm:text-[2.35rem]">
            Kaun ban sakta hai Career Sathi?
          </h2>

          <p className="mt-4 text-[15px] leading-relaxed text-[#6b7280] sm:text-base">
            Agar aap students se roz milte hain aur unka bharosa rakhte hain —
            to ye partnership aapke liye hai.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Left - shop types */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9ca3af]">
              Aapki dukan inme se koi ek hai?
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4">
              {SHOP_TYPES.map((shop) => (
                <ShopTypeCard key={shop.title} {...shop} />
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#ece7df] bg-[#fafafa] px-4 py-3.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#fff5f4]">
                <Store className="size-4 text-primary" strokeWidth={2.25} />
              </span>
              <p className="text-sm text-[#6b7280]">
                Ya koi bhi aisi dukaan jahan students ka aana-jaana rehta hai.
              </p>
            </div>
          </div>

          {/* Right - requirements card */}
          <div className="overflow-hidden rounded-3xl border border-[#ece7df] bg-white shadow-[0_16px_40px_rgba(26,32,44,0.08)]">
            <div className="h-1.5 bg-primary" />

            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-[#1a1a1a]">
                    Zaroori Cheezein
                  </h3>
                  <p className="mt-1 text-sm text-[#6b7280]">
                    Shuru karne ke liye bas ye 3 cheezein chahiye
                  </p>
                </div>

                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-3 py-1.5 text-[11px] font-semibold text-[#16a34a]">
                  <ShieldCheck className="size-3.5" strokeWidth={2.5} />
                  Easy KYC
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {REQUIREMENTS.map((item) => (
                  <RequirementRow key={item.title} {...item} />
                ))}
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
        </div>
      </div>
    </section>
  );
};

export default WhoBecomeCareerSathi;
