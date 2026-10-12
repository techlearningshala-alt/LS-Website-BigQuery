import React, { useState } from "react";
import UniversityContentHeading from "./UniversityContentHeading";
import {
  Calculator,
  ChevronRight,
  Clock,
  Download,
  Eye,
  IndianRupee,
  List,
} from "lucide-react";
import Link from "next/link";
import PrimaryButton from "../custom/shared/PrimaryButton";
import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import MainHeading from "../custom/shared/MainHeading";
import SpanButton from "./SpanButton";
import formatFee from "@/lib/formatFee";
import { useLeadGuard } from "../auth/useLeadGuard";
import { useLeadForm } from "@/context/LeadFormContext";
import { useRouter } from "next/navigation";

const UniversityCourses = ({
  id,
  title,
  universityData,
  courseData,
  specializationListData,
  courseListData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { withVerification } = useLeadGuard();
  const { showLeadForm } = useLeadForm();

  const listData = courseListData ?? specializationListData;

  const emi_available =
    courseListData?.map((data) => data?.fees?.emi_monthly) ??
    specializationListData?.map((data) => data?.fees?.emi_monthly);
  // console.log(courseListData,"emi_available");


  return (
    <>
      <div id={id} className={`content_card ${listData?.length === 0 ? "hidden" : ""}`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <UniversityContentHeading className="!m-0" title={title} />
          <div
            onClick={() => {
              if (!withVerification()) {
                showLeadForm("roi calculator click", {
                  type: "redirect",
                  url: "/tools/roi-calculator",
                });
                return;
              }

              // already verified
              router.push("/tools/roi-calculator");
            }}
          >
            {" "}
            {/* <SpanButton
              title="ROI Calculator"
              icon={<Calculator className="w-4 h-4" />}
            /> */}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 mb-6">
          {listData?.slice(0, 4).map((data, index) => (
            <div key={index} className="col-span-12 md:col-span-6">
              {" "}
              <div className="border rounded-2xl p-4 relative">
                <div className="grid grid-cols-12">
                  {" "}
                  <div className="col-span-9">
                    <div>
                      {" "}
                      {data?.label && (
                        <span className="absolute left-0 top-0 bg-green-200 text-green-800 text-[12px] py-1 mt-3 ps-4 pe-3 rounded-e-xl">
                          {data?.label}
                        </span>
                      )}
                      <p className="font-bold mb-3 mt-8 text-lg">
                        {data?.name}
                      </p>
                      <p className="flex items-center mb-3 gap-2 whitespace-nowrap">
                        {" "}
                        <IndianRupee className="w-5 h-5 min-w-5 min-h-5 bg-yellow-200 p-1 rounded-full" />{" "}
                        {data?.fees?.semester_fee ? (
                          <span className="whitespace-nowrap flex items-center gap-1">
                            Semester Fees :{" "}
                            <span className="font-bold flex items-center">
                              {formatFee(data?.fees?.semester_fee)}
                            </span>
                          </span>
                        ) : (
                          <span className="whitespace-nowrap flex items-center gap-1">
                            Full Fees :{" "}
                            <span className="font-bold flex items-center">
                              {formatFee(data?.fees?.full_fee)}
                            </span>
                          </span>
                        )}
                      </p>
                      <p className="flex items-center mb-3 gap-2">
                        {" "}
                        <Clock className="w-5 h-5 min-w-5 min-h-5 bg-yellow-200 p-1 rounded-full" />{" "}
                        Duration :{" "}
                        <span className="font-bold">{data?.duration}</span>
                      </p>
                      {data?.specialization_count > 0 && (
                        <p className="flex items-center mb-3 gap-2">
                          {" "}
                          <List className="w-5 h-5 min-w-5 min-h-5 bg-yellow-200 p-1 rounded-full" />
                          Specializations :{" "}
                          <span className="font-bold">
                            {data?.specialization_count}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-3">
                    <Image
                      src={process.env.NEXT_PUBLIC_S3_BASE_URL + data?.image}
                      width={100}
                      height={100}
                      alt={data?.name}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <p className="flex justify-between items-center bg-gray-100 py-3 px-4 rounded-xl flex-wrap gap-2">
                    <span className="text-[12px] md:text-[14px] flex items-center text-nowrap">
                      EMI Facility :{" "}
                      <span className="font-bold flex items-center">
                        {emi_available[index] ? (
                          <>
                            <IndianRupee className="w-3 h-3" />
                            {emi_available[index]}/Month*
                          </>
                        ) : (
                          "Available"
                        )}

                        {/* {data?.fees?.emi_monthly ? (
                          <>
                            {data?.fees?.emi_monthly}/Month<sup>*</sup>
                          </>
                        ) : (
                          "Available"
                        )} */}
                      </span>
                    </span>

                    {data?.is_page_created ? <Link
                      href={
                        courseData?.specialization_data?.length > 0
                          ? `/university/${universityData?.university_slug}/${courseData?.slug}/${data?.slug}`
                          : `/university/${universityData?.university_slug}/${data?.slug}`
                      }
                      className="flex whitespace-nowrap items-center font-semibold bg-primary text-white rounded-sm px-3 py-1"
                    >
                      Get Info <ChevronRight className="w-4 h-4" />
                    </Link> : ""}

                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-8">
          <div onClick={() => setIsOpen(true)}>
            <PrimaryButton
              iconPos="left"
              icon={<Eye />}
              title={`View All ${listData?.length} Courses`}
            />
          </div>
        </div>
      </div>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="pt-4">
          <DrawerHeader>
            <MainHeading title="Popular Courses" className="!mb-0 !text-2xl" />
          </DrawerHeader>
          <ScrollArea className="h-[600px]">
            {" "}
            <div className="container">
              <div className="grid grid-cols-12 gap-6 my-6 pb-20">
                {listData?.map((data, index) => (
                  <div key={index} className="col-span-12 sm:col-span-6 lg:col-span-4">
                    {" "}
                    <div className="border rounded-2xl p-4 relative">
                      <div className="grid grid-cols-12">
                        {" "}
                        <div className="col-span-9">
                          <div>
                            {" "}
                            {data?.label && (
                              <span className="absolute left-0 top-0 bg-green-200 text-green-800 text-[12px] py-1 mt-3 ps-4 pe-3 rounded-e-xl">
                                {data?.label}
                              </span>
                            )}
                            <p className="font-bold mb-3 mt-8 text-lg">
                              {data?.name}
                            </p>
                            <p className="flex items-center mb-3 gap-2 whitespace-nowrap">
                              {" "}
                              <IndianRupee className="w-5 h-5 min-w-5 min-h-5 bg-yellow-200 p-1 rounded-full" />{" "}
                              {data?.fees?.semester_fee ? (
                                <span className="whitespace-nowrap flex items-center gap-1">
                                  Semester Fees :{" "}
                                  <span className="font-bold flex items-center">
                                    {formatFee(data?.fees?.semester_fee)}
                                  </span>
                                </span>
                              ) : (
                                <span className="whitespace-nowrap flex items-center gap-1">
                                  Full Fees :{" "}
                                  <span className="font-bold flex items-center">
                                    {formatFee(data?.fees?.full_fee)}
                                  </span>
                                </span>
                              )}
                            </p>
                            <p className="flex items-center mb-3 gap-2">
                              {" "}
                              <Clock className="w-5 h-5 min-w-5 min-h-5 bg-yellow-200 p-1 rounded-full" />{" "}
                              Duration :{" "}
                              <span className="font-bold">
                                {data?.duration}
                              </span>
                            </p>
                            {data?.specialization_count > 0 && (
                              <p className="flex items-center mb-3 gap-2">
                                {" "}
                                <List className="w-5 h-5 min-w-5 min-h-5 bg-yellow-200 p-1 rounded-full" />
                                Specializations :{" "}
                                <span className="font-bold">
                                  {data?.specialization_count}
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-span-3">
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_S3_BASE_URL + data?.image
                            }
                            width={100}
                            height={100}
                            alt="profile"
                            className="rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <p className="flex justify-between items-center bg-gray-100 py-3 px-4 rounded-xl">
                          <span className="text-[12px] md:text-[14px]">
                            EMI Facility :{" "}
                            <span className="font-bold">
                              {emi_available[index]
                                ? emi_available[index] + "/Month*"
                                : "Available"}
                            </span>
                          </span>
                          {data?.is_page_created ? <Link
                            href={
                              courseData?.specialization_data?.length > 0
                                ? `/university/${universityData?.university_slug}/${courseData?.slug}/${data?.slug}`
                                : `/university/${universityData?.university_slug}/${data?.slug}`
                            }
                            className="flex items-center font-semibold bg-primary text-white text-md rounded-sm px-3 py-1"
                          >
                            Get Info <ChevronRight className="w-4 h-4" />
                          </Link> : ""}

                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UniversityCourses;
