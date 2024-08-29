import { lazy } from "react";

export const services = [
  lazy(() => import("./Service1")),
  lazy(() => import("./Service2")),
  lazy(() => import("./Service3")),
];

export const getServicesComp = (index: number) => services[index];
