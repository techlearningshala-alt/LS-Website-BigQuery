import { useLeadForm } from "@/context/LeadFormContext";
import { useLeadAuth } from "./useLeadAuth";

export const useLeadGuard = () => {
  const { showLeadForm } = useLeadForm();
  const { isVerified } = useLeadAuth();

  const withVerification = (source) => {
    if (!isVerified) {
      showLeadForm(source);
      return;
    }
    return true;
  };

  return { withVerification };
};
