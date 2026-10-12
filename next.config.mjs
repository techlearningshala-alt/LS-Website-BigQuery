/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,

    remotePatterns: [
      // ✅ AWS S3 bucket
      {
        protocol: "https",
        hostname: "d34odytkc8nsi8.cloudfront.net",
        pathname: "/**",
      },
      // ✅ Your backend server
      {
        protocol: "https",
        hostname: "admin.learningshala.com",
        port: '4000',
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/videos/:path*",
        destination: "https://learningshala.com",
        permanent: true,
      },
      {
        source: "/playlists/:path*",
        destination: "https://learningshala.com",
        permanent: true,
      },
      {
        source: "/channels/:path*",
        destination: "https://learningshala.com",
        permanent: true,
      },
      {
        source: "/categories/:path*",
        destination: "https://learningshala.com",
        permanent: true,
      },
      {
        source: "/university",
        destination: "/universities",
        permanent: true, // use false if you may change it later
      },
      {
  source: "/videos/8-03-lect-14-accelerated-charges-poynting-vector-power-rayleigh-scattering",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/e46-laravel-5-8-tutorial-from-scratch-eloquent-relationships-one-to-many-hasmany-belongsto/12/5",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/5-why-should-we-hire-you-learn-how-to-answer-this-job-interview-question-with-this-1-tip/ch/30",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/subtracting-14-6-addition-and-subtraction-within-20-early-math/43/24",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/feynman-s-lectures-on-physics-the-relation-of-mathematics-and-physics",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/navigating-youtube-studio/48/26",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/part-25-codeigniter-4-tutorial-series-in-urdu-hindi-secure-your-content-with-authentication/34/5",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/playlists/python-tutorial-for-beginners",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/share-market-ka-sampooran-gyan-nifty-share-market-dr-vivek-bindra/50/2",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/vedic-math-a-new-perspective-of-mathematics-gaurav-tekriwal-tedxyouth-lmgc",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/channels/motivational-inspirational-value-addition",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/32-4-steps-to-effortlessly-boost-your-seo-traffic-increase-your-serp-click-through-rate/7/4",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/input-output-ports",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/what-is-google-adsense-how-to-create-or-setup-google-adsense-account-step-by-step-in-hindi/10/4",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/24-integrating-mysql-with-python-python-web-scraping-tutorial/69/31",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/device-management/ch/20",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/what-is-google-adsense-how-to-create-or-setup-google-adsense-account-step-by-step-in-hindi",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/tawk-to-tools-using-messaging-and-ticketing",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/powerful-inspirational-true-story-never-give-up/40/23",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/channels/e-book-summary-channel",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/amazon-affiliate-marketing-for-beginners-in-2020-tutorial-make-100-a-day/49/4",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/steve-jobs-secrets-of-life",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/software-concepts",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/6-secret-steps-to-nail-instagram-quality-photoshop-tutorial",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/memory-management",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/how-to-create-a-timelapse-with-opencv-and-python-opencv-python-tutorial-7",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/e18-laravel-5-8-tutorial-from-scratch-eloquent-route-model-binding-restful-controller-part-4/12/5",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/playlists/c-language",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/cyber-security-expert-mr-rakshit-tandon-talking-on-online-safety-for-school-children",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/playlists/memory-booster-techniques",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/playlists/blogging-niche",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/operating-system/ch/20",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/channels/teacher-amp-amp-39-s-tool",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/react-native-tutorial-21-navigating-around/81/29",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/5-what-are-metaphors-logo-design-course-class-5-in-urdu-hindi",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/the-secret-to-becoming-the-top-website-in-any-popular-niche-2017-better-alexa-rank/7/4",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/candlestick-charts-technical-analysis-series",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/what-is-epf-employee-provident-fund-withdrawal-and-interest-rate/84/6",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/muniba-mazari-we-all-are-perfectly-imperfect-english-subtitles/40/23",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/analytics-in-youtube-studio",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/learning-shala-faug-fearless-and-united-guard-official-teaser/24/15",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/hindi-seo-kaise-kam-karta-hai-part-3-seo-in-hindi-2020",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/randy-pausch-last-lecture-achieving-your-childhood-dreams/ch/23",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/channels/cyber-security",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/alia-bhatt-acting-by-tiktok-boy-ronit-05-ananya-pandey-acting-ronit-ashra/ch/15",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/4-ways-to-decrease-your-bounce-rate-rank-higher-in-google/7/4",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/cyber-security-expert-mr-rakshit-tandon-talking-on-online-safety-for-school-children/ch/28",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/8-01x-lect-24-rolling-motion-gyroscopes-very-non-intuitive/80/32",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/-stem-free-holiday-activities-for-kids-parents-teachers-hindi",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/1-python-web-scraping-tutorial-intro",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/javascript-es6-series-1-foreach-helper",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/google-classroom-teacher-training-2020-21-sy/88/34",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/public-provident-fund-ppf-account-benefits-calculator-interest-rate-rules/17/6",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/part-30-codeigniter-4-tutorial-series-in-urdu-hindi-10-authenticate-users-using-social-media",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/binary-number-system",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/8-01x-lect-27-fluid-mechanics-hydrostatics-pascal-s-principle-atmosph-pressure",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/react-native-tutorial-1-introduction-1/ch/29",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/part-09-codeigniter-4-tutorial-series-in-urdu-hindi-working-with-databases-with-query-builder-class",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/remove-matte-from-layer-in-photoshop-urdu-hindi/26/16",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/19-parsing-json-web-scraping-tutorial/69/31",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/part-12-codeigniter-4-tutorial-series-in-urdu-hindi-how-to-do-simple-crud-operation-using-model/34/5",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/channels/physics",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/english-speech-sundar-pichai-you-will-prevail-english-subtitles/82/30",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/free-ssl-certificate-for-your-website-with-cloudflare-full-end-to-end-encryption-with-free-https/ch/4",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/playlists/body-language",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/brush-tool-adobe-photoshop-for-beginners-class-5-urdu-hindi/ch/16",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/chanaykya-ki-vo-7-strategies-jo-app-nhi-jante-dr-vivek-bindra/50/2",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/analytics-advanced-mode-in-youtube-studio/48/26",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/youtube-self-certification-program-for-monetizing-creators/48/26",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/top-10-high-traffic-hindi-blogs-blogging-in-hindi",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/primary-memory/ch/20",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/8-02x-lect-13-moving-charges-in-b-fields-cyclotrons-mass-spectrometers-lhc/ch/32",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/turning-trash-into-toys-for-learning-arvind-gupta",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/playlists/corel-draw-tutorial",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/credit-card-vs-debit-card-what-is-credit-card-how-to-use-disadvantage-of-credit-card/ch/6",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/algebra-basics-graphing-on-the-coordinate-plane-math-antics/90/33",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/chanaykya-ki-vo-7-strategies-jo-app-nhi-jante-dr-vivek-bindra/ch/2",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/8-02x-lect-28-poynting-vector-oscillating-charges-polarization-radiation-pressure/ch/32",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/8-03-lect-13-electromagnetic-waves-solutions-to-maxwell-s-equations-polarization/80/32",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/html-tutorial-in-hindi-complete-html-course-for-beginners-to-advanced/ch/16",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/8-02x-lect-33-double-slit-interference-interferometers",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/-43-loader-in-ajax-helper-in-mvc-mvc-tutorial-for-beginners-in-net-c/79/5",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/8-02x-lect-12-first-exam-review/80/32",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/how-do-ssds-work-how-does-your-smartphone-store-data-insanely-complex-nanoscopic-structures/94/36",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/5-why-should-we-hire-you-learn-how-to-answer-this-job-interview-question-with-this-1-tip/63/30",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/react-native-tutorial-34-using-react-native-paper/58/29",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/gaurav-tekriwal-a-lesson-in-vedic-mathematics/ch/9",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/part-03-codeigniter-4-tutorial-series-in-urdu-hindi-cli-tools-spark-cli-tool-builds-cli-tool/34/5",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/vedic-math-a-new-perspective-of-mathematics-gaurav-tekriwal-tedxyouth-lmgc/23/9",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/algebra-basics-what-are-functions-math-antics",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/algebra-basics-the-distributive-property-math-antics",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/algebra-basics-slope-and-distance-math-antics",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/86-jason-silva-on-superstition-brain-games/5/3",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/making-5-basic-addition-and-subtraction-early-math-khan-academy",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/create-transparent-pngs-with-shadows-photoshop-tutorial/ch/16",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/stroke-on-path-adobe-photoshop-for-beginners-last-class-28-urdu-hindi/ch/16",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/45-brain-magic-the-faces-illusion-brain-games/5/3",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/brain-games-addiction-part-03/ch/3",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/2-what-are-your-strengths-learn-how-to-answer-this-job-interview-question/63/30",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/videos/10-sounds-that-make-you-go-barf-brain-games/5/3",
  destination: "https://learningshala.com",
  permanent: true,
},
{
  source: "/terms",
  destination: "/term-and-conditions",
  permanent: true,
},
      
    ];
  },

};

export default nextConfig;
