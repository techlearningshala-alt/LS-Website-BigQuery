import React from "react";
import MainHeading from "@/components/custom/shared/MainHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cleanHTML } from "@/lib/cleanHTML";

function getFaqId(faq, index) {
  return String(faq.id ?? `faq-${index}`);
}

function renderAnswer(answer) {
  if (answer == null || answer === "") return null;

  if (React.isValidElement(answer)) {
    return (
      <div className="text-sm leading-relaxed text-[#57534e] md:text-base">
        {answer}
      </div>
    );
  }

  const answerText = typeof answer === "string" ? answer : String(answer);

  if (/<[a-z][\s\S]*>/i.test(answerText)) {
    return (
      <div
        className="rich_text text-sm leading-relaxed text-[#57534e] md:text-base"
        dangerouslySetInnerHTML={{ __html: cleanHTML(answerText) }}
      />
    );
  }

  return (
    <p className="text-sm leading-relaxed text-[#57534e] md:text-base">{answerText}</p>
  );
}

const ToolsFaq = ({
  faqs = [],
  title = "Frequently Asked Questions",
  className = "",
}) => {
  if (!faqs.length) return null;

  const faqIds = faqs.map(getFaqId);

  return (
    <div className={`rounded-[22px] border border-[#e8e2d9] bg-white/90 p-5 sm:p-6 ${className}`}>
      <MainHeading title={title} className="mb-4! text-2xl!" />

      <Accordion type="multiple" defaultValue={faqIds}>
        {faqs.map((faq, index) => {
          const faqId = getFaqId(faq, index);

          return (
            <AccordionItem
              key={faqId}
              value={faqId}
              className="border-[#e8e2d9] px-1"
            >
              <AccordionTrigger className="text-left text-[15px] font-bold text-primary hover:text-primary hover:no-underline sm:text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{renderAnswer(faq.answer)}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default ToolsFaq;
