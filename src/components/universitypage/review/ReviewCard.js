import Image from "next/image";
import React from "react";
import StarRating from "./StarRating";

const ReviewCard = (props) => {
  return (
    <>
      <div className="flex items-center gap-3 mb-4">
        {" "}
        <span className="w-15 h-15 rounded-full object-cover ring-2 ring-background flex items-center justify-center text-xl font-bold bg-gray-100">
        {props.name?.trim()?.toUpperCase()?.charAt(0)}
          </span>
        {/* <Image
          className="w-15 h-15 rounded-full object-cover ring-2 ring-background"
          src="/images/faculties/f1.png"
          width={70}
          height={70}
          alt="Avatar 01"
        /> */}
        <div>
          <p className="font-bold !mb-1">{props.name}</p>
          <p className="!m-0 flex gap-2">
            <StarRating value={props.value} />{" "}
            <span className="font-bold">{props.value}.0</span>
          </p>
        </div>
      </div>

      <p className="text-left">{props?.content || ""}</p>
    </>
  );
};

export default ReviewCard;
