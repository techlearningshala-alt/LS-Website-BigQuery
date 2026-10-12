"use client";

import React, { useMemo, useState } from "react";
import {
  Calculator,
  CalendarDays,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

function toDateInputValue(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDateInput(value) {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  const date = new Date(y, m - 1, d);
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return null;
  }
  return date;
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function calculateAge(dob, asOf) {
  let years = asOf.getFullYear() - dob.getFullYear();
  let months = asOf.getMonth() - dob.getMonth();
  let days = asOf.getDate() - dob.getDate();

  if (days < 0) {
    const prevMonth = new Date(asOf.getFullYear(), asOf.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  const totalDays = Math.floor((asOf - dob) / (1000 * 60 * 60 * 24));

  let nextBirthday = new Date(asOf.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBirthday <= asOf) {
    nextBirthday = new Date(
      asOf.getFullYear() + 1,
      dob.getMonth(),
      dob.getDate()
    );
  }
  const daysToBirthday = Math.floor(
    (nextBirthday - asOf) / (1000 * 60 * 60 * 24)
  );

  return { years, months, days, totalDays, daysToBirthday, nextBirthday };
}

function formatDisplayDate(date) {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const AgeTool = () => {
  const todayValue = useMemo(() => toDateInputValue(new Date()), []);
  const [dob, setDob] = useState("");
  const [asOfMode, setAsOfMode] = useState("today");
  const [customDate, setCustomDate] = useState(todayValue);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const asOfValue = asOfMode === "today" ? todayValue : customDate;

  const calculate = () => {
    const birthDate = parseDateInput(dob);
    const asOfDate = parseDateInput(asOfValue);

    if (!dob) {
      setError("Please enter your date of birth.");
      setResult(null);
      return;
    }

    if (!birthDate || !asOfDate) {
      setError("Please enter a valid date.");
      setResult(null);
      return;
    }

    const dobDay = startOfDay(birthDate);
    const asOfDay = startOfDay(asOfDate);

    if (dobDay > asOfDay) {
      setError("Date of birth cannot be after the selected date.");
      setResult(null);
      return;
    }

    const age = calculateAge(dobDay, asOfDay);
    setResult({
      ...age,
      dobLabel: formatDisplayDate(dobDay),
      asOfLabel: formatDisplayDate(asOfDay),
      nextBirthdayLabel: formatDisplayDate(age.nextBirthday),
    });
    setError("");
  };

  const reset = () => {
    setDob("");
    setAsOfMode("today");
    setCustomDate(todayValue);
    setResult(null);
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
      id="age-calculator-tool"
      className="mb-8 overflow-hidden rounded-[28px] border border-[#ece7e1] bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-7 md:p-8"
    >
      {/* Header */}
      <div className="mb-6 text-center md:mb-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#0f172a] md:text-3xl">
          Age <span className="text-[#e62a38]">Calculator</span>
        </h2>
        <p className="mt-2 text-sm text-[#78716c] md:text-base">
          Enter your Birth details to calculate your expected age.
        </p>
        <div className="mx-auto mt-5 h-px w-full max-w-xl bg-[#ece7e1]" />
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Left — inputs */}
        <div>
          <div className="mb-5">
            <label
              htmlFor="age-dob"
              className="mb-2 block text-sm font-bold text-[#0f172a] md:text-base"
            >
              Enter Date of Birth
            </label>
            <div className="relative">
              <input
                id="age-dob"
                type="date"
                max={todayValue}
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  setError("");
                  setResult(null);
                }}
                onKeyDown={handleKeyDown}
                className="w-full rounded-xl border border-[#d6d3d1] bg-white px-4 py-3.5 pr-12 text-[15px] text-[#0f172a] outline-none transition focus:border-[#e62a38] focus:ring-4 focus:ring-[#e62a38]/10"
              />
              <CalendarDays
                className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a8a29e]"
                aria-hidden
              />
            </div>
          </div>

          <div className="mb-5">
            <p className="mb-3 text-sm font-bold text-[#0f172a] md:text-base">
              Calculate Age On
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {[
                { id: "today", label: "As of Today" },
                { id: "custom", label: "Custom Date" },
              ].map((option) => {
                const selected = asOfMode === option.id;
                return (
                  <label
                    key={option.id}
                    className="inline-flex cursor-pointer items-center gap-2.5"
                  >
                    <span className="relative flex size-5 items-center justify-center">
                      <input
                        type="radio"
                        name="age-asof-mode"
                        value={option.id}
                        checked={selected}
                        onChange={() => {
                          setAsOfMode(option.id);
                          setError("");
                          setResult(null);
                        }}
                        className="peer sr-only"
                      />
                      <span
                        className={`flex size-5 items-center justify-center rounded-full border-2 transition ${
                          selected
                            ? "border-[#e62a38]"
                            : "border-[#d6d3d1] bg-white"
                        }`}
                      >
                        {selected ? (
                          <span className="size-2.5 rounded-full bg-[#e62a38]" />
                        ) : null}
                      </span>
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        selected ? "text-[#0f172a]" : "text-[#57534e]"
                      }`}
                    >
                      {option.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {asOfMode === "custom" ? (
            <div className="mb-5">
              <label
                htmlFor="age-custom"
                className="mb-2 block text-sm font-bold text-[#0f172a] md:text-base"
              >
                Calculate Age On Date
              </label>
              <div className="relative">
                <input
                  id="age-custom"
                  type="date"
                  value={customDate}
                  onChange={(e) => {
                    setCustomDate(e.target.value);
                    setError("");
                    setResult(null);
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-full rounded-xl border border-[#d6d3d1] bg-white px-4 py-3.5 pr-12 text-[15px] text-[#0f172a] outline-none transition focus:border-[#e62a38] focus:ring-4 focus:ring-[#e62a38]/10"
                />
                <CalendarDays
                  className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a8a29e]"
                  aria-hidden
                />
              </div>
            </div>
          ) : null}

          {error ? (
            <p className="mb-4 text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
            <button
              type="button"
              onClick={calculate}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#e62a38] px-6 text-sm font-bold text-white shadow-md shadow-[#e62a38]/20 transition hover:bg-[#d12331] active:scale-[0.98]"
            >
              <Calculator className="h-4 w-4" />
              Calculate
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#d6d3d1] bg-white px-6 text-sm font-bold text-[#0f172a] transition hover:border-[#e62a38]/40 hover:text-[#e62a38] active:scale-[0.98]"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Right — status / result */}
        <div className="flex min-h-[320px] flex-col items-center justify-center px-4 py-6 text-center sm:px-6">
          {result ? (
            <>
              <span className="mb-4 flex size-[72px] items-center justify-center rounded-full bg-[#ffe8ea] text-[#e62a38] shadow-[0_0_0_10px_rgba(230,42,56,0.05)]">
                <CheckCircle2 className="size-9" strokeWidth={2.25} />
              </span>
              <h3 className="text-xl font-extrabold text-[#0f172a]">
                Your Age Result
              </h3>
              <p className="mt-2 text-sm text-[#78716c]">
                Born {result.dobLabel} · As on {result.asOfLabel}
              </p>
              <p className="mt-5 text-2xl font-extrabold leading-snug text-[#e62a38] md:text-3xl">
                {result.years} Years, {result.months} Months, {result.days} Days
              </p>

              <div className="mt-6 grid w-full max-w-sm grid-cols-3 gap-2">
                {[
                  { label: "Years", value: result.years },
                  { label: "Months", value: result.months },
                  { label: "Days", value: result.days },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-[#ece7e1] bg-[#fcfbf9] px-2 py-3"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#a8a29e]">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xl font-extrabold text-[#0f172a]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-1.5 text-sm text-[#57534e]">
                <p>
                  Total days lived:{" "}
                  <span className="font-bold text-[#0f172a]">
                    {result.totalDays.toLocaleString("en-IN")}
                  </span>
                </p>
                <p>
                  Next birthday in{" "}
                  <span className="font-bold text-[#0f172a]">
                    {result.daysToBirthday} day
                    {result.daysToBirthday === 1 ? "" : "s"}
                  </span>
                </p>
              </div>
            </>
          ) : (
            <>
              <span className="mb-5 flex size-[72px] items-center justify-center rounded-full bg-[#ffe8ea] text-[#e62a38] shadow-[0_0_0_12px_rgba(230,42,56,0.05)]">
                <CheckCircle2 className="size-9" strokeWidth={2.25} />
              </span>
              <h3 className="text-xl font-extrabold text-[#0f172a] md:text-2xl">
                Ready to Calculate?
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#78716c] md:text-[15px]">
                Enter the required details above and click Calculate to get your
                result.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f5f5f4] px-4 py-2 text-sm font-medium text-[#78716c]">
                <span className="size-2.5 rounded-full bg-[#e62a38]" />
                Fill in the details to continue
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgeTool;
