import React from "react";
import Image from "next/image";
import {
  ArrowDown,
    ArrowRight,
  Calendar,
  ClockIcon,
  ShieldCheck,
} from "lucide-react";
import MainHeading from "@/components/custom/shared/MainHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BlogMobileStickyFooter from "@/components/blog/BlogMobileStickyFooter";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { getBlogData, getCategoryBlogList } from "@/services/BlogService";
import { formatDate } from "@/lib/utils";
import Head from "next/head";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import BlogCard from "@/components/blog/BlogCard";
import { getCategoryNewsList, getNewsData } from "@/services/NewsService";
import NewsCard from "@/components/news/NewsCard";
import NewsMobileStickyFooter from "@/components/news/NewsMobileStickyFooter";

const BLOG_PAGE_SIZE = 6;

export async function getStaticProps() {
    const newsList = await getNewsData().then(
      (response) =>
        (response?.data?.data?.data || []).filter(
          (item) =>
            item?.is_active !== false &&
            item?.is_active !== 0 &&
            item?.is_page_created !== false
        )
    );
    const categoryNewsList = await getCategoryNewsList().then(
      (response) => response?.data?.data?.data || []
    );
  
    return {
      props: {
        newsList: newsList,
        categoryNewsList: categoryNewsList,
      },
      revalidate: 60,
    };
  }


const blog = ({ screenSize, newsList, categoryNewsList }) => {
  const [visibleCount, setVisibleCount] = React.useState(BLOG_PAGE_SIZE);
  const list = newsList || [];
  const visibleNews = list.slice(0, visibleCount);
  const hasMore = visibleCount < list.length;

  const loadMore = () => {
    setVisibleCount((n) => Math.min(n + BLOG_PAGE_SIZE, list.length));
  };
 

  const title = "Latest Education News 2026: Exams, Results & Admission";
  const description = "Get the latest education news in India on exams, admit cards, results, admissions, registrations, scholarships, and university updates in 2026 on LearningShala.";

  return (
    <> 
    
    <Head>
        <title>{title}</title>
        <meta key="description" name="description" content={description} />
        <link rel="canonical" href="https://learningshala.com/news/" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://learningshala.com/news/" />
        <meta property="og:site_name" content="LearningShala" />
        <meta property="og:image" content="https://learningshala.com/images/icons/logo.webp" />
        <meta property="og:image:alt" content="LearningShala Logo" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_IN" />
<meta property="og:image:type" content="image/webp" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://learningshala.com/images/icons/logo.webp" />
        <meta name="twitter:image:alt" content="LearningShala Logo" />
        <meta name="twitter:creator" content="@Learning_shala" />
        <meta name="twitter:site" content="@Learning_shala" />




        <script

id="schema-webpage"
type="application/ld+json"

dangerouslySetInnerHTML={{
  __html: JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "url": "https://learningshala.com/news/",
      "name": title,
      "description": description,
      "inLanguage": "en-IN",

      "isPartOf": {
        "@type": "WebSite",
        "name": "LearningShala",
        "url": "https://learningshala.com/",
      },
    
      "potentialAction": {
        "@type": "ReadAction",
        "target": "https://learningshala.com/news/"
      }
    },
    null,
    2 
  )
}}
/>


<script

id="schema-collectionpage"
type="application/ld+json"

dangerouslySetInnerHTML={{
  __html: JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "url": "https://learningshala.com/news/",
      "name": title,
      "description": description,
      "inLanguage": "en-IN",
    
      "isPartOf": {
        "name": "LearningShala",
        "url": "https://learningshala.com/"
      },
    
      "about": categoryNewsList?.filter((category) => category.category_visibility === true).map((category) => ({
        "@type": "Thing",
        "name": category.title
      })),
    
      "potentialAction": {
        "@type": "ReadAction",
        "target": "https://learningshala.com/news/"
      }
    },
    null,
    2 
  )
}}
/>


<script

id="schema-breadcrumb"
type="application/ld+json"

dangerouslySetInnerHTML={{
  __html: JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": "https://learningshala.com/news/",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://learningshala.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "News",
          "item": "https://learningshala.com/news/"
        }
      ]
    },
    null,
    2 
  )
}}
/>



      </Head>
    <div className="container">
      <div className="bg-white py-4 px-6 rounded-2xl flex flex-col items-center justify-center">
        {" "}
        <h1 className="text-3xl font-bold mb-2"> LearningShala <span className="text-primary">News</span></h1>
        <Breadcrumb>
            <BreadcrumbList className="mb-3">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
              News
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        {/* <p className="text-center md:max-w-4xl mx-auto text-muted-foreground">
        Get details on online universities, courses, admissions, eligibility, and fees. Compare top universities, read reviews, and stay updated on salaries, careers, and trends in online education.
        </p> */}
      </div>


<div className="grid grid-cols-12 gap-6">
<div className="col-span-12 md:col-span-3">
  <ul className="rounded-lg sticky top-0 flex md:flex-col gap-2 p-0 overflow-x-auto scrollbar-hide mb-4 md:mb-8">
      <li><Link href="/news" className="text-sm font-semibold bg-primary text-white py-2 px-6 rounded-sm w-full block">All</Link></li>
      {categoryNewsList
  ?.filter((category) => category.category_visibility === true)
  .map((category) => (
    <li key={category.slug}>
      <Link
        href={`/news/category/${category.category_slug}`}
        className="text-sm font-semibold py-2 px-6 w-full block text-nowrap rounded-sm bg-gray-100 hover:bg-primary/10"
      >
        {category.title}
      </Link>
    </li>
))}
      </ul>
  </div>
  <div className="col-span-12 md:col-span-9">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {visibleNews.map((data, index) => (
          <Link
            key={data?.slug ?? index}
            href={`/news/${data?.slug}`}
           
          >
            <NewsCard data={data} />
          </Link>
        ))}
      </div>

      {hasMore ? (
        <div className="flex justify-center mb-10">
          <Button className="cursor-pointer bg-primary text-white hover:bg-primary/90 hover:text-white font-bold" type="button" variant="outline" size="xl" onClick={loadMore}>
            Load More <ArrowDown className="h-4 w-4 animate-bounce" />
          </Button>
        </div>
      ) : null}
  </div>

</div>


  

    </div>

      <NewsMobileStickyFooter screenSize={screenSize} allCategories={categoryNewsList} />
    </>
  );
};

export default blog;
