import Contactus from '@/components/custom/about/Contactus'
import MediaSlider from '@/components/custom/homepage/media/MediaSlider'
import Logo from '@/components/custom/shared/Logo'
import MainHeading from '@/components/custom/shared/MainHeading'
import ContentModal from '@/components/custom/shared/modal/ContentModal'
import PrimaryButton from '@/components/custom/shared/PrimaryButton'
import UniversitySlider from '@/components/custom/shared/slider/UniversitySlider'
import { getMediaData } from '@/services/HomepageService'
import { getUniversityData } from '@/services/UniversitypageService'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
import { globalStore } from '@/lib/store'

export async function getStaticProps() {

    const mediaData = await getMediaData().then((response) => response?.data?.data?.data || []);
    const universitiesList = await getUniversityData().then(
        (response) => response?.data?.data?.data || []
      );

    return {
        props: {
            mediaData: mediaData,
            universitiesList: universitiesList,
        },
        revalidate: 300,
    };
}
const About = ({ mediaData, universitiesList }) => {
    const { email, phone , helpDeskEmail ,companyName , gstNumber, address, facebook, instagram, twitter, youtube, linkedin } = globalStore;
    const [loading, setLoading] = useState(true);

    const founderData = [
        {
            img: "/images/about/t1.jpg",
            name: "Devesh",
            designation: "Founder And CEO",
        },
        {
            img: "/images/about/t1.jpg",
            name: "Devesh",
            designation: "Founder And CEO",
        },
        {
            img: "/images/about/t1.jpg",
            name: "Devesh",
            designation: "Founder And CEO",
        },
    ]

    useEffect(() => {
        if (mediaData && mediaData.length > 0) {
            setLoading(false);
        }
    }, [mediaData]);

    return (
        <div>
            <Head>

                <title>About LearningShala - India's #1 Online Degree Advisor Since 2017</title>
                <meta key="description" name="description" content="Since 2017, LearningShala has guided 10,000+ students to the right online degree. Get free 1:1 counseling from 200+ verified experts across 100+ top universities." />
               
                <link rel="canonical" href="https://learningshala.com/about/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="About LearningShala | Trusted Online Education Platform" />
                <meta property="og:description" content="Learn about LearningShala, a trusted platform helping students and working professionals choose the right online degree and university with their expert advice." />
                <meta property="og:url" content="https://learningshala.com/about/" />
                <meta property="og:site_name" content="LearningShala" />
                <meta property="og:image" content="https://learningshala.com/images/icons/logo.webp" />
                <meta property="og:image:alt" content="LearningShala Logo" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:locale" content="en_IN" />
<meta property="og:image:type" content="image/webp" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About LearningShala | Trusted Online Education Platform" />
                <meta name="twitter:description" content="Learn about LearningShala, a trusted platform helping students and working professionals choose the right online degree and university with their expert advice." />
                <meta name="twitter:image" content="https://learningshala.com/images/icons/logo.webp" />
                <meta name="twitter:image:alt" content="LearningShala Logo" />
                <meta name="twitter:creator" content="@Learning_shala" />
                <meta name="twitter:site" content="@Learning_shala" />

            

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            "@id": "https://learningshala.com/about/#webpage",
                            "url": "https://learningshala.com/about/",
                            "name": "About LearningShala | Trusted Online Education Platform",
                            "description": "Learn about LearningShala, a trusted platform helping students and working professionals choose the right online degree and university with their expert advice.",
                            "inLanguage": "en-IN",
                            "isPartOf": {
                                "@id": "https://learningshala.com/#website"
                            },
                            "about": {
                                "@id": "https://learningshala.com/#organization"
                            },
                            "mainEntity": {
                                "@id": "https://learningshala.com/#organization"
                            },
                            "publisher": {
                                "@id": "https://learningshala.com/#organization"
                              },
                            "potentialAction": {
                                "@type": "ReadAction",
                                "target": "https://learningshala.com/about/"
                            }
                        }),
                    }}
                />


            </Head>
            <div className='container'>
            <Breadcrumb>
            <BreadcrumbList className="mb-3">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/about">About</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
                <h1 className="text-3xl font-bold mb-6"> LearningShala - <span className="text-primary">
                India&apos;s Trusted  </span>  Online Degree Advisor</h1>
                <div className='grid grid-cols-12 gap-6 sec_mb'>
                    <div className='col-span-12 lg:col-span-8'>
                        <Image src="/images/about/about.png" width={1920} className='rounded-2xl' height={400} style={{ objectFit: 'cover' }} alt="about learningShala" />
                    </div>
                    <div className='col-span-12 lg:col-span-4'>
                        <div className='bg-gray-950  rounded-2xl h-full flex flex-col justify-center p-8'>
                            <p className='text-xl font-bold mb-4 text-white'>LearningShala is India&apos;s leading career guidance platform</p>
                            <p className='text-gray-200 mb-4 line-clamp-6'>Established in 2017 under the flagship of Vagmine Education LLP, with a mission to guide Indian students toward online education. Later in 2018, it was renamed LearningShala. Today, we are a team of 200+ counsellors who have helped 1 Lakh+ students find the best online UG and PG courses that align with their interests and career goals. The experienced counsellor offers tailored guidance using unique 40+ factors, including university reputation, accreditation, affordability, future growth, and placement records, to find you the best fit.Unlike other education partners, our support doesn&apos;t just end with enrollment; we believe education is only meaningful when students secure a sustainable career. That&apos;s why we offer end-to-end support, including regular updates on classes, exams, job opportunities, and masterclasses for resume and soft skill building.We work closely with India&apos;s top online universities to help students hone job-ready skills and practical exposure. Our goal is to empower students with decision-making to acquire an industry-relevant online degree that ensures they achieve a future-ready career.</p>
                            <ContentModal trigger={<PrimaryButton title="Learn More" icon={true} />} content={<>
                                <Logo />
                                <p className='text-xl font-bold mb-4 text-gray-900 mt-4'>LearningShala is India&apos;s leading career guidance platform</p>
                                <p className='mb-2'>Established in 2017 under the flagship of Vagmine Education LLP, with a mission to guide Indian students toward online education. Later in 2018, it was renamed LearningShala. Today, we are a team of 200+ counsellors who have helped 1 Lakh+ students find the best online UG and PG courses that align with their interests and career goals.</p>
                                <p className='mb-2'>The experienced counsellor offers tailored guidance using unique 40+ factors, including university reputation, accreditation, affordability, future growth, and placement records, to find you the best fit.</p><p className='mb-2'>Unlike other education partners, our support doesn&apos;t just end with enrollment; we believe education is only meaningful when students secure a sustainable career. That&apos;s why we offer end-to-end support, including regular updates on classes, exams, job opportunities, and masterclasses for resume and soft skill building.</p>
                                <p>We work closely with India&apos;s top online universities to help students hone job-ready skills and practical exposure. Our goal is to empower students with decision-making to acquire an industry-relevant online degree that ensures they achieve a future-ready career.</p>
                            </>} />
                        </div>
                    </div>
                </div>
                <MainHeading title="Trusted by Top Universities" className="text-center" />
                <UniversitySlider universitiesList={universitiesList || []} />
                <MainHeading title="Why LearningShala?" className="text-center mt-6" />
                <div className='grid grid-cols-12 bg-[#f8f4f1] gap-6 p-6 md:p-12 rounded-2xl sec_mb'>
                    <div className='col-span-12 lg:col-span-4'>
                        <div className='bg-[#fbf9f8] rounded-2xl p-8 h-full'>
                            <p className='font-bold text-xl mb-2'>FREE Career Guidance
                            </p>

                            <p>At LearningShala, we believe quality education should be accessible to all. We offer free counseling to understand your career goals, interests, and strengths. Our experts guide you through online UG and PG courses with complete transparency and help you make an informed decision.</p>
                        </div>
                    </div>
                    <div className='col-span-12 lg:col-span-4'>
                        <div className='bg-[#fbf9f8] rounded-2xl p-8 h-full'>
                            <p className='font-bold text-xl mb-2'>Tailored Recommendation
                            </p>

                            <p>We don&apos;t believe in one size fits all. Our experts provide personalised recommendations by comparing 40+ factors, including the university&apos;s reputation, program cost, market demand, and career scope, to ensure you get the best ROI on your degree.</p>
                        </div>
                    </div>
                    <div className='col-span-12 lg:col-span-4'>
                        <div className='bg-[#fbf9f8] rounded-2xl p-8 h-full'>
                            <p className='font-bold text-xl mb-2'>Post-enrollment Services
                            </p>

                            <p>Our support doesn&apos;t just end with enrollment; it starts after that. We provide end-to-end personalised support from finding the best online degree to finding your dream role.</p>
                        </div>
                    </div>
                    <div className='col-span-12 lg:col-span-4'>
                        <div className='bg-[#fbf9f8] rounded-2xl p-8 h-full custom_list'>
                            <p className='font-bold text-xl mb-2'>Milestone
                            </p>
                            <p className='mb-4'>With over 7 years of experience, LearningShala has helped students in finding the best online university, justifying our mission to provide</p>
                            <ul className='ps-4'>
                                <li>100+ University</li>
                                <li>10,000 + Career Transition</li>
                                <li>100+ Course</li>
                                <li>200+ Career Counselors</li>

                            </ul>
                        </div>
                    </div>
                    <div className='col-span-12 lg:col-span-4'>
                        <div className='bg-[#fbf9f8] rounded-2xl p-8 h-full custom_list'>
                            <p className='font-bold text-xl mb-2'>Vision
                            </p>

                            <ul className='ps-4'>
                                <li>To become India’s most trusted platform for guiding students about online education.</li>
                                <li>To ensure every student makes confident and well-informed academic choices.</li>
                                <li>To bridge the gap between quality education and a successful career.</li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-span-12 lg:col-span-4'>
                        <div className='bg-[#fbf9f8] rounded-2xl p-8 h-full custom_list'>
                            <p className='font-bold text-xl mb-2'>Our Mission
                            </p>

                            <ul className='ps-4'>
                                <li>Provide transparent career guidance to find the best online courses based on students’ personalized goals.</li>
                                <li>Help the students with personalized career support, from exploring the best online degree programs to securing their dream job.</li>
                                <li>Partner with top online universities to ensure students acquire industry-relevant degrees and placement-ready skills.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <MainHeading title={<>Connect <span className='text-secondary'>With Us</span></>} className="text-center" />
                <div className='grid grid-cols-12 max-w-5xl mx-auto gap-6 sec_mb hidden'>
                    {founderData?.map((data, index) => (
                        <div key={index} className='col-span-12 sm:col-span-4'>
                            <div className='border rounded-2xl overflow-hidden bg-[#f8f4f1] text-center'><Image src={data?.img} width={372} height={372} alt={data.name} className='rounded-2xl mx-auto object-cover' />
                                <div className='py-3'>  <p className='text-xl font-bold'>
                                    {data.name}
                                </p>
                                    <p>{data.designation}</p></div>
                            </div>
                        </div>
                    ))}

                </div>


            </div>
            <MediaSlider mediaData={mediaData || []} loading={loading} />
            <div className='container'><Contactus /></div>

        </div>
    )
}

export default About