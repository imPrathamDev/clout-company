import React from "react";
import Hero from "../home/hero";
import HeroDivider from "../home/hero-divider";
import Navbar from "../nav/nav-bar";
import Clients from "../home/clients";
import OrgWheel from "../home/org-wheel";
import Wheel from "../home/wheel";
import { BookCard } from "../home/card";
import WordSearchReveal from "../home/word-search-reveal";
import Footer from "../footer";
import Artifacts from "../home/artifacts";
import SocialMediaFlowChart from "../home/social-media-flow-chart";
import SocialPlatforms from "../home/social-platforms";

function HomePage() {
  return (
    <main className="overflow-x-clip">
      <Navbar />
      <Hero />
      <HeroDivider />
      <Clients />
      <Wheel />
      <Artifacts />
      <SocialPlatforms />
      <WordSearchReveal />
      <Footer />
    </main>
  );
}

export default HomePage;
