"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  SearchIcon,
} from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";
import SocialShare from "./SocialShare";
import { globalStore } from "@/lib/store";
import { useLeadAuth } from "@/components/auth/useLeadAuth";
import { useLeadForm } from "@/context/LeadFormContext";
import { Button } from "@/components/ui/button";
import { Hand, LogOut, MoreHorizontalIcon, MoreVerticalIcon } from "lucide-react";
import { deleteCookie, useCookiesNext } from "cookies-next";
import { useRouter } from "next/navigation";
import Search from "./search/Search";
import { Input } from "@/components/ui/input";

const MobileHeader = ({ universitiesListData, menuData }) => {
 
   if (!menuData) return null;
  const { email, phone, location } = globalStore;
  const [openMenus, setOpenMenus] = useState({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleMenu = (key, parentKey = "") => {
    setOpenMenus((prev) => {
      const currentOpenKey = prev[parentKey];
  
      return {
        ...prev,
        [parentKey]: currentOpenKey === key ? null : key,
      };
    });
  };
  
  const closeSheet = () => setIsSheetOpen(false);
  const menuItems = [
    {
      title: "Explore Menu",
      subItems: Object.entries(menuData?.data).map(([category, courses]) => ({
        title: category,
        subItems: courses.map((course) => ({
          title: course?.course_name,
          url: `/courses/${course?.course_slug}`,
        })),
      })),
    },

    {
      title: "Top Universities",
      subItems: [
        ...(universitiesListData?.map((university) => ({
          title: university?.university_name,
          url: `/university/${university?.university_slug}`,
        })) || []),
      ],
    },
    {
      title: <> Compare Top Universities <span className="bg-secondary text-white text-[12px] px-2 py-1 rounded-full text-nowrap">40+ Factors</span></>,
      url: "/compare-university",
    },
    {
      title: "Calculate Your ROI",
      url: "/tools/roi-calculator",
    },
    {
      title: "About",
      url: "/about",
    },
    {
      title: "Blogs",
      url: "/blog",
    },
    {
      title: "News",
      url: "/news",
    },
    {
      title: "Career Sathi Partner",
      url: "/career-sathi-channel-partner",
    },
    {
      title: "Contact Us",
      url: "/contact-us",
    },
   
  ];

  const renderMenu = (items, parentKey = "") => {
    return (
      <ul className="space-y-1">
        {items.map((item, index) => {
          const key = parentKey + index;
          const isOpen = openMenus[parentKey] === key;
  
          if (item.subItems) {
            return (
              <li key={key}>
                <button
                  className={`flex justify-between w-full items-center py-2 px-3 rounded transition
                    ${
                      isOpen
                        ? "text-primary font-bold"
                        : "hover:bg-gray-100 text-gray-800"
                    }`}
                  onClick={() => toggleMenu(key, parentKey)}
                >
                  <span>{item.title}</span>
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
  
                {isOpen && (
                  <div className="pl-2 bg-gray-100 text-sm py-3 rounded-2xl">
                    {renderMenu(item.subItems, key + "-")}
                  </div>
                )}
              </li>
            );
          }
  
          return (
            <li key={key}>
              <Link
                href={item.url}
                className="block py-2 px-3 rounded hover:bg-gray-100"
                onClick={closeSheet}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };
  const { getCookie, setCookie, deleteCookie } = useCookiesNext();
  const router = useRouter();
  const { isVerified } = useLeadAuth();
  const { showLeadForm } = useLeadForm();
  const leadName = getCookie("lead_name");
  const firstName = leadName?.trim()?.split(" ")[0] || "";

  return (
    <div>
      <div className="flex items-center justify-between px-2 py-2">
     <div className="flex items-center gap-1"> <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <button className="py-2 pr-2 rounded-md hover:bg-gray-100">
              <Menu />
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="p-0 max-w-xs">
            <SheetHeader className="p-4 bg-gray-100">
              <SheetTitle>
                <Logo />
                {isVerified ? (
                  <div className="mt-3 flex justify-between items-center">
                    <Button className="shadow-none border-0" variant="outline" style={{background: "linear-gradient(257deg,hsla(18,84%,90%,.3) -32.4%,rgba(255,165,129,.3) -3.42%,rgba(255,73,0,.3) 23.87%,rgba(251,223,233,.3) 50.46%,rgba(253,191,219,.3) 79.15%,rgba(249,57,166,.3) 103.64%)"}}>
                       <Hand className="text-primary" /> Hi {firstName} 
                      </Button>
                      <div
                      className="flex items-center justify-center text-[14px] underline"
                        onClick={() => {
                          deleteCookie("lead_name");
                          deleteCookie("lead_id");
                          deleteCookie("lead_verified");
                          router.refresh();
                        }}
                      >
                         Logout
                      </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => showLeadForm("signin from header")}
                  >
                    Sign In
                  </Button>
                )}
              </SheetTitle>
            </SheetHeader>

            <div className="overflow-y-auto h-[calc(100vh-64px)] px-4 pb-4">
              {renderMenu(menuItems)}
              <div className="flex gap-4 ps-2 mt-2">
                <Link
                  href={`tel:${phone.get()}`}
                  className="flex justify-center items-center flex-col"
                >
                  <Phone className="mb-1 text-primary w-10 h-10 border border-primary rounded-md p-2" />
                  <span className="text-[12px]">Toll Free</span>
                </Link>
                <Link
                  href={`mailto:${email.get()}`}
                  className="flex justify-center items-center flex-col"
                >
                  <Mail className="mb-1 text-primary w-10 h-10 border border-primary rounded-md p-2" />
                  <span className="text-[12px]">Email</span>
                </Link>
                <Link
                  href={location.get()}
              
                  className="flex justify-center items-center flex-col"
                >
                  <MapPin className="mb-1 text-primary w-10 h-10 border border-primary rounded-md p-2" />
                  <span className="text-[12px]">Visit Us</span>
                </Link>
              </div>
            </div>
            <div className="p-4">
              {" "}
              <p className="mb-3">On Social Media :</p>
              <SocialShare />
            </div>
          </SheetContent>
        </Sheet>
        <Logo /></div>

      {/* <div className="flex items-center gap-2">  <Search trigger={<span className="relative border border-gray-300 py-2 px-2 flex gap-1 w-full mb-0 lg:mb-4 overflow-hidden" style={{  borderRadius: "60px" }}>
                <SearchIcon className="h-4 w-4 " />
                <span className="min-w-[105px] inline-block text-[12px] font-bold">
                Search
  <span class="changing-text ps-1"></span>
</span>
              </span>} />
       
        </div> */}


<div
                  
                  className={`relative`}
                >
                  <Link href="/compare-in-two-mins" className="text-[12px] py-2 px-2 rounded-md inline-block bg-primary text-white font-semibold">
                   Compare Top Universities <span className="absolute top-[-8] left-2 bg-secondary text-white px-2 py-0 rounded-full text-[10px] ">40+ Factors</span>
                  </Link>
                </div>


      </div>
    </div>
  );
};

export default MobileHeader;
