import React from "react";
import UniversityContentHeading from "../universitypage/UniversityContentHeading";
import { CreditCard, Landmark, WalletCards,IndianRupee } from "lucide-react";

const METHODS = [
  {
    key: "debit_card",
    title: "Debit Card",
    description: "Pay securely using your bank debit card (Visa, Mastercard, RuPay).",
    icon: WalletCards,
    iconClass: "text-blue-600",
    bgClass: "bg-blue-50",
  },
  {
    key: "credit_card",
    title: "Credit Card",
    description: "Use major credit cards. EMI available on selected cards.",
    icon: CreditCard,
    iconClass: "text-violet-600",
    bgClass: "bg-violet-50",
  },
  {
    key: "net_banking",
    title: "Net Banking",
    description: "Instant transfer via all major Indian bank net banking portals.",
    icon: Landmark,
    iconClass: "text-emerald-600",
    bgClass: "bg-emerald-50",
  },
  {
    key: "upi",
    title: "UPI",
    description: "",
    icon: IndianRupee,
    iconClass: "text-emerald-600",
    bgClass: "bg-emerald-50",
  },
];

const PaymentMethods = ({ id, title }) => {
  return (
    <div id={id} className="content_card">
      <UniversityContentHeading title={title} />

    

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 sm:gap-4">
        {METHODS.map(({ key, title: methodTitle, description, icon: Icon, iconClass, bgClass }) => (
          <div
            key={key}
            className="flex flex-col items-center rounded-2xl border border-[#ece7df] bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md"
          >
            <span
              className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${bgClass} ${iconClass}`}
            >
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <p className="text-[15px] font-bold text-[#1a1a1a]">{methodTitle}</p>
            {/* <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {description}
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
