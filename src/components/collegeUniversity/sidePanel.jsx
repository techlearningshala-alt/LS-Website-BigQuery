import React from "react";
import SecondaryButton from "../custom/shared/SecondaryButton";
import { useLeadForm } from "@/context/LeadFormContext";
import { useLeadGuard } from "../auth/useLeadGuard";
import Image from "next/image";
import { toast } from "sonner";
import { CheckCircle2, ShieldCheck, UsersRound } from "lucide-react";

const SidePanel = () => {
  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();

  return (
    <aside className="sticky top-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
      <div className="mb-4 rounded-xl border border-primary/20 bg-primary/5 p-3">
        <p className="font-bold text-lg text-primary">Why LearningShala?</p>
        <p className="text-xs text-slate-600 mt-1">
        Because we stand by you every step of the way!

        </p>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 rounded-lg bg-slate-50 border border-slate-200 p-2.5">
          <Image src="/images/icons/woman.png" alt="mentor" width={24} height={24} />
          <span className="text-sm font-semibold text-slate-800">100% Free Counselling
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-slate-50 border border-slate-200 p-2.5">
          <Image src="/images/icons/star-medal.png" alt="price guarantee" width={24} height={24} />
          <span className="text-sm font-semibold text-slate-800">40+ Factors to Compare
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-slate-50 border border-slate-200 p-2.5">
          <Image src="/images/icons/user.png" alt="price guarantee" width={24} height={24} />
          <span className="text-sm font-semibold text-slate-800">A Dedicated Mentor for Your Admission-to-Placement Journey with Us!
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-slate-50 border border-slate-200 p-2.5">
          <Image src="/images/icons/university.png" alt="price guarantee" width={24} height={24} />
          <span className="text-sm font-semibold text-slate-800">      See What University Websites Don&apos;t Show You! 
          </span>
        </div>
      </div>

     

      <div
        onClick={(e) => {
          if (!withVerification()) {
            e.preventDefault(); // ⛔ stop navigation
            showLeadForm("connect from course page banner - connect now");
            return;
          }
          toast.success("Our counselor will contact you shortly 📞");
        }}
      >
        <SecondaryButton title="Schedule a Call Now" />
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-sm font-bold text-slate-900 mb-2">What will you get with a call?
        </p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-xs text-slate-600">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />
            Real confusions will be clarified by real humans 

          </li>
          <li className="flex items-start gap-2 text-xs text-slate-600">
            <UsersRound className="h-4 w-4 text-primary mt-0.5" />
            Course-university combo as per your budget
          </li>
          <li className="flex items-start gap-2 text-xs text-slate-600">
            <ShieldCheck className="h-4 w-4 text-indigo-500 mt-0.5" />
            Financial planning clarity for higher education
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SidePanel;
