import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleQuestionMark } from "lucide-react";

const Info = (props) => {
  return (
    <Tooltip>
      <TooltipTrigger className="flex items-center gap-1">
        {props.trigger}
        {props.icon === "true" ? (
          <CircleQuestionMark className="w-4 h-4" />
        ) : null}
      </TooltipTrigger>
      <TooltipContent className="max-w-sm text-white">
        <p className="flex text-center">{props?.content || "info"}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default Info;
