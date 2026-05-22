// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
// import App from "./App.tsx";
import { LoadingProvider } from "./context/LoadingContext.tsx";
import AppRoutes from "./routes/AppRoutes.tsx";

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    // This helps force a refresh of the page if the GPU gets overwhelmed
    window.location.reload();
  });
}

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <LoadingProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </LoadingProvider>,
);
{
  /* <App /> */
}
{
  /* </StrictMode>, */
}
