import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import {
  Award,
  ArrowRight,
  BookOpen,
  Building2,
  Check,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Clock,
  GraduationCap,
  HeartHandshake,
  LogIn,
  LogOut,
  Mail,
  Phone,
  School,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  Zap,
  Pencil,
  PersonStandingIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { RHFCombobox } from "@/components/form/RHFCombobox";
import PrimaryButton from "./custom/shared/PrimaryButton";
import SecondaryButton from "./custom/shared/SecondaryButton";
import { getCoursesByDomain } from "@/services/MenuService";
import { getUniversityData } from "@/services/UniversitypageService";
import { getQuestionsByDomainName } from "@/services/SuggestMe";
import { getStates, submitLead } from "@/services/LeadService";
import { useRouter } from "next/router";
import { useCookiesNext } from "cookies-next";
import { useLeadForm } from "@/context/LeadFormContext";
import { toast } from "sonner";
import {
  buildCollegesUniversitiesUrl,
  SUGGEST_ME_NOT_DECIDED,
} from "@/lib/collegesUniversitiesRedirect";
import { TypingAnimation } from "./ui/typing-animation";
import UniversitySlider from "./custom/shared/slider/UniversitySlider";
import Logo from "./custom/shared/Logo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SPECIALIZATION_NOT_DECIDED = SUGGEST_ME_NOT_DECIDED;

const CATEGORY_ICONS = {
  "UG Courses": GraduationCap,
  "PG Courses": School,
  "Diploma Courses": BookOpen,
  "Diploma Course": BookOpen,
  "Certificate Courses": Award,
  "Certificate Course": Award,
};

const MENTOR_AVATARS = [
  "/images/university/avatar/e1.webp",
  "/images/university/avatar/e2.webp",
  "/images/university/avatar/e3.webp",
];

const POPULAR_STATE_NAMES = [
  "Maharashtra",
  "Delhi",
  "Karnataka",
  "Uttar Pradesh",
  "Tamil Nadu",
];

function findStateByName(states, name) {
  const lower = name.toLowerCase();
  return (
    states.find((s) => s.label.toLowerCase() === lower) ||
    states.find((s) => s.label.toLowerCase().includes(lower))
  );
}

function CounselorBadge() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Image
          src={MENTOR_AVATARS[1]}
          width={40}
          height={40}
          alt=""
          className="size-10 rounded-xl object-cover ring-2 ring-primary/25"
        />
        <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white bg-emerald-400" />
      </div>
      <div>
        <p className="text-sm font-bold text-[#1a202c]">Priya · Career Expert</p>
        <p className="text-xs text-muted-foreground">Here to guide you step by step 
          </p>
      </div>
    </div>
  );
}

function ContactLeadModal({
  open,
  onOpenChange,
  values,
  errors,
  onFieldChange,
  onSubmit,
  submitting,
  summary,
  onEditSelection,
}) {
  const { category, course, specialization, state } = summary || {};
  const pathItems = [
    category && { label: "Category", value: category, icon: GraduationCap },
    course && { label: "Course", value: course, icon: BookOpen },
    specialization && { label: "Specialization", value: specialization, icon: Sparkles },
    state && { label: "State", value: state, icon: Building2 },
  ].filter(Boolean);

  const selectionRows = [
    category && {
      key: "category",
      value: category,
      icon: GraduationCap,
      editable: true,
    },
    course && {
      key: "course",
      value: course,
      icon: BookOpen,
      editable: true,
    },
    specialization && {
      key: "specialization",
      value: specialization,
      icon: Sparkles,
      editable: true,
    },
    state && {
      key: "state",
      value: state,
      icon: Building2,
      editable: true,
    },
  ].filter(Boolean);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="gap-0 overflow-hidden rounded-2xl border-red-100/80 p-0 sm:max-w-3xl"
        overlayClassName="bg-black/60 backdrop-blur-sm"
      >
        <div className="grid md:grid-cols-[1.05fr_1fr]">
          {/* Left — Your selection */}
          <div className="relative hidden items-center justify-center overflow-hidden bg-[#f4f8fc] px-6 py-10 md:flex">
            <div className="w-full max-w-[280px]">
              <h3 className="mb-3 text-lg font-extrabold tracking-tight text-[#1e3a5f]">
              Take One Last Look Before You Continue.

              </h3>

              <div className="overflow-hidden rounded-2xl border border-[#d6e4f0] bg-white shadow-sm">
                {selectionRows.map(({ key, value, icon: Icon, editable }, index) => (
                  <div
                    key={key}
                    className={`flex items-center gap-3 px-4 py-3.5 ${
                      index < selectionRows.length - 1 ? "border-b border-[#e8f0f7]" : ""
                    }`}
                  >
                    <Icon className="size-[18px] shrink-0 text-[#9aafc2]" strokeWidth={1.75} />
                    <span className="min-w-0 flex-1 truncate text-[15px] font-bold text-[#1e3a5f]">
                      {value}
                    </span>
                    {editable ? (
                      <button
                        type="button"
                        aria-label={`Edit ${key}`}
                        onClick={() => onEditSelection?.(key)}
                        className="shrink-0 rounded-md p-1 text-[#9aafc2] transition-colors hover:bg-[#f0f6fb] hover:text-[#1e3a5f]"
                      >
                        <Pencil className="size-3.5" strokeWidth={2} />
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="flex flex-col">
            <DialogHeader className="border-b border-red-100/80 px-6 py-5 text-left">
              <DialogTitle className="text-xl font-extrabold tracking-tight text-[#1a202c] pt-3">
              Your Best-Fit Universities Are Here!
              </DialogTitle>
              <DialogDescription className="text-sm text-emerald-600">
              Just fill in your details here so that we can share it with you!
              </DialogDescription>
            </DialogHeader>

            {pathItems.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 border-b border-red-100/80 px-6 py-3 md:hidden">
                {pathItems.map(({ label, value }) => (
                  <span
                    key={label}
                    className="inline-flex max-w-full items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-900"
                  >
                    <span className="shrink-0 text-emerald-600/70">{label}:</span>
                    <span className="truncate">{value}</span>
                  </span>
                ))}
              </div>
            ) : null}

            <form
              className="space-y-4 px-6 py-5"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="wizard-name" className="text-sm font-semibold text-[#1a202c]">
                  Full name
                </Label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="wizard-name"
                    type="text"
                    value={values.name}
                    placeholder="Enter your full name"
                    autoFocus
                    className="h-11 rounded-xl border-red-100 bg-white pl-10 shadow-sm ring-1 ring-red-100/60 focus-visible:ring-primary"
                    onChange={(e) => onFieldChange("name", e.target.value)}
                  />
                </div>
                {errors.name ? <p className="text-sm text-red-500">{errors.name}</p> : null}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="wizard-email" className="text-sm font-semibold text-[#1a202c]">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="wizard-email"
                    type="email"
                    value={values.email}
                    placeholder="you@example.com"
                    className="h-11 rounded-xl border-red-100 bg-white pl-10 shadow-sm ring-1 ring-red-100/60 focus-visible:ring-primary"
                    onChange={(e) => onFieldChange("email", e.target.value)}
                  />
                </div>
                {errors.email ? <p className="text-sm text-red-500">{errors.email}</p> : null}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="wizard-phone" className="text-sm font-semibold text-[#1a202c]">
                  WhatsApp number
                </Label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="wizard-phone"
                    type="tel"
                    value={values.phone}
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    className="h-11 rounded-xl border-red-100 bg-white pl-10 shadow-sm ring-1 ring-red-100/60 focus-visible:ring-primary"
                    onChange={(e) =>
                      onFieldChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                  />
                </div>
                {errors.phone ? <p className="text-sm text-red-500">{errors.phone}</p> : null}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Let’s Compare"}
                {!submitting ? <ArrowRight className="size-4" /> : null}
              </button>

              <p className="flex items-center justify-center gap-1.5 text-center text-[10px]  text-emerald-600">
                {/* <ShieldCheck className="size-3.5" /> */}
                We&apos;ll only use these details to share your updates and connect you with a verified mentor.

              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StepContactField({
  step,
  value,
  fieldError,
  states,
  control,
  onFieldChange,
}) {
  const popularStates = POPULAR_STATE_NAMES.map((name) => findStateByName(states, name)).filter(
    Boolean
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center px-5 py-6 md:px-8 md:py-8">
        <h2 className="max-w-xl text-center text-xl font-extrabold tracking-tight text-[#1a202c] md:text-2xl mb-4">
          {step.title}
        </h2>

        <div className="mt-6 w-full max-w-md">
          <div className="relative">
            <RHFCombobox
              name="state"
              control={control}
              items={states}
              placeholder="Select your state"
              className="h-12 rounded-xl border-red-100 bg-white pl-12 text-base shadow-sm ring-1 ring-red-100/60"
            />
          </div>
          {popularStates.length > 0 ? (
            <div className="mt-4">
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Popular states
              </p>
              <div className="flex flex-wrap gap-2">
                {popularStates.map((state) => {
                  const isSelected = value === state.value;
                  return (
                    <button
                      key={state.value}
                      type="button"
                      onClick={() => onFieldChange("state", state.value)}
                      className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "border-primary bg-primary text-white shadow-sm"
                          : "border-red-100 bg-white text-[#2d3748] ring-1 ring-red-100/80 hover:border-primary/30 hover:bg-red-50"
                      }`}
                    >
                      {state.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {fieldError ? (
            <p className="mt-3 text-sm text-red-500">{fieldError}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function WizardStepProgress({ currentStep, totalSteps, isLastStep = false }) {
  const percent = totalSteps
    ? Math.round((currentStep / totalSteps) * 100)
    : 0;

  return (
    <div className="flex items-center gap-3">
      {/* <p className="shrink-0 text-sm font-bold text-[#1a202c] whitespace-nowrap">
        {isLastStep ? (
          <span className="text-primary">Almost done!</span>
        ) : totalSteps ? (
          <>
            Step {currentStep}{" "}
            <span className="font-normal text-muted-foreground">of {totalSteps}</span>
          </>
        ) : (
          <>Step {currentStep || 1}</>
        )}
      </p> */}
      <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-red-100">
        <div
          className="h-full rounded-full bg-linear-to-r from-primary to-[#f97316] transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
        {percent}%
      </span>
    </div>
  );
}

const WIZARD_STATS = [
  { value: "1L+", label: "Students guided", icon: Users },
  { value: "100+", label: "universities", icon: Building2 },
  { value: "40+", label: "Comparision Factors", icon: Clock },
];

const WIZARD_USPS = [
  {
    icon: ShieldCheck,
    title: "Compare Universities in 2 mins",
    text: "Answer a few questions and get a list of the top universities that fit your choices!",
    accent: "from-emerald-500/15 to-transparent",
    iconBg: "bg-emerald-500/10 text-emerald-600",
    num: "01",
  },
  {
    icon: Zap,
    title: "Verified Mentors for Your Guidance",
    text: "Confused? Talk it out with a trained Academic Counselor!",
    accent: "from-primary/15 to-transparent",
    iconBg: "bg-primary/10 text-primary",
    num: "02",
  },
  {
    icon: HeartHandshake,
    title: "Post Admission Services",
    text: "Not just admission; we guide till your career gets sorted!",
    accent: "from-amber-500/15 to-transparent",
    iconBg: "bg-amber-500/10 text-amber-600",
    num: "03",
  },
];

function WizardSidePanel({
 
  universitiesList,
}) {
  return (
    <div className="flex h-full flex-col bg-[#ffffff] text-white lg:overflow-hidden">
      <div className="relative shrink-0 overflow-hidden px-6 py-8 md:px-8 md:py-8">
        <div className="relative space-y-5">
          <h1 className="text-2xl font-extrabold leading-[1.15] tracking-tight text-black md:text-[1.75rem]">
          Let's find the right path for you
          </h1>
         
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-5 md:px-7 lg:overscroll-y-contain">
        <div className="relative space-y-0">
          <div
            className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-linear-to-b from-primary/10 via-red-200 to-transparent "
            aria-hidden
          />
          {WIZARD_USPS.map(({ icon: Icon, title, text, accent, iconBg, num }, i) => (
            <div
              key={title}
              className={`group relative flex gap-4 py-3.5 first:pt-0 last:pb-0 animate-in fade-in slide-in-from-left-2 fill-mode-both duration-500`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div
                className={`relative z-10 flex size-11 shrink-0 items-center justify-center rounded-2xl ${iconBg} ring-4 ring-white transition-transform duration-300 group-hover:scale-105`}
              >
                <Icon className="size-5" strokeWidth={2.25} />
              </div>
              <div
                className={`min-w-0 flex-1 rounded-2xl bg-linear-to-r ${accent} py-3 pr-1 pl-4`}
              >
                <div className="flex items-baseline gap-2">
                
                  <h3 className="text-sm font-extrabold tracking-tight text-[#1a202c]">
                    {title}
                  </h3>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {WIZARD_STATS.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="rounded-xl border border-red-100/80 px-2 py-3 text-center"
            >
              <Icon className="mx-auto mb-1 size-4 text-primary/70" />
              <p className="text-sm font-extrabold text-black">{value}</p>
              <p className="text-[12px] font-medium leading-tight text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        {universitiesList?.length > 0 ? (
          <div className="hidden lg:block">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-black">
              Trusted Universities
            </p>
            <div className="rounded-2xl border border-red-100/80 bg-red-50/30 p-3">
              <UniversitySlider universitiesList={universitiesList.slice(0, 16)} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const CONTACT_STEP_TYPES = new Set(["contact-state", "contact-done"]);

const wizardSchema = yup.object().shape({
  category: yup.string().required("Please select a category"),
  course: yup.string().required("Please select a course"),
  specialization: yup.string().optional(),
  name: yup.string().optional(),
  email: yup.string().optional(),
  phone: yup.string().optional(),
  state: yup.string().optional(),
});

function mapApiQuestions(questions = []) {
  return questions
    .map((item) => {
      const options = (item.answers || [])
        .map((entry) => {
          const answer = entry?.answer?.trim();
          if (!answer) return null;

          return {
            value: answer,
            label: answer,
            note: entry?.note?.trim() || "",
          };
        })
        .filter(Boolean);

      if (!item?.question?.trim() || options.length === 0) return null;

      return {
        title: item.question.trim(),
        note: item.note?.trim() || "",
        options,
      };
    })
    .filter(Boolean)
    .map((item, index) => ({
      ...item,
      key: `question_${index}`,
    }));
}

function getCategoryIcon(categoryName) {
  return CATEGORY_ICONS[categoryName] || GraduationCap;
}

export default function SuggestMe({ menuData: menuDataProp }) {
  const router = useRouter();
  const { getCookie, setCookie, deleteCookie } = useCookiesNext();
  const { showLeadForm, isOpen: isLeadFormOpen } = useLeadForm();
  const [menuData, setMenuData] = useState(menuDataProp ?? null);
  const [apiQuestions, setApiQuestions] = useState([]);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [hasExistingLead, setHasExistingLead] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [universitiesList, setUniversitiesList] = useState([]);
  const [states, setStates] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  useEffect(() => {
    setShowMoreOptions(false);
  }, [stepIndex]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    getUniversityData()
      .then((res) => setUniversitiesList(res?.data?.data?.data ?? []))
      .catch(() => setUniversitiesList([]));
  }, []);

  useEffect(() => {
    getStates()
      .then((res) => {
        const list =
          res?.data?.data?.map((state) => ({
            value: String(state.id),
            label: state.name,
            search: state.name,
          })) ?? [];
        setStates(list);
      })
      .catch(() => setStates([]));
  }, []);

  useEffect(() => {
    const verified = getCookie("lead_verified") === "true";
    const leadId = getCookie("lead_id");
    setHasExistingLead(verified || Boolean(leadId));
    setLeadName(getCookie("lead_name") || "");
  }, [getCookie, isLeadFormOpen]);

  const questionSteps = useMemo(
    () => mapApiQuestions(apiQuestions),
    [apiQuestions]
  );

  const {
    control,
    setValue,
    watch,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(wizardSchema),
    defaultValues: {
      category: "",
      course: "",
      specialization: "",
      name: "",
      email: "",
      phone: "",
      state: "",
    },
  });

  const selectedCategory = watch("category");
  const selectedCourseId = watch("course");
  const watchedCourse = watch("course");
  const watchedSpecialization = watch("specialization");
  const formValues = watch();

  const questionAnswersSignature = questionSteps
    .map((step) => `${step.key}:${formValues[step.key] || ""}`)
    .join("|");

  useEffect(() => {
    if (menuDataProp) {
      setMenuData(menuDataProp);
      return;
    }
    getCoursesByDomain().then((res) => {
      const data = res?.data?.data;
      if (data) setMenuData({ data });
    });
  }, [menuDataProp]);

  useEffect(() => {
    if (!selectedCategory) {
      setApiQuestions([]);
      return;
    }

    let cancelled = false;
    setQuestionsLoading(true);

    getQuestionsByDomainName(selectedCategory)
      .then((res) => {
        if (cancelled) return;
        setApiQuestions(res?.data?.data?.questions ?? []);
      })
      .catch(() => {
        if (!cancelled) setApiQuestions([]);
      })
      .finally(() => {
        if (!cancelled) setQuestionsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedCategory]);

  useEffect(() => {
    questionSteps.forEach((step) => setValue(step.key, ""));
  }, [questionSteps, setValue]);

  const categories = useMemo(() => {
    const data = menuData?.data ?? menuData;
    if (!data || typeof data !== "object") return [];
    return Object.keys(data);
  }, [menuData]);

  const coursesInCategory = useMemo(() => {
    if (!selectedCategory || !menuData) return [];
    const data = menuData?.data ?? menuData;
    return data[selectedCategory] || [];
  }, [menuData, selectedCategory]);

  const selectedCourse = useMemo(
    () =>
      coursesInCategory.find((c) => String(c.course_id) === String(selectedCourseId)),
    [coursesInCategory, selectedCourseId]
  );

  const specializationOptions = useMemo(() => {
    const specs = selectedCourse?.specializations || [];
    if (specs.length === 0) return [];

    return [
      { value: SPECIALIZATION_NOT_DECIDED, label: "Not decided yet" },
      ...specs.map((spec) => ({
        value: spec.slug,
        label: spec.name,
      })),
    ];
  }, [selectedCourse]);

  const hasSpecializationStep = specializationOptions.length > 0;

  const wizardQuestionAnswers = useMemo(() => {
    const entries = [];

    if (selectedCategory) {
      entries.push({
        question: "Which category are you interested in?",
        answer: selectedCategory,
      });
    }

    if (selectedCourse?.course_name) {
      entries.push({
        question: "Which course would you like to pursue?",
        answer: selectedCourse.course_name,
      });
    }

    if (hasSpecializationStep && watchedSpecialization) {
      const specLabel =
        specializationOptions.find((s) => s.value === watchedSpecialization)
          ?.label || watchedSpecialization;
      entries.push({
        question: "Which specialization would you like to pursue?",
        answer: specLabel,
      });
    }

    questionSteps.forEach((step) => {
      const answer = formValues[step.key];
      if (answer) {
        entries.push({
          question: step.title,
          answer,
        });
      }
    });

    return entries;
  }, [
    selectedCategory,
    selectedCourse,
    watchedSpecialization,
    hasSpecializationStep,
    specializationOptions,
    questionSteps,
    questionAnswersSignature,
  ]);

  const wizardQuestionAnswersRef = useRef(wizardQuestionAnswers);
  wizardQuestionAnswersRef.current = wizardQuestionAnswers;

  const categoryOptions = useMemo(
    () =>
      categories.map((name) => ({
        value: name,
        label: name,
        icon: React.createElement(getCategoryIcon(name), { className: "h-6 w-6" }),
      })),
    [categories]
  );

  const courseOptions = useMemo(
    () =>
      coursesInCategory.map((course) => ({
        value: String(course.course_id),
        label: course.course_name,
        icon: <GraduationCap className="h-6 w-6" />,
      })),
    [coursesInCategory]
  );

  const goToNextStep = useCallback(() => {
    setStepIndex((prev) => prev + 1);
  }, []);

  const goToPrevStep = useCallback(() => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleCategorySelect = useCallback(
    (val) => {
      setValue("category", val, { shouldValidate: true });
      setValue("course", "");
      setValue("specialization", "");
      setTimeout(() => setStepIndex(1), 100);
    },
    [setValue]
  );

  const handleCourseSelect = useCallback(
    (val) => {
      setValue("course", val, { shouldValidate: true });
      setValue("specialization", "");
      setTimeout(() => setStepIndex(2), 100);
    },
    [coursesInCategory, setValue]
  );

  const handleSpecializationSelect = useCallback(
    (val) => {
      setValue("specialization", val, { shouldValidate: true });
      setTimeout(() => goToNextStep(), 100);
    },
    [goToNextStep, setValue]
  );

  const handleQuestionSelect = useCallback(
    (key, val) => {
      setValue(key, val, { shouldValidate: true });
      setTimeout(() => goToNextStep(), 100);
    },
    [goToNextStep, setValue]
  );

  const handleCompareRedirect = useCallback(() => {
    if (!selectedCourse?.course_slug) return;

    const redirectUrl = buildCollegesUniversitiesUrl(
      selectedCourse.course_slug,
      watchedSpecialization
    );
    if (redirectUrl) router.push(redirectUrl);
  }, [selectedCourse, watchedSpecialization, router]);

  const handleSubmitLead = useCallback(async () => {
    const name = watch("name")?.trim();
    const email = watch("email")?.trim();
    const phone = watch("phone")?.trim();
    const stateId = watch("state");

    if (!name) {
      setError("name", { type: "manual", message: "Name is required" });
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("email", { type: "manual", message: "Valid email is required" });
      return;
    }
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      setError("phone", { type: "manual", message: "Valid 10-digit phone is required" });
      return;
    }
    if (!stateId) {
      setError("state", { type: "manual", message: "Please select a state" });
      return;
    }

    const stateObj = states.find((s) => s.value === stateId);
    const stateName = stateObj?.label || stateId;

    const specializationLabel =
      watchedSpecialization === SPECIALIZATION_NOT_DECIDED
        ? "Not decided yet"
        : specializationOptions.find((s) => s.value === watchedSpecialization)?.label ||
          watchedSpecialization ||
          "";

    const payload = {
      name,
      email,
      phone,
      state: stateName,
      course: selectedCourse?.course_name || "",
      specialization: specializationLabel,
      click_source: "help me choose university",
      lead_url: pageUrl,
      university: "No University",
      ...(wizardQuestionAnswersRef.current.length
        ? { questions: JSON.stringify(wizardQuestionAnswersRef.current) }
        : {}),
    };

    setSubmitting(true);
    try {
      const response = await submitLead(payload);
      const leadId = response?.data?.data?.id;

      if (leadId) {
        setCookie("lead_id", leadId);
        setCookie("lead_name", name);
        setCookie("lead_verified", "true");
      }

      toast.success("Thanks! We'll contact you shortly 😊");
      setContactModalOpen(false);
      handleCompareRedirect();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [
    watch,
    setError,
    states,
    watchedSpecialization,
    specializationOptions,
    selectedCourse,
    pageUrl,
    setCookie,
    handleCompareRedirect,
  ]);

  const openContactModal = useCallback(async () => {
    const stateId = watch("state");
    if (!stateId) {
      setError("state", { type: "manual", message: "Please select a state" });
      return;
    }
    clearErrors("state");
    clearErrors(["name", "email", "phone"]);
    setContactModalOpen(true);
  }, [watch, setError, clearErrors]);

  const allSteps = useMemo(() => {
    const steps = [
      {
        type: "category",
        key: "category",
        title: "Which category are you interested in?",
        options: categoryOptions,
        onSelect: handleCategorySelect,
        emptyMessage: "No categories available right now.",
      },
      {
        type: "course",
        key: "course",
        title: "Which course would you like to pursue?",
        options: courseOptions,
        onSelect: handleCourseSelect,
        emptyMessage: selectedCategory
          ? "No courses in this category."
          : "Please select a category first.",
      },
    ];

    if (hasSpecializationStep) {
      steps.push({
        type: "specialization",
        key: "specialization",
        title: "Which specialization would you like to pursue?",
        options: specializationOptions,
        onSelect: handleSpecializationSelect,
        emptyMessage: "This course has no separate specializations.",
      });
    }

    if (selectedCategory && questionsLoading) {
      steps.push({ type: "questions-loading", key: "questions-loading" });
    } else if (selectedCategory) {
      questionSteps.forEach((question) => {
        steps.push({
          type: "question",
          key: question.key,
          title: question.title,
          note: question.note,
          options: question.options,
          onSelect: (val) => handleQuestionSelect(question.key, val),
          emptyMessage: "No options available for this question.",
        });
      });

      if (hasExistingLead) {
        steps.push({ type: "contact-done", key: "contact-done" });
      } else {
        steps.push({
          type: "contact-state",
          key: "state",
          title: "Which state are you from?",
        });
      }
    }

    return steps;
  }, [
    categoryOptions,
    courseOptions,
    handleCategorySelect,
    handleCourseSelect,
    handleQuestionSelect,
    handleSpecializationSelect,
    hasExistingLead,
    hasSpecializationStep,
    questionSteps,
    questionsLoading,
    selectedCategory,
    specializationOptions,
  ]);

  const questionsReady = Boolean(selectedCategory) && !questionsLoading;

  const currentStep = allSteps[stepIndex];
  const isContactFieldStep = CONTACT_STEP_TYPES.has(currentStep?.type);
  const isSubmitStep = currentStep?.type === "contact-state";
  const wizardTotalSteps = questionsReady ? allSteps.length : null;
  const wizardDisplayStep = stepIndex + 1;

  const handleLogout = useCallback(() => {
    deleteCookie("lead_name");
    deleteCookie("lead_id");
    deleteCookie("lead_verified");
    setHasExistingLead(false);
    setLeadName("");
    setValue("name", "");
    setValue("email", "");
    setValue("phone", "");
    setValue("state", "");
    toast.success("Logged out successfully");
  }, [deleteCookie, setValue]);

  useEffect(() => {
    if (stepIndex >= allSteps.length) {
      setStepIndex(Math.max(allSteps.length - 1, 0));
    }
  }, [allSteps.length, stepIndex]);

  const validateCurrentStep = async () => {
    if (!currentStep || currentStep.type === "contact-done") return true;

    if (currentStep.type === "contact-state") {
      const stateId = watch("state");
      if (!stateId) {
        setError("state", { type: "manual", message: "Please select a state" });
        return false;
      }
      clearErrors("state");
      return true;
    }

    if (currentStep.type === "specialization") {
      const spec = watch("specialization");
      if (!spec) {
        setError("specialization", {
          type: "manual",
          message: "Please select a specialization",
        });
        return false;
      }
      clearErrors("specialization");
      return true;
    }

    if (currentStep.type === "question") {
      const answer = watch(currentStep.key);
      if (!answer) {
        setError(currentStep.key, {
          type: "manual",
          message: "Please select an option",
        });
        return false;
      }
      clearErrors(currentStep.key);
      return true;
    }

    return trigger(currentStep.key);
  };

  const handleNextClick = async () => {
    const valid = await validateCurrentStep();
    if (!valid) return;
    goToNextStep();
  };

  const handleContactFieldChange = useCallback(
    (fieldKey, next) => {
      setValue(fieldKey, next, { shouldValidate: true });
      clearErrors(fieldKey);
    },
    [setValue, clearErrors]
  );

  const StepRadio = ({ title, note, name, options, onSelect, emptyMessage }) => {
    const VISIBLE_COUNT = 8;
    const hasMore = (options?.length || 0) > VISIBLE_COUNT;
    const visibleOptions =
      showMoreOptions || !hasMore ? options : options.slice(0, VISIBLE_COUNT);
    const hiddenCount = hasMore ? options.length - VISIBLE_COUNT : 0;

    return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center px-5 pb-6 pt-6 md:px-8 md:pb-8 md:pt-7">
        <h2 className="max-w-xl text-center text-xl font-extrabold tracking-tight text-[#1a202c] md:text-2xl mb-4">
          {title}
        </h2>
     

        {!options?.length ? (
          <p className="py-8 text-sm text-muted-foreground">{emptyMessage}</p>
        ) : (
          <>
          <RadioGroup
            value={watch(name) || ""}
            onValueChange={(val) => onSelect(val)}
            className="mx-auto flex w-full max-w-3xl flex-wrap justify-center gap-3"
          >
            {visibleOptions.map((opt, index) => {
              const value = typeof opt === "string" ? opt : opt.value;
              const label = typeof opt === "string" ? opt : opt.label;
              const answerNote =
                typeof opt === "object" && opt.note ? opt.note : "";
              const isSelected = watch(name) === value;
              const itemId = `${name}-${index}`;
              const Icon =
                name === "category"
                  ? getCategoryIcon(label)
                  : name === "course"
                    ? BookOpen
                    : name === "specialization"
                      ? GraduationCap
                      : BookOpen;

              return (
                <Label
                  key={`${name}-${value}-${index}`}
                  htmlFor={itemId}
                  className="block h-full w-[calc(50%-0.375rem)] min-w-0 cursor-pointer sm:w-[calc(50%-0.375rem)] md:w-[calc(25%-0.5625rem)] md:max-w-[calc(25%-0.5625rem)]"
                >
                  <div
                    className={`group relative flex h-full w-full min-h-[100px] flex-col items-center justify-center gap-3 rounded-2xl px-2 py-2 text-center transition-all duration-200 ${
                      isSelected
                        ? "border-2 border-primary bg-linear-to-b from-red-50/90 to-[#fff7dc]/90 shadow-lg shadow-primary/10"
                        : "border-2 border-transparent bg-white shadow-sm ring-1 ring-red-100/80 hover:bg-red-50/40 hover:ring-primary/25"
                    }`}
                  >
                    {answerNote ? (
                      <span className="absolute left-3 top-[-2px] rounded-b-lg bg-green-700 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wide text-white">
                        {answerNote}
                      </span>
                    ) : null}

                    {/* {isSelected ? (
                      <span className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-primary text-white shadow-sm">
                        <Check className="size-3.5 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="absolute right-3 top-3 size-6 rounded-full border-2 border-red-100 bg-white transition-colors group-hover:border-primary/30" />
                    )} */}

                    <span
                      className={`flex size-8 items-center justify-center rounded-2xl transition-colors ${
                        isSelected
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "bg-red-50 text-primary group-hover:bg-primary/10"
                      }`}
                    >
                      <Icon className="size-4" />
                    </span>

                    <span
                      className={`max-w-full px-1 text-sm font-bold leading-snug sm:text-[12px] ${
                        isSelected ? "text-primary" : "text-[#1a202c]"
                      }`}
                    >
                      {label}
                    </span>

                    <RadioGroupItem value={value} id={itemId} className="sr-only" />
                  </div>
                </Label>
              );
            })}
          </RadioGroup>

          {hasMore ? (
            <button
              type="button"
              onClick={() => setShowMoreOptions((prev) => !prev)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-red-100/80 transition-colors hover:bg-red-50"
            >
              {showMoreOptions ? (
                <>
                  Show less
                  <ChevronUp className="size-4" />
                </>
              ) : (
                <>
                  More options ({hiddenCount})
                  <ChevronDown className="size-4" />
                </>
              )}
            </button>
          ) : null}
          </>
        )}

{note ? (
          <div className="relative mx-auto mt-6 w-full max-w-lg overflow-hidden rounded-2xl bg-linear-to-br from-emerald-50/90 via-white to-[#fff7dc]/70 p-4">
            <div
              className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-emerald-400/15 blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-6 -left-6 size-20 rounded-full bg-primary/5 blur-2xl"
              aria-hidden
            />

            <div className="relative flex items-start gap-1">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 text-white">
                <HeartHandshake className="size-5" />
              </span>

              <div className="min-w-0 flex-1 text-left">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full  px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                   
                    LearningShala Benefits
                  </span>
                
                </div>

                <div className="relative px-3">
                  <span
                    className="absolute -left-1 top-3 size-2 rotate-45 border-b border-l border-emerald-100/80 bg-white/70"
                    aria-hidden
                  />
                  <TypingAnimation
                    key={`${name}-${note}`}
                    as="span"
                    className="inline-block text-sm font-semibold leading-relaxed text-[#1a202c]"
                    startOnView={false}
                    loop={false}
                    typeSpeed={100}
                    showCursor
                    blinkCursor
                  >
                    {`${note} 👋`}
                  </TypingAnimation>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-5" />
        )}

        {errors[name] && (
          <p className="mt-4 text-sm text-red-500">
            {errors[name]?.message || "This field is required"}
          </p>
        )}
      </div>
    </div>
    );
  };

  const isLoadingStep =
    (!menuData && stepIndex < 2) || currentStep?.type === "questions-loading";

  if (!isMounted) {
    return (
      <div className="flex h-dvh w-full items-center justify-center bg-[#faf8f6]">
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-white px-10 py-12 shadow-xl ring-1 ring-red-100/60">
          <div className="size-10 animate-pulse rounded-full bg-red-100" />
          <p className="text-sm font-medium text-muted-foreground">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-dvh w-full flex-col">
      <div className="flex shrink-0 items-center justify-between border-b border-red-100/80 bg-white px-4 py-3 shadow-sm md:px-6">
        <Logo />
        <div className="flex items-center gap-2">
          {hasExistingLead ? (
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-4 py-2 text-sm font-semibold text-[#1a202c] shadow-sm transition-colors hover:border-primary/30 hover:bg-red-50 hover:text-primary"
            >
              <LogOut className="size-4" />
              {leadName ? `Logout (${leadName.split(" ")[0]})` : "Logout"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => showLeadForm("signin from compare wizard")}
              className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary px-2 py-1 md:px-4 md:py-2 text-[12px] md:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90"
            >
              <PersonStandingIcon className="size-4 md:size-5"/>
              Get Help
            </button>
          )}
        </div>
      </div>

      <div className="grid min-h-0 flex-1 w-full grid-cols-1 lg:grid-cols-12">
      <div className="max-h-[38dvh] shrink-0 overflow-hidden lg:col-span-4 lg:max-h-none lg:h-full hidden lg:block">
        <WizardSidePanel
          currentStep={currentStep}
          isContactStep={isContactFieldStep}
          selectedCategory={selectedCategory}
          selectedCourse={selectedCourse}
          watchedSpecialization={watchedSpecialization}
          specializationOptions={specializationOptions}
          wizardDisplayStep={wizardDisplayStep}
          wizardTotalSteps={wizardTotalSteps}
          universitiesList={universitiesList}
        />
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col bg-[#faf8f6] lg:col-span-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-40 lg:left-[41.666%]"
          style={{
            backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden
        />

        <div className="relative z-10 flex min-h-0 flex-1 flex-col p-4 md:p-6 lg:p-4">
          <div className="mb-0 shrink-0">
            <CounselorBadge />
            <div className="mt-3">
              <WizardStepProgress
                currentStep={wizardDisplayStep}
                totalSteps={wizardTotalSteps}
                isLastStep={isSubmitStep || currentStep?.type === "contact-done"}
              />
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain ">
            {isLoadingStep ? (
              <div className="flex flex-col items-center gap-4 px-8 py-16">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-red-50">
                  <Sparkles className="size-7 animate-pulse text-primary" />
                </div>
                <p className="text-center text-sm font-semibold text-[#1a202c]">
                  Loading your options…
                </p>
                <p className="text-center text-xs text-muted-foreground">
                  Preparing the best choices for you
                </p>
              </div>
            ) : currentStep?.type === "contact-done" ? (
              <div className="flex flex-col">
                <div className="space-y-5 px-5 py-6 md:px-8 md:py-8">
                  <div className="text-center">
                    {/* <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                      <Sparkles className="size-3.5" />
                      You&apos;re all set
                    </span> */}
                    <h2 className="text-xl font-extrabold tracking-tight text-[#1a202c] md:text-2xl">
                      Compare your matched universities
                    </h2>
                    <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                      Your preferences are saved — view your personalized comparison now.
                    </p>
                  </div>

                  {selectedCategory && selectedCourse ? (
                    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-2 rounded-2xl bg-red-50/60 px-4 py-3 text-sm text-[#4a5568]">
                      <span className="font-semibold text-primary">{selectedCategory}</span>
                      <ArrowRight className="size-3.5 text-muted-foreground" />
                      <span>{selectedCourse.course_name}</span>
                      {watchedSpecialization ? (
                        <>
                          <ArrowRight className="size-3.5 text-muted-foreground" />
                          <span>
                            {specializationOptions.find((s) => s.value === watchedSpecialization)
                              ?.label || "Not decided yet"}
                          </span>
                        </>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="flex justify-center pt-2">
                    <div onClick={handleCompareRedirect} role="button" tabIndex={0}>
                      <PrimaryButton title="Compare in 2 mins" icon={<ArrowRight />} iconPos="right" />
                    </div>
                  </div>
                </div>
              </div>
            ) : isContactFieldStep ? (
              <StepContactField
                step={currentStep}
                value={watch(currentStep.key) || ""}
                fieldError={errors[currentStep.key]?.message}
                states={states}
                control={control}
                onFieldChange={handleContactFieldChange}
              />
            ) : currentStep ? (
              <StepRadio
                title={currentStep.title}
                note={currentStep.note}
                name={currentStep.key}
                options={currentStep.options}
                onSelect={currentStep.onSelect}
                emptyMessage={currentStep.emptyMessage}
              />
            ) : null}
          </div>

          <div className="mt-4 flex shrink-0 items-center justify-center gap-3">
            {stepIndex > 0 && (
              <div onClick={goToPrevStep} role="button" tabIndex={0}>
                <SecondaryButton
                  title="Back"
                  icon={<ChevronLeft />}
                  iconPos="left"
                  className="pe-5"
                />
              </div>
            )}
            {isSubmitStep ? (
              <div
                onClick={submitting ? undefined : openContactModal}
                role="button"
                tabIndex={0}
                className={submitting ? "pointer-events-none opacity-60" : undefined}
              >
                <PrimaryButton
                  title="Compare in 2 mins"
                  icon={<ArrowRight />}
                  iconPos="right"
                  className="ps-5"
                />
              </div>
            ) : currentStep?.type !== "contact-done" ? (
              <div onClick={handleNextClick} role="button" tabIndex={0}>
                <PrimaryButton
                  title="Continue"
                  icon={<ArrowRight />}
                  iconPos="right"
                  className="ps-5"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      </div>

      <ContactLeadModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        values={{
          name: watch("name") || "",
          email: watch("email") || "",
          phone: watch("phone") || "",
        }}
        errors={{
          name: errors.name?.message,
          email: errors.email?.message,
          phone: errors.phone?.message,
        }}
        onFieldChange={handleContactFieldChange}
        onSubmit={handleSubmitLead}
        submitting={submitting}
        summary={{
          category: selectedCategory || "",
          course: selectedCourse?.course_name || "",
          specialization:
            watchedSpecialization === SPECIALIZATION_NOT_DECIDED
              ? "Not decided yet"
              : specializationOptions.find((s) => s.value === watchedSpecialization)?.label ||
                "",
          state: states.find((s) => s.value === watch("state"))?.label || "",
        }}
        onEditSelection={(fieldKey) => {
          const stepTypeMap = {
            category: "category",
            course: "course",
            specialization: "specialization",
            state: "contact-state",
          };
          const targetType = stepTypeMap[fieldKey];
          const targetIndex = allSteps.findIndex((step) => step.type === targetType);
          if (targetIndex >= 0) {
            setContactModalOpen(false);
            setStepIndex(targetIndex);
          }
        }}
      />
    </div>
  );
}
