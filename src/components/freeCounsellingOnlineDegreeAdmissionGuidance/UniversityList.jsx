"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { getUniversityData } from "@/services/UniversitypageService";


const PARTNER_SLUGS = [
  "amity-university-online",
  "mahe-manipal-online",
  "lpu-online",
  "vit-online",
  "dy-patil-university-online",
];

const FALLBACK_PARTNERS = [
  { slug: "amity-university-online", name: "Amity University Online" },
  { slug: "mahe-manipal-online", name: "Online Manipal" },
  { slug: "lpu-online", name: "LPU Online" },
  { slug: "vit-online", name: "VIT Online" },
  { slug: "dy-patil-university-online", name: "DY Patil University Online" },
];

function resolvePartners(list = []) {
  const bySlug = new Map(
    list.map((university) => [university.university_slug, university])
  );

  return PARTNER_SLUGS.map((slug) => {
    const match = bySlug.get(slug);
    if (match) return match;

    const fallback = FALLBACK_PARTNERS.find((item) => item.slug === slug);
    return {
      university_slug: slug,
      university_name: fallback?.name || slug,
      university_logo: "",
    };
  });
}

const UniversityList = () => {
  const [universities, setUniversities] = useState([]);
  const [activeIndex, setActiveIndex] = useState(2);

  useEffect(() => {
    getUniversityData()
      .then((res) => {
        const list = res?.data?.data?.data ?? [];
        setUniversities(resolvePartners(list));
      })
      .catch(() => setUniversities(resolvePartners([])));
  }, []);

  const partners = useMemo(() => universities, [universities]);

  return (
    <section className="border-t border-[#efeae3] bg-[#fcfaf7] py-12 md:py-16">
      <div className="container">
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
            University Partners
          </p>
          <h2
            className={`mt-3 text-[2rem] leading-tight text-[#1a1a1a] sm:text-[2.35rem] md:text-[2.5rem] font-bold`}
          >
            India ki top online universities -{" "}
            <span className="text-primary
            ">ek hi jagah</span>
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
          {partners.map((university, index) => {
            const isActive = index === activeIndex;
            const logoSrc = university?.university_logo
              ? `${process.env.NEXT_PUBLIC_S3_BASE_URL}${university.university_logo}`
              : null;

            return (
              <button
                key={university.university_slug || university.id || index}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className={`flex min-h-[92px] bg-white items-center justify-center rounded-xl border px-3 py-5 transition-all duration-300 sm:min-h-[104px] sm:px-4 ${
                  isActive
                    ? "border-[#f5c4a8] bg-[#fff7f2] shadow-[0_4px_18px_rgba(178,51,48,0.08)]"
                    : "border-[#ece7df] bg-[#f7f4ef] hover:border-[#eadfce]"
                }`}
              >
                {logoSrc ? (
                  <Image
                    src={logoSrc}
                    alt={university.university_name || "University partner"}
                    width={140}
                    height={48}
                    className={`mx-auto h-10 w-auto max-w-full object-contain transition-all duration-300 sm:h-11 `}
                  />
                ) : (
                  <span
                    className={`text-center text-xs font-semibold leading-snug transition-colors sm:text-sm ${
                      isActive ? "text-[#1a1a1a]" : "text-[#8a8580]"
                    }`}
                  >
                    {university.university_name}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <p className="mt-6 flex items-center gap-2 text-sm text-[#7a7570]">
          <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
          ...aur bhi bahut saari UGC-approved universities.
        </p>
      </div>
    </section>
  );
};

export default UniversityList;
