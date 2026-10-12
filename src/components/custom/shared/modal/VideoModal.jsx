import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

const VideoModal = ({ videoID, title, OuterText, forReel }) => {
  return (
    <Dialog>
      <DialogTrigger>
        {OuterText ? (
          OuterText
        ) : (
          <span
            className="relative flex cursor-pointer"
            aria-label="Play Video"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex justify-center items-center rounded-full bg-red-500 w-[50px] h-[50px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="#fff"
                className="bi bi-play-fill"
                viewBox="0 0 16 16"
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
              </svg>
            </span>
          </span>
        )}
      </DialogTrigger>
      <DialogContent className={`p-0 border-0 overflow-hidden ${forReel ? "md:min-w-[280px] md:max-w-[280px]" : "md:min-w-3xl md:max-w-3xl"}`}>
        <DialogHeader className="gap-0 truncate">
          <DialogTitle className="py-4 m-0 ps-3 truncate pe-[70px] text-sm">
            {title || "Watch Video"}
          </DialogTitle>
          <DialogDescription className="p-0">
           
            <iframe
              className="embed-responsive-item w-full h-[200px] sm:h-[430px] scale-[1.01]"
              // width={"100%"}
              // height={475}
              src={`https://www.youtube.com/embed/${videoID}`}
              title={title || "Watch Video"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
