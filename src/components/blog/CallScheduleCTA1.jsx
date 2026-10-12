"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { WhatsappIcon } from "next-share";
import { useLeadForm } from "@/context/LeadFormContext";
import { useLeadGuard } from "../auth/useLeadGuard";
import { toast } from "sonner";
import { globalStore } from "@/lib/store";

const EXPERT_IMAGES = [
  "/images/homepage/experts/expert1.png",
  "/images/homepage/experts/expert3.png",
  "/images/homepage/experts/expert2.png",
];

const FADE_INTERVAL_MS = 3500;

function getWhatsAppUrl() {
  const digits = globalStore.phone.get().replace(/\D/g, "");
  const text = encodeURIComponent(
    "Hi LearningShala, I was reading your blog and would like to clear a few doubts."
  );
  return `https://wa.me/${digits}?text=${text}`;
}

const CallScheduleCTA1 = () => {
  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % EXPERT_IMAGES.length);
    }, FADE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  const handleSchedule = () => {
    if (!withVerification()) {
      showLeadForm("blog - book free call cta");
      return;
    }
    toast.success("We'll call you shortly to clear your doubts 📞");
  };

  const handleWhatsApp = () => {
    window.open(getWhatsAppUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative mb-4 overflow-hidden rounded-2xl bg-yellow-100 md:mb-6 md:rounded-3xl">
      <div className="flex items-end gap-2 p-3.5 sm:gap-3 sm:p-4 md:items-stretch md:gap-0 md:p-0">
        {/* Copy + CTAs */}
        <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center md:max-w-[70%] md:px-8 md:py-9 lg:px-10">
          <div className="text-[0.9rem] font-bold leading-snug text-[#1a202c] sm:text-base md:max-w-xl md:text-[1.65rem] md:leading-tight">

            <p>Talk to a Verified Mentor.</p>
            <p>Choose the Right Online Degree.</p>

          </div>

          <div className="mt-2.5 flex gap-2 md:mt-6 md:w-full md:max-w-[280px] md:flex-col md:gap-3">
            <button
              type="button"
              onClick={handleSchedule}
              className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-primary/90 px-2.5 py-2 shadow-sm transition-transform active:scale-[0.99] md:justify-between md:px-5 md:py-3.5 md:hover:scale-[1.02]"
            >
              <span className="text-[11px] font-bold text-white sm:text-xs md:text-[15px]">
                <span className="md:hidden">Free Call</span>
                <span className="hidden md:inline">Book a Free Call</span>
              </span>
              <Calendar
                className="size-3.5 shrink-0 text-white md:size-5"
                strokeWidth={2}
              />
            </button>

            <button
              type="button"
              onClick={() => handleSchedule("video")}
              className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-white px-2.5 py-2 shadow-sm transition-transform active:scale-[0.99] md:justify-between md:px-5 md:py-3.5 md:hover:scale-[1.02]"
            >
              <span className="text-[11px] font-bold text-[#128C7E] sm:text-xs md:text-[15px]">
                WhatsApp
              </span>
              <WhatsappIcon size={18} round />
            </button>
          </div>
        </div>

        {/* Expert image — compact on mobile */}
        <div className="relative h-22 w-18 shrink-0 overflow-hidden sm:h-24 sm:w-20 md:min-h-0 md:h-auto md:w-[30%] md:shrink-0 md:self-stretch">
          {EXPERT_IMAGES.map((src, index) => {
            const isActive = index === activeIndex;
            return (
              <Image
                key={src}
                src={src}
                alt="Career counselor ready to help"
                width={420}
                height={480}
                className={`absolute bottom-0 left-1/2 h-full w-auto -translate-x-1/2 object-contain object-bottom transition-opacity duration-700 ease-in-out md:left-auto md:right-0 md:h-[95%] md:translate-x-0 ${
                  isActive ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                priority={index === 0}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CallScheduleCTA1;
