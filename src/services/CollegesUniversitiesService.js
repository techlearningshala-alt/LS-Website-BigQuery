const axios = require("axios");
const token = process.env.NEXT_PUBLIC_API_TOKEN;
const headers = {
    Authorization: `Bearer ${token}`,
};

// universities/search-by-course?courseName=bcom

export const getCollegesUniversitiesData = async ({ courseSlug }) => {
    try {
        const res = await axios.get(
            process.env.NEXT_PUBLIC_BACKEND_URL + "universities/search-by-course?courseSlug=" + courseSlug,
            { headers }
        );
        return res;
    } catch (err) {
        console.error("❌ University API error:", err.message);
        // throw new Error("Unable to fetch mentor data");
        // return []; // ✅ return fallback instead of throwing
    }
};



export const getUniversitiesBySpecialization = async ({ courseSlug, specializationSlug }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}universities/search-by-specialization?courseSlug=${courseSlug}&specializationSlug=${specializationSlug}`,
        { headers }
      );
  
      return res;
    } catch (err) {
      console.error("❌ Specialization API error:", err.message);
      return null; // better fallback
    }
  };