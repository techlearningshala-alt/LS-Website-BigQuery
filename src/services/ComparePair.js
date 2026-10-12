const axios = require("axios");
const token = process.env.NEXT_PUBLIC_API_TOKEN;
const headers = {
   Authorization: `Bearer ${token}`,
};


export const getComparePairData = async () => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + "compares",{headers});
    return res;
  } catch (err) {
    console.error("❌ Compare pair API error:", err.message);
    return { data: { data: { data: [] } } };
  }
};
