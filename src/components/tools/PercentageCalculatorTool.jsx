import React, { useState } from "react";
import {
  Calculator,
  Percent,
  Pencil,
  RotateCcw,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MODES = [
  {
    id: "of",
    label: "% of a Number",
    short: "X% of Y",
    description: "Find what a percentage of any value equals.",
    example: "25% of 800 = 200",
  },
  {
    id: "what",
    label: "What Percent",
    short: "X is ?% of Y",
    description: "Find what percentage one number is of another.",
    example: "50 is 25% of 200",
  },
  {
    id: "change",
    label: "% Change",
    short: "Increase / Decrease",
    description: "Calculate percentage increase or decrease between two values.",
    example: "100 to 150 = +50% change",
  },
  {
    id: "adjust",
    label: "Add / Subtract %",
    short: "Increase or reduce",
    description: "Add or subtract a percentage from a value (discounts, hikes).",
    example: "500 + 10% = 550",
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
  return Number.isInteger(value) ? String(value) : parseFloat(value.toFixed(4)).toString();
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

const PercentageCalculatorTool = () => {
  const [mode, setMode] = useState("of");
  const [values, setValues] = useState({ a: "", b: "", c: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const activeMode = MODES.find((m) => m.id === mode);

  const updateValue = (key) => (e) => {
    setValues((prev) => ({ ...prev, [key]: sanitizeNumericInput(e.target.value) }));
    setError("");
  };

  const reset = () => {
    setValues({ a: "", b: "", c: "" });
    setResult(null);
    setError("");
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    reset();
  };

  const calculate = () => {
    const a = parseNum(values.a);
    const b = parseNum(values.b);
    const c = parseNum(values.c);

    if (mode === "of") {
      if (values.a === "" || values.b === "") {
        setError("Enter both percentage and value.");
        setResult(null);
        return;
      }
      if (a === null || b === null) {
        setError("Enter valid numbers.");
        setResult(null);
        return;
      }
      const answer = (b * a) / 100;
      setResult({
        value: formatResult(answer),
        summary: `${a}% of ${b} = ${formatResult(answer)}`,
      });
    }

    if (mode === "what") {
      if (values.a === "" || values.b === "") {
        setError("Enter both values.");
        setResult(null);
        return;
      }
      if (a === null || b === null) {
        setError("Enter valid numbers.");
        setResult(null);
        return;
      }
      if (b === 0) {
        setError("Second value cannot be zero.");
        setResult(null);
        return;
      }
      const answer = (a / b) * 100;
      setResult({
        value: `${formatResult(answer)}%`,
        summary: `${a} is ${formatResult(answer)}% of ${b}`,
      });
    }

    if (mode === "change") {
      if (values.a === "" || values.b === "") {
        setError("Enter both old and new values.");
        setResult(null);
        return;
      }
      if (a === null || b === null) {
        setError("Enter valid numbers.");
        setResult(null);
        return;
      }
      if (a === 0) {
        setError("Old value cannot be zero.");
        setResult(null);
        return;
      }
      const answer = ((b - a) / a) * 100;
      const sign = answer >= 0 ? "+" : "";
      setResult({
        value: `${sign}${formatResult(answer)}%`,
        summary: `Change from ${a} to ${b} = ${sign}${formatResult(answer)}%`,
        positive: answer >= 0,
      });
    }

    if (mode === "adjust") {
      if (values.a === "" || values.b === "" || values.c === "") {
        setError("Enter value, percentage, and choose add or subtract.");
        setResult(null);
        return;
      }
      if (a === null || b === null) {
        setError("Enter valid numbers.");
        setResult(null);
        return;
      }
      const isAdd = values.c === "add";
      const isSubtract = values.c === "subtract";
      if (!isAdd && !isSubtract) {
        setError("Choose add or subtract.");
        setResult(null);
        return;
      }
      const delta = (a * b) / 100;
      const answer = isAdd ? a + delta : a - delta;
      const op = isAdd ? "+" : "-";
      setResult({
        value: formatResult(answer),
        summary: `${a} ${op} ${b}% = ${formatResult(answer)}`,
      });
    }

    setError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      calculate();
    }
  };

  const renderFields = () => {
    switch (mode) {
      case "of":
        return (
          <>
            <InputField
              id="pct-of"
              label="Percentage (%)"
              icon={Percent}
              value={values.a}
              onChange={updateValue("a")}
              placeholder="e.g. 25"
              onKeyDown={handleKeyDown}
            />
            <InputField
              id="val-of"
              label="Value"
              icon={Pencil}
              value={values.b}
              onChange={updateValue("b")}
              placeholder="e.g. 800"
              onKeyDown={handleKeyDown}
            />
          </>
        );
      case "what":
        return (
          <>
            <InputField
              id="part-what"
              label="Part Value"
              icon={Pencil}
              value={values.a}
              onChange={updateValue("a")}
              placeholder="e.g. 50"
              onKeyDown={handleKeyDown}
            />
            <InputField
              id="whole-what"
              label="Whole Value"
              icon={Calculator}
              value={values.b}
              onChange={updateValue("b")}
              placeholder="e.g. 200"
              onKeyDown={handleKeyDown}
            />
          </>
        );
      case "change":
        return (
          <>
            <InputField
              id="old-change"
              label="Old Value"
              icon={TrendingDown}
              value={values.a}
              onChange={updateValue("a")}
              placeholder="e.g. 100"
              onKeyDown={handleKeyDown}
            />
            <InputField
              id="new-change"
              label="New Value"
              icon={TrendingUp}
              value={values.b}
              onChange={updateValue("b")}
              placeholder="e.g. 150"
              onKeyDown={handleKeyDown}
            />
          </>
        );
      case "adjust":
        return (
          <>
            <InputField
              id="base-adjust"
              label="Value"
              icon={Pencil}
              value={values.a}
              onChange={updateValue("a")}
              placeholder="e.g. 500"
              onKeyDown={handleKeyDown}
            />
            <InputField
              id="pct-adjust"
              label="Percentage (%)"
              icon={Percent}
              value={values.b}
              onChange={updateValue("b")}
              placeholder="e.g. 10"
              onKeyDown={handleKeyDown}
            />
            <div>
              <p className="mb-2 block text-sm font-semibold text-[#44403c] md:text-base">
                Operation
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "add", label: "Add %", icon: TrendingUp },
                  { id: "subtract", label: "Subtract %", icon: TrendingDown },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setValues((prev) => ({ ...prev, c: id }));
                      setError("");
                    }}
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3.5 text-sm font-semibold transition",
                      values.c === id
                        ? "border-primary bg-primary/5 text-primary shadow-sm"
                        : "border-[#e8e2d9] bg-white text-[#57534e] hover:border-primary/30"
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      id="percentage-calculator-tool"
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
            Calculate The Percentage
          </h2>
          <p className="mt-1 text-sm text-[#78716c]">{activeMode?.description}</p>
        </div>
        <p className="rounded-full border border-[#e8e2d9] bg-white px-3 py-1.5 text-xs font-medium text-[#78716c]">
          Example: {activeMode?.example}
        </p>
      </div>

      <div className="relative mb-6 flex flex-wrap gap-2">
        {MODES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => switchMode(item.id)}
            className={cn(
              "rounded-full border px-3.5 py-2 text-xs font-semibold transition sm:text-sm",
              mode === item.id
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
          mode === "adjust" ? "md:grid-cols-3" : "md:grid-cols-2"
        )}
      >
        {renderFields()}
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
            <p
              className={cn(
                "text-3xl font-extrabold tracking-tight md:text-4xl",
                result.positive === false
                  ? "text-red-600"
                  : result.positive === true
                    ? "text-emerald-600"
                    : "text-emerald-600"
              )}
            >
              {result.value}
            </p>
            <p className="text-sm text-[#78716c] md:text-base">{result.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PercentageCalculatorTool;
