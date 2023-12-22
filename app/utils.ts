import { formatDistanceToNow, subDays, subMonths, subYears } from "date-fns";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SearchResult, SiteList } from "@/types.js";
import fs from "fs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to format dates
export const formatDate = (date: string | Date) => {
  const _date = new Date(date);
  const distance = formatDistanceToNow(_date, { addSuffix: true });
  return distance
    .replace(/less than a minute?/, "<1m")
    .replace(/ minutes?/, "m")
    .replace(/ hours?/, "h")
    .replace(/ days?/, "d")
    .replace(/ weeks?/, "w");
};

export async function getResults({
  query,
}: {
  query?: string;
}): Promise<SearchResult[]> {
  if (!query) return [];

  return [
    {
      id: 1,
      timestamp: new Date(),
      title: "Mock Title 1",
      description: "Mock Description 1",
      slug: "hello-world",
    },
    {
      id: 2,
      timestamp: new Date(),
      title: "Mock Title 2",
      description: "Mock Description 2",
      slug: "hello-world-2",
    },
  ];
}

export function getAvailableSites() {
  return JSON.parse(
    fs.readFileSync("sites.json", { encoding: "utf8" })
  ) as SiteList;
}

export const FILTER_TIMES = [
  { value: 0, label: "All Times" },
  { value: subDays(new Date(), 1), label: "1d ago" },
  { value: subDays(new Date(), 7), label: "7d ago" },
  { value: subDays(new Date(), 15), label: "15d ago" },
  { value: subMonths(new Date(), 1), label: "1m ago" },
  { value: subMonths(new Date(), 6), label: "6m ago" },
  { value: subYears(new Date(), 1), label: "1y ago" },
];
