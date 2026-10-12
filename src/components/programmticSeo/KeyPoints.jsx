import React from "react";
import UniversityContentHeading from "../universitypage/UniversityContentHeading";
import {
  CircleDot,
  MonitorSmartphone,
  CalendarRange,
  IndianRupee,
  BadgeCheck,
  UserRound,
  Percent,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

function PointCard({
  pointKey,
  label,
  value,
  icon: Icon,
  iconClass,
  bgClass,
  ringClass,
  accentClass,
  glowClass,
  featured,
}) {
  return (



    <div
      className={cn(
        "group relative overflow-hidden rounded-[22px] border border-[#e8e2d9] bg-white/90 p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(15,23,42,0.1)]",
        glowClass,
        featured &&
          "border-amber-200/60 bg-gradient-to-br from-[#fffbeb] via-white to-[#fff7ed] sm:col-span-2 lg:col-span-1",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
          accentClass,
        )}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary/5 to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative flex items-start gap-4">
        <span
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1",
            bgClass,
            iconClass,
            ringClass,
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[8px] font-semibold">{label}</p>
          <p
            className={cn(
              "mt-1.5 line-clamp-2 font-bold leading-snug text-[#1a1a1a]",
              featured
                ? "text-lg tracking-tight sm:text-xl"
                : "text-[15px] sm:text-base",
            )}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

const KeyPoints = ({ id, title, universityData }) => {


// console.log(universityData,'universityData');


  return (
    <div id={id} className="content_card">
      <UniversityContentHeading title={title} />

      <div className="relative mt-6 overflow-hidden rounded-[28px] border border-[#e8e2d9]/80 bg-gradient-to-br from-[#fcfaf7] via-white to-[#f8f6f2] p-4 shadow-[0_12px_40px_rgba(15,23,42,0.06)] sm:p-6 md:p-7">
        <div
          className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-primary/5 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl"
          aria-hidden
        />

        <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          <PointCard
            pointKey="admission_status"
            label="Admission Status"
            value="Open"
            icon={CircleDot}
            iconClass="text-blue-600"
            bgClass="bg-blue-500/10"
            ringClass="ring-blue-500/15"
            accentClass="from-blue-500/80 via-blue-400/40 to-transparent"
            glowClass="group-hover:shadow-blue-500/10"
          />
          <PointCard
            pointKey="admission_mode"
            label="Admission Mode"
            value={universityData?.admission_mode}
            icon={MonitorSmartphone}
            iconClass="text-blue-600"
            bgClass="bg-blue-500/10"
            ringClass="ring-blue-500/15"
            accentClass="from-blue-500/80 via-blue-400/40 to-transparent"
            glowClass="group-hover:shadow-blue-500/10"
          />
           <PointCard
            pointKey="scholarship"
            label="Scholarship"
            value={universityData?.scholarship_provides}
            icon={Percent}  
            iconClass="text-amber-600"
            bgClass="bg-amber-500/10"
            ringClass="ring-amber-500/15"
            accentClass="from-amber-500/80 via-amber-400/40 to-transparent"
            glowClass="group-hover:shadow-amber-500/10"
          />
             <PointCard
            pointKey="approval"
            label="Approval"
            value={universityData?.approvals
              .map((approval) => approval.title)
              .join(", ")}
            icon={BadgeCheck}
            iconClass="text-rose-600"
            bgClass="bg-rose-500/10"
            ringClass="ring-rose-500/15"
            accentClass="from-rose-500/80 via-rose-400/40 to-transparent"
            glowClass="group-hover:shadow-rose-500/10"
          />
          <PointCard
            pointKey="course_duration"
            label="Course Duration"
            value="UG - 3 Years | PG - 2 Years "
            icon={CalendarRange}
            iconClass="text-violet-600"
            bgClass="bg-violet-500/10"
            ringClass="ring-violet-500/15"
            accentClass="from-violet-500/80 via-violet-400/40 to-transparent"
            glowClass="group-hover:shadow-violet-500/10"
          />
          <PointCard
            pointKey="emi_starts"
            label="EMI Starts"
            value="₹7,292/month"
            icon={IndianRupee}
            iconClass="text-amber-600"
            bgClass="bg-amber-500/10"
            ringClass="ring-amber-500/20"
            accentClass="from-amber-500 via-orange-400/50 to-transparent"
            glowClass="group-hover:shadow-amber-500/15"
            featured
          />
       
          <PointCard
            pointKey="age_limit"
            label="Age Limit"
            value="No"
            icon={UserRound}
            iconClass="text-slate-700"
            bgClass="bg-slate-500/10"
            ringClass="ring-slate-500/15"
            accentClass="from-slate-600/70 via-slate-400/30 to-transparent"
            glowClass="group-hover:shadow-slate-500/10"
          />
           <PointCard
            pointKey="Eligibility"
            label="Eligibility"
            value="10+2 / Graduation"
            icon={CheckCircle}
            iconClass="text-green-600"
            bgClass="bg-green-500/10"
            ringClass="ring-green-500/15"
            accentClass="from-green-500/80 via-green-400/40 to-transparent"
            glowClass="group-hover:shadow-green-500/10"
          />
        </div>
      </div>
    </div>
  );
};

export default KeyPoints;
