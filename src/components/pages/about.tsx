import React from "react";
import Navbar from "../nav/nav-bar";
import Hero from "../about/hero";
import HeroDivider from "../home/hero-divider";
import Content from "../about/content";
import Footer from "../footer";

function AboutPage() {
  return (
    <main className="overflow-x-clip">
      <Navbar />
      <Hero />
      <HeroDivider />
      <Content />
      <Footer />
    </main>
  );
}

export default AboutPage;
