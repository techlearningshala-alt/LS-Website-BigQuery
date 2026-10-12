import React from "react";
import UniversityContentHeading from "../universitypage/UniversityContentHeading";
import {
  Wallet,
  CalendarDays,
  CreditCard,
  BadgePercent,
  FileText,
  ShieldCheck,
  Clock,
  IndianRupee,
} from "lucide-react";
import { cn } from "@/lib/utils";
import formatFee from "@/lib/formatFee";

function displayFee(value) {
  if (value == null || value === "") return null;
  const num = Number(value);
  if (!isNaN(num) && String(value).trim() !== "") {
    return formatFee(num);
  }
  return value;
}

const FeeHighlights = ({ id, title, courseData, universityDetailData }) => {
  const fees = courseData?.fee_type_values ?? courseData?.fees ?? {};
  // console.log(courseData,'courseData');
  

  const cards = [
    {
      key: "semester_fee",
      label: "Semester Fee",
      value: displayFee(fees?.semester_fee) ?? "Flexible",
      sub: "",
      icon: CalendarDays,
      iconClass: "text-blue-600",
      bgClass: "bg-blue-500/10",
      ringClass: "ring-blue-500/15",
      accentClass: "from-blue-500/80 via-blue-400/40 to-transparent",
    },
    {
      key: "full_fee",
      label: "Total Course Fee",
      value: displayFee(fees?.full_fee) ?? "On Request",
      sub: "",
      icon: Wallet,
      iconClass: "text-rose-600",
      bgClass: "bg-rose-500/10",
      ringClass: "ring-rose-500/15",
      accentClass: "from-rose-500/80 via-rose-400/40 to-transparent",
      featured: true,
    },
   
    {
      key: "emi_monthly",
      label: "EMI Starts At",
      value: displayFee(fees?.emi_monthly) ?? "₹7,292",
      sub: "/month",
      icon: CreditCard,
      iconClass: "text-amber-600",
      bgClass: "bg-amber-500/10",
      ringClass: "ring-amber-500/20",
      accentClass: "from-amber-500 via-orange-400/50 to-transparent",
      featured: true,
    },
    {
      key: "duration",
      label: "Duration",
      value: displayFee(courseData?.duration) ?? "Included",
      sub: "",
      icon: Clock,
      iconClass: "text-violet-600",
      bgClass: "bg-violet-500/10",
      ringClass: "ring-violet-500/15",  
      accentClass: "from-violet-500/80 via-violet-400/40 to-transparent",
    },
    {
      key: "scholarship",
      label: "Scholarship",
      value: courseData?.scholarship_provides ? courseData?.scholarship_provides : universityDetailData?.scholarship_provides ? universityDetailData?.scholarship_provides : "Available",
      sub: "",
      icon: BadgePercent,
      iconClass: "text-emerald-600",
      bgClass: "bg-emerald-500/10",
      ringClass: "ring-emerald-500/15",
      accentClass: "from-emerald-500/80 via-emerald-400/40 to-transparent",
    },
    {
      key: "hidden",
      label: "Registration Fee",
      value: displayFee(fees?.registration_fee) ?? "-",
      sub: "",
      icon: IndianRupee,
      iconClass: "text-slate-700",
      bgClass: "bg-slate-500/10",  
      ringClass: "ring-slate-500/15",
      accentClass: "from-slate-600/70 via-slate-400/30 to-transparent",
    },
  ];

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
          {cards.map(
            ({
              key,
              label,
              value,
              sub,
              icon: Icon,
              iconClass,
              bgClass,
              ringClass,
              accentClass,
              featured,
            }) => (
              <div
                key={key}
                className={cn(
                  "group relative overflow-hidden rounded-[22px] border border-[#e8e2d9] bg-white/90 p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(15,23,42,0.1)]",
                  featured &&
                    "border-amber-200/60 bg-gradient-to-br from-[#fffbeb] via-white to-[#fff7ed]"
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
                    accentClass
                  )}
                  aria-hidden
                />
                <div className="relative flex items-start gap-4">
                  <span
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1",
                      bgClass,
                      iconClass,
                      ringClass
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold mb-1! text-[#9a948c]">
                      {label}
                    </p>
                    <p
                      className={cn(
                        "mt-1.5 mb-0! flex flex-wrap items-center gap-0.5 font-bold leading-snug text-[#1a1a1a]",
                        featured
                          ? "text-lg tracking-tight sm:text-xl"
                          : "text-[15px] sm:text-base"
                      )}
                    >
                      {value}{sub}
                    </p>
                    {/* <p className="mt-1 text-xs text-muted-foreground">{sub}</p> */}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FeeHighlights;
