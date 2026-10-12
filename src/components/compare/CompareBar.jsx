import { useCompare } from "@/context/CompareContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { useState } from "react";
import { parseComparePath } from "@/lib/compareUtils";
import { useCookiesNext } from "cookies-next";
import { interestedUniversity } from "@/services/LeadService";
import { useLeadForm } from "@/context/LeadFormContext";
import { Plus, X } from "lucide-react";
import CompareUniversityPickerModal from "./CompareUniversityPickerModal";

const MAX_COMPARE_SLOTS = 3;

const CompareBar = () => {
  const { compareList, clearCompare, toggleCompare } = useCompare();
  const router = useRouter();
  const { getCookie } = useCookiesNext();
  const { showLeadForm } = useLeadForm();
  const [pickerOpen, setPickerOpen] = useState(false);

  if (compareList.length === 0) return null;

  const { courseSlug, specializationSlug } = parseComparePath(router.asPath);
  const slots = Array.from(
    { length: MAX_COMPARE_SLOTS },
    (_, index) => compareList[index] || null
  );

  const getCompareUrl = () => {
    const slugs = compareList.map((u) => u.university_slug).join(",");
    const base = `/compare/?ids=${slugs}&course=${encodeURIComponent(
      courseSlug || ""
    )}`;

    return specializationSlug
      ? `${base}&specialization=${encodeURIComponent(specializationSlug)}`
      : base;
  };

  const openPicker = () => {
    if (compareList.length >= MAX_COMPARE_SLOTS) return;
    setPickerOpen(true);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-1 sm:p-4 shadow-lg">
        <p className="container mb-3 text-[14px] sm:text-lg font-semibold">
          Compare up to 3 universities
        </p>

        <div className="container">
          <div className="grid grid-cols-12 items-center gap-3">
            <div className="col-span-12 lg:col-span-9">
              <div className="flex w-full items-stretch gap-2 md:gap-3">
                {slots.map((university, index) => (
                  <React.Fragment key={university?.id ?? `empty-slot-${index}`}>
                    {index > 0 ? (
                      <span className="flex shrink-0 items-center text-xl font-bold text-primary md:text-2xl">
                        +
                      </span>
                    ) : null}

                    {university ? (
                      <div className="relative flex min-w-0 flex-1 flex-col rounded-md border border-gray-200 bg-white px-2 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => toggleCompare(university)}
                          className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm hover:text-primary"
                          aria-label={`Remove ${university.university_name}`}
                        >
                          <X className="size-3" />
                        </button>
                        <Image
                          className="mx-auto mb-1 h-12 w-full max-w-[100px] rounded-sm bg-white object-contain p-1 md:h-16"
                          src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${university.university_logo}`}
                          alt={university.university_name}
                          width={72}
                          height={25}
                        />
                        <span className="line-clamp-1 text-[11px] font-semibold md:text-xs">
                          {university.university_name}
                        </span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={openPicker}
                        className="flex min-h-[108px] min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-md border border-dashed border-primary/40 bg-red-50/40 px-2 text-primary transition-colors hover:border-primary hover:bg-red-50 md:min-h-[118px]"
                      >
                        <span className="flex size-8 items-center justify-center rounded-full border border-primary/30 bg-white">
                          <Plus className="size-4" />
                        </span>
                        <span className="text-[11px] font-semibold md:text-xs">
                          Add
                        </span>
                      </button>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="col-span-12 flex justify-end gap-2 lg:col-span-3">
            <Button onClick={clearCompare} variant="outline">
              Clear
            </Button>

            <Button
              disabled={compareList.length < 2}
              onClick={async () => {
                const compareUrl = getCompareUrl();

                const leadIdRaw = getCookie("lead_id");
                const leadId = String(leadIdRaw || "")
                  .replace(/^"+|"+$/g, "")
                  .trim();
                if (!leadId) {
                  showLeadForm("compare from compare bar", {
                    type: "redirect",
                    url: compareUrl,
                  });
                  return;
                }

                if (leadId) {
                  const interestedUniversities = compareList
                    .map((u) => {
                      if (u?.university_slug) {
                        return String(u.university_slug)
                          .replace(/-online-university$/i, "")
                          .replace(/-university$/i, "");
                      }
                      return u?.university_name?.toLowerCase()?.trim();
                    })
                    .filter(Boolean);

                  try {
                    await interestedUniversity(leadId, {
                      interested_university: interestedUniversities,
                    });
                  } catch (error) {
                    console.error(
                      "Failed to update interested_university:",
                      error?.response?.status,
                      error?.response?.data || error?.message
                    );
                  }
                }
                router.push(compareUrl);
              }}
            >
              Compare ({compareList.length})
            </Button>
            </div>
          </div>
        </div>
      </div>

      <CompareUniversityPickerModal
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        compareList={compareList}
        onSelectUniversity={toggleCompare}
      />
    </>
  );
};

export default CompareBar;
