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

const BLOG_PAGE_SIZE = 6;

export async function getStaticProps() {
    const blogsList = await getBlogData().then(
      (response) => (response?.data?.data?.data || []).filter(
        (blog) =>
          blog?.is_active !== false &&
          blog?.is_active !== 0 &&
          blog?.is_page_created !== false
      )
    );
    const categoryBlogList = await getCategoryBlogList().then(
      (response) => response?.data?.data?.data || []
    );
  
    return {
      props: {
        blogsList: blogsList,
        categoryBlogList: categoryBlogList,
      },
      revalidate: 60,
    };
  }


const blog = ({ screenSize, blogsList, categoryBlogList }) => {
  const [visibleCount, setVisibleCount] = React.useState(BLOG_PAGE_SIZE);
  const list = blogsList || [];
  const visibleBlogs = list.slice(0, visibleCount);
  const hasMore = visibleCount < list.length;

  const loadMore = () => {
    setVisibleCount((n) => Math.min(n + BLOG_PAGE_SIZE, list.length));
  };

  const title = "LearningShala Blog: Online Courses, Universities & Career Guides";
  const description = "Explore LearningShala blogs on online courses, universities, admissions, fees, reviews, career options & distance education with expert guides and latest updates.";

  // console.log(blogsList.length,"visibleBlogs");
  
 
  return (
    <> 
    
    <Head>
        <title>{title}</title>
        <meta key="description" name="description" content={description} />
        <link rel="canonical" href="https://learningshala.com/blog/" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://learningshala.com/blog/" />
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
      "url": "https://learningshala.com/blog/",
      "name": title,
      "description": description,
      "inLanguage": "en-IN",

      "isPartOf": {
        "@type": "WebSite",
        "name": "LearningShala",
        "url": "https://learningshala.com/",
      },
    
      "about": {
        "@type": "Blog",
        "name": title
      },
    
      "potentialAction": {
        "@type": "ReadAction",
        "target": "https://learningshala.com/blog/"
      }
    },
    // null,
    // 2 
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
      "url": "https://learningshala.com/blog/",
      "name": title,
      "description": description,
      "inLanguage": "en-IN",
    
      "isPartOf": {
        "name": "LearningShala",
        "url": "https://learningshala.com/"
      },
    
      "about": categoryBlogList?.filter((category) => category.category_visibility === true).map((category) => ({
        "@type": "Thing",
        "name": category.title
      })),
    
      "potentialAction": {
        "@type": "ReadAction",
        "target": "https://learningshala.com/blog/"
      }
    },
    // null,
    // 2 
  )
}}
/>


<script

id="schema-blog"
type="application/ld+json"

dangerouslySetInnerHTML={{
  __html: JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": title,
      "url": "https://learningshala.com/blog/",
      "description": description,
      
      "publisher": {
        "@type": "Organization",
        "name": "LearningShala",
        "url": "https://learningshala.com/"
      },
      "inLanguage": "en-IN"
    },
    // null,
    // 2 
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
      "@id": "https://learningshala.com/blog/",
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
          "name": "Blog",
          "item": "https://learningshala.com/blog/"
        }
      ]
    },
    // null,
    // 2 
  )
}}
/>



      </Head>
    <div className="container">
    <div className="bg-white py-4 px-6 rounded-2xl flex flex-col items-center justify-center">
        {" "}
        <h1 className="text-3xl font-bold mb-2"> LearningShala <span className="text-primary">Blogs</span></h1>
        <Breadcrumb>
            <BreadcrumbList className="mb-3">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
              Blogs
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
       
      </div>


<div className="grid grid-cols-12 gap-6">
  <div className="col-span-12 md:col-span-3">
  <ul className="rounded-lg sticky top-0 flex md:flex-col gap-2 p-0 overflow-x-auto scrollbar-hide mb-4 md:mb-8">
      <li><Link href="/blog" className="text-sm font-semibold bg-primary text-white py-2 px-6 rounded-sm w-full block">All</Link></li>
      {categoryBlogList
  ?.filter((category) => category.category_visibility === true)
  .map((category) => (
    <li key={category.slug}>
      <Link
        href={`/blog/category/${category.category_slug}`}
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
        {visibleBlogs.map((data, index) => (
          <Link
            key={data?.slug ?? index}
            href={`/blog/${data?.slug}`}
            
          >
            <BlogCard data={data} />
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

      <BlogMobileStickyFooter screenSize={screenSize} allCategories={categoryBlogList} />
    </>
  );
};

export default blog;
