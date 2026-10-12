import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUniversityDetailData } from "@/services/UniversitypageService";
import Image from "next/image";
import formatFee from "@/lib/formatFee";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronRight,
  InfoIcon,
  Plus,
  X,
  ZoomIn,
} from "lucide-react";
import Link from "next/link";
import Info from "@/components/custom/shared/Info";
import ContentModal from "@/components/custom/shared/modal/ContentModal";
import CompareUniversityPickerModal from "@/components/compare/CompareUniversityPickerModal";
import { toast } from "sonner";
import CompareCTA from "@/components/compare/CompareCTA";
import CompareCTA1 from "@/components/compare/CompareCTA1";
import { getCoursesBySlug, getSpecializationBySlug } from "@/services/MenuService";

const MAX_COMPARE_SLOTS = 3;

export default function ComparePage() {
  const router = useRouter();
  const { ids, course, specialization } = router.query;

  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [specializationTitle, setSpecializationTitle] = useState("");

  // ✅ Helper to format slug
  const formatSlug = (slug) =>
    slug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  useEffect(() => {
    if (!course) return;

    const fetchCourseTitle = async () => {
      try {
        const res = await getCoursesBySlug(course);
        const courseData = res?.data?.data;
        setCourseTitle(courseData?.h1Tag || formatSlug(course));

        if (specialization) {
          const specRes = await getSpecializationBySlug({
            courseSlug: course,
            specializationSlug: specialization,
          });
          const specData = specRes?.data?.data;
          setSpecializationTitle(specData?.h1Tag || formatSlug(specialization));
        } else {
          setSpecializationTitle("");
        }
      } catch {
        setCourseTitle(formatSlug(course));
        setSpecializationTitle(specialization ? formatSlug(specialization) : "");
      }
    };

    fetchCourseTitle();
  }, [course, specialization]);

  useEffect(() => {
    if (!ids || !course) return;

    const fetchData = async () => {
      setLoading(true);

      const slugArray = ids.split(",");

      const results = await Promise.all(
        slugArray.map(async (slug) => {
          const res = await getUniversityDetailData({
            universitySlug: slug,
          });

          const university = res?.data?.data?.data;

          const allCourses = university?.course_data || [];

          // ✅ STEP 1: match course
          const matchedCourses = allCourses.filter(
            (c) => c.compare_page_slug?.toLowerCase() === course?.toLowerCase(),
          );

          let selectedCourse = null;

          // ✅ STEP 2: match specialization (if exists)
          if (specialization && matchedCourses.length > 0) {
            selectedCourse = matchedCourses.find(
              (c) =>
                c.specialization_slug?.toLowerCase() ===
                specialization?.toLowerCase(),
            );
          }

          // ✅ STEP 3: fallback to course only
          if (!selectedCourse && matchedCourses.length > 0) {
            selectedCourse = matchedCourses[0];
          }

          return {
            ...university,
            selectedCourse,
          };
        }),
      );

      setUniversities(results);
      setLoading(false);
    };

    fetchData();
  }, [ids, course, specialization]);

  const updateCompareIds = (nextSlugs) => {
    const uniqueSlugs = [...new Set(nextSlugs.filter(Boolean))];
    if (!uniqueSlugs.length) return;

    const query = {
      ids: uniqueSlugs.join(","),
      course,
    };
    if (specialization) query.specialization = specialization;

    router.replace({ pathname: "/compare", query }, undefined, {
      scroll: false,
    });
  };

  const removeUniversity = (slug) => {
    const currentSlugs = (typeof ids === "string" ? ids : "")
      .split(",")
      .filter(Boolean);

    if (currentSlugs.length <= 1) {
      toast.error("Keep at least one university to compare");
      return;
    }

    updateCompareIds(currentSlugs.filter((item) => item !== slug));
  };

  const addUniversity = (university) => {
    const slug = university?.university_slug;
    if (!slug) return;

    const currentSlugs = (typeof ids === "string" ? ids : "")
      .split(",")
      .filter(Boolean);

    if (currentSlugs.includes(slug)) return;
    if (currentSlugs.length >= MAX_COMPARE_SLOTS) {
      toast.error("You can compare up to 3 universities");
      return;
    }

    updateCompareIds([...currentSlugs, slug]);
  };

  if (!ids || !course) return null;

  const isEmptyValue = (value) =>
    value === null ||
    value === undefined ||
    value === "" ||
    value === "-" ||
    value === "—";

  const renderValue = (value, fallback = "—") => {
    if (isEmptyValue(value) || value === "N/A") {
      const label = isEmptyValue(value) ? fallback : value;
      return (
        <span
          className={`compare-value ${label === "N/A" ? "compare-value--na" : "compare-value--empty"}`}
        >
          {label}
        </span>
      );
    }
    return <span className="compare-value">{value}</span>;
  };

  const renderYesNo = (value, { emptyAsDash = false } = {}) => {
    const yes = value === 1 || value === true || value === "Yes";
    if (!yes && emptyAsDash) {
      return <span className="compare-value compare-value--empty">—</span>;
    }
    return (
      <span
        className={
          yes
            ? "compare-pill compare-pill--yes"
            : "compare-pill compare-pill--no"
        }
      >
        {yes ? "Yes" : "No"}
      </span>
    );
  };

  // ✅ Loader
  if (loading) {
    return (
      <div className="compare-page min-h-[60vh]">
        <div className="container py-12 md:py-16">
          <div className="mx-auto max-w-md text-center">
            <div className="compare-loader mx-auto mb-4" />
            <p className="text-sm font-semibold text-zinc-900">
              Building your comparison
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Fetching university details…
            </p>
          </div>
        </div>
      </div>
    );
  }

  const compare_card = "compare-section";
  const card_wrap = "compare-card-wrap";
  const card_style = "compare-row-label";
  const card_content = "compare-cell flex flex-col items-center justify-center";
  const card_content_center = "compare-cell-divider";
  const compare_row_grid = "compare-row-grid grid grid-cols-3";
  const pill_fee = "compare-pill compare-pill--fee";
  const pill_emi = "compare-pill compare-pill--emi";
  const pill_neutral = "compare-pill compare-pill--neutral";
  const pill_na = "compare-pill compare-pill--na";
  const badge_approval = "compare-badge-approval";
  const partner_logo = "compare-partner-logo";
  const link_syllabus = "compare-link-syllabus";
  const link_action = "compare-link-action";
  const link_cta = "compare-link-cta";
  const sticky_fee_pill = "compare-pill compare-pill--sticky-fee";
  const logo_frame = "compare-logo-frame";

  const sectionHeader = (title) => (
    <div className="compare-section-header">
      <h2>{title}</h2>
    </div>
  );
  // console.log(universities);
  // console.log(universities[0]?.selectedCourse);

  return (
    <div className="compare-page min-h-screen pb-4 md:pb-4">
      <div className="container py-4 md:py-4">
        <header className="compare-hero mb-2">
          <div className="flex gap-3 md:gap-5 items-center">
            <Link
              href={`/colleges-universities/${course}`}
              className="compare-back-btn"
              aria-label="Back to course"
            >
              <ArrowLeftIcon className="md:size-5 size-4" />
            </Link>
            <div className="min-w-0 flex-1">
              {/* <p className="compare-hero-eyebrow">University comparison</p> */}
              <h1 className="compare-hero-title">

                Compare Your Top University Choices for{" "}
                {!specialization &&  <span className="compare-hero-highlight text-primary">
                  {courseTitle || formatSlug(course)}
                </span>}
               
                
                {specialization && (
                  <span className="text-primary">
                    {" "}
                     {specializationTitle || formatSlug(specialization)}
                  </span>
                )}
              </h1>

              {/* <p className="compare-hero-subtitle">
              {universities.length} universities · side-by-side breakdown
            </p> */}
            </div>
          </div>
        </header>

        <div className="compare-sticky-bar sticky top-0 z-50 mb-6 md:mb-8">
          <div className="container">
            <div className="compare-sticky-bar-card">
              <div className="compare-sticky-layout">
                <div className="compare-sticky-label-col">
                  <span>Universities</span>
                </div>
                <div className="compare-sticky-grid grid grid-cols-3">
                  {Array.from({ length: MAX_COMPARE_SLOTS }).map((_, index) => {
                    const u = universities[index];

                    if (!u) {
                      return (
                        <div
                          key={`add-slot-${index}`}
                          className={`${card_content} ${index === 1 ? card_content_center : ""} compare-sticky-cell`}
                        >
                          <button
                            type="button"
                            onClick={() => setPickerOpen(true)}
                            className="flex min-h-[118px] w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-primary/35 bg-primary/5 px-2 py-3 text-primary transition hover:border-primary hover:bg-primary/10"
                          >
                            <span className="flex size-8 items-center justify-center rounded-full border border-primary/30 bg-white">
                              <Plus className="size-4" />
                            </span>
                            <span className="text-[11px] font-semibold md:text-xs">
                              Add university
                            </span>
                          </button>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={u.university_slug}
                        className={`${card_content} ${index === 1 ? card_content_center : ""} compare-sticky-cell relative`}
                      >
                        <button
                          type="button"
                          onClick={() => removeUniversity(u.university_slug)}
                          className="absolute right-1.5 top-[-10px] z-10 flex size-5 items-center justify-center rounded-full border border-[#e8e2d9] bg-white text-[#78716c] shadow-sm transition hover:border-primary/40 hover:text-primary"
                          aria-label={`Remove ${u.university_name}`}
                        >
                          <X className="size-2" />
                        </button>

                        <div className={`${logo_frame} mx-auto mb-3`}>
                          <Image
                            className="h-auto max-h-8 w-auto max-w-full object-contain"
                            src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${u.university_logo}`}
                            alt={u.university_name}
                            width={130}
                            height={40}
                          />
                        </div>

                        <p className="compare-uni-name mb-3 line-clamp-1">
                          {u.university_name}
                        </p>

                        <div className={sticky_fee_pill}>
                          <Link
                            className="inline-flex items-center gap-1"
                            href={`/university/${u.university_slug}`}
                          >
                            {u?.selectedCourse?.fees?.semester_fee ? (
                              <>
                                {formatFee(u.selectedCourse.fees.semester_fee)}
                                /sem
                                <ArrowRightIcon className="h-3.5 w-3.5 opacity-90" />
                              </>
                            ) : u?.selectedCourse?.fees?.full_fee ? (
                              <>
                                {formatFee(u.selectedCourse.fees.full_fee)}/full
                                <ArrowRightIcon className="h-3.5 w-3.5 opacity-90" />
                              </>
                            ) : (
                              "N/A"
                            )}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${compare_card} compare-section--program`}>
          {sectionHeader("Basic Program Details")}

          {/* Duration */}
          <div className={card_wrap}>
            <p className={card_style}>Course Duration</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {renderValue(u?.selectedCourse?.duration, "N/A")}
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <div className={card_wrap}>
            <p className={card_style}>Eligibility</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {renderValue(u?.selectedCourse?.eligibility)}
                </div>
              ))}
            </div>
          </div>

          {/* scholarship Available */}
          <div className={card_wrap}>
            <p className={card_style}>Scholarship Available</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.selectedCourse?.compare_information?.scholarship_provides
                    ? u?.selectedCourse?.compare_information
                        ?.scholarship_provides
                    : u?.scholarship_provides}
                </div>
              ))}
            </div>
          </div>

          {/* Syllabus */}
          <div className={card_wrap}>
            <p className={card_style}>Syllabus</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  <Link
                    href={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${u?.selectedCourse?.syllabus_file ? u?.selectedCourse?.syllabus_file : u?.selectedCourse?.brochure_file}`}
                    target="_blank"
                    className={link_syllabus}
                  >
                    View Syllabus{" "}
                    <ArrowRightIcon className="md:h-4 md:w-4 h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Credit Points */}
          <div className={card_wrap}>
            <p className={card_style}>Total Credit Points</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.selectedCourse?.credit_points
                    ? u?.selectedCourse?.credit_points
                    : "-"}
                </div>
              ))}
            </div>
          </div>

          {/* AI Based Curriculam */}
          <div className={card_wrap}>
            <p className={card_style}>AI Based Curriculam</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.selectedCourse?.compare_information?.ai_based_curriculam
                    ? u?.selectedCourse?.compare_information
                        ?.ai_based_curriculam
                    : "-"}
                </div>
              ))}
            </div>
          </div>

          {/* Add On Certification */}
          <div className={card_wrap}>
            <p className={card_style}>Add On Certification</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.selectedCourse?.compare_information?.add_on_certification
                    ? u?.selectedCourse?.compare_information
                        ?.add_on_certification
                    : "-"}
                </div>
              ))}
            </div>
          </div>

          {/* Technical Tools Training */}
          <div className={card_wrap}>
            <p className={card_style}>Technical Tools Training</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.selectedCourse?.compare_information
                    ?.technical_tools_training
                    ? u?.selectedCourse?.compare_information
                        ?.technical_tools_training
                    : "-"}
                </div>
              ))}
            </div>
          </div>

          {/* Admission */}
          <div className={card_wrap}>
            <p className={card_style}>Admission Mode</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.admission_mode ? u?.admission_mode : "—"}
                </div>
              ))}
            </div>
          </div>

          {/*  Start-up Support */}
          <div className={card_wrap}>
            <p className={card_style}>Start-up Support</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.compare_information?.startup_support
                    ? u?.compare_information?.startup_support
                    : "-"}
                </div>
              ))}
            </div>
          </div>

          {/* Blog Posts */}
          <div className={card_wrap}>
            <p className={card_style}>Blog Posts</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.selectedCourse?.compare_information?.blog_url ? (
                    <Link
                      href={`${u?.selectedCourse?.compare_information?.blog_url}`}
                      target="_blank"
                      className="flex items-center gap-1 bg-[#ecfdf5] text-[#047857] px-2 py-1 rounded-md font-semibold"
                    >
                      View Blog{" "}
                      <ArrowRightIcon className="md:h-4 md:w-4 h-3 w-3" />
                    </Link>
                  ) : (
                    "-"
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* NIRF Placement Data */}
          {/* <div className={card_wrap}>
          <p className={card_style}>
            NIRF Placement Data
          </p>
          <div className={compare_row_grid}>
            {universities.map((u,index) => (
              <div
                key={u.university_slug}
                className={`${card_content} ${index === 1 ? card_content_center : ""}`}
              >
                {u?.selectedCourse?.compare_information?.nirf_placement_data
                  ? u?.selectedCourse?.compare_information?.nirf_placement_data
                  : "-"}
              </div>
            ))}
          </div>
        </div> */}
        </div>

        <div className={`${compare_card} compare-section--approvals`}>
          {sectionHeader("Approvals & Rankings")}
          {/* Approvals */}
          <div className={card_wrap}>
            <p className={card_style}>Approvals</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  <div className="flex flex-wrap justify-center gap-2">
                    {u.approvals?.map((a) => (
                      <Badge
                        key={a.id}
                        className={`${badge_approval} line-clamp-1`}
                      >
                        {a.title}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/*  NAAC Grade */}
          <div className={card_wrap}>
            <p className={card_style}>NAAC Grade</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.compare_information?.naac_grade
                    ? u?.compare_information?.naac_grade
                    : "-"}
                </div>
              ))}
            </div>
          </div>

          {/* NAAC Score */}
          <div className={card_wrap}>
            <p className={card_style}>NAAC Score</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.compare_information?.naac_score
                    ? u?.compare_information?.naac_score
                    : "-"}
                </div>
              ))}
            </div>
          </div>

          {/*  NIRF Ranking */}
          <div className={card_wrap}>
            <p className={card_style}>NIRF Ranking</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.compare_information?.nirf_ranking
                    ? u?.compare_information?.nirf_ranking
                    : "-"}
                </div>
              ))}
            </div>
          </div>

          {/* WES Approval */}
          <div className={card_wrap}>
            <p className={card_style}>WES Approval</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.compare_information?.wes_approval
                    ? u?.compare_information?.wes_approval
                    : "-"}
                </div>
              ))}
            </div>
          </div>

          {/* Established Year */}
          <div className={card_wrap}>
            <p className={card_style}>Established Year</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.establishment_year ? u?.establishment_year : "-"}
                </div>
              ))}
            </div>
          </div>

          {/* University Location */}
          <div className={card_wrap}>
            <p className={card_style}>University Location</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.university_location ? u?.university_location : "-"}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${compare_card} compare-section--emi`}>
          {sectionHeader("EMI Options")}
          {/* EMI Facility */}
          <div className={card_wrap}>
            <p className={card_style}>EMI Facility</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u.sections?.University_Emi ? (
                    <div className="flex items-center gap-1.5 justify-center">
                      <span className="compare-pill compare-pill--yes">
                        Yes
                      </span>
                      <Info
                        trigger={
                          <span className="compare-info-trigger">
                            <InfoIcon size={14} />
                          </span>
                        }
                        content={
                          <>
                            <div
                              className="compare_info_content"
                              dangerouslySetInnerHTML={{
                                __html: u.sections?.University_Emi,
                              }}
                            />
                          </>
                        }
                        icon="false"
                      />
                    </div>
                  ) : (
                    <span className="compare-pill compare-pill--no">No</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* EMI Duration */}
          <div className={card_wrap}>
            <p className={card_style}>EMI Duration</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.selectedCourse?.emi_duration
                    ? u?.selectedCourse?.emi_duration + " Months"
                    : "-"}
                </div>
              ))}
            </div>
          </div>

          {/* EMI Amount */}
          <div className={card_wrap}>
            <p className={card_style}>EMI (Per Month)</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.selectedCourse?.fees?.emi_monthly ? (
                    <span className={pill_emi}>
                      {u.selectedCourse.fees.emi_monthly}
                    </span>
                  ) : (
                    <span className={pill_na}>-</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Full Fees */}
          <div className={card_wrap}>
            <p className={card_style}>Full Fees</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.selectedCourse?.fees?.full_fee ? (
                    <span className={pill_fee}>
                      {formatFee(u.selectedCourse.fees.full_fee)}
                    </span>
                  ) : (
                    <span className={pill_na}>N/A</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* EMI Partners */}
          <div className={card_wrap}>
            <p className={card_style}>EMI Partners</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  <div className="flex flex-wrap justify-center gap-2">
                    {u.emi_partners?.length
                      ? u.emi_partners.map((a) => (
                          <div key={a.id} className={partner_logo}>
                            <Image
                              src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${a.logo}`}
                              alt={a.name}
                              width={50}
                              height={20}
                            />
                          </div>
                        ))
                      : "-"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${compare_card} compare-section--learning`}>
          {sectionHeader("Learning Experience")}
          {/* Online Classes */}
          <div className={card_wrap}>
            <p className={card_style}>Online Classes</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {renderYesNo(u?.online_classes === 1, { emptyAsDash: true })}
                </div>
              ))}
            </div>
          </div>

          {/* LMS Portal */}
          <div className={card_wrap}>
            <p className={card_style}>LMS Portal</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.compare_information?.lms_portal
                    ? u?.compare_information?.lms_portal
                    : "-"}
                </div>
              ))}
            </div>
          </div>

          {/* examination_mode */}
          <div className={card_wrap}>
            <p className={card_style}>Examination Mode</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  <p className="flex items-center gap-1 justify-center">
                    {" "}
                    {u?.examination_mode ? u?.examination_mode : "—"}
                    {u?.examination_mode && (
                      <Info
                        trigger={
                          <span className="compare-info-trigger">
                            <InfoIcon size={14} />
                          </span>
                        }
                        content={<>AI-proctor / Tech-proctor</>}
                        icon="false"
                      />
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Evaluation */}
          <div className={card_wrap}>
            <p className={card_style}>Exam Evaluation</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.compare_information?.exam_evaluation
                    ? u?.compare_information?.exam_evaluation
                    : "-"}
                </div>
              ))}
            </div>
          </div>

          {/*  Webinar Provides */}
          <div className={card_wrap}>
            <p className={card_style}>Webinar Provides</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.compare_information?.webinar_provides
                    ? u?.compare_information?.webinar_provides
                    : "-"}
                </div>
              ))}
            </div>
          </div>

          {/* University Facilities */}
          <div className={card_wrap}>
            <p className={card_style}>University Facilities</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u.sections?.University_Faculties.length > 0 ? (
                    <div className="flex justify-center">
                      <ContentModal
                        asChild
                        triggerClassName="inline-flex w-auto"
                        ContentClassName="sm:max-w-5xl"
                        trigger={
                          <span className={`${link_action} cursor-pointer`}>
                            View All <ChevronRight className="h-4 w-4" />
                          </span>
                        }
                        content={
                          <>
                            <p className="font-bold mb-4 text-xl">
                              <span className="text-primary">
                                {u?.university_name}
                              </span>{" "}
                              Faculty Details
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {u.sections?.University_Faculties.map(
                                (item, index) => (
                                  <div
                                    key={index}
                                    className="group flex flex-col items-center rounded-xl border border-slate-200 bg-linear-to-b from-slate-50 to-white p-5 text-center shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md"
                                  >
                                    <div className="relative mb-4">
                                      <div className="absolute inset-0 scale-95 rounded-2xl bg-primary/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                                      <Image
                                        src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${item?.img}`}
                                        width={100}
                                        height={100}
                                        alt={item?.name || "Faculty Image"}
                                        className="relative z-10 mx-auto h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-md ring-2 ring-primary/20 transition-transform duration-300 group-hover:scale-105"
                                      />
                                    </div>
                                    <h4 className="mb-1 line-clamp-1 text-base font-bold text-slate-800">
                                      {item?.name}
                                    </h4>
                                    {item?.designation && (
                                      <p className="mb-3 line-clamp-1 text-sm font-medium text-slate-500">
                                        {item.designation}
                                      </p>
                                    )}
                                    {item?.faculty_qualification && (
                                      <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                        {item.faculty_qualification}
                                      </span>
                                    )}
                                    {item?.desc && (
                                      <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
                                        {item.desc}
                                      </p>
                                    )}
                                  </div>
                                ),
                              )}
                            </div>
                          </>
                        }
                      />
                    </div>
                  ) : (
                    "-"
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Industry Collabration */}
          <div className={card_wrap}>
            <p className={card_style}>Industry Collaboration</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.selectedCourse?.compare_information?.industry_collabration
                    ? u?.selectedCourse?.compare_information
                        ?.industry_collabration
                    : "-"}
                </div>
              ))}
            </div>
          </div>

          {/*  Industry Exposure */}
          <div className={card_wrap}>
            <p className={card_style}>Industry Exposure</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.compare_information?.industry_exposures
                    ? u?.compare_information?.industry_exposures
                    : "-"}
                </div>
              ))}
            </div>
          </div>

          {/* Campus Immersion */}
          <div className={card_wrap}>
            <p className={card_style}>Campus Immersion</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.compare_information?.campus_immersion
                    ? u?.compare_information?.campus_immersion
                    : "-"}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${compare_card} compare-section--career`}>
          {sectionHeader("Career & Placement Support")}
          {/* Sample Certificate */}
          <div className={card_wrap}>
            <p className={card_style}>Sample Certificate</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u.sections?.sampleImg ? (
                    <>
                      <ContentModal
                        triggerClassName="inline-flex w-auto"
                        ContentClassName={"sm:max-w-xl"}
                        trigger={
                          <span className="relative cursor-pointer group">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${u.sections.sampleImg}`}
                              alt={u.university_name}
                              width={100}
                              height={100}
                              className="mx-auto rounded-lg border border-[#e7e5e4] shadow-sm ring-1 ring-[#1c1917]/[0.04]"
                            />
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/90 p-1.5 shadow-md transition-all duration-300 group-hover:scale-110">
                              <ZoomIn className="h-5 w-5 text-[#1c1c1e] transition-all duration-300" />
                            </span>
                          </span>
                        }
                        content={
                          <>
                            <p className="text-center font-bold mb-4 text-md">
                              <span className="text-primary">
                                {u?.university_name}
                              </span>{" "}
                              Sample Certificate
                            </p>
                            <Image
                              src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${u.sections.sampleImg}`}
                              alt={u.university_name}
                              width={400}
                              height={400}
                              className="mx-auto rounded-md border border-slate-200"
                            />
                          </>
                        }
                      />
                    </>
                  ) : (
                    <span className="compare-value compare-value--soon">
                      Coming Soon
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/*  Placement Assistance */}
          <div className={card_wrap}>
            <p className={card_style}>Placement Assistance</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {renderYesNo(u?.placement_assistance === 1)}
                </div>
              ))}
            </div>
          </div>

          {/*  Job Portal Access */}
          <div className={card_wrap}>
            <p className={card_style}>Job Portal Access</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.compare_information?.job_portal_access
                    ? u?.compare_information?.job_portal_access
                    : "-"}
                </div>
              ))}
            </div>
          </div>

          {/*  Interview Preparation */}
          <div className={card_wrap}>
            <p className={card_style}>Interview Preparation</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.compare_information?.interview_preparation
                    ? u?.compare_information?.interview_preparation
                    : "-"}
                </div>
              ))}
            </div>
          </div>

          {/* Placement Partners */}
          <div className={card_wrap}>
            <p className={card_style}>Top Recruiters</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  <div className="flex flex-wrap justify-center gap-2">
                    {u.placement_partners?.slice(0, 8)?.map((a) => (
                      <div key={a.id} className={partner_logo}>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${a.logo}`}
                          alt={a.name}
                          width={50}
                          height={20}
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/*  Startup Support */}
          <div className={card_wrap}>
            <p className={card_style}>Startup Support</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.compare_information?.startup_support
                    ? u?.compare_information?.startup_support
                    : "-"}
                </div>
              ))}
            </div>
          </div>

          {/* Alumni Network */}
          <div className={card_wrap}>
            <p className={card_style}>Alumni Network</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {renderYesNo(u?.alumni_status, { emptyAsDash: true })}
                </div>
              ))}
            </div>
          </div>

          {/*  Famous Alumni */}
          <div className={card_wrap}>
            <p className={card_style}>Famous Alumni</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.compare_information?.famous_alumni
                    ? u?.compare_information?.famous_alumni
                    : "-"}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${compare_card} compare-section--summary`}>
          {sectionHeader("Summary")}
          {/* University Logo and Name */}
          {/* <div className={card_wrap}>
        <div className={compare_row_grid}>
          {universities.map((u,index) => (
            <div
              key={u.university_slug}
              className={`${card_content} ${index === 1 ? card_content_center : ""}`}
            >
              <div className={`${logo_frame} mx-auto mb-2`}>
                <Image
                  className="h-auto max-h-8 w-auto max-w-full object-contain"
                  src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${u.university_logo}`}
                  alt={u.university_name}
                  width={130}
                  height={40}
                />
              </div>

              <p className="compare-uni-name mb-3 line-clamp-2">
                {u.university_name}
              </p>
            </div>
          ))}
        </div>
      </div> */}

          {/* Fees */}
          {/* <div className={card_wrap}>
        <p className={card_style}>
          University
        </p>
        <div className={compare_row_grid}>
          {universities.map((u,index) => (
            <div
              key={u.university_slug}
              className={`${card_content} ${index === 1 ? card_content_center : ""}`}
            >
               <div className={`${logo_frame} mx-auto mb-2`}>
                <Image
                  className="h-auto max-h-8 w-auto max-w-full object-contain"
                  src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${u.university_logo}`}
                  alt={u.university_name}
                  width={130}
                  height={40}
                />
              </div>
              {u?.selectedCourse?.fees?.semester_fee ? (
                <span className={pill_fee}>
                  {formatFee(u.selectedCourse.fees.semester_fee)}/sem
                </span>
              ) : u?.selectedCourse?.fees?.full_fee ? (
                <span className={pill_fee}>
                  {formatFee(u.selectedCourse.fees.full_fee)}/full
                </span>
              ) : (
                <span className={pill_na}>N/A</span>
              )}
            </div>
          ))}
        </div>
      </div> */}

          {/* Duration */}
          {/* <div className={card_wrap}>
        <p className={card_style}>
          Course Duration
        </p>
        <div className={compare_row_grid}>
          {universities.map((u,index) => (
            <div
              key={u.university_slug}
              className={`${card_content} ${index === 1 ? card_content_center : ""}`}
            >
              <span className={pill_neutral}>
                {renderValue(u?.selectedCourse?.duration, "N/A")}
              </span>
            </div>
          ))}
        </div>
      </div> */}


             {/* Full Fees */}
             <div className={card_wrap}>
            <p className={card_style}>Full Fees</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.selectedCourse?.fees?.full_fee ? (
                    <span className={pill_fee}>
                      {formatFee(u.selectedCourse.fees.full_fee)}
                    </span>
                  ) : (
                    <span className={pill_na}>N/A</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* scholarship Available */}
          <div className={card_wrap}>
            <p className={card_style}>Scholarship Available</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.selectedCourse?.compare_information?.scholarship_provides
                    ? u?.selectedCourse?.compare_information
                        ?.scholarship_provides
                    : u?.scholarship_provides}
                </div>
              ))}
            </div>
          </div>

          {/* EMI Duration */}
          <div className={card_wrap}>
            <p className={card_style}>EMI Duration</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  <span className={pill_neutral}>
                    {u?.selectedCourse?.emi_duration
                      ? u.selectedCourse.emi_duration + " Months"
                      : "-"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* EMI (Per Month) */}
          <div className={card_wrap}>
            <p className={card_style}> EMI (Per Month)</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {u?.selectedCourse?.fees?.emi_monthly ? (
                    <span className={pill_emi}>
                      {u.selectedCourse.fees.emi_monthly}
                    </span>
                  ) : (
                    <span className={pill_na}>-</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI Based Curriculam */}

          {/* <div className={card_wrap}>
        <p className={card_style}>
          {" "}
          AI Based Curriculam
        </p>
        <div className={compare_row_grid}>
          {universities.map((u,index) => (
            <div
              key={u.university_slug}
              className={`${card_content} ${index === 1 ? card_content_center : ""}`}
            >
              {u?.selectedCourse?.compare_information?.ai_based_curriculam
                ? u?.selectedCourse?.compare_information?.ai_based_curriculam
                : "-"}
            </div>
          ))}
        </div>
      </div> */}

          {/* Placement Assistance */}
          <div className={card_wrap}>
            <p className={card_style}> Placement Assistance</p>
            <div className={compare_row_grid}>
              {universities.map((u, index) => (
                <div
                  key={u.university_slug}
                  className={`${card_content} ${index === 1 ? card_content_center : ""}`}
                >
                  {renderYesNo(u?.placement_assistance === 1)}
                </div>
              ))}
            </div>
          </div>

          {/* Roi Calculator */}
          {/* <div className={card_wrap}>
        <p className={card_style}>
          ROI Calculator
        </p>
        <div className={compare_row_grid}>
          {universities.map((u,index) => (
            <div
              key={u.university_slug}
              className={`${card_content} ${index === 1 ? card_content_center : ""}`}
            >
              <Link href="/tools/roi-calculator/" className={link_cta}>
                Calculate ROI <ArrowRightIcon className="hidden h-4 w-4 md:block" />
              </Link>
            </div>
          ))}
        </div>
      </div> */}
        </div>
      </div>

      <CompareUniversityPickerModal
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        compareList={universities}
        onSelectUniversity={addUniversity}
        courseSlug={typeof course === "string" ? course : ""}
        specializationSlug={
          typeof specialization === "string" ? specialization : null
        }
      />
      <CompareCTA />
      <CompareCTA1 />
    </div>
  );
}
