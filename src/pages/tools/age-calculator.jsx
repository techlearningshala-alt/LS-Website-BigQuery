import ToolInnerBanner from "@/components/tools/ToolInnerBanner";
import Head from "next/head";
import ToolsFaq from "@/components/tools/ToolsFaq";
import OtherTools from "@/components/tools/OtherTools";
import AgeTool from "@/components/tools/AgeTool";


const FAQS = [
    {
      question: "What is a Percentage Calculator?",
      answer:
        "A Percentage Calculator is an online tool that helps calculate percentages instantly. It can find percentages, determine discounts, and solve other percentage-related problems.",
    },
    {
      question: "How do I calculate the percentage of a number?",
      answer:
        "Use the formula:\n\nPercentage = (Value ÷ Total Value) × 100\n\nFor example, if you score 450 out of 500, your percentage is:\n\n(450 ÷ 500) × 100 = 90%",
    },
    {
      question: "How do I calculate 25% of a number?",
      answer:
        "Use the formula:\n\nValue = (25 ÷ 100) × Number\n\nFor example:\n\n25% of 800\n\n= 0.25 × 800\n\n= 200",
    },
    {
      question: "Can I use this calculator for exam marks?",
      answer:
        "Yes. You can calculate your exam percentage by entering the marks obtained and the total marks.",
    },
    {
      question: "Is this Percentage Calculator accurate?",
      answer:
        "Yes. The calculator uses standard mathematical formulas to provide accurate percentage calculations instantly.",
    },
    {
      question: "Is this Percentage Calculator free?",
      answer:
        "Yes. The calculator is completely free to use and offers unlimited calculations without registration or login.",
    },
  ];

const AgeCalculator = () => {
  return (
    <div>
      <Head>
        <title>Age Calculator - Free Online Tool | LearningShala</title>
        <meta
          name="description"
          content="Calculate your age instantly for college applications, jobs, and scholarships."
        />
        <link
          rel="canonical"
          href="https://learningshala.com/tools/age-calculator/"
        />
      </Head>

      <ToolInnerBanner
        title="Age Calculator"
        description="Know Your Exact Age in Seconds! Just enter your date of birth, choose the calculation date, and let us do the math for you."
        category="Academic"
      />

      <section className="container mx-auto px-4 py-8 md:py-10">

      <div className="grid grid-cols-12 gap-4">
<div className="col-span-12 lg:col-span-9">
<AgeTool />
<div className="space-y-5">
        {/* What is Percentage Calculator */}
        <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 mt-4">
          <h2 className="mb-2 md:mb-4 text-lg md:text-2xl font-bold text-gray-900">
            What Is a Percentage Calculator?
          </h2>

          <p className="mb-2 md:mb-4 leading-relaxed text-gray-700 text-sm md:text-md lg:text-lg">
            A Percentage Calculator is a tool that helps you
            solve percentage-based calculations quickly and accurately. Whether
            you want to find the percentage of a number, calculate percentage
            increase or decrease, or determine the value of a percentage of a
            number, this calculator gives instant and accurate results.
          </p>

          <p className="leading-relaxed text-gray-700 text-sm md:text-md lg:text-lg">
            Percentages are widely used in academics, finance, business,
            shopping, taxation, banking, and daily calculations. Instead of
            performing manual calculations, simply enter the required values and
            get the answer within seconds.
          </p>

          <div className="mt-4 md:mt-6 rounded-2xl bg-rose-50 p-3 md:p-4">
            <p className="mb-4 text-md md:text-lg font-semibold text-gray-900">
              It helps you:
            </p>

            <ul className="grid gap-2 md:grid-cols-2">
              {[
                "Find the percentage of a number",
                "Calculate percentage increase or decrease",
                "Determine what percentage one value is of another",
                "Calculate discounts and savings",
                "Compute tax, GST, and commissions",
                "Analyze exam scores and business data",
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

        {/* What is Percentage */}
        <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 mt-4">
          <h2 className="mb-2 text-lg md:text-2xl font-bold text-gray-900">
            What Is a Percentage?
          </h2>

          <p className="leading-relaxed text-gray-700 text-sm md:text-md lg:text-lg">
            A percentage is a mathematical expression that represents a value
            as a fraction of 100. The word <strong>"percent"</strong> literally
            means <strong>"per hundred."</strong>
          </p>

          <div className="rounded-2xl p-4 mt-4">
              <p className="mb-2 text-md md:text-lg font-semibold">For example :</p>

              <ol className="space-y-2">
                {[
                    "50% means 50 out of every 100",
                    "25% means 25 out of every 100",
                    "100% means the complete value",
                ].map((item, index) => (
                    <li
                    key={index}
                    className="flex items-start gap-3 text-md text-gray-700 md:text-lg"
                    >
                    <img
                        src="https://learningshala.com/images/icons/check-mark.webp"
                        alt="Check"
                        width={30}
                        height={30}
                        className="mt-0.5 h-[30px] w-[30px] shrink-0"
                    />

                    <span>{item}</span>
                    </li>
                ))}
                </ol>
              <p className="mt-4 italic leading-relaxed text-gray-700 text-sm md:text-md lg:text-lg">
               <b>Note : </b>Percentages make it easier to compare values, analyze growth, and express proportions.
                </p>
            </div>
        </div>

        {/* Formula 1 */}
        <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 mt-4">
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-gray-900">
            Formula to Find the Percentage of a Number
          </h2>

          <div className="rounded-xl bg-[#edf4ee] p-6 text-center">
            <p className="text-sm md:text-lg font-semibold text-green-800">
              Percentage = (Value ÷ Total Value) × 100
            </p>
          </div>
         
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 p-4">
              <p className="mb-4 text-md md:text-lg font-semibold">Example 1</p>

              <ol className="space-y-2 text-gray-700 text-md md:text-lg">
                <li>Obtained Marks = 420</li>
                <li>Total Marks = 500</li>
                <li>Percentage = (420 ÷ 500) × 100</li>
                <li className="font-semibold text-green-600">
                  Percentage = 84%
                </li>
              </ol>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6">
              <p className="mb-4 text-md md:text-lg font-semibold">Example 2</p>

              <ol className="space-y-2 text-gray-700 text-md md:text-lg">
                <li>Marks Obtained = 360</li>
                <li>Total Marks = 450</li>
                <li>Percentage = (360 ÷ 450) × 100</li>
                <li className="font-semibold text-green-600">
                  Result = 80%
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Formula 2 */}
        <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 mt-4">
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-gray-900">
            Formula to Calculate X% of a Number
          </h2>

          <div className="rounded-xl bg-[#edf4ee] p-6 text-center">
            <p className="text-sm md:text-lg font-semibold text-green-800">
              Value = (Percentage ÷ 100) × Number
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 p-6">
              <p className="mb-4 text-md md:text-lg font-semibold">Example 1</p>

              <ol className="space-y-2 text-gray-700 text-md md:text-lg">
                <li>Find 20% of 800</li>
                <li>Value = (20 ÷ 100) × 800</li>
                <li className="font-semibold text-green-600">Value = 160</li>
              </ol>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6">
              <p className="mb-4  text-md md:text-lg font-semibold">Example 2</p>

              <ol className="space-y-2 text-gray-700 text-md md:text-lg">
                <li>Find 15% of 2,000</li>
                <li>Value = (15 ÷ 100) × 2,000</li>
                <li className="font-semibold text-green-600">Result = 300</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Why Use */}
        <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 mt-4">
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-gray-900">
            Why Use a Percentage Calculator?
          </h2>

          <ul className="grid gap-4 md:grid-cols-2">
            {[
              "Provides instant and accurate results",
              "Useful for students, professionals, and businesses",
              "Eliminates manual calculation mistakes",
              "Assists in exam result calculations",
              "Helps calculate discounts, GST, profit, and loss",
              "Easy to use on mobile and desktop",
            ].map((item) => (
              <li
                key={item}
                className="flex rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 text-sm md:text-lg"
              >
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

        {/* Uses */}
        <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 mt-4">
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-gray-900">
            Where Is a Percentage Calculator Used?
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "School and college examinations",
              "Shopping discounts and offers",
              "Competitive exam score analysis",
              "Banking and finance",
              "Salary hikes and appraisals",
              "Tax and GST calculations",
              "Investment returns",
              "Business growth analysis",
              "Profit and loss calculations",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-gray-300 p-3 transition hover:shadow-md"
              >
                <p className=" text-gray-800 text-sm md:text-md lg:text-lg">{item}</p>
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

export default AgeCalculator;
