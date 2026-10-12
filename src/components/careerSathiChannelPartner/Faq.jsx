import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import Head from "next/head";
import React from "react";

const FAQS = [
  {
    q: "Career Sathi banne ka koi charge hai?",
    a: "Bilkul nahi. Registration, KYC, banner, QR code — sab kuch free hai. Aapko ek rupaya bhi nahi dena. Ulta hum aapki dukaan par branding lagate hain, bina kisi kharche ke.",
  },
  {
    q: "Payment kab aur kaise milega?",
    a: "Jab bhi aap payout request daalenge, paisa seedha aapke bank account mein credit ho jayega — 1 business day ke andar. Isiliye onboarding ke time hum aapka bank account aur cancelled cheque lete hain.",
  },
  {
    q: "Kya mujhe koi target pura karna hoga?",
    a: "Nahi. Koi monthly target nahi, koi pressure nahi. Aap apni marzi se, apni speed se kaam kariye. Jitne students aayenge, utni kamai hogi — bas itni si baat hai.",
  },
  {
    q: "Kya mujhe students ko convince karna padega?",
    a: "Nahi. Aapko sirf itna karna hai ki jo student aage padhne ki baat kare, use bata dijiye ki online degree ka option hai — aur uski detail humein bhej dijiye. Convince karna, counselling karna, admission karana — ye sab hamari team ka kaam hai.",
  },
  {
    q: "Agar student admission nahi leta to?",
    a: "Koi problem nahi. Har genuine lead ke liye aapko earning milti hai, chahe admission ho ya na ho. Admission hone par extra milta hai — par lead ka fayda aapko har haal mein milega.",
  },
  {
    q: "Main apni leads aur kamai kaise track karunga?",
    a: "Aap jab chahein apni leads ka count aur unka status pooch sakte hain — kitni leads aayin, kitni qualified hui, kitne admission hue. Ye jaankari aapko din mein ek baar mil jati hai. Poora record transparent rehta hai.",
  },
  {
    q: "Kya mujhe degree programs ki poori jaankari honi chahiye?",
    a: "Bilkul zaroori nahi. Onboarding ke time hamari team aapko basic training degi — bas itna ki aap student ko sahi direction dikha sakein. Detailed jaankari, fees, eligibility — ye sab hamare counsellors student ko khud batate hain.",
  },
];

const Faq = () => {
  return (
    <section id="faq" className="scroll-mt-24 bg-[#fafafa]">
      <Head>
        <script
          id="career-sathi-faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "@id": "https://learningshala.com/career-sathi-channel-partner/#faq",
              mainEntity: FAQS.map(({ q, a }) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: a,
                },
              })),
            }),
          }}
        />
      </Head>

      <div className="container py-10 md:py-14 lg:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#eef2ff] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4f46e5]">
            <HelpCircle className="size-3.5" strokeWidth={2.5} />
            06 · FAQ
          </span>

          <h2 className="mt-5 text-[2rem] font-bold leading-[1.15] tracking-tight text-[#1a1a1a] sm:text-[2.35rem]">
          Aapke sawaal, hamare jawab
          </h2>

          <p className="mt-4 text-[15px] leading-relaxed text-[#6b7280] sm:text-base">
          Career Sathi partnership se judne se pehle log aksar ye sawaal poochte hain.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-[#ece7df] bg-white px-4 shadow-[0_8px_24px_rgba(26,32,44,0.04)] sm:px-6">
          <Accordion type="single" collapsible defaultValue="0">
            {FAQS.map(({ q, a }, index) => (
              <AccordionItem
                key={q}
                value={String(index)}
                className="border-[#ece7df] px-1"
              >
                <AccordionTrigger className="text-left text-[15px] font-bold text-[#1a1a1a] hover:text-primary hover:no-underline sm:text-base">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-[#6b7280] sm:text-[15px]">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;
