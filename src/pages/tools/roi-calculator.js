import MainHeading from "@/components/custom/shared/MainHeading";
import ROICalculatorTool from "@/components/tools/ROICalculatorTool";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ArrowRight,
  BarChart3,
  Calculator,
  CheckCircle2,
  GraduationCap,
  IndianRupee,
  LineChart,
  Percent,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { getUniversityData } from "@/services/UniversitypageService";
import RoiCta from "@/components/tools/RoiCta";
import SecondaryButton from "@/components/custom/shared/SecondaryButton";

const HOW_IT_WORKS = [
  {
    icon: GraduationCap,
    title: "Pick Your University",
    description:
      "Search for your online university! The list only covers UGC-DEB-approved online universities. Considering two colleges? Run it twice. Takes about 10 seconds.",
  },
  {
    icon: IndianRupee,
    title: "Choose the Course",
    description:
      "Select your course and the fees, placement rate, and average salary populate instantly, pulled directly from NIRF records.",
  },
  {
    icon: LineChart,
    title: "See What Graduates Are Actually Earning",
    description:
      "Review the total fees you'll pay, and what students from that program are earning after placement. Not what the college promises in its brochure. What NIRF independently Reports.",
  },
  {
    icon: BarChart3,
    title: "Get Your Answer",
    description:
      "Net gain, ROI percentage, expected monthly salary, one screen, no jargon. At this point, you will have an idea about the financial dependency you can have on your degree.",
  },
];

const BENEFITS = [
  {
    icon: Target,
    title: "Know Before the Deadline Pressure Starts",
    description:
      "Most students start seriously evaluating colleges 10-15 days before the admission window closes, when backing out means losing another 6 months. This calculator gives you the financial picture early enough to act on it.",
  },
  {
    icon: Wallet,
    title: "See If the Fees Actually Pay Off",
    description:
      "A ₹3L degree placing you at ₹6L/year is a different decision than a ₹3L degree placing you at ₹3.8L/year. Same price. Very different return. The calculator shows you the difference before you pay the admission fee.",
  },
  {
    icon: TrendingUp,
    title: "Compare Two Colleges in Under Two Minutes",
    description:
      "Already shortlisted two universities? Run both. The ROI gap between two similar-looking programs can be ₹2-4L over five years. That's a number worth knowing before you pick one.",
  },
  {
    icon: Calculator,
    title: "The Data Comes From NIRF. Not From Colleges",
    description:
      "Colleges report their own placement numbers. They have every reason to make those numbers look good. This calculator pulls from NIRF, India's national education ranking framework. Independent. Government-verified. Not a college's marketing team.",
  },
];

const ROI_FACTORS = [
  {
    title: "What You'll Pay",
    description:
      "The complete course fees for your selected program. This is your baseline for every other number & the calculation is measured against it.",
  },
  {
    title: "What Graduates Actually Earn",
    description:
      "Average annual salary gets pulled from NIRF placement records, not from the university's own brochure. This is what students from that course at that university reported earning after placement in reality. ",
  },
  {
    title: "Not Everyone Gets Placed",
    description:
      "The percentage of students from that program who receive a placement offer. A 70% rate means 3 in 10 students don't land a job through campus. We apply this to the salary figure so your ROI reflects realistic expectations, not the best-case scenario the college puts in its prospectus.",
  },
];

const FAQS = [
  {
    question: "The salary numbers look promising. But can I actually trust them?",
    answer: <>
    <p>The data comes from NIRF – India's National Institutional Ranking Framework, not from the universities themselves. Colleges submit their placement data to NIRF, which compiles and publishes it independently across all institutions.</p>
    <p>It's not flawless data. But it's the most Standardised data 
available in India, and it applies the same methodology to every university, which means you can compare them on equal footing.
</p>
    </>,
  },
  {
    question: "How exactly does the calculator arrive at my ROI percentage?",
    answer: <>
    <p>The formula: ((Total Earnings – Course Fees) ÷ Course
Fees) × 100.
</p>
<p>Total Earnings = Average Placement Salary × Placement
Rate × 5 years.
</p>
<p>The placement rate is in there specifically because not every student gets placed, and the calculator doesn't pretend otherwise. A 70% placement rate means the expected return is weighted accordingly, not calculated assuming everyone lands a job. The 5-year window is a standard horizon for measuring whether an education investment pays back. You can think of it as: does this degree break even and profit within your first five working years?</p>
    </>,
  },
  {
    question: "What if my ROI comes out negative or very low?",
    answer: <>
    <p>
    It means the expected salary from that specific program at that specific university doesn't recover the course fees within a 5-year window.</p>
    <p>This happens when fees are high relative to placement salaries, when placement rates are low, or both.</p>
    <p>A negative result isn't the calculator malfunctioning. It's the calculator doing exactly what it's supposed to do. If you see a low or negative ROI, it's worth reconsidering either the program, the university, or whether a counsellor can point you toward a stronger-returning alternative.</p>
    </>,
  },
  {
    question: "Which universities does this cover? Is mine on the list?",
    answer: <>
    <p>100+ universities currently, spanning UG, PG, and online/distance programs across private, deemed, and distance education categories.</p>
    <p>If your university isn't listed yet, run the calculator for the closest comparable institution
to get a directional sense of returns. Or speak to a counsellor, they can pull placement data for your specific program and give you a more tailored picture.
</p>
    </>,
  },
  {
    question: "I'm already working. Is this calculator actually useful for me, or is it built for students? ",
    answer: "It's more useful for working professionals than for fresh students. When you're already earning, spending ₹1–3L and two years on an MBA or online degree has a real opportunity cost, not just in fees, but in time and salary you could have been growing. The calculator helps you see whether the typical salary jump seen after that program at that university justifies both investments. Online MBA, MCA, executive programs, all covered.",
  },
 
];

export async function getServerSideProps() {
  const universities = await getUniversityData().then(
    (response) => response?.data?.data?.data || [],
  );
  return {
    props: {
      universities,
    },
  };
}

export default function NewROICalculator({ universities }) {
  return (
    <>
      <Head>
        <title>
          ROI Calculator - Calculate Education Return on Investment |
          LearningShala
        </title>
        <meta
          key="description"
          name="description"
          content="Use LearningShala's free Education ROI Calculator to estimate returns on UG, PG, and online degrees. Compare fees, salary, placement rate, and net gain instantly."
        />
        <link
          rel="canonical"
          href="https://learningshala.com/tools/roi-calculator/"
        />
      
      </Head>

      <div className="container py-6 md:py-10">
        {/* Hero */}
        <section className="sec_mb">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.07)]">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_100%_0%,rgba(220,38,38,0.09),transparent_55%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_100%,rgba(251,191,36,0.07),transparent_50%)]"
              aria-hidden
            />

            <div className="relative grid gap-10 p-6 md:p-10 lg:grid-cols-[1fr_340px] lg:gap-12 lg:p-12">
              <div className="flex flex-col justify-center">
                <Breadcrumb className="mb-5">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/tools/roi-calculator">
                        Tools
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>ROI Calculator</BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Free to use · Real NIRF Data · No Signup Needed

                </span>

                <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-[2.5rem] lg:leading-[1.12]">
                Calculate Your {" "}
                  <span className="bg-linear-to-r from-primary to-[#f97316] bg-clip-text text-transparent">
                  University ROI
                  </span>
                </h1>

                <p className="mb-7 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Most students spend lakhs on a degree based on gut feel, then spend 2-3 years finding out if it was worth it. This calculator uses real NIRF placement data to show your expected salary, net gain, and true ROI before you pay a single rupee in fees.


                </p>

                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link href="#roi-calculator-tool">
                    <SecondaryButton title="Calculate My ROI
" />
                  </Link>

                  <RoiCta />
                </div>

                <ul className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
                  {[
                    "Free to use",
                    "Real NIRF data",
                    "No signup needed",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 items-center justify-center">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      icon: Wallet,
                      label: "Investment",
                      sub: "Full course fee",
                    },
                    {
                      icon: TrendingUp,
                      label: "Returns",
                      sub: "Placement data",
                    },
                    {
                      icon: Percent,
                      label: "ROI %",
                      sub: "Net gain ratio",
                    },
                  ].map(({ icon: Icon, label, sub }) => (
                    <div
                      key={label}
                      className="rounded-xl border border-red-100 bg-[#fff8f8] p-3 text-center"
                    >
                      <span className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-bold text-foreground">
                        {label}
                      </p>
                      <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                        {sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator Tool */}
        <section className="sec_mb">
          <MainHeading title="See the Numbers Your Admission Brochure Won't Show You" />
          <p className="text-muted-foreground mb-6 -mt-4 md:-mt-6">
          Two selections. Real NIRF data. One number that tells you
Whether this degree is worth your time and money.



          </p>
          <ROICalculatorTool universities={universities} />
        </section>

        {/* How It Works */}
        <section className="sec_mb">
          <MainHeading title="From Two Dropdowns to One Clear Answer" className="text-center" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {HOW_IT_WORKS.map((step, index) => (
              <div
                key={step.title}
                className="h-full border border-slate-200 bg-white p-4 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <step.icon className="w-5 h-5" />
                  </span>
                  <span className="text-xs font-bold text-primary">
                    STEP {index + 1}
                  </span>
                </div>
                <h3 className="font-bold text-base mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="sec_mb">
          <MainHeading
            title="Because Gut Feel Is an Expensive Way to Pick a Degree"
            className="text-center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="flex gap-4 rounded-2xl bg-[#f8f4f1] p-5 md:p-6"
              >
                <span className="shrink-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                  <benefit.icon className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ROI Formula & Factors */}
        <section className="sec_mb">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="content_card border border-slate-200">
              <h2 className="text-xl font-bold mb-3">The Math Behind Your Result </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              It&apos;s simple: Your ROI tells you how many times over your degree pays back what you spent on it.

              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">A result of +150% means you earn ₹2.50 for every ₹1 invested in course fees, calculated over 5 years after graduation. A result below zero means expected placement salaries don't recover the course cost within that window.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">Neither result is the calculator's opinion. It&apos;s just math.
              </p>
              <div className="rounded-xl bg-[#edf4ee] p-4 text-center mb-4">
                <p className="text-sm font-semibold text-foreground mb-1">
                  ROI Formula
                </p>
                <p className="text-sm text-green-800 font-medium">
                  ((Total Earnings − Course Fees) ÷ Course Fees) × 100
                </p>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">Above 0% = the degree pays off within 5 years.
The higher the number, the stronger the return.
</p>
            </div>

            <div className="content_card border border-slate-100">
              <h2 className="text-xl font-bold mb-4">
              What Goes Into Your Number
              </h2>
              <div className="space-y-4">
                {ROI_FACTORS.map((factor) => (
                  <div key={factor.title}>
                    <h3 className="font-semibold text-sm mb-1">
                      {factor.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {factor.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Who Should Use */}
        <section className="sec_mb">
          <MainHeading title=" If You're About to Make One of These Decisions. Run the Numbers First" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "You've Just Finished 12th",
                text: "Your parents want one thing. Your friends are doing another. And you're supposed to commit 3-4 years and lakhs in fees to a degree you're not fully sure about.Before you finalise anything, see what each program actually returns, in salary, in placement rate, in real numbers.",
              },
              {
                title: "You're Considering an MBA or any Online Degree",
                text: "You've been working long enough to know that a degree alone doesn't guarantee a raise. Before you spend ₹1–3L and two years on a program, check what graduates of that specific course at that specific university are actually earning.Then decide.",
              },
              {
                title: "You're Switching Fields. And You Need This Move to Pay Off",
                text: "Switching careers already costs time and momentum. A course that doesn't place well costs money, too. Before you commit to a boot camp, PG program, or specialisation, check whether graduates are actually landing roles and what they're getting paid when they do.One bad pick can be very expensive. So, know before you enrol.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="sec_mb">
          <MainHeading title="Still Confused? Here are Honest Answers." />
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger className="font-semibold text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA */}
        <section className="sec_mb">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 shadow-[0_24px_60px_rgba(15,23,42,0.1)]">
            <div
              className="absolute inset-0 bg-linear-to-br from-[#1c1917] via-[#292524] to-[#7f1d1d]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/25 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl"
              aria-hidden
            />

            <div className="relative grid gap-10 p-8 md:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:p-12">
              <div>
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90">
                  <MessageCircle className="h-3.5 w-3.5" />
                  Free 1:1 session  · Personalised to your ROI results

                </span>

                <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-white md:text-3xl lg:text-4xl lg:leading-tight">
                The Calculator Gives You a Number.


                  <span className="text-[#fca5a5]">A Counsellor Tells </span> You What to Do With It.
                </h2>

                <p className="mb-8 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">
                The calculator shows you ROI. It can't show you which colleges are harder to get into than their stats suggest, which programs have stronger alumni networks despite similar salary numbers, or whether a lower-ROI option still makes more sense for your specific background and goals.

                </p>
                <p className="mb-8 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">That's the conversation a counsellor is for.
                </p>

                <ul className="grid gap-3 sm:grid-cols-2">
                  {[
                    { icon: ShieldCheck, text: "Recommendations built around your ROI results" },
                    { icon: GraduationCap, text: "Covers UG, PG, and online programs" },
                    { icon: TrendingUp, text: "No sales script, just honest shortlisting" },
                    { icon: CheckCircle2, text: "Free, with no commitment required" },
                  ].map(({ icon: Icon, text }) => (
                    <li
                      key={text}
                      className="flex items-center gap-2.5 text-sm text-white/85"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#fecaca]">
                        <Icon className="h-4 w-4" />
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-center">
                <div className="rounded-2xl border border-white/10 bg-white/95 p-6 md:p-8 shadow-2xl backdrop-blur-sm">
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">
                    Talk to a counsellor
                  </p>
                  <h3 className="mb-2 text-xl font-bold text-foreground">
                  Get a Second Opinion. From a Real Human

                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Tell us your background, goals, and the ROI results you've already seen. We&apos;ll cross-reference what the calculator can't, admission difficulty, program fit, and whether the numbers match your actual career direction.

                  </p>

                  <div className="flex flex-col gap-3">
                    <RoiCta />
                    <Link
                      href="#roi-calculator-tool"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:bg-[#fff8f8]"
                    >
                      Back to calculator
                      <ArrowRight className="h-4 w-4 rotate-180" />
                    </Link>
                  </div>

                  <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    We&apos;ll reach out within 24 hours, mostly the same day

                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
