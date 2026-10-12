import {
  ArrowRight,
  Check,
  Headphones,
  Laptop,
  MessageCircle,
  ShieldCheck,
  User,
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

const SCRIPT_ITEMS = [
  {
    icon: Laptop,
    text: "Top private universities ab Online Degree Programs offer karti hain.",
    tag: "Online Degrees",
    tagBg: "bg-[#f3e8ff]",
    tagColor: "text-[#7c3aed]",
  },
  {
    icon: User,
    text: "Student ghar baithe, job ke saath, apni speed se degree complete kar sakta hai.",
    tag: "Flexible Learning",
    tagBg: "bg-[#ffedd5]",
    tagColor: "text-[#ea580c]",
  },
  {
    icon: ShieldCheck,
    text: "UGC Recognized aur 100% valid degree milti hai.",
    tag: "100% Valid Degree",
    tagBg: "bg-[#dcfce7]",
    tagColor: "text-[#16a34a]",
  },
];

const SalesGuidance = () => {
  return (
    <section className="bg-[#fafafa]">
      <div className="container py-10 md:py-14 lg:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex w-fit items-center rounded-full bg-[#fff5f4] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
            05 · Sales Script Guidance
          </span>

          <h2 className="mt-5 text-[2rem] font-bold leading-[1.15] tracking-tight text-[#1a1a1a] sm:text-[2.35rem]">
            Students se kya kehna hai?
          </h2>

          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-4 py-2 text-sm font-semibold text-[#0d9488]">
            <span className="flex size-5 items-center justify-center rounded-full bg-[#ccfbf1]">
              <Check className="size-3" strokeWidth={3} />
            </span>
            Aapko degree ka expert banne ki koi zaroorat nahi hai!
          </span>
        </div>

        <div className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-[28px] border border-[#ece7df] bg-white p-5 shadow-[0_16px_40px_rgba(26,32,44,0.06)] sm:p-6 lg:p-8">
          <span
            aria-hidden
            className="pointer-events-none absolute right-4 top-2 select-none text-[7rem] font-serif leading-none text-[#eff6ff] sm:right-8 sm:text-[9rem]"
          >
            “
          </span>

          <div className="relative">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
                <MessageCircle className="size-5" strokeWidth={2.25} />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9ca3af]">
                  Simple 1-minute pitch
                </p>
                <p className="mt-1 text-base font-bold text-[#1a1a1a] sm:text-lg">
                  Jab bhi koi student aage padhne ki baat kare, bas itna
                  batayiye:
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {SCRIPT_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.tag}
                    className="flex flex-col gap-3 rounded-2xl border border-[#ece7df] bg-white p-4 shadow-[0_4px_16px_rgba(26,32,44,0.04)] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-3 sm:items-center">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#fff5f4]">
                        <Icon className="size-4 text-primary" strokeWidth={2.25} />
                      </span>
                      <p className="text-sm leading-relaxed text-[#1a1a1a] sm:text-[15px]">
                        &ldquo;{item.text}&rdquo;
                      </p>
                    </div>

                    <span
                      className={`inline-flex w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${item.tagBg} ${item.tagColor}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex flex-col gap-4 rounded-2xl bg-[#111827] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex items-start gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#134e4a]">
                  <Headphones className="size-5 text-[#5eead4]" strokeWidth={2.25} />
                </span>
                <div>
                  <p className="text-base font-bold text-white">
                    Bas detail humein bhej dijiye!
                  </p>
                  <p className="mt-1 text-sm text-[#9ca3af]">
                    Aage ki poori counselling hamari expert team karegi.
                  </p>
                </div>
              </div>

              <span className="inline-flex w-fit shrink-0 rounded-full border border-[#14b8a6]/30 bg-[#134e4a] px-3 py-1.5 text-xs font-semibold text-[#5eead4]">
                Zero Effort For You
              </span>
            </div>
          </div>
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

export default SalesGuidance;
