import React from "react";
import PrimaryButton from "./PrimaryButton";
import { useLeadForm } from "@/context/LeadFormContext";
import { useLeadGuard } from "@/components/auth/useLeadGuard";
import { toast } from "sonner";
import { ArrowRight, Headphones, Sparkles } from "lucide-react";

const TRUST_ITEMS = ["Free counseling", "Expert mentors", "40+ universities"];

const Cta = () => {
  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();

  const handleConnect = (e) => {
    if (!withVerification()) {
      e.preventDefault();
      showLeadForm("apply to course from course page banner");
      return;
    }
    toast.success("Our counselor will contact you shortly 📞");
  };

  return (
    <section className="container sec_mb" aria-label="Get free counseling">
      <div className="relative overflow-hidden rounded-3xl border border-slate-800/50 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
        <div
          className="absolute inset-0 bg-linear-to-br from-[#14181f] via-[#1b1d21] to-[#2a1215]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 left-1/4 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-[#f97316] to-primary"
          aria-hidden
        />

        <div className="relative flex flex-col gap-8 p-8 md:flex-row md:items-center md:justify-between md:gap-10 md:p-10 lg:p-12">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/90">
              <Sparkles className="h-3.5 w-3.5 text-[#fca5a5]" />
              Start your journey today
            </span>

            <p className="mb-3 text-2xl font-extrabold tracking-tight text-white md:text-3xl lg:text-[2rem] lg:leading-tight">
              Write Your Career Story,{" "}
              <span className="text-primary">Your Way</span>
            </p>

            <p className="mb-5 text-sm leading-relaxed text-white/70 md:text-base">
            Because we stand by you in every step of the journey!
            </p>

            <ul className="flex flex-wrap gap-2">
              {TRUST_ITEMS.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex shrink-0 flex-col items-stretch gap-3 sm:items-center md:items-end md:min-w-[220px]">
            <div
              role="button"
              tabIndex={0}
              onClick={handleConnect}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleConnect(e);
                }
              }}
              className="cursor-pointer"
            >
              <PrimaryButton
                title="Let's Connect!"
                icon={<ArrowRight className="min-w-5 min-h-5" />}
                className="w-full! rounded-xl! px-8! shadow-lg shadow-primary/25 md:w-auto!"
              />
            </div>

          
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
