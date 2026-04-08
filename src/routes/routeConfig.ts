import { lazy } from "react";

export const Home = lazy(() => import("../pages/Home"));
export const About = lazy(() => import("../pages/About"));
export const Experience = lazy(() => import("../pages/Experience"));
export const Projects = lazy(() => import("../pages/Projects"));
export const ScenePage = lazy(() => import("../pages/ScenePage"));

export const routeConfig = [
  { path: "", title: "Home", component: Home, index: true },
  { path: "about", title: "About", component: About },
  { path: "experience", title: "Experience", component: Experience },
  { path: "projects", title: "Projects", component: Projects },
  { path: "scene", title: "Scene", component: ScenePage },
];
