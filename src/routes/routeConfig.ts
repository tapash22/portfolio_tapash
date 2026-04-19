import { lazy } from "react";

export const Home = lazy(() => import("../pages/Home"));
export const About = lazy(() => import("../pages/About"));
export const Service = lazy(() => import("../pages/Service"));
export const Portfolio = lazy(() => import("../pages/Portfolio"));
export const Blog = lazy(() => import("../pages/Blog"));
export const Contact = lazy(() => import("../pages/Contact"));

export const routeConfig = [
  { path: "", title: "Home", component: Home, index: true },
  { path: "about", title: "About", component: About },
  { path: "service", title: "Service", component: Service },
  { path: "portfolio", title: "Portfolio", component: Portfolio },
  { path: "blog", title: "Blog", component: Blog },
  { path: "contact", title: "Contact", component: Contact },
];

export const routeIndexMap = routeConfig.reduce(
  (acc, route, index) => {
    const path = route.index ? "/" : `/${route.path}`;
    acc[path] = index;
    return acc;
  },
  {} as Record<string, number>,
);
