"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MainHeading from "../custom/shared/MainHeading";

const faqs = [
  {
    id: "faq-1",
    question: "What does the NAAC stand for?",
    answer:
      "NAAC stands for National Assessment and Accreditation Council, an autonomous body of the UGC.",
  },
  {
    id: "faq-2",
    question: "What does NAAC A+ stand for?",
    answer:
      "NAAC A+ rating indicates that the institution has a very high level of educational quality and career outcomes.",
  },
  {
    id: "faq-3",
    question: "What is highest NAAC accreditation?",
    answer:
      "The highest rating is NAAC A++, which has a CGPA of 3.51 – 4.00 and indicates the highest grade of education.",
  },
  {
    id: "faq-4",
    question: "How many universities are NAAC A++?",
    answer:
      "In 2026, approximately 200 institutions have achieved NAAC A++. JNU has the highest CGPA of 3.91, while Siksha 'O' Anusandhan (SOA) has 3.88, and BHU got 3.68",
  },
  {
    id: "faq-5",
    question: "Is NAAC compulsory?",
    answer:
      "No, NAAC accreditation is not compulsory for providing any on-campus degree. However, for an online degree, the institute must have a minimum NAAC CGPA of 3.26, while for ODL, the minimum CGPA is 3.01.",
  },
];

const Faq = () => {
  return (
    <section className="sec_mb">
     
      <MainHeading title="Frequently Asked Questions" className="text-center" />
      <div className="container mx-auto px-4">
        <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <Accordion
            type="multiple"
            defaultValue={faqs.map((faq) => faq.id)}
            className="divide-y divide-gray-200"
          >
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border-0 px-0"
              >
                <AccordionTrigger className="py-4 text-left text-base font-semibold text-[#e62a38] hover:no-underline md:text-lg [&>svg]:text-gray-500">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700 md:text-base">
                    {faq.answer}
                  </p>
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
