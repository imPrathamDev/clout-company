import LogPage from "@/components/pages/log";
import { getAllLogs } from "@/sanity/queries/log";
import React from "react";

async function Log() {
  const logs = await getAllLogs();
  return <LogPage logs={logs} />;
}

export default Log;
