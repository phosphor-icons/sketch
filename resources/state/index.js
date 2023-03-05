import { atom, selector } from "recoil";
import Fuse from "fuse.js";
import { IconStyle } from "@phosphor-icons/core";

import { icons } from "../lib";

const fuse = new Fuse(icons, {
  keys: [
    { name: "name", weight: 4 },
    { name: "pascal_name", weight: 4 },
    "tags",
    "categories",
  ],
  threshold: 0.2, // Tweak this to what feels like the right number of results
  // shouldSort: false,
  useExtendedSearch: true,
});

export const systemDarkModeAtom = atom({
  key: "systemDarkMode",
  default: window.matchMedia("(prefers-color-scheme: dark)").matches,
});

export const iconWeightAtom = atom({
  key: "iconWeightAtom",
  default: IconStyle.REGULAR,
});

export const searchQueryAtom = atom({
  key: "searchQueryAtom",
  default: "",
});

export const filteredQueryResultsSelector = selector({
  key: "filteredQueryResultsSelector",
  get: ({ get }) => {
    const query = get(searchQueryAtom).trim().toLowerCase();
    if (!query) return icons;

    return new Promise((resolve) =>
      resolve(fuse.search(query).map((value) => value.item))
    );
  },
});
