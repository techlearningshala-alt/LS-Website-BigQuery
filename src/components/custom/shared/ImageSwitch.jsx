"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const EXPERT_IMAGES = [
  "/images/homepage/experts/expert1.png",
  "/images/homepage/experts/expert2.png",
];

const FADE_INTERVAL_MS = 3500;

const ImageSwitch = ({ className = "", width, height }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % EXPERT_IMAGES.length);
    }, FADE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`h-20 w-20 shrink-0 overflow-hidden ${className}`}>
      {EXPERT_IMAGES.map((src, index) => {
        const isActive = index === activeIndex;
        return (
          <Image
            key={src}
            src={src}
            alt="Career counselor ready to help"
            width={width}
            height={height}
            className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100" : "pointer-events-none opacity-0"
            } ${className}`}
            priority={index === 0}
          />
        );
      })}
    </div>
  );
};

export default ImageSwitch;
