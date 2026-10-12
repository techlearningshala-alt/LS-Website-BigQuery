import React from "react";
import Link from "next/link";
import {
  Zap,
  BadgeCheck,
  ShieldCheck,
  Sparkles,
  Percent,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const DEFAULT_FEATURES = [
  {
    title: "Results in Seconds",
    description: "No waiting, just answers",
    icon: Zap,
    iconClass: "text-blue-600",
    bgClass: "bg-blue-500/10",
    ringClass: "ring-blue-500/15",
    accentClass: "from-blue-500/80 via-blue-400/40 to-transparent",
    glowClass: "group-hover:shadow-blue-500/10",
  },
  {
    title: "Precision You Can Trust",
    description: "Accurate calculations, every time",
    icon: BadgeCheck,
    iconClass: "text-emerald-600",
    bgClass: "bg-emerald-500/10",
    ringClass: "ring-emerald-500/15",
    accentClass: "from-emerald-500/80 via-emerald-400/40 to-transparent",
    glowClass: "group-hover:shadow-emerald-500/10",
  },
  {
    title: "Your Privacy Matters",
    description: "We don't store your data",
    icon: ShieldCheck,
    iconClass: "text-violet-600",
    bgClass: "bg-violet-500/10",
    ringClass: "ring-violet-500/15",
    accentClass: "from-violet-500/80 via-violet-400/40 to-transparent",
    glowClass: "group-hover:shadow-violet-500/10",
  },
  {
    title: "Simple by Design",
    description: "Calculate without the confusion",
    icon: Sparkles,
    iconClass: "text-rose-600",
    bgClass: "bg-rose-500/10",
    ringClass: "ring-rose-500/15",
    accentClass: "from-rose-500/80 via-rose-400/40 to-transparent",
    glowClass: "group-hover:shadow-rose-500/10",
    featured: true,
  },
];

const TRUST = [
  { label: "100% Free" },
  { label: "No Sign Up" },
  { label: "Instant Results" },
];

function FeatureCard({
  title,
  description,
  icon: Icon,
  iconClass,
  bgClass,
  ringClass,
  accentClass,
  glowClass,
  featured,
  index,
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[22px] border border-[#e8e2d9] bg-white/95 p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(15,23,42,0.1)] sm:p-5",
        glowClass,
        featured &&
          "border-amber-200/60 bg-gradient-to-br from-[#fffbeb] via-white to-[#fff7ed]"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
          accentClass
        )}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br from-primary/5 to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative flex items-start gap-3.5">
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1 sm:h-12 sm:w-12",
            bgClass,
            iconClass,
            ringClass
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          {/* <div className="mb-1 flex items-center gap-2">
            <span className="text-[10px] font-bold tabular-nums tracking-widest text-[#c4bdb4]">
              0{index + 1}
            </span>
            <span className="h-px flex-1 bg-linear-to-r from-[#e8e2d9] to-transparent" />
          </div> */}
          <h2 className="text-sm font-bold leading-snug text-[#1a1a1a] sm:text-[15px]">
            {title}
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-[#78716c] sm:text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

const ToolInnerBanner = ({
  title = "Percentage Calculator",
  description = "Calculating exam scores, discounts, salary hikes, growth, taxes, or everyday percentages, with this Percentage Calculator.",
  features = DEFAULT_FEATURES,
  icon: Icon = Percent,
  iconClass = "text-blue-600",
  iconBgClass = "bg-blue-500/10",
  iconRingClass = "ring-blue-500/20",
  category = "Academic",
}) => {
  return (
    <section className="relative overflow-hidden bg-[#f4f7fb]">
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(255,255,255,0.95),transparent_55%),linear-gradient(180deg,#eef4fb_0%,#f8fafc_45%,#ffffff_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-400/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-[600px] -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl"
        aria-hidden
      />

      {/* Decorative grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]"
        aria-hidden
      />

      <div className="container relative mx-auto px-4 py-8 md:py-12">
        <Breadcrumb className="mb-5 md:mb-6">
          <BreadcrumbList className=" text-xs backdrop-blur-sm sm:text-sm">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="font-medium text-[#78716c] hover:text-primary">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-[#c4bdb4]" />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/tools/" className="font-medium text-[#78716c] hover:text-primary">
                  Tools
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-[#c4bdb4]" />
            <BreadcrumbItem>
              <BreadcrumbPage className="max-w-[200px] truncate font-semibold text-[#0f172a] sm:max-w-none">
                {title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Main premium panel */}
        <div className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl"
            aria-hidden
          />

          {/* Watermark */}
          <div
            className="pointer-events-none absolute right-4 top-4 select-none text-[120px] font-black leading-none text-[#0f172a]/[0.025] sm:right-8 sm:top-6 sm:text-[160px]"
            aria-hidden
          >
            %
          </div>

          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
            {/* Left — hero copy */}
            <div className="lg:col-span-5 xl:col-span-5">
              {/* <div className="mb-5 flex flex-wrap items-center gap-3">
                <span
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-[18px] ring-1 shadow-[0_8px_24px_rgba(15,23,42,0.06)]",
                    iconBgClass,
                    iconClass,
                    iconRingClass
                  )}
                >
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </span>
                <span className="rounded-full border border-[#e8e2d9] bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#78716c] shadow-sm">
                  {category}
                </span>
              </div> */}

              <h1 className="mb-4 text-[1.75rem] font-extrabold leading-[1.12] tracking-tight text-[#0f172a] sm:text-4xl lg:text-[2.5rem]">
                {title.split(" ").length > 1 ? (
                  <>
                    {title.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="text-primary">
                      {title.split(" ").slice(-1)}
                    </span>
                  </>
                ) : (
                  title
                )}
              </h1>

              <p className="mb-6 max-w-md text-[15px] leading-relaxed text-[#57534e] sm:text-base">
                {description}
              </p>

              <div className="flex flex-wrap gap-2">
                {TRUST.map(({ label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#e8e2d9] bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#44403c] shadow-sm"
                  >
                    <BadgeCheck
                      className="h-3.5 w-3.5 text-emerald-500"
                      strokeWidth={2.2}
                    />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — feature grid */}
            <div className="lg:col-span-7 xl:col-span-7">
              {/* <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#a8a29e]">
                  Why use this tool
                </p>
                <span className="hidden h-px flex-1 bg-gradient-to-r from-[#e8e2d9] to-transparent sm:block" />
              </div> */}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {features.map((feature, index) => (
                  <FeatureCard key={feature.title} {...feature} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolInnerBanner;
