import React from "react";
import { CheckCircle2, GitCompare, Sparkles, XCircle } from "lucide-react";
import MainHeading from "../custom/shared/MainHeading";
import { cn } from "@/lib/utils";

const WITHOUT_ITEMS = [
  "No post-admission support — you're on your own after enrolment!",
  "Higher risk of enrolling in unrecognised or fake universities",
  "No career clarity — figuring out what's next is entirely your responsibility",
  "No EMI guidance — managing fees becomes stressful and confusing",
  "No placement support once your course ends",
  "Isolated learning with no peer community access",

];

const WITH_ITEMS = [
  "Get full academic support from LMS registration to assignment prep, exam scheduling, webinars & live sessions updates",
  "Enroll in only government-recognised and verified online universities on our platform",
  "Get personalised career guidance aligned to your strengths and goals",
  "Avail easy EMI options with dedicated financial assistance support",
  "Access to lifelong placement support as we stay invested in your career even after your degree is completed",
  "Connect with an active inter-college student community with 1 lakh+ members",
  
];

function CompareRow({ children, className, isLast }) {
  return (
    <li
      className={cn(
        "flex items-start gap-3 px-4 py-4 md:px-5 md:py-4 transition-colors",
        !isLast && "border-b",
        className
      )}
    >
      {children}
    </li>
  );
}

const WhyUs = () => {
  return (
    <section className="sec_mb">
      <div className="mb-8 text-center">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
          <GitCompare className="h-3.5 w-3.5" />
          Side-by-side comparison
        </span>
        <MainHeading
          title={
            <>
              Why Students Choose{" "}
              <span className="text-primary">LearningShala</span>
            </>
          }
          className="text-center mb-2!"
        />
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground md:text-base">
          See what changes when you have dedicated post-admission support—not
          just an admission, but a partner through your entire online degree.
        </p>
      </div>

      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-slate-900 text-xs font-bold uppercase tracking-wider text-white shadow-lg"
          aria-hidden
        >
          vs
        </span>

        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-linear-to-r from-slate-100 to-slate-50 px-5 py-4">
            {/* <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  write something else
            </p> */}
            <h3 className="mt-1 text-xl font-bold text-slate-800">
              Without <span className="text-slate-500">LearningShala</span>
            </h3>
          </div>
          <ul>
            {WITHOUT_ITEMS.map((item, index) => (
              <CompareRow
                key={item}
                isLast={index === WITHOUT_ITEMS.length - 1}
                className="border-slate-100 hover:bg-slate-50/80"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                  <XCircle className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <p className="text-sm leading-relaxed text-slate-600 md:text-[15px]">
                  {item}
                </p>
              </CompareRow>
            ))}
          </ul>
        </article>

        <article
          className={cn(
            "relative overflow-hidden rounded-3xl border border-primary/25",
            "bg-linear-to-b from-[#fff6f6] via-white to-white",
            "shadow-[0_16px_48px_rgba(220,38,38,0.12)]",
            "ring-1 ring-primary/10"
          )}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-rose-400 to-amber-400"
            aria-hidden
          />
          <div className="border-b border-primary/20 bg-linear-to-r from-primary to-[#c41e3a] px-5 py-4">
            {/* <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/85">
              <Sparkles className="h-3.5 w-3.5" />
              Recommended
            </p> */}
            <h3 className="mt-1 text-xl font-bold text-white">
              With <span className="text-white">LearningShala</span>
            </h3>
          </div>
          <ul>
            {WITH_ITEMS.map((item, index) => (
              <CompareRow
                key={item}
                isLast={index === WITH_ITEMS.length - 1}
                className="border-red-100/60 hover:bg-primary/3"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <p className="text-sm font-medium leading-relaxed text-slate-700 md:text-[15px]">
                  {item}
                </p>
              </CompareRow>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
};

export default WhyUs;
