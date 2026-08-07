import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
// Future Pages
// import Projects from "../pages/Projects/Projects";
// import About from "../pages/About/About";
// import Team from "../pages/Team/Team";
// import Contact from "../pages/Contact/Contact";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Website Layout */}
        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/services" element={<Services />} />

          {/* Future Routes */}

          {/* <Route path="/projects" element={<Projects />} /> */}

          {/* <Route path="/about" element={<About />} /> */}

          {/* <Route path="/team" element={<Team />} /> */}

          {/* <Route path="/contact" element={<Contact />} /> */}

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;