"use client";

import Logo from "@/components/custom/shared/Logo";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Lock,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { submitKycLead } from "@/services/PartnerKycLeadService";

const STEPS = [
  "Partner Details",
  "Shop / Business",
  "Payout / Bank",
  "Documents",
  "Declaration",
];

const DOC_FIELDS = new Set([
  "doc_id",
  "doc_pan",
  "doc_shop_addr",
  "doc_cheque",
  "doc_photo_out",
  "doc_photo_in",
]);

const INITIAL_FORM_DATA = {
  full_name: "",
  dob: "",
  mobile: "",
  alt_mobile: "",
  email: "",
  pan: "",
  aadhaar: "",
  gender: "",
  shop_name: "",
  biz_type: "",
  address: "",
  locality: "",
  city: "",
  pincode: "",
  google_loc: "",
  footfall: "",
  acc_holder: "",
  bank_name: "",
  acc_number: "",
  ifsc: "",
  upi: "",
  doc_id: false,
  doc_pan: false,
  doc_shop_addr: false,
  doc_cheque: false,
  doc_photo_out: false,
  doc_photo_in: false,
  coi: "",
  coi_specify: "",
  declaration_agree: false,
};

const STEP_HINTS = [
  "Apni personal aur KYC details bhariye",
  "Dukaan ya business ki jaankari share kariye",
  "Payout ke liye bank details add kariye",
  "Required documents upload kariye",
  "Declaration review karke submit kariye",
];

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  value,
  onChange,
  error,
  options,
  maxLength,
  full,
}) {
  const inputClass = cn(
    "w-full rounded-2xl border bg-white/90 px-4 py-3.5 text-sm shadow-[0_2px_12px_rgba(15,23,42,0.04)] outline-none transition",
    "placeholder:text-[#9ca3af] focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10",
    error ? "border-red-300 ring-2 ring-red-100" : "border-[#e8e2d9]"
  );

  return (
    <div className={cn("p-3", full ? "md:col-span-2" : "")}>
      <label
        htmlFor={name}
        className="mb-2 block text-[13px] font-semibold tracking-tight text-[#1a1a1a]"
      >
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </label>

      {options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClass}
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className={inputClass}
        />
      )}

      {error ? (
        <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>
      ) : null}
    </div>
  );
}

function DocUpload({ label, name, required, error, accept, onFileChange }) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [hasFile, setHasFile] = useState(false);

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className={cn(
        "group relative flex min-h-[124px] w-full flex-col justify-between overflow-hidden rounded-[22px] border p-4 text-left transition duration-300",
        hasFile
          ? "border-primary/30 bg-gradient-to-br from-primary/[0.08] to-white shadow-[0_10px_30px_rgba(168,50,38,0.08)]"
          : "border-[#e8e2d9] bg-white hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_12px_32px_rgba(15,23,42,0.06)]"
      )}
    >
      <div className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 rounded-full bg-primary/5 blur-2xl" />

      <div className="relative flex w-full items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-[#1a1a1a]">
            {label}
            {required ? <span className="text-primary"> *</span> : null}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[#6b7280]">
            {fileName || "JPG, PNG select kariye"}
          </p>
        </div>
        <span
          className={cn(
            "grid h-10 w-10 shrink-0 place-items-center rounded-2xl shadow-sm transition",
            hasFile
              ? "bg-primary text-white"
              : "bg-[#f8f6f2] text-[#6b7280] group-hover:bg-primary/10 group-hover:text-primary"
          )}
        >
          {hasFile ? <Check className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
        </span>
      </div>

      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept || ".jpg,.jpeg,.png,.pdf,image/*,application/pdf"}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          const selected = Boolean(file);
          setHasFile(selected);
          setFileName(file?.name || "");
          onFileChange(selected, file || null);
        }}
      />

      {error ? (
        <p className="relative mt-2 text-xs font-medium text-red-600">{error}</p>
      ) : null}
    </button>
  );
}

function Stepper({ current, onSelectStep }) {
  const progress = ((current + 1) / STEPS.length) * 100;

  return (
    <div className="border-b border-[#ece7df] bg-[#fcfaf7] px-4 py-5 sm:px-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9a948c]">
            Onboarding Progress
          </p>
          <p className="text-sm font-bold text-[#1a1a1a]">
            Step {current + 1} of {STEPS.length}
          </p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-primary shadow-sm">
          {Math.round(progress)}% complete
        </span>
      </div>

      <div className="mb-4 h-2 overflow-hidden rounded-full bg-[#ece7df]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-[#f97316] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {STEPS.map((title, index) => {
          const isActive = index === current;
          const isDone = index < current;

          return (
            <button
              key={title}
              type="button"
              onClick={() => onSelectStep(index)}
              className={cn(
                "inline-flex min-w-[148px] flex-1 items-center gap-2.5 rounded-2xl border px-3 py-3 text-left transition duration-300",
                isActive
                  ? "border-primary/20 bg-white shadow-[0_10px_28px_rgba(168,50,38,0.08)]"
                  : isDone
                    ? "border-emerald-200/80 bg-emerald-50/80"
                    : "border-transparent bg-white/60 hover:bg-white"
              )}
            >
              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-xl text-xs font-bold",
                  isActive
                    ? "bg-primary text-white shadow-[0_6px_16px_rgba(168,50,38,0.25)]"
                    : isDone
                      ? "bg-emerald-500 text-white"
                      : "bg-[#f1ede6] text-[#6b7280]"
                )}
              >
                {isDone ? <Check className="h-3.5 w-3.5" /> : index + 1}
              </span>
              <span className="text-xs font-semibold leading-tight text-[#1a1a1a]">
                {title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepShell({ index, children }) {
  return (
    <div className="border-b border-[#ece7df]">
      <div className="flex items-start justify-between gap-4 border-b border-[#ece7df] bg-gradient-to-r from-[#fffdfb] to-[#f8f6f2] px-6 py-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9a948c]">
            Step {index + 1} of {STEPS.length}
          </p>
          <p className="mt-1 text-lg font-bold text-[#1a1a1a]">{STEPS[index]}</p>
          <p className="mt-1 text-sm text-[#6b7280]">{STEP_HINTS[index]}</p>
        </div>
        <span className="hidden rounded-2xl border border-[#ece7df] bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#6b7280] sm:inline-flex">
          Secure
        </span>
      </div>
      <div className="bg-[#fcfcfb] p-2 sm:p-3">{children}</div>
    </div>
  );
}

function validateStep(step, formData) {
  const errors = {};
  const phoneRegex = /^[6-9]\d{9}$/;
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

  if (step === 0) {
    if (!formData.full_name.trim()) errors.full_name = "Full name is required";
    if (!formData.dob) errors.dob = "Date of birth is required";
    if (!phoneRegex.test(formData.mobile)) errors.mobile = "Valid 10-digit mobile required";
    if (formData.alt_mobile && !phoneRegex.test(formData.alt_mobile)) {
      errors.alt_mobile = "Valid 10-digit alternate mobile required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Valid email is required";
    }
    if (!panRegex.test(formData.pan)) errors.pan = "Valid PAN required";
    if (!/^\d{12}$/.test(formData.aadhaar)) errors.aadhaar = "Valid 12-digit Aadhaar required";
    if (!formData.gender) errors.gender = "Please select gender";
  }

  if (step === 1) {
    if (!formData.shop_name.trim()) errors.shop_name = "Shop name is required";
    if (!formData.biz_type) errors.biz_type = "Please select business type";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.locality.trim()) errors.locality = "Locality is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!/^\d{6}$/.test(formData.pincode)) errors.pincode = "Valid 6-digit pincode required";
    if (!formData.footfall) errors.footfall = "Please select footfall";
  }

  if (step === 2) {
    if (!formData.acc_holder.trim()) errors.acc_holder = "Account holder name is required";
    if (!formData.bank_name.trim()) errors.bank_name = "Bank name is required";
    if (!/^\d{9,18}$/.test(formData.acc_number)) {
      errors.acc_number = "Valid account number required";
    }
    if (!ifscRegex.test(formData.ifsc)) errors.ifsc = "Valid IFSC code required";
  }

  if (step === 3) {
    if (!formData.doc_id) errors.doc_id = "ID proof is required";
    if (!formData.doc_pan) errors.doc_pan = "PAN copy is required";
    if (!formData.doc_cheque) errors.doc_cheque = "Cancelled cheque is required";
    if (!formData.doc_photo_out) errors.doc_photo_out = "Outside shop photo is required";
    if (!formData.doc_photo_in) errors.doc_photo_in = "Inside shop photo is required";
  }

  if (step === 4) {
    if (!formData.coi) errors.coi = "Please select an option";
    if (formData.coi === "yes" && !formData.coi_specify.trim()) {
      errors.coi_specify = "Please specify relation details";
    }
    if (!formData.declaration_agree) {
      errors.declaration_agree = "You must agree to continue";
    }
  }

  return errors;
}

const PartnerLeadForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const filesRef = useRef({});

  const isLast = step === STEPS.length - 1;

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFileChange = (name, hasFile, file) => {
    handleChange(name, hasFile);
    if (file) filesRef.current[name] = file;
    else delete filesRef.current[name];
  };

  const handleSelectStep = (nextStep) => {
    if (nextStep <= step) {
      setStep(nextStep);
      return;
    }

    let valid = true;
    for (let i = step; i < nextStep; i += 1) {
      const stepErrors = validateStep(i, formData);
      if (Object.keys(stepErrors).length) {
        setErrors(stepErrors);
        setStep(i);
        valid = false;
        break;
      }
    }

    if (valid) setStep(nextStep);
  };

  const next = () => {
    const stepErrors = validateStep(step, formData);
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors);
      toast.error("Please complete all required fields");
      return;
    }
    setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const prev = () => setStep((prevStep) => Math.max(prevStep - 1, 0));

  const onSubmit = async (e) => {
    e.preventDefault();
    const stepErrors = validateStep(step, formData);
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors);
      toast.error("Please complete all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (DOC_FIELDS.has(key)) return;
        payload.append(key, typeof value === "boolean" ? String(value) : value);
      });

      Object.entries(filesRef.current).forEach(([key, file]) => {
        payload.append(key, file);
      });

      await submitKycLead(payload);

      toast.success("Form submitted successfully");
      router.push("/career-sathi-channel-partner/");
    } catch (error) {
      console.error(error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Submission failed. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="partner-form" className="scroll-mt-24">
      <form
        onSubmit={onSubmit}
        className="overflow-hidden rounded-[28px] border border-[#ece7df] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.10)]"
      >
        <div
          id="form-top"
          className="relative overflow-hidden border-b border-[#ece7df] bg-[#111827] px-6 py-7 sm:px-8"
        >
          <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-[#f97316]/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-[18px] bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-sm">
                <GraduationCap className="h-7 w-7" strokeWidth={2.2} />
              </span>
              <div>
                <div>
                  <Logo />
                </div>
                <p className="mt-0 text-xl font-extrabold tracking-tight text-white">
                  CAREER SATHI
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/65">
                  Partner Onboarding & Basic KYC
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified Process
              </span>
            
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="flex items-center gap-3 border-b border-emerald-200 bg-gradient-to-r from-emerald-50 to-[#f0fdf4] px-6 py-5 text-sm font-medium text-emerald-800">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-emerald-600">
              <Sparkles className="h-5 w-5" />
            </span>
            <p>
              Dhanyavaad! Aapki details receive ho gayi hain. Hamari team 24 ghante ke
              andar aapse contact karegi.
            </p>
          </div>
        ) : null}

        <Stepper current={step} onSelectStep={handleSelectStep} />

        {step === 0 ? (
          <StepShell index={0}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <Field
                label="Full Name (as per PAN)"
                name="full_name"
                required
                placeholder="e.g. Rahul Kumar Sharma"
                value={formData.full_name}
                onChange={(e) => handleChange("full_name", e.target.value)}
                error={errors.full_name}
              />
              <Field
                label="Date of Birth"
                name="dob"
                type="date"
                required
                value={formData.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
                error={errors.dob}
              />
              <Field
                label="Mobile No. (WhatsApp)"
                name="mobile"
                type="tel"
                required
                placeholder="10-digit WhatsApp mobile number"
                maxLength={10}
                value={formData.mobile}
                onChange={(e) =>
                  handleChange("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                error={errors.mobile}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:col-span-1">
                <Field
                  label="Alternate Mobile No."
                  name="alt_mobile"
                  type="tel"
                  placeholder="Alternate 10-digit number"
                  maxLength={10}
                  value={formData.alt_mobile}
                  onChange={(e) =>
                    handleChange("alt_mobile", e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  error={errors.alt_mobile}
                />
                <Field
                  label="Email ID"
                  name="email"
                  type="email"
                  required
                  placeholder="e.g. rahul.sharma@gmail.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={errors.email}
                />
              </div>
              <Field
                label="PAN Number"
                name="pan"
                required
                placeholder="10-character PAN e.g. ABCDE1234F"
                maxLength={10}
                value={formData.pan}
                onChange={(e) => handleChange("pan", e.target.value.toUpperCase())}
                error={errors.pan}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:col-span-1">
                <Field
                  label="Aadhaar Number (12 digits)"
                  name="aadhaar"
                  required
                  placeholder="12-digit Aadhaar e.g. 123456789012"
                  maxLength={12}
                  value={formData.aadhaar}
                  onChange={(e) =>
                    handleChange("aadhaar", e.target.value.replace(/\D/g, "").slice(0, 12))
                  }
                  error={errors.aadhaar}
                />
                <Field
                  label="Gender"
                  name="gender"
                  required
                  options={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                    { label: "Other", value: "Other" },
                  ]}
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  error={errors.gender}
                />
              </div>
            </div>
          </StepShell>
        ) : null}

        {step === 1 ? (
          <StepShell index={1}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <Field
                label="Shop / Business Name"
                name="shop_name"
                required
                placeholder="e.g. Sharma Cyber Cafe & Digital Services"
                value={formData.shop_name}
                onChange={(e) => handleChange("shop_name", e.target.value)}
                error={errors.shop_name}
              />
              <Field
                label="Business Type"
                name="biz_type"
                required
                options={[
                  { label: "Cyber Cafe", value: "Cyber Cafe" },
                  { label: "Photocopy / Xerox Shop", value: "Photocopy / Xerox Shop" },
                  { label: "Coaching Center", value: "Coaching Center" },
                  { label: "Stationery / Book Shop", value: "Stationery / Book Shop" },
                  { label: "Other", value: "Other" },
                ]}
                value={formData.biz_type}
                onChange={(e) => handleChange("biz_type", e.target.value)}
                error={errors.biz_type}
              />
              <Field
                full
                label="Full Shop Address"
                name="address"
                required
                placeholder="Shop No., Building Name, Street / Road Name"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                error={errors.address}
              />
              <Field
                label="Locality / Landmark"
                name="locality"
                required
                placeholder="e.g. Near Main Market, Opposite SBI Bank"
                value={formData.locality}
                onChange={(e) => handleChange("locality", e.target.value)}
                error={errors.locality}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:col-span-1">
                <Field
                  label="City"
                  name="city"
                  required
                  placeholder="e.g. Jaipur, Lucknow, Delhi"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  error={errors.city}
                />
                <Field
                  label="Pincode"
                  name="pincode"
                  required
                  placeholder="6-digit Pincode e.g. 302001"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) =>
                    handleChange("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  error={errors.pincode}
                />
              </div>
              <Field
                label="Exact Google Location (Optional)"
                name="google_loc"
                placeholder="Google Maps link or Plus Code"
                value={formData.google_loc}
                onChange={(e) => handleChange("google_loc", e.target.value)}
                error={errors.google_loc}
              />
              <Field
                label="Approx. Daily Student Footfall"
                name="footfall"
                required
                options={[
                  { label: "1 - 20 students / day", value: "1-20" },
                  { label: "20 - 50 students / day", value: "20-50" },
                  { label: "50 - 100 students / day", value: "50-100" },
                  { label: "100+ students / day", value: "100+" },
                ]}
                value={formData.footfall}
                onChange={(e) => handleChange("footfall", e.target.value)}
                error={errors.footfall}
              />
            </div>
          </StepShell>
        ) : null}

        {step === 2 ? (
          <StepShell index={2}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <Field
                label="Account Holder Name"
                name="acc_holder"
                required
                placeholder="Name exactly as printed in Bank Account"
                value={formData.acc_holder}
                onChange={(e) => handleChange("acc_holder", e.target.value)}
                error={errors.acc_holder}
              />
              <Field
                label="Bank Name"
                name="bank_name"
                required
                placeholder="e.g. State Bank of India, HDFC Bank"
                value={formData.bank_name}
                onChange={(e) => handleChange("bank_name", e.target.value)}
                error={errors.bank_name}
              />
              <Field
                label="Account Number"
                name="acc_number"
                required
                placeholder="Enter bank account number"
                maxLength={18}
                value={formData.acc_number}
                onChange={(e) =>
                  handleChange("acc_number", e.target.value.replace(/\D/g, "").slice(0, 18))
                }
                error={errors.acc_number}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:col-span-1">
                <Field
                  label="IFSC Code"
                  name="ifsc"
                  required
                  placeholder="11-char IFSC e.g. SBIN0001234"
                  maxLength={11}
                  value={formData.ifsc}
                  onChange={(e) => handleChange("ifsc", e.target.value.toUpperCase())}
                  error={errors.ifsc}
                />
                <Field
                  label="UPI ID (optional)"
                  name="upi"
                  placeholder="e.g. 9876543210@paytm or name@upi"
                  value={formData.upi}
                  onChange={(e) => handleChange("upi", e.target.value)}
                  error={errors.upi}
                />
              </div>
            </div>
          </StepShell>
        ) : null}

        {step === 3 ? (
          <StepShell index={3}>
            <div className="p-5 sm:p-6">
              <div className="mb-5 flex items-start gap-3 rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50 to-white p-4 text-xs leading-relaxed text-sky-900 shadow-[0_4px_18px_rgba(14,116,144,0.06)]">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-sky-600 shadow-sm">
                  <Upload className="h-4 w-4" />
                </span>
                <p>
                  Har document box par click karke JPG, PNG ya PDF file select kariye.
                  File attach hote hi card premium highlight ke saath ready dikhega.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <DocUpload
                  label="ID Proof (Aadhaar / Voter / DL)"
                  name="doc_id"
                  required
                  error={errors.doc_id}
                  onFileChange={(hasFile, file) => handleFileChange("doc_id", hasFile, file)}
                />
                <DocUpload
                  label="PAN Card copy"
                  name="doc_pan"
                  required
                  error={errors.doc_pan}
                  onFileChange={(hasFile, file) => handleFileChange("doc_pan", hasFile, file)}
                />
                <DocUpload
                  label="Shop Address Proof"
                  name="doc_shop_addr"
                  error={errors.doc_shop_addr}
                  onFileChange={(hasFile, file) =>
                    handleFileChange("doc_shop_addr", hasFile, file)
                  }
                />
                <DocUpload
                  label="Cancelled Cheque / Passbook"
                  name="doc_cheque"
                  required
                  error={errors.doc_cheque}
                  onFileChange={(hasFile, file) => handleFileChange("doc_cheque", hasFile, file)}
                />
                <DocUpload
                  label="Shop photo — OUTSIDE (signboard)"
                  name="doc_photo_out"
                  accept="image/*"
                  required
                  error={errors.doc_photo_out}
                  onFileChange={(hasFile, file) =>
                    handleFileChange("doc_photo_out", hasFile, file)
                  }
                />
                <DocUpload
                  label="Shop photo — INSIDE"
                  name="doc_photo_in"
                  accept="image/*"
                  required
                  error={errors.doc_photo_in}
                  onFileChange={(hasFile, file) =>
                    handleFileChange("doc_photo_in", hasFile, file)
                  }
                />
              </div>
            </div>
          </StepShell>
        ) : null}

        {step === 4 ? (
          <StepShell index={4}>
            <div className="space-y-6 p-6 sm:p-8">
              <div className="space-y-4">
                <p className="text-sm font-semibold leading-relaxed text-[#1a1a1a]">
                  Is this partner related to, or associated with, the enrolling FMS
                  (family / friend / business partner / same address)?{" "}
                  <span className="text-primary">*</span>
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-[20px] border p-4 text-sm font-semibold transition duration-300",
                      formData.coi === "no"
                        ? "border-primary bg-primary/10 text-primary shadow-[0_10px_24px_rgba(168,50,38,0.08)] ring-2 ring-primary/20"
                        : "border-[#e8e2d9] bg-emerald-50/70 text-emerald-900 hover:bg-emerald-50"
                    )}
                  >
                    <input
                      type="radio"
                      name="coi"
                      value="no"
                      checked={formData.coi === "no"}
                      onChange={() => handleChange("coi", "no")}
                      className="h-4 w-4 accent-primary"
                    />
                    NO — no relation
                  </label>
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-[20px] border p-4 text-sm font-semibold transition duration-300",
                      formData.coi === "yes"
                        ? "border-primary bg-primary/10 text-primary shadow-[0_10px_24px_rgba(168,50,38,0.08)] ring-2 ring-primary/20"
                        : "border-[#e8e2d9] bg-orange-50/70 text-orange-900 hover:bg-orange-50"
                    )}
                  >
                    <input
                      type="radio"
                      name="coi"
                      value="yes"
                      checked={formData.coi === "yes"}
                      onChange={() => handleChange("coi", "yes")}
                      className="h-4 w-4 accent-primary"
                    />
                    YES — relation exists
                  </label>
                </div>
                {errors.coi ? (
                  <p className="text-xs font-semibold text-red-600">{errors.coi}</p>
                ) : null}

                {formData.coi === "yes" ? (
                  <div className="mt-3">
                    <input
                      name="coi_specify"
                      placeholder="If yes, specify details of relation / association..."
                      value={formData.coi_specify}
                      onChange={(e) => handleChange("coi_specify", e.target.value)}
                      className="w-full rounded-2xl border border-[#e8e2d9] bg-white px-4 py-3.5 text-sm shadow-[0_2px_12px_rgba(15,23,42,0.04)] outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
                    />
                    {errors.coi_specify ? (
                      <p className="mt-1 text-xs font-semibold text-red-600">
                        {errors.coi_specify}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div className="rounded-[20px] border border-amber-200/80 bg-gradient-to-r from-amber-50 to-[#fffbeb] p-4 text-xs font-medium leading-relaxed text-amber-900 shadow-[0_4px_18px_rgba(245,158,11,0.08)]">
                A false declaration is treated as fraud — leads to termination, payout
                clawback, and possible legal action.
              </div>

              <div className="rounded-[22px] border border-[#e8e2d9] bg-[#fdf9f3] p-5 shadow-[0_4px_18px_rgba(15,23,42,0.04)]">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="declaration_agree"
                    checked={formData.declaration_agree}
                    onChange={(e) => handleChange("declaration_agree", e.target.checked)}
                    className="mt-1 h-5 w-5 rounded accent-primary"
                  />
                  <span className="text-xs font-medium leading-relaxed text-foreground">
                    I hereby confirm and declare that all information provided in this
                    onboarding form and attached documents are true, complete, and
                    accurate. I understand and agree to LearningShala Partner Terms.
                  </span>
                </label>
                {errors.declaration_agree ? (
                  <p className="mt-2 pl-8 text-xs font-semibold text-red-600">
                    {errors.declaration_agree}
                  </p>
                ) : null}
              </div>

              <div className="space-y-4 rounded-[22px] border border-[#e8e2d9] bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9a948c]">
                  Onboarding Overview Summary
                </p>
                <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-3">
                  <div className="rounded-2xl border border-[#ece7df] bg-[#fcfaf7] p-3.5">
                    <p className="font-semibold text-[#6b7280]">Partner</p>
                    <p className="mt-1 truncate text-sm font-bold text-[#1a1a1a]">
                      {formData.full_name || "Not provided"}
                    </p>
                    <p className="mt-1 text-[11px] text-[#6b7280]">
                      {formData.mobile || "-"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#ece7df] bg-[#fcfaf7] p-3.5">
                    <p className="font-semibold text-[#6b7280]">Shop / Business</p>
                    <p className="mt-1 truncate text-sm font-bold text-[#1a1a1a]">
                      {formData.shop_name || "Not provided"}
                    </p>
                    <p className="mt-1 text-[11px] text-[#6b7280]">
                      {formData.city ? `${formData.city} (${formData.pincode})` : "-"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#ece7df] bg-[#fcfaf7] p-3.5">
                    <p className="font-semibold text-[#6b7280]">Bank Account</p>
                    <p className="mt-1 truncate text-sm font-bold text-[#1a1a1a]">
                      {formData.bank_name || "Not provided"}
                    </p>
                    <p className="mt-1 text-[11px] text-[#6b7280]">
                      {formData.acc_number
                        ? `A/C: ****${formData.acc_number.slice(-4)}`
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </StepShell>
        ) : null}

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#ece7df] bg-gradient-to-r from-[#fffdfb] to-[#f8f6f2] p-6 sm:flex-row sm:px-8">
          <button
            type="button"
            onClick={prev}
            disabled={step === 0 || submitted}
            className="inline-flex items-center gap-2 rounded-full border border-[#e8e2d9] bg-white px-6 py-3.5 text-sm font-semibold text-[#1a1a1a] shadow-[0_4px_16px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:bg-[#fcfaf7] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>

          <p className="hidden items-center gap-2 text-xs text-[#6b7280] sm:flex">
            <Lock className="h-3.5 w-3.5" />
            Confidential — for internal onboarding use.
          </p>

          {isLast ? (
            <button
              type="submit"
              disabled={isSubmitting || submitted}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-[0_12px_32px_rgba(168,50,38,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(168,50,38,0.32)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit & Career Sathi Banein"}
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-[0_12px_32px_rgba(168,50,38,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(168,50,38,0.32)]"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PartnerLeadForm;
