import Contactus from "@/components/custom/about/Contactus";
import Logo from "@/components/custom/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactUs } from "@/services/LeadService";
import { toast } from "sonner";
import { useState } from "react";
import Head from "next/head";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [contactUsData, setContactUsData] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await contactUs({
        ...data,
      });
      if (response.data.success === true) {
        setContactUsData(response.data.data);
        toast.success("Message sent successfully");
        reset();
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const title = "Contact LearningShala | Get Support, Course Queries & Help";
  const description = "Have questions about online courses or need support? Contact LearningShala via phone or email for quick assistance. Our team is here to help you. ";
  const canonical = "https://learningshala.com/contact-us/";


  return (
    <section>
      <Head>
      <title>{title}</title>
<meta key="description" name="description" content={description} />
<link rel="canonical" href={canonical} />
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:site_name" content="LearningShala" />
<meta property="og:image" content="https://learningshala.com/images/icons/logo.webp" />
<meta property="og:image:alt" content="LearningShala Logo" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="en_IN" />
<meta property="og:image:type" content="image/webp" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content="https://learningshala.com/images/icons/logo.webp" />
<meta name="twitter:image:alt" content="LearningShala Logo" />
<meta name="twitter:creator" content="@Learning_shala" />
<meta name="twitter:site" content="@Learning_shala" />

<script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(
                          {
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            "@id": `${canonical}#webpage`,
                            "url": `${canonical}`,
                            "name": title,
                            "description": description,
                            "inLanguage": "en-IN",
                            "isPartOf": {
                              "@id": "https://learningshala.com/#website"
                            },
                            "about": {
                              "@id": "https://learningshala.com/#organization"
                            },
                            "mainEntity": {
                              "@id": "https://learningshala.com/#organization"
                            },
                            "potentialAction": {
                              "@type": "ReadAction",
                              "target": `${canonical}`
                            },
                            "publisher": {
                              "@id": "https://learningshala.com/#organization"
                            }
                          }
                      ),
                    }}
                />



<script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(
                          {
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "@id": `${canonical}#breadcrumb`,
                            "itemListElement": [
                              {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://learningshala.com/"
                              },
                              {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Contact Us",
                                "item": `${canonical}`
                              }
                            ]
                          }
                      ),
                    }}
                />

            </Head>
      <div className="container">
        <div className="bg-[#faf9f7] py-8 px-6 rounded-2xl mb-6 flex flex-col items-center justify-center">
          {" "}
          <Breadcrumb className="text-center">
            <BreadcrumbList className="mb-3">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/contact-us">Contact Us</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
         <h1 className="text-3xl font-bold mb-2">
         Get in <span className="text-primary">Touch</span>
         </h1>
          <p>
          Contact us online or walk into our office for one-on-one support.
          </p>
        </div>

        <Contactus />
        <div className="grid grid-cols-12 gap-8 sec_mb">
          <div className="col-span-12 md:col-span-8">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1751.8426214490962!2d77.31689774772143!3d28.579212978255736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd1e3fa27021%3A0x132ccea9b8de6d68!2sLearningShala!5e0!3m2!1sen!2sin!4v1777295938036!5m2!1sen!2sin"
              width="100%"
              height="550"
              className="rounded-3xl"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              style={{width: "100%", height: "100%",border:0}}
            ></iframe>

          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col items-center justify-center">
        
            <div className="w-100 bg-gray-100 rounded-3xl p-6">
          <Logo />
          <div>
       <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
     <div className="relative mb-3">  <Input
              type="text" 
              placeholder="Name"
              className="text-sm h-12 bg-white"
              required
              {...register("name")}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="relative mb-3"> <Input
              type="email"
              placeholder="Email"
              className="text-sm h-12 bg-white"
              required
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>    
            <div className="relative mb-3"> <Input
            className="text-sm h-12 bg-white"
               {...register("phone")}
               inputMode="numeric"
               placeholder="Phone"
               onInput={(e) =>
                 (e.target.value = e.target.value
                   .replace(/\D/g, "")
                   .slice(0, 10))
               }
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
            <div className="relative mb-3"> <Textarea
              type="Message"
              placeholder="Message"
              className="text-sm h-30 bg-white"
              required
              {...register("message")}
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
            </div>
            <Button type="submit" className="w-full" size="xl">
              Submit
            </Button>
       </form>
          </div>
         
        </div>
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
