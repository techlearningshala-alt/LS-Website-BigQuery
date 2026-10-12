import React from 'react'
import {
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  Headphones,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import MainHeading from '../custom/shared/MainHeading';

const AdmissionToSuccess = () => {
  const steps = [
    {
      title: "Admission",
      description: "Guided enrolment with document support",
      icon: GraduationCap,
    },
    {
      title: "Onboarding",
      description: "LMS access, welcome kit & orientation",
      icon: Sparkles,
    },
    {
      title: "Learning",
      description: "Assignments prep, exam slot, live session updates",
      icon: BookOpen,
    },
    {
      title: "Support",
      description: "24/7 help desk, mentors on call",
      icon: Headphones,
    },
    {
      title: "Placement",
      description: "Interview prep, referrals & job drives",
      icon: BriefcaseBusiness,
    },
    {
      title: "Success",
      description: "Lifelong alumni network & mentorship",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-[#f8fafc] px-4 py-8 md:px-8 md:py-10 sec_mb">
      <div className="text-center mb-8">
        <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary mb-3">
        Your Journey Our Support
        </span>
     
        <MainHeading title="From Admission to Career" className="text-center !mb-2" />
        <p className="text-slate-600">
        We walk with you at every milestone of your online learning journey.

        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.title} className="relative">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center min-h-[170px] shadow-sm">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-md">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-5">{step.description}</p>
              </div>

              {!isLast && (
                <span className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-primary/40 text-xl">
                  →
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  )
}

export default AdmissionToSuccess