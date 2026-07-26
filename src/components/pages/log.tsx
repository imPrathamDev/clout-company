import React from "react";
import Navbar from "../nav/nav-bar";
import Hero from "../log/hero";
import { LogListItem } from "@/sanity/queries/log";
import LogList from "../log/list";
import Footer from "../footer";

function LogPage({ logs }: { logs: LogListItem[] }) {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <LogList logs={logs} />
      <Footer />
    </main>
  );
}

export default LogPage;
