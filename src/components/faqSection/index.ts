import { lazy } from "react";

export const faqs = [
  lazy(() => import("./FaqAccordion")),
  lazy(() => import("./FaqCard")),
  lazy(() => import("./FaqGrid")),
];

export const getFaqComp = (index: number) => faqs[index];
