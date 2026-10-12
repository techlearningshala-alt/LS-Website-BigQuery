import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Headphones, Sparkles, Video } from "lucide-react";
import PrimaryButton from "../custom/shared/PrimaryButton";
import { useLeadForm } from "@/context/LeadFormContext";
import { useLeadGuard } from "../auth/useLeadGuard";
import { toast } from "sonner";
import { WhatsappIcon } from "next-share";

const COUNSELOR_AVATARS = [
  "/images/homepage/experts/palak.webp",
  "/images/homepage/experts/mayank.webp",
  "/images/homepage/experts/surabhi.webp",
];

const CallScheduleCTA = () => {
  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();

  const handleSchedule = (mode) => {
    const source =
      mode === "video"
        ? "blog - schedule video call"
        : "blog - schedule audio call";

    if (!withVerification()) {
      showLeadForm(source);
      return;
    }

    toast.success(
      mode === "video"
        ? "We'll schedule your video call shortly 📹"
        : "We'll call you shortly to clear your doubts 📞"
    );
  };

  return (
    <Card className="relative mb-6 overflow-hidden py-0 border-0 bg-[#fff2f2]">
    

      <div className="relative p-6 md:p-7">
     

        <p className="text-xl font-extrabold leading-snug text-[#1a202c] md:text-2xl">
        Compare Facts. 
          <span className="text-primary"> Not Promises.</span>
        </p>
        {/* <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
         Too Many Universities! One Smart Comparison.
        </p> */}
        <p className="mt-2 text-sm leading-relaxed text-black">
        Compare 100+ UGC approved online universities on 40+ verified parameters and choose the one that truly fits your goals.
        </p>

        <div className="mt-5 flex items-center gap-3">
          <div className="flex -space-x-2">
            {COUNSELOR_AVATARS.map((src) => (
              <Image
                key={src}
                src={src}
                width={36}
                height={36}
                alt=""
                className="size-9 rounded-full border-2 border-white object-cover shadow-sm"
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="font-bold text-[#1a202c]">150+ counselors</span>{" "}
            ready to help
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => window.open("/compare-in-two-mins/")}
            className="cursor-pointer group flex items-center gap-3 rounded-lg bg-primary/90 px-2 py-2 text-left shadow-sm transition-all justify-center"
          >
                <Headphones className="size-7 text-white" />
                <span className="block text-sm font-bold text-white">Compare Online Universities</span>
          </button>

          <button
            type="button"
            onClick={() => handleSchedule("video")}
            className="cursor-pointer group flex items-center gap-3 rounded-lg bg-[#09ab4a] px-2 py-2 text-left shadow-sm transition-all justify-center"
          >
           <WhatsappIcon className="size-7 text-white rounded-full" />
           <span className="block text-sm font-bold text-white">Connect to a Verified Mentor</span>
          </button>
        </div>

      
      </div>
    </Card>
  );
};

export default CallScheduleCTA;
