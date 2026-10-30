import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/navbar/Navbar";
import Footer from "./components/layout/footer/Footer";

import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import Services from "./pages/Services/Services";
import Pricing from "./pages/Pricing/Pricing";
import Team from "./pages/Team/Team";
import Contact from "./pages/Contact/Contact";

const App = () => {
  return (
    <>
      {/* ==========================================
          GLOBAL NAVBAR
      ========================================== */}
      <Navbar />

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}
      <main>
        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* SERVICES */}
          <Route
            path="/services"
            element={<Services />}
          />

          {/* PROJECTS */}
          <Route
            path="/projects"
            element={<Projects />}
          />

          {/* PRICING */}
          <Route
            path="/pricing"
            element={<Pricing />}
          />
          {/* TEAM */}
          <Route
            path="/team"
            element={<Team />}
          />
          {/* CONTACT */}
          
          <Route
            path="/contact"
            element={<Contact />}
          />
         

        </Routes>
      </main>

      {/* ==========================================
          GLOBAL FOOTER
      ========================================== */}
      <Footer />
    </>
  );
};

export default App;