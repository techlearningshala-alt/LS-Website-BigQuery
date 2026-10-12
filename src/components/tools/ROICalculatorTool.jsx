"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Calculator,
  Check,
  Loader2,
  TrendingUp,
} from "lucide-react";
import {
  getUniversityDetailData,
  getUniversityCourseDetailData,
} from "@/services/UniversitypageService";
import formatFee from "@/lib/formatFee";
import styles from "./roi-calculator-tool.module.css";

function parseAmount(value) {
  if (value == null || value === "") return 0;
  const num = Number(String(value).replace(/,/g, "").trim());
  return Number.isFinite(num) ? num : 0;
}

function parseTotalReturns(nirfData) {
  if (nirfData == null || nirfData === "") return 0;

  if (typeof nirfData === "number" || typeof nirfData === "string") {
    return parseAmount(nirfData);
  }

  const source = Array.isArray(nirfData)
    ? nirfData.find((item) => item && typeof item === "object") ?? nirfData[0]
    : nirfData;

  if (!source || typeof source !== "object") return 0;

  return parseAmount(
    source.total_returns ??
      source.total_return ??
      source.returns ??
      source.avg_salary ??
      source.average_salary ??
      source.salary ??
      source.package ??
      source.avg_package ??
      source.highest_package
  );
}

function formatCurrency(amount) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

function RoiRing({ percentage }) {
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(percentage, 0), 200);
  const visualPercent = Math.min(clamped, 100);
  const offset = circumference - (visualPercent / 100) * circumference;

  return (
    <div className={styles.roiRing}>
      <svg viewBox="0 0 148 148" aria-hidden>
        <circle
          cx="74"
          cy="74"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="10"
        />
        <circle
          cx="74"
          cy="74"
          r={radius}
          fill="none"
          stroke="white"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className={styles.roiRingValue }>
        <span className={styles.roiPercent}>
          {percentage >= 0 ? "+" : ""}
          {percentage.toFixed(1)}%
        </span>
        <span className={styles.roiPercentLabel}>ROI</span>
      </div>
    </div>
  );
}

export default function ROICalculatorTool({ universities = [] }) {
  const [universitySlug, setUniversitySlug] = useState("");
  const [courseSlug, setCourseSlug] = useState("");
  const [universityDetail, setUniversityDetail] = useState(null);
  const [courseDetail, setCourseDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(false);
  const [error, setError] = useState("");

  const universityList = universities
    .filter((uni) => uni?.university_slug && uni?.university_name)
    .filter((uni) => uni?.is_active !== false && uni?.is_page_created !== false)
    .sort((a, b) =>
      (a.university_name || "").localeCompare(b.university_name || "")
    );

  const courses = universityDetail?.course_data ?? [];
  const selectedCourse = courses.find((course) => course.slug === courseSlug);
  const selectedUniversity = universityList.find(
    (u) => u.university_slug === universitySlug
  );

  const costOfInvestment = parseAmount(courseDetail?.fee_type_values?.full_fee);
  const totalReturns = parseTotalReturns(
    courseDetail?.compare_information?.nirf_placement_data
  );

  const roiResult = useMemo(() => {
    if (!costOfInvestment || !totalReturns) return null;

    const netProfit = totalReturns - costOfInvestment;
    const roiPercentage = (netProfit / costOfInvestment) * 100;

    return { costOfInvestment, totalReturns, netProfit, roiPercentage };
  }, [costOfInvestment, totalReturns]);

  const step1Done = Boolean(universitySlug && universityDetail);
  const step2Done = Boolean(courseSlug && courseDetail && !courseLoading);
  // console.log(universityList, "universityList");

  useEffect(() => {
    if (!universitySlug) {
      setUniversityDetail(null);
      setCourseSlug("");
      setCourseDetail(null);
      setError("");
      return;
    }

    let cancelled = false;

    const fetchUniversityDetail = async () => {
      setLoading(true);
      setError("");
      setUniversityDetail(null);
      setCourseSlug("");
      setCourseDetail(null);

      try {
        const res = await getUniversityDetailData({ universitySlug });
        const detail = res?.data?.data?.data;
        if (cancelled) return;

        if (!detail) {
          setError("Unable to load university details. Please try again.");
          return;
        }
        setUniversityDetail(detail);
      } catch {
        if (!cancelled) {
          setError("Something went wrong while fetching university details.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchUniversityDetail();
    return () => {
      cancelled = true;
    };
  }, [universitySlug]);

  useEffect(() => {
    if (!universitySlug || !courseSlug) {
      setCourseDetail(null);
      return;
    }

    let cancelled = false;

    const fetchCourseDetail = async () => {
      setCourseLoading(true);
      setCourseDetail(null);

      try {
        const res = await getUniversityCourseDetailData({
          universitySlug,
          courseSlug,
        });
        if (cancelled) return;
        setCourseDetail(res?.data?.data ?? null);
      } catch {
        if (!cancelled) setError("Failed to load course details.");
      } finally {
        if (!cancelled) setCourseLoading(false);
      }
    };

    fetchCourseDetail();
    return () => {
      cancelled = true;
    };
  }, [universitySlug, courseSlug]);

  return (
    <div id="roi-calculator-tool" className={styles.wrapper}>
      <div className={styles.blob1} aria-hidden />
      <div className={styles.blob2} aria-hidden />

      <div className={styles.inner}>
        <div className={styles.layout}>
          {/* Left: inputs */}
          <div className={styles.formColumn}>
            <header className={styles.toolHeader}>
              <h2 className={styles.toolTitle}>Two steps to your answer</h2>
              <p className={styles.toolSubtitle}>
              Pick your online university, then your course. Data-based results without any guessing.
              </p>
            </header>

            <ol className={styles.stepList}>
              {/* Step 1 */}
              <li className={styles.stepItem}>
                <div className={styles.stepRow}>
                  <span
                    className={`${styles.stepNumber} ${
                      step1Done
                        ? styles.stepNumberDone
                        : universitySlug
                          ? styles.stepNumberActive
                          : styles.stepNumberPending
                    }`}
                  >
                    {step1Done ? <Check className="h-4 w-4" /> : "1"}
                  </span>
                  <div className={styles.stepContent}>
                    <p className={styles.stepLabel}>Choose your Online University

                    </p>
                    <p className={styles.stepHint}>
                      
                      Cover Universities, offering Online & Distance Programs.

                    </p>
                    <Select value={universitySlug} onValueChange={setUniversitySlug}>
                      <SelectTrigger className={styles.selectTrigger}>
                        <div className="flex items-center gap-2 min-w-0">
                          <Building2 className="h-4 w-4 shrink-0 text-white" />
                          <SelectValue placeholder="Select your university" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {universityList.filter(university => university.university_type_id !== 4 && university.is_active && university.university_type_id !== 2 && university.course_count !== 0).map((uni) => (
                          <SelectItem
                            key={uni.university_slug}
                            value={uni.university_slug}
                          >
                            {uni.university_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* {step1Done && (
                      <span className={styles.universityChip}>
                        <Building2 className="h-3.5 w-3.5" />
                        {universityDetail.university_name}
                      </span>
                    )} */}
                    {loading && (
                      <div className={styles.loadingRow}>
                        <Loader2 className="h-4 w-4 animate-spin text-red-600" />
                        Loading courses…
                      </div>
                    )}
                  </div>
                </div>
              </li>

              {/* Step 2 */}
              {universityDetail && !loading && (
                <li className={`${styles.stepItem} ${styles.fadeIn}`}>
                  <div className={styles.stepRow}>
                    <span
                      className={`${styles.stepNumber} ${
                        step2Done
                          ? styles.stepNumberDone
                          : courseSlug
                            ? styles.stepNumberActive
                            : styles.stepNumberPending
                      }`}
                    >
                      {step2Done ? <Check className="h-4 w-4" /> : "2"}
                    </span>
                    <div className={styles.stepContent}>
                      <p className={styles.stepLabel}>Choose Your course</p>
                      <p className={styles.stepHint}>
                        {courses.length} program
                        {courses.length !== 1 ? "s" : ""}  at this university. Select the one you're considering.

                      </p>
                      <Select value={courseSlug} onValueChange={setCourseSlug}>
                        <SelectTrigger className={styles.selectTrigger}>
                          <div className="flex items-center gap-2 min-w-0">
                            <BookOpen className="h-4 w-4 shrink-0 text-red-600" />
                            <SelectValue placeholder="Select your program" />
                          </div>
                        </SelectTrigger>
                        <SelectContent className="max-h-[280px]">
                          {courses.map((course) => (
                            <SelectItem key={course.slug} value={course.slug}>
                              {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {courseLoading && (
                        <div className={styles.loadingRow}>
                          <Loader2 className="h-4 w-4 animate-spin text-red-600" />
                          Fetching fee & placement data…
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              )}
            </ol>

            {error && <p className={styles.errorBox}>{error}</p>}

            {/* Inline preview cards on mobile / when data loads */}
            {courseDetail && !courseLoading && (
              <div className={`${styles.previewCards} ${styles.fadeIn}`}>
                <div className={styles.previewCard}>
                  <div className={styles.previewCardIcon}>
                    <Calculator className="h-4 w-4" />
                  </div>
                  <p className={styles.previewCardLabel}>Investment</p>
                  <p
                    className={`${styles.previewCardValue} ${costOfInvestment ? styles.previewCardValueAccent : ""}`}
                  >
                    {costOfInvestment > 0
                      ? formatFee(costOfInvestment)
                      : "—"}
                  </p>
                </div>
                <div className={styles.previewCard}>
                  <div className={styles.previewCardIcon}>
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <p className={styles.previewCardLabel}>Returns</p>
                  <p
                    className={`${styles.previewCardValue} ${totalReturns ? styles.previewCardValueAccent : ""}`}
                  >
                    {totalReturns > 0 ? formatCurrency(totalReturns) : "—"}
                  </p>
                </div>
              </div>
            )}

            {courseDetail && !roiResult && !courseLoading && (
              <p className={styles.warnBox}>
                ROI needs both full course fee and NIRF placement data for this
                course.
              </p>
            )}
          </div>

          {/* Right: results */}
          <div className={styles.resultsColumn}>
            {!roiResult ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <Calculator className="h-7 w-7" />
                </div>
                <p className={styles.emptyTitle}>YOUR ROI BREAKDOWN </p>
                <p className={styles.emptyText}>
                  {universitySlug
                    ? courseSlug
                      ? courseLoading
                        ? "Crunching numbers…"
                        : "Waiting for fee and placement data."
                      : "Based on NIRF Placement Records"
                    : "Start by choosing a university from the list."}
                </p>
                {universitySlug && !courseSlug && (
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-red-600">
                    <ArrowRight className="h-4 w-4" />
                    Pick a course on the left
                  </div>
                )}
              </div>
            ) : (
              <div className={`${styles.resultsPanel} ${styles.fadeIn}`}>
                <div className={styles.resultsInner}>
                  <p className={styles.resultsLabel}>YOUR ROI BREAKDOWN</p>
                

                  <div className={styles.roiHero}>
                    <RoiRing percentage={roiResult.roiPercentage} />
                    {/* <p className={styles.roiFormula}>
                      (Net profit ÷ Cost of investment) × 100
                    </p> */}
                  </div>

                  {(selectedCourse?.name || selectedUniversity?.university_name) && (
                    <p className="text-center text-sm  mb-4 -mt-2 line-clamp-2 font-bold">
                      {selectedCourse?.name}
                      {selectedUniversity?.university_name && (
                        <span>
                          {" "}
                          · {selectedUniversity.university_name}
                        </span>
                      )}
                    </p>
                  )}

                  <div className={styles.statGrid}>
                    <div className={styles.statPill}>
                      <span className={styles.statPillLabel}>Investment</span>
                      <span className={styles.statPillValue}>
                        {formatCurrency(roiResult.costOfInvestment)}
                      </span>
                    </div>
                    <div className={styles.statPill}>
                      <span className={styles.statPillLabel}>Returns</span>
                      <span className={styles.statPillValue}>
                        {formatCurrency(roiResult.totalReturns)}
                      </span>
                    </div>
                    <div
                      className={`${styles.statPill} ${styles.statPillFull}`}
                    >
                      <span className={styles.statPillLabel}>Net profit</span>
                      <span className={styles.statPillValue}>
                        {roiResult.netProfit >= 0 ? "+" : ""}
                        {formatCurrency(roiResult.netProfit)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
