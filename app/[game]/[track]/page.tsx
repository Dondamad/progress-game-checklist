"use client";

import React, { useState, useEffect } from "react";

import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/components/page-header";
import { Item, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

const fetchItems = async (): Promise<Array<Item> | string> => {
  try {
    const response = await fetch("/data/mtas/museum-donations.json");

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();

    return result.items;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array or handle the error as needed
  }
};

function parseHash(c: Item[], hash: string) {
  if (hash.length < 2 || hash.charAt(0) !== "#") {
    return;
  }

  hash = hash.substring(1);

  const n = Math.min(c.length, hash.length);
  for (let i = 0; i < n; i++) {
    const v = hash.charAt(i);
    if (v === "1") {
      c[i].checked = true;
    } else {
      c[i].checked = false;
    }
  }

  return c;
}

function buildHash(items: Item[], selectedItem: any) {
  const arr: string[] = ["#"];
  items.forEach((item, index) => {
    item.checked = selectedItem[index] ? true : false;
    arr.push("" + (selectedItem[index] ? "1" : "0"));
  });
  return arr.join("");
}

export default function TrackList({
  params,
}: {
  params: { game: string; track: string };
}) {
  const [dataItems, setDataItems] = useState<Item[]>([]);
  // console.log(params);

  useEffect(() => {
    const fetchData = async () => {
      const items = await fetchItems();
      const hash =
        localStorage.getItem("mtas:museum_donations_checked") ??
        window.location.hash;
      console.log(hash);

      const parsedData = parseHash(items as Item[], hash);
      setDataItems(parsedData || (items as Item[])); // Set data after parsing the hash
    };

    fetchData();
  }, []); // Empty dependency array to run only on mount

  // console.log(data);

  const handleRowSelect = (state: any) => {
    const checkedItems = buildHash(dataItems, state);
    // window.location.hash = checkedItems;
    if (checkedItems.includes("1")) {
      localStorage.setItem("mtas:museum_donations_checked", checkedItems);
    } else {
      localStorage.removeItem("mtas:museum_donations_checked");
    }
  };

  return (
    <>
      <div className="container relative">
        <PageHeader className="pb-8">
          <PageHeaderHeading className="uppercase">
            {params.track.replaceAll("_", " ")}
          </PageHeaderHeading>
          <PageHeaderDescription>
            The Museum accepts a variety of items, including tools, weapons,
            relics, clothing, accessories, and crafting stations.
          </PageHeaderDescription>
        </PageHeader>
        <div className="h-full flex-1 flex-col space-y-8 px-4 md:flex">
          <DataTable
            data={dataItems}
            columns={columns}
            onSelectedRowsChange={handleRowSelect}
          />
        </div>
      </div>

      <div className="my-6 pt-6">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          Pictures and a lot of information taken from{" "}
          <a
            // href={siteConfig.links.twitter}
            href={`https://${params.game.replaceAll("_", "")}.fandom.com/f`}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            {params.game.replaceAll("_", " ")} Wiki | FANDOM powered by Wikia
          </a>{" "}
          under{" "}
          <a
            // href={siteConfig.links.twitter}
            href={"https://www.fandom.com/licensing"}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            CC BY-SA license.
          </a>
        </p>
      </div>
    </>
  );
}
