import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cleanHTML } from "@/lib/cleanHTML";
import useWindowSize from "@/lib/use-window-size";
import { cn } from "@/lib/utils";
import { HelpCircle, Loader2, Minus, Plus } from "lucide-react";

function FaqAccordionList({ items, variant = "desktop" }) {
  const isMobile = variant === "mobile";

  return (
    <Accordion
      type="multiple"
      className={cn("w-full", isMobile && "space-y-1")}
      defaultValue={items.map((item) => String(item.id))}
    >
      {items.map(({ id, question, answer }) => (
        <AccordionItem
          key={id}
          value={String(id)}
          className={cn(
            "border-slate-100 px-1",
            isMobile ? "border-b last:border-b-0" : "rounded-xl border-b-0 mb-2 last:mb-0 bg-slate-50/60"
          )}
        >
          <AccordionTrigger
            className={cn(
              "group gap-3 py-4 text-left font-semibold text-foreground transition-colors hover:no-underline",
              "data-[state=open]:text-primary",
              isMobile && "[&>svg]:hidden"
            )}
          >
            <span className="flex-1 pr-2 text-sm md:text-base leading-snug">
              {question}
            </span>
            {isMobile && (
              <span className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-sm ring-1 ring-slate-100">
                <Plus className="h-4 w-4 group-data-[state=open]:hidden" />
                <Minus className="hidden h-4 w-4 group-data-[state=open]:block" />
              </span>
            )}
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div
              className="rich_text text-sm leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: cleanHTML(answer) }}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

const FaqCategory = ({ fromHomepage, faqData = [] }) => {
  const screenSize = useWindowSize();
  const loading = !faqData || faqData.length === 0;
  const categories = faqData;

  const w = screenSize?.width;
  const showDesktopLayout = w == null || w > 991;
  const showMobileLayout = w != null && w <= 991;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-14 text-muted-foreground">
        <Loader2 className="h-7 w-7 animate-spin text-primary" aria-hidden />
        <p className="text-sm font-medium">Loading FAQs…</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full",
        fromHomepage && "mx-auto"
      )}
    >
      {showDesktopLayout && (
        <Tabs
          defaultValue={categories[0]?.cat_id || ""}
          orientation="vertical"
          className="flex w-full flex-row items-start gap-6 lg:gap-8"
        >
          <TabsList className="h-auto w-full max-w-[240px] shrink-0 flex-col gap-1.5 rounded-2xl border border-slate-100 bg-slate-50/80 p-2 shadow-sm">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat?.cat_id}
                value={cat?.cat_id}
                className={cn(
                  "h-auto w-full justify-start rounded-xl border border-transparent px-4 py-3 text-left",
                  "text-sm font-semibold text-muted-foreground transition-all",
                  "hover:bg-white hover:text-foreground",
                  "data-[state=active]:border-red-100 data-[state=active]:bg-white",
                  "data-[state=active]:text-primary data-[state=active]:shadow-sm"
                )}
              >
                <span className="line-clamp-2 leading-snug">{cat?.category}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="min-w-0 flex-1 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:p-6">
            {categories.map((cat) => (
              <TabsContent
                key={cat?.cat_id}
                value={cat?.cat_id}
                className="mt-0 outline-none"
              >
                <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <HelpCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Category
                    </p>
                    <h3 className="text-lg font-bold text-foreground">
                      {cat?.category}
                    </h3>
                  </div>
                </div>
                <FaqAccordionList items={cat.items} variant="desktop" />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      )}

      {showMobileLayout && (
        <div className="flex w-full flex-col gap-6">
          {categories.map((cat) => (
            <section
              key={cat?.cat_id}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-4 py-3.5">
                <span className="h-8 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                <h3 className="text-base font-bold text-foreground">
                  {cat.category}
                </h3>
              </div>
              <div className="p-3 md:p-4">
                <FaqAccordionList items={cat.items} variant="mobile" />
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default FaqCategory;
