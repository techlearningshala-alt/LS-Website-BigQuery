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

function ScoreRing({ percentage }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(percentage, 0), 100);
  const offset = circumference - (clamped / 100) * circumference;

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
          className="text-green-600"
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

function ResultPreview({ obtained, total, result, animating, compact = false }) {
  return (
    <div className={`flex w-full flex-col items-center mx-auto ${compact ? "" : "max-w-[340px]"}`}>
      <div className="mb-6 grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
        <div className="flex min-h-[76px] flex-col items-center justify-center rounded-2xl border border-[#e8e2d9] bg-white px-3 py-3 text-center shadow-sm">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#a8a29e]">
            Marks
          </p>
          <p className="text-lg font-extrabold leading-none text-[#0f172a] sm:text-xl">
            {obtained || "—"}
            <span className="text-sm font-semibold text-[#a8a29e]">
              /{total || "—"}
            </span>
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-0.5 px-1">
          <ArrowRight
            className={`h-5 w-5 text-green-600 transition duration-500 ${
              animating ? "translate-x-1 scale-110" : ""
            }`}
          />
          <span className={`${caveat.className} text-sm leading-none text-[#78716c]`}>
            becomes
          </span>
        </div>

        <div
          className={`flex min-h-[76px] flex-col items-center justify-center rounded-2xl border px-3 py-3 text-center shadow-sm transition duration-500 ${
            result
              ? "border-green-600/30 bg-green-600/5"
              : "border-[#e8e2d9] bg-white"
          }`}
        >
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-green-600">
            %
          </p>
          <p
            className={`text-2xl font-extrabold leading-none ${
              result ? "text-green-600" : "text-[#d6d3d1]"
            }`}
          >
            {result ? formatResult(result.numeric) : "?"}
          </p>
        </div>
      </div>

      {result ? (
        <div className="flex w-full flex-col items-center animate-in fade-in zoom-in-95 duration-500">
          <ScoreRing percentage={result.numeric} />
          <p className="mt-2 text-sm text-[#78716c]">{result.summary}</p>
          <div className="mt-5 inline-flex items-center rounded-full border border-green-600/20 bg-green-600/5 px-3 py-1.5 text-xs font-semibold text-green-600">
            Formula: (Marks ÷ Total) × 100
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
          <p className="text-sm text-[#78716c]">Hit Calculate to print your result</p>
        </div>
      )}
    </div>
  );
}

const MarksToPercentage = () => {
  const [obtained, setObtained] = useState("");
  const [total, setTotal] = useState("");
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
    const obtainedValue = parseNum(obtained);
    const totalValue = parseNum(total);

    if (!obtained.trim() || !total.trim()) {
      setError("Please enter obtained marks and total marks.");
      setResult(null);
      return;
    }

    if (obtainedValue === null || totalValue === null) {
      setError("Please enter valid marks.");
      setResult(null);
      return;
    }

    if (obtainedValue < 0 || totalValue <= 0) {
      setError("Marks should be valid numbers greater than 0.");
      setResult(null);
      return;
    }

    if (obtainedValue > totalValue) {
      setError("Obtained marks cannot be more than total marks.");
      setResult(null);
      return;
    }

    const answer = (obtainedValue / totalValue) * 100;
    const formatted = formatResult(answer);

    setResult({
      numeric: answer,
      value: `${formatted}%`,
      summary: `(${obtainedValue} ÷ ${totalValue}) × 100 = ${formatted}%`,
    });
    setError("");
    if (isMobileViewport()) {
      setResultDialogOpen(true);
    }
  };

  const reset = () => {
    setObtained("");
    setTotal("");
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

  return (
    <div
      id="marks-to-percentage-calculator"
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
        <div className="flex flex-col justify-center px-5 py-8 sm:px-8 sm:py-8 md:px-8 lg:px-8 lg:py-8">
          <div className="mb-8 text-left sm:mb-10">
            <label htmlFor="marks-obtained" className="sr-only">
              Enter obtained marks
            </label>
            <label htmlFor="marks-total" className="sr-only">
              Enter total marks
            </label>

            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[1rem] font-extrabold tracking-tight text-[#0f172a] sm:text-4xl md:text-[2rem]">
              <span className="leading-none">I scored</span>

              <span className="relative inline-block w-[5.5rem] sm:w-[7rem]">
                <input
                  id="marks-obtained"
                  type="text"
                  inputMode="decimal"
                  value={obtained}
                  onChange={(e) => {
                    setObtained(sanitizeNumericInput(e.target.value));
                    setError("");
                    setResult(null);
                    setResultDialogOpen(false);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="420"
                  className="w-full border-0 bg-transparent pb-1 text-center text-[1rem] font-extrabold leading-none text-primary outline-none placeholder:text-primary/30 focus:text-primary/90 sm:pb-1.5 sm:text-3xl md:text-[2rem]"
                  aria-label="Obtained marks"
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
                    obtained
                  </span>
                </span>
              </span>

              <span className="leading-none">out of</span>

              <span className="relative inline-block w-[5.5rem] sm:w-[7rem]">
                <input
                  id="marks-total"
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
                  placeholder="500"
                  className="w-full border-0 bg-transparent pb-1 text-center text-[1.55rem] font-extrabold leading-none text-primary outline-none placeholder:text-primary/30 focus:text-primary/90 sm:pb-1.5 sm:text-4xl md:text-[2rem]"
                  aria-label="Total marks"
                />
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary/40" />
                <span
                  className={`${caveat.className} pointer-events-none absolute left-1/2 top-full mt-2 whitespace-nowrap text-base leading-none text-[#57534e] sm:text-lg`}
                >
                  total
                </span>
              </span>
            </div>

            <div className="h-8 sm:h-9" aria-hidden />
          </div>

          <h2 className="mb-8 text-left text-xl font-semibold sm:text-2xl">
            But all the forms are asking for a{" "}
            <span className="text-primary">Percentage</span>!
          </h2>

          <div className="text-left">
            <p
              className={`${caveat.className} mb-3 flex items-center gap-1.5 text-lg leading-none text-[#44403c] sm:text-xl`}
            >
              Convert My Marks Now
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

            <p className="mt-3 text-sm text-[#78716c]">Find out in seconds.</p>

            {error && (
              <p className="mt-3 text-sm font-medium text-red-600" role="alert">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="relative hidden items-center justify-center border-t border-[#e8e2d9] bg-white/70 px-5 py-10 sm:px-8 lg:flex lg:border-l lg:border-t-0 lg:px-8 lg:py-8">
          <div className="w-full rounded-[28px] border border-[#e8e2d9] bg-white p-6 text-center shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-8">
            <ResultPreview
              obtained={obtained}
              total={total}
              result={result}
              animating={animating}
            />
          </div>
        </div>
      </div>

      <Dialog open={resultDialogOpen && !!result} onOpenChange={setResultDialogOpen}>
        <DialogContent
          className="max-h-[90dvh] overflow-y-auto rounded-2xl border-[#e8e2d9] p-5 sm:max-w-md lg:hidden"
          overlayClassName="bg-black/50 backdrop-blur-sm"
        >
          <DialogHeader className="text-left">
            <DialogTitle className="text-lg font-extrabold text-[#0f172a]">
              Your Percentage Result
            </DialogTitle>
          </DialogHeader>
          <ResultPreview
            obtained={obtained}
            total={total}
            result={result}
            animating={animating}
            compact
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarksToPercentage;
