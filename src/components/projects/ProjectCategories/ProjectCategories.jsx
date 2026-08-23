
// ==========================================================
// SHASAR SOLAR SYSTEM
// PROJECT CATEGORIES
// ==========================================================

import { motion } from "framer-motion";

import {
  ArrowRight,
  Home,
  Building2,
  Factory,
  BatteryCharging,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./projectCategories.css";

const ProjectCategories = () => {
  const navigate = useNavigate();

  // ========================================================
  // CATEGORY DATA
  // All categories navigate to the main Services page
  // ========================================================

  const categories = [
    {
      id: 1,
      title: "Residential Solar",
      description:
        "Smart solar solutions designed for villas and residential properties across the UAE.",
      icon: Home,
    },

    {
      id: 2,
      title: "Commercial Solar",
      description:
        "High-performance solar systems designed to reduce operational energy costs for businesses.",
      icon: Building2,
    },

    {
      id: 3,
      title: "Industrial Solar",
      description:
        "Large-scale solar installations engineered for warehouses, factories and industrial facilities.",
      icon: Factory,
    },

    {
      id: 4,
      title: "Energy Storage",
      description:
        "Advanced battery storage solutions for greater energy independence and reliable power.",
      icon: BatteryCharging,
    },
  ];

  // ========================================================
  // NAVIGATION
  // Every category goes to /services
  // ========================================================

  const handleCategoryClick = () => {
    navigate("/services");
  };

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <section
      className="project-categories"
      id="project-categories"
      aria-labelledby="project-categories-title"
    >
      <div className="container">

        {/* ==================================================
            SECTION HEADER
        ================================================== */}

        <motion.div
          className="project-categories__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          {/* Eyebrow */}

          <div className="project-categories__eyebrow">
            <span className="project-categories__eyebrow-line" />

            <span>Explore Our Expertise</span>
          </div>

          {/* Title */}

          <h2
            id="project-categories-title"
            className="project-categories__title"
          >
            Solar Solutions Built For{" "}
            <span>Every Project.</span>
          </h2>

          {/* Description */}

          <p className="project-categories__description">
            Explore our solar project categories and discover the solutions
            we provide for residential, commercial and industrial energy
            needs.
          </p>
        </motion.div>

        {/* ==================================================
            CATEGORY CARDS
        ================================================== */}

        <div className="row g-4">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <div
                className="col-12 col-sm-6 col-xl-3"
                key={category.id}
              >
                <motion.button
                  type="button"
                  className="project-category-card"
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={handleCategoryClick}
                  aria-label={`Explore ${category.title} services`}
                >
                  {/* ==================================================
                      ICON
                  ================================================== */}

                  <div className="project-category-card__icon">
                    <Icon
                      size={25}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* ==================================================
                      NUMBER
                  ================================================== */}

                  <span className="project-category-card__number">
                    0{index + 1}
                  </span>

                  {/* ==================================================
                      CONTENT
                  ================================================== */}

                  <div className="project-category-card__content">
                    <h3>{category.title}</h3>

                    <p>{category.description}</p>
                  </div>

                  {/* ==================================================
                      CTA
                  ================================================== */}

                  <span className="project-category-card__action">
                    <span>Explore Services</span>

                    <span className="project-category-card__arrow">
                      <ArrowRight size={16} />
                    </span>
                  </span>
                </motion.button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectCategories;
