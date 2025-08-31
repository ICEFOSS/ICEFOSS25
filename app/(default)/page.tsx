export const metadata = {
  title: "ICEFOSS 25'",
  description: "",
};

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";
import ContactUs from "@/components/contact-us";
import About from "@/components/about";
import Workshop from "@/components/workshop";
import CodeEdge from "@/components/codeedge";

export default function Home() {
  return (
    <>
      <PageIllustration />
      <Hero />
      <About />
      <Workshop />
      <CodeEdge />
      {/* <Testimonials /> */}
      {/* <Cta /> */}
      <ContactUs />
    </>
  );
}
