import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/navbar/Navbar";
import Footer from "./components/layout/footer/Footer";

import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import Services from "./pages/Services/Services";
// import Contact from "./pages/Contact/Contact";

const App = () => {
  return (
    <>
      {/* ==========================================
          Navbar
      ========================================== */}
      <Navbar />

      {/* ==========================================
          Main Content
      ========================================== */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/services"
            element={<Services />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          {/* <Route
            path="/contact"
            element={<Contact />}
          /> */}
        </Routes>
      </main>

      {/* ==========================================
          Footer
      ========================================== */}
      <Footer />
    </>
  );
};

export default App;