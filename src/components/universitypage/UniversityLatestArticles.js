import React from "react";
import UniversityContentHeading from "./UniversityContentHeading";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import SpanButton from "./SpanButton";

const UniversityLatestArticles = ({ id, title, props }) => {
  const { allArticles } = props;
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
    <div id={id} className="content_card">
      <div className="flex flex-wrap items-center gap-2 mb-4 justify-between"> <UniversityContentHeading className="!m-0" title={title} />
        <SpanButton title="View All Articles" icon={<ChevronRight className="w-4 h-4" />} /></div>

      <Carousel setApi={setApi} className="mb-10 w-full" opts={{
        align: "start",
        loop: true,
      }}>
        <CarouselContent className="-ml-4">
          {allArticles.map((data, index) => (
            <CarouselItem key={index} className={cn("basis-1/1 sm:basis-1/2", {})}>
              <Card className="pt-0 gap-4 overflow-hidden" key={index}>
                <div className="aspect-16/9 w-full">
                  <a
                    href={"/"}
                    target="_self"
                    className="transition-opacity duration-200 fade-in hover:opacity-70"
                  >
                    <Image
                      width={400}
                      height={200}
                      src={data?.img}
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </a>
                </div>
                <CardHeader>
                  <h3 className="text-lg font-semibold md:text-xl line-clamp-2">
                    <a href={"/"} target="_self">
                      {data.title}
                    </a>
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">{data.desc}</p>
                </CardContent>
                <CardFooter>
                  <a
                    href={"/"}
                    target="_self"
                    className="flex items-center text-foreground font-medium hover:underline"
                  >
                    Read more
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default UniversityLatestArticles;
