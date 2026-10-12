"use client";
import { createContext, useCallback, useContext, useState } from "react";

const LeadFormContext = createContext();

export const LeadFormProvider = ({ children, menuData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickSource, setClickSource] = useState(null);
  const [pageUrl, setPageUrl] = useState("");
  const [intent, setIntent] = useState(null); // ✅ STORE INTENT

  const showLeadForm = (from, intentData = null) => {
    if (typeof from === "object") from = null;
    const url = window.location.href; // ✅ get once
    setClickSource(from);
    setIntent(intentData); // ✅ save intent
    setPageUrl(url);
    setIsOpen(true);
  };

  const hideLeadForm = () => {
    setIsOpen(false);
  };

  const consumeIntent = () => {
    const temp = intent;
    setIntent(null); // ✅ run once only
    return temp;
  };

  const setLeadIntent = useCallback((intentData) => {
    setIntent(intentData);
  }, []);

  return (
    <LeadFormContext.Provider
      value={{
        isOpen,
        showLeadForm,
        hideLeadForm,
        clickSource,
        pageUrl,
        intent,
        setLeadIntent,
        consumeIntent,
        menuData,
      }}
    >
      {children}
    </LeadFormContext.Provider>
  );
};

export const useLeadForm = () => useContext(LeadFormContext);
