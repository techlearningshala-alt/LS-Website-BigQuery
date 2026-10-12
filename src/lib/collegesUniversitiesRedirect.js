export const SUGGEST_ME_NOT_DECIDED = "__not_decided_yet__";
const LEAD_FORM_NOT_DECIDED = "__ls_not_decided_yet__";

export function isUndecidedSpecialization(spec) {
  if (!spec) return true;
  const normalized = String(spec).toLowerCase();
  return (
    normalized === SUGGEST_ME_NOT_DECIDED ||
    normalized === LEAD_FORM_NOT_DECIDED
  );
}

export function buildCollegesUniversitiesUrl(courseSlug, specializationSlug) {
  if (!courseSlug) return null;
  const course = String(courseSlug).toLowerCase();
  const spec = specializationSlug
    ? String(specializationSlug).toLowerCase()
    : "";

  if (!isUndecidedSpecialization(spec)) {
    return `/colleges-universities/${course}/${spec}`;
  }
  return `/colleges-universities/${course}`;
}
