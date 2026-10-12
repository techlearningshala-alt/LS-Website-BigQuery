import { IndianRupee } from "lucide-react";

const formatFee = (fee) => {
    const num = Number(fee);
    return isNaN(num) ? "Available" :<> <IndianRupee className="w-3 h-3" />{num.toLocaleString("en-IN")}</>;
  };

export default formatFee;