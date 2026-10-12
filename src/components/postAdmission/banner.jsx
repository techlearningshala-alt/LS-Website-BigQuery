import React from 'react'
import { Badge } from '../ui/badge'
import { ArrowRight, Award, BookOpen, Briefcase, Building2, FileCheck, Phone, UserRound } from 'lucide-react'

const Banner = () => {
  const services = [
    { icon: Phone, label: "24/7 Help" },
    { icon: Award, label: "Scholarship Assistance" },
    { icon: BookOpen, label: "Assignment Preparation" },
    { icon: FileCheck, label: "Plagiarism Checker" },
    { icon: UserRound, label: "1:1 Career Guidance" },
    { icon: Building2, label: "Placement Assistance" },
    { icon: ArrowRight, label: "Internship Assistance" },
    { icon: Briefcase, label: "Job Assistance" },
  ];

  return (
    <div className=" rounded-3xl py-8 md:py-12  sec_mb bg-cover bg-center" style={{ backgroundImage: "url('/images/post_bg.webp')" }}>
    
    
<div>

<p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
Services for End-to-End


      </p>
      <h1 className="text-3xl max-w-3xl mx-auto font-semibold lg:text-5xl text-center mb-4 bg-linear-to-r from-primary via-red-600 to-fuchsia-600 bg-clip-text text-transparent leading-tight">
      Post Admission Services
      </h1>

      <p className="mx-auto max-w-3xl text-balance text-slate-600 lg:text-base text-center mb-6">
      Your Online Journey Doesn&apos;t End With Admission — It Begins There!
And with LearningShala on your side, you graduate with more than a degree.

      </p>

      <ul className="flex flex-wrap gap-2 justify-center mb-2 max-w-3xl mx-auto">
        {services.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label}>
              <Badge className="rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 py-1.5 px-3">
                <Icon className="text-emerald-400" />
                {item.label}
              </Badge>
            </li>
          );
        })}
      </ul>
</div>
    </div>
  )
}

export default Banner