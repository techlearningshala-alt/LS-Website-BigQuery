import {
  BookOpen,
  Check,
  CreditCard,
  FileText,
  GraduationCap,
  MonitorPlay,
  PenLine,
  ShieldCheck,
} from "lucide-react";
import React from "react";
import UniversityContentHeading from "../universitypage/UniversityContentHeading";

const STEPS = [
  {
    label: "Register",
    description: "Create your account on the university portal.",
    icon: PenLine,
    color: "bg-[#dbeafe]",
    iconColor: "text-[#2563eb]",
    dotColor: "bg-[#2563eb]",
  },
  {
    label: "Fill Form",
    description: "Fill in your personal, academic and contact details.",
    icon: FileText,
    color: "bg-[#ede9fe]",
    iconColor: "text-[#7c3aed]",
    dotColor: "bg-[#7c3aed]",
  },
  {
    label: "Upload Documents",
    description: "Upload all required documents (Aadhaar, PAN, Marksheets, Photo).",
    icon: BookOpen,
    color: "bg-[#ffedd5]",
    iconColor: "text-[#ea580c]",
    dotColor: "bg-[#ea580c]",
  },
  {
    label: "Fee Payment",
    description: "Pay admission fee securely via UPI, Net Banking or EMI.",
    icon: CreditCard,
    color: "bg-[#dcfce7]",
    iconColor: "text-[#16a34a]",
    dotColor: "bg-[#16a34a]",
  },
  {
    label: "Verification",
    description: "University team verifies your documents and eligibility.",
    icon: ShieldCheck,
    color: "bg-[#f3e8ff]",
    iconColor: "text-[#9333ea]",
    dotColor: "bg-[#9333ea]",
  },
  {
    label: "Admission Confirmation",
    description: "Receive your official admission confirmation and enrollment ID.",
    icon: GraduationCap,
    color: "bg-[#ccfbf1]",
    iconColor: "text-[#0d9488]",
    dotColor: "bg-[#0d9488]",
  },
  {
    label: "LMS Access",
    description: "Get access to the Learning Management System and start studying.",
    icon: MonitorPlay,
    color: "bg-[#fee2e2]",
    iconColor: "text-[#dc2626]",
    dotColor: "bg-[#dc2626]",
  },
];

const VisualTimeline = ({ id, title }) => {
  return (
    <div id={id} className="content_card">
      <UniversityContentHeading title={title} />

     

      {/* Desktop horizontal strip */}
      <div className="mb-8 hidden overflow-x-auto md:block">
        <div className="flex min-w-max items-start gap-0">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === STEPS.length - 1;
            return (
              <div key={step.label} className="flex flex-1 items-start">
                <div className="flex min-w-[130px] flex-1 flex-col items-center text-center">
                  <span
                    className={`mb-3 inline-flex size-12 items-center justify-center rounded-2xl ${step.color}`}
                  >
                    <Icon className={`size-6 ${step.iconColor}`} strokeWidth={2.25} />
                  </span>

                  {/* <div className="flex items-center">
                    <span
                      className={`flex size-6 items-center justify-center rounded-full text-[11px] font-bold text-white ${step.dotColor}`}
                    >
                      {index + 1}
                    </span>
                  </div> */}

                  <p className="mt-2 text-[13px] font-bold leading-tight text-[#1a1a1a]">
                    {step.label}
                  </p>
                  {/* <p className="mt-1 max-w-[110px] text-[11px] leading-relaxed text-[#6b7280]">
                    {step.description}
                  </p> */}
                </div>

                {!isLast ? (
                  <div className="flex flex-1 items-center pt-6">
                    <div className="h-0.5 w-full border-t-2 border-dashed border-[#d1d5db]" />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="flex flex-col gap-0 md:hidden">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === STEPS.length - 1;
          return (
            <div key={step.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={`inline-flex size-10 shrink-0 items-center justify-center rounded-2xl ${step.color}`}
                >
                  <Icon className={`size-5 ${step.iconColor}`} strokeWidth={2.25} />
                </span>
                {!isLast ? (
                  <div className="my-1 w-0.5 flex-1 border-l-2 border-dashed border-[#d1d5db]" />
                ) : null}
              </div>

              <div className={`pb-5 ${isLast ? "pb-0" : ""}`}>
                <div className="flex items-center gap-2">
                  {/* <span
                    className={`flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-white ${step.dotColor}`}
                  >
                    {index + 1}
                  </span> */}
                  <p className="text-sm font-bold text-[#1a1a1a]">{step.label}</p>
                </div>
                {/* <p className="mt-1 text-xs leading-relaxed text-[#6b7280]">
                  {step.description}
                </p> */}
              </div>
            </div>
          );
        })}
      </div>

   
    </div>
  );
};

export default VisualTimeline;
