import React, { useState } from "react";
import { useLeadForm } from "@/context/LeadFormContext";
import { ArrowRight, CircleCheck, PhoneCall } from "lucide-react";
import { useLeadGuard } from "../auth/useLeadGuard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CompareCTA = () => {
  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState("mentor");

  return (
    <div className="container mx-auto mb-10 px-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {/* Card 1 — Still Confused */}
        <div className="flex flex-col items-start gap-4 rounded-3xl border border-[#e8e2d9] bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)] md:p-8">
          <div>
            <h3 className="mt-1 text-lg font-extrabold leading-snug text-[#0f172a] md:text-xl">
              Still Confused?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#78716c]">
            Not sure which university or course to choose? Get expert guidance from a verified mentor!
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              if (!withVerification()) {
                e.preventDefault(); // ⛔ stop navigation
                showLeadForm("Our Mentor will contact you shortly");
                return;
              }
              setConfirmationType("mentor");
              setConfirmationOpen(true);
            }}

            className="mt-auto inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-200 px-5 py-2.5 text-sm font-bold text-amber-700 transition hover:bg-amber-100 active:scale-95"
          >
     Talk to a mentor
            <ArrowRight className="size-4" />
          </button>
        </div>

        {/* Card 2 — All Clear */}
        <div className="flex flex-col items-start gap-4 rounded-3xl border border-primary/20 bg-white p-6 md:p-8">
          <div>
            <h3 className="mt-1 text-lg font-extrabold leading-snug text-[#0f172a] md:text-xl">
            Ready to Apply?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#78716c]">
            Found your university match? Apply now to get expert support at every step of the process!
            </p>
          </div>

          <button
            type="button"
          
            onClick={(e) => {
              if (!withVerification()) {
                e.preventDefault(); // ⛔ stop navigation
                showLeadForm("Our Expert will contact you shortly");
                return;
              }
              setConfirmationType("apply");
              setConfirmationOpen(true);
            }}
            className="mt-auto inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary/90 active:scale-95"
          >
            Apply Now
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <DialogContent className="overflow-hidden rounded-3xl border-primary/15 p-0 sm:max-w-md">
          <div className="bg-linear-to-br from-primary/10 via-white to-amber-50 px-6 py-8 text-center sm:px-8">
            {/* <span className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/25">
              <CircleCheck className="size-8" />
            </span> */}
            <DialogHeader className="items-center text-center">
              <DialogTitle className="text-lg font-bold text-[#0f172a] sm:text-2xl">
                {confirmationType === "apply"
                  ? "You’re ready to apply. We’re ready to help!"
                  : "You’ve taken the first step. Now, keep your phone closer!"}
              </DialogTitle>
              <DialogDescription className="mt-3 text-sm text-[#57534e] sm:text-base">
                {confirmationType === "apply"
                  ? <>Our team will reach out shortly to guide you through the <span className="text-primary font-bold">admission process.</span></>
                  : <>A <span className="text-primary font-bold">Verified Mentor</span> from LearningShala will connect with you shortly!</>}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm">
              <PhoneCall className="size-4" />
              Expect a call shortly
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompareCTA;
