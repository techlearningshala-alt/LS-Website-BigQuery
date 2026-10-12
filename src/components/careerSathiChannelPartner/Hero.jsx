import {
  ArrowDown,
  ArrowRight,
  Check,
  QrCode,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TRUST_ITEMS = ["Zero investment", "Koi target nahi", "Fast payout"];

function scrollToSection(id) {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

const Hero = () => {
  return (
    <section className="bg-white">
      <div className="container py-10 md:py-14 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left content */}
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f3d5d2] bg-[#fff5f4] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
              <Sparkles className="size-3.5" strokeWidth={2.5} />
              Learningshala Partner Program
            </span>

            <h1 className="mt-5 max-w-xl text-[2.15rem] font-bold leading-[1.15] tracking-tight text-[#1a1a1a] sm:text-[2.55rem] lg:text-[2.85rem]">
              Bano{" "}
              <span className="text-primary">Career Sathi.</span>
              <br />
              Students ko sahi raasta dikhao, aur kamao.
            </h1>

            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#4a4a4a] sm:text-base">
              Aapke paas roz aane wale students ko top private universities ke{" "}
              <span className="font-semibold text-[#1a1a1a]">
                Online Degree Programs
              </span>{" "}
              ke baare mein bataiye — aur har student par kamai kariye.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/career-sathi-channel-partner-kyc-registration-form">
              <button
                type="button"
               
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_28px_rgba(168,50,38,0.28)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                Career Sathi Banein
                <ArrowRight className="size-4" strokeWidth={2.5} />
              </button>
              </Link>
            

              <button
                type="button"
                onClick={() => scrollToSection("how-it-works")}
                className="inline-flex w-fit items-center gap-1.5 text-[15px] font-semibold text-[#1a1a1a] transition-colors hover:text-primary"
              >
                Kaise kaam karta hai
                <ArrowDown className="size-4" strokeWidth={2.5} />
              </button>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
              {TRUST_ITEMS.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1.5 text-sm text-[#4a4a4a]"
                >
                  <span className="flex size-4 items-center justify-center rounded-full bg-[#ecfdf3]">
                    <Check className="size-2.5 text-[#16a34a]" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right dashboard preview */}
          <div className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:ml-auto">
            <div className="absolute -right-1 top-0 z-20 rounded-2xl border border-[#ece7df] bg-white px-3.5 py-2.5 shadow-[0_10px_30px_rgba(26,32,44,0.08)] sm:-right-3">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-[#ecfdf3]">
                  <TrendingUp className="size-4 text-[#16a34a]" strokeWidth={2.5} />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#16a34a]">
                    New Payout
                  </p>
                  <p className="text-sm font-bold text-[#1a1a1a]">
                    + ₹ 1,500{" "}
                    <span className="text-xs font-medium text-[#6b7280]">
                      Credited
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-[#ece7df] bg-white p-5 shadow-[0_18px_50px_rgba(26,32,44,0.08)] sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/images/icons/logo.webp"
                    alt="LearningShala"
                    width={34}
                    height={34}
                    className="rounded-md object-contain"
                  />
                  <div>
                    <p className="text-sm font-bold leading-none text-[#1a1a1a]">
                      LearningShala
                    </p>
                    <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9a948c]">
                      Education Partner
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ecfdf3] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#16a34a]">
                  <span className="size-1.5 rounded-full bg-[#16a34a]" />
                  Official Partner
                </span>
              </div>

              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9a948c]">
                    Career Sathi ID
                  </p>
                  <p className="mt-1 text-xl font-bold text-[#1a1a1a]">
                    CS-00421
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9a948c]">
                    Status
                  </p>
                  <span className="mt-1 inline-flex rounded-full bg-[#eef2ff] px-2.5 py-1 text-xs font-semibold text-[#4f46e5]">
                    Active
                  </span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#ece7df] bg-[#faf9f7] p-4">
                  <div className="flex items-center gap-2 text-[#9a948c]">
                    <Users className="size-4" />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.08em]">
                      Leads (30d)
                    </p>
                  </div>
                  <p className="mt-2 text-3xl font-bold text-[#1a1a1a]">37</p>
                </div>

                <div className="rounded-2xl border border-[#d1fae5] bg-[#f0fdf4] p-4">
                  <div className="flex items-center gap-2 text-[#16a34a]">
                    <Wallet className="size-4" />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.08em]">
                      Total Payout
                    </p>
                  </div>
                  <p className="mt-2 text-3xl font-bold text-[#16a34a]">
                    ₹ 14,200
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-dashed border-[#f3c5c0] bg-[#fff7f6] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                    <QrCode className="size-8 text-[#1a1a1a]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1a1a1a]">
                      Aapka Unique QR
                      <QrCode className="size-3.5 text-primary" />
                    </p>
                    <p className="mt-1 text-xs text-[#6b7280]">
                      Students scan karke direct register karein
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-3 -left-2 z-20 flex items-center gap-2.5 rounded-2xl bg-[#111827] px-3.5 py-2.5 shadow-[0_12px_30px_rgba(17,24,39,0.25)] sm:-left-4">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#2563eb]">
                <ShieldCheck className="size-5 text-white" strokeWidth={2.5} />
              </span>
              <div>
                <p className="text-sm font-bold leading-tight text-white">
                  Verified Partner
                </p>
                <p className="text-[11px] text-[#d1d5db]">Video KYC Approved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
