import React from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import {
  getBlogCategoryDetailData,
  getCategoryBlogList,
  parseBlogCategoryApiResponse,
} from "@/services/BlogService";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Head from "next/head";

export async function getStaticPaths() {

    const res = await getCategoryBlogList();
    const categories = res?.data?.data?.data || [];
  
    const paths = categories.map((category) => ({
      params: { blogCategory: category.category_slug }, // ✅ correct
    }));
  
    return { paths, fallback: "blocking" };
  }

  export async function getStaticProps({ params }) {

    const categorySlug = params.blogCategory;
  
    const res = await getBlogCategoryDetailData(categorySlug, { page: 1, limit: 9 });
    const categoryBlogList = await getCategoryBlogList().then(
        (response) => response?.data?.data?.data || []
      );

    const { blogs, ...pagination } = parseBlogCategoryApiResponse(res, 9);
  
 // ✅ HANDLE 404
 if (!blogs || blogs.length === 0) {
  return {
    notFound: true,
  };
}

    return {
      props: {
        blogs,
        categorySlug,
        categoryBlogList,
        pagination,
      },
      revalidate: 60,
    };
  }

function BlogCategoryPageContent({
  blogs,
  categorySlug,
  categoryBlogList,
  pagination,
}) {
  const [blogList, setBlogList] = React.useState(blogs || []);
  const [currentPage, setCurrentPage] = React.useState(pagination?.page ?? 1);
  const [totalPages, setTotalPages] = React.useState(pagination?.pages ?? 1);
  const [totalCount, setTotalCount] = React.useState(pagination?.total ?? blogs?.length ?? 0);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [loadError, setLoadError] = React.useState(false);

  // Client-side nav between categories reuses this page; reset when props change.
  React.useEffect(() => {
    setBlogList(blogs || []);
    setCurrentPage(pagination?.page ?? 1);
    setTotalPages(pagination?.pages ?? 1);
    setTotalCount(pagination?.total ?? blogs?.length ?? 0);
    setLoadingMore(false);
    setLoadError(false);
  }, [
    categorySlug,
    blogs,
    pagination?.page,
    pagination?.pages,
    pagination?.total,
    pagination?.limit,
  ]);

  const limit = pagination?.limit ?? 9;
  const hasMore =
    currentPage < totalPages || (totalCount > 0 && blogList.length < totalCount);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setLoadError(false);
    try {
      const nextPage = currentPage + 1;
      const apiRes = await getBlogCategoryDetailData(categorySlug, {
        page: nextPage,
        limit,
      });
      const parsed = parseBlogCategoryApiResponse(apiRes, limit);
      if (!parsed.blogs.length) {
        setLoadError(true);
        return;
      }
      setBlogList((prev) => [...prev, ...parsed.blogs]);
      setCurrentPage(parsed.page ?? nextPage);
      setTotalPages(parsed.pages ?? totalPages);
      setTotalCount(parsed.total ?? totalCount);
    } catch {
      setLoadError(true);
    } finally {
      setLoadingMore(false);
    }
  };

const title = categoryBlogList?.find((category) => category.category_slug === categorySlug)?.meta_title || `${blogList[0]?.category_title} - Blogs | LearningShala`;

const description = categoryBlogList?.find((category) => category.category_slug === categorySlug)?.meta_description || `${blogList[0]?.category_title} - Blogs | LearningShala`;


  return (
  <>

<Head>
    <title>{title}</title>
    <meta key="description" name="description" content={description} />
    <link rel="canonical" href={`https://learningshala.com/blog/category/${categorySlug}/`} />
 </Head>

    <div className="container mx-auto px-4">

<div className="bg-white py-4 px-6 rounded-2xl flex flex-col items-center justify-center">
        {" "}
        <h1 className="text-3xl font-bold mb-2">  {blogList[0]?.category_title} <span className="text-primary">Blogs</span></h1>
        <Breadcrumb>
            <BreadcrumbList className="mb-3">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
              <BreadcrumbLink href="/blog">Blogs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
              {blogList[0]?.category_title}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
       
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-3">

        <ul className="rounded-lg sticky top-0 flex md:flex-col gap-2 p-0 overflow-x-auto scrollbar-hide mb-4 md:mb-8">
      <li className="mb-0 whitespace-nowrap"><Link href="/blog" className="text-sm font-semibold py-2 px-6 rounded-sm w-full block bg-gray-100">All</Link></li> 
      {categoryBlogList
  ?.filter((category) => category.category_visibility === true)
  .map((category) => (
    <li key={category.slug}>
      <Link
        href={`/blog/category/${category.category_slug}`}
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
        <div className="col-span-12 md:col-span-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">

{blogList?.map((blog) => (

<Link key={blog.id} href={`/blog/${blog?.slug}`}>


        <BlogCard data={blog} />


</Link>

      ))}

</div>

{hasMore ? (
  <div className="flex flex-col items-center gap-2 mb-10">
    <Button
      className="cursor-pointer bg-primary text-white hover:bg-primary/90 hover:text-white font-bold"
      type="button"
      variant="outline"
      size="xl"
      onClick={loadMore}
      disabled={loadingMore}
    >
      {loadingMore ? "Loading…" : "Load More"}{" "}
      {!loadingMore ? <ArrowDown className="h-4 w-4 animate-bounce" /> : null}
    </Button>
    {loadError ? (
      <p className="text-sm text-destructive">Could not load more. Please try again.</p>
    ) : null}
  </div>
) : null}
        </div>
      </div>

    </div>
  </>
  );
}

const BlogCategoryPage = (props) => (
  <BlogCategoryPageContent key={props.categorySlug} {...props} />
);

export default BlogCategoryPage;