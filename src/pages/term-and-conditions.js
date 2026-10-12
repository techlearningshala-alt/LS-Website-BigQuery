import { globalStore } from "@/lib/store";
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

const Terms = () => {
  const { email, phone, address, companyName } = globalStore;
  const title = "Terms & Conditions | LearningShala - Website Use & Services";
  const description = "Read LearningShala’s terms and conditions covering website usage, services, user responsibilities, and legal policies for a safe and transparent experience.";
  const canonical = "https://learningshala.com/term-and-conditions/";
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key="description" name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
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
                "potentialAction": {
                  "@type": "ReadAction",
                  "target": `${canonical}`
                }
              }
            ),
          }}
        />

        <script
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
                    "name": "Terms & Conditions",
                    "item": `${canonical}`
                  }
                ]
              }
            ),
          }}
        />

      </Head>

      <div class="container sec_mb">
        <div className="bg-[#faf9f7] py-8 px-6 rounded-2xl mb-6 flex flex-col items-center justify-center">
          {" "}
          <Breadcrumb className="text-center">
            <BreadcrumbList className="mb-3">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/term-and-conditions">Terms & Conditions</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold mb-2">
            Terms & Conditions
          </h1>
        </div>

        <div className="rich_text">
          <p class="meta">
            <strong>Vagmine Education LLP</strong>
            <br />
            Effective Date: January 12, 2026
            <br />
            Last Updated: January 12, 2026
          </p>

          <p>
            These Terms & Conditions (“Terms”) govern your access to and use of
            <strong>
              {" "}
              <Link href="https://learningshala.com/">learningshala.com</Link>
            </strong>{" "}
            (the “Platform”), owned and operated by
            <strong> Vagmine Education LLP</strong>, a Limited Liability Partnership
            registered under the laws of India, with its registered office at {address.get()} (“Vagmine”, “LearningShala”,
            “we”, “us”, “our”).
          </p>

          <p>
            By accessing the Platform, submitting any enquiry/lead form, or using
            our free admission counselling services, you (“User”, “you”) agree to
            these Terms, our Privacy Notice, and any supplemental terms displayed on
            the Platform.
          </p>

          <h2>1. Who We Are & What We Do</h2>
          <p>
            LearningShala operates as a third-party admission facilitation platform.
            We connect students with Partner Universities/Institutions for
            undergraduate, postgraduate, and integrated degree programs (BBA+MBA,
            BCA+MCA, etc.).
          </p>

          <p class="highlight">Important Clarifications:</p>
          <ul className="list-disc list-inside ps-5 mb-4">
            <li>
              We are <strong>NOT</strong> a university and do <strong>NOT</strong>{" "}
              award degrees, certificates, or diplomas.
            </li>
            <li>
              We provide <strong>FREE</strong> counselling, eligibility assessment,
              application guidance, and lead referral services.
            </li>
            <li>
              Final admission decisions rest solely with the Partner
              University/Institution.
            </li>
          </ul>

          <h2>2. Eligibility</h2>
          <ul className="list-disc list-inside ps-5 mb-4">
            <li>
              You must be at least 18 years old or use the Platform through a
              parent/legal guardian if under 18.
            </li>
            <li>
              All information you provide must be true, accurate, and complete.
            </li>
            <li>You must not submit forged documents or impersonate others.</li>
          </ul>

          <h2>3. Free Services (No Payment Required)</h2>
          <ul className="list-disc list-inside ps-5 mb-4">
            <li>All LearningShala services are completely free.</li>
            <li>
              No fees, charges, deposits, or payments are required at any stage.
            </li>
            <li>
              Universities may charge their own fees directly, which are separate
              from LearningShala.
            </li>
          </ul>

          <h2>4. How We Use Your Information</h2>
          <ul className="list-disc list-inside ps-5 mb-4">
            <li>Assess eligibility for Partner University programs.</li>
            <li>Contact you via phone, SMS, WhatsApp, or email.</li>
            <li>Share your details with Partner Universities with your consent.</li>
            <li>Universities contact you directly for admission processes.</li>
          </ul>

          <p>Your data is protected under our DPDP-compliant Privacy Notice.</p>

          <h2>5. Partner Universities & Third Parties</h2>
          <p>
            Partner Universities make independent admission decisions. LearningShala
            cannot influence, guarantee, or be held responsible for admission
            outcomes, fees, refunds, or course changes.
          </p>

          <p>
            The Platform may link to third-party websites or services. We are not
            responsible for their content or policies.
          </p>

          <h2>6. User Conduct</h2>
          <ul className="list-disc list-inside ps-5 mb-4">
            <li>Submit false or forged documents</li>
            <li>Use the Platform for illegal or abusive purposes</li>
            <li>Attempt unauthorized system access</li>
            <li>Share login credentials (if applicable)</li>
          </ul>

          <h2>7. Platform Availability</h2>
          <p>
            The Platform is provided “as is” and “as available.” We are not liable
            for downtime, maintenance, or technical issues.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            All content on learningshala.com is owned by Vagmine Education LLP or
            licensed to us. Personal, non-commercial use is permitted.
          </p>

          <h2>9. Disclaimers & Limitation of Liability</h2>
          <ul className="list-disc list-inside ps-5 mb-4">
            <li>No warranties are provided.</li>
            <li>No liability for admission outcomes or third-party failures.</li>
            <li>Maximum liability shall not exceed ₹1,000.</li>
          </ul>

          <h2>10. Termination</h2>
          <p>
            We may suspend or terminate access if you violate these Terms or submit
            fraudulent information.
          </p>

          <h2>11. Governing Law & Dispute Resolution</h2>
          <p>
            Governing Law: Laws of India
            <br />
            Jurisdiction: Courts of New Delhi, Delhi
          </p>

          <p>
            Grievance Officer Email:
            <a href="mailto:support@learningshala.com">support@learningshala.com</a>
          </p>

          <h2>12. Changes to Terms</h2>
          <p>
            We may update these Terms at any time. Continued use constitutes
            acceptance.
          </p>

          <h2>Contact Information</h2>
          <div class="bg-[#faf9f7] p-4 rounded-xl mb-6">
            <p className="font-bold text-lg">
              <strong>{companyName.get()}</strong>
            </p>
            <p className="font-bold text-lg">
              {" "}
              <b>Email:</b>{" "}
              <Link href={`mailto:${email.get()}`}>{email.get()}</Link>
            </p>
            <p className="font-bold text-lg">
              {" "}
              <b>Phone:</b> <Link href={`tel:${phone.get()}`}>{phone.get()}</Link>
            </p>
            <p className="font-bold text-lg">
              <b>Address:</b> {address.get()}
            </p>
          </div>

          <p class="highlight">
            By using <b>learningshala.com</b>, you acknowledge that
            you have read, understood, and agree to these Terms & Conditions.
          </p>
        </div>



      </div></>
  );
};

export default Terms;
