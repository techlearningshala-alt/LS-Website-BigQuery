import CourseSection from "@/components/custom/homepage/courseSection/CourseSection";
import useWindowSize from "@/lib/use-window-size";
import Head from "next/head";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getCoursesByDomain } from "@/services/MenuService";
import MainHeading from "@/components/custom/shared/MainHeading";
import Faq from "@/components/custom/shared/Faq";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  GitCompare,
  GraduationCap,
  IndianRupee,
  Layers,
  Plus,
  ShieldCheck,
  Sparkles,
  University,
} from "lucide-react";

export async function getStaticProps() {
  const menuResponse = await getCoursesByDomain();
  const menuDataSchema = menuResponse?.data?.data ?? null;

  return {
    props: {
      menuDataSchema: menuDataSchema,
    },
    revalidate: 60,
  };
}

const compareFaq = [
  {
    question: "Why should I compare universities for my online degree?",
    answer:
      "The online educational market of India is quite diverse, which creates confusion while choosing the best fit for your career. With our university comparison feature, you can easily get the factors that are worth considering while choosing a university, and then finalize one on your own.",
  },
  {
    question: "How does this comparison tool actually work?",
    answer:
      "It's pretty simple! We collect all the data from the official website of the online universities and put it all in one place so you don't have to spend hours jumping between different websites.",
  },
  {
    question: "Is the information here up to date?",
    answer:
      "Yes, we are constantly updating all the information as soon as any online university makes any changes on their official pages. ",
  },
  {
    question: "Can I compare more than two universities at once?",
    answer:
      "Yes! You can compare up to 3 online universities side by side. Just hit Add to Compare and pick the ones you want to compare against each other.",
  },
  {
    question: "Are all the universities listed here accredited?",
    answer:
      "Yes, we only list accredited universities and institutions, so you do not have to specifically ask for the authentic online university options to compare. That being said, accreditation types can vary based on the specific online program you have chosen.",
  },
  {
    question: "How do I know which university is the best for me?",
    answer:
      "Well, we only give the suggestion; the decision is completely yours! Using this online university comparison feature, you can get the information on rankings, location, budget, learning style, and the specific offerings for the course you have chosen. All these filters will help you out in choosing your best university fit!",
  },
  {
    question: "How much does this Online University Comparison Tool cost?",
    answer:
      "It's completely free! A simple sign-up with your basic details will help you create an account that lets you save your comparisons and come back to them later.",
  },
  {
    question: "Can I compare universities from different countries?",
    answer:
      "Yes, you can! If the online program that you have selected is available at international universities, you will get to choose them while comparing the online universities.",
  },
  {
    question: "What if I can't find the university I'm looking for?",
    answer:
      "If a university isn't showing up, it might not be in our database yet. You can connect with our mentors and ask them about your specific university.",
  },
  {
    question: "Do you recommend specific universities?",
    answer:
      "No, we are not here to tell you which online university to choose, but we will definitely provide you with a clear-cut comparison that will help you make that decision! We, at LearningShala, help you understand the technical terms and the factors that are important to look at while choosing an online university.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: GraduationCap,
    title: "Choose a Course",
    body: "Select an online degree like MBA, MCA, BCA, or any other that you are interested in!",
  },
  {
    step: "02",
    icon: Plus,
    title: "Help Us Understand Your Goals",
    body: "Answer a few questions about your last qualification and work experience to get a personalized list!",
  },
  {
    step: "03",
    icon: GitCompare,
    title: "Add up to 3 Universities",
    body: "Get a comparison of 3 online universities side-by-side on 40+ factors all in one place!",
  },
];

const COMPARE_FACTORS = [
  "UGC-DEB approval",
  "NAAC grade",
  "NIRF ranking",
  "WES approval",
  "Course fees & EMI",
  "Placement rate",
  "Average salary",
  "Exam mode",
  "Exam pattern",
  "LMS portal",
  "Campus immersion",
  "Industry exposure",
  "Webinars",
  "Startup support",
];

const PREVIEW_UNIVERSITIES = [
  { name: "University A", fee: "₹1.2L", placement: "89%" },
  { name: "University B", fee: "₹2.1L", placement: "83%" },
  { name: "University C", fee: "₹1.8L", placement: "86%" },
];

const PREVIEW_ROWS = [
  { factor: "Full course fee", key: "fee" },
  { factor: "Placement rate", key: "placement" },
  { factor: "EMI available", values: ["Yes", "Yes", "No"] },
  { factor: "NAAC grade", values: ["A+", "A", "A+"] },
  { factor: "Exam mode", values: ["Online", "Online", "Hybrid"] },
];

function ComparePreviewTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.1)] ring-1 ring-slate-900/5">
      <div className="grid grid-cols-4 border-b border-slate-100 bg-slate-50/90 px-3 py-2.5 text-[10px] font-bold uppercase tracking-wide text-slate-600 sm:text-[11px]">
        <p className="text-left">Factor</p>
        {PREVIEW_UNIVERSITIES.map((u) => (
          <p key={u.name} className="text-center truncate">
            {u.name}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-4 border-b border-slate-100 bg-white px-3 py-3">
        <p className="text-xs font-medium text-slate-500">Logo</p>
        {PREVIEW_UNIVERSITIES.map((u) => (
          <div key={u.name} className="flex justify-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-[10px] font-bold text-primary">
              {u.name.split(" ")[1]}
            </span>
          </div>
        ))}
      </div>
      {PREVIEW_ROWS.map((row) => (
        <div
          key={row.factor}
          className="grid grid-cols-4 border-t border-slate-100 px-3 py-2.5 text-xs"
        >
          <p className="font-medium text-slate-700">{row.factor}</p>
          {row.key
            ? PREVIEW_UNIVERSITIES.map((u) => (
                <p
                  key={u.name}
                  className="text-center font-semibold text-primary"
                >
                  {u[row.key]}
                </p>
              ))
            : row.values.map((val, i) => (
                <p
                  key={i}
                  className={cn(
                    "text-center font-medium",
                    i === 0 ? "text-primary" : "text-slate-600"
                  )}
                >
                  {val}
                </p>
              ))}
        </div>
      ))}
      <div className="border-t border-dashed border-primary/20 bg-primary/5 px-3 py-2 text-center text-[10px] font-semibold text-primary">
        + 40 more factors in the live comparison
      </div>
    </div>
  );
}

const CompareUniversity = ({ menuDataSchema }) => {
  const size = useWindowSize();
  const menuData = menuDataSchema ? { data: menuDataSchema } : null;

  const title =
    "Compare UGC-Approved Online Universities | LearningShala";
  const description =
    "Compare top UGC-approved online universities in India based on fees, placements, approvals, LMS, exams, ROI, and student support.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key="description" name="description" content={description} />
        <link
          rel="canonical"
          href="https://learningshala.com/compare-university/"
        />
        <script
          id="schema-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "@id": "https://learningshala.com/compare-university/#faq",
              mainEntity: compareFaq.map((item) => ({
                "@type": "Question",
                name: item?.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item?.answer.replace(/<[^>]*>/g, ""),
                },
              })),
            }),
          }}
        />
      </Head>

      {/* Hero */}
      <section className="sec_mb">
        <div className="container">
          <div
            className={cn(
              "relative overflow-hidden rounded-3xl border border-slate-200/80",
              "bg-linear-to-br from-slate-50 via-white to-[#fff8f6]",
              "shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
            )}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-rose-400 to-amber-400"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_0%_0%,rgba(59,130,246,0.08),transparent_55%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_100%_100%,rgba(220,38,38,0.08),transparent_50%)]"
              aria-hidden
            />

            <div className="relative grid gap-10 p-6 md:p-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:p-12">
              <div className="flex flex-col justify-center text-center lg:text-left">
                <Breadcrumb className="mb-5 justify-center lg:justify-start">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>Compare University</BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <span className="mx-auto mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary lg:mx-0">
                  <GitCompare className="h-3.5 w-3.5" />
                  Compare up to 3 universities · Free
                </span>

                <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                  <span className="bg-linear-to-r from-primary to-[#f97316] bg-clip-text text-transparent">
                    Compare
                  </span>{" "}
                   UGC-Approved Online Universities in India
                </h1>

                <p className="mx-auto mb-7 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base lg:mx-0">
                Compare India&apos;s leading UGC-approved online universities across fees, accreditations, placements, learning experience, student support, and 40+ other factors, all in one place.

                </p>

                <div className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                  <a
                    href="#choose-course"
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 sm:w-auto",
                      "bg-linear-to-r from-[#082038] to-[#0f2d4d] text-sm font-bold text-white",
                      "shadow-[0_8px_24px_rgba(8,32,56,0.3)] transition-all duration-300",
                      "hover:from-[#0a2844] hover:to-[#123a5f] hover:shadow-[0_12px_28px_rgba(8,32,56,0.4)]"
                    )}
                  >
                    Start comparing
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link
                    href="/verified-mentors"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:bg-primary/5 sm:w-auto"
                  >
                   Connect With a Verified Mentor
                  </Link>
                </div>

                {/* <ul className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 lg:justify-start">
                  {[
                    "100+ UGC-approved universities",
                    "40+ comparison factors",
                    "Up to 3 universities at once",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center justify-center gap-2 text-sm text-muted-foreground lg:justify-start"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul> */}
              </div>

              <div className="flex flex-col gap-3">
                <ComparePreviewTable />
                <p className="text-center text-[11px] text-muted-foreground lg:text-left">
                  Sample preview — actual data loads when you compare live
                  universities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="sec_mb">
        <div className="container">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {[
              {
                icon: University,
                value: "100+",
                label: "Online Universities",
              },
              {
                icon: Layers,
                value: "40+",
                label: "Compare factors",
              },
              {
                icon: GitCompare,
                value: "3",
                label: "Side-by-side comparisons",
              },
              {
                icon: Sparkles,
                value: "100%",
                label: "Free Comparison Tool",
              },
            ].map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-2xl font-bold text-primary md:text-3xl">
                  {value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="sec_mb">
        <div className="container">
          <MainHeading
            title="How does the LearningShala Comparison Tool work?"
            className="text-center mb-2"
          />
          <p className="mb-8 text-center text-muted-foreground max-w-2xl mx-auto">
          We focus on factors such as fees, accreditations, specializations, placement support, examination patterns, LMS features, and more that align with your career goals.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {HOW_IT_WORKS.map(({ step, icon: Icon, title, body }) => (
              <div
                key={step}
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="text-xs font-bold tracking-widest text-primary">
                  {step}
                </span>
                <span className="mt-3 mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you can compare */}
      <section className="sec_mb">
        <div className="container">
          <div className="rounded-3xl border border-slate-200 bg-linear-to-br from-slate-50 via-white to-white p-6 md:p-10">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <MainHeading
                  title="What do you compare?"
                  className="text-left mb-2"
                />
                <p className="max-w-xl text-sm text-muted-foreground md:text-base">
                  Every comparison table pulls structured data so you can judge
                  universities on what actually matters—not marketing fluff.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary">
                <BarChart3 className="h-4 w-4" />
                40+ data points per university
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {COMPARE_FACTORS.map((factor) => (
                <span
                  key={factor}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm"
                >
                  <CheckCircle2 className="h-3 w-3 text-primary" />
                  {factor}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="sec_mb">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                icon: IndianRupee,
                title: "Know the University ROI",
                body: "Compare the fee and placement packages in one place and choose a high ROI university!",
              },
              {
                icon: ShieldCheck,
                title: "Compare UGC-approved Universities only",
                body: "Choose the best and a credible online university by comparing only UGC-approved universities!",
              },
              {
                icon: BarChart3,
                title: "Data-backed Guidance",
                body: "We talk numbers to show you the real picture, so that you get influenced by data and not by an Ad.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-dashed border-primary/25 bg-primary/5 p-6"
              >
                <Icon className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course picker */}
      <section id="choose-course" className="sec_mb scroll-mt-24">
        <div className="container">
          <div className="mb-8 text-center">
            <MainHeading
              title={
                <>
                  Choose an Online course to{" "}
                  <span className="text-primary">start comparing</span>
                </>
              }
              className="mb-3"
            />
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground md:text-base">
            Pick a course from the list below, answer a few questions, and select “Compare Now” to view the full comparison between your preferred top 3 universities.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_12px_40px_rgba(15,23,42,0.06)] md:p-6 lg:p-8">
            {menuData ? (
              <CourseSection screenSize={size} menuData={menuData} />
            ) : (
              <p className="py-12 text-center text-muted-foreground">
                Loading courses…
              </p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="sec_mb">
        <div className="container max-w-3xl">
          <MainHeading
            title="Frequently asked questions"
            className="text-center mb-8"
          />
          <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
            <Faq faqData={compareFaq} />
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="sec_mb">
        <div className="container">
          <div className="rounded-2xl bg-linear-to-r from-primary/90 to-primary px-6 py-10 text-center text-primary-foreground shadow-md">
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Need help choosing between universities?
            </h2>
            <p className="mb-6 max-w-lg mx-auto text-sm md:text-base opacity-95">
              Our verified mentors can walk you through your comparison and
              suggest the best fit for your career goals.
            </p>
            <Link
              href="/verified-mentors"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-white/95"
            >
              Connect with a mentor
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default CompareUniversity;
