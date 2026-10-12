import Image from "next/image";
import React from "react";
import PrimaryButton from "../custom/shared/PrimaryButton";
import VideoModal from "../custom/shared/modal/VideoModal";
import { IndianRupee } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { useLeadForm } from "@/context/LeadFormContext";
import { useLeadGuard } from "../auth/useLeadGuard";
import { toast } from "sonner";
const CoursePageBannerImage = ({
  courseData,
  screenSize,
  specializationData,
  title,
}) => {
  const { openModal } = useModal();
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);
  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();


  const banners = specializationData?.banners?.length > 0
    ? specializationData?.banners
    : courseData?.banners;
  const duration =
    specializationData?.course_duration ?? courseData?.course_duration;
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
    <>
      {/* <div className="relative">
        {" "}
        <Image
          className="rounded-lg"
          src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${courseData?.banners[0]?.banner_image}`}
          width={400}
          height={400}
          alt="online mba"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <VideoModal title={"Watch Course Overview"} videoID={"123456"} />
        </div>
      </div> */}

      <Carousel
        setApi={setApi}
        className={`w-full px-0 ${banners?.length > 1 ? "md:px-4" : "px-0"}`}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {banners?.map((content, index) => (
            <CarouselItem key={index} className={("basis-1/1 relative", {})}>
              <Card className="py-0 gap-4 overflow-hidden relative" key={index}>
                {content?.name}
                <Image
                  className="rounded-lg"
                  src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${content?.banner_image}`}
                  width={400}
                  height={400}
                  alt={title}
                  layout="responsive"
                />
                {content.video_id && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <VideoModal
                      title={content.video_title}
                      videoID={content.video_id}
                    />
                  </div>
                )}
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {screenSize &&
          screenSize.width > 991 &&
          courseData?.banners?.length > 1 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
      </Carousel>

      {/* <p className="my-4 flex justify-between items-center">
        <span className="font-semibold">
          Learning Mode <u className="text-primary">(EMI Available)</u> :
        </span>
        <span className="font-extrabold text-green-600 text-xl flex items-center">
          {courseData?.learning_mode}
        </span>
      </p> */}
      {duration && (
        <p className="my-4 flex justify-between items-center">
          <span className="font-semibold">Course Duration :</span>
          <span className="font-bold text-green-600 text-md flex gap-1 items-center">
            {duration}
          </span>
        </p>
      )}
<div onClick={(e) => {
                      if (!withVerification()) {
                        e.preventDefault(); // ⛔ stop navigation
                        showLeadForm("apply to course from course page banner");
                        return;
                      }
                      toast.success("Applied to this course successfully");
                    }}><PrimaryButton title="Apply Now"  /></div>
      
    </>
  );
};

export default CoursePageBannerImage;
