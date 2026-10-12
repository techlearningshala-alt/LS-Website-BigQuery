import React from "react";
import UniversityContentHeading from "../universitypage/UniversityContentHeading";
import {
  GraduationCap,
  BookOpen,
  Briefcase,
  Globe2,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CRITERIA = [
  {
    key: "ug",
    level: "UG Courses",
    eligibility: "10+2 from a recognized board",
    icon: BookOpen,
    iconClass: "text-blue-600",
    bgClass: "bg-blue-50",
    ringClass: "ring-blue-100",
    badge: "Undergraduate",
    badgeClass: "bg-blue-50 text-blue-700",
  },
  {
    key: "pg",
    level: "PG Courses",
    eligibility: "Bachelor's degree from a recognized university",
    icon: GraduationCap,
    iconClass: "text-violet-600",
    bgClass: "bg-violet-50",
    ringClass: "ring-violet-100",
    badge: "Postgraduate",
    badgeClass: "bg-violet-50 text-violet-700",
  },
  {
    key: "work_exp",
    level: "Work Experience",
    eligibility: "If applicable (Varies at Course-level)",
    icon: Briefcase,
    iconClass: "text-amber-700",
    bgClass: "bg-amber-50",
    ringClass: "ring-amber-100",
    badge: "Optional",
    badgeClass: "bg-amber-50 text-amber-800",
  },
  {
    key: "international",
    level: "International Students",
    eligibility: "Eligible with Required Documents",
    icon: Globe2,
    iconClass: "text-emerald-600",
    bgClass: "bg-emerald-50",
    ringClass: "ring-emerald-100",
    badge: "Global",
    badgeClass: "bg-emerald-50 text-emerald-700",
  },
];

const EligibilityCriteria = ({ id, title }) => {
  return (
    <div id={id} className="content_card">
      <UniversityContentHeading title={title} />

      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
        Check the minimum academic and document requirements before applying.
        Course-specific criteria may apply.
      </p>

      {/* Desktop / tablet table */}
      <div className="hidden overflow-hidden rounded-2xl border border-[#ece7df] bg-white shadow-sm sm:block">
        <div className="grid grid-cols-[minmax(200px,0.9fr)_1.4fr] items-center gap-4 border-b border-[#ece7df] bg-[#fcfaf7] px-5 py-3.5">
          <p className="text-[11px] font-semibold uppercase text-[#9a948c]">
            Course Level
          </p>
          <p className="text-[11px] font-semibold uppercase text-[#9a948c]">
            Eligibility
          </p>
        </div>

        {CRITERIA.map(
          (
            { key, level, eligibility, icon: Icon, iconClass, bgClass, ringClass, badge, badgeClass },
            index
          ) => (
            <div
              key={key}
              className={cn(
                "grid grid-cols-[minmax(200px,0.9fr)_1.4fr] items-center gap-4 px-5 py-4 transition-colors hover:bg-[#fcfaf7]",
                index !== CRITERIA.length - 1 && "border-b border-[#ece7df]"
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1",
                    bgClass,
                    iconClass,
                    ringClass
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="font-bold text-[#1a1a1a] mb-0!">{level}</p>
                  {/* <span
                    className={cn(
                      "mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                      badgeClass
                    )}
                  >
                    {badge}
                  </span> */}
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <p className="text-sm font-medium leading-relaxed text-[#374151] sm:text-[15px]">
                  {eligibility}
                </p>
              </div>
            </div>
          )
        )}
      </div>

      {/* Mobile cards */}
      <div className="grid grid-cols-1 gap-3 sm:hidden">
        {CRITERIA.map(
          ({
            key,
            level,
            eligibility,
            icon: Icon,
            iconClass,
            bgClass,
            ringClass,
            badge,
            badgeClass,
          }) => (
            <div
              key={key}
              className="rounded-2xl border border-[#ece7df] bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1",
                    bgClass,
                    iconClass,
                    ringClass
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-[14px]! mb-0! font-semibold  text-[#9a948c]">
                    Course Level
                  </p>
                  <p className="font-bold text-[#1a1a1a] mb-0!">{level}</p>
                </div>
                {/* <span
                  className={cn(
                    "ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                    badgeClass
                  )}
                >
                  {badge}
                </span> */}
              </div>
              <div className="rounded-xl bg-[#fcfaf7] px-3.5 py-3">
                <p className="mb-1 text-[11px] font-semibold uppercase text-[#9a948c]">
                  Eligibility
                </p>
                <p className="flex items-start gap-2 text-sm font-medium leading-relaxed text-[#374151]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  {eligibility}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default EligibilityCriteria;
