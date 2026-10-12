import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Lock } from "lucide-react";
import { Label } from "../ui/label";

import {
  getStates,
  sendOtp,
  submitLead,
  verifyOtp,
} from "@/services/LeadService";
import { useLeadForm } from "@/context/LeadFormContext";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useCookiesNext } from "cookies-next";
import { RHFCombobox } from "../form/RHFCombobox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import DontSpam from "./DontSpam";
import { isExternalLink } from "@/lib/isExternalLink";

/** First specialization option; compare redirect uses course-only URL when selected. */
const SPECIALIZATION_NOT_DECIDED_VALUE = "__ls_not_decided_yet__";
const COURSE_OTHERS_VALUE = "__ls_others__";

function buildLeadFormSchema({ hideCourseFields, isCoursePage }) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .refine((val) => !/\d/.test(val), "Name should not contain numbers"),
    email: z.string().email("Email is required"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Phone number is required"),
    // Course dropdown is hidden on university/course pages — don't block submit
    course:
      hideCourseFields || isCoursePage
        ? z.string().optional()
        : z.string().min(1, "Course is required"),
    specialization: z.string().optional(),
    state: z.string().min(1, "State is required"),
  });
}

function matchCourseBySlug(courses, slug) {
  if (!slug || !courses?.length) return null;
  const normalized = String(slug).toLowerCase();
  return (
    courses.find((c) => c.slug?.toLowerCase() === normalized) ||
    courses.find((c) => c.slug?.toLowerCase() === `online-${normalized}`) ||
    courses.find((c) => c.slug?.toLowerCase()?.replace(/^online-/, "") === normalized) ||
    null
  );
}

function formatSlugLabel(slug) {
  if (!slug) return "";
  return String(slug)
    .replace(/^online-/, "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.toUpperCase())
    .join(" ");
}

function parsePathSlugs(pathname) {
  const segments = (pathname || "").split("/").filter(Boolean);
  let courseSlugFromUrl = "";
  let specializationSlugFromUrl = "";

  if (segments[0] === "courses") {
    courseSlugFromUrl = segments[1] || "";
    specializationSlugFromUrl = segments[2] || "";
  } else if (segments[0] === "colleges-universities") {
    courseSlugFromUrl = segments[1] || "";
    specializationSlugFromUrl = segments[2] || "";
  } else if (segments[0] === "university") {
    courseSlugFromUrl = segments[2] || "";
    specializationSlugFromUrl = segments[3] || "";
  }

  return { courseSlugFromUrl, specializationSlugFromUrl };
}

const LeadForm = ({
  clickSource,
  pageUrl,
  menuData,
  hideCourseFields = false,
  prefillCourseId = "",
  prefillSpecialization = "",
  wizardQuestions = null,
  submitLabel = "Submit",
}) => {
  const ENABLE_OTP = false; // Toggle OTP flow
  const ENABLE_COOKIES = true; // Toggle lead cookie writes
  const router = useRouter();
  const [routeReady, setRouteReady] = useState(false);

  useEffect(() => {
    setRouteReady(true);
  }, []);

  const pathname = routeReady ? router.asPath.split("?")[0] : "";
  const { courseSlugFromUrl, specializationSlugFromUrl } =
    parsePathSlugs(pathname);

  // Prefer router query (available on this page) + pathname template so
  // course stays optional before asPath is ready (field is hidden on course pages).
  const courseSlug =
    (typeof router.query?.courseSlug === "string"
      ? router.query.courseSlug
      : "") || courseSlugFromUrl;
  const specializationSlug =
    (typeof router.query?.specializationSlug === "string"
      ? router.query.specializationSlug
      : "") || specializationSlugFromUrl;

  const isCoursePage =
    !!courseSlug || (router.pathname || "").includes("[courseSlug]");
  const isSpecializationPage =
    !!specializationSlug &&
    specializationSlug !== "fee-structure" &&
    specializationSlug !== "admission-process";

  /* ================= HOOKS ================= */
  const { setCookie } = useCookiesNext(); // Cookie management
  const { hideLeadForm, consumeIntent, intent } = useLeadForm(); // Context for lead form visibility & post-actions

  const [states, setStates] = useState([]); // List of states for dropdown
  const [courses, setCourses] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for submit buttons
  const [otp, setOtp] = useState(""); // OTP input
  const [showOTP, setShowOTP] = useState(false); // Flag to switch from form to OTP UI
  const [leadData, setLeadData] = useState({ id: null, phone: "", name: "" }); // Stores lead info after submit

  const schema = useMemo(
    () => buildLeadFormSchema({ hideCourseFields, isCoursePage }),
    [hideCourseFields, isCoursePage]
  );

  /* ================= REACT HOOK FORM ================= */
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { state: "", course: "", specialization: "" },
  });

  /* ================= FETCH STATES ================= */
  useEffect(() => {
    getStates().then((res) => {
      setStates(
        res?.data?.data?.map((state) => ({
          value: String(state.id), // ID is sent to backend
          label: state.name, // Name shown in dropdown
        }))
      );
    });
  }, []);

  /* ================= FETCH COURSES ================= */
  const selectedCourse = watch("course");
 


  useEffect(() => {
    if (!routeReady || !menuData?.data) return;

    const flatCourses = Object.values(menuData.data).flat();
  
    const formattedCourses = [
      ...flatCourses.map((course) => ({
        value: String(course.course_id),
        label: course.course_name,
        slug: course.course_slug,
        specializations: course.specializations || [],
      })),
      {
        value: COURSE_OTHERS_VALUE,
        label: "Others",
        slug: "others",
        specializations: [],
      },
    ];

    setCourses(formattedCourses);
  
    if (courseSlug) {
      const matchedCourse = matchCourseBySlug(formattedCourses, courseSlug);

      if (matchedCourse) {
        setValue("course", matchedCourse.value, { shouldValidate: true });

        if (
          specializationSlug &&
          specializationSlug !== "fee-structure" &&
          specializationSlug !== "admission-process"
        ) {
          const matchedSpec = matchedCourse.specializations?.find(
            (s) => s.slug === specializationSlug
          );

          if (matchedSpec) {
            setValue("specialization", matchedSpec.slug);
          }
        }
      }
    }
  }, [menuData, courseSlug, specializationSlug, setValue, routeReady]);


/* ================= FETCH SPECIALIZATIONS ================= */
useEffect(() => {
  if (!menuData?.data || !selectedCourse) {
    setSpecializations([]);
    return;
  }

  const allCourses = Object.values(menuData.data).flat();

  const selectedCourseObj = allCourses.find(
    (c) => String(c.course_id) === selectedCourse
  );

  if (!selectedCourseObj || !selectedCourseObj.specializations) {
    setSpecializations([]);
    return;
  }

  const formattedSpecs = [
    {
      value: SPECIALIZATION_NOT_DECIDED_VALUE,
      label: "Not decided yet",
      search: "not decided yet",
    },
    ...selectedCourseObj.specializations.map((spec) => ({
      value: spec.slug,
      label: spec.name,
      search: `${spec.name} ${spec.slug}`,
    })),
  ];

  setSpecializations(formattedSpecs);

  if (!specializationSlug && !hideCourseFields) {
    setValue("specialization", "");
  }
}, [selectedCourse, menuData, setValue, specializationSlug, hideCourseFields]);

  const normalizeWizardSpecialization = (spec) => {
    if (!spec || spec === "__not_decided_yet__") {
      return SPECIALIZATION_NOT_DECIDED_VALUE;
    }
    return spec;
  };

  useEffect(() => {
    if (!hideCourseFields) return;
    if (prefillCourseId) {
      setValue("course", String(prefillCourseId));
    }
    if (prefillSpecialization) {
      setValue("specialization", normalizeWizardSpecialization(prefillSpecialization));
    }
  }, [hideCourseFields, prefillCourseId, prefillSpecialization, setValue]);

  useEffect(() => {
    const prefill = intent?.prefill;
    if (!prefill) return;

    if (prefill.name) setValue("name", prefill.name);
    if (prefill.email) setValue("email", prefill.email);
    if (prefill.course) setValue("course", String(prefill.course));
    if (prefill.specialization) {
      setValue(
        "specialization",
        normalizeWizardSpecialization(prefill.specialization)
      );
    }
  }, [intent, setValue]);

  /* ================= FORM SUBMIT ================= */
  const onSubmit = async (formData) => {
    if (loading) return; // Prevent duplicate submits
    setLoading(true);

    // Find state name from ID
    const stateObj = states.find((s) => s.value === formData.state);
    const stateName = stateObj?.label || formData.state;

    const resolvedCourseId =
      formData.course || prefillCourseId || intent?.prefill?.course || "";
    const courseObj =
      courses.find((c) => c.value === String(resolvedCourseId)) ||
      matchCourseBySlug(courses, courseSlug);
    const fallbackCourse = menuData?.data
      ? Object.values(menuData.data)
          .flat()
          .find(
            (c) =>
              String(c.course_id) === String(resolvedCourseId) ||
              c.course_slug?.toLowerCase() === courseSlug?.toLowerCase()
          )
      : null;
    const courseName =
      resolvedCourseId === COURSE_OTHERS_VALUE
        ? "Others"
        : courseObj?.label ||
          fallbackCourse?.course_name ||
          formatSlugLabel(courseSlug) ||
          formData.course ||
          "";

    const resolvedSpecialization =
      formData.specialization ||
      normalizeWizardSpecialization(
        prefillSpecialization || intent?.prefill?.specialization
      );

    const specializationForPayload =
      resolvedSpecialization === SPECIALIZATION_NOT_DECIDED_VALUE
        ? "Not decided yet"
        : resolvedSpecialization || "";


        const universityMap = {
          "alliance-university-online": "Alliance University",
          "amet-university-online": "Amet University",
          "amity-university-online": "Amity",
          "amrita-university-online": "Amrita University",
          "amu-distance-education-cdoe": "AMU Distance",
          "andhra-university-online": "Andhra University Online(UpGrad)",
          "anna-university-online": "Anna University",
          "annamalai-university-distance-education": "Annamalai University",
          "anucde-acharya-nagarjuna-distance-education-university": "Acharya Nagarjuna University (ANUCDE)",
          "bennett-university-online": "Bennett University",
          "bharathiar-university-school-of-distance-education": "Bharathiar University",
          "bharati-vidyapeeth-online": "Bharati University",
          "calicut-university-distance-education": "Calicut University",
          "chandigarh-university-online": "chandigarh-university",
          "chitkara-university-online": "Chitkara University",
          "christ-university-online": "Christ University",
          "dr-babasaheb-ambedkar-open-university-baou": "DR. Babasaheb Ambedkar open University",
          "dusol-online": "DUSOL",
          "dy-patil-university-online": "DPU",
          "dy-patil-university-online-navi-mumbai": "DPU Mumbai(UpGrad)",
          "guru-kashi-university-online": "Guru Kashi University",
          "guru-nanak-dev-university-online": "Guru Nanak Dev University",
          "ignou": "IGNOU",
          "jain-university-online": "Jain",
          "jamia-hamdard-university-online": "Jamia Hamdard University",
          "kl-university-online": "KL University",
          "kurukshetra-university-online": "kurukshetra University(UpGrad)",
          "lpu-online": "lpu",
          "madras-university-distance-education": "Madras University",
          "mahe-manipal-online": "MAHE",
          "manav-rachna-university-online": "Manav Rachna University",
          "mangalayatan-university-online": "Mangalyatan University",
          "manipal-university-online": "manipal-jaipur",
          "manonmaniam-sundaranar-university-distance-education": "Manonmaniam Sundaranar University",
          "mgu-mahatma-gandhi-university-online": "Mahatma Gandhi University",
          "mizoram-university-online": "Mizoram University",
          "mody-university-online": "Mody University",
          "nalanda-open-university-nou": "Nalanda University (NOU)",
          "nmims-online": "nmims",
          "noida-international-university-online": "Noida International University",
          "parul-university-online": "Parul University",
          "rabindra-bharati-university-distance-education-rbudde": "Rabindra Bharati University",
          "sastra-online-university": "Sastra University",
          "sharda-university-online": "Sharda",
          "shivaji-university-online": "Shivaji University",
          "shoolini-university-online": "Shoolini university",
          "sikkim-manipal-university-online": "sikkim-manipal",
          "srm-online": "SRM University",
          "subharti-university-distance-education": "Subharti University",
          "subharti-university-online": "",
          "suresh-gyan-vihar-university-distance-education": "Suresh Gyan Vihar University",
          "symbiosis-online": "Symbiosis",
          "tamil-nadu-open-university-tnou": "Tamilnadu open University",
          "upes-online": "upes",
          "uttaranchal-university-online": "uttaranchal university",
          "vignan-university-online": "Vignan University(UpGrad)",
          "vit-online": "Vellore Institute of Technology (VIT)",
          "vivekananda-global-university-online": "vivekananda-global"
        };
        const extractUniversityName = pageUrl.match(/\/university\/([^/]+)/)?.[1];

    const resolvedWizardQuestions =
      wizardQuestions?.length
        ? wizardQuestions
        : intent?.prefill?.questions || [];

    // Prepare payload for backend
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      state: stateName,
      course: courseName,
      specialization: specializationForPayload,
      click_source : clickSource,
      lead_url : pageUrl,
      university: universityMap[extractUniversityName] || "No University",
      ...(resolvedWizardQuestions.length
        ? { questions: JSON.stringify(resolvedWizardQuestions) }
        : {}),

      source: "Organic",
      sub_source: "LS-WEBSITE",
      
      // lead_source: "learningshala",
      // sub_source: "learningshala sub-source",
      // website_url: "https://learningshala.com",
      
    };

    try {
      const response = ENABLE_OTP
        ? await sendOtp(payload)
        : await submitLead(payload);
      // console.log(response);  //  lead data console
      const leadId = response?.data?.data?.id;

      if (!ENABLE_OTP) {
        // OTP disabled: save lead directly in cookies
        if (ENABLE_COOKIES) {
          setCookie("lead_id", leadId);
          setCookie("lead_name", formData.name);
          setCookie("lead_verified", "true");
        }

        hideLeadForm();
        toast.success("Thanks! We’ll contact you shortly 😊");

        // setTimeout(() => router.refresh(), 300);

        const intent = consumeIntent();
        if (intent?.type === "download") window.open(intent.url);
        if (intent?.type === "redirect") {
          let redirectUrl = intent.url;
          const isCompareColleges =
            typeof redirectUrl === "string" &&
            redirectUrl.startsWith("/colleges-universities/");
          const spec = resolvedSpecialization;
          const isNotDecidedOrEmpty =
            !spec ||
            spec === SPECIALIZATION_NOT_DECIDED_VALUE;
          if (isCompareColleges && (courseObj?.slug || fallbackCourse?.course_slug)) {
            const courseSlug = courseObj?.slug || fallbackCourse?.course_slug;
            if (spec && !isNotDecidedOrEmpty) {
              redirectUrl = `/colleges-universities/${courseSlug}/${spec}`;
            } else {
              redirectUrl = `/colleges-universities/${courseSlug}`;
            }
          }
          if (intent.external || isExternalLink(redirectUrl)) {
            window.open(redirectUrl, "_blank", "noopener,noreferrer");
          } else {
            router.push(redirectUrl);
          }
        }
        if (intent?.type === "callback") intent.fn?.();

        
        

        return;
      }

      // OTP enabled: show OTP UI
      setLeadData({ id: leadId, phone: formData.phone, name: formData.name });
      setShowOTP(true);
    } catch (error) {
      console.error("Lead API Error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to submit lead"
      );
    }
     finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6 || !leadData.id) return;

    setLoading(true);
    try {
      await verifyOtp(leadData.id, otp); // Backend OTP verification

      // Save verified lead info in cookies
      if (ENABLE_COOKIES) {
        setCookie("lead_id", leadData.id);
        setCookie("lead_name", leadData.name);
        setCookie("lead_verified", "true");
      }

      hideLeadForm();
      toast.success("OTP verified 🎉");
      router.refresh();
    } catch {
      toast.error("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT LEAD DATA ================= */
  const handleEdit = () => {
    setOtp("");
    setShowOTP(false);
    setLeadData({ id: null, phone: "", name: "" });
  };

  // Flag to determine which UI to show
  const showForm = !ENABLE_OTP || !showOTP || !leadData.id;
  const nameField = register("name");
  const phoneField = register("phone");

  /* ================= RENDER ================= */
  return (
    <div>
      {showForm ? (
        /* ================= LEAD FORM UI ================= */
        <form
          onSubmit={handleSubmit(onSubmit, (formErrors) => {
            const firstError = Object.values(formErrors)?.[0]?.message;
            if (firstError) toast.error(firstError);
          })}
          className="flex flex-col gap-8"
        >
          <div className="relative">
            <Label className="absolute top-0 left-0 bg-white px-2 ms-1 -mt-2 text-sm text-gray-500 z-1">
              Name
            </Label>
            <Input
              {...nameField}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\d/g, "");
                nameField.onChange(e);
              }}
            />
            <span className="text-red-500 text-sm">{errors.name?.message}</span>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6">
              <div className="relative">
                <Label className="absolute top-0 left-0 bg-white px-2 ms-1 -mt-2 text-sm text-gray-500 z-1">
                  Email
                </Label>
                <Input type="email" {...register("email")} />
                {errors.email ? (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                ) : (
                  <DontSpam />
                )}
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="relative">
                <Label className="absolute top-0 left-0 bg-white px-2 ms-1 -mt-2 text-sm text-gray-500 z-1">
                  Phone
                </Label>
                <Input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  {...phoneField}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
                    phoneField.onChange(e);
                  }}
                />
                {errors.phone ? (
                  <span className="text-red-500 text-sm">
                    {errors.phone.message}
                  </span>
                ) : (
                  <DontSpam />
                )}
              </div>
            </div>
          </div>

          {/* <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <div className="relative">
                {" "}
                <Label className="absolute top-0 left-0 bg-white px-2 ms-1 -mt-2 text-sm text-gray-500 z-1">
                  Select Course
                </Label>
                <RHFCombobox
                  name="course"
                  control={control}
                  items={courses}
                  placeholder=""
                />
                <span className="text-red-500 text-sm">
                  {errors.course?.message}
                </span>
              </div>
            </div>
          </div> */}

{!isCoursePage && !hideCourseFields && (
  <div className="grid grid-cols-12 gap-6">
    <div className="col-span-12">
      <div className="relative">
        <Label className="absolute top-0 left-0 bg-white px-2 ms-1 -mt-2 text-sm text-gray-500 z-1">
          Select Course
        </Label>

        <RHFCombobox
          name="course"
          control={control}
          items={courses}
          placeholder=""
        />

        <span className="text-red-500 text-sm">
          {errors.course?.message}
        </span>
      </div>
    </div>
  </div>
)}

          {!isSpecializationPage &&
            !hideCourseFields &&
            specializations.length > 0 && (
  <div className="grid grid-cols-12 gap-6">
    <div className="col-span-12">
      <div className="relative">
        <Label className="absolute top-0 left-0 bg-white px-2 ms-1 -mt-2 text-sm text-gray-500 z-1">
          Select Specialization
        </Label>

        <RHFCombobox
          name="specialization"
          control={control}
          items={specializations}
          placeholder=""
        />

        <span className="text-red-500 text-sm">
          {errors.specialization?.message}
        </span>
      </div>
    </div>
  </div>
)}

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <div className="relative">
                {" "}
                <Label className="absolute top-0 left-0 bg-white px-2 ms-1 -mt-2 text-sm text-gray-500 z-1">
                  Select State
                </Label>
                <RHFCombobox
                  name="state"
                  control={control}
                  items={states}
                  placeholder=""
                />
                <span className="text-red-500 text-sm">
                  {errors.state?.message}
                </span>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            size="xl"
            className="w-full text-white"
          >
            {loading ? "Please wait..." : submitLabel}
          </Button>

          <p className="text-center font-semibold text-green-600 text-sm flex gap-1 justify-center items-center">
            <Lock className="w-3 h-3" /> All information is secure with us
          </p>
        </form>
      ) : (
        /* ================= OTP UI ================= */
        <>
          <h2 className="text-lg font-bold mb-1">We&apos;ve sent an OTP to</h2>
          <p className="flex items-center gap-2 mb-4">
            <span className="text-gray-500">{leadData.phone}</span>
            <span
              onClick={handleEdit}
              className="text-blue-500 underline cursor-pointer font-bold"
            >
              Edit
            </span>
          </p>

          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup>
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="text-xl w-[50px] h-[50px]"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <Button
            disabled={otp.length !== 6 || loading}
            onClick={handleVerifyOTP}
            size="xl"
            className="mt-6 w-full"
          >
            {loading ? "Verifying..." : "Submit"}
          </Button>
        </>
      )}
    </div>
  );
};

export default LeadForm;
