const axios = require("axios");
const token = process.env.NEXT_PUBLIC_API_TOKEN;
const headers = {
  Authorization: `Bearer ${token}`,
};

export const getUniversityData = async () => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "universities/list",
      { headers }
    );
    return res;
  } catch (err) {
    console.error("❌ University API error:", err.message);
    // throw new Error("Unable to fetch mentor data");
    // return []; // ✅ return fallback instead of throwing
  }
};

export const getUniversityDetailData = async ({ universitySlug }) => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "universities/" + universitySlug,
      { headers }
    );
    return res;
  } catch (err) {
    console.error("❌ University API error:", err.message);
    // throw new Error("Unable to fetch mentor data");
    // return []; // ✅ return fallback instead of throwing
  }
};

export const getUniversityCourseDetailData = async ({
  universitySlug,
  courseSlug,
}) => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        "university-courses/" +
        universitySlug +
        "/" +
        courseSlug,
      { headers }
    );
    return res;
  } catch (err) {
    console.error("❌ University Course Detail API error:", err.message);
    // throw new Error("Unable to fetch mentor data");
    // return []; // ✅ return fallback instead of throwing
  }
};

export const getUniversitySpecializationDetailData = async ({
  universitySlug,
  courseSlug,
  specializationSlug,
}) => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        "university-course-specializations/" +
        universitySlug +
        "/" +
        courseSlug +
        "/" +
        specializationSlug,
      { headers }
    );
    return res;
  } catch (err) {
    console.error(
      "❌ University Specialization Detail API error:",
      err.message
    );
    // throw new Error("Unable to fetch mentor data");
    // return []; // ✅ return fallback instead of throwing
  }
};
