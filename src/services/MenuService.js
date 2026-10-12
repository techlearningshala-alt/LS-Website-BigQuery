const axios = require("axios");
const token = process.env.NEXT_PUBLIC_API_TOKEN;
const headers = {
  Authorization: `Bearer ${token}`,
};

export const getCoursesByDomain = async () => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "courses/by-domain",
      {
        headers,
      }
    );
    return res;
  } catch (err) {
    console.error("❌ Menu API error:", err.message);
    // throw new Error("Unable to fetch mentor data");
    return null;
  }
};



export const getCoursesBySlug = async (courseSlug) => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "courses/" + courseSlug,
      {
        headers,
      }
    );
    return res;
  } catch (err) {

      console.error("❌ Menuu API error:", {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
    
    
    })
    
    // throw new Error("Unable to fetch mentor data");
     return null; // return object, not array
  }
};

export const getSpecializationBySlug = async ({ courseSlug, specializationSlug }) => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "specializations/" + courseSlug + "/" + specializationSlug,
      {
        headers,
      }
    );
    return res;
  } catch (err) {
    console.error("❌ Specialization API error:", err.message);
    return { data: null }; // return object, not array
  }
};
