import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import Projects from "../pages/Projects/Projects";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Global Website Layout */}
      <Route element={<MainLayout />}>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Services */}
        <Route path="/services" element={<Services />} />

        {/* Projects */}
        <Route path="/projects" element={<Projects />} />

      </Route>

    </Routes>
  );
};

export default AppRoutes;