import React from "react";
import UniversityContentHeading from "../universitypage/UniversityContentHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Ban,
  Percent,
  Clock3,
  Receipt,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const POLICY_ITEMS = [
  {
    id: "cancellation",
    title: "Cancellation Policy",
    icon: Ban,
    iconClass: "text-rose-600",
    bgClass: "bg-rose-50",
    ringClass: "ring-rose-100",
    content: (
      <>
        <p>
        Students can cancel their admission and withdraw their application by sending a cancellation request to the university they are applying to.
        </p>
       
      </>
    ),
  },
  {
    id: "refund-percentage",
    title: "Refund Percentage",
    icon: Percent,
    iconClass: "text-emerald-600",
    bgClass: "bg-emerald-50",
    ringClass: "ring-emerald-100",
    content: (
      <>
        <p>
        The <Link className="text-blue-600 underline" href="https://www.ugc.gov.in/pdfnews/1857727_Fee-Refund-Policy-2025-26.pdf">refund percentage</Link> is based on the date the Higher Educational Institution (HEI) receives the withdrawal request as per the UGC Notice. 
        </p>
      
      </>
    ),
  },
  {
    id: "processing-time",
    title: "Processing Time",
    icon: Clock3,
    iconClass: "text-blue-600",
    bgClass: "bg-blue-50",
    ringClass: "ring-blue-100",
    content: (
      <>
        <p>
        Once your withdrawal request is approved, the eligible refund will be processed by the university within the timeline prescribed under the UGC guidelines

        </p>
       
      </>
    ),
  },
  {
    id: "non-refundable",
    title: "Non-refundable Charges",
    icon: Receipt,
    iconClass: "text-amber-700",
    bgClass: "bg-amber-50",
    ringClass: "ring-amber-100",
    content: (
      <>
        <p>Any charges for services already availed or consumed (if specified by the university) may not be refundable.</p>
       
      </>
    ),
  },
];

const RefundPolicy = ({ id, title }) => {
  return (
    <div id={id} className="content_card">
      <UniversityContentHeading title={title} />

      {/* <div className="mt-1 mb-5 flex items-start gap-2.5 rounded-2xl border border-[#ece7df] bg-[#fcfaf7] px-4 py-3.5">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Refund and cancellation rules follow university policy. LearningShala helps
          you initiate and track requests — final approval rests with the university.
        </p>
      </div> */}

      <Accordion
        type="multiple"
        defaultValue={POLICY_ITEMS.map((item) => item.id)}
        className="space-y-3"
      >
        {POLICY_ITEMS.map(
          ({ id: itemId, title: itemTitle, icon: Icon, iconClass, bgClass, ringClass, content }) => (
            <AccordionItem
              key={itemId}
              value={itemId}
              className="overflow-hidden rounded-2xl border border-[#ece7df] bg-white px-0 shadow-sm data-[state=open]:shadow-md"
            >
              <AccordionTrigger className="px-4 py-4 text-left hover:no-underline sm:px-5 [&[data-state=open]]:border-b [&[data-state=open]]:border-[#ece7df]">
                <span className="flex items-center gap-3 pr-2">
                  {/* <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1",
                      bgClass,
                      iconClass,
                      ringClass
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span> */}
                  <span className="text-[15px] font-bold text-primary sm:text-base">
                    {itemTitle}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-5 pt-1">
                <div className="text-sm leading-relaxed text-muted-foreground [&_strong]:text-[#1a1a1a]">
                  {content}
                 
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        )}
      </Accordion>
    </div>
  );
};

export default RefundPolicy;
