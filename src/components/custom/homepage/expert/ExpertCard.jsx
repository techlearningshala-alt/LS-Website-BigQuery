import {
  BadgeCheck,
  ChevronRight,
  GraduationCap,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useLeadForm } from "@/context/LeadFormContext";
import { useLeadGuard } from "@/components/auth/useLeadGuard";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ExpertCard = ({ item }) => {
  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();

  const handleGetAdvice = (e) => {
    if (!withVerification()) {
      e.preventDefault();
      showLeadForm("get advice from mentor card on homepage");
      return;
    }
    toast.success("Our counselor will contact you shortly 📞");
  };

  const isVerified = item?.verified === 1;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-red-100/70",
        "bg-linear-to-b from-[#fff6f6] via-white to-white",
        "shadow-[0_10px_40px_rgba(15,23,42,0.07)]",
        "transition-all duration-500 ease-out",
        "hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-[0_24px_56px_rgba(220,38,38,0.14)]"
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-rose-400 to-amber-400"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative p-3.5 pb-0">
        {item?.label && (
          <span className="absolute right-5 top-5 z-20 inline-flex items-center gap-1 rounded-full bg-linear-to-r from-amber-500 to-amber-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg shadow-amber-500/30">
            <Star className="h-3 w-3 fill-white text-white" />
            {item.label}
          </span>
        )}

        <div className="relative overflow-hidden rounded-2xl ring-1 ring-slate-900/5">
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${item?.thumbnail}`}
            className="h-[252px] w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.04]"
            alt={item?.name || "Mentor"}
            width={356}
            height={354}
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-900/55 via-slate-900/10 to-transparent"
            aria-hidden
          />

          {isVerified && (
            <span className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1 rounded-full border border-emerald-200/80 bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 shadow-sm backdrop-blur-sm">
              <BadgeCheck className="h-3.5 w-3.5" />
              Verified Mentor
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-4 pt-4">
        <div className="mb-1 flex items-center justify-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary/70" aria-hidden />
          <h3 className="line-clamp-1 text-center text-[17px] font-bold tracking-tight text-foreground">
            {item?.name}
          </h3>
          <Sparkles className="h-3.5 w-3.5 text-primary/70" aria-hidden />
        </div>
        {/* <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Career mentor
        </p> */}

        <div className="relative mb-4 overflow-hidden rounded-2xl border border-slate-100/90 bg-white/90">
          <div className="absolute inset-y-3 left-1/2 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-slate-200 to-transparent" />
          <div className="grid grid-cols-2">
            <StatCell
              icon={GraduationCap}
              label="Experience"
              value={`${item?.experience ?? "—"} yrs`}
            />
            <StatCell
              icon={Users}
              label="Students Mentored"
              value={item?.assist_student ?? "—"}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleGetAdvice}
          className={cn(
            "mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5",
            "bg-linear-to-r from-[#082038] to-[#0f2d4d] text-sm font-bold text-white",
            "shadow-[0_8px_24px_rgba(8,32,56,0.35)]",
            "transition-all duration-300",
            "hover:from-[#0a2844] hover:to-[#123a5f] hover:shadow-[0_12px_28px_rgba(8,32,56,0.45)]",
            "active:scale-[0.98]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
          )}
        >
          Get Advice Now
          <ChevronRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </article>
  );
};

function StatCell({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-center px-1 py-3.5 text-center">
      {/* <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10">
        <Icon className="h-4 w-4" strokeWidth={2.25} />
      </span> */}
      <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="mt-0.5 text-sm font-bold tabular-nums text-foreground">
        {value}
      </span>
    </div>
  );
}

export default ExpertCard;
