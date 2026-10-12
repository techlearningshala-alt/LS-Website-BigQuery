import React from "react";
import { CheckCircle2, GitCompare, XCircle } from "lucide-react";
import { useLeadForm } from "@/context/LeadFormContext";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const WITHOUT_ITEMS = [
  "No after-admission support",
  "Pay the same fee as University",
  "Prepare assignments all by yourself",
  "No prior Exam Updates",
  "Exam day stress is only yours",
];

const WITH_ITEMS = [
  "A dedicated Post-Admission Support Team",
  "Check additional Scholarship Applicability",
  "Assignment Preparation help from Experts",
  "Exam Slot Booking Update",
  "Get updated exam time via Call/SMS",
 
];

function CompareRow({ children, className, isLast }) {
  return (
    <li
      className={cn(
        "flex items-start gap-3 px-4 py-3.5 md:px-5 md:py-4 transition-colors",
        !isLast && "border-b",
        className
      )}
    >
      {children}
    </li>
  );
}

const CompareCTA1 = () => {
  const { showLeadForm } = useLeadForm();

  return (
    <div className="container mx-auto mb-10 px-4">
      <div className="mb-6 text-center md:mb-8">
        {/* <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
          <GitCompare className="h-3.5 w-3.5" />
          Side-by-side comparison
        </span> */}
        <h2 className="text-xl font-extrabold tracking-tight text-[#0f172a] md:text-2xl">
    

        Why Students Choose <span className="text-primary">LearningShala</span>
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-[#78716c] md:text-base">
        Let&apos;s see what you could be missing in your online education journey without LearningShala.

        </p>
      </div>

      <div className="relative grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
     

        {/* Without LS */}
        <article className="overflow-hidden rounded-3xl border border-[#e8e2d9] bg-white shadow-sm">
          <div className="border-b border-[#e8e2d9] bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] px-5 py-4">
           
            <h3 className="mt-1 text-lg font-extrabold text-[#334155] md:text-xl">
              Without LearningShala
            </h3>
          </div>
          <ul>
            {WITHOUT_ITEMS.map((item, index) => (
              <CompareRow
                key={item}
                isLast={index === WITHOUT_ITEMS.length - 1}
                className="border-[#f1f5f9] hover:bg-[#f8fafc]/80"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                  <XCircle className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <p className="text-sm leading-relaxed text-[#64748b] md:text-[15px]">
                  {item}
                </p>
              </CompareRow>
            ))}
          </ul>
        </article>

        {/* With LS */}
        <article
          className={cn(
            "relative overflow-hidden rounded-3xl border border-primary/25",
            "bg-gradient-to-b from-[#fff6f6] via-white to-white",
            "shadow-[0_16px_48px_rgba(220,38,38,0.1)]",
            "ring-1 ring-primary/10"
          )}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-rose-400 to-amber-400"
            aria-hidden
          />
          <div className="border-b border-primary/20 bg-gradient-to-r from-primary to-[#c41e3a] px-5 py-4">
           
            <h3 className="mt-1 text-lg font-extrabold text-white md:text-xl">
              With LearningShala
            </h3>
          </div>
          <ul>
            {WITH_ITEMS.map((item, index) => (
              <CompareRow
                key={item}
                isLast={index === WITH_ITEMS.length - 1}
                className="border-red-100/60 hover:bg-primary/[0.03]"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <p className="text-sm font-medium leading-relaxed text-[#334155] md:text-[15px]">
                  {item}
                </p>
              </CompareRow>
            ))}
          </ul>
        </article>
      </div>

      {/* <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => showLeadForm("compare page cta - with ls")}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-md shadow-primary/25 transition hover:bg-primary/90 active:scale-95 md:text-base"
        >
          Get Free Guidance with LearningShala
          <ArrowRight className="h-4 w-4" />
        </button>
      </div> */}
    </div>
  );
};

export default CompareCTA1;
