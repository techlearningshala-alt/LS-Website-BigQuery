import React from 'react'
import { BriefcaseBusiness, CircleCheck, UsersRound } from "lucide-react";
import MainHeading from '../custom/shared/MainHeading';

const SupportService = () => {
  const services = [
    {
      id: "01",
      title: "Academic Support",
      description:
        "Assignment guidance, study material, live doubt-solving sessions, and LMS access — everything you need to stay ahead academically.",
      icon: BriefcaseBusiness,
      accent: "from-[#2d74e8] to-[#4f46e5]",
      edge: "bg-[#2d74e8]",
      iconBg: "bg-blue-100 text-[#2d74e8]",
      tags: ["LMS Access", "Live Webinars", "Assignment Help","Exam Schedule","Live Sessions Updates"],
    },
    {
      id: "02",
      title: "Scholarship Assistance",
      description:
        "We help you find, apply for, and secure scholarships, from government schemes to university grants, so cost never holds you back.",
      icon: UsersRound,
      accent: "from-[#a855f7] to-[#ec4899]",
      edge: "bg-fuchsia-500",
      iconBg: "bg-fuchsia-100 text-fuchsia-600",
      tags: ["Govt. Schemes", "Application Support", "EMI Guidance"],
    },
    {
      id: "03",
      title: "Alumni Community",
      description:
        "Join 1 lakh+ students on an exclusive platform. Network with peers, find mentors, and access events led by senior industry professionals.",
      icon: UsersRound,
      accent: "from-[#a855f7] to-[#ec4899]",
      edge: "bg-fuchsia-500",
      iconBg: "bg-fuchsia-100 text-fuchsia-600",
      tags: ["Alumni Directory", "1-on-1 Mentorship", "Exclusive Events"],
    },
    {
      id: "04",
      title: "Career Guidance",
      description:
        "Not sure where your degree takes you? Our experts map your strengths to career paths and keep your options open as you grow.",
      icon: UsersRound,
      accent: "from-[#a855f7] to-[#ec4899]",
      edge: "bg-fuchsia-500",
      iconBg: "bg-fuchsia-100 text-fuchsia-600",
      tags: ["Career Mapping", "Skills Assessment", "Goal Planning"],
    },
    {
      id: "05",
      title: "Placement Support",
      description:
        "Industry webinars, live projects with real companies, and a dedicated placement team that doesn't disappear after your degree ends.",
      icon: UsersRound,
      accent: "from-[#a855f7] to-[#ec4899]",
      edge: "bg-fuchsia-500",
      iconBg: "bg-fuchsia-100 text-fuchsia-600",
      tags: ["Resume Building", "Mock Interviews", "Job Referrals","Internship Opportunities"],
    },
    {
      id: "06",
      title: "Internship Access",
      description:
        "Real-world experience before you graduate. We connect you with internships that build your resume and open doors to full-time offers.",
      icon: UsersRound,
      accent: "from-[#a855f7] to-[#ec4899]",
      edge: "bg-fuchsia-500",
      iconBg: "bg-fuchsia-100 text-fuchsia-600",
      tags: ["Industry Tie-ups", "Stipend Roles", "Certificate Projects"],
    },
  ];

  return (
    <section className="sec_mb">
      <div className="text-center mb-8">
        <MainHeading title="Comprehensive Support Services" className="text-center !mb-2" />
        <p className="text-slate-600">
        6 pillars of support that cover every corner of your academic and professional life
        </p>
      </div>

      <div className="space-y-4 md:space-y-6">
        {services.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.id}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <span className={`absolute left-0 top-0 h-full w-1 ${item.edge}`} />

              <div className="grid grid-cols-12 gap-4 p-4 md:p-6 items-center">
                <div className="col-span-12 sm:col-span-2 lg:col-span-1">
                  <div
                    className={`mx-auto sm:mx-0 h-12 w-12 rounded-2xl bg-linear-to-br ${item.accent} text-white shadow-md flex items-center justify-center text-xl font-bold`}
                  >
                    {item.id}
                  </div>
                </div>

                <div className="col-span-12 sm:col-span-8 lg:col-span-9">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 mb-4">{item.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
                      >
                        <CircleCheck className="h-3.5 w-3.5 text-emerald-500" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* <div className="col-span-12 sm:col-span-2 text-center lg:text-right">
                  <div
                    className={`mx-auto lg:ms-auto h-15 w-15 rounded-3xl ${item.iconBg} flex items-center justify-center`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div> */}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  )
}

export default SupportService