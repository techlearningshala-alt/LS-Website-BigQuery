import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Logo from "./Logo";
import SocialShare from "./SocialShare";
import Link from "next/link";
import { globalStore } from "@/lib/store";

function FooterColumn({ title, children, className }) {
  return (
    <div className={className}>
      <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-200 border-b border-gray-500 pb-4">
        {title}
      </p>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children, external, className }) {
  return (
    <li>
      <Link
        href={href}
        className={`group inline-flex items-center gap-1 text-sm font-medium text-gray-300 transition-colors hover:text-gray-100 hover:font-semibold ${className}`}
      >
        <span className="line-clamp-2">{children}</span>
        {external && (
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
        )}
      </Link>
    </li>
  );
}

const Footer = ({ menuData }) => {
  const { email, phone } = globalStore;
  const ugCourses = menuData?.data?.["UG Courses"] ?? [];
  const pgCourses = menuData?.data?.["PG Courses"] ?? [];

  return (
    <footer className="bg-linear-to-br from-[#14181f] via-[#1b1d21] to-[#2a1215]">
      <div
        className="h-1 bg-linear-to-r from-primary via-[#f97316] to-primary"
        aria-hidden
      />

      <section className="py-10 md:py-14">
        <div className="container">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-8">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-4">
              <Logo />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-300">
                Because real growth begins when you feel seen, supported, and
                inspired!
              </p>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                <Link
                  href={`tel:${phone.get()}`}
                  className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary/30 hover:text-primary relative"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" />
                  </span>
                  {phone.get()}
                  <span className="absolute left-10px top-[-17px] bg-green-200 text-green-700 text-xs px-2 py-1 rounded-md">Toll Free</span>
                </Link>
                <Link
                  href={`mailto:${email.get()}`}
                  className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary/30 hover:text-primary"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="truncate">{email.get()}</span>
                </Link>
              </div>
            </div>

            <FooterColumn title="UG Courses" className="lg:col-span-2">
              {ugCourses.map((course) => (
                <FooterLink
                  key={course.course_id}
                  href={`/courses/${course.course_slug}`}
                >
                  {course.course_name}
                </FooterLink>
              ))}
              <FooterLink href="/category/ug-courses" external>
                View all
              </FooterLink>
            </FooterColumn>

            <FooterColumn title="PG Courses" className="lg:col-span-2">
              {pgCourses.map((course) => (
                <FooterLink
                  key={course.course_id}
                  href={`/courses/${course.course_slug}`}
                >
                  {course.course_name}
                </FooterLink>
              ))}
              <FooterLink href="/category/pg-courses" external>
                View all
              </FooterLink>
            </FooterColumn>

            <FooterColumn title="Resources" className="lg:col-span-2">
              {/* <FooterLink className="text-green-600! hover:text-green-500! font-bold!" href="/tools/roi-calculator/">ROI Calculator</FooterLink> */}
              <FooterLink href="/tools">Tools</FooterLink>
              <FooterLink href="/about">About us</FooterLink>
              <FooterLink href="/contact-us">Contact us</FooterLink>
              <FooterLink href="/blog">Blogs</FooterLink>
              <FooterLink href="/news">News</FooterLink>
              <FooterLink href="/career-sathi-channel-partner">Career Sathi Partner</FooterLink>
            </FooterColumn>

            <FooterColumn title="Legal" className="lg:col-span-2">
              <FooterLink href="/term-and-conditions">
                Terms & conditions
              </FooterLink>
              <FooterLink href="/privacy-policy">Privacy policy</FooterLink>
            </FooterColumn>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-slate-200 pt-8 md:flex-row">
            <p className="text-center text-sm text-gray-300 md:text-left">
              ©{" "}
              <span suppressHydrationWarning>
                {new Date().getFullYear()}
              </span>{" "}
              LearningShala. All rights reserved.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-300">
                Follow us
              </p>
              <SocialShare />
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
