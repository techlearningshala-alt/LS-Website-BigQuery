import ExpertCard from '@/components/custom/homepage/expert/ExpertCard';
import MainHeading from '@/components/custom/shared/MainHeading';
import Faq from '@/components/custom/shared/Faq';
import { getMentorData } from '@/services/HomepageService';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  GraduationCap,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLeadForm } from "@/context/LeadFormContext";
import { useLeadGuard } from "@/components/auth/useLeadGuard";
import { toast } from "sonner";

export async function getStaticProps() {
    const mentorData = await getMentorData().then(
      (response) => response?.data?.data?.data || []
    );

    return {
      props: {
        mentorData: mentorData,
      },
      revalidate: 60,
    };
  }

const mentorFaq = [
  {
    question: "What exactly is a Verified Mentor on LearningShala?",
    answer: "A Verified Mentor is someone who has gone through our screening process. We check their academic background, professional experience, and counseling ability before they ever appear on our platform. So when you see that green verified badge, you know they are the real deal.",
  },
  {
    question: "How does LearningShala verify its mentors?",
    answer: "We have a multi-step selection process for every mentor we hire! After document verification and a background check, we proceed with the training session and a mock counselling session. If the candidate performs well in the mock session, we proceed with their onboarding on our platform as a Mentor.",
  },
  {
    question: "Can anyone become a Verified Mentor on LearningShala?",
    answer: "The answer to this question is somewhere between a Yes and a No! We only hire mentors who have a solid educational background or relevant professional experience in their field. We look at the demonstrating ability of the person as knowing something and teaching it are two very different skills, and to become our mentor, they have to be good at both!",
  },
  {
    question: "How do I find the right mentor for me?",
    answer: "Use the filters on the mentor listing page to sort them by their field, experience level, language, availability, and ratings. You can also read through their profiles and schedule a demo call before making a choice.",
  },
  {
    question: "Can I have a trial session before committing to a single mentor?",
    answer: "Yes! Many of our Verified Mentors offer an introductory session. Look for the Available tag on their profile and give them a call to see if you are comfortable with their counseling style.",
  },
  {
    question: "What if I'm not happy with my mentor?",
    answer: "At LearningShala, great mentorship is not just a feature; it's the whole point. So if a session didn't feel right, please reach out to our support team, and we'll make sure to align you with someone who understands you better. However, your experience genuinely matters to us. You can also share how you felt by rating your mentor right after the session. Your feedback helps us keep up with the quality of mentorship.",
  },
  {
    question: "Is my personal information safe when I book a mentor?",
    answer: "Definitely! LearningShala takes your privacy seriously. All the communication and data exchange that happens through the platform is safe with us. We only connect you with mentors without letting them access your data directly.",
  },
  {
    question: "What happens if a Verified Mentor doesn't maintain quality standards?",
    answer: "We monitor mentor performance through ratings, feedback, and periodic reviews. If a mentor’s quality keeps on degrading day-by-day, their Verified status can be put on hold or removed. Maintaining the badge isn't a one-time thing at LearningShala; it's something that demands your effort every day.",
  },

];

const VerifiedMentors = ({ mentorData }) => {
  const mentorCount = mentorData?.length ?? 0;

  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();

  const handleConnect = (e) => {
    if (!withVerification()) {
      e.preventDefault();
      showLeadForm("apply to course from course page banner");
      return;
    }
    toast.success("Our counselor will contact you shortly 📞");
  };

  return (
    <>
      <Head>
        <title>Verified Mentors for Online Degree & Career Guidance</title>
        <meta
        key="description"
          name="description"
          content="Connect with LearningShala Verified Mentors experienced in online degree admissions, career guidance, university selection, and student counseling."
        />
          <link rel="canonical" href="https://learningshala.com/verified-mentors/" />



       {/* faq schema */}

       <script
          id="schema-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "@id": "https://learningshala.com/verified-mentors/#faq",
                "mainEntity": mentorFaq.map(item => ({
                  "@type": "Question",
                  "name": item?.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item?.answer.replace(/<[^>]*>/g, "")
                  }

                }))


              },
              // null,
              // 2 

            )
          }}
        />

      </Head>
      {/* Hero Section */}
      <section className="sec_mb">
        <div className="container">
          <div
            className={cn(
              "relative overflow-hidden rounded-3xl border border-red-100/70",
              "bg-linear-to-br from-[#fff6f6] via-white to-white",
              "shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
            )}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-rose-400 to-amber-400"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_100%_0%,rgba(220,38,38,0.1),transparent_55%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_0%_100%,rgba(251,191,36,0.08),transparent_50%)]"
              aria-hidden
            />

            <div className="relative grid gap-10 p-6 md:p-10 lg:grid-cols-[1fr_400px] lg:gap-12 lg:p-12">
              <div className="flex flex-col justify-center text-center lg:text-left">
                <Breadcrumb className="mb-5 justify-center lg:justify-start">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>Verified Mentors</BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <span className="mx-auto mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 lg:mx-0">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Screened · Trained · Verified
                </span>

                <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                Choose an Online Degree With 
                  <span className="bg-linear-to-r from-primary to-[#f97316] bg-clip-text text-transparent"> Trusted Verified Mentors
                  </span>{" "}
               
                </h1>

                <p className="mx-auto mb-7 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base lg:mx-0">
                Connect with verified academic mentors who understand your career goals, compare universities objectively, and help you make informed decisions with complete clarity.

                </p>

                <div className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                  <a
                    href="#meet-mentors"
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 sm:w-auto",
                      "bg-linear-to-r from-[#082038] to-[#0f2d4d] text-sm font-bold text-white",
                      "shadow-[0_8px_24px_rgba(8,32,56,0.3)] transition-all duration-300",
                      "hover:from-[#0a2844] hover:to-[#123a5f] hover:shadow-[0_12px_28px_rgba(8,32,56,0.4)]"
                    )}
                  >
                    Browse mentors
                    <ArrowRight className="h-4 w-4" />
                  </a>
                 
                  <div className='cursor-pointer inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:bg-primary/5 sm:w-auto'    onClick={handleConnect}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleConnect(e);
                }
              }}>
    Book Free Session Now
     <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="relative min-h-[240px] overflow-hidden rounded-2xl ring-1 ring-slate-900/5 sm:min-h-[280px] lg:min-h-[320px]">
                  <Image
                    src="/images/Guidance.webp"
                    alt="Students connecting with LearningShala mentors for career guidance"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 400px"
                    priority
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-900/50 via-slate-900/10 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                      Background verified
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
                      <MessageCircle className="h-3.5 w-3.5 text-primary" />
                      1:1 counseling
                    </span>
                  </div>
                </div>

             
              </div>
            </div>
          </div>
        </div>
      </section>  
          <section className="sec_mb">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
              <p className="text-2xl md:text-3xl font-bold text-primary">
                200+
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Mentors
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
              <p className="text-2xl md:text-3xl font-bold text-primary">1:1</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Personalized guidance
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
              <p className="text-2xl md:text-3xl font-bold text-primary">
                <ShieldCheck className="inline-block w-8 h-8 md:w-9 md:h-9 text-primary" aria-hidden />
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
              100% LS Verified Profiles

              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
              <p className="text-2xl md:text-3xl font-bold text-primary">
                <Sparkles className="inline-block w-8 h-8 md:w-9 md:h-9 text-primary" aria-hidden />
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
              3x Better Career Clarity

              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec_mb">
        <div className="container">
          <MainHeading
            title="Why connect with a verified mentor?"
            className="text-center mb-2"
          />
          <p className="mb-8 text-center text-muted-foreground max-w-2xl mx-auto">
          Because you&apos;re not short on choices, you just need trusted guidance to find the online degree that matches your ambitions!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: ShieldCheck,
                title: "Personalized Guidance",
                body: "Get guidance based on your background, aspirations, and challenges!",
              },
              {
                icon: MessageCircle,
                title: "Data-Backed Recommendations",
                body: "Get suggestions based on facts and figures and not on the TED Talks!",
              },
              {
                icon: Users,
                title: "Honest & Transparent Advice",
                body: "If it is not the right fit for you, we'll pitch it to you!",
              },
              {
                icon: GraduationCap,
                title: "Better Career Clarity",
                body: "Our guidance is based on your career goals, not on marketing hypes!",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="meet-mentors" className="sec_mb scroll-mt-24">
        <div className="container">
          <MainHeading title="Meet our mentors" className="text-center mb-2" />
          <p className="mb-8 text-center text-muted-foreground flex flex-wrap items-center justify-center gap-2">
            <BadgeCheck className="w-5 h-5 text-green-600 shrink-0" aria-hidden />
            <span>
            If you&apos;re going to choose an online degree, choose it with experts by your side.
            </span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:px-[40px]">
            {mentorData?.map((item, index) => (
              <div
                key={index}
                className="relative bg-white rounded-lg shadow-md p-2 border border-gray-200"
              >
                <ExpertCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec_mb">
        <div className="container">
          <MainHeading title="How mentorship works" className="text-center mb-2" />
          <p className="mb-8 text-center text-muted-foreground max-w-xl mx-auto">
            A simple path from browsing to clarity no guesswork.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                title: " Book a Free Session",
                body: "Choose a convenient time and connect with a verified mentor.",
              },
              {
                step: "02",
                title: "Discuss Your Goals",
                body: "Share your academic background, career aspirations, and preferences.",
              },
              {
                step: "03",
                title: "Compare the Best Options",
                body: "Receive personalized university and course recommendations based on 40+ decision-making factors.",
              },
              {
                step: "04",
                title: "Make a Confident Decision",
                body: "Enroll in the program that genuinely aligns with your future goals.",
              },
            ].map(({ step, title, body }) => (
              <div
                key={step}
                className="rounded-2xl border border-dashed border-primary/25 bg-primary/5 p-6"
              >
                <span className="text-xs font-bold tracking-widest text-primary">
                  {step}
                </span>
                <h3 className="mt-2 font-semibold text-lg">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec_mb">
        <div className="container max-w-3xl">
          <MainHeading title="Frequently asked questions" className="text-center mb-8" />
          <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
            <Faq faqData={mentorFaq} />
          </div>
        </div>
      </section>

      {/* <section className="sec_mb">
        <div className="container">
          <div className="rounded-2xl bg-linear-to-r from-primary/90 to-primary px-6 py-10 text-center text-primary-foreground shadow-md">
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Still exploring programs?
            </h2>
            <p className="mb-6 max-w-lg mx-auto text-sm md:text-base opacity-95">
              Browse online degrees and shortlist options then loop in a mentor
              when you want a second opinion.
            </p>
            <Link
              href="/#course-section"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary shadow-sm hover:bg-white/95 transition-colors"
            >
              Explore courses
            </Link>
          </div>
        </div>
      </section> */}
    </>
  )
}

export default VerifiedMentors
