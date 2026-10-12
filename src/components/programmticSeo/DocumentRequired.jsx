import { Camera, FileText, PencilLine, IdCard, BadgeCheck, Briefcase, Hash, Shield, User } from "lucide-react";
import React from "react";
import UniversityContentHeading from "../universitypage/UniversityContentHeading";
import Link from "next/link";

const DOCS = [
  {
    key: "passport_photo",
    title: "Passport-size Photo",
    optional: false,
    icon: Camera,
    iconClass: "text-[#2563eb]",
    bgClass: "bg-[#dbeafe]",
  },
  {
    key: "signature",
    title: "Signature",
    optional: false,
    icon: PencilLine,
    iconClass: "text-[#7c3aed]",
    bgClass: "bg-[#ede9fe]",
  },
  {
    key: "marksheet_10th",
    title: "10th Marksheet",
    optional: false,
    icon: FileText,
    iconClass: "text-[#ea580c]",
    bgClass: "bg-[#ffedd5]",
  },
  {
    key: "marksheet_12th",
    title: "12th Marksheet",
    optional: false,
    icon: FileText,
    iconClass: "text-[#16a34a]",
    bgClass: "bg-[#dcfce7]",
  },
  {
    key: "grad_pg_cert",
    title: "Graduation Certificate (PG level)",
    optional: false,
    icon: BadgeCheck,
    iconClass: "text-[#7c3aed]",
    bgClass: "bg-[#f3e8ff]",
  },
  {
    key: "aadhaar",
    title: "Aadhaar",
    optional: false,
    icon: IdCard,
    iconClass: "text-[#0d9488]",
    bgClass: "bg-[#ccfbf1]",
  },
  {
    key: "pan",
    title: "PAN",
    optional: false,
    icon: Hash,
    iconClass: "text-[#dc2626]",
    bgClass: "bg-[#fee2e2]",
  },
  {
    key: "experience",
    title: "Experience Certificate (optional)",
    optional: true,
    icon: Briefcase,
    iconClass: "text-[#4f46e5]",
    bgClass: "bg-[#e0e7ff]",
  },
  {
    key: "ABC ID / DEB ID / APAAR ID",
    title: <><Link className="text-blue-500" href="https://learningshala.com/blog/what-is-abc-id-full-form-how-to-create/">ABC ID</Link> | <Link className="text-blue-500" href="https://learningshala.com/blog/what-is-deb-id-and-how-to-generate-online/">DEB ID</Link> | <Link className="text-blue-500" href="https://learningshala.com/blog/what-is-apaar-id-full-form-how-to-generate-and-download/">APAAR ID</Link></>,
    optional: false,
    icon: IdCard,
    iconClass: "text-[#4f46e5]",
    bgClass: "bg-[#e0e7ff]",
  },
  {
    key: "Caste Certificate (optional)",
    title: "Caste Certificate (optional)",
    optional: true,
    icon: User,
    iconClass: "text-[#4f46e5]",
    bgClass: "bg-[#e0e7ff]",
  },
];

const DocumentRequired = ({ id, title }) => {
  return (
    <div id={id} className="content_card">
      <UniversityContentHeading title={title} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {DOCS.map((doc) => {
          const Icon = doc.icon;
          return (
            <div
              key={doc.key}
              className="flex items-center gap-3 rounded-2xl border border-[#ece7df] bg-white p-4"
            >
              <span
                className={`mt-0.5 inline-flex size-10 items-center justify-center rounded-2xl ${doc.bgClass}`}
              >
                <Icon className={`size-5 ${doc.iconClass}`} strokeWidth={2.2} />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-[#1a1a1a] mb-0!">
                    {doc.optional ? doc.title.replace(" (optional)", "") : doc.title}
                  </p>
                  {doc.optional ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#f3f4f6] px-2 py-0.5 text-[11px] font-semibold text-[#6b7280]">
                      <Shield className="size-3" strokeWidth={2.2} />
                      Optional
                    </span>
                  ) : null}
                </div>
                {/* <p className="mt-1 text-xs leading-relaxed text-[#6b7280]">
                  Upload/submit document as per the partner onboarding requirements.
                </p> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentRequired;
