"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Headphones, Video } from "lucide-react";
import { WhatsappIcon } from "next-share";
import { useLeadForm } from "@/context/LeadFormContext";
import { useLeadGuard } from "../auth/useLeadGuard";
import { toast } from "sonner";
import { globalStore } from "@/lib/store";

const EXPERT_IMAGE = "/images/homepage/experts/expert3.png";

function getWhatsAppUrl() {
  const digits = globalStore.phone.get().replace(/\D/g, "");
  const text = encodeURIComponent(
    "Hi LearningShala, I finished reading the blog and still have a few doubts. Can you help?"
  );
  return `https://wa.me/${digits}?text=${text}`;
}

const CallScheduleCTA2 = () => {
  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();

  const handleConnect = (mode) => {
    if (mode === "whatsapp") {
      window.open(getWhatsAppUrl(), "_blank", "noopener,noreferrer");
      return;
    }

    const source =
      mode === "video"
        ? "blog cta2 - schedule video call"
        : "blog cta2 - schedule audio call";

    if (!withVerification()) {
      showLeadForm(source);
      return;
    }

    toast.success(
      mode === "video"
        ? "We'll schedule your video call shortly 📹"
        : "Our counselor will call you shortly 📞"
    );
  };

  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl bg-[#1a202c] shadow-lg">
      <div
        className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-10 size-40 rounded-full bg-[#f97316]/10 blur-3xl"
        aria-hidden
      />

      <div className="relative flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-center lg:gap-8 lg:p-8">
        {/* Expert + copy */}
        <div className="flex flex-1 items-center gap-4 sm:gap-5">
          <div className="relative shrink-0">
            <div className="size-[72px] overflow-hidden rounded-2xl ring-2 ring-white/15 sm:size-20 bg-white">
              <Image
                src={EXPERT_IMAGE}
                alt="Career counselor"
                width={80}
                height={80}
                className="size-full object-cover object-top"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 size-3.5 rounded-full border-2 border-[#1a202c] bg-emerald-400" />
          </div>

          <div className="min-w-0">
          
            <p className="mt-1 text-lg font-extrabold leading-snug text-white sm:text-xl">
            Clear your doubts before you decide.
            </p>
            <p className="mt-1 text-sm text-white/65">
            Free audio or whatsapp - whichever works for you.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:flex-wrap lg:w-auto lg:shrink-0">
          <button
            type="button"
            onClick={() => handleConnect("audio")}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary/90 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90 sm:flex-1 lg:flex-none lg:min-w-[140px]"
          >
            <Headphones className="size-4" />
            Schedule a call
          </button>

       

          <button
            type="button"
            onClick={() => handleConnect("audio")}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#09ab4a] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#20bd5a] sm:flex-1 lg:flex-none lg:min-w-[160px]"
          >
            <WhatsappIcon size={18} round />
            WhatsApp
            <ArrowRight className="size-4 opacity-70" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallScheduleCTA2;
