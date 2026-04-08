import { BrowserRouter, useRoutes } from "react-router-dom";
import { Suspense } from "react";
import { routeConfig } from "./routeConfig";
import { Layout } from "../componants/layout/Layout";

function AppRoutesElement() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: routeConfig.map((route) =>
        route.index
          ? { index: true, element: <route.component /> }
          : { path: route.path, element: <route.component /> },
      ),
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
