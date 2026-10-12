import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

const UniversitySlider = ({universitiesList}) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:50s]">
        {universitiesList.map((university) => (
         <div>
  <Image
                                src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${university?.university_logo}`}
                                alt={university?.university_name}
                                width={102}
                                height={34}
                                className="border border-gray-200 rounded-sm mx-auto p-2 bg-white"
                                quality={100}
                                style={{
                                  objectFit: "contain",
                                  // aspectRatio: "2/1",
                                }}
                              />
                             
         </div>
     
        ))}
      </Marquee>

    </div>
  );
};

export default UniversitySlider;
