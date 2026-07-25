import React from "react";
import Hero from "../home/hero";
import HeroDivider from "../home/hero-divider";
import Navbar from "../nav/nav-bar";

function HomePage() {
  return (
    <main className="overflow-x-clip">
      <Navbar />
      <Hero />
      <HeroDivider />
      <section className="h-[200vh] w-full"></section>
    </main>
  );
}

export default HomePage;
