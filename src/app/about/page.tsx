import AboutPage from "@/components/pages/about";
import { getSiteMetadata } from "@/lib/metadata";
import React from "react";

export const metadata = getSiteMetadata("/source-code");

function About() {
  return <AboutPage />;
}

export default About;
