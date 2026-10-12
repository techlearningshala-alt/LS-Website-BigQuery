import React from 'react'
import Banner from "@/components/postAdmission/banner";
import AdmissionToSuccess from "@/components/postAdmission/admissionToSuccess";
import WhyWe from "@/components/postAdmission/whyWe";
import SupportService from "@/components/postAdmission/supportService";
import WhyUs from "@/components/postAdmission/whyUs";
import PostCTA from "@/components/postAdmission/postCTA";
import Head from "next/head";
import MainHeading from '@/components/custom/shared/MainHeading';
import Faq from '@/components/custom/shared/Faq';
const PostAdmissionService = () => {

  const postAdmissionFaq = [
    {
      question: "What exactly is a Verified Mentor on LearningShala?",
      answer: "A Verified Mentor is someone who has gone through our screening process. We check their academic background, professional experience, and counseling ability before they ever appear on our platform. So when you see that green verified badge, you know they are the real deal.",
    },
    {
      question: "How does LearningShala verify its mentors?",
      answer: "We have a multi-step selection process for every mentor we hire! After document verification and a background check, we proceed with the training session and a mock counselling session. If the candidate performs well in the mock session, we proceed with their onboarding on our platform as a Mentor.",
    },
    {
      question: "Can anyone become a Verified Mentor on LearningShala?",
      answer: "The answer to this question is somewhere between a Yes and a No! We only hire mentors who have a solid educational background or relevant professional experience in their field. We look at the demonstrating ability of the person as knowing something and teaching it are two very different skills, and to become our mentor, they have to be good at both!",
    },
    {
      question: "How do I find the right mentor for me?",
      answer: "Use the filters on the mentor listing page to sort them by their field, experience level, language, availability, and ratings. You can also read through their profiles and schedule a demo call before making a choice.",
    },
    {
      question: "Can I have a trial session before committing to a single mentor?",
      answer: "Yes! Many of our Verified Mentors offer an introductory session. Look for the Available tag on their profile and give them a call to see if you are comfortable with their counseling style.",
    },
    {
      question: "What if I'm not happy with my mentor?",
      answer: "At LearningShala, great mentorship is not just a feature; it's the whole point. So if a session didn't feel right, please reach out to our support team, and we'll make sure to align you with someone who understands you better. However, your experience genuinely matters to us. You can also share how you felt by rating your mentor right after the session. Your feedback helps us keep up with the quality of mentorship.",
    },
    {
      question: "Is my personal information safe when I book a mentor?",
      answer: "Definitely! LearningShala takes your privacy seriously. All the communication and data exchange that happens through the platform is safe with us. We only connect you with mentors without letting them access your data directly.",
    },
    {
      question: "What happens if a Verified Mentor doesn't maintain quality standards?",
      answer: "We monitor mentor performance through ratings, feedback, and periodic reviews. If a mentor’s quality keeps on degrading day-by-day, their Verified status can be put on hold or removed. Maintaining the badge isn't a one-time thing at LearningShala; it's something that demands your effort every day.",
    },
  
  ];


  return (
   <>

   <Head> 
    <title>Post Admission Services | Assignment, Placement, Career & Job Support</title>
    <meta key="description" name="description" content="Get post admission services for online degree programs, including assignments, placements, career guidance, scholarships, and student assistance." />
    <link rel="canonical" href="https://learningshala.com/post-admission-service/" />


  {/* faq schema */}

  <script
          id="schema-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "@id": "https://learningshala.com/post-admission-service/#faq",
                "mainEntity": postAdmissionFaq.map(item => ({
                  "@type": "Question",
                  "name": item?.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item?.answer.replace(/<[^>]*>/g, "")
                  }

                }))


              },
              // null,
              // 2 

            )
          }}
        />

   </Head>
<Banner />

<div className='container'>
<AdmissionToSuccess />
<SupportService />
<WhyWe />
<WhyUs />
<PostCTA /> 
</div>

<section className="sec_mb">
        <div className="container max-w-3xl">
          <MainHeading title="Frequently asked questions" className="text-center mb-8" />
          <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
            <Faq faqData={postAdmissionFaq} />
          </div>
        </div>
      </section>


</> 

  )
}

export default PostAdmissionService