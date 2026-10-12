const axios = require("axios");
const token = process.env.NEXT_PUBLIC_API_TOKEN;
const headers = {
  Authorization: `Bearer ${token}`,
};


export const contactUs = (payload) => {
  return axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "contact-us", {
    ...payload,
  });
};

export const submitLead = (payload) => {
  return axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "website/leads", {
    ...payload,
  });
};

export const sendOtp = (payload) => {
  return axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "website/leads", {
    ...payload,
    step: "send_otp",
  });
};

export const interestedUniversity = (id, payload) => {
  return axios.put(
    process.env.NEXT_PUBLIC_BACKEND_URL + `website/leads/${id}/interested-university`,
    {
      ...payload,
    },
    {
      headers,
    }
  );
};

export const verifyOtp = (id, otp) => {
    return axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}website/leads/${id}/verify-otp`,
      {
        otp, // ✅ request body
      },
      {
        headers, // ✅ axios config
      }
    );
  };
  

 
  export const getStates = async () => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + "/states", {
        headers,
      });
      return res;
    } catch (err) {
      console.error("❌ States API error:", err.message);
      return [];
    }
  };


  export const getCities = async (stateId) => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + `/cities/states/${stateId}/cities`, {
        headers,
      });
      return res;
    } catch (err) {
      console.error("❌ Cities API error:", err.message);
      return [];
    }
  };