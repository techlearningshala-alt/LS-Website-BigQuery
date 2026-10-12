import React from "react";
import UniversityContentHeading from "../universitypage/UniversityContentHeading";
import {
  PhoneCall,
  FileText,
  ShieldCheck,
  BarChart2,
  Award,
  HeartHandshake,
} from "lucide-react";

const HELP_ITEMS = [
  {
    icon: PhoneCall,
    title: "Free Counselling",
    description:
      "Connect with our verified mentors for personalized guidance. Get unbiased advice to choose the right university and course based on your career goals.",
    color: "bg-blue-50 text-blue-600",
    border: "border-blue-100",
  },
  {
    icon: FileText,
    title: "Application Support",
    description:
      "Our team assists you throughout the admission process, so that you can avoid common mistakes and ensure a smooth application experience.",
    color: "bg-violet-50 text-violet-600",
    border: "border-violet-100",
  },
  {
    icon: ShieldCheck,
    title: "Document Verification",
    description:
      "We help you verify and organize all the required documents before submission, reducing the chances of delays or application rejection.",
    color: "bg-emerald-50 text-emerald-600",
    border: "border-emerald-100",
  },
  {
    icon: BarChart2,
    title: "Admission Tracking",
    description:
      "Stay updated at every stage of your admission. Our team keeps track of your application status and informs you about approvals, pending actions, and important updates.",
    color: "bg-orange-50 text-orange-600",
    border: "border-orange-100",
  },
  {
    icon: Award,
    title: "Scholarship Guidance",
    description:
      "Explore available scholarships, fee waivers, and financial assistance options. We help you identify opportunities that can reduce your education costs.",
    color: "bg-yellow-50 text-yellow-600",
    border: "border-yellow-100",
  },
  {
    icon: HeartHandshake,
    title: "Post Admission Support",
    description:
      "Our support doesn't end after admission. We assist you with LMS activation, onboarding, academic queries, and university-related concerns throughout your learning journey.",
    color: "bg-rose-50 text-rose-600",
    border: "border-rose-100",
  },
];

const HowWeHelpYou = ({ id, title, universityData }) => {
  return (
    <div id={id} className="content_card">
      <UniversityContentHeading title={title} />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {HELP_ITEMS.map(({ icon: Icon, title: cardTitle, description, color, border }) => (
          <div
            key={cardTitle}
            className={`flex flex-col gap-4 rounded-2xl border ${border} bg-white p-5 shadow-sm transition-shadow hover:shadow-md`}
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${color} shrink-0`}
            >
              <Icon className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <div>
              <h3 className="mb-1.5 text-[15px] font-bold text-[#1a1a1a]">
                {cardTitle}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowWeHelpYou;
