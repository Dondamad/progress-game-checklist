"use client";
import Image from "next/image";
import Link from "next/link";

import { PageHeader, PageHeaderHeading } from "@/components/page-header";

const games = [
  {
    id: "My_Time_at_Sandrock",
    title: "My Time at Sandrock",
    wikiUrl: "https://mytimeatsandrock.fandom.com/",
    coverImage: "/images/mytimeatsandrock_cover.jpg",
    tracker: [
      { id: "Museum_donations", name: "Museum donations", desc: "" },
      // { id: "dawdad", name: "Museum adad", desc: "" },
    ],
  },
];

const imageLoader = ({ src }: { src: string }) => {
  return `${src}`;
};

export default function GameList() {
  return (
    <div className="container relative">
      <PageHeader className="pb-8">
        <PageHeaderHeading>
          Track the progress of the games you play.
        </PageHeaderHeading>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {games.map((game) => (
          <div
            key={game.id}
            className="relative flex bg-clip-border rounded-xl shadow-md w-full max-w-[48rem] flex-row  border bg-card text-card-foreground "
          >
            <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
              <Image
                loader={imageLoader}
                src={game.coverImage}
                alt=""
                width={400}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              {/* <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                startups
              </h6> */}
              <h4 className="block uppercase mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {game.title}
              </h4>
              {/* <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                Like so many organizations these days, Autodesk is a company in
                transition. It was until recently a traditional boxed software
                company selling licenses. Yet its own business model disruption
                is only part of the story
              </p> */}

              {game.tracker.map((track) => (
                <Link
                  key={track.id}
                  href={`/${game.id}/${track.id}`}
                  className="flex items-center gap-2 px-6 py-3 text-base font-sans text-left md:text-center uppercase hover:underline underline-offset-2 transition-all rounded-lg select-none"
                >
                  {track.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    className="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    ></path>
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
