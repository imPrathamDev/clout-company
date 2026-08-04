import { urlFor } from "@/sanity/lib/image";
import { LogListItem } from "@/sanity/queries/log";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GradualBlurMemo from "../gradual-blur";
import moment from "moment";

const Card = ({ item }: { item: LogListItem }) => {
  return (
    <Link href={"/log/" + item.slug} className="group">
      <div className="p-1 rounded-2xl transition-colors duration-300 group-hover:bg-gray-200/80">
        <div className="w-full aspect-square rounded-xl relative overflow-hidden">
          {item.mainImage && (
            <Image
              src={urlFor(item.mainImage).url()!}
              fill
              alt={item.mainImage.alt ?? item.title}
              placeholder="blur"
              blurDataURL={item.mainImage.asset.metadata.lqip}
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}

          <GradualBlurMemo
            target="parent"
            position="bottom"
            height="12rem"
            strength={2}
            divCount={5}
            curve="bezier"
            exponential
            opacity={1}
            className="gradual-blur"
          />

          <div className="w-full h-fit absolute bottom-[10%] group-hover:bottom-[15%] transition-all duration-500 left-0 px-6 pb-4 flex flex-col justify-center items-center gap-2 z-1000000000">
            <h3 className="text-center text-2xl font-medium text-background">
              {item.title}
            </h3>
            <p className="text-[0.75rem] text-background/80">
              Published On {moment(item.publishedAt).format("Do MMM, YYYY")}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

function LogList({ logs }: { logs: LogListItem[] }) {
  return (
    <section
      id="cards"
      className="2xl:px-30 xl:px-12 md:px-8 px-5 w-full mx-auto pt-20 pb-35 sm:pt-25 2xl:pt-30"
    >
      <div className="w-full">
        <div className="sm:px-4 mx-auto w-full max-w-7xl">
          <div className="flex items-center gap-4 text-[1rem] font-medium">
            <p className="text-[1rem] font-medium">
              Epiphanies amid execution ({logs.length})
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {logs.map((log) => (
              <Card item={log} key={log._id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LogList;
