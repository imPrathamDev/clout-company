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

function HomePage() {
  return (
    <main className="overflow-x-clip">
      <Navbar />
      <Hero />
      <HeroDivider />
      <Clients />
      <Wheel />
      <Artifacts />
      <WordSearchReveal />
      <Footer />
    </main>
  );
}

export default HomePage;
