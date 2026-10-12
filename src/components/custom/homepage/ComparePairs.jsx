"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, GitCompare } from "lucide-react";
import MainHeading from "../shared/MainHeading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function toInternalHref(url) {
  if (!url) return "/compare-university/";
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("learningshala.com")) {
      return `${parsed.pathname}${parsed.search}`;
    }
  } catch {
    // relative path already
  }
  return url;
}

function PairCard({ item }) {
  const pairs = [...(item?.pairs || [])].sort(
    (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
  );
  const left = pairs[0];
  const right = pairs[1];
  if (!left || !right) return null;

  const href = toInternalHref(item.university_url);

  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#e8e2d9] bg-white transition duration-300"
    >
      <div className="relative flex">
        <div className="flex flex-col items-center justify-center">

        {left.banner ? (
            <Image
              src={left.banner}
              alt={left.university_name}
              width={300}
              height={100}
              className="object-cover"
            />
          ) : null}

          {/* {left.university_logo ? (
            <Image
              src={left.university_logo}
              alt={left.university_name}
              width={100}
              height={100}
              className="h-16 w-16 object-contain"
            />
          ) : null} */}
          <p className="text-sm font-extrabold leading-snug text-[#0f172a] sm:text-[15px] my-3 line-clamp-1 px-2">
            {left.university_name}
          </p>
        </div>

        <div className="flex items-center justify-center px-1 absolute top-1/3 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-[11px] font-extrabold uppercase tracking-wide text-white shadow-md shadow-primary/25 transition">
            VS
          </span>
        </div>

        <div className="flex flex-col items-center justify-center">
        {right.banner ? (
            <Image
              src={right.banner}
              alt={right.university_name}
              width={300}
              height={100}
              className="object-cover"
            />
          ) : null}
          {/* {right.university_logo ? (
            <Image
              src={right.university_logo}
              alt={right.university_name}
              width={100}
              height={100}
              className="h-16 w-16 object-contain"
            />
          ) : null} */}
          <p className="text-sm font-extrabold leading-snug text-[#0f172a] sm:text-[15px] my-3 line-clamp-1 px-2">
            {right.university_name}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#f1f5f9] px-4 py-4 sm:px-5">
        <span className="inline-flex w-full items-center justify-center gap-1 text-md font-bold text-primary">
          Compare Now
          <ArrowRight className="h-3.5 w-3.5 transition" />
        </span>
      </div>
    </Link>
  );
}

const ComparePairs = ({ comparePairs = [] }) => {
  if (!comparePairs?.length) return null;

  const showArrows = comparePairs.length > 3;

  return (
    <section className="sec_mb bg-[#faf8f5] py-10 md:py-14">
      <div className="container">
        <div className="mb-6 text-center md:mb-8">
          {/* <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <GitCompare className="h-3.5 w-3.5" />
            Popular comparisons
          </span> */}
          <MainHeading
            title={
              <>
         Popular comparisons
              
              </>
            }
            className="mb-2! text-center"
          />
          <p className="mx-auto max-w-2xl text-sm text-[#78716c] md:text-base">
            See how top online universities stack up against each other - fees,
            LMS, placements, and more.
          </p>
        </div>

        <Carousel
          className="w-full px-8 sm:px-10"
          opts={{ align: "start", loop: comparePairs.length > 3 }}
        >
          <CarouselContent className="-ml-4">
            {comparePairs.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <PairCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {showArrows && (
            <>
              <CarouselPrevious className="-left-1 sm:-left-2" />
              <CarouselNext className="-right-1 sm:-right-2" />
            </>
          )}
        </Carousel>
      </div>
    </section>
  );
};

export default ComparePairs;
