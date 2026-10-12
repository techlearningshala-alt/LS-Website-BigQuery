"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import MainHeading from "../../shared/MainHeading";
import Image from "next/image";
import MediaCardSkeleton from "./MediaCardSkeleton";

const MediaSlider = ({ mediaData }) => {
  const loading = !mediaData || mediaData.length === 0;
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);
  // console.log("current :", current);
  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const reelsData = [
    {
      id: 1,
      title: "Shri Lakshmi",
      image: "/images/homepage/news/news1.png",
      desc: "Freshers, Forward March: Navigating In-Demand Skills in India’s Surging GCC Ecosystem",
    },
    {
      id: 2,
      title: "Maisha Khatoon",
      image: "/images/homepage/news/news2.png",
      desc: "Freshers, Forward March: Navigating In-Demand Skills in India’s Surging GCC Ecosystem",
    },
    {
      id: 3,
      title: "Shivanshu Sharma",
      image: "/images/homepage/news/news3.jpg",
      desc: "Freshers, Forward March: Navigating In-Demand Skills in India’s Surging GCC Ecosystem",
    },
    {
      id: 4,
      title: "Riya",
      image: "/images/homepage/news/news4.jpg",
      desc: "Freshers, Forward March: Navigating In-Demand Skills in India’s Surging GCC Ecosystem",
    },
    {
      id: 5,
      title: "Shri Lakshmi",
      image: "/images/homepage/news/news5.jpg",
      desc: "Freshers, Forward March: Navigating In-Demand Skills in India’s Surging GCC Ecosystem",
    },
    {
      id: 6,
      title: "Reel 6",
      image: "/images/homepage/news/news1.png",
      desc: "Freshers, Forward March: Navigating In-Demand Skills in India’s Surging GCC Ecosystem",
    },
    {
      id: 7,
      title: "Reel 7",
      image: "/images/homepage/news/news2.png",
      desc: "Freshers, Forward March: Navigating In-Demand Skills in India’s Surging GCC Ecosystem",
    },
    {
      id: 8,
      title: "Reel 8",
      image: "/images/homepage/news/news3.jpg",
      desc: "Freshers, Forward March: Navigating In-Demand Skills in India’s Surging GCC Ecosystem",
    },
  ];

  return (
    <div className="sec_mb hidden">
      <div className="container mx-auto mb-10 md:mb-20">
        <MainHeading
          title="See, Who’s Talking About Us !"
          className="text-center"
        />
        <Carousel
          setApi={setApi}
          className="mb-10 w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <CarouselItem
                    key={i}
                    className="basis-1/2 sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
                  >
                    <MediaCardSkeleton />
                  </CarouselItem>
                ))
              : mediaData?.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className={cn(
                      "basis-1/2 sm:basis-1/2 md:basis-1/3 xl:basis-1/4",
                      {}
                    )}
                  >
                    <Card
                      className={cn(
                        "h-full border-2 border-solid border-gray-200 p-1 shadow-none transition-transform duration-500"
                      )}
                    >
                      <CardContent className="relative px-6 py-4 flex flex-col justify-between h-full">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${item?.logo}`}
                          className="mb-4"
                          alt="testimonial"
                          width={100}
                          height={100}
                        />
                        <p className="text-sm font-bold">{item.title}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default MediaSlider;
