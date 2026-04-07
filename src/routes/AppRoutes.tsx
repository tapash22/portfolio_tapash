import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import ScenePage from "../pages/ScenePage";
import { Experience } from "../pages/Experience";
import { Projects } from "../pages/Projects";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />

        <Route path="/scene" element={<ScenePage />} />
      </Routes>
    </BrowserRouter>
  );
}
