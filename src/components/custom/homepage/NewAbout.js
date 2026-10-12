import React from "react";
import MainHeading from "../shared/MainHeading";
import SecondaryButton from "../shared/SecondaryButton";
import Link from "next/link";
import {
  BadgeCheck,
  Check,
  GitCompare,
  GraduationCap,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

function HighlightList({ items }) {
  return (
    <ul className="mb-5 space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 text-sm text-muted-foreground"
        >
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const PostAdmissionPanel = () => (
  <div className="space-y-2.5">
    {[
      "10,000+ Satisfied Learners",
      "100% Admission-to-Degree Support",
      "1 Dedicated Relationship Manager",
      "24×7 Query Resolution Support",
    ].map((item, idx) => (
      <div
        key={item}
        className="flex items-center gap-3 rounded-xl border border-amber-100/80 bg-white/90 p-3 shadow-sm"
      >
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-xs font-bold text-amber-800">
          {idx + 1}
        </span>
        <p className="text-sm font-semibold leading-snug text-slate-700">
          {item}
        </p>
      </div>
    ))}
  </div>
);

const MentorPanel = () => (
  <div className="space-y-2.5">
    {[
      { name: "Mayank Singh", domain: "Students Mentored", exp: "3029" },
      { name: "Shoaib Khan", domain: "Students Mentored", exp: "4121" },
      { name: "Sudhanshu Shukla", domain: "Students Mentored", exp: "2473" },
    ].map((mentor) => (
      <div
        key={mentor.name}
        className="flex items-center justify-between gap-2 rounded-xl border border-red-100/80 bg-white/95 p-3 shadow-sm"
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {mentor.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {mentor.domain}: {mentor.exp}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
          <BadgeCheck className="h-3 w-3" />
          Verified
        </span>
      </div>
    ))}
  </div>
);

const ComparePanel = () => (
  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="grid grid-cols-3 bg-slate-100/90 px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-600">
      <p>Factors</p>
      <p className="text-center">Univ. A</p>
      <p className="text-center">Univ. B</p>
    </div>
    {[
      ["Fees", "1.2L", "2.5L"],
      ["Placement", "89%", "83%"],
      ["EMI", "Yes", "Yes"],
      ["Rating", "4.7", "4.5"],
      ["Exam Mode", "Online", "Offline"],
    ].map((row) => (
      <div
        key={row[0]}
        className="grid grid-cols-3 border-t border-slate-100 px-3 py-2 text-xs"
      >
        <p className="font-medium text-slate-700">{row[0]}</p>
        <p className="text-center font-semibold text-primary">{row[1]}</p>
        <p className="text-center font-medium text-slate-600">{row[2]}</p>
      </div>
    ))}
  </div>
);

const FEATURE_CARDS = [
  {
    id: "mentors",
    icon: Users,
    title: "Verified Mentors",
    highlights: [
      "200+ Verified Mentors",
      "1:1 Career Guidance",
      "2x Faster Decision-Making",
      "3x Career Clarity",
    ],
    panel: <MentorPanel />,
    href: "/verified-mentors",
    cta: "Connect Now",
    cardClass:
      "border-red-100/80 bg-linear-to-b from-[#fff5f5] via-white to-white",
    iconClass: "bg-primary/10 text-primary",
  },
  {
    id: "compare",
    icon: GitCompare,
    title: "Compare University in 2 mins",
    highlights: [
      "100+ UGC-Approved Universities to Compare",
      "40+ Decision-Making Factors",
      "1 Right Online Degree for Your Future",
      "Instant Comparison Results",
    ],
    panel: <ComparePanel />,
    href: "/compare-university",
    cta: "Compare Now",
    cardClass:
      "border-slate-200 bg-linear-to-b from-slate-50 via-white to-white",
    iconClass: "bg-slate-200/80 text-slate-700",
  },
  {
    id: "admission",
    icon: GraduationCap,
    title: "Admission Services",
    titleAccent: "Post",
    highlights: null,
    description:
      "End-to-end support from shortlisting to first semester onboarding.",
    panel: <PostAdmissionPanel />,
    href: "/post-admission-service",
    cta: "Explore Now",
    cardClass:
      "border-amber-100/80 bg-linear-to-b from-[#fffbeb] via-white to-white",
    iconClass: "bg-amber-100 text-amber-800",
  },
];

function FeatureCard({
  icon: Icon,
  title,
  titleAccent,
  highlights,
  description,
  panel,
  href,
  cta,
  cardClass,
  iconClass,
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(15,23,42,0.1)]",
        cardClass
      )}
    >
      <div className="relative flex flex-1 flex-col p-6 md:p-8">
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/60 blur-2xl"
          aria-hidden
        />

        {/* <div className={cn("relative mb-4 inline-flex rounded-xl p-3", iconClass)}>
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </div> */}

        <h2 className="relative mb-4 text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
          {titleAccent ? (
            <>
              <span className="text-primary">{titleAccent}</span> {title}
            </>
          ) : (
            title
          )}
        </h2>

        {highlights ? (
          <HighlightList items={highlights} />
        ) : (
          <p className="relative mb-5 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}

        <div className="relative flex-1">{panel}</div>

        <Link href={href} className="relative mt-6 block">
          <SecondaryButton title={cta} className="w-full! rounded-xl!" />
        </Link>
      </div>
    </article>
  );
}

const NewAbout = () => {
  return (
    <section className="container sec_mb px-4">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Why LearningShala
        </span>
        <MainHeading
          title="What Makes LearningShala Different?"
          className="text-center mb-2!"
        />
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
        Because our priority isn't selling courses, it's helping you make the right career choice!
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-5">
        {FEATURE_CARDS.map((feature) => (
          <FeatureCard key={feature.id} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default NewAbout;
