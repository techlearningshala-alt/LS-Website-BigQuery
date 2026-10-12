import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Percent,
  GraduationCap,
  Calculator,
  ClipboardList,
  CalendarCheck,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { tools } from "@/lib/Toolinfo";
import { cn } from "@/lib/utils";
import ContentModal from "../custom/shared/modal/ContentModal";
import AllTools from "./AllTools";

const TOOL_VISUALS = {
  1: { icon: Percent, color: "text-[#2563eb]", bg: "bg-[#eff6ff]", ring: "ring-[#dbeafe]" },
  2: { icon: GraduationCap, color: "text-[#7c3aed]", bg: "bg-[#f5f3ff]", ring: "ring-[#ede9fe]" },
  4: { icon: Calculator, color: "text-[#db2777]", bg: "bg-[#fdf2f8]", ring: "ring-[#fce7f3]" },
  3: { icon: ClipboardList, color: "text-[#ea580c]", bg: "bg-[#fff7ed]", ring: "ring-[#ffedd5]" },
  5: { icon: GraduationCap, color: "text-[#0d9488]", bg: "bg-[#f0fdfa]", ring: "ring-[#ccfbf1]" },
  6: { icon: Calculator, color: "text-[#4f46e5]", bg: "bg-[#eef2ff]", ring: "ring-[#e0e7ff]" },
  7: { icon: CalendarCheck, color: "text-[#16a34a]", bg: "bg-[#f0fdf4]", ring: "ring-[#dcfce7]" },
  8: { icon: TrendingUp, color: "text-primary", bg: "bg-[#fff1f2]", ring: "ring-[#fecdd3]" },
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

function pathSlug(path) {
  return String(path || "")
    .replace(/^\/+|\/+$/g, "")
    .replace(/^tools\//, "");
}

const OtherTools = ({ excludePath } = {}) => {
  const router = useRouter();

  const otherTools = useMemo(() => {
    const current =
      excludePath ||
      router.asPath?.split("?")[0]?.replace(/\/+$/, "") ||
      "";
    const currentSlug = pathSlug(current.replace(/^\/tools\//, "/"));

    // Show every tool from Toolinfo; only skip exact current page match
    return tools.filter((tool) => {
      const toolSlug = pathSlug(tool.path);
      if (!toolSlug) return false;
      if (!currentSlug) return true;
      return toolSlug !== currentSlug;
    });
  }, [excludePath, router.asPath]);

  if (!otherTools.length) return null;

  return (
    <aside className="sticky top-4 overflow-hidden rounded-2xl border border-[#e8eef5] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
      <div className="border-b border-[#e8eef5] bg-[#f8fafc] px-4 py-3.5">
        <h2 className="mt-0.5 text-base font-extrabold text-[#0f172a]">
          Other Calculators
        </h2>
      </div>

      <ul className="divide-y divide-[#f1f5f9]">
        {otherTools.map((tool) => {
          const visual = TOOL_VISUALS[tool.id] || TOOL_VISUALS[1];
          const Icon = visual.icon;

          return (
            <li key={tool.id}>
              <Link
                href={toolHref(tool.path)}
                className="group flex items-center gap-3 px-4 py-3.5 transition hover:bg-[#f8fafc]"
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1",
                    visual.bg,
                    visual.color,
                    visual.ring
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold leading-snug text-[#0f172a] transition group-hover:text-primary">
                    {tool.name}
                  </span>
                  {/* <span className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-[#64748b]">
                    {tool.des}
                  </span> */}
                </span>

                <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-[#cbd5e1] transition group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-[#e8eef5] px-4 py-4 flex justify-center items-center">
      <ContentModal ContentClassName="!max-w-6xl" trigger={ <p
   
   className="flex justify-center items-center gap-1.5 text-md font-bold text-primary 
   transition hover:gap-2"

 >
   View all tools
   <ArrowRight className="h-3.5 w-3.5" />
 </p>} content={<AllTools/>} />
      </div>
    </aside>
  );
};

export default OtherTools;
