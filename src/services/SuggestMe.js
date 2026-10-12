const axios = require("axios");
const token = process.env.NEXT_PUBLIC_API_TOKEN;
const headers = {
  Authorization: `Bearer ${token}`,
};


export const getQuestionsByDomainName = async (domain) => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        "domains/questions?name=" +
        encodeURIComponent(domain),
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
