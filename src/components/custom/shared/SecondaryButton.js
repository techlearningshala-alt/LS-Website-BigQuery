import { ChevronRight } from "lucide-react";

const SecondaryButton = (props) => {
  return (
    <span
      // asChild
      className={`px-2 sm:px-6 py-2 sm:py-4 bg-[#082038] w-full cursor-pointer text-nowrap text-[12px] sm:text-sm gap-1 sm:gap-2 text-white transition-colors duration-300 hover:bg-gray-950 rounded-md font-bold inline-flex items-center justify-center ${props.className}`}
    //   style={{ padding: "14px 16px" }}
    >
      {props.iconPos === "left" ? (
        <>
          {props.icon || <ChevronRight />} {props.title || "button"}
        </>
      ) : (
        <>
          {props.title || "button"} {props.icon || <ChevronRight className="min-w-6 min-h-6" />}{" "}
        </>
      )}
    </span>
  );
};

export default SecondaryButton;
