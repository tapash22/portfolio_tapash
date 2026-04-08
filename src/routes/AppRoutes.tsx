import { BrowserRouter, useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Layout } from "../componants/layout/Layout";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const ScenePage = lazy(() => import("../pages/ScenePage"));
const Experience = lazy(() => import("../pages/Experience"));
const Projects = lazy(() => import("../pages/Projects"));

function AppRoutesElement() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "experience", element: <Experience /> },
        { path: "projects", element: <Projects /> },
        { path: "scene", element: <ScenePage /> },
      ],
    },
  ]);

  return routes;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <AppRoutesElement />
      </Suspense>
    </BrowserRouter>
  );
}
