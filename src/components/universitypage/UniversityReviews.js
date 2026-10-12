import React from "react";
import UniversityContentHeading from "./UniversityContentHeading";
import { Star, ThumbsDown, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { Progress } from "../ui/progress";
import ReviewCard from "./review/ReviewCard";
import PrimaryButton from "../custom/shared/PrimaryButton";
import ContentModal from "../custom/shared/modal/ContentModal";
import GlobalContentModal from "../custom/shared/modal/GlobalContentModal";
import { useModal } from "@/context/ModalContext";

const UniversityReviews = ({
  id,
  title,
  universityData,
  allReviews,
  courseData,
  specializationData,
}) => {
  // const checkUniversityReviews =
  //   universityData?.sections?.Student_Ratings[0]?.name?.trim() !== "";
  // const checkCourseReviews =
  //   courseData?.sections_transformed.Student_Ratings[0]?.name?.trim() !== "";
  // const checkSpecializationReviews =
  //   specializationData?.sections_transformed.Student_Ratings[0]?.name?.trim() !== "";
  // const universityReviews = universityData?.sections?.Student_Ratings || [];
  // const courseReviews = courseData?.sections_transformed.Student_Ratings || [];
  // const specializationReviews =
  //   specializationData?.sections_transformed.Student_Ratings || [];

  // const allReviews = checkSpecializationReviews
  //   ? specializationReviews
  //   : checkCourseReviews
  //   ? courseReviews
  //   : checkUniversityReviews
  //   ? universityReviews
  //   : [];


 
  const { openModal } = useModal();
  
  return (
    <div id={id} className="content_card">
      <UniversityContentHeading title={title} />
     
      <div>
        {" "}
        <p>{/* <span className="font-bold text-md">Overall Rating</span> */}</p>
        <p className="mb-5">
        <span className="font-bold text-md">
            {(
              allReviews?.reduce(
                (acc, review) => acc + parseFloat(review?.value || 0),
                0
              ) / (allReviews?.length || 1)
            ).toFixed(1)}
            {" "} Overall Rating 
          </span>

        </p>
        <div className="flex items-center gap-2 mb-2 mt-5">
          <div className="w-[80px] flex items-center gap-2">
            {" "}
            <Star className="text-[#fec700] w-4 h-4" />
            <span className="flex gap-2 items-center no-wrap w-[50px]">
              5 Star{" "}
            </span>
          </div>

          <Progress
            value={
              allReviews?.length > 0
                ? (allReviews?.filter((review) => Number(review.value) === 5)
                    .length /
                    allReviews?.length) *
                  100
                : 0
            }
          />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-[80px] flex items-center gap-2">
            {" "}
            <Star className="text-[#fec700] w-4 h-4" />
            <span className="flex gap-2 items-center no-wrap w-[50px]">
              4 Star{" "}
            </span>
          </div>
          <Progress
            value={
              allReviews?.length > 0
                ? (allReviews?.filter((review) => Number(review.value) === 4)
                    .length /
                    allReviews?.length) *
                  100
                : 0
            }
          />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-[80px] flex items-center gap-2">
            {" "}
            <Star className="text-[#fec700] w-4 h-4" />
            <span className="flex gap-2 items-center no-wrap w-[50px]">
              3 Star{" "}
            </span>
          </div>
          <Progress
            value={
              allReviews?.length > 0
                ? (allReviews?.filter((review) => Number(review.value) === 3)
                    .length /
                    allReviews?.length) *
                  100
                : 0
            }
          />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-[80px] flex items-center gap-2">
            {" "}
            <Star className="text-[#fec700] w-4 h-4" />
            <span className="flex gap-2 items-center no-wrap w-[50px]">
              2 Star{" "}
            </span>
          </div>
          <Progress
            value={
              allReviews?.length > 0
                ? (allReviews?.filter((review) => Number(review.value) === 2)
                    .length /
                    allReviews?.length) *
                  100
                : 0
            }
          />
        </div>
        <div className="flex items-center gap-2 mb-10">
          <div className="w-[80px] flex items-center gap-2">
            {" "}
            <Star className="text-[#fec700] w-4 h-4" />
            <span className="flex gap-2 items-center no-wrap w-[50px]">
              1 Star{" "}
            </span>
          </div>
          <Progress
            value={
              allReviews?.length > 0
                ? (allReviews?.filter((review) => Number(review.value) === 1)
                    .length /
                    allReviews?.length) *
                  100
                : 0
            }
          />
        </div>
      </div>

      {allReviews?.slice(0, 3).map((data, index) => (
        <div key={index}>
          <ReviewCard
            name={data.name}
            value={data.value}
            content={data.reviewContent}
          />
          <hr className="my-5" />
        </div>
      ))}

      {allReviews?.length > 3 && (
        <div onClick={() => openModal("reviews")}>
          <PrimaryButton title="All Reviews" />
        </div>
      )}

      <GlobalContentModal
        id="reviews"
        title={universityData?.university_name}
        ContentClassName="sm:max-w-3xl"
        content={
          <>
              <Image
                className="object-contain mb-3 border rounded-md p-1"
                src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${universityData?.university_logo}`}
                width={100}
                height={40}
                alt={universityData?.university_name}
              />
              {/* <h3 className="font-bold">{universityData?.university_name}</h3> */}
              <div>
                {" "}
              
                <p className="mb-5">
                <span className="font-bold text-md">
            {(
              allReviews?.reduce(
                (acc, review) => acc + parseFloat(review?.value || 0),
                0
              ) / (allReviews?.length || 1)
            ).toFixed(1)}
    {" "} Overall Rating 
          </span>

                </p>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-[80px] flex items-center gap-2">
                    {" "}
                    <Star className="text-primary w-4 h-4" />
                    <span className="flex gap-2 items-center no-wrap w-[50px]">
                      5 Star{" "}
                    </span>
                  </div>
                  <Progress
                    value={
                      allReviews?.length > 0
                        ? (allReviews?.filter(
                            (review) => Number(review?.value) === 5
                          ).length /
                            allReviews?.length) *
                          100
                        : 0
                    }
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-[80px] flex items-center gap-2">
                    {" "}
                    <Star className="text-primary w-4 h-4" />
                    <span className="flex gap-2 items-center no-wrap w-[50px]">
                      4 Star{" "}
                    </span>
                  </div>
                  <Progress
                    value={
                      allReviews?.length > 0
                        ? (allReviews?.filter(
                            (review) => Number(review?.value) === 4
                          ).length /
                            allReviews?.length) *
                          100
                        : 0
                    }
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-[80px] flex items-center gap-2">
                    {" "}
                    <Star className="text-primary w-4 h-4" />
                    <span className="flex gap-2 items-center no-wrap w-[50px]">
                      3 Star{" "}
                    </span>
                  </div>
                  <Progress
                    value={
                      allReviews?.length > 0
                        ? (allReviews?.filter(
                            (review) => Number(review.value) === 3
                          ).length /
                            allReviews?.length) *
                          100
                        : 0
                    }
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-[80px] flex items-center gap-2">
                    {" "}
                    <Star className="text-primary w-4 h-4" />
                    <span className="flex gap-2 items-center no-wrap w-[50px]">
                      2 Star{" "}
                    </span>
                  </div>
                  <Progress
                    value={
                      allReviews?.length > 0
                        ? (allReviews?.filter(
                            (review) => Number(review.value) === 2
                          ).length /
                            allReviews?.length) *
                          100
                        : 0
                    }
                  />
                </div>
                <div className="flex items-center gap-2 mb-10">
                  <div className="w-[80px] flex items-center gap-2">
                    {" "}
                    <Star className="text-primary w-4 h-4" />
                    <span className="flex gap-2 items-center no-wrap w-[50px]">
                      1 Star{" "}
                    </span>
                  </div>
                  <Progress
                    value={
                      allReviews?.length > 0
                        ? (allReviews?.filter(
                            (review) => Number(review?.value) === 1
                          ).length /
                            allReviews?.length) *
                          100
                        : 0
                    }
                  />
                </div>
              </div>
              {allReviews?.map((data, index) => (
                <div key={index}>
                  <ReviewCard
                    name={data?.name}
                    value={data?.value}
                    content={data?.reviewContent}
                  />
                  <hr className="my-5" />
                </div>
              ))}
            </>
        }
      />
    </div>
  );
};

export default UniversityReviews;
