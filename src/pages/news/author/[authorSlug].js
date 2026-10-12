
import { Card } from '@/components/ui/card'
import { ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
import Head from 'next/head';
import useWindowSize from '@/lib/use-window-size';
import NewsCard from '@/components/news/NewsCard';
import { getAuthorDetailData } from '@/services/NewsService'
import { LinkedinIcon } from 'next-share'

// Generate static paths
export async function getStaticPaths() {
  try {
    const res = await getAuthorDetailData();
    const authors = res?.data?.data?.data || [];

    const paths = authors.map((author) => ({
      params: { authorSlug: author?.author_slug?.toString() || '' },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

// Fetch data for each page
export async function getStaticProps({ params }) {
  try {
    const { authorSlug } = params;

    const res = await getAuthorDetailData({ authorSlug });
    const authorDetailData = res?.data?.data || null;

    // Handle 404
    if (
      !authorDetailData ||
      authorDetailData.is_page_created === false ||
      authorDetailData.is_active === 0 ||
      authorDetailData.is_active === false
    ) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        authorDetailData,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      notFound: true,
    };
  }
}

// Page component
const AuthorPage = ({ authorDetailData }) => {
    // console.log(authorDetailData,"nEws authorDetailData");
    const screenSize = useWindowSize();


    const metaTitle = authorDetailData?.meta_title ? authorDetailData?.meta_title : `${authorDetailData?.author_name} - Educational Content Writer | LearningShala`;
    const metaDescription = authorDetailData?.meta_description ? authorDetailData?.meta_description : `${authorDetailData?.author_name} is an experienced EdTech content writer creating blogs, online degree and university content with in-depth research, accuracy, and student-focused insights.`;
    const authorNews = (authorDetailData?.author_news || []).filter(
      (item) =>
        item?.is_active !== false &&
        item?.is_active !== 0 &&
        item?.is_page_created !== false
    );
  return (
 <>

 <Head>
    <title>{metaTitle}</title>
    <meta key="description" name="description" content={metaDescription} />
    <link rel="canonical" href={`https://learningshala.com/news/author/${authorDetailData?.author_slug}/`} />

    <script
type="application/ld+json"
dangerouslySetInnerHTML={{
  __html: JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `https://learningshala.com/news/author/${authorDetailData?.author_slug}/#profilepage`,
      "url": `https://learningshala.com/news/author/${authorDetailData?.author_slug}/`,
      "name": metaTitle,
      "description": metaDescription,
      "image": `${process.env.NEXT_PUBLIC_S3_BASE_URL}${authorDetailData?.image}`,
      "inLanguage": "en-IN",
      "mainEntity": {
        "@id": `https://learningshala.com/news/author/${authorDetailData?.author_slug}/#person`
      },
      "isPartOf": {
        "@id": "https://learningshala.com/#website"
      },
      "about": {
        "@id": "https://learningshala.com/#organization"
      },
      "publisher": {
        "@id": "https://learningshala.com/#organization"
      },
      "potentialAction": {
        "@type": "ReadAction",
        "target": `https://learningshala.com/news/author/${authorDetailData?.author_slug}/`
      }
    },
    null,
    2
  )
}}
/>


<script
type="application/ld+json"
dangerouslySetInnerHTML={{
  __html: JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `https://learningshala.com/news/author/${authorDetailData?.author_slug}/#person`,
      "name": authorDetailData?.author_name,
      "url": `https://learningshala.com/news/author/${authorDetailData?.author_slug}/`,
      "description": metaDescription,
      "jobTitle": "Educational Writer",
      "image": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_S3_BASE_URL}${authorDetailData?.image}`
      },
      "worksFor": {
        "@type": "Organization",
        "name": "LearningShala",
        "url": "https://learningshala.com/"
      },
      "sameAs": [
        `${authorDetailData?.linkedin_profile_link}`
      ],
      "knowsAbout": [
        "Online Education",
        "Distance Education",
        "UGC Guidelines",
        "Online MBA",
        "Career Counseling",
        "University Admissions"
      ]
    },
    null,
    2
  )
}}
/>

<script
type="application/ld+json"
dangerouslySetInnerHTML={{
  __html: JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `https://learningshala.com/blog/author/${authorDetailData?.author_slug}/#breadcrumb`,
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
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": authorDetailData?.author_name,
          "item": `https://learningshala.com/news/author/${authorDetailData?.author_slug}/`
        }
      ]
    },
    null,
    2
  )
}}
/>

 </Head>
    <section className='sec_mb'>
    <div className='container'>
     <div className='grid grid-cols-12'>
        <div className='col-span-12'>
          <Card className='p-0 gap-y-2 overflow-hidden'>
            {/* <div className='bg-primary/10 h-[150px]'> </div> */}



{screenSize && screenSize.width < 768 ? <Image src={`/images/blog/author-banner-mobile.webp`} alt={authorDetailData?.author_name} width={1920} height={150} className=' mb-2 border-2' style={{ objectFit: 'cover' }} /> : <Image src={`/images/blog/author-banner-desktop.webp`} alt={authorDetailData?.author_name} width={1920} height={150} className=' mb-2 border-2' style={{ objectFit: 'cover' }} /> }

        <div className='-mt-20 p-6 flex justify-between items-center'> 
           <div>  <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${authorDetailData?.image}`} alt={authorDetailData?.author_name} width={100} height={100} className='rounded-full mb-2 border-2 border-white' />
            <h1 className='text-2xl font-bold mb-1'>{authorDetailData?.author_name}</h1>
            {authorDetailData?.label && (
            <p className='mb-3 fw-semibold text-sm'>{authorDetailData?.label}</p>
            )}

{authorDetailData?.designation && (
            <p className='mb-3 fw-semibold'>{authorDetailData?.designation}</p>
            )}
            <p className="text-muted-foreground flex justify-between items-center mb-2"><span className="flex items-center gap-1 font-semibold text-green-500 !text-[12px]"><ShieldCheck className="h-4 w-4 text-green-500" /> LS Verified</span></p>
            
            </div>

            {authorDetailData?.linkedin_profile_link?.trim() ? (
  <div className='text-sm text-muted-foreground flex items-center gap-1'>
    <span className='inline-block'>Linkedin Profile :</span>

    <Link
      href={authorDetailData?.linkedin_profile_link}
      target='_blank'
      className='text-primary text-sm font-bold underline'
    >
      <LinkedinIcon className="h-6 w-6 rounded-xl" />
    </Link>
  </div>
) : null}
         
            
            </div>
           <div className='px-6 pb-6'>
           <h2 className='text-xl font-bold mb-2'>About</h2>
           <div className='mb-6' dangerouslySetInnerHTML={{ __html: authorDetailData?.author_details }} />


           <h2 className='text-xl font-bold mb-4'>Most Popular News</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{authorNews?.map((blog) => (

<Link key={blog.id} href={`/news/${blog?.slug}`}>


  <NewsCard data={blog} />


</Link>

))}

</div>

           </div>
           



          </Card>



        </div>
       

     </div>
    </div>
</section>
 </>
  );
};

export default AuthorPage;