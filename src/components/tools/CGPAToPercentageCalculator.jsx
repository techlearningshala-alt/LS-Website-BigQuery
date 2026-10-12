import React, { useState } from "react";
import {
  Calculator,
  GraduationCap,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FORMULAS = [
  {
    id: "standard",
    label: "CGPA × 9.5",
    short: "CBSE / Common",
    description: "Widely used formula for Indian universities and CBSE boards.",
    example: "8.6 CGPA = 81.7%",
    calculate: (cgpa) => cgpa * 9.5,
    summary: (cgpa, result) => `${cgpa} × 9.5 = ${result}%`,
  },
  {
    id: "times10",
    label: "CGPA × 10",
    short: "Simple ×10",
    description: "Direct conversion by multiplying CGPA with 10.",
    example: "8.6 CGPA = 86%",
    calculate: (cgpa) => cgpa * 10,
    summary: (cgpa, result) => `${cgpa} × 10 = ${result}%`,
  },
  {
    id: "minus075",
    label: "(CGPA − 0.75) × 10",
    short: "Alternate",
    description: "Used by some institutions with an offset adjustment.",
    example: "8.6 CGPA = 78.5%",
    calculate: (cgpa) => (cgpa - 0.75) * 10,
    summary: (cgpa, result) => `(${cgpa} − 0.75) × 10 = ${result}%`,
  },
  {
    id: "custom",
    label: "Custom Multiplier",
    short: "Your formula",
    description: "Enter your university-specific multiplier value.",
    example: "8.6 × 9.3 = 79.98%",
    calculate: (cgpa, multiplier) => cgpa * multiplier,
    summary: (cgpa, result, multiplier) => `${cgpa} × ${multiplier} = ${result}%`,
  },
];

function sanitizeNumericInput(value) {
  const cleaned = value.replace(/[^\d.]/g, "");
  const parts = cleaned.split(".");
  if (parts.length <= 2) return cleaned;
  return `${parts[0]}.${parts.slice(1).join("")}`;
}

function parseNum(value) {
  const num = parseFloat(value);
  return Number.isFinite(num) ? num : null;
}

function formatResult(value) {
  if (!Number.isFinite(value)) return "0";
  return parseFloat(value.toFixed(2)).toString();
}

function InputField({ id, label, icon: Icon, value, onChange, placeholder, onKeyDown }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-[#44403c] md:text-base"
      >
        {label}
      </label>
      <div className="flex items-center overflow-hidden rounded-2xl border border-[#e8e2d9] bg-white transition-all duration-150 focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10">
        <div className="flex h-full items-center bg-[#fff1f2] px-4 py-3.5 text-primary">
          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </div>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="w-full bg-transparent px-4 py-3.5 text-[15px] outline-none placeholder:text-[#a8a29e]"
        />
      </div>
    </div>
  );
}

const CGPAToPercentageCalculator = () => {
  const [formula, setFormula] = useState("standard");
  const [cgpa, setCgpa] = useState("");
  const [multiplier, setMultiplier] = useState("9.5");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const activeFormula = FORMULAS.find((item) => item.id === formula);

  const reset = () => {
    setCgpa("");
    setMultiplier("9.5");
    setResult(null);
    setError("");
  };

  const switchFormula = (nextFormula) => {
    setFormula(nextFormula);
    setResult(null);
    setError("");
    if (nextFormula === "standard") setMultiplier("9.5");
    if (nextFormula === "times10") setMultiplier("10");
  };

  const calculate = () => {
    const cgpaValue = parseNum(cgpa);

    if (!cgpa.trim()) {
      setError("Please enter your CGPA.");
      setResult(null);
      return;
    }

    if (cgpaValue === null) {
      setError("Please enter a valid CGPA.");
      setResult(null);
      return;
    }

    if (cgpaValue < 0 || cgpaValue > 10) {
      setError("CGPA should be between 0 and 10.");
      setResult(null);
      return;
    }

    if (formula === "custom") {
      const multiplierValue = parseNum(multiplier);

      if (!multiplier.trim()) {
        setError("Please enter a custom multiplier.");
        setResult(null);
        return;
      }

      if (multiplierValue === null || multiplierValue <= 0) {
        setError("Please enter a valid multiplier greater than 0.");
        setResult(null);
        return;
      }

      const answer = activeFormula.calculate(cgpaValue, multiplierValue);
      const formatted = formatResult(answer);

      setResult({
        value: `${formatted}%`,
        summary: activeFormula.summary(cgpaValue, formatted, multiplierValue),
      });
      setError("");
      return;
    }

    if (formula === "minus075" && cgpaValue < 0.75) {
      setError("CGPA must be at least 0.75 for this formula.");
      setResult(null);
      return;
    }

    const answer = activeFormula.calculate(cgpaValue);
    const formatted = formatResult(answer);

    setResult({
      value: `${formatted}%`,
      summary: activeFormula.summary(cgpaValue, formatted),
    });
    setError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      calculate();
    }
  };

  return (
    <div
      id="cgpa-to-percentage-calculator"
      className="relative overflow-hidden rounded-[28px] border border-[#e8e2d9]/80 bg-gradient-to-br from-[#fcfaf7] via-white to-[#f0f4f8] p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-7 md:p-8 mb-8"
    >
      <div
        className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#a8a29e]">
            Calculator
          </p>
          <h2 className="text-xl font-extrabold text-[#0f172a] md:text-2xl">
            Convert CGPA to Percentage
          </h2>
          <p className="mt-1 text-sm text-[#78716c]">{activeFormula?.description}</p>
        </div>
        <p className="rounded-full border border-[#e8e2d9] bg-white px-3 py-1.5 text-xs font-medium text-[#78716c]">
          Example: {activeFormula?.example}
        </p>
      </div>

      <div className="relative mb-6 flex flex-wrap gap-2">
        {FORMULAS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => switchFormula(item.id)}
            className={cn(
              "rounded-full border px-3.5 py-2 text-xs font-semibold transition sm:text-sm",
              formula === item.id
                ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                : "border-[#e8e2d9] bg-white text-[#57534e] hover:border-primary/30 hover:text-primary"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        className={cn(
          "relative mb-6 grid gap-4",
          formula === "custom" ? "md:grid-cols-2" : "md:grid-cols-1"
        )}
      >
        <InputField
          id="cgpa-value"
          label="Enter CGPA"
          icon={GraduationCap}
          value={cgpa}
          onChange={(e) => {
            setCgpa(sanitizeNumericInput(e.target.value));
            setError("");
          }}
          placeholder="e.g. 8.6"
          onKeyDown={handleKeyDown}
        />

        {formula === "custom" && (
          <InputField
            id="cgpa-multiplier"
            label="Multiplier"
            icon={SlidersHorizontal}
            value={multiplier}
            onChange={(e) => {
              setMultiplier(sanitizeNumericInput(e.target.value));
              setError("");
            }}
            placeholder="e.g. 9.5"
            onKeyDown={handleKeyDown}
          />
        )}
      </div>

      {error && (
        <p className="mb-4 text-center text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      )}

      <div className="relative flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={calculate}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 md:text-base"
        >
          <Calculator className="h-4 w-4" aria-hidden />
          Calculate
        </button>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#e8e2d9] bg-white px-8 py-3.5 text-sm font-bold text-[#44403c] transition hover:border-primary/30 hover:text-primary md:text-base"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Reset
        </button>
      </div>

      {result && (
        <div className="relative mt-8 overflow-hidden rounded-[22px] border border-emerald-200/80 bg-gradient-to-b from-emerald-50 to-white p-5 shadow-sm">
          <div className="absolute left-0 top-0 rounded-br-xl rounded-tl-[22px] bg-emerald-600 px-4 py-1">
            <span className="text-xs font-bold uppercase tracking-wide text-white">
              Result
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 py-4 md:py-6">
            <p className="text-3xl font-extrabold tracking-tight text-emerald-600 md:text-4xl">
              {result.value}
            </p>
            <p className="text-sm text-[#78716c] md:text-base">{result.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CGPAToPercentageCalculator;
