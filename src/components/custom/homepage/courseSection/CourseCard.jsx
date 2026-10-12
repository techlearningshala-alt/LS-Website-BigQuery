import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CourseCard = ({ course }) => {
  return (
    <Link href="/">
      <Card className="flex-1 relative bg-white py-0 gap-0 mb-3 overflow-hidden" style={{border:"1px solid#ccc"}}>
        <CardHeader className="pb-5 pt-8 m-0 gap-0 flex items-center justify-center relative">
          {/* <span className="absolute top-0 text-[12px] py-0.5 bg-[#fef4cc] w-full text-center text-[#947700] font-medium">{course?.tag}</span> */}
          <Image
            src={course?.image}
            alt="Online MBA"
            width={50}
            height={50}
           
          />
        </CardHeader>
        {/* <CardContent className="px-4 m-0">
          <p className=" font-bold mt-2 line-clamp-2 mb-3">{course?.title}</p>
         
        </CardContent> */}
        <CardFooter className="py-0 justify-between px-4">
          {/* <p className="text-sm font-bold text-primary text-center">
            View Program
          </p>
          <ArrowUpRight className="text-primary" /> */}
          {/* <p className=" font-bold mt-2 line-clamp-2 mb-3">{course?.title}</p> */}
        </CardFooter>
      </Card>
    <p className=" font-bold text-sm mt-2 line-clamp-2 mb-3 text-center">{course?.title}</p>
    </Link>
  );
};

export default CourseCard;
