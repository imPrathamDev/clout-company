import SingleLogPage from "@/components/pages/single-log";
import { getLogBySlug } from "@/sanity/queries/log";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

async function SingleLog({ params }: Props) {
  const { slug } = await params;

  const log = await getLogBySlug(slug);

  if (log === null) {
    notFound();
  }

  return <SingleLogPage log={log} />;
}

export default SingleLog;
