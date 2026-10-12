import React from 'react'
import CourseContentHeading from './CourseContentHeading'
import { ArrowRight, Calculator, CheckCircle2, CreditCard } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cleanHTML } from '@/lib/cleanHTML';
import { useLeadForm } from '@/context/LeadFormContext';
import { useLeadGuard } from '../auth/useLeadGuard';
import { toast } from 'sonner';

const CoursePageFee = ({ id, courseData,screenSize,title, specializationData }) => {
  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();
  const feeDetails = specializationData?.sections?.course_fee_details ?? courseData?.sections?.course_fee_details;
  return (
     <div id={id} className='content_card'> 
    <CourseContentHeading title={title} />
    <div className="rich_text" dangerouslySetInnerHTML={{ __html: cleanHTML(feeDetails) }} />
     <Card className="border-0 rounded-xl shadow-none mb-6 bg-gray-50 py-2">
          <CardContent className="p-4 text-center">
            <p className="!text-xl font-semibold mb-1 text-green-600">
              EMI starting at ₹5,500/month only
            </p>
          

            <hr className="my-4" />

            <h4 className="font-bold mb-6">
              Invest in your career
            </h4>

            <div className="grid md:grid-cols-2 gap-2 text-left">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-green-600 mt-1" />
                <p>
                Boost your career growth with an industry-relevant online degree.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-green-600 mt-1" />
                <p>
                Get high ROI by securing high-paying job roles in leading MNCs.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-green-600 mt-1" />
                <p>
                Work Study:Implement framework to upskill without leaving job.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-green-600 mt-1" />
                <p>
                Hands-on modern digital tools to make students job-ready.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ROI Calculator */}
        <Card className="group relative mb-6 overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-white via-primary/5 to-primary/10">
       
          <CardContent className="relative flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-md ring-4 ring-primary/15 transition-transform duration-300 group-hover:scale-105">
                <Calculator className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <p className="mb-0! text-lg font-bold text-slate-900">
                    Calculate Your ROI
                  </p>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    Free Tool
                  </span>
                </div>
                <p className="mb-3 text-sm leading-relaxed text-slate-600">
                  Compare course fees with expected salary using NIRF placement
                  data - know your return before you enroll.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                    NIRF data
                  </span>
                  <span className="rounded-md bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                    Fee vs salary
                  </span>
                  <span className="rounded-md bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                    2-min estimate
                  </span>
                </div>
              </div>
            </div>
            <Link
              href="/tools/roi-calculator/"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg sm:w-auto"
            >
              Calculate Your ROI
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </CardContent>
        </Card>

        {/* Easy Payment Plan */}
        <Card className="border-none rounded-xl shadow-none  bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-bold !mb-0">Need Easy Payment Plans?
                </p>
                <p className="text-black !mb-0">
                Verify your EMI eligibility and select the best plan with expert support.

                </p>
              </div>
            </div>
            <button className=" rounded-full px-3 py-3 font-semibold bg-purple-600 transition-colors duration-300 hover:bg-purple-700">
              <span className="text-md text-nowrap cursor-pointer shadow-2xl  text-white px-4 py-2 rounded-full" onClick={(e) => {
                if (!withVerification()) {
                  e.preventDefault(); // ⛔ stop navigation
                  showLeadForm("check easy payment plans from course page fee");
                  return;
                }
                toast.success("Our counselor will contact you shortly to discuss the easy payment plans");
              }}>Check Plans</span>
            </button>
          </CardContent>
        </Card>
    </div>
  )
}

export default CoursePageFee
