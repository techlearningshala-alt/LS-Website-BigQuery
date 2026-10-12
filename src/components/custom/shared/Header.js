import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Logo from "./Logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import CourseSection from "../homepage/courseSection/CourseSection";
import { deleteCookie, useCookiesNext } from "cookies-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Hand, LogOut, MoreHorizontalIcon, MoreVerticalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLeadGuard } from "@/components/auth/useLeadGuard";
import { useLeadForm } from "@/context/LeadFormContext";
import { toast } from "sonner";
import { useLeadAuth } from "@/components/auth/useLeadAuth";

const Header = ({ menuData }) => {
  // if (!menuData) return null;
  const { getCookie, setCookie, deleteCookie } = useCookiesNext();
  const router = useRouter();
  const [openMenu, setOpenMenu] = React.useState(null);
  const { withVerification } = useLeadGuard();
  const { isVerified } = useLeadAuth();
  const { showLeadForm } = useLeadForm();

  const leadName = getCookie("lead_name");
  const firstName = leadName?.trim()?.split(" ")[0] || "";

  const closeMegaMenu = () => {
    setOpenMenu(null);
  };

  React.useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
  
    if (openMenu) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [openMenu]);
  

  return (
    <div>
      <header
        className="container flex items-center justify-between my-5"
        style={{ lineHeight: "35px" }}
      >
        <Logo />

        
        <NavigationMenu
          value={openMenu}
          onValueChange={setOpenMenu}
          viewport={false}
          className="z-50"
        >
          <NavigationMenuList>
            <div className="flex gap-1 justify-between w-full">
              {" "}
              <NavigationMenuItem>
                <NavigationMenuTrigger value="all-programs">
                  All Programs
                </NavigationMenuTrigger>

                <NavigationMenuContent
                  style={{
                    position: "fixed",
                    left: 0,
                    right: 0,
                    top: "105px",
                    width: "100vw",
                    maxWidth: "100vw",
                  }}
                  className="bg-white shadow-md z-50 py-10"
                >
                  <div className="container">
                    <CourseSection
                      menuData={menuData || null}
                      closeMegaMenu={closeMegaMenu || null}
                    />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger value="more">More</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/about">
                          <div className="font-medium">About</div>
                          <div className="text-muted-foreground">
                            Why Choose LearningShala?
                          </div>
                        </Link>
                      </NavigationMenuLink>

                      {/* <NavigationMenuLink asChild>
                      <Link href="/blog">
                        <div className="font-medium">Blog</div>
                        <div className="text-muted-foreground">
                          Trending Universities/Courses
                        </div>
                      </Link>
                    </NavigationMenuLink> */}
                      <NavigationMenuLink asChild>
                        <Link href="/contact-us">
                          <div className="font-medium">Contact Us</div>
                          <div className="text-muted-foreground">
                            Help Desk & Support
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/career-sathi-channel-partner">
                          <div className="font-medium">Career Sathi Partner</div>
                          <div className="text-muted-foreground">
                            How to become a LearningShala Partner?
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {/* <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} bg-[#f1f5f9]`}
                >
                  <Link href="/help-me-choose-university">
                    Help me choose a university
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem> */}

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()}`}
                >
                  <Link href="/blog">
                   Blogs
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()}`}
                >
                  <Link href="/news">
                   News
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} bg-primary text-white hover:bg-primary/90 hover:text-white focus:bg-primary/90 focus:text-white flex items-center justify-center gap-2`}
                >
                  <Link href="/compare-in-two-mins">
                   Compare Top Universities <span className="absolute top-[-10] left-3 bg-secondary text-white px-2 py-0 rounded-full text-[12px] shadow-sm">40+ Factors</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>


              <NavigationMenuItem>
                {isVerified ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="shadow-none border-0" variant="outline" style={{background: "linear-gradient(257deg,hsla(18,84%,90%,.3) -32.4%,rgba(255,165,129,.3) -3.42%,rgba(255,73,0,.3) 23.87%,rgba(251,223,233,.3) 50.46%,rgba(253,191,219,.3) 79.15%,rgba(249,57,166,.3) 103.64%)"}}>
                       <Hand className="text-primary" /> Hi {firstName} <MoreVerticalIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          deleteCookie("lead_name");
                          deleteCookie("lead_id");
                          deleteCookie("lead_verified");
                          router.refresh();
                        }}
                      >
                        <LogOut className="size-4 mr-2" /> Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => showLeadForm("signin from header")}
                  >
                    Sign In
                  </Button>
                )}
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      {/* No-JS fallback:
          Put crawlable links inside <noscript> so they are only visible when JS is disabled. */}
      <noscript>
        {menuData?.data ? (
          <div className="bg-white shadow-md py-10">
            <div className="container">
              {Object.entries(menuData.data).map(([category, courses]) => (
                <section key={category} className="mb-6">
                  <h3 className="font-bold mb-2">{category}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {courses?.[0]?.course_domain_label || courses?.length} courses
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {(courses || []).map((course) => (
                      <a
                        key={course.course_id}
                        href={`/courses/${course.course_slug}`}
                        className="text-primary underline-offset-2 hover:underline"
                      >
                        {course.course_name}
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        ) : null}
      </noscript>
    </div>
  );
};

function ListItem({ title, children, href, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default Header;
