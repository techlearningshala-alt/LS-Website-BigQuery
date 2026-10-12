
import React from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getCategoryNewsList, getNewsCategoryDetailData } from "@/services/NewsService";
import NewsCard from "@/components/news/NewsCard";
import { Button } from "@/components/ui/button";
import Head from "next/head";

const NEWS_PAGE_SIZE = 6;


export async function getStaticPaths() {

  const res = await getCategoryNewsList();
  const categories = res?.data?.data?.data || [];

  const paths = categories.map((category) => ({
    params: { newsCategory: category.category_slug }, // ✅ correct
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {

  const categorySlug = params.newsCategory;

  const res = await getNewsCategoryDetailData(categorySlug);
  const categoryNewsList = await getCategoryNewsList().then(
    (response) => response?.data?.data?.data || []
  );

  const news = (res?.data?.data || []).filter(
    (item) =>
      item?.is_active !== false &&
      item?.is_active !== 0 &&
      item?.is_page_created !== false
  );

  // ✅ HANDLE 404
  if (!news || news.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      news,
      categorySlug,
      categoryNewsList,
    },
    revalidate: 60,
  };
}

const NewsCategoryPage = ({ news, categorySlug, categoryNewsList, screenSize }) => {
  const [visibleCount, setVisibleCount] = React.useState(NEWS_PAGE_SIZE);
  const list = news || [];
  const visibleNews = list.slice(0, visibleCount);
  const hasMore = visibleCount < list.length;

  const loadMore = () => {
    setVisibleCount((count) => Math.min(count + NEWS_PAGE_SIZE, list.length));
  };

  const title = categoryNewsList?.find((category) => category.category_slug === categorySlug)?.meta_title || `${news[0]?.category_title} - News | LearningShala`;

  const description = categoryNewsList?.find((category) => category.category_slug === categorySlug)?.meta_description || `${news[0]?.category_title} - News | LearningShala`;

  return (
   <>
   <Head> <title>{title}</title>
    <meta key="description" name="description" content={description} />
    <link rel="canonical" href={`https://learningshala.com/news/category/${categorySlug}/`} />
   </Head>
    <div className="container mx-auto px-4">

<div className="bg-white py-4 px-6 rounded-2xl flex flex-col items-center justify-center">
        {" "}
        <h1 className="text-3xl font-bold mb-2">  {news[0]?.category_title} <span className="text-primary">News</span></h1>
        <Breadcrumb>
          <BreadcrumbList className="mb-3">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/news">News</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {news[0]?.category_title}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="text-center md:max-w-4xl mx-auto text-muted-foreground" dangerouslySetInnerHTML={{ __html: news[0]?.category_summary }} />
      </div>



      <div className="grid grid-cols-12 gap-4">


         {/* Sidebar Categories */}
         <div className="col-span-12 md:col-span-3">
         <ul className="rounded-lg sticky top-0 flex md:flex-col gap-2 p-0 overflow-x-auto scrollbar-hide mb-4 md:mb-8">
      <li className="mb-0 whitespace-nowrap"><Link href="/news" className="text-sm font-semibold py-2 px-6 rounded-sm w-full block bg-gray-100">All</Link></li> 
      {categoryNewsList
  ?.filter((category) => category.category_visibility === true)
  .map((category) => (
    <li key={category.slug}>
      <Link
        href={`/news/category/${category.category_slug}`}
        className={`text-sm font-semibold py-2 px-6 w-full block text-nowrap rounded-sm ${
          categorySlug === category.category_slug
            ? "bg-primary text-white"
            : "bg-gray-100 hover:bg-primary/10"
        }`}
      >
        {category.title}
      </Link>
    </li>
))}
      </ul>
        </div>
        {/* Blog List */}
        <div className="col-span-12 md:col-span-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {visibleNews.map((item) => (
              <Link key={item.id} href={`/news/${item?.slug}`}>
                <NewsCard data={item} />
              </Link>
            ))}
          </div>

          {hasMore ? (
            <div className="flex justify-center mb-10">
              <Button
                className="cursor-pointer bg-primary text-white hover:bg-primary/90 hover:text-white font-bold"
                type="button"
                variant="outline"
                size="xl"
                onClick={loadMore}
              >
                Load More <ArrowDown className="h-4 w-4 animate-bounce" />
              </Button>
            </div>
          ) : null}
        </div>

       

      </div>

    </div>
   </>
  );
};

export default NewsCategoryPage;