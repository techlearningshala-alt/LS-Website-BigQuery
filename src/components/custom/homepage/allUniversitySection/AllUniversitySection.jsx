"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "../../shared/PrimaryButton";
import ContentDrawer from "../../shared/drawer/ContentDrawer";
import UniversityCardSkeleton from "./UniversityCardSkeleton";
import useWindowSize from "@/lib/use-window-size";

const AllUniversitySection = ({ universitiesList }) => {
  const screen = useWindowSize();
  // When JavaScript is disabled, `useWindowSize()` keeps `width` as `undefined`.
  // In that case we should not force mobile limits (showing only 6).
  const width = Number.isFinite(screen?.width) ? screen.width : 9999;
  const loading = !universitiesList || universitiesList.length === 0;

const universitiesListNew = universitiesList.filter(university => university.university_type_id !== 4 && university.is_active);

  
  return (
    <div className="mb-10 lg:mb-15">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-white/5 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.22)] md:p-10">
          <div
            className="absolute inset-0 bg-linear-to-br from-[#0f1419] via-[#1b1d21] to-[#1a1214]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(220,38,38,0.18),transparent_55%)]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(249,115,22,0.08),transparent_50%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#f97316]/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-primary to-transparent"
            aria-hidden
          />

          <div className="relative z-10 grid grid-cols-12 gap-2">
            <div className="col-span-12">
              <div className="text-center">
                {" "}
                <h2
                  className={`font-semibold text-xl md:text-4xl mb-5 md:mb-10 text-white`}
                >
                Choose from India&apos;s Leading Online Universities
                </h2>
           

                <p className="text-gray-300 mb-5 md:mb-10">
                Searching for a UGC-approved & NAAC-accredited online university? We will help you look deeper! <strong>Compare leading universities on 40+ real-world factors</strong> and select the right one for you.
                </p>
              </div>
            </div>
            <div className="col-span-12">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 mb-4 md:mb-10">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <div className="text-center px-2 relative group" key={i}>
                        <UniversityCardSkeleton />
                      </div>
                    ))
                  : universitiesListNew
                      .slice(
                        0,
                        width > 768 ? universitiesListNew.length : 6
                      )
                      .map((university, index) => (
                        <Card
                          className="text-center px-2 relative group hover:shadow-2xl transition-all duration-300 gap-2 py-2"
                          key={index}
                        >
                          <CardHeader className="px-1">
                            <CardTitle>
                              <Image
                                src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${university?.university_logo}`}
                                alt={university?.university_name}
                                width={100}
                                height={100}
                                className="mb-3 mx-auto"
                                style={{
                                  objectFit: "contain",
                                  aspectRatio: "2/1",
                                }}
                              />
                              <p className="text-gray-500 text-xs line-clamp-2 font-black mb-0">
                                {university?.university_name}
                              </p>
                              {university.course_count > 0 && (
                              <p className="mb-0 mt-2 text-xs font-bold text-black bg-primary/10 text-primary px-2 py-1 rounded-md w-fit mx-auto">{university.course_count + university.specialization_count} Courses</p>
                              )}

                            </CardTitle>
                          </CardHeader>
                          <Link
                            className="absolute inset-0"
                            href={`/university/${university?.university_slug}`}
                          ></Link>
                        </Card>
                      ))}
              </div>
              {width < 768 && (
                <ContentDrawer
                  trigger={<PrimaryButton title="Explore Universities" />}
                  title="All Top Ranked Universities"
                  description="Discover top ranked universities & their degree programs"
                  content={
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
                      {universitiesListNew.map((university, index) => (
                        <Card
                          className="text-center px-2 relative group 
                        hover:shadow-2xl transition-all duration-300 gap-2 py-2"
                          key={index}
                        >
                          <CardHeader className="px-1">
                            <CardTitle>
                              <Image
                                src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${university?.university_logo}`}
                                alt="university"
                                width={140}
                                height={60}
                                className="mb-3 mx-auto"
                                style={{
                                  objectFit: "contain",
                                  aspectRatio: "2/1",
                                }}
                              />
                              <p className="text-gray-500 text-xs line-clamp-2 font-black mb-0">
                                {university?.university_name}
                              </p>
                            </CardTitle>
                          </CardHeader>
                          <Link
                            className="absolute inset-0"
                            href={`/university/${university.university_slug}`}
                          ></Link>
                        </Card>
                      ))}
                    </div>
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUniversitySection;
