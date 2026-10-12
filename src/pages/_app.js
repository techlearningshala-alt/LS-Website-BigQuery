import Cta from "@/components/custom/shared/Cta";
import Footer from "@/components/custom/shared/Footer";
import Header from "@/components/custom/shared/Header";
import TopHeader from "@/components/custom/shared/TopHeader";
import { Plus_Jakarta_Sans } from "next/font/google";
import MobileHeader from "@/components/custom/shared/MobileHeader";
import "@/styles/globals.css";
import useWindowSize from "@/lib/use-window-size";
import { ModalProvider } from "@/context/ModalContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCoursesByDomain } from "@/services/MenuService";
import { LeadFormProvider } from "@/context/LeadFormContext";
import LeadFormModal from "@/components/auth/LeadFormModal";
import ExternalLinkGuard from "@/components/ExternalLinkGuard";
import { getUniversityData } from "@/services/UniversitypageService";
import { Toaster } from "@/components/ui/sonner";
import MobileStickyFooter from "@/components/custom/shared/MobileStickyFooter";
import Head from "next/head";
import Script from "next/script";
import { globalStore } from "@/lib/store";
import { CompareProvider } from "@/context/CompareContext";


const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
export default function App({ Component, pageProps }) {
  const { email, phone , helpDeskEmail ,companyName , gstNumber, address, facebook, instagram, twitter, youtube, linkedin } = globalStore;

  // When JavaScript is disabled, `useEffect` won't run, so we must render using server-provided props.
  // Several pages fetch `menuDataSchema` via `getStaticProps`; CourseSection/Header expect `menuData.data`.
  const initialMenuData =
    pageProps?.menuData ??
    (pageProps?.menuDataSchema ? { data: pageProps.menuDataSchema } : null);

  const initialUniversitiesListData = pageProps?.universitiesList ?? null;

  const size = useWindowSize();
  const router = useRouter();

  const [menuData, setMenuData] = useState(initialMenuData);
  const [universitiesListData, setUniversitiesListData] = useState(
    initialUniversitiesListData
  );


  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     window.gtag("config", "G-41XRVMVZM7", {
  //       page_path: url,
  //     });
  //   };

  //   router.events.on("routeChangeComplete", handleRouteChange);
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);

  // useEffect(() => {
  //   getUniversityData().then((response) => {
  //     if (response) {
  //       setUniversitiesListData(response?.data?.data?.data);
  //     } else {
  //       setUniversitiesListData(null);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   getCoursesByDomain().then((response) => {
  //     if (response) {
  //       setMenuData(response?.data);
  //     } else {
  //       setMenuData(null);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    getUniversityData().then((response) => {
      setUniversitiesListData(response?.data?.data?.data ?? null);
    });
  }, []);

  useEffect(() => {
    getCoursesByDomain().then((response) => {
      setMenuData(response?.data ?? null);
    });
  }, []);

  // if (!menuData) {
  //   return <div>Loading...</div>;
  // }

  // console.log(menuData, "menuData");
  // console.log(universitiesListData,"universitiesListData");

  return (
    <>
    <Head>
    {/* <meta
      name="description"
      key="description"
      content="Explore career-focused online degree, diploma & certificate programs at LearningShala. A platform with flexible choices for students and working professionals."
    /> */}
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
    <link rel="icon" href="/images/icons/favicon.webp" />
    <link rel="preconnect" href="https://admin.learningshala.com" />


    <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            "@id": "https://learningshala.com/#website",
                            "name": "LearningShala",
                            "url": "https://learningshala.com/",
                            "publisher": {
                                "@id": "https://learningshala.com/#organization"
                            },
                            "potentialAction": {
                                "@type": "SearchAction",
                                "target": "https://learningshala.com/search?q={search_term_string}",
                                "query-input": "required name=search_term_string"
                            }
                        }),
                    }}
                />

<script
          id="schema-website"
          type="application/ld+json"
          
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "@id": "https://learningshala.com/#organization",
              "name": "LearningShala",
              "legalName": "LearningShala",
              "url": "https://learningshala.com/",
              "foundingDate": "2017",
              "description": "Explore career-focused online degree, diploma, and certificate programs at LearningShala. A platform with flexible choices for students and working professionals!",
              "logo": {
                "@type": "ImageObject",
                "@id": "https://learningshala.com/#logo",
                "url": "https://learningshala.com/images/icons/logo.webp",
                "contentUrl": "https://learningshala.com/images/icons/logo.webp",
                "caption": "LearningShala Logo"
              },
              "mainEntityOfPage": {
                "@id": "https://learningshala.com/#webpage"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "contactType": "customer support",
                  "email": email.get(),
                  "telephone": phone.get(),
                  "availableLanguage": ["English", "Hindi"]
                }
              ],
              "sameAs": [
                instagram.get(),
                linkedin.get(),
                twitter.get(),
                youtube.get()
              ],
           "address": {
    "@type": "PostalAddress",
    "streetAddress": "B-21, Sector-3",
    "addressLocality": "Noida",
    "postalCode": "201301",
    "addressRegion": "Uttar Pradesh",
    "addressCountry": "IN"
  }
            }),
          }}
        />
    
    </Head>

  
     
    <div className={`${plusJakartaSans.className}`}>
      <ModalProvider>
        <LeadFormProvider  menuData={menuData || null} >
          <LeadFormModal/>
          <ExternalLinkGuard />

          {router.pathname !== "/compare-in-two-mins" && <TopHeader />}
          {/* {(() => {
            
            const isDesktop =
              typeof size?.width === "number" ? size.width > 991 : true;
            return isDesktop ? (
              <Header menuData={menuData || null} />
            ) : (
              <MobileHeader
                menuData={menuData || null}
                universitiesListData={universitiesListData || null}
              />
            );
          })()} */}

{router.pathname !== "/compare-in-two-mins" &&
 router.pathname !== "/free-counselling-online-degree-admission-guidance" &&
 router.pathname !== "/career-sathi-channel-partner" &&
 router.pathname !== "/career-sathi-channel-partner-kyc-registration-form" && (
  <>
    <div className="hidden lg:block">
      <Header menuData={menuData || null} />
    </div>

    <div className="block lg:hidden">
      <MobileHeader
        menuData={menuData || null}
        universitiesListData={universitiesListData || null}
      />
    </div>
  </>
)}




         <main>
         <CompareProvider>
         
         <Component
           screenSize={size}
           {...pageProps}
           menuData={menuData || null}
         />
         <Toaster position="top-right" />
       
       </CompareProvider>
         </main>
        

          {router.pathname !== "/compare-in-two-mins" &&
 router.pathname !== "/free-counselling-online-degree-admission-guidance" &&
 router.pathname !== "/career-sathi-channel-partner" &&
 router.pathname !== "/career-sathi-channel-partner-kyc-registration-form"
  && router.pathname !== "/compare" && <Cta />}

          {router.pathname !== "/compare-in-two-mins" &&
 router.pathname !== "/career-sathi-channel-partner" &&
 router.pathname !== "/career-sathi-channel-partner-kyc-registration-form" && (
            <Footer menuData={menuData || null} />
          )}
{ size && size.width < 991 && !router.pathname.includes("/blog") && router.pathname !== "/compare-in-two-mins" && <MobileStickyFooter />}

          {/* {size && size.width < 991 && <MobileStickyFooter />} */}
        </LeadFormProvider>
      </ModalProvider>
    </div></>
  );
}
