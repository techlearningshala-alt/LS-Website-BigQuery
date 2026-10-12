"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleArrowRight } from "lucide-react";

const slugifyCategory = (value) =>
  (value || "").toString().toLowerCase().replace(/\s+/g, "-");

const CourseSection = ({ menuData, closeMegaMenu, screenSize, defaultCategory }) => {
  if (!menuData) return null;

  const categories = Object.keys(menuData?.data || {});
  if (categories.length === 0) return null;

  const categorySlugs = categories.map(slugifyCategory);
  const resolvedDefault =
    (defaultCategory && categorySlugs.includes(defaultCategory)
      ? defaultCategory
      : null) || slugifyCategory(categories[0]);

  const [categoryFromUrl, setCategoryFromUrl] = useState(null);
  const [selectedTab, setSelectedTab] = useState(resolvedDefault);

  useEffect(() => {
    // Read URL query only in the browser. With JS disabled, this effect won't run
    // and we will fall back to the first category.
    try {
      const sp = new URLSearchParams(window.location.search);
      setCategoryFromUrl(sp.get("category"));
    } catch {
      setCategoryFromUrl(null);
    }
  }, []);

  useEffect(() => {
    if (categoryFromUrl && categorySlugs.includes(categoryFromUrl)) {
      setSelectedTab(categoryFromUrl);
    } else if (defaultCategory && categorySlugs.includes(defaultCategory)) {
      setSelectedTab(defaultCategory);
    }
  }, [categoryFromUrl, defaultCategory]);

  return (
    <Tabs
      value={selectedTab}
      onValueChange={setSelectedTab}
      orientation="vertical"
      className="w-full flex flex-col lg:flex-row items-start gap-4 lg:gap-8"
    >
      <TabsList className="shrink-0 flex lg:grid lg:grid-cols-1 h-auto w-fit min-w-[250px] gap-2 bg-white max-w-full overflow-x-auto justify-start">
        {Object.entries(menuData?.data || {}).map(([category, courses]) => {
          const value = slugifyCategory(category); // e.g. "UG Courses" → "ug-courses"
          return (
            <TabsTrigger
              key={category}
              value={value}
              className="text-sm flex flex-col lg:text-md py-0 lg:py-8 bg-gray-100 cursor-pointer h-8 lg:h-12 data-[state=active]:bg-[#1b1d21] data-[state=active]:text-gray-100"
            >
              <h2 className="font-bold">{category}</h2>
              <p className="text-[11px] m-0 data-[state=active]:text-primary hidden lg:block">
                ({courses?.[0]?.course_domain_label || courses?.length})
              </p>
            </TabsTrigger>
          );
        })}
      </TabsList>

      <div className="flex-1 w-full">
        {Object.entries(menuData?.data || {}).map(([category, courses]) => {
          const value = slugifyCategory(category);

          return (
            <TabsContent key={category} value={value}>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-2 lg:gap-4">
                {courses?.map((course) => (
                  <Link
                    key={course.course_id}
                    href={`/courses/${course.course_slug}`}
                    onClick={() => closeMegaMenu?.() || null}
                    className="cursor-pointer block"
                  >
                    <Card className="flex-1 px-2 md:px-6 pt-9 md:pt-12 pb-2 relative bg-white s border-0 gap-0 mb-3 overflow-hidden h-full group shadow-lg ">
                     
                        {(course?.course_label ||
                          course?.specialization_count > 0) && (
                          <p className="text-[9px] md:text-[10px]  w-fit text-center py-1 px-3 rounded-e-2xl absolute top-0 start-0 mt-2 md:mt-3 line-clamp-1 text-green-600 bg-green-600/10 mb-0 flex items-center justify-center h-[20px] md:h-[25px] text-nowrap">
                            {course?.course_label ? (
                              <b>{course.course_label}</b>
                            ) : (
                              <b>
                                {course.specialization_count}+ Specializations
                              </b>
                            )}
                          </p>
                        )}

                        <Image
                          src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${course.course_thumbnail}`}
                          alt={course.course_name}
                          width={screenSize && screenSize.width > 768 ? 40 : 25}
                          height={screenSize && screenSize.width > 768 ? 40 : 25}
                          className={`mx-auto ${screenSize && screenSize.width > 991 ? "mb-2" : "mb-1"}`}
                        /> 
                    

                      <p className={`text-center font-bold text-[12px] md:text-[14px] mt-0 line-clamp-2 mb-4 ${screenSize && screenSize.width > 991 ? "leading-6" : "leading-4"}`}>
                        {course.course_name}
                      </p>



                      {(
                          course?.university_count > 0) ? (
                          <p className="text-[10px] md:text-[11px] font-bold py-1 px-2 line-clamp-1  mb-0 flex items-center justify-center text-nowrap bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 h-[25px] absolute bottom-0 left-0 w-full gap-1">
                           <b className="text-primary/80">
                           {screenSize && screenSize.width > 991 ? `Get ${course.university_count}+` : ""} Top University
                              </b>
                              <span><ArrowRight size={12} className="text-primary/30 group-hover:text-primary/100 transition-all duration-300"  /></span>
                          </p>

                        ) : (
                          <p className="text-[10px] md:text-[11px] font-bold py-1 px-2 line-clamp-1  mb-0 flex items-center justify-center text-nowrap bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 h-[25px] absolute bottom-0 left-0 w-full gap-1">
                           <b className="text-primary/80">
                                {screenSize && screenSize.width > 991 ? `Get 6+` : ""} Top University
                              </b>
                              <span><ArrowRight size={12} className="text-primary/30 group-hover:text-primary/100 transition-all duration-300"  /></span>
                          </p>
                        )}



                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          );
        })}
      </div>
    </Tabs>
  );
};

export default CourseSection;
