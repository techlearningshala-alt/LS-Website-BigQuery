import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  const toggleCompare = (university) => {
    setCompareList((prev) => {
      const exists = prev.find((u) => u.university_slug === university.university_slug);
  
      if (exists) {
        return prev.filter((u) => u.university_slug !== university.university_slug);
      }
  
      if (prev.length >= 3) {
        toast.error("You can compare up to 3 universities");
        return prev;
      }
  
      return [...prev, university];
    });
  };
  const clearCompare = () => setCompareList([]);

  return (
    <CompareContext.Provider value={{ compareList, toggleCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);