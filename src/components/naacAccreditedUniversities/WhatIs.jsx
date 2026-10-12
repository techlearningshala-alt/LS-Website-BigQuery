import React from "react";
import Image from "next/image";
import MainHeading from "../custom/shared/MainHeading";
import { Card } from "../ui/card";

const frameworks = [
  {
    title: "Binary Accreditation Framework",
    description: (
      <>
        , which assesses institutions as “<strong>Accredited</strong>” or “
        <strong>Not Accredited</strong>”
      </>
    ),
  },
  {
    title: "Maturity-Based Graded Levels (MBGL)",
    description:
      ", which recognizes institutions based on their level of maturity and quality excellence.",
  },
];

const criteria = [
  {
    title: "Curricular Aspects:",
    text: "Evaluates the quality, relevance, and implementation of the institution’s curriculum.",
  },
  {
    title: "Teaching-Learning & Evaluation:",
    text: "Assesses teaching methods, faculty quality, student learning, and evaluation practices.",
  },
  {
    title: "Research, Innovations & Extension:",
    text: "Measures research activities, innovation, publications, and community engagement.",
  },
  {
    title: "Infrastructure & Learning Resources:",
    text: "Examines classrooms, laboratories, libraries, technology, and other facilities.",
  },
  {
    title: "Student Support & Progression:",
    text: "Assesses student support services, placements, progression, scholarships, and development.",
  },
  {
    title: "Governance, Leadership & Management:",
    text: "Evaluates institutional leadership, governance practices, planning, and resource management.",
  },
  {
    title: "Institutional Values & Best Practices:",
    text: "Assesses inclusivity, professional ethics, environmental initiatives, and institutional best practices.",
  },
];

const gradingRows = [
  {
    grade: "A++",
    range: "3.51 – 4.00",
    indicates: "Accredited at the highest grade level",
  },
  {
    grade: "A+",
    range: "3.26 – 3.50",
    indicates: "Very high level of institutional quality",
  },
  {
    grade: "A",
    range: "3.01 – 3.25",
    indicates: "High level of institutional quality",
  },
  {
    grade: "B++",
    range: "2.76 – 3.00",
    indicates: "Good level of institutional quality",
  },
  {
    grade: "B+",
    range: "2.51 – 2.75",
    indicates: "Above-average institutional quality",
  },
  {
    grade: "B",
    range: "2.01 – 2.50",
    indicates: "Satisfactory level of institutional quality",
  },
  {
    grade: "C",
    range: "1.51 – 2.00",
    indicates: "Basic level of institutional quality",
  },
  {
    grade: "D",
    range: "≤ 1.50",
    indicates: "Not accredited",
  },
];

const verifySteps = [
  <>
    Visit its official website at{" "}
    <a
      href="http://naac.gov.in"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#e62a38] hover:underline"
    >
      naac.gov.in
    </a>
  </>,
  <>
    Navigate to the <strong>Accreditation Status</strong> section
  </>,
  <>Click Accreditation status of Universities and Colleges</>,
  <>
    Select institution type (College/Univerisity), state, or directly search the
    institution name
  </>,
  <>
    View the official NAAC accreditation letter to verify CGPA, Grade, and
    validity
  </>,
];

const SectionCard = ({ title, children }) => (
  <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
    <h2 className="mb-4 text-xl font-bold md:text-3xl lg:mb-6">{title}</h2>
    {children}
  </div>
);

const WhatIs = () => {
  return (
    <section className="container mx-auto px-4 sec_mb">
      <div className="space-y-5">
        <div className="p-8 rounded-2xl border border-gray-200 bg-white">
            <MainHeading title="What is NAAC Accreditation?" className="!mb-4" />
          <p className="mb-4">
            National Assessment and Accreditation Council (NAAC) is a quality
            assessment given to higher education institutions in India based on
            academic performance and overall institutional quality. It
          </p>
          <p className="mb-4">
            It is an autonomous body established by the University Grants
            Commission (UGC) in 1994. It provides ratings from A++ to D by
            evaluating areas such as teaching, research, infrastructure, student
            support, and governance.
          </p>
          <p className="mb-4">
            NAAC has also introduced two frameworks to evaluate institutions:
          </p>
          <ul className="grid gap-2">
            {frameworks.map((item) => (
              <li key={item.title} className="flex items-start gap-2">
                <Image
                  src="/images/icons/check-mark.webp"
                  alt="Check"
                  width={30}
                  height={30}
                  className="mt-0.5 h-[30px] w-[30px] shrink-0"
                />
                <span className=" text-gray-700">
                  <strong>{item.title}</strong>
                  {item.description}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 rounded-2xl border border-gray-200 bg-white">
            <MainHeading title="What are the NAAC Assessment Criteria?" className="!mb-4" />
          <p className="mb-4">
            NAAC uses these 7 criteria to evaluate the quality of education in
            the respective institutions.
          </p>
          <ol className="space-y-3">
            {criteria.map((item, index) => (
              <li
                key={item.title}
                className="flex items-start gap-2 text-gray-700"
              >
                <span className="shrink-0 font-semibold text-[#e62a38]">
                  {index + 1}.
                </span>
                <span>
                  <strong>{item.title}</strong> {item.text}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="p-8 rounded-2xl border border-gray-200 bg-white">
            <MainHeading title="NAAC Grading System" className="!mb-4" />
          <p className="mb-4">
            Under the traditional grading system, NAAC gives rankings to
            institutions based on their Cumulative Grade Point Average (CGPA).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="bg-rose-50">
                  <th className="border border-rose-100 px-4 py-3 text-left font-semibold text-gray-900">
                    NAAC Grade
                  </th>
                  <th className="border border-rose-100 px-4 py-3 text-left font-semibold text-gray-900">
                    CGPA Range
                  </th>
                  <th className="border border-rose-100 px-4 py-3 text-left font-semibold text-gray-900">
                    What It Indicates
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-50/50">
                {gradingRows.map((row) => (
                  <tr key={row.grade}>
                    <td className="border border-rose-100 px-4 py-3 font-semibold text-gray-900">
                      {row.grade}
                    </td>
                    <td className="border border-rose-100 px-4 py-3 text-gray-700">
                      {row.range}
                    </td>
                    <td className="border border-rose-100 px-4 py-3 text-gray-700">
                      {row.indicates}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-8 rounded-2xl border border-gray-200 bg-white">
            <MainHeading title="What is the Validity of NAAC Accreditation?" className="!mb-4" />
          <p className="mb-4">
            The NAAC accreditation certificate has a standard validity of 5 years
            from the date of approval. Additionally, HEIs can request a
            transition and reform extension under the new binary and MBGL
            framework.
          </p>
          <p>
            Also, institutions must submit Institutional Information for Quality
            Assessment (IIQA) during the final months of the validity period to
            get the NAAC accreditation in the next cycle.
          </p>
        </div>

        <div className="p-8 rounded-2xl border border-gray-200 bg-white">
            <MainHeading title="How to Verify NAAC Accreditation of Your Institution?" className="!mb-4" />
          <p className="mb-4">
            The institution must publish its original NAAC rating on its website.
            Also, you can verify its rating officially using these steps:
          </p>
          <ol className="space-y-3">
            {verifySteps.map((step, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-gray-700"
              >
                <span className="shrink-0 font-semibold text-[#e62a38]">
                  {index + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <div className="my-5 rounded-2xl bg-rose-50 px-4 py-4">
            <span className="text-xs text-gray-700 md:text-[15px]">
              <em>
                <strong>Note:</strong> You can also check the official
                accreditation letter through the{" "}
                <a
                  href="https://www.india.gov.in/services/details/check-accreditation-status-of-higher-education-institutes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e62a38] hover:underline"
                >
                  National Portal of India Services
                </a>{" "}
                or{" "}
                <a
                  href="https://www.ugc.gov.in/pdfnews/0646280_State-wise-list--of-colleges-accredited-by-NAAC.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e62a38] hover:underline"
                >
                  UGC State-wise List PDF
                </a>
                .
              </em>
            </span>
          </div>

          <p className="mb-4">
            The good part is that the NAAC accreditation also ensures the
            standard of education for the online and distance degrees as well. It
            even plays a vital role for universities in getting them approved by
            UGC-DEB to deliver online/distance programs.
          </p>
          <p className="mb-4">
            As per the{" "}
            <a
              href="https://learningshala.com/blog/ugc-deb-approved-online-universities-in-india/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e62a38] hover:underline"
            >
              UGC-DEB-approved university list
            </a>
            , only the universities that have either scored a minimum of 3.01
            NAAC score or are in the{" "}
            <a
              href="https://static-pages-on-learnigshala.vercel.app/nirf-rankings/2025"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e62a38] hover:underline"
            >
              NIRF
            </a>{" "}
            top-100 rank are eligible to deliver online or distance courses.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatIs;
