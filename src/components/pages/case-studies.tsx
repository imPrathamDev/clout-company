import React from "react";
import Navbar from "../nav/nav-bar";
import Footer from "../footer";
import CaseStudyGrid from "../case-study/grid";
import { CaseStudy } from "@/sanity/queries/caseStudy";

function CaseStudiesPage({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <main className="overflow-x-clip">
      <Navbar />
      <div className="" data-navbar-theme="light">
        <CaseStudyGrid caseStudies={caseStudies} />
      </div>
      <Footer />
    </main>
  );
}

export default CaseStudiesPage;
