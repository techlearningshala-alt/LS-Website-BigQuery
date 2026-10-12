import NextShare from '@/components/custom/shared/NextShare';
import Image from 'next/image';
import React, { useState } from 'react'
import {
  Card,
} from "@/components/ui/card";
import { ArrowRight, ChevronDown, ChevronUp, VerifiedIcon } from "lucide-react";
// import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import BlogMobileStickyFooter from '@/components/blog/BlogMobileStickyFooter';
import { getBlogData, getBlogDetailData, getCategoryBlogList } from '@/services/BlogService';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { Link as ScrollLink } from "react-scroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cleanHTML } from '@/lib/cleanHTML';
import { processBlogContentSections } from '@/lib/processBlogContent';
import Head from 'next/head';
import RelatedBlogs from '@/components/blog/RelatedBlogs';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import BlogRightCard from '@/components/blog/BlogRightCard';
import ContentModal from '@/components/custom/shared/modal/ContentModal';
import CallScheduleCTA from '@/components/blog/CallScheduleCTA';
import StickyBlogFooter from '@/components/blog/StickyBlogFooter';
import CallScheduleCTA1 from '@/components/blog/CallScheduleCTA1';
import CallScheduleCTA2 from '@/components/blog/CallScheduleCTA2';



export async function getStaticPaths() {
  const res = await getBlogData();
  const blogList = (await res?.data?.data?.data) || [] || null;
  const publishableBlogs = blogList.filter(
    (blog) => blog?.is_active !== false && blog?.is_active !== 0 && blog?.is_page_created !== false
  );
  // console.log(blogList, "blogList");
  const paths = publishableBlogs?.map((blog) => ({
    params: { blogSlug: blog?.slug },
  }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const blogsList = await getBlogData().then(
    (response) => response?.data?.data?.data || []
  );
  const categoryBlogList = await getCategoryBlogList().then(
    (response) => response?.data?.data?.data || []
  );
  const res = await getBlogDetailData(params);
  const blogDetailData = (await res?.data?.data) || null;


  // ✅ HANDLE 404
  if (
    !blogDetailData ||
    blogDetailData.is_page_created === false ||
    blogDetailData.is_active === 0 ||
    blogDetailData.is_active === false
  ) {
    return {
      notFound: true,
    };
  }

  const { sections: blogContentSections, toc: blogToc } =
    processBlogContentSections(blogDetailData);

  return {
    props: {
      blogDetailData: blogDetailData,
      blogContentSections,
      blogToc,
      blogsList: blogsList,
      params: params,
      categoryBlogList: categoryBlogList,
    },
    revalidate: 60,
  };
}

const Blogpage = ({ blogSlug, screenSize, blogDetailData, blogContentSections, blogToc, categoryBlogList }) => {
  const [showAll, setShowAll] = useState(false);


  const title = blogDetailData?.meta_title;
  const description = blogDetailData?.meta_description;

  // console.log(blogDetailData, "blogDetailData");


  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key="description" name="description" content={description} />
        <link rel="canonical" href={`https://learningshala.com/blog/${blogDetailData?.slug}/`} />
        <link rel="icon" href="https://learningshala.com/images/icons/favicon.webp" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://learningshala.com/blog/${blogDetailData?.slug}/`} />
        <meta property="og:site_name" content="LearningShala" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${blogDetailData?.thumbnail}`} />
        <meta property="og:image:alt" content={blogDetailData?.h1_tag} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${blogDetailData?.thumbnail}`} />
        <meta name="twitter:image:alt" content={blogDetailData?.h1_tag} />
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
                "url": `https://learningshala.com/blog/${blogDetailData?.slug}/`,
                "name": title,
                "description": description,
                "inLanguage": "en-IN",

                "isPartOf": {
                  "@type": "WebSite",
                  "name": "LearningShala",
                  "url": "https://learningshala.com"
                },

                "about": {
                  "@type": "Blog",
                  "name": title
                },

                "speakable": {
                  "@type": "SpeakableSpecification",
                  "cssSelector": ["h1"]
                },

                "potentialAction": {
                  "@type": "ReadAction",
                  "target": `https://learningshala.com/blog/${blogDetailData?.slug}/`
                }
              },
              null,
              2
            )
          }}
        />



        <script

          id="schema-blogposting"
          type="application/ld+json"

          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "url": `https://learningshala.com/blog/${blogDetailData?.slug}/`,

                "headline": title,
                "description": description,

                "image": {
                  "@type": "ImageObject",
                  "url": `${process.env.NEXT_PUBLIC_S3_BASE_URL}${blogDetailData?.thumbnail}`,
                  "width": 1014,
                  "height": 423
                },

                "author": {
                  "@type": "Person",
                  "name": blogDetailData?.author_name,
                  "url": `https://learningshala.com/blog/author/${blogDetailData?.author_slug}/`,
                  "image": {
                    "@type": "ImageObject",
                    "url": `${process.env.NEXT_PUBLIC_S3_BASE_URL}${blogDetailData?.author_image}`,
                    "width": 97,
                    "height": 97
                  },
                  "sameAs": [
                    `${blogDetailData?.linkedin_profile_link}`
                  ]
                },

                "publisher": {
                  "@type": "Organization",
                  "name": "LearningShala",
                  "url": "https://learningshala.com"
                },

                "datePublished": blogDetailData?.created_at,
                "dateModified": blogDetailData?.updated_at,

                "inLanguage": "en_IN"

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
                "@id": `https://learningshala.com/blog/${blogDetailData?.slug}/#breadcrumb`,
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
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": blogDetailData?.h1_tag || "Blog",
                    "item": `https://learningshala.com/blog/${blogDetailData?.slug}/`
                  },

                ]
              },
              null,
              2
            )
          }}
        />

        {blogDetailData?.blog_faqs?.length > 0 && (
          <script

            id="FAQPage-schema"
            type="application/ld+json"

            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "@id": `https://learningshala.com/blog/${blogDetailData?.slug}/#faq`,
                  "mainEntity": blogDetailData?.blog_faqs?.map(faq => ({
                    "@type": "Question",
                    "name": faq?.title,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": cleanHTML(faq?.description)
                    }
                  })) || []
                },
                null,
                2
              )
            }}
          />
        )}


      </Head>

      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-12 gap-4 sec_mb'>
          <div className='col-span-12 lg:col-span-8'>

            <img alt={blogDetailData?.h1_tag} src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${blogDetailData?.thumbnail}`} width={1200} height={400} className='rounded-md mb-6' quality={100} />
            <Breadcrumb>
              <BreadcrumbList className="mb-3">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {blogDetailData?.h1_tag}
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <p className='text-sm text-primary font-semibold mb-3'>{blogDetailData?.category_title}</p>
            <h1 className='text-xl sm:text-3xl font-extrabold mb-3'>{blogDetailData?.h1_tag}</h1>



            <div className="flex justify-between items-end gap-2 flex-wrap mb-4">
<ContentModal trigger={ <div className="flex items-center gap-2">
           <span className="rounded-full flex items-center justify-center text-xl font-bold"> <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${blogDetailData?.author_image}`} alt={blogDetailData?.author_name} width={50} height={50} className='rounded-md mb-2 border-2 border-white' /></span>
            <p className="flex flex-col !m-0 text-left">
              {" "}
              <span className="italic text-[12px]">Written By</span>
              <span className="font-semibold text-sm">
                {blogDetailData?.author_name}
              </span>
            </p>
          </div>} content={<>
  <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${blogDetailData?.author_image}`} alt={blogDetailData?.author_name} width={100} height={100} className='rounded-xl mb-2 border-2 border-white' />
  <p className='text-md font-bold'>{blogDetailData?.author_name}</p>
  <p className='text-black mb-2 text-sm font-semibold'>{blogDetailData?.author_label}</p>
  <p className='text-muted-foreground mb-2 text-sm font-semibold'>{blogDetailData?.author_designation}</p>
  <div className='text-muted-foreground mb-4 text-sm' dangerouslySetInnerHTML={{ __html: blogDetailData?.author_details }} />
  <Link href={`/blog/author/${blogDetailData?.author_slug}`} className='text-primary text-sm font-bold underline flex gap-1 '>View Full Profile <ArrowRight className="h-4 w-4" /></Link>
</>} />

{blogDetailData?.verifier_name !== null && <ContentModal trigger={ <div className="flex items-center gap-2">
           <span className="rounded-full flex items-center justify-center text-xl font-bold"> <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${blogDetailData?.verifier_image}`} alt={blogDetailData?.verifier_name} width={50} height={50} className='rounded-md mb-2 border-2 border-white' /></span>
            <p className="flex flex-col !m-0 text-left">
              {" "}
              <span className="italic text-[12px]">Reviewed by</span>
              <span className="font-semibold text-[12px] flex items-center gap-1">
              <b>{blogDetailData?.verifier_name}</b> 
              </span>
              <span className="font-semibold text-[12px] flex items-center gap-1">
             <VerifiedIcon className="w-4 h-4 text-green-500" /> LS Certified Expert
              </span>
            </p>
          
          </div>} content={<>
  <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${blogDetailData?.verifier_image}`} alt={blogDetailData?.verifier_name} width={100} height={100} className='rounded-xl mb-2 border-2 border-white' />
  <p className='text-md font-bold'>{blogDetailData?.verifier_name}</p>
  <p className="font-semibold text-[12px] flex items-center gap-1 mb-4">
             <VerifiedIcon className="w-4 h-4 text-green-500" /> LS Certified Expert
              </p>
  <p className='text-black mb-2 text-sm font-semibold'>{blogDetailData?.verifier_label}</p>
  <p className='text-muted-foreground mb-2 text-sm font-semibold'>{blogDetailData?.verifier_designation}</p>
  <div className='text-muted-foreground mb-4 text-sm' dangerouslySetInnerHTML={{ __html: blogDetailData?.verifier_details }} />
  <Link href={`/blog/author/${blogDetailData?.verifier_slug}`} className='text-primary text-sm font-bold underline flex gap-1 '>View Full Profile <ArrowRight className="h-4 w-4" /></Link>
</>} />}
  
        </div> 


            <div className='flex flex-wrap justify-between items-center gap-3'> <div className='text-sm text-muted-foreground flex items-center gap-2 '>

               Updated on {formatDate(blogDetailData?.updated_at)}</div>

              <NextShare shareLink={`https://learningshala.com/blog/${blogDetailData?.slug}`} /></div>

            <div className='border border-gray-200 p-6 rounded-lg shadow-sm my-6'>
              <p className='text-xl font-bold mb-3 flex items-center gap-2'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-text-left text-primary" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
              </svg>Table of contents</p>
              <ul className="custom-list text-sm space-y-2">
                {(showAll ? blogToc : blogToc?.slice(0, 4))?.map((item) => (
                  <li key={item.id}>
                    <ScrollLink
                      className="cursor-pointer"
                      to={item.id}
                      spy={true}
                      smooth={true}
                      duration={500}
                      offset={-20}
                    >
                      {item.text}
                    </ScrollLink>
                  </li>
                ))}
              </ul>

              {blogToc?.length > 4 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-primary text-sm font-bold mt-2 flex items-center gap-2 cursor-pointer ml-auto"
                >
                  {showAll ? <>View Less<ChevronUp className="w-4 h-4" /> </> : <>View More<ChevronDown className="w-4 h-4" /> </>}
                </button>
              )}

            </div>

            {blogContentSections.map((section) => (
              <React.Fragment key={section.key}>
                <Card className="p-6 mb-6">
                  <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </Card>

                {section.key === "content" ? (
                <CallScheduleCTA/>
                ) : null}

                {section.key === "content_1" ? (
                  <CallScheduleCTA1 />
                ) : null}
              </React.Fragment>
            ))}

            {blogContentSections.some((section) => section.key === "content_2") ? (
              <CallScheduleCTA2 />
            ) : null}

            {blogDetailData?.blog_faqs?.length > 0 && (
              <Card className="p-6 mb-6 blog-content">
                <h2 className='text-2xl font-bold'>Faqs</h2>
                <Accordion
                  type="multiple"
                  // collapsible
                  defaultValue={blogDetailData?.blog_faqs?.map((faq) => faq.id)}

                >
                  {blogDetailData?.blog_faqs?.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className='font-bold data-[state=open]:text-primary'>{faq.title}</AccordionTrigger>
                      <AccordionContent>
                        <div
                          className=""
                          dangerouslySetInnerHTML={{
                            __html: cleanHTML(faq.description),
                          }}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>

            )}


            <div className="p-6 bg-[#F5F5F5] rounded-lg mb-6" id='author-details'>
              <div className='flex items-center gap-2'>
                <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${blogDetailData?.author_image}`} alt={blogDetailData?.author_name} width={60} height={60} className='rounded-full mb-2 border-2 border-white' />
                <div>
                  <p className='text-md font-bold'>{blogDetailData?.author_name}</p>
                  <p className='text-muted-foreground mb-2 text-sm font-semibold'>{blogDetailData?.label}</p>
                </div>
              </div>


              <div className='text-muted-foreground mb-4 text-sm line-clamp-5' dangerouslySetInnerHTML={{ __html: blogDetailData?.author_details }} />

              <Link href={`/blog/author/${blogDetailData?.author_slug}`} className='text-primary text-sm font-bold underline flex gap-1 '>View Full Profile <ArrowRight className="h-4 w-4" /></Link>

            </div>

            <Card className="p-6">
              <h2 className='text-2xl font-bold'>Related <span className='text-primary'>Blogs</span></h2>
              <RelatedBlogs blogDetailData={blogDetailData} />
            </Card>





          </div>
          <div className='col-span-12 lg:col-span-4'>

            <div className='sticky top-0'>
              <BlogRightCard />

            </div>
          </div>
        </div>

      </div>
      <StickyBlogFooter />

      {/* <BlogMobileStickyFooter screenSize={screenSize} allCategories={categoryBlogList} /> */}
    </>
  )
}

export default Blogpage
