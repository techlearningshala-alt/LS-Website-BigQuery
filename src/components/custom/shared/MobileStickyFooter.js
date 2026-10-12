"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  BookOpen,
  Building,
  Home,
  SearchIcon,
  User,
} from "lucide-react";
import Link from "next/link";
import Search from "./search/Search";
import { useLeadForm } from "@/context/LeadFormContext";
import { useLeadGuard } from "@/components/auth/useLeadGuard";
import { toast } from "sonner";

export default function MobileStickyFooter() {
  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();
  const [hideFooter, setHideFooter] = useState(false);
  const [routeReady, setRouteReady] = useState(false);
  const router = useRouter();
  const pathname = routeReady ? router.asPath.split("?")[0] : "";

  useEffect(() => {
    setRouteReady(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.body.scrollHeight;
      setHideFooter(scrollPosition >= pageHeight - 80);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => pathname === path;

  const linkClass = (path) =>
    `flex flex-col items-center text-[12px] py-2.5 transition-colors ${
      isActive(path)
        ? "font-semibold text-primary"
        : "text-muted-foreground"
    }`;

  const iconClass = (path) =>
    `mb-1.5 size-5 ${
      isActive(path) ? "text-primary" : ""
    }`;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 border-t border-border bg-gradient-to-t from-background via-background to-background/95 backdrop-blur shadow-2xl z-40 transition-transform duration-300 ${
        hideFooter ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex justify-between items-center w-full px-4 py-1">
        <Link href="/" className={linkClass("/")}>
          <Home className={iconClass("/")} />
          Home
        </Link>

        <Link href="/courses" className={linkClass("/courses")}>
          <BookOpen className={iconClass("/courses")} />
          Courses
        </Link>

        <Search
          trigger={
            <span className={linkClass("/search")}>
              <SearchIcon className="mb-1.5 size-5" />
              Search
            </span>
          }
        />

        <Link href="/universities" className={linkClass("/universities")}>
          <Building className={iconClass("/universities")} />
          Universities
        </Link>

        <Link className={linkClass("#")} href="#" onClick={(e) => {
                      if (!withVerification()) {
                        e.preventDefault(); // ⛔ stop navigation
                        showLeadForm("Sticky mobile footer - talk to experts");
                        return;
                      }
                      toast.success("Our counselor will contact you shortly 📞");
                    }}>
          <User className={iconClass("/profile")} />
          Talk to Experts
        </Link>
      </div>
    </div>
  );
}
