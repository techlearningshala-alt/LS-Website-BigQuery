"use client";

import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ArrowRight, CalendarDays, Clock3, Lock, Sun, Sunset, Moon } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLeadForm } from "@/context/LeadFormContext";
import { submitLead } from "@/services/LeadService";
import { useRouter } from "next/router";

const BUDGET_OPTIONS = [
  { value: "Under ₹30,000/year", label: "Under ₹30,000/year" },
  { value: "₹30,000 – ₹80,000", label: "₹30,000 – ₹80,000" },
  { value: "₹80,000 – ₹1,20,000", label: "₹80,000 – ₹1,20,000" },
  { value: "₹1,20,000+", label: "₹1,20,000+" },

];

const TIME_PERIODS = [
  {
    value: "morning",
    label: "Morning",
    hint: "10–12",
    icon: Sun,
    slots: [
      { value: "10:00", label: "10:00 AM" },
      { value: "11:00", label: "11:00 AM" },
      { value: "12:00", label: "12:00 PM" },
      { value: "13:00", label: "1:00 PM" },
      { value: "14:00", label: "2:00 PM" },
      { value: "15:00", label: "3:00 PM" },
      { value: "16:00", label: "4:00 PM" },
      { value: "17:00", label: "5:00 PM" },
      { value: "18:00", label: "6:00 PM" },
      { value: "19:00", label: "7:00 PM" },
      { value: "20:00", label: "8:00 PM" },
      { value: "21:00", label: "9:00 PM" },
    ],
  },
  {
    value: "afternoon",
    label: "Afternoon",
    hint: "1–4",
    icon: Sunset,
    slots: [
      { value: "13:00", label: "1:00 PM" },
      { value: "14:00", label: "2:00 PM" },
      { value: "15:00", label: "3:00 PM" },
      { value: "16:00", label: "4:00 PM" },
    ],
  },
  {
    value: "evening",
    label: "Evening",
    hint: "5–9",
    icon: Moon,
    slots: [
      { value: "17:00", label: "5:00 PM" },
      { value: "18:00", label: "6:00 PM" },
      { value: "19:00", label: "7:00 PM" },
      { value: "20:00", label: "8:00 PM" },
      { value: "21:00", label: "9:00 PM" },
    ],
  },
];

function buildUpcomingDays(count = 7) {
  const days = [];
  const now = new Date();
  for (let i = 0; i < count; i += 1) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    days.push({
      value: `${yyyy}-${mm}-${dd}`,
      weekday:
        i === 0
          ? "Today"
          : i === 1
            ? "Tomorrow"
            : d.toLocaleDateString("en-IN", { weekday: "short" }),
      day: dd,
      month: d.toLocaleDateString("en-IN", { month: "short" }),
    });
  }
  return days;
}

const COURSE_OTHERS_VALUE = "__ls_others__";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Valid 10-digit phone is required"),
  email: z.string().email("Valid email is required"),
  course: z.string().min(1, "Please select a course"),
  budget: z.string().optional(),
  question: z.string().optional(),
  preferred_date: z.string().optional(),
  preferred_time: z.string().optional(),
});

const fieldLabelClass =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a8f98]";

const fieldInputClass =
  "h-12 rounded-xl border-[#e6e2dc] bg-[#faf8f5] px-3.5 text-[15px] text-[#1a202c] shadow-none placeholder:text-[#a8aeb8] focus-visible:border-primary/40 focus-visible:ring-primary/20";

const OnlineForm = () => {
  const router = useRouter();
  const { menuData } = useLeadForm();
  const [submitting, setSubmitting] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [timePeriod, setTimePeriod] = useState("morning");
  const [draftDate, setDraftDate] = useState("");
  const [draftTime, setDraftTime] = useState("");
  const upcomingDays = useMemo(() => buildUpcomingDays(7), []);

  const courseOptions = useMemo(() => {
    if (!menuData?.data) return [];
    const options = Object.values(menuData.data)
      .flat()
      .map((course) => ({
        value: String(course.course_id),
        label: course.course_name,
        name: course.course_name,
      }));
    return [
      ...options,
      {
        value: COURSE_OTHERS_VALUE,
        label: "Others",
        name: "Others",
      },
    ];
  }, [menuData]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      course: "",
      budget: "",
      question: "",
      preferred_date: "",
      preferred_time: "",
    },
  });

  const selectedCourse = watch("course");
  const selectedBudget = watch("budget");
  const preferredDate = watch("preferred_date");
  const preferredTime = watch("preferred_time");

  const activePeriod =
    TIME_PERIODS.find((p) => p.value === timePeriod) || TIME_PERIODS[0];

  const selectedScheduleLabel = useMemo(() => {
    if (!preferredDate && !preferredTime) return "";
    const day = upcomingDays.find((d) => d.value === preferredDate);
    const time = TIME_PERIODS.flatMap((p) => p.slots).find(
      (s) => s.value === preferredTime
    );
    const datePart = preferredDate
      ? `${day?.weekday || ""}, ${new Date(`${preferredDate}T00:00:00`).toLocaleDateString(
        "en-IN",
        { day: "numeric", month: "short" }
      )}`
      : "";
    return [datePart, time?.label].filter(Boolean).join(" · ");
  }, [preferredDate, preferredTime, upcomingDays]);

  const openScheduleDialog = () => {
    setDraftDate(preferredDate || "");
    setDraftTime(preferredTime || "");
    if (preferredTime) {
      const period = TIME_PERIODS.find((p) =>
        p.slots.some((s) => s.value === preferredTime)
      );
      if (period) setTimePeriod(period.value);
    }
    setScheduleOpen(true);
  };

  const selectTimeSlot = (timeValue) => {
    if (!draftDate) {
      toast.error("Please select a date first");
      return;
    }
    setDraftTime(timeValue);
    setValue("preferred_date", draftDate, { shouldValidate: true });
    setValue("preferred_time", timeValue, { shouldValidate: true });
    setScheduleOpen(false);
  };

  const clearSchedule = () => {
    setValue("preferred_date", "");
    setValue("preferred_time", "");
    setDraftDate("");
    setDraftTime("");
    setTimePeriod("morning");
  };

  const onSubmit = async (data) => {
    const courseObj = courseOptions.find((c) => c.value === data.course);
    const budgetObj = BUDGET_OPTIONS.find((b) => b.value === data.budget);
    const allSlots = TIME_PERIODS.flatMap((p) => p.slots);
    const timeObj = allSlots.find((t) => t.value === data.preferred_time);

    let preferredLabel = "";
    if (data.preferred_date || data.preferred_time) {
      const datePart = data.preferred_date
        ? new Date(`${data.preferred_date}T00:00:00`).toLocaleDateString("en-IN", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        : "";
      const timePart = timeObj?.label || data.preferred_time || "";
      preferredLabel = [datePart, timePart].filter(Boolean).join(" · ");
    }

    const questions = [
      data.question?.trim()
        ? { question: "Your question", answer: data.question.trim() }
        : null,
      budgetObj
        ? { question: "Budget", answer: budgetObj.label }
        : null,
      preferredLabel
        ? { question: "Preferred date & time", answer: preferredLabel }
        : null,
    ].filter(Boolean);

    const payload = {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      course:
        data.course === COURSE_OTHERS_VALUE
          ? "Others"
          : courseObj?.name || data.course || "",
      course_id:
        data.course === COURSE_OTHERS_VALUE
          ? ""
          : courseObj?.value || data.course || "",
      budget: budgetObj?.label || data.budget || "",
      message: data.question?.trim() || "",
      preferred_date: data.preferred_date || "",
      preferred_time: timeObj?.label || data.preferred_time || "",
      specialization: "",
      state: "Delhi",
      university: "No University",
      click_source: "free counselling online degree admission guidance",
      lead_url: typeof window !== "undefined" ? window.location.href : "",
      questions: JSON.stringify(questions),
      filter_lead : "b2b_free_counselling",
      source:
        (typeof router.query.source === "string" && router.query.source) ||
        "Organic",
      sub_source:
        (typeof router.query.sub_source === "string" &&
          router.query.sub_source) ||
        "direct",
    };
    

    // Log every field before API call
    // console.log("All form fields (before send):", {
    //   name: payload.name,
    //   email: payload.email,
    //   phone: payload.phone,
    //   course: payload.course,
    //   course_id: payload.course_id,
    //   budget: payload.budget,
    //   message: payload.question,
    //   preferred_date: payload.preferred_date,
    //   preferred_time: payload.preferred_time,
    //   specialization: payload.specialization,
    //   state: payload.state,
    //   university: payload.university,
    //   click_source: payload.click_source,
    //   lead_url: payload.lead_url,
    //   questions: payload.questions,
    // });
    // console.log("Full payload (before send):", payload);

    setSubmitting(true);
    try {
      await submitLead(payload);
      toast.success("Thanks! We'll call you shortly 😊");
      reset();
      setTimePeriod("morning");
      setDraftDate("");
      setDraftTime("");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full space-y-4 rounded-2xl bg-white p-5 sm:p-6"
      noValidate
    >
      <div>
        <Label htmlFor="fc-name" className={fieldLabelClass}>
          Name <span className="text-primary">*</span>
        </Label>
        <Input
          id="fc-name"
          type="text"
          placeholder="Aapka pura naam"
          className={fieldInputClass}
          {...register("name")}
        />
        {errors.name ? (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="fc-phone" className={fieldLabelClass}>
          Phone Number <span className="text-primary">*</span>
        </Label>
        <Input
          id="fc-phone"
          type="tel"
          inputMode="numeric"
          placeholder="10-digit mobile number"
          className={fieldInputClass}
          value={watch("phone") || ""}
          onChange={(e) =>
            setValue("phone", e.target.value.replace(/\D/g, "").slice(0, 10), {
              shouldValidate: true,
            })
          }
        />
        {errors.phone ? (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="fc-email" className={fieldLabelClass}>
          Email <span className="text-primary">*</span>
        </Label>
        <Input
          id="fc-email"
          type="email"
          placeholder="you@example.com"
          className={fieldInputClass}
          {...register("email")}
        />
        {errors.email ? (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className={fieldLabelClass}>Course <span className="text-primary">*</span></Label>
          <Select
            value={selectedCourse}
            onValueChange={(val) =>
              setValue("course", val, { shouldValidate: true })
            }
          >
            <SelectTrigger className={`${fieldInputClass} w-full`}>
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              {courseOptions.map((course) => (
                <SelectItem key={course.value} value={course.value}>
                  {course.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.course ? (
            <p className="mt-1 text-sm text-red-500">{errors.course.message}</p>
          ) : null}
        </div>

        <div>
          <Label className={fieldLabelClass}>Budget (Optional)</Label>
          <Select
            value={selectedBudget}
            onValueChange={(val) =>
              setValue("budget", val, { shouldValidate: true })
            }
          >
            <SelectTrigger className={`${fieldInputClass} w-full`}>
              <SelectValue placeholder="Select Budget" />
            </SelectTrigger>
            <SelectContent>
              {BUDGET_OPTIONS.map((budget) => (
                <SelectItem key={budget.value} value={budget.value}>
                  {budget.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.budget ? (
            <p className="mt-1 text-sm text-red-500">{errors.budget.message}</p>
          ) : null}
        </div>
      </div>

      <div>
        <Label htmlFor="fc-question" className={fieldLabelClass}>
          Your Question (Optional)
        </Label>
        <Textarea
          id="fc-question"
          placeholder="Kya jaanna chahenge?"
          rows={3}
          className={`${fieldInputClass} min-h-[88px] resize-none py-3`}
          {...register("question")}
        />
      </div>

      <div>
        <Label className={fieldLabelClass}>Preferred Date &amp; Time (Optional)</Label>
        <button
          type="button"
          onClick={openScheduleDialog}
          className={`flex h-12 w-full items-center gap-3 rounded-xl border px-3.5 text-left transition-colors ${selectedScheduleLabel
              ? "border-primary/30 bg-[#fff5f4]"
              : "border-[#e6e2dc] bg-[#faf8f5] hover:border-primary/25"
            }`}
        >
          <span
            className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${selectedScheduleLabel
                ? "bg-primary text-white"
                : "bg-white text-primary ring-1 ring-[#e6e2dc]"
              }`}
          >
            <CalendarDays className="size-4" />
          </span>
          <span className="min-w-0 flex-1">
            {selectedScheduleLabel ? (
              <>
                <span className="block text-[10px] font-semibold uppercase tracking-wide text-primary/70">
                  Call scheduled
                </span>
                <span className="block truncate text-sm font-bold text-[#1a202c]">
                  {selectedScheduleLabel}
                </span>
              </>
            ) : (
              <span className="text-[15px] text-[#a8aeb8]">
                Choose preferred date &amp; time
              </span>
            )}
          </span>
          {selectedScheduleLabel ? (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                clearSchedule();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  clearSchedule();
                }
              }}
              className="text-xs font-semibold text-[#9a948c] hover:text-primary"
            >
              Clear
            </span>
          ) : (
            <ArrowRight className="size-4 shrink-0 text-[#9a948c]" />
          )}
        </button>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-[15px] font-bold text-white shadow-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Get My Free Guidance Call"}
        {!submitting ? <ArrowRight className="size-4" strokeWidth={2.5} /> : null}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-[#9aa0a8]">
        <Lock className="size-3.5 shrink-0" />
        Aapki details 100% safe. Koi spam nahi.
      </p>

      <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
        <DialogContent
          className="flex max-h-[85dvh] flex-col gap-0 overflow-hidden rounded-2xl border-[#efeae3] p-0 sm:max-w-md"
          overlayClassName="bg-black/55 backdrop-blur-sm"
        >
          <DialogHeader className="shrink-0 border-b border-[#efeae3] px-5 py-4 text-left">
            <DialogTitle className="text-lg font-extrabold text-[#1a202c]">
              Choose preferred date & time
            </DialogTitle>
            {/* <DialogDescription className="text-sm text-[#7a7570]">
              Apna preferred date aur time choose karein.
            </DialogDescription> */}
          </DialogHeader>

          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-5">
            <div className="min-w-0">
              <p className={fieldLabelClass}>Date</p>
              <div className="relative min-w-0">
                <div className="flex gap-2 overflow-x-auto overscroll-x-contain pb-2 touch-pan-x [-webkit-overflow-scrolling:touch] [scrollbar-width:thin]">
                  {upcomingDays.map((day) => {
                    const isSelected = draftDate === day.value;
                    return (
                      <button
                        key={day.value}
                        type="button"
                        onClick={() => setDraftDate(day.value)}
                        className={`flex w-[68px] shrink-0 flex-col items-center rounded-2xl border px-2.5 py-2.5 transition-all ${isSelected
                            ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                            : "border-[#e6e2dc] bg-[#faf8f5] text-[#3d3a36] hover:border-primary/30"
                          }`}
                      >
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wide ${isSelected ? "text-white/80" : "text-[#9a948c]"
                            }`}
                        >
                          {day.weekday}
                        </span>
                        <span className="mt-0.5 text-lg font-extrabold leading-none">
                          {day.day}
                        </span>
                        <span
                          className={`mt-0.5 text-[10px] font-medium ${isSelected ? "text-white/75" : "text-[#9a948c]"
                            }`}
                        >
                          {day.month}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <p className={fieldLabelClass}>Time</p>
              <div className="grid grid-cols-3 gap-2">
                {TIME_PERIODS.map(({ value, label, hint, icon: Icon }) => {
                  const isActive = timePeriod === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        setTimePeriod(value);
                        setDraftTime("");
                      }}
                      className={`flex flex-col items-center rounded-xl border px-2 py-2.5 transition-all ${isActive
                          ? "border-primary/40 bg-[#fff5f4] text-primary"
                          : "border-[#e6e2dc] bg-[#faf8f5] text-[#6b6b6b] hover:border-primary/25"
                        }`}
                    >
                      <Icon className="size-4" strokeWidth={2.25} />
                      <span className="mt-1 text-[11px] font-bold">{label}</span>
                      <span
                        className={`text-[10px] ${isActive ? "text-primary/70" : "text-[#9a948c]"
                          }`}
                      >
                        {hint}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-2.5 flex gap-2 overflow-x-auto overscroll-x-contain pb-2 touch-pan-x [-webkit-overflow-scrolling:touch] [scrollbar-width:thin]">
                {activePeriod.slots.map((slot) => {
                  const isSelected = draftTime === slot.value;
                  return (
                    <button
                      key={slot.value}
                      type="button"
                      onClick={() => selectTimeSlot(slot.value)}
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all ${isSelected
                          ? "border-primary bg-primary text-white"
                          : "border-[#e6e2dc] bg-white text-[#3d3a36] hover:border-primary/30"
                        }`}
                    >
                      <Clock3 className="size-3 opacity-70" />
                      {slot.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default OnlineForm;
