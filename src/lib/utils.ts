import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomNumber = (max: number, min: number = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomItem = <T>(items: T[]): T => {
  return items[getRandomNumber(items.length - 1)];
};

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const Jsonify = <T extends object>(data: T) =>
  JSON.parse(JSON.stringify(data)) as T;
