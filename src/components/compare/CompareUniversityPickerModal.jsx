import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Check, Loader2, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { parseComparePath } from "@/lib/compareUtils";
import {
  getCollegesUniversitiesData,
  getUniversitiesBySpecialization,
} from "@/services/CollegesUniversitiesService";

export default function CompareUniversityPickerModal({
  open,
  onOpenChange,
  compareList,
  onSelectUniversity,
  courseSlug: courseSlugProp,
  specializationSlug: specializationSlugProp,
}) {
  const router = useRouter();
  const parsed = parseComparePath(router.asPath);
  const courseSlug = courseSlugProp || parsed.courseSlug;
  const specializationSlug =
    specializationSlugProp !== undefined
      ? specializationSlugProp
      : parsed.specializationSlug;
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!open) {
      setSearch("");
      return;
    }

    if (!courseSlug) return;

    let cancelled = false;
    setLoading(true);

    const request = specializationSlug
      ? getUniversitiesBySpecialization({ courseSlug, specializationSlug })
      : getCollegesUniversitiesData({ courseSlug });

    request
      .then((res) => {
        if (cancelled) return;
        const data = res?.data?.data || [];
        setUniversities(data.filter((u) => u.university_type_id !== 4));
      })
      .catch(() => {
        if (!cancelled) setUniversities([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open, courseSlug, specializationSlug]);

  const filteredUniversities = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return universities;
    return universities.filter((u) =>
      u.university_name?.toLowerCase().includes(query)
    );
  }, [search, universities]);

  const selectedSlugs = useMemo(
    () => new Set(compareList.map((u) => u.university_slug)),
    [compareList]
  );

  const isFull = compareList.length >= 3;

  const handleSelect = (university) => {
    if (selectedSlugs.has(university.university_slug) || isFull) return;
    onSelectUniversity(university);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] flex-col gap-4 overflow-hidden sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Select a university</DialogTitle>
          <DialogDescription>
            Pick from all universities available for this course
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search universities..."
            className="pl-9"
          />
        </div>

        <div className="min-h-[240px] flex-1 overflow-y-auto pr-1">
          {loading ? (
            <div className="flex h-40 items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Loading universities…
            </div>
          ) : filteredUniversities.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No universities found.
            </p>
          ) : (
            <ul className="space-y-2">
              {filteredUniversities.map((university) => {
                const isSelected = selectedSlugs.has(university.university_slug);
                const isDisabled = isFull && !isSelected;

                return (
                  <li key={university.id || university.university_slug}>
                    <button
                      type="button"
                      disabled={isDisabled || isSelected}
                      onClick={() => handleSelect(university)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                        isSelected
                          ? "border-primary/30 bg-primary/5 opacity-70"
                          : isDisabled
                            ? "cursor-not-allowed border-gray-100 bg-gray-50 opacity-50"
                            : "border-gray-200 bg-white hover:border-primary/40 hover:bg-red-50/40"
                      }`}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${university.university_logo}`}
                        alt={university.university_name}
                        width={100}
                        height={48}
                        className="shrink-0 rounded-md bg-white object-contain p-1"
                      />
                      <span className="min-w-0 flex-1 text-sm font-semibold leading-snug">
                        {university.university_name}
                      </span>
                      {isSelected ? (
                        <Check className="size-4 shrink-0 text-primary" />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
