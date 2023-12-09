"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export type Item = {
  name: string;
  image: string;
  size: string;
  rep_reward: number;
  type: string;
  url: string;
  checked: boolean;
};

export const columns: ColumnDef<Item>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={item.image} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div>
            <Link
              key={row.id}
              href={`https://mytimeatsandrock.fandom.com/wiki/${item.name.replace(
                " ",
                "_"
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="font-medium hover:underline">{item.name}</div>
            </Link>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "size",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
  },
  {
    accessorKey: "rep_reward",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rep reward" />
    ),
  },
];
