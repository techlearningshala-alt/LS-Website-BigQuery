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
import ExpertCard from "./ExpertCard";
import PrimaryButton from "../../shared/PrimaryButton";
import ExpertCardSkeleton from "./ExpertCardSkeleton";
import Image from "next/image";


const ExpertSlider = ({mentorData}) => {
  const loading = !mentorData || mentorData.length === 0;
 
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


  return (
    <div className="sec_mb">
      <div className="container mx-auto">
        
        <MainHeading className="text-center" title={<>Mentors Who Guide You
 <span className="text-primary">  At Every Step!</span></>} />
        <Carousel setApi={setApi} className="mb-10 w-full" opts={{
          align: "start",
          loop: true,
        }}>
        

          <CarouselContent className="-ml-4">
  {loading
    ? Array.from({ length: 6 }).map((_, i) => (
        <CarouselItem
          key={i}
          className="basis-1/1 sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
        >
          <ExpertCardSkeleton />
        </CarouselItem>
      ))
    : mentorData?.map((item, index) => (
        <CarouselItem
          key={index}
          className="basis-1/1 sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
        >
          <Card className="h-full border-0 bg-transparent p-0 shadow-none">
            <CardContent className="p-0">
              <ExpertCard item={item} />
            </CardContent>
          </Card>
        </CarouselItem>
      ))}
</CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        {/* <div className="text-center"> <PrimaryButton className="max-w-max" title="Explore Mentors 
"  /></div> */}

      </div>
    </div>

  );
};

export default ExpertSlider;
