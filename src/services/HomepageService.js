const axios = require("axios");
const token = process.env.NEXT_PUBLIC_API_TOKEN;
const headers = {
   Authorization: `Bearer ${token}`,
};


export const getMentorData = async () => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + "mentors",{headers});
    return res;
  } catch (err) {
    console.error("❌ Mentor API error:", err.message);
    // throw new Error("Unable to fetch mentor data");
    return []; // ✅ return fallback instead of throwing
  }
};

export const getMediaData = async () => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + "media-spotlight",{headers});
    return res;
  } catch (err) {
    console.error("❌ Media API error:", err.message);
    // throw new Error("Unable to fetch media data");
    return [];
    
  }
};

export const getTestimonialData = async () => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + "student-testimonials",{headers});
    return res;
  } catch (err) {
    console.error("❌ Testimonial API error:", err.message);
    // throw new Error("Unable to fetch testimonial data");
    return []; // ✅ return fallback instead of throwing
  }
};

export const getFaqData = async () => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + "faqs/questions",{headers});
    return res;
  } catch (err) {
    console.error("❌ Faq API error:", err.message);
    // throw new Error("Unable to fetch faq data");
    return []; 
  }
};