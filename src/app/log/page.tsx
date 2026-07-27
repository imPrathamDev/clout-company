import LogPage from "@/components/pages/log";
import { getSiteMetadata } from "@/lib/metadata";
import { getAllLogs } from "@/sanity/queries/log";
import React from "react";

export const metadata = getSiteMetadata("/log");

async function Log() {
  const logs = await getAllLogs();
  return <LogPage logs={logs} />;
}

export default Log;
