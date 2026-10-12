import React from "react";
import UniversityContentHeading from "./UniversityContentHeading";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  MoveRight,
} from "lucide-react";

const UniversityOtherPopularColleges = ({
  id,
  title,
  props,
  universitiesList,
  universityData,
}) => {
  const otherUniversitiesList = universitiesList.filter(
    (university) =>
      university?.university_slug !== universityData?.university_slug
  );
  // console.log(otherUniversitiesList, "otherUniversitiesList");

  return (
    <div id={id} className="content_card">
      <UniversityContentHeading title={title} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {otherUniversitiesList.map((university) => (
          <Card
            className="text-center px-2 relative group overflow-hidden gap-2 py-t pb-12 m-0 group"
            key={university?.university_slug}
          >
            <Link
              className="block"
              href={`/university/${university?.university_slug}`}
              
            >
              <CardTitle>

                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${university?.university_logo}`}
                  alt={university?.university_name || "University Logos"}
                  width={120}
                  height={100}
                  className="mb-2 mx-auto"
                  style={{ objectFit: "contain" }}
                />
                <p
                  className="text-gray-500 !text-xs line-clamp-2 font-black !mb-0"
                  style={{ lineHeight: "16px" }}
                >
                  {university?.university_name}
                </p>
              </CardTitle>
              <span className="bg-primary text-white text-[12px] font-medium p-1 absolute start-0 bottom-0 w-full flex justify-center items-center">
                Apply Now <ChevronRight className="w-5 h-5" />
              </span>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UniversityOtherPopularColleges;
