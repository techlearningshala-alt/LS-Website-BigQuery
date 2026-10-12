"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Headphones, MessageCircle } from "lucide-react";
import { globalStore } from "@/lib/store";
import { useLeadForm } from "@/context/LeadFormContext";
import { useLeadGuard } from "../auth/useLeadGuard";
import { toast } from "sonner";
import { WhatsappIcon } from "next-share";
import ImageSwitch from "../custom/shared/ImageSwitch";

function getWhatsAppUrl() {
  const digits = globalStore.phone.get().replace(/\D/g, "");
  const text = encodeURIComponent(
    "Hi LearningShala, I was reading your blog and would like to clear a few doubts."
  );
  return `https://wa.me/${digits}?text=${text}`;
}

const StickyBlogFooter = () => {
  const [hidden, setHidden] = useState(false);
  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.body.scrollHeight;
      setHidden(scrollPosition >= pageHeight - 80);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSchedule = () => {
    if (!withVerification()) {
      showLeadForm("blog sticky footer - schedule call");
      return;
    }
    toast.success("We'll call you shortly to clear your doubts 📞");
  };

  const handleWhatsApp = () => {
    window.open(getWhatsAppUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-red-100/80 bg-white/95 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md transition-transform duration-300 supports-backdrop-filter:bg-white/90 ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
     
      <div className="container mx-auto px-4 py-3 md:py-3.5 relative">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden min-w-0 flex-1 items-center gap-3 sm:flex">
            <div className="absolute bottom-0 left-0">
            <ImageSwitch width={120} height={120} />
            </div>
            <div className="min-w-0 pl-[65px]">
              <p className="truncate text-sm font-bold text-[#1a202c]">
                Have doubts while reading?
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Chat on WhatsApp or schedule a free call with our experts.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-1 items-center gap-2 sm:w-auto sm:flex-none">
            <button
              type="button"
              onClick={handleSchedule}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#25D366]/30 bg-[#25D366]/10 px-3 py-3 text-sm font-bold text-[#128C7E] transition-colors hover:bg-[#25D366]/15 sm:flex-none sm:px-5"
            >
              <WhatsappIcon className="size-4 shrink-0 rounded-full" />
              <span>WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleSchedule}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-3 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary/90 sm:flex-none sm:px-5"
            >
              <Calendar className="size-4 shrink-0 sm:hidden" />
              <Headphones className="hidden size-4 shrink-0 sm:block" />
              <span>Schedule call</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyBlogFooter;
