const axios = require("axios");

const token = process.env.NEXT_PUBLIC_API_TOKEN;
const headers = {
  Authorization: `Bearer ${token}`,
};

export const submitKycLead = (payload) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}kyc-forms`,
    payload,
    { headers }
  );
};
