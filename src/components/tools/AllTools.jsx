import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Percent,
  GraduationCap,
  Calculator,
  ClipboardList,
  CalendarCheck,
  Cake,
  Landmark,
  ArrowRight,
  Search,
} from "lucide-react";
import { tools } from "@/lib/Toolinfo";
import { cn } from "@/lib/utils";
import MainHeading from "../custom/shared/MainHeading";

const TOOL_VISUALS = {
  1: { icon: Percent, color: "text-[#2563eb]", bg: "bg-[#eff6ff]", ring: "ring-[#dbeafe]" },
  2: { icon: GraduationCap, color: "text-[#7c3aed]", bg: "bg-[#f5f3ff]", ring: "ring-[#ede9fe]" },
  4: { icon: Calculator, color: "text-[#db2777]", bg: "bg-[#fdf2f8]", ring: "ring-[#fce7f3]" },
  3: { icon: ClipboardList, color: "text-[#ea580c]", bg: "bg-[#fff7ed]", ring: "ring-[#ffedd5]" },
  5: { icon: GraduationCap, color: "text-[#0d9488]", bg: "bg-[#f0fdfa]", ring: "ring-[#ccfbf1]" },
  6: { icon: Calculator, color: "text-[#4f46e5]", bg: "bg-[#eef2ff]", ring: "ring-[#e0e7ff]" },
  7: { icon: CalendarCheck, color: "text-[#16a34a]", bg: "bg-[#f0fdf4]", ring: "ring-[#dcfce7]" },
  8: { icon: Cake, color: "text-[#e62a38]", bg: "bg-[#fff1f2]", ring: "ring-[#fecdd3]" },
  9: { icon: Landmark, color: "text-[#0369a1]", bg: "bg-[#f0f9ff]", ring: "ring-[#bae6fd]" },
};

function toolHref(path) {
  if (!path) return "/tools/";
  if (path.includes("roi") || path.includes("common-roi")) {
    return "/tools/roi-calculator/";
  }

  const slug = path.replace(/^\/+|\/+$/g, "");
  const href = slug.startsWith("tools/") ? `/${slug}` : `/tools/${slug}`;
  return href.endsWith("/") ? href : `${href}/`;
}

function ToolCard({ tool }) {
  const visual = TOOL_VISUALS[tool.id] || TOOL_VISUALS[1];
  const Icon = visual.icon;

  return (
    <Link
      href={toolHref(tool.path)}
      className="group flex h-full flex-col rounded-2xl border border-[#e8eef5] bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition group-hover:scale-105",
            visual.bg,
            visual.color,
            visual.ring
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>
        <span className="rounded-full bg-[#f1f5f9] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#64748b]">
          {tool.category}
        </span>
      </div>

      <h3 className="mb-2 text-md sm:text-lg font-bold leading-snug text-[#0f172a] transition group-hover:text-primary">
        {tool.name}
      </h3>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-[#64748b] line-clamp-3">
        {tool.des}
      </p>

      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">
         Calculate Now
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

const AllTools = ({ search = "", onSearchChange }) => {
  const [localSearch, setLocalSearch] = useState("");

  const searchValue = onSearchChange ? search : localSearch;
  const setSearchValue = onSearchChange || setLocalSearch;

  const filtered = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return tools;
    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.des.toLowerCase().includes(q)
    );
  }, [searchValue]);

  return (
    <section id="all-tools" className="bg-[#f8fafc] py-4">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            {/* <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0284c7]">
              Explore calculators
            </p> */}
          
            <MainHeading title="Popular Calculators" className="mb-2! text-2xl!" />
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#64748b] sm:text-[15px]">
            Most used calculators by students and professionals
            </p>
          </div>

          <div className="relative w-full max-w-sm">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]"
              aria-hidden
            />
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search calculators..."
              className="h-11 w-full rounded-xl border border-[#e2e8f0] bg-white py-2.5 pl-10 pr-4 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
              aria-label="Search tools"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {!filtered.length && (
          <div className="rounded-2xl border border-dashed border-[#cbd5e1] bg-white px-6 py-12 text-center">
            <p className="font-semibold text-[#0f172a]">No tools found</p>
            <p className="mt-1 text-sm text-[#64748b]">
              Try another search keyword.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllTools;
