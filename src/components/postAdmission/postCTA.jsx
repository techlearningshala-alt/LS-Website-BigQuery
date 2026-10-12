import React from 'react'
import Link from "next/link";
import { ArrowRight, Compass, Sparkles } from "lucide-react";

const PostCTA = () => {
  return (
    <section className="sec_mb">
    <div className='container'>

      <div className="relative text-center max-w-3xl mx-auto">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-red-500 text-white">
          <Sparkles className="h-4 w-4" />
        </div>

        <h2 className="text-3xl md:text-3xl font-bold text-slate-900 mb-3">
        Ready to build a career, not just a degree?
        </h2>
        <p className="text-slate-600 text-base md:text-lg mb-8">
        Compare 100+ UGC-DEB-approved online universities over 40 factors under expert guidance and unlock support that stays with you long after graduation.

        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/courses"
            className="inline-flex w-full sm:w-auto min-w-[250px] items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary to-red-500 px-5 py-3 text-white font-semibold shadow-md transition-transform duration-200 hover:-translate-y-0.5"
          >
            <Compass className="h-4 w-4" />
            Explore Courses
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/universities"
            className="inline-flex w-full sm:w-auto min-w-[250px] items-center justify-center gap-2 rounded-xl border-2 border-primary/40 bg-white px-5 py-3 text-primary font-semibold transition-colors hover:bg-primary/5"
          >
            <Compass className="h-4 w-4" />
            Find Your University
          </Link>
        </div>
      </div>
    </div>
    </section>
  )
}

export default PostCTA