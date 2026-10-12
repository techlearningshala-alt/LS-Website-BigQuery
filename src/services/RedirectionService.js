const axios = require("axios");
const token = process.env.NEXT_PUBLIC_API_TOKEN;
const headers = {
  Authorization: `Bearer ${token}`,
};

export const getRedirectionData = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "redirections";
    const firstRes = await axios.get(baseUrl, { headers });

    const firstPayload = firstRes?.data?.data;
    const firstRows = firstPayload?.data || [];
    const totalPages = Number(firstPayload?.pages || 1);

    if (totalPages <= 1) {
      return firstRes;
    }

    const pageRequests = [];
    for (let page = 2; page <= totalPages; page += 1) {
      pageRequests.push(
        axios.get(baseUrl, {
          headers,
          params: { page },
        })
      );
    }

    const restResponses = await Promise.all(pageRequests);
    const mergedRows = [...firstRows];

    restResponses.forEach((res) => {
      const rows = res?.data?.data?.data || [];
      mergedRows.push(...rows);
    });

    return {
      ...firstRes,
      data: {
        ...firstRes.data,
        data: {
          ...firstPayload,
          data: mergedRows,
          page: 1,
          pages: totalPages,
          total: mergedRows.length,
        },
      },
    };
  } catch (err) {
    console.error("❌ Redirection API error:", err.message);
    // throw new Error("Unable to fetch mentor data");
    // return []; // ✅ return fallback instead of throwing
  }
};



