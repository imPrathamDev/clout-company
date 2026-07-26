import { LogDetail } from "@/sanity/queries/log";
import React from "react";
import Navbar from "../nav/nav-bar";
import Footer from "../footer";
import Content from "../single-log/content";

function SingleLogPage({ log }: { log: LogDetail }) {
  return (
    <main className="">
      <Navbar />
      <Content log={log} />
      <Footer />
    </main>
  );
}

export default SingleLogPage;
