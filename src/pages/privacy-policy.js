import Head from "next/head";
import Link from "next/link";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { globalStore } from "@/lib/store";

const PrivacyPolicy = () => {

  const { address } = globalStore;

  const title = "Privacy Policy | LearningShala – User Data & Privacy";
  const description = "Learn how LearningShala collects, uses, and protects your personal data. Read our privacy policy for secure and transparent online education services.";
  const canonical = "https://learningshala.com/privacy-policy/";

  return (
   <>
   <Head>
   <title>{title}</title>
<meta key="description" name="description" content={description} />
<link rel="canonical" href={canonical} />
<meta property="og:type" content="website" />
<meta property="og:title" content="Privacy Policy - LearningShala | User Data & Privacy" />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
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
id="schema-website"
type="application/ld+json"

dangerouslySetInnerHTML={{
  __html: JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      "url": `${canonical}`,
      "name": title,
      "description": description,
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
        "target": `${canonical}`
      }
    },
    null,
    2 
  )
}}
/>


<script
id="schema-website"
type="application/ld+json"

dangerouslySetInnerHTML={{
  __html: JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
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
          "name": "Privacy Policy",
          "item": `${canonical}`
        }
      ]
    },
    null,
    2 
  )
}}
/>

   </Head>


    <div className="container sec_mb">




      <div className="bg-[#faf9f7] py-8 px-6 rounded-2xl mb-6 flex flex-col items-center justify-center">
        {" "}
        <Breadcrumb className="text-center">
            <BreadcrumbList className="mb-3">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/privacy-policy">Privacy Policy</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        <h1 className="text-3xl font-bold mb-2">
        Privacy Policy
        </h1>
        <p>Last Updated: 12 January 2026</p>
      </div>
      <h2 className="font-bold text-xl mb-4">1. Introduction</h2>
      <p>
        Welcome to{" "}
        <Link href="https://learningshala.com/" className="text-primary">
          LearningShala
        </Link>
        , a product/brand of Vagmine Education LLP. We are committed to
        protecting your personal data in compliance with the Digital Personal
        Data Protection Act, 2023 (DPDP Act).{" "}
      </p>
      <p>
        This Privacy Notice explains how we collect, use, and share your data
        when you use our services to seek admission guidance, compare
        universities, or enrol in courses.
      </p>
      <p>
        By clicking "I Agree" or by voluntarily submitting your details on our
        forms, you consent to the processing of your data as described below.{" "}
      </p>

      <h2 className="font-bold text-xl mb-4">2. Personal Data We Collect</h2>
      <p>
        We collect only the data necessary to facilitate your university
        admission process.
      </p>

      <p className="font-bold">A. Personal Identification Data</p>
      <ul className="list-disc list-inside ps-5 mb-4">
        <li>First Name, Last Name</li>
        <li>Job title & Company</li>
        <li>Signature</li>
        <li>Photographs</li>
      </ul>
      <p className="font-bold">B. Identification Data</p>
      <ul className="list-disc list-inside ps-5 mb-4">
        <li>Social security or tax identification numbers</li>
        <li>Aadhaar number and PAN</li>
      </ul>
      <p className="font-bold">C. Financial Data</p>

      <ul className="list-disc list-inside ps-5 mb-4">
        <li>Bank Account information</li>
        <li>Salary Information</li>
        <li>Payment gateway account details</li>
        <li>E-wallet account details</li>
      </ul>
      <p className="font-bold">D. Personal Characteristics</p>

      <ul className="list-disc list-inside ps-5 mb-4">
        <li>Age</li>
        <li>Gender</li>
        <li>Date of Birth</li>
        <li>Marital Status</li>
        <li>Nationality</li>
      </ul>

      <p className="font-bold">E. Contact Data</p>

      <ul className="list-disc list-inside ps-5 mb-4">
        <li>Postal address</li>
        <li>Email address</li>
        <li>Phone number</li>
      </ul>
      <p className="font-bold">F. Education and Recruitment Data</p>

      <ul className="list-disc list-inside ps-5 mb-4">
        <li>Educational qualification(s)</li>
        <li>Working goals</li>
        <li>Post-qualification experience</li>
      </ul>

      <p className="font-bold">G. Electronic Identification Data</p>

      <ul className="list-disc list-inside ps-5 mb-4">
        <li>Login credentials (If you are a registered user)</li>
        <li>Visitors IP Data</li>
        <li>Date and time of website visit</li>
        <li>Pages visited and navigation on the website</li>
        <li>Browser being used</li>
        <li>County of accessing the website</li>
        <li>Language of the browser being used</li>
        <li>Words searched for</li>
        <li>Pixel tags</li>
      </ul>

      <p className="font-bold">H. Inquiries</p>

      <ul className="list-disc list-inside ps-5 mb-4">
        <li>
          Personal Data stated in the form – for example: Name, address, phone
          number, country{" "}
        </li>
        <li>Subject of Inquiry</li>
        <li>Personal details (Name on the card, billing address)</li>
        <li>Payment details (card numbers, card type)</li>
        <li>
          Recordings of calls with students and users showing interest in our
          Program.
        </li>
        <li>
          Information about your interactions with customer service and
          maintenance interactions with us.
        </li>
      </ul>

      <p className="font-bold">I. User-Generated Data</p>

      <ul className="list-disc list-inside ps-5 mb-4">
        <li>Projects and Assignments submitted</li>
        <li>Peer feedback and grading</li>
        <li>Program performance data</li>
        <li>Response to quizzes, standalone quizzes, exams, and surveys</li>
        <li>
          Web Cam Recordings (during assessments related to online courses)
        </li>
        <li>Posts made to public forums through our platform</li>
        <li>
          Any other information necessary to ensure conformity with test/
          assessment rules, area of interests
        </li>
      </ul>
      <p className="font-bold">J. Marketing Data</p>

      <ul className="list-disc list-inside ps-5 mb-4">
        <li>Your preferences in receiving marketing information from us</li>
        <li>Your communication preferences</li>
      </ul>

      <p className="font-bold">K. Behavioural Data</p>
      <ul className="list-disc list-inside ps-5 mb-4">
        <li>
          Data inferred or assumed information relating to your behaviour and
          interests based on your online activity on our sites
        </li>
      </ul>
      <p>
        We do not collect any payment information processed by third-party
        payment gateway providers.
      </p>
      <p>
        <b>Note on Minors:</b> If you are under 18 years of age, you must not
        submit your data directly. Please ask your parent or lawful guardian to
        register on your behalf. We will require Verifiable Parental Consent
        before processing any data related to a minor.​
      </p>
      <h2 className="font-bold text-xl mb-4">
        3. Purpose of Processing (The "Why")
      </h2>
      <p>
        We process your personal data only for the following specific purposes:
      </p>
      <ol className="list-disc list-inside ps-5 mb-4">
        <li>
          <b>Admission Facilitation:</b> To assess your eligibility and forward your
          application to our Partner Universities.
        </li>
        <li>
          <b>Communication:</b> To contact you via Voice Call, WhatsApp, SMS, or Email
          regarding course details, fee structures, and admission deadlines.
        </li>
        <li>
          <b>Customer Support:</b> To resolve your queries regarding admission status
          or documentation.
        </li>
        <li>
          <b>Legal Compliance:</b> To verify your identity and age as required by law.
        </li>
      </ol>
      <p>
        We do NOT sell your data to unauthorised third parties. Your data is
        shared only with the specific universities you express interest in or
        are eligible for.
      </p>
      <h2 className="font-bold text-xl mb-4">4. Data Sharing and Transfer</h2>
      <p>
        As a third-party admission partner, we must share your data to fulfil
        your service request. We share data with:
      </p>
      <ul className="list-disc list-inside ps-5 mb-4">
        <li>
          <b>Partner Universities:</b> The specific educational institutions where you
          are applying. Once transferred, your data is also subject to their
          privacy policies.
        </li>
        <li className="font-bold">Service Providers:</li>
        <ul className="list-disc list-inside ps-5 mb-4">
       <li>
          <b>CRM & Communication Tools:</b> Superleap to manage your application
          status.
        </li>
        <li>
          <b>Payment Gateways:</b> To process counselling or application fees (if
          applicable).
        </li>
        <li>
          <b>Legal Authorities:</b> If required by a court order or government mandate.
        </li>
       </ul>
      </ul>
      <h2 className="font-bold text-xl mb-4">
        5. Your Rights (Rights of the Data Principal)
      </h2>
      <p>
        Under the DPDP Act, 2023, you have the following rights regarding your
        data:​
      </p>
      <ul className="list-disc list-inside ps-5 mb-4">
        <li>
          <b>Right to Access:</b> You can request a summary of the personal data
          we hold about you and the identities of all data fiduciaries
          (universities) with whom we have shared it.
        </li>
        <li>
          <b>Right to Correction:</b> You can ask us to update incorrect or
          incomplete data (e.g., wrong phone number or marks).
        </li>
        <li>
          <b>Right to Withdrawal of Consent:</b> You can withdraw your consent
          at any time.
          <ul className="list-disc list-inside ps-5">
            <li>
              <b>Effect:</b> If you withdraw consent, we will stop processing
              your application and delete your data, unless retention is
              required by law.
            </li>
            <li>
              <b>How:</b> Email us at info@learningshala.com with the subject
              "Withdraw Consent".
            </li>
          </ul>
        </li>
        <li>
          <b>Right to Grievance Redressal:</b> You have the right to file a
          complaint if you believe your data is being misused.
        </li>
      </ul>
      <h2 className="font-bold text-xl mb-4">6. Data Retention</h2>
      <p>We retain your personal data only as long as necessary to:</p>
      <ol className="list-disc list-inside ps-5 mb-4">
        <li>Complete your admission process.</li>
        <li>
          Fulfil legal or regulatory requirements (e.g., maintaining admission
          records for university audits). Once the purpose is met, your data
          will be securely deleted or anonymised.
        </li>
      </ol>
      <h2 className="font-bold text-xl mb-4">7. Protection of Children</h2>
      <p>
        We do not knowingly collect data from minors without parental consent.
        We strictly prohibit:
      </p>
      <ul className="list-disc list-inside ps-5 mb-4">
        <li>Tracking or behavioural monitoring of children.</li>
        <li>Targeted advertising directed at children.​</li>
      </ul>
      <p className="mb-3">
        If we discover that a minor's data has been collected without guardian
        consent, we will delete it immediately.{" "}
      </p>
      <h2 className="font-bold text-xl mb-4">
        8. Grievance Redressal Mechanism
      </h2>
      <p>
        If you have any questions, concerns, or complaints regarding this
        Privacy Notice or your data, please contact our designated Grievance
        Officer:
      </p>
      <ul className="list-disc list-inside ps-5 mb-4">
        <li><b>Name:</b> Ankita Singh</li>
        <li><b>Designation:</b> Grievance Officer</li>
        <li><b>Address:</b> {address.get()}</li>
      </ul>
      <p className="mb-3">We will respond to your grievance within 5 business days.</p>
      <h2 className="font-bold text-xl mb-4">
        9. Changes to This Privacy Notice
      </h2>
      <p>
        We may update this Privacy Notice from time to time to reflect changes
        in our practices or legal requirements. We will post any revised Privacy
        Notice on this page with an updated “Last Updated” date.{" "}
      </p>
    </div>
    
    </>
  );
};

export default PrivacyPolicy;
