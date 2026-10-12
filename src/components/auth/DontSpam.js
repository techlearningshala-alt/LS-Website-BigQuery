import React from "react";
import { Badge } from "../ui/badge";

const DontSpam = () => {
  return (
    <Badge
      variant="success"
      className="bg-green-300/50 text-green-800 border-0 absolute bottom-0 right-0 font-medium -mb-5 mr-4 rounded-t-none"
    >
      100% Safe
    </Badge>
  );
};

export default DontSpam;
