import { urlFor } from "@/sanity/lib/image";
import { LogListItem } from "@/sanity/queries/log";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
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
            <p className="text-[12px] text-background/80">
              Published On {moment(item.publishedAt).format("Do MMM, YYYY")}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

function LogList({ logs }: { logs: LogListItem[] }) {
  const categories = useMemo(() => {
    const cs = logs
      .map((l) => l.categories)
      .flat()
      .filter((f) => f !== null);

    const obj: { [key: string]: number } = {};
    const uc_array: NonNullable<(typeof logs)[number]["categories"]> = [];
    cs.forEach((d) => {
      if (Object.hasOwn(obj, d._id)) {
        obj[d._id] = obj[d._id] + 1;
      } else {
        uc_array.push({ ...d });
        obj[d._id] = 1;
      }
    });

    return uc_array.map((c) => ({
      ...c,
      count: obj[c._id],
    }));
  }, [logs]);

  return (
    <section className="2xl:px-30 xl:px-12 md:px-8 px-5 w-full mx-auto pt-20 pb-35 sm:pt-25 2xl:pt-30">
      <div className="w-full">
        <div className="sm:px-4 mx-auto w-full max-w-7xl">
          <div className="flex items-center gap-4">
            <button className="text-[16px] font-medium">
              All <span className="text-gray-500/50">{categories.length}</span>
            </button>

            {categories.map((category) => (
              <button
                key={category._id}
                className="text-[16px] font-medium flex items-center gap-1"
              >
                {category.title}
                <span className="text-gray-500/50">{category.count}</span>
              </button>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6">
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
