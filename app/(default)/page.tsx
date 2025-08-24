export const metadata = {
  title: "ICEFOSS 25'",
  description: "",
};

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";
import ContactUs from "@/components/contact-us";

export default function Home() {
  return (
    <>
      <PageIllustration />
      <Hero />
      <Workflows />
      <Features />
      {/* <Testimonials /> */}
      {/* <Cta /> */}
      <ContactUs />
    </>
  );
}
