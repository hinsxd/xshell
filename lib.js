import chalk from "chalk";

/**
 * @template T
 * @param {T[]} _arr
 * @returns {T[]}
 */
export function shuffleArr(_arr) {
  const arr = [..._arr];
  let i = arr.length;

  while (i > 0) {
    const j = Math.floor(Math.random() * i);
    i--;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const UNKNOWN_PLACEHOLDER = Symbol("UNKNOWN_PLACEHOLDER");
/**
 * @type {string[]}
 */
export const colors = [
  "#3182bd",
  "#6baed6",
  "#9ecae1",
  "#c6dbef",
  "#e6550d",
  "#fd8d3c",
  "#fdae6b",
  "#fdd0a2",
  "#31a354",
  "#74c476",
  "#a1d99b",
  "#c7e9c0",
  "#756bb1",
  "#9e9ac8",
  "#bcbddc",
  "#dadaeb",
  "#636363",
  "#969696",
  "#bdbdbd",
  "#d9d9d9",
]
export const shuffledcolors = shuffleArr(colors);