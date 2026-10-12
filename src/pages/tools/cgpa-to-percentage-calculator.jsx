import ToolInnerBanner from "@/components/tools/ToolInnerBanner";
import CGPAToPercentageCalculator from "@/components/tools/CGPAToPercentageCalculator";
import MainHeading from "@/components/custom/shared/MainHeading";
import { BadgeCheck, Sparkles } from "lucide-react";
import Head from "next/head";
import ToolsFaq from "@/components/tools/ToolsFaq";
import OtherTools from "@/components/tools/OtherTools";

const USEFUL_FOR = [
  "College and university students",
  "Campus placements",
  "Government and private job applications",
  "Higher education admissions",
  "Scholarship applications",
  "Educational credential verification",
];

const WHY_USE = [
  "Instant and accurate conversion",
  "Eliminates manual calculation errors",
  "Saves time during applications",
  "Useful for jobs, admissions, and scholarships",
  "Supports different university conversion formulas",
  "Works on desktop and mobile devices",
];

const CGPA_VS_PERCENTAGE = [
  {
    left: "Represents cumulative academic performance",
    right: "Represents marks out of 100",
  },
  {
    left: "Based on a grade point system",
    right: "Based on numerical marks",
  },
  {
    left: "Calculated across all semesters",
    right: "Commonly required by employers and institutions",
  },
  {
    left: "May differ across universities",
    right: "Easier to compare across different education systems",
  },
];

const FAQS = [
  {
    question: "What is CGPA?",
    answer:
      "CGPA (Cumulative Grade Point Average) is the overall average grade point obtained across all semesters or academic years of a course. It represents your cumulative academic performance.",
  },
  {
    question: "How do I convert CGPA to percentage?",
    answer:
      "Many universities use the following formula for the 10-point grade scale:\n\nPercentage = (CGPA × 10) − 7.5\nor\nPercentage = CGPA × 9.5\n\nHowever, some educational boards and universities prescribe different conversion formulas.",
  },
  {
    question: "Is the CGPA to percentage formula the same for every university?",
    answer:
      "No. Different universities and educational boards follow different conversion methods. For example, CBSE has historically used the formula Percentage = CGPA × 9.5, while many universities use (CGPA × 10) − 7.5 or other institution-specific formulas.",
  },
  {
    question: "What is the difference between CGPA and SGPA?",
    answer:
      "CGPA represents your overall academic performance across all semesters.\n\nSGPA represents your performance in a single semester.",
  },
  {
    question: "Can I use this calculator for any university?",
    answer:
      "Yes. The calculator can be used for general estimation. However, for official purposes such as admissions or recruitment, make sure you use your university's prescribed conversion formula.",
  },
  {
    question: "Why do employers ask for percentages instead of CGPA?",
    answer:
      "Many organizations and educational institutions use percentage-based eligibility criteria because percentages provide a standardized way to compare candidates from different universities and grading systems.",
  },
  {
    question: "Can my calculated percentage differ from my official marksheet?",
    answer:
      "Yes. Some universities apply credit-weighted calculations or other academic policies while converting CGPA into percentage. Therefore, the official percentage mentioned by your institution should always be considered final.",
  },
  {
    question: "Is this CGPA to Percentage Calculator free?",
    answer:
      "Yes. The calculator is completely free to use and provides unlimited conversions without requiring registration or login.",
  },
  {
    question: "How many Grade Scales are there for CGPA Calculation?",
    answer:
      "There are three common grade point scales used for CGPA calculation: 10-point scale, 5-point scale, and 4-point scale.",
  },
];

const CGPAtoPercentageCalculator = () => {
  return (
    <div>
      <Head>
        <title>CGPA To Percentage Calculator - Free Online Tool | LearningShala</title>
        <meta
          name="description"
          content="Convert CGPA to percentage instantly for college applications, jobs, and scholarships. Supports 10, 5, and 4-point scale formulas."
        />
        <link
          rel="canonical"
          href="https://learningshala.com/tools/cgpa-to-percentage-calculator/"
        />
      </Head>

      <ToolInnerBanner
        title="CGPA To Percentage Calculator"
        description="Use this tool to convert CGPA into a percentage while you are applying for higher studies, government jobs, and more."
        category="Academic"
      />

      <section className="container mx-auto px-4 py-8 md:py-10">

      <div className="grid grid-cols-12 gap-4">
<div className="col-span-12 lg:col-span-9">
<CGPAToPercentageCalculator />

<div className="space-y-8 mb-8">
  <div className="rounded-[22px] border border-[#e8e2d9] bg-white/90 p-5 sm:p-6">
    <MainHeading
      title="What Is a CGPA to Percentage Calculator?"
      className="mb-4! text-2xl!"
    />
    <p className="mb-4 text-sm leading-relaxed text-[#57534e] md:text-base">
      A CGPA to Percentage Calculator converts your Cumulative Grade Point Average
      (CGPA) into an equivalent percentage using your university&apos;s prescribed
      conversion formula.
    </p>
    <p className="mb-4 text-sm leading-relaxed text-[#57534e] md:text-base">
      Many schools, colleges, and universities in India award grades as CGPA, while
      employers, higher education institutions, and scholarship providers often
      require percentages.
    </p>
    <p className="mb-6 text-sm leading-relaxed text-[#57534e] md:text-base">
      Enter your CGPA, choose the applicable formula, and get your percentage instantly.
    </p>

    <div className="border-t border-[#e8e2d9] pt-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Sparkles className="h-4 w-4" strokeWidth={2} />
        </span>
        <p className="text-sm font-bold text-[#1a1a1a] md:text-base">
          This tool is useful for:
        </p>
      </div>
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {USEFUL_FOR.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <BadgeCheck
              className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
              strokeWidth={2.2}
            />
            <span className="text-sm leading-relaxed text-[#57534e]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>

  <div className="rounded-[22px] border border-[#e8e2d9] bg-white/90 p-5 sm:p-6">
    <MainHeading title="What Is CGPA?" className="mb-4! text-2xl!" />
    <p className="mb-4 text-sm leading-relaxed text-[#57534e] md:text-base">
      CGPA stands for Cumulative Grade Point Average. It reflects your academic
      performance across all semesters or years of a course.
    </p>
    <p className="text-sm leading-relaxed text-[#57534e] md:text-base">
      SGPA covers one semester; CGPA covers the entire course duration.
    </p>
  </div>

  <div className="rounded-[22px] border border-[#e8e2d9] bg-white/90 p-5 sm:p-6">
    <MainHeading
      title="How to Convert CGPA into Percentage?"
      className="mb-4! text-2xl!"
    />
    <p className="mb-6 text-sm leading-relaxed text-[#57534e] md:text-base">
      The formula varies based on the grade scale your university uses.
    </p>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[
        {
          scale: "10 Point Scale",
          formula: "Percentage = CGPA × 9.5",
          steps: ["CGPA = 8.6", "Percentage = 8.6 × 9.5", "Percentage = 81.7%"],
        },
        {
          scale: "5 Point Scale",
          formula: "Percentage = CGPA × 20",
          steps: ["CGPA = 4.2", "Percentage = 4.2 × 20", "Percentage = 84%"],
        },
        {
          scale: "4 Point Scale",
          formula: "Percentage = CGPA × 25",
          steps: ["CGPA = 3.6", "Percentage = 3.6 × 25", "Percentage = 90%"],
        },
      ].map(({ scale, formula, steps }) => (
        <div
          key={scale}
          className="rounded-2xl border border-[#e8e2d9] bg-[#fcfaf7] p-4"
        >
          <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#a8a29e]">
            {scale}
          </p>
          <p className="mb-4 text-sm font-bold text-emerald-700 md:text-base">
            {formula}
          </p>
          <p className="mb-3 text-sm font-semibold text-[#1a1a1a]">Example</p>
          <ol className="space-y-2 text-sm text-[#57534e] md:text-base">
            {steps.map((step, index) => (
              <li
                key={step}
                className={index === steps.length - 1 ? "font-bold text-emerald-600" : ""}
              >
                {step}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  </div>

  <div className="rounded-[22px] border border-[#e8e2d9] bg-white/90 p-5 sm:p-6">
    <MainHeading
      title="Why Use a CGPA to Percentage Calculator?"
      className="mb-4! text-2xl!"
    />
    <ul className="grid gap-3 md:grid-cols-2">
      {WHY_USE.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 rounded-xl border border-[#e8e2d9] bg-[#fcfaf7] px-4 py-3"
        >
          <BadgeCheck
            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
            strokeWidth={2.2}
          />
          <span className="text-sm leading-relaxed text-[#57534e] md:text-base">
            {item}
          </span>
        </li>
      ))}
    </ul>
  </div>

  <div className="rounded-[22px] border border-[#e8e2d9] bg-white/90 p-5 sm:p-6">
    <MainHeading title="CGPA Vs Percentage" className="mb-4! text-2xl!" />
    <div className="overflow-x-auto rounded-2xl border border-[#e8e2d9]">
      <table className="min-w-[640px] w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-[#fff1f2] to-[#fff8f8]">
            <th className="border-b border-[#e8e2d9] px-5 py-4 text-left text-sm font-bold text-[#0f172a] md:text-base">
              CGPA
            </th>
            <th className="border-b border-[#e8e2d9] px-5 py-4 text-left text-sm font-bold text-[#0f172a] md:text-base">
              Percentage
            </th>
          </tr>
        </thead>
        <tbody>
          {CGPA_VS_PERCENTAGE.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-[#fcfaf7]"}
            >
              <td className="border-b border-[#e8e2d9] px-5 py-4 text-sm text-[#57534e] md:text-base">
                {row.left}
              </td>
              <td className="border-b border-[#e8e2d9] px-5 py-4 text-sm text-[#57534e] md:text-base">
                {row.right}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

<ToolsFaq faqs={FAQS} />
  </div>
  <div className="col-span-12 lg:col-span-3">
  <OtherTools/>
</div>
</div>
      
      </section>
    </div>
  );
};

export default CGPAtoPercentageCalculator;
