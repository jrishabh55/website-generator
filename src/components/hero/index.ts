import { lazy } from "react";

export const hero = [
  lazy(() => import("./CenteredHero")),
  lazy(() => import("./BackgroundImageHero")),
  lazy(() => import("./SplitHero")),
];

export const getHeroComp = (index: number) => hero[index];
