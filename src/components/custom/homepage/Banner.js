import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Search from "../shared/search/Search";
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Info from "../shared/Info";
import SecondaryButton from "../shared/SecondaryButton";
import { useLeadForm } from "@/context/LeadFormContext";
import { useLeadGuard } from "@/components/auth/useLeadGuard";
import { toast } from "sonner";
import PrimaryButton from "../shared/PrimaryButton";
import useWindowSize from "@/lib/use-window-size";

const Banner = () => {
  const screenSize = useWindowSize();

  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();
  const results = [
    {
      name: "Online MBA",
      img: "/images/test/course1.png",
      url: "/courses/online-mba",
    },
    {
      name: "Online BBA",
      img: "/images/test/course1.png",
      url: "/courses/online-bba",
    },
    {
      name: "Online Bcom",
      img: "/images/test/course1.png",
      url: "/courses/online-bcom",
    },
    {
      name: "Online MA",
      img: "/images/test/course5.png",
      url: "/courses/online-ma",
    },
    {
      name: "Online M.Com",
      img: "/images/test/course5.png",
      url: "/courses/online-mcom",
    },
    {
      name: "Online BCA",
      img: "/images/test/course1.png",
      url: "/courses/online-bca",
    },
    {
      name: "Online BBA",
      img: "/images/test/course1.png",
      url: "/courses/online-bba",
    }


  ]
  return (
    <div className={`${screenSize && screenSize.width < 768 ? "" : "sec_mb"}`}>
      <div className="container">
        <div className="grid grid-cols-12 gap-2 rounded-4xl">
          <div className="col-span-12 lg:col-span-5 hidden md:block">
            <div className="mx-auto flex flex-col py-1 lg:py-8">
              <h1 className="font-extrabold text-lg md:text-4xl mb-2 md:mb-8 text-[#082038]">
              India&apos;s First Data-backed Platform for Online Degrees!
              </h1>
            

            <div className="hidden md:block">  <Search trigger={<div className="relative w-full mb-2 lg:mb-4 overflow-hidden" style={{ boxShadow: "0 2px 12px 2px #e2e2e2", borderRadius: "60px" }}>
                <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 " />
                <Input
                  className="h-10 md:h-16 pl-12 md:pl-15 border-0 outline-0 bg-white placeholder:text-[12px] md:placeholder:text-[15px] placeholder:font-medium"
                  placeholder="Search by course, university, or career goal..."
                />
              </div>} /></div>


              {/* {screenSize && screenSize.width > 991 ? <p className="mb-4 md:mb-10 flex flex-wrap justify-between px-2">
                <span className="text-sm">Or browse by Courses or university</span>
                
                <span className="font-bold text-sm flex items-center gap-1 underline">
                  <span onClick={()=>document.getElementById("course-section").scrollIntoView({ behavior: "smooth" })}><Info trigger="Learn More" icon="true" content="Get expert guidance, admission support, and end-to-end assistance for a stress-free online degree journey."  /></span></span>
              </p> : null }
               */}

              <p className="font-bold mb-2 lg:mb-4 hidden lg:block">Trending Courses</p>
              <p className="flex-wrap gap-1 md:gap-3 mb-4 lg:mb-8 hidden lg:flex">

                {results.slice(0, screenSize && screenSize.width < 768 ? 2 : 6).map((data, index) => (
                  <Badge key={index} asChild className="bg-[#f9fafc] text-black border-gray-200 text-[10px] md:text-[12px] ps-1 pe-3 hover:bg-primary/10 hover:text-white" style={{ borderRadius: "15px" }}>
                    <Link href={`${data?.url}`}><Image alt={data.name} src={data?.img} width={22} height={22} className="rounded-full" /> {data.name}</Link>
                  </Badge>
                ))}
              </p>
              
              <div className="hidden lg:block" onClick={(e) => {
                      if (!withVerification()) {
                        e.preventDefault(); // ⛔ stop navigation
                        showLeadForm("apply to course from course page banner");
                        return;
                      }
                      toast.success("Applied to this course successfully");
                    }}><PrimaryButton title="Let’s Find You the Right Course!" /></div>
            </div>
          </div>
          
          <div className="col-span-12 lg:col-span-7 flex justify-end items-center lg:py-8 lg:ps-15">
        {/* <Image className="rounded-xl block md:hidden" src="/images/homepage/banner/mobile-ls.webp" layout="responsive" width={900} height={400} alt="banner" priority />
        <Image className="rounded-xl hidden md:block" src="/images/homepage/banner/ls-banner.webp" layout="responsive" width={400} height={200} alt="banner" priority /> */}

<video
  src="/video/learningshala-video.mp4"
  autoPlay
  loop
  muted
  playsInline
  preload="metadata"
  className="rounded-xl mb-4"
/>
           
          </div>
          
        </div>

      </div>
      
    </div>
  );
};

export default Banner;
