"use client";

import React, { useEffect, useState } from "react";
import { Caveat } from "next/font/google";
import { ArrowRight, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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

function ScoreRing({ percentage, met }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(percentage, 0), 100);
  const offset = circumference - (clamped / 100) * circumference;
  const ringColor = met ? "text-green-600" : "text-amber-600";

  return (
    <div className="relative mx-auto h-36 w-36 sm:h-40 sm:w-40">
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90" aria-hidden>
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="#e8e2d9"
          strokeWidth="10"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={ringColor}
          style={{
            transition: "stroke-dashoffset 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-extrabold tracking-tight text-[#0f172a] sm:text-2xl">
          {formatResult(percentage)}%
        </span>
      </div>
    </div>
  );
}

function isMobileViewport() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 1023px)").matches
  );
}

function ResultPreview({ attended, total, required, result, animating, compact = false }) {
  const met = result?.met;

  return (
    <div
      className={`mx-auto flex w-full flex-col items-center ${compact ? "" : "max-w-[360px]"}`}
    >
      <div className="mb-6 grid w-full grid-cols-3 items-center gap-2 sm:gap-3">
        <div className="flex min-h-[76px] flex-col items-center justify-center rounded-2xl border border-[#e8e2d9] bg-white px-2 py-3 text-center shadow-sm">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#a8a29e]">
            Attended
          </p>
          <p className="text-xl font-extrabold leading-none text-[#0f172a] sm:text-2xl">
            {attended || "—"}
          </p>
        </div>

        <div className="flex min-h-[76px] flex-col items-center justify-center rounded-2xl border border-[#e8e2d9] bg-white px-2 py-3 text-center shadow-sm">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#a8a29e]">
            Total
          </p>
          <p className="text-xl font-extrabold leading-none text-[#0f172a] sm:text-2xl">
            {total || "—"}
          </p>
        </div>

        <div
          className={`flex min-h-[76px] flex-col items-center justify-center rounded-2xl border px-2 py-3 text-center shadow-sm transition duration-500 ${
            result
              ? met
                ? "border-green-600/30 bg-green-600/5"
                : "border-amber-600/30 bg-amber-600/5"
              : "border-[#e8e2d9] bg-white"
          }`}
        >
          <p
            className={`mb-1 text-[10px] font-bold uppercase tracking-widest ${
              result ? (met ? "text-green-600" : "text-amber-600") : "text-[#a8a29e]"
            }`}
          >
            Now
          </p>
          <p
            className={`text-xl font-extrabold leading-none sm:text-2xl ${
              result
                ? met
                  ? "text-green-600"
                  : "text-amber-600"
                : "text-[#d6d3d1]"
            } ${animating ? "scale-105" : ""} transition duration-500`}
          >
            {result ? `${formatResult(result.percentage)}%` : "?"}
          </p>
        </div>
      </div>

      {result ? (
        <div className="flex w-full flex-col items-center animate-in fade-in zoom-in-95 duration-500">
          <ScoreRing percentage={result.percentage} met={met} />
          <p className="mt-2 text-center text-sm text-[#78716c]">{result.summary}</p>

          <div
            className={`mt-5 w-full rounded-2xl border px-4 py-3 text-center text-sm font-semibold ${
              met
                ? "border-green-600/20 bg-green-600/5 text-green-700"
                : "border-amber-600/20 bg-amber-600/5 text-amber-700"
            }`}
          >
            {result.advice}
          </div>

          <div className="mt-3 inline-flex items-center rounded-full border border-[#e8e2d9] bg-white px-3 py-1.5 text-xs font-semibold text-[#78716c]">
            Target: {required || 75}% · Formula: (Attended ÷ Total) × 100
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center py-4">
          <div className="mb-4 flex h-36 w-36 items-center justify-center rounded-full border-2 border-dashed border-[#d6d3d1] sm:h-40 sm:w-40">
            <p
              className={`${caveat.className} max-w-28 text-center text-xl leading-tight text-[#a8a29e]`}
            >
              your % shows up here
            </p>
          </div>
          <p className="text-sm text-[#78716c]">Hit Calculate to check eligibility</p>
        </div>
      )}
    </div>
  );
}

const AttendanceTool = () => {
  const [attended, setAttended] = useState("");
  const [total, setTotal] = useState("");
  const [required, setRequired] = useState("75");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [animating, setAnimating] = useState(false);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);

  useEffect(() => {
    if (!result) return;
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), 900);
    return () => clearTimeout(timer);
  }, [result]);

  const calculate = () => {
    const attendedValue = parseNum(attended);
    const totalValue = parseNum(total);
    const requiredValue = parseNum(required);

    if (!attended.trim() || !total.trim()) {
      setError("Please enter classes attended and total classes.");
      setResult(null);
      return;
    }

    if (attendedValue === null || totalValue === null || requiredValue === null) {
      setError("Please enter valid numbers.");
      setResult(null);
      return;
    }

    if (attendedValue < 0 || totalValue <= 0) {
      setError("Total classes must be greater than 0.");
      setResult(null);
      return;
    }

    if (attendedValue > totalValue) {
      setError("Classes attended cannot exceed total classes.");
      setResult(null);
      return;
    }

    if (requiredValue <= 0 || requiredValue > 100) {
      setError("Required attendance should be between 1 and 100.");
      setResult(null);
      return;
    }

    const percentage = (attendedValue / totalValue) * 100;
    const met = percentage >= requiredValue;
    const formatted = formatResult(percentage);

    let advice = "";
    if (met) {
      if (requiredValue >= 100) {
        advice = "You already meet the full attendance target.";
      } else {
        const canBunk = Math.floor(
          (100 * attendedValue - requiredValue * totalValue) / requiredValue
        );
        advice =
          canBunk > 0
            ? `You can miss up to ${canBunk} more class${canBunk === 1 ? "" : "es"} and still stay at ${requiredValue}%.`
            : `You're right on the edge — don't miss the next class if you want to keep ${requiredValue}%.`;
      }
    } else if (requiredValue >= 100) {
      advice = "You need to attend every remaining class to reach 100%.";
    } else {
      const need = Math.ceil(
        (requiredValue * totalValue - 100 * attendedValue) / (100 - requiredValue)
      );
      advice =
        need > 0
          ? `Attend the next ${need} class${need === 1 ? "" : "es"} in a row to reach ${requiredValue}%.`
          : `You're almost there — keep attending to hit ${requiredValue}%.`;
    }

    setResult({
      percentage,
      met,
      summary: `(${attendedValue} ÷ ${totalValue}) × 100 = ${formatted}%`,
      advice,
    });
    setError("");
    if (isMobileViewport()) {
      setResultDialogOpen(true);
    }
  };

  const reset = () => {
    setAttended("");
    setTotal("");
    setRequired("75");
    setResult(null);
    setError("");
    setResultDialogOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      calculate();
    }
  };

  const underlineInputClass =
    "w-full border-0 bg-transparent pb-1 text-center text-[1.55rem] font-extrabold leading-none text-primary outline-none placeholder:text-primary/30 focus:text-primary/90 sm:pb-1.5 sm:text-4xl md:text-[2.5rem]";

  return (
    <div
      id="attendance-calculator"
      className="relative mb-8 overflow-hidden rounded-4xl border border-[#e8e2d9]/80 bg-gradient-to-br from-[#fcfaf7] via-white to-[#f0f4f8] shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
    >
      <div
        className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl"
        aria-hidden
      />

      <div className="relative grid items-stretch lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-10 sm:px-8 sm:py-14 md:px-10 lg:px-8 lg:py-8">
          <div className="mb-8 text-left sm:mb-10">
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[1rem] font-extrabold tracking-tight text-[#0f172a] sm:text-4xl md:text-[2rem]">
              <span className="leading-none">I attended</span>

              <span className="relative inline-block w-[4.25rem] sm:w-[5.25rem]">
                <input
                  id="attended-classes"
                  type="text"
                  inputMode="decimal"
                  value={attended}
                  onChange={(e) => {
                    setAttended(sanitizeNumericInput(e.target.value));
                    setError("");
                    setResult(null);
                    setResultDialogOpen(false);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="72"
                  className={underlineInputClass}
                  aria-label="Classes attended"
                />
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary/40" />
              </span>

              <span className="leading-none">of</span>

              <span className="relative inline-block w-[4.25rem] sm:w-[5.25rem]">
                <input
                  id="total-classes"
                  type="text"
                  inputMode="decimal"
                  value={total}
                  onChange={(e) => {
                    setTotal(sanitizeNumericInput(e.target.value));
                    setError("");
                    setResult(null);
                    setResultDialogOpen(false);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="90"
                  className={underlineInputClass}
                  aria-label="Total classes"
                />
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary/40" />
                <span
                  className={`${caveat.className} pointer-events-none absolute left-1/2 top-full mt-2 flex -translate-x-1/2 items-start gap-0.5 whitespace-nowrap text-[#57534e]`}
                >
                  <svg
                    viewBox="0 0 28 24"
                    className="mt-0.5 h-5 w-6 shrink-0 text-[#78716c]"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M14 20V6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 10l5-5 5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-base leading-none sm:text-lg">
                    classes so far
                  </span>
                </span>
              </span>
            </div>
            <div className="h-8 sm:h-9" aria-hidden />
          </div>

          <h2 className="mb-6 text-left text-xl font-semibold sm:text-2xl">
            My college needs{" "}
            <span className="relative inline-block w-[3.5rem] align-baseline sm:w-[4.25rem]">
              <input
                id="required-attendance"
                type="text"
                inputMode="decimal"
                value={required}
                onChange={(e) => {
                  setRequired(sanitizeNumericInput(e.target.value));
                  setError("");
                  setResult(null);
                  setResultDialogOpen(false);
                }}
                onKeyDown={handleKeyDown}
                placeholder="75"
                className="w-full border-0 bg-transparent pb-0.5 text-center text-xl font-extrabold leading-none text-primary outline-none placeholder:text-primary/30 sm:text-2xl"
                aria-label="Required attendance percentage"
              />
              <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary/40" />
            </span>
            % attendance - am I safe?
          </h2>

          <div className="text-left">
            <p
              className={`${caveat.className} mb-3 flex items-center gap-1.5 text-lg leading-none text-[#44403c] sm:text-xl`}
            >
              Check My Attendance
              <svg
                viewBox="0 0 24 20"
                className="h-4 w-5 text-[#78716c]"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 4v10h12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 10l3 4-3 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={calculate}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-base font-bold text-white shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0 sm:h-14 sm:px-10 sm:text-lg"
              >
                Calculate
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={reset}
                className="inline-flex h-12 items-center gap-1.5 rounded-full border border-[#e8e2d9] bg-white px-5 text-sm font-semibold text-[#57534e] transition hover:border-primary/30 hover:text-primary sm:h-14"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>

            <p className="mt-3 text-sm text-[#78716c]">
              See if you can bunk — or how many classes you still need.
            </p>

            {error && (
              <p className="mt-3 text-sm font-medium text-red-600" role="alert">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="relative hidden items-center justify-center border-t border-[#e8e2d9] bg-white/70 px-5 py-10 sm:px-8 lg:flex lg:border-l lg:border-t-0 lg:px-8 lg:py-8">
          <ResultPreview
            attended={attended}
            total={total}
            required={required}
            result={result}
            animating={animating}
          />
        </div>
      </div>

      <Dialog open={resultDialogOpen && !!result} onOpenChange={setResultDialogOpen}>
        <DialogContent
          className="max-h-[90dvh] overflow-y-auto rounded-2xl border-[#e8e2d9] p-5 sm:max-w-md lg:hidden"
          overlayClassName="bg-black/50 backdrop-blur-sm"
        >
          <DialogHeader className="text-left">
            <DialogTitle className="text-lg font-extrabold text-[#0f172a]">
              Your Attendance Result
            </DialogTitle>
          </DialogHeader>
          <ResultPreview
            attended={attended}
            total={total}
            required={required}
            result={result}
            animating={animating}
            compact
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AttendanceTool;
