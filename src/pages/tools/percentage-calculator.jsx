import ToolInnerBanner from "@/components/tools/ToolInnerBanner";
import PercentageCalculatorTool from "@/components/tools/PercentageCalculatorTool";
import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  BarChart3,
  BookOpen,
  Calculator,
  GraduationCap,
  Landmark,
  LineChart,
  MonitorSmartphone,
  Percent,
  Receipt,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Head from "next/head";
import React from "react";
import MainHeading from "@/components/custom/shared/MainHeading";
import ToolsFaq from "@/components/tools/ToolsFaq";
import OtherTools from "@/components/tools/OtherTools";

function FormulaBox({ label, formula }) {
  return (
    <div className="rounded-[22px] border border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-[#f0fdf4] p-5 text-center shadow-sm sm:p-6">
      {label && (
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700/70">
          {label}
        </p>
      )}
      <p className="text-base font-bold text-emerald-800 md:text-lg">
        {formula}
      </p>
    </div>
  );
}

function ExampleCard({
  title,
  steps,
  accentClass = "from-emerald-500/80 via-emerald-400/40 to-transparent",
}) {
  return (
    <div className="group relative overflow-hidden rounded-[22px] border border-[#e8e2d9] bg-white/95 p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(15,23,42,0.08)]">
      <div />
      <p className="mb-4 text-sm font-bold uppercase tracking-wide text-[#a8a29e]">
        {title}
      </p>
      <ol className="space-y-2.5">
        {steps.map((step, index) => (
          <li
            key={index}
            className={cn(
              "flex items-start gap-3 text-sm leading-relaxed md:text-base",
              step.highlight ? "font-bold text-emerald-600" : "text-[#57534e]",
            )}
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f5f5f4] text-[11px] font-bold text-[#78716c]">
              {index + 1}
            </span>
            <span>{step.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function BenefitCard({ title, icon: Icon }) {
  return (
    <li>
      <div />
      <div className="relative flex items-start gap-3.5">
        <div className="min-w-0 flex-1 pt-1">
          <p className="text-sm  sm:text-[15px] flex items-center gap-2">
            <BadgeCheck
              className="h-4 w-4 shrink-0 text-emerald-500"
              strokeWidth={2.2}
            />{" "}
            {title}
          </p>
        </div>
      </div>
    </li>
  );
}

function UseCaseCard({
  title,
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
        "group relative overflow-hidden rounded-[22px] border border-[#e8e2d9] bg-white/90 p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(15,23,42,0.1)] sm:p-5",
        glowClass,
        featured &&
          "border-amber-200/60 bg-gradient-to-br from-[#fffbeb] via-white to-[#fff7ed]",
      )}
    >
    
      <div className="relative flex items-center gap-3.5">
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1 sm:h-12 sm:w-12",
            bgClass,
            iconClass,
            ringClass,
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <p className="text-sm font-bold leading-snug text-[#1a1a1a] sm:text-[15px]">
          {title}
        </p>
      </div>
    </div>
  );
}

const HELPS_YOU = [
  "Find the percentage of a number",
  "Calculate percentage increase or decrease",
  "Determine what percentage one value is of another",
  "Calculate discounts and savings",
  "Compute tax, GST, and commissions",
  "Analyze exam scores and business data",
];

const PERCENT_EXAMPLES = [
  "50% means 50 out of every 100",
  "25% means 25 out of every 100",
  "100% means the complete value",
];

const WHY_USE_BENEFITS = [
  {
    title: "Provides instant and accurate results",
    icon: Zap,
    iconClass: "text-amber-600",
    bgClass: "bg-amber-500/10",
    ringClass: "ring-amber-500/15",
    accentClass: "from-amber-500 via-orange-400/50 to-transparent",
    glowClass: "group-hover:shadow-amber-500/10",
    featured: true,
  },
  {
    title: "Useful for students, professionals, and businesses",
    icon: Users,
    iconClass: "text-blue-600",
    bgClass: "bg-blue-500/10",
    ringClass: "ring-blue-500/15",
    accentClass: "from-blue-500/80 via-blue-400/40 to-transparent",
    glowClass: "group-hover:shadow-blue-500/10",
  },
  {
    title: "Eliminates manual calculation mistakes",
    icon: ShieldCheck,
    iconClass: "text-emerald-600",
    bgClass: "bg-emerald-500/10",
    ringClass: "ring-emerald-500/15",
    accentClass: "from-emerald-500/80 via-emerald-400/40 to-transparent",
    glowClass: "group-hover:shadow-emerald-500/10",
  },
  {
    title: "Assists in exam result calculations",
    icon: GraduationCap,
    iconClass: "text-violet-600",
    bgClass: "bg-violet-500/10",
    ringClass: "ring-violet-500/15",
    accentClass: "from-violet-500/80 via-violet-400/40 to-transparent",
    glowClass: "group-hover:shadow-violet-500/10",
  },
  {
    title: "Helps calculate discounts, GST, profit, and loss",
    icon: Calculator,
    iconClass: "text-rose-600",
    bgClass: "bg-rose-500/10",
    ringClass: "ring-rose-500/15",
    accentClass: "from-rose-500/80 via-rose-400/40 to-transparent",
    glowClass: "group-hover:shadow-rose-500/10",
  },
  {
    title: "Easy to use on mobile and desktop",
    icon: MonitorSmartphone,
    iconClass: "text-cyan-600",
    bgClass: "bg-cyan-500/10",
    ringClass: "ring-cyan-500/15",
    accentClass: "from-cyan-500/80 via-cyan-400/40 to-transparent",
    glowClass: "group-hover:shadow-cyan-500/10",
    featured: true,
  },
];

const USE_CASES = [
  {
    title: "School and college examinations",
    icon: GraduationCap,
    iconClass: "text-blue-600",
    bgClass: "bg-blue-500/10",
    ringClass: "ring-blue-500/15",
    accentClass: "from-blue-500/80 via-blue-400/40 to-transparent",
    glowClass: "group-hover:shadow-blue-500/10",
  },
  {
    title: "Shopping discounts and offers",
    icon: ShoppingBag,
    iconClass: "text-rose-600",
    bgClass: "bg-rose-500/10",
    ringClass: "ring-rose-500/15",
    accentClass: "from-rose-500/80 via-rose-400/40 to-transparent",
    glowClass: "group-hover:shadow-rose-500/10",
  },
  {
    title: "Competitive exam score analysis",
    icon: Trophy,
    iconClass: "text-amber-600",
    bgClass: "bg-amber-500/10",
    ringClass: "ring-amber-500/15",
    accentClass: "from-amber-500 via-orange-400/50 to-transparent",
    glowClass: "group-hover:shadow-amber-500/10",
    featured: true,
  },
  {
    title: "Banking and finance",
    icon: Landmark,
    iconClass: "text-violet-600",
    bgClass: "bg-violet-500/10",
    ringClass: "ring-violet-500/15",
    accentClass: "from-violet-500/80 via-violet-400/40 to-transparent",
    glowClass: "group-hover:shadow-violet-500/10",
  },
  {
    title: "Salary hikes and appraisals",
    icon: TrendingUp,
    iconClass: "text-emerald-600",
    bgClass: "bg-emerald-500/10",
    ringClass: "ring-emerald-500/15",
    accentClass: "from-emerald-500/80 via-emerald-400/40 to-transparent",
    glowClass: "group-hover:shadow-emerald-500/10",
  },
  {
    title: "Tax and GST calculations",
    icon: Receipt,
    iconClass: "text-slate-700",
    bgClass: "bg-slate-500/10",
    ringClass: "ring-slate-500/15",
    accentClass: "from-slate-600/70 via-slate-400/30 to-transparent",
    glowClass: "group-hover:shadow-slate-500/10",
  },
  {
    title: "Investment returns",
    icon: LineChart,
    iconClass: "text-indigo-600",
    bgClass: "bg-indigo-500/10",
    ringClass: "ring-indigo-500/15",
    accentClass: "from-indigo-500/80 via-indigo-400/40 to-transparent",
    glowClass: "group-hover:shadow-indigo-500/10",
  },
  {
    title: "Business growth analysis",
    icon: BarChart3,
    iconClass: "text-cyan-600",
    bgClass: "bg-cyan-500/10",
    ringClass: "ring-cyan-500/15",
    accentClass: "from-cyan-500/80 via-cyan-400/40 to-transparent",
    glowClass: "group-hover:shadow-cyan-500/10",
  },
  {
    title: "Profit and loss calculations",
    icon: Target,
    iconClass: "text-primary",
    bgClass: "bg-primary/10",
    ringClass: "ring-primary/15",
    accentClass: "from-primary/80 via-primary/40 to-transparent",
    glowClass: "group-hover:shadow-primary/10",
    featured: true,
  },
];


const FAQS = [
  {
    question: "What is a Percentage Calculator?",
    answer:
      "A Percentage Calculator is an online tool that helps calculate percentages instantly. It can find percentages, determine discounts, and solve other percentage-related problems.",
  },
  {
    question: "How do I calculate the percentage of a number?",
    answer:
      "Use the formula:\n\nPercentage = (Value ÷ Total Value) × 100\n\nFor example, if you score 450 out of 500, your percentage is:\n\n(450 ÷ 500) × 100 = 90%",
  },
  {
    question: "How do I calculate 25% of a number?",
    answer:
      "Use the formula:\n\nValue = (25 ÷ 100) × Number\n\nFor example:\n\n25% of 800\n\n= 0.25 × 800\n\n= 200",
  },
  {
    question: "Can I use this calculator for exam marks?",
    answer:
      "Yes. You can calculate your exam percentage by entering the marks obtained and the total marks.",
  },
  {
    question: "Is this Percentage Calculator accurate?",
    answer:
      "Yes. The calculator uses standard mathematical formulas to provide accurate percentage calculations instantly.",
  },
  {
    question: "Is this Percentage Calculator free?",
    answer:
      "Yes. The calculator is completely free to use and offers unlimited calculations without registration or login.",
  },
];

const PercentageCalculator = () => {
  return (
    <div>
      <Head>
        <title>Percentage Calculator - Free Online Tool | LearningShala</title>
        <meta
          name="description"
          content="Calculate exam scores, discounts, salary hikes, growth, taxes, or everyday percentages instantly with our free Percentage Calculator."
        />
        <link
          rel="canonical"
          href="https://learningshala.com/tools/percentage-calculator/"
        />
      </Head>

      <ToolInnerBanner
        title="Percentage Calculator"
        description="Calculating exam scores, discounts, salary hikes, growth, taxes, or everyday percentages, with this Percentage Calculator."
        category="Academic"
      />

      <section className="container mx-auto px-4 py-8 md:py-10">

      <div className="grid grid-cols-12 gap-4">
<div className="col-span-12 lg:col-span-9">
<PercentageCalculatorTool />
          {/* What is Percentage Calculator */} 
        <div className="rounded-[22px] border border-[#e8e2d9] bg-white/90 p-5 sm:p-6 mb-8">
          <MainHeading
            title="What Is a Percentage Calculator?"
            className="mb-4! text-2xl!"
          />
          <p>
            A Percentage Calculator helps you solve percentage-based
            calculations quickly and accurately. Whether you want to find the
            percentage of a number, calculate increase or decrease, or determine
            what one value is as a percentage of another, this tool gives
            instant results.
          </p>
          <p>
            A Percentage Calculator helps you solve percentage-based
            calculations quickly and accurately. Whether you want to find the
            percentage of a number, calculate increase or decrease, or determine
            what one value is as a percentage of another, this tool gives
            instant results.
          </p>
          <p className="mb-6">
            Percentages are used in academics, finance, business, shopping,
            taxation, and daily life. Enter your values and get the answer in
            seconds.
          </p>

          <div className="border-t border-[#e8e2d9] pt-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" strokeWidth={2} />
              </span>
              <p className="text-sm font-bold text-[#1a1a1a] md:text-base">
                It helps you:
              </p>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {HELPS_YOU.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <BadgeCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                    strokeWidth={2.2}
                  />
                  <span className="text-sm leading-relaxed text-[#57534e]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

          {/* What is Percentage */}
        <div className="rounded-[22px] border border-[#e8e2d9] bg-white/90 p-5 sm:p-6 mb-8">
          <MainHeading
            title="What Is a Percentage?"
            className="mb-4! text-2xl!"
          />
         <p className="mb-6">
                  A percentage is a mathematical expression that represents a
                  value as a fraction of 100. The word{" "}
                  <strong className="text-[#1a1a1a]">
                    &quot;percent&quot;
                  </strong>{" "}
                  literally means{" "}
                  <strong className="text-[#1a1a1a]">
                    &quot;per hundred.&quot;
                  </strong>
                </p>

                <div className="border-t border-[#e8e2d9] pt-5">
                  <p className="mb-4">
                    For example
                  </p>
                  <ul className="space-y-3">
                    {PERCENT_EXAMPLES.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span className="text-sm leading-relaxed text-[#57534e] md:text-base">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    <strong className="text-[#1a1a1a]">Note:</strong>{" "}
                    Percentages make it easier to compare values, analyze
                    growth, and express proportions.
                  </p>
                </div>

         
        </div>

  {/* Formula 1 */}
        <div className="rounded-[22px] border border-[#e8e2d9] bg-white/90 p-5 sm:p-6 mb-8">
        <MainHeading
                    title="Formula to Find the Percentage of a Number"
                    className="mb-4! text-2xl!"
                  />
                <p className="mb-6">
                  Use this formula when you know the part and the whole, and
                  need to find the percentage.
                </p>
                <div className="border-t border-[#e8e2d9] pt-5">
                  <p className="mb-4">
                    For example
                  </p>
                  <ul className="space-y-3 mb-4">
                    {PERCENT_EXAMPLES.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span className="text-sm leading-relaxed text-[#57534e] md:text-base">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <ExampleCard
                  title="Example 2"
                  accentClass="from-violet-500/80 via-violet-400/40 to-transparent"
                  steps={[
                    { text: "Marks Obtained = 360" },
                    { text: "Total Marks = 450" },
                    { text: "Percentage = (360 ÷ 450) × 100" },
                    { text: "Result = 80%", highlight: true },
                  ]}
                />
              </div>


               {/* Formula 2 */}
          <div className="rounded-[22px] border border-[#e8e2d9] bg-white/90 p-5 sm:p-6 mb-8">
          

          <MainHeading
            title="Formula to Calculate X% of a Number"
            className="mb-4! text-2xl!"
          />
          <p className="mb-6">
            Use this when you know the percentage and the base number, and need to find the result.
          </p>
      
            <FormulaBox
              label="Value formula"
              formula="Value = (Percentage ÷ 100) × Number"
            />
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <ExampleCard
                title="Example 1"
                accentClass="from-amber-500 via-orange-400/50 to-transparent"
                steps={[
                  { text: "Find 20% of 800" },
                  { text: "Value = (20 ÷ 100) × 800" },
                  { text: "Value = 160", highlight: true },
                ]}
              />
              <ExampleCard
                title="Example 2"
                accentClass="from-rose-500/80 via-rose-400/40 to-transparent"
                steps={[
                  { text: "Find 15% of 2,000" },
                  { text: "Value = (15 ÷ 100) × 2,000" },
                  { text: "Result = 300", highlight: true },
                ]}
              />
            </div>
          
        </div>

         {/* Why Use */}
         <div className="rounded-[22px] border border-[#e8e2d9] bg-white/90 p-5 sm:p-6 mb-8">
            <MainHeading
              title="Why Use a Percentage Calculator?"
              className="mb-4! text-2xl!"
            />
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
              {WHY_USE_BENEFITS.map((benefit) => (
                <BenefitCard key={benefit.title} {...benefit} />
              ))}
            </ul>
          </div>

 {/* Uses */}
 <div className="mb-8">
        
            <MainHeading
              title="Where Is a Percentage Calculator Used?"
              className="mb-4! text-2xl!"
            />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
                {USE_CASES.map((useCase) => (
                  <UseCaseCard key={useCase.title} {...useCase} />
                ))}
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

export default PercentageCalculator;
