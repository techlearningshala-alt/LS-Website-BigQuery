import ToolInnerBanner from "@/components/tools/ToolInnerBanner";
import Head from "next/head";
import ToolsFaq from "@/components/tools/ToolsFaq";
import OtherTools from "@/components/tools/OtherTools";
import AttendanceTool from "@/components/tools/AttendanceTool";
import MainHeading from "@/components/custom/shared/MainHeading";


const FAQS = [
    {
      question: "What is an Attendance Calculator?",
      answer:
        "An Attendance Calculator is an online tool that calculates your attendance percentage and helps determine whether you meet the attendance criterion of your university to sit in the exam or to register for placements.",
    },
    {
      question: "How is attendance percentage calculated?",
      answer:
        "Attendance percentage is calculated using the following formula:\n\nAttendance Percentage = (Classes Attended ÷ Total Classes Conducted) × 100\n\nFor example, if you attended 72 out of 90 classes, your attendance is:\n\n(72 ÷ 90) × 100 = 80%",
    },
    {
      question: "Can this calculator tell me how many classes I can miss?",
      answer:
        "Yes. If your current attendance is above the required percentage, the calculator can estimate how many future classes you can miss while still remaining eligible.",
    },
    {
      question: "What is the minimum attendance required in colleges?",
      answer:
        "The minimum attendance requirement varies by institution. Most colleges and universities require 75% attendance, while some professional courses may require 80% or 85% attendance.",
    },
    {
      question: "Is this calculator suitable for schools and colleges?",
      answer:
        "Yes. It works for schools, colleges, universities, coaching institutes, and any educational institution that tracks attendance based on the number of classes attended.",
    },
    {
      question: "Why is attendance important?",
      answer:
        "Maintaining the required attendance is often mandatory for:\n\n• Appearing in semester or annual examinations\n• Participating in practical sessions\n• Meeting academic regulations\n• Remaining eligible for internships and campus placements (in some institutions).",
    },
    {
      question: "Is this Attendance Calculator free?",
      answer:
        "Yes. The Attendance Calculator is completely free to use and allows unlimited calculations without requiring registration or login.",
    },
  ];

const AttendanceCalculator = () => {
  return (
    <div>
      <Head>
        <title>Attendance Calculator - Free Online Tool | LearningShala</title>
        <meta
          name="description"
          content="Calculate your attendance percentage instantly for college applications, jobs, and scholarships."
        />
        <link
          rel="canonical"
          href="https://learningshala.com/tools/attendance-calculator/"
        />
      </Head>

      <ToolInnerBanner
        title="Attendance Calculator"
        description="Use this tool to calculate your attendance percentage instantly for college applications, jobs, and scholarships."
        category="Academic"
      />

      <section className="container mx-auto px-4 py-8 md:py-10">

      <div className="grid grid-cols-12 gap-4">
<div className="col-span-12 lg:col-span-9">
<AttendanceTool />
<div className="space-y-5">
        {/* What Is an Attendance Calculator? */}
        <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 mt-4">
           
            <MainHeading title="What Is an Attendance Calculator?" />

            <p>
                An Attendance Calculator is a tool that helps students figure out their current attendance 
                percentage and find out how many more classes they need to go to or how many they can safely 
                skip while still meeting the minimum attendance rule set by their school, college or university.
            </p>

            <p>
                Many schools and colleges ask students to keep an attendance of 75 percent, 
                80 percent or 85 percent to be allowed to take exams, do internships or join 
                other school activities. In this case, calculating attendance after every 
                class is much easier and gives correct numbers in a quick way.
            </p>

            <p>
                Just type in how many classes there have been, in total and how many of them 
                have you attended, you will get your attendance percentage instantly.
            </p>

          
        </div>

        {/*What Is Attendance Percentage? */}
        <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 mt-4">
  
            <MainHeading title="What Is Attendance Percentage?" />

            <p>
                Attendance percentage represents the proportion of classes you have attended 
                out of the total classes conducted.
            </p>

            <div className="rounded-2xl lg:p-4 mt-4">
                <p>For example :</p>

                <div className="rounded-xl bg-[#edf4ee] p-4 text-center mb-4 ">
                    <p>
                        If you attended 72 classes out of 90, your attendance percentage is : (72 ÷ 90) × 100 = 80%
                    </p>
                </div>

              <p>
               <b>Note : </b>Maintaining the required attendance helps ensure eligibility for examinations and academic assessments.
                </p>
            </div>
        </div>

        {/* Attendance Calculator Formula */}
        <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 mt-4">
          
          <MainHeading title="Attendance Calculator Formula" />

          <div className="rounded-xl bg-[#edf4ee] p-4 text-center lg:mx-4">
            <p>
              Attendance Percentage = (Classes Attended ÷ Total Classes Conducted) × 100
            </p>
          </div>
         
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 p-4">
              <p>Example 1</p>

              <ol className="space-y-2 text-gray-700 text-md md:text-lg">
                <li>Classes Attended = 90</li>
                <li>Total Classes = 120</li>
                <li>Attendance = (90 ÷ 120) × 100</li>
                <li className="font-semibold text-green-600">
                  Attendance = 75%
                </li>
              </ol>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6">
              <p>Example 2</p>

              <ol className="space-y-2 text-gray-700 text-md md:text-lg">
                <li>Classes Attended = 84</li>
                <li>Total Classes = 100</li>
                <li>Attendance = (84 ÷ 100) × 100</li>
                <li className="font-semibold text-green-600">
                  Attendance = 84%
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Why Use an Attendance Calculator? */}
        <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 mt-4">
        
          <MainHeading title="Why Use an Attendance Calculator?" />

          <p>
            Tracking attendance manually after every lecture can be time-consuming and lead to errors. 
            An Attendance Calculator helps you stay informed about your attendance status and plan your 
            classes accordingly.
          </p>

          <div className="mt-4 md:mt-6 rounded-2xl bg-rose-50 p-3 md:p-4">
            <p>
              Benefits :
            </p>

            <ul className="grid gap-2 md:grid-cols-2">
              {[
                "Calculates attendance instantly",
                "Helps maintain the required attendance percentage",
                "Shows classes you need to attend",
                "Calculates safe bunk limits",
                "Prevents exam eligibility issues",
                "Easy to use on mobile and desktop",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  
                  <img
                        src="https://learningshala.com/images/icons/check-mark.webp"
                        alt="Check"
                        width={30}
                        height={30}
                        className="mt-0.5 h-[30px] w-[30px] shrink-0"
                    />
                    
                  <span className="text-gray-700 text-sm md:text-md lg:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Uses */}
        <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 mt-4">
          
          <MainHeading title="Where Can You Use an Attendance Calculator?" />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Schools",
              "Colleges",
              "Universities",
              "Engineering colleges",
              "Medical colleges",
              "MBA and management institutes",
              "Professional certification courses",
              "Coaching institutes",
              
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-gray-300 p-3 transition hover:shadow-md"
              >
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

<ToolsFaq faqs={FAQS} />
  </div>
  <div className="col-span-12 lg:col-span-3">
  <OtherTools/>
</div>
</div>
      
      </section>
    </div>
  );
};

export default AttendanceCalculator;
