const axios = require("axios");
const token = process.env.NEXT_PUBLIC_API_TOKEN;
const headers = {
  Authorization: `Bearer ${token}`,
};

// export const getSearchData = async (keyword) => {
//   try {
//     const res = await axios.get(
//       process.env.NEXT_PUBLIC_BACKEND_URL + "search?q=" + keyword,
//       { headers }
//     );
//     return res;
//   } catch (err) {
//     console.error("❌ Search API error:", err.message);
//     // throw new Error("Unable to fetch mentor data");
//     return []; // ✅ return fallback instead of throwing
//   }
// };


export const getSearchData = async (keyword) => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "search?q=" + encodeURIComponent(keyword),
      { headers }
    );
    // ✅ Return only the data object your component expects
    return res;
  } catch (err) {
    console.error("Search API error:", err.message);
    return { universities: [], courses: [] }; // fallback
  }
};
