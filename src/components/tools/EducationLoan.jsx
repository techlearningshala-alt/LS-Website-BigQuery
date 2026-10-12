"use client";

import React, { useMemo, useState } from "react";
import { Calculator, RotateCcw } from "lucide-react";
import Image from "next/image";

const LOAN_MIN = 10000;
const LOAN_MAX = 5000000;
const RATE_MIN = 1;
const RATE_MAX = 20;
const TENURE_MIN = 3;
const TENURE_MAX = 120;

function sanitizeNumericInput(value, { allowDecimal = false } = {}) {
  if (allowDecimal) {
    const cleaned = value.replace(/[^\d.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length <= 2) return cleaned;
    return `${parts[0]}.${parts.slice(1).join("")}`;
  }
  return value.replace(/[^\d]/g, "");
}

function parseNum(value) {
  const num = parseFloat(value);
  return Number.isFinite(num) ? num : null;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatINR(value) {
  const num = Math.round(Number(value) || 0);
  return `₹ ${num.toLocaleString("en-IN")}`;
}

function formatCompactINR(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

/**
 * EMI = P × R × (1 + R)^n ÷ [(1 + R)^n − 1]
 * P = principal, R = monthly rate, n = months
 */
function calculateEmi(principal, annualRate, months) {
  if (annualRate === 0) {
    const emi = principal / months;
    return {
      emi,
      interestAmount: 0,
      totalPayable: principal,
    };
  }

  const r = annualRate / 12 / 100;
  const factor = Math.pow(1 + r, months);
  const emi = (principal * r * factor) / (factor - 1);
  const totalPayable = emi * months;
  const interestAmount = totalPayable - principal;

  return { emi, interestAmount, totalPayable };
}

function SliderField({
  label,
  prefix,
  value,
  onChange,
  min,
  max,
  step = 1,
  minLabel,
  maxLabel,
  allowDecimal = false,
}) {
  const numeric = parseNum(value) ?? min;
  const percent = ((clamp(numeric, min, max) - min) / (max - min)) * 100;

  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-bold text-[#0f172a] md:text-[15px]">
        {label}
      </label>
      <div className="flex items-center overflow-hidden rounded-xl border border-[#dbe3ee] bg-white focus-within:border-[#e62a38] focus-within:ring-4 focus-within:ring-[#e62a38]/10">
        {prefix ? (
          <span className="border-r border-[#e8eef5] bg-[#f8fafc] px-4 py-3.5 text-sm font-bold text-[#64748b]">
            {prefix}
          </span>
        ) : null}
        <input
          type="text"
          inputMode={allowDecimal ? "decimal" : "numeric"}
          value={value}
          onChange={(e) =>
            onChange(sanitizeNumericInput(e.target.value, { allowDecimal }))
          }
          className="w-full bg-transparent px-4 py-3.5 text-[15px] font-semibold text-[#0f172a] outline-none"
        />
      </div>
      <div className="mt-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={clamp(numeric, min, max)}
          onChange={(e) => onChange(e.target.value)}
          className="emi-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-[#f1f5f9] accent-[#e62a38]"
          style={{
            background: `linear-gradient(to right, #e62a38 0%, #e62a38 ${percent}%, #e2e8f0 ${percent}%, #e2e8f0 100%)`,
          }}
        />
        <div className="mt-1.5 flex items-center justify-between text-xs font-semibold text-[#94a3b8]">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      </div>
    </div>
  );
}

const EducationLoan = () => {
  const [loanAmount, setLoanAmount] = useState("100000");
  const [interestRate, setInterestRate] = useState("5");
  const [tenure, setTenure] = useState("12");
  const [processingFee, setProcessingFee] = useState("0");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const defaults = useMemo(
    () => ({
      loanAmount: "100000",
      interestRate: "5",
      tenure: "12",
      processingFee: "0",
    }),
    []
  );

  const calculate = () => {
    const principal = parseNum(loanAmount);
    const rate = parseNum(interestRate);
    const months = parseNum(tenure);
    const fee = parseNum(processingFee) || 0;

    if (principal === null || rate === null || months === null) {
      setError("Please enter valid loan details.");
      setResult(null);
      return;
    }

    if (principal < LOAN_MIN || principal > LOAN_MAX) {
      setError(`Loan amount should be between ${formatCompactINR(LOAN_MIN)} and ${formatCompactINR(LOAN_MAX)}.`);
      setResult(null);
      return;
    }

    if (rate < RATE_MIN || rate > RATE_MAX) {
      setError(`Interest rate should be between ${RATE_MIN}% and ${RATE_MAX}%.`);
      setResult(null);
      return;
    }

    if (months < TENURE_MIN || months > TENURE_MAX) {
      setError(`Tenure should be between ${TENURE_MIN} and ${TENURE_MAX} months.`);
      setResult(null);
      return;
    }

    if (fee < 0) {
      setError("Processing fee cannot be negative.");
      setResult(null);
      return;
    }

    const { emi, interestAmount, totalPayable } = calculateEmi(
      principal,
      rate,
      Math.round(months)
    );

    setResult({
      loanAmount: principal,
      interestRate: rate,
      tenure: Math.round(months),
      processingFee: fee,
      emi: Math.round(emi),
      interestAmount: Math.round(interestAmount),
      totalPayable: Math.round(totalPayable + fee),
    });
    setError("");
  };

  const reset = () => {
    setLoanAmount(defaults.loanAmount);
    setInterestRate(defaults.interestRate);
    setTenure(defaults.tenure);
    setProcessingFee(defaults.processingFee);
    setError("");
    setResult(null);
  };

  const display = result || {
    loanAmount: parseNum(loanAmount) || 0,
    interestRate: parseNum(interestRate) || 0,
    tenure: parseNum(tenure) || 0,
    emi: null,
    interestAmount: null,
    totalPayable: null,
  };

  return (
    <div
      id="education-loan-emi-calculator"
      className="mb-8 overflow-hidden rounded-[28px] border border-[#e8eef5] bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-7 md:p-8"
    >
      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Left — inputs */}
        <div>
          <SliderField
            label="Loan Amount"
            prefix="₹"
            value={loanAmount}
            onChange={(v) => {
              setLoanAmount(v);
              setError("");
            }}
            min={LOAN_MIN}
            max={LOAN_MAX}
            step={1000}
            minLabel={formatCompactINR(LOAN_MIN)}
            maxLabel={formatCompactINR(LOAN_MAX)}
          />

          <SliderField
            label="Interest Rate"
            prefix="%"
            value={interestRate}
            onChange={(v) => {
              setInterestRate(v);
              setError("");
            }}
            min={RATE_MIN}
            max={RATE_MAX}
            step={0.1}
            minLabel={`${RATE_MIN}%`}
            maxLabel={`${RATE_MAX}%`}
            allowDecimal
          />

          <SliderField
            label="Loan Tenure (In months)"
            value={tenure}
            onChange={(v) => {
              setTenure(v);
              setError("");
            }}
            min={TENURE_MIN}
            max={TENURE_MAX}
            step={1}
            minLabel={`${TENURE_MIN} Months`}
            maxLabel={`${TENURE_MAX} Months`}
          />

          <div className="mb-6">
            <label className="mb-2 block text-sm font-bold text-[#0f172a] md:text-[15px]">
              Processing Fee (Optional)
            </label>
            <div className="flex items-center overflow-hidden rounded-xl border border-[#dbe3ee] bg-white focus-within:border-[#e62a38] focus-within:ring-4 focus-within:ring-[#e62a38]/10">
              <span className="border-r border-[#e8eef5] bg-[#f8fafc] px-4 py-3.5 text-sm font-bold text-[#64748b]">
                ₹
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={processingFee}
                onChange={(e) => {
                  setProcessingFee(sanitizeNumericInput(e.target.value));
                  setError("");
                }}
                className="w-full bg-transparent px-4 py-3.5 text-[15px] font-semibold text-[#0f172a] outline-none"
              />
            </div>
          </div>

          {error ? (
            <p className="mb-4 text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#cfe0ff] bg-white px-6 text-sm font-bold text-[#2563eb] transition hover:bg-[#eff6ff] active:scale-[0.98]"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Right — summary */}
        <div className="rounded-3xl border border-[#e8eef5] bg-[#f8fafc] p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-extrabold text-[#0f172a] md:text-xl">
                EMI Summary
              </h3>
              <p className="mt-1 text-sm text-[#64748b]">
                Review your monthly EMI and total repayment details.
              </p>
            </div>
            <div className="relative hidden h-16 w-16 shrink-0 sm:block">
              <Image
                src="/images/icons/check-mark.webp"
                alt=""
                width={64}
                height={64}
                className="object-contain opacity-80"
              />
            </div>
          </div>

          <div className="mb-6">
            <p className="text-3xl font-extrabold tracking-tight text-[#e62a38] md:text-4xl">
              {display.emi != null ? formatINR(display.emi) : "₹ —"}
            </p>
            <span className="mt-3 inline-flex rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-bold text-[#15803d]">
              Your Monthly EMI
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#e8eef5] bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#fee2e2] bg-[#fff1f2] px-4 py-3.5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-[#e62a38] text-white">
                <Calculator className="size-4" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-[#e62a38]">
                  Payment Summary
                </p>
                <p className="text-xs text-[#94a3b8]">
                  Complete repayment breakdown
                </p>
              </div>
            </div>

            <div className="divide-y divide-[#f1f5f9] px-4">
              {[
                {
                  label: "Loan Amount",
                  value: formatINR(display.loanAmount),
                },
                {
                  label: "Interest Rate",
                  value: `${display.interestRate}%`,
                },
                {
                  label: "Loan Tenure",
                  value: `${display.tenure} Months`,
                },
                {
                  label: "Interest Amount",
                  value:
                    display.interestAmount != null
                      ? formatINR(display.interestAmount)
                      : "₹ —",
                },
                {
                  label: "Monthly EMI",
                  value: display.emi != null ? formatINR(display.emi) : "₹ —",
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-3 py-3.5 text-sm"
                >
                  <span className="font-medium text-[#64748b]">{row.label}</span>
                  <span className="font-bold text-[#0f172a]">{row.value}</span>
                </div>
              ))}

              <div className="flex items-center justify-between gap-3 py-4">
                <span className="text-sm font-extrabold text-[#0f172a]">
                  Total Payable
                </span>
                <span className="text-lg font-extrabold text-[#e62a38] md:text-xl">
                  {display.totalPayable != null
                    ? formatINR(display.totalPayable)
                    : "₹ —"}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-[11px] text-[#94a3b8]">
            Formula: EMI = P × R × (1+R)ⁿ ÷ [(1+R)ⁿ − 1]
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationLoan;
