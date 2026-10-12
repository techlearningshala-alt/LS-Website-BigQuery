"use client";

import { useCookiesNext } from "cookies-next";
import { useEffect, useState } from "react";

export const useLeadAuth = () => {
    const { getCookie } = useCookiesNext();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verified = getCookie("lead_verified") === "true";
    setIsVerified(verified);
  }, [getCookie("lead_verified")]);

  return { isVerified };
};
