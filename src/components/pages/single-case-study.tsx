import { CaseStudy } from "@/sanity/queries/caseStudy";
import React from "react";
import Navbar from "../nav/nav-bar";
import Footer from "../footer";
import Content from "../case-study/content";

function SingleCaseStudyPage({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <main className="">
      <Navbar />
      <Content caseStudy={caseStudy} />
      <Footer />
    </main>
  );
}

export default SingleCaseStudyPage;
