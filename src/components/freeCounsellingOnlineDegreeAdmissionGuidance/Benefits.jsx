import React from "react";

const BENEFITS = [
  {
    num: "01",
    title: "Sahi university, sahi course",
    body: "Aapke career goal ke hisaab se personalised recommendation — guesswork khatam.",
  },
  {
    num: "02",
    title: "Fees, EMI aur scholarship clarity",
    body: "EMI ₹2,500/month se shuru. Real fee structure, scholarships aur payment options — sab transparent, koi hidden charge nahi.",
  },
  {
    num: "03",
    title: "Admission ka pura roadmap",
    body: "Documents se lekar deadline tak — step-by-step clarity, paperless process.",
  },
  {
    num: "04",
    title: "Placement aur career support",
    body: "Kaunsi university sach mein placement deti hai — hum honest picture denge.",
  },
];

const Benefits = () => {
  return (
    <section className="bg-[#1a1a1a] py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
            Benefits
          </p>
          <h2
            className={` mt-3 text-[2rem] leading-tight text-white sm:text-[2.35rem] md:text-[2.6rem] font-bold`}
          >
            Kya milega{" "}
            <span className="text-primary">is call</span> mein?
          </h2>
        </div>

        <div className="mt-10 grid md:mt-12 md:grid-cols-2">
          {BENEFITS.map(({ num, title, body }, index) => {
            const isLeft = index % 2 === 0;
            const isTop = index < 2;

            return (
              <div
                key={num}
                className={[
                  "py-7 md:py-9",
                  isLeft ? "md:pr-10 lg:pr-14" : "md:pl-10 lg:pl-14",
                  isLeft ? "md:border-r md:border-white/10" : "",
                  isTop || isLeft ? "border-b border-white/10" : "",
                  !isTop && isLeft ? "md:border-b-0" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <p
                  className={` text-2xl text-primary sm:text-[1.75rem]`}
                >
                  {num}
                </p>
                <h3
                  className={` mt-3 font-bold text-xl leading-snug text-white sm:text-[1.35rem]`}
                >
                  {title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[#a8a4a0] sm:text-[15px]">
                  {body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
