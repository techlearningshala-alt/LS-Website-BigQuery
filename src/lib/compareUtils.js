/**
 * Resolve course + optional specialization slugs from the current path.
 * Supports:
 * - /colleges-universities/[courseSlug]
 * - /colleges-universities/[courseSlug]/[specializationSlug]
 * Fallback: last non-empty segment (e.g. /courses/[courseSlug])
 */
export function parseComparePath(asPath) {
  const cleanPath = (asPath || "").split("?")[0];
  const segments = cleanPath.split("/").filter(Boolean);

  if (segments[0] === "colleges-universities") {
    if (segments.length >= 3) {
      return { courseSlug: segments[1], specializationSlug: segments[2] };
    }
    if (segments.length >= 2) {
      return { courseSlug: segments[1], specializationSlug: null };
    }
  }

  return {
    courseSlug: segments[segments.length - 1] || "",
    specializationSlug: null,
  };
}

/** Course or specialization layer used for fee/duration rows on compare. */
export function compareProgramLayer(u) {
  return u?.selectedSpecialization || u?.selectedCourse;
}

export function compareFees(u) {
  return compareProgramLayer(u)?.fees;
}

export function compareEmiPartners(u) {
  const spec = u?.selectedSpecialization;
  if (spec?.emi_partners?.length) return spec.emi_partners;
  return u?.emi_partners;
}
