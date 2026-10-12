import Image from "next/image";
import React from "react";

const ReelCard = ({ item }) => {
  return (
  <>
    <Image
      src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${item?.thumbnail}`}
      className="rounded-lg"
      alt={item?.name}
      width={256}
      height={383}
      style={{ width: "100%", height: "auto" }}
    />
    <p className="text-sm font-bold text-center pt-2 mb-1">{item?.name}</p>
    <p className="text-[12px] text-center pb-2">{item?.video_title}</p>
    </>
  );
};

export default ReelCard;
