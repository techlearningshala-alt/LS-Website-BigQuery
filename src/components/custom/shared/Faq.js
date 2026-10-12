import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Head from "next/head";
import { useRouter } from "next/router";

const Faq = ({ faqData }) => {
  const router = useRouter();
  const pagePath = router?.asPath?.split("?")[0] || "/";
  const pageUrl = `https://learningshala.com${pagePath === "/" ? "" : pagePath}`;
  const safeFaqData = Array.isArray(faqData) ? faqData : [];

  return (
    <>
      {safeFaqData.length > 0 && (
        <Head>
          <script
            id={`faq-schema-${pagePath.replace(/\//g, "-") || "home"}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "@id": `${pageUrl}/#faq`,
                mainEntity: safeFaqData.map(({ question, answer }) => ({
                  "@type": "Question",
                  name: question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: String(answer || "").replace(/<[^>]*>/g, "").trim(),
                  },
                })),
              }),
            }}
          />
        </Head>
      )}

      <Accordion
        type="multiple"
        defaultValue={safeFaqData.map(({ value }, idx) => String(value || idx))}
      >
        {safeFaqData.map(({ value, question, answer }, idx) => (
          <AccordionItem key={value || idx} value={String(value || idx)}>
            <AccordionTrigger className="font-semibold text-primary">{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Faq;
