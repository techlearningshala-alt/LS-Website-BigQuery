import React from "react";
import UniversityContentHeading from "../universitypage/UniversityContentHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cleanHTML } from "@/lib/cleanHTML";
import { getCommonFaqs } from "./CommonFaq";

const AdmissionFaqs = ({ id, title, universityData, commonFaqs }) => {
  const universityName =
    universityData?.university_name || "the university";

  const sharedFaqs = commonFaqs ?? getCommonFaqs(universityName);
  const allFaqCategories = universityData?.university_faqs ?? [];

  const admissionCategory = allFaqCategories.find((cat) =>
    cat?.category?.toLowerCase().includes("admission")
  );

  const items = [ ...(admissionCategory?.items ?? []), ...sharedFaqs];

  if (!items.length) return null;

  return (
    <div id={id} className="content_card">
      <UniversityContentHeading title={title} />

      <Accordion
        type="multiple"
        defaultValue={items.map(({ id: faqId }) => String(faqId))}
      >
        {items.map(({ id: faqId, question, answer }) => (
          <AccordionItem
            key={faqId}
            value={String(faqId)}
            className="border-[#ece7df] px-1"
          >
            <AccordionTrigger className="text-left text-[15px] font-bold text-[#1a1a1a] hover:text-primary hover:no-underline sm:text-base">
              {question}
            </AccordionTrigger>
            <AccordionContent>
              <div
                className="rich_text text-sm leading-relaxed text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: cleanHTML(answer) }}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AdmissionFaqs;
