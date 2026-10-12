import React from 'react'
import { CircleGauge, Headphones, Star, UsersRound } from "lucide-react";
import MainHeading from '../custom/shared/MainHeading';

const WhyWe = () => {
  const stats = [
    {
      icon: UsersRound,
      value: "1 Lakh+",
      label: "Students in Community",
    },
    {
      icon: Headphones,
      value: "24/7",
      label: "Support Available",
    },
    {
      icon: CircleGauge,
      value: "500+",
      label: "Industry Mentors",
    },
    {
      icon: Star,
      value: "95%",
      label: "Student Satisfaction",
    },
  ];

  return (
    <section className=" sec_mb">
      <div className="text-center mb-8">
        <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary mb-3">
          Our Impact
        </span>
      
        <MainHeading title="Stats That Matter" className="text-center !mb-2" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 text-center shadow-sm min-h-[165px] relative overflow-hidden"
            >
              <span className="pointer-events-none absolute -top-8 -right-8 h-16 w-16 rounded-full bg-primary/5" />

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-md">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-2xl md:text-2xl font-bold text-primary mb-1">
                {item.value}
              </h3>
              <p className="text-xs md:text-sm text-slate-600">{item.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  )
}

export default WhyWe