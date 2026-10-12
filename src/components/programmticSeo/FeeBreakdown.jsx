import React from "react";
import UniversityContentHeading from "../universitypage/UniversityContentHeading";
import { IndianRupee } from "lucide-react";
import formatFee from "@/lib/formatFee";
import { cn } from "@/lib/utils";

function formatValue(value) {
  if (value == null || value === "") return "—";
  const num = Number(value);
  if (!isNaN(num) && String(value).trim() !== "") {
    return formatFee(num);
  }
  return value;
}

const ROWS = [
  { key: "full_fee", label: "Total / Full Fee", hint: "Entire programme cost" },
  { key: "semester_fee", label: "Semester Fee", hint: "Payable each semester" },
  { key: "registration_fee", label: "Registration Fee", hint: "One-time admission fee" },
  { key: "exam_fee_sem_wise", label: "Exam Fee (Per Sem)", hint: "Semester examination charges" },
  { key: "emi_monthly", label: "Monthly EMI", hint: "Approx. no-cost EMI", highlight: true },
];

const FeeBreakdown = ({ id, title, courseData }) => {
  const fees = courseData?.fee_type_values ?? courseData?.fees ?? {};
  const specializations = courseData?.specialization_data ?? [];

  const hasAnyFee = ROWS.some(({ key }) => fees?.[key]);

  return (
    <div id={id} className="content_card">
      <UniversityContentHeading title={title} />

      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
        Transparent fee breakup for {courseData?.h1Tag || courseData?.name || "this programme"}.
        Exact amounts may vary by specialization and scholarship eligibility.
      </p>

      {hasAnyFee ? (
        <div className="overflow-hidden rounded-2xl border border-[#ece7df] bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-[#ece7df] bg-[#fcfaf7] px-4 py-3.5 sm:px-5">
            <p className="text-sm font-bold text-[#1a1a1a]">Fee Component</p>
            <p className="text-sm font-bold text-[#1a1a1a]">Amount</p>
          </div>
          <ul>
            {ROWS.map(({ key, label, hint, highlight }, index) => {
              if (!fees?.[key] && key !== "full_fee" && key !== "emi_monthly") {
                return null;
              }
              const value = formatValue(fees?.[key]);
              return (
                <li
                  key={key}
                  className={cn(
                    "flex items-center justify-between gap-4 px-4 py-4 sm:px-5",
                    index !== ROWS.length - 1 && "border-b border-[#ece7df]",
                    highlight && "bg-[#fff8f6]"
                  )}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#1a1a1a]">{label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
                  </div>
                  <p
                    className={cn(
                      "flex shrink-0 items-center gap-0.5 text-sm font-bold sm:text-base",
                      highlight ? "text-primary" : "text-[#1a1a1a]"
                    )}
                  >
                    {value}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#ece7df] bg-[#fcfaf7] px-5 py-8 text-center">
          <IndianRupee className="mx-auto mb-2 h-8 w-8 text-primary/70" />
          <p className="text-sm font-semibold text-[#1a1a1a]">
            Fee details available on counselling
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Connect with our counsellor for the latest fee sheet and EMI plans.
          </p>
        </div>
      )}

      {specializations?.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 text-base font-bold text-[#1a1a1a] sm:text-lg">
            Specialization-wise Fees
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#ece7df]">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#ece7df] bg-[#fcfaf7]">
                  <th className="px-4 py-3.5 font-bold text-[#1a1a1a]">Specialization</th>
                  <th className="px-4 py-3.5 font-bold text-[#1a1a1a]">Semester / Full Fee</th>
                  <th className="px-4 py-3.5 font-bold text-[#1a1a1a]">EMI / Month</th>
                  <th className="px-4 py-3.5 font-bold text-[#1a1a1a]">Duration</th>
                </tr>
              </thead>
              <tbody>
                {specializations.map((item, index) => (
                  <tr
                    key={item?.slug || item?.id || index}
                    className="border-b border-[#ece7df] last:border-b-0 transition-colors hover:bg-[#fcfaf7]"
                  >
                    <td className="px-4 py-3.5 font-semibold text-[#1a1a1a]">
                      {item?.name}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center font-semibold">
                        {item?.fees?.semester_fee
                          ? formatFee(item.fees.semester_fee)
                          : formatFee(item?.fees?.full_fee)}
                        {item?.fees?.semester_fee ? (
                          <span className="ml-1 text-xs font-medium text-muted-foreground">
                            /sem
                          </span>
                        ) : null}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-primary">
                      {item?.fees?.emi_monthly
                        ? formatFee(item.fees.emi_monthly)
                        : "—"}
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground">
                      {item?.duration || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeBreakdown;
