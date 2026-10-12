"use client";
import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn, formatDate } from "@/lib/utils";
import MainHeading from "../custom/shared/MainHeading";
import VideoModal from "../custom/shared/modal/VideoModal";
import ReelCard from "../custom/homepage/reels/ReelCard";
import ReelCardSkeleton from "../custom/homepage/reels/ReelCardSkeleton";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { ArrowRight, Calendar, Calendar1, ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";

const RelatedNews = ({ newsDetailData }) => {
  const loading = !newsDetailData || newsDetailData.length === 0;
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

  const relatedNews = newsDetailData?.related_news?.filter(news => news?.is_active !== false && news?.is_active !== 0 && news?.is_page_created !== false);

 

  return (
    <div>
    
      <Carousel
        setApi={setApi}
        className="mb-10 w-full px-0"
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent className="mb-1 mx-1 mr-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <CarouselItem
                  key={i}
                  className="basis-1/1 sm:basis-1/2 md:basis-1/3"
                >
                  <ReelCardSkeleton />
                </CarouselItem>
              ))
            : relatedNews?.map((data, index) => (
                <CarouselItem
                  key={index}
                  className={cn(
                    "basis-1/1 sm:basis-1/2 md:basis-1/3",
                    {}
                  )}
                >
                 <Link key={index} href={`/news/${data?.slug}`}>
            <Card className="relative mx-auto w-full pt-0 overflow-hidden shadow-xl hover:shadow-lg group border border-transparent transition-all duration-300">
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${data?.thumbnail}`}
                alt="Event cover"
                width={400}
                height={200}
                className="relative z-20 w-full object-cover"
              />
              <CardHeader className="px-4">
                {/* <p className="flex items-center justify-between gap-3 mb-2">
                  <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none font-semibold">
                    {data?.category_title}
                  </Badge>

                
                  <span className="text-[12px] text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> {formatDate(data?.updated_at)}
                  </span>
                </p> */}

                <CardTitle className="text-[14px] font-bold md:text-[16px] line-clamp-2 group-hover:text-primary transition-all duration-200">{data?.h1_tag}</CardTitle>
                <CardDescription className="text-muted-foreground line-clamp-2">
                  {data?.short_description}
                </CardDescription>
              </CardHeader>
              <p className="text-primary font-semibold flex items-center gap-2 text-[14px] px-4">Continue Reading <ArrowRight size={16} /></p>
             
            </Card></Link>
                </CarouselItem>
              ))}
        </CarouselContent>
{relatedNews?.length > 1 && (
  <>
        <CarouselPrevious />
        <CarouselNext />
        </>
        )}
      </Carousel>
    </div>
  );
};

export default RelatedNews;
