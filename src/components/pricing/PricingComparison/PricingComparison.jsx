
// ==========================================================
// SHASAR SOLAR SYSTEM
// SOLAR SOLUTIONS COMPARISON
// ==========================================================

import { motion } from "framer-motion";
import {
  ArrowRight,
  BatteryCharging,
  Building2,
  Check,
  Grid2X2,
  House,
  Layers3,
  Network,
  Sun,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./pricingComparison.css";

// ==========================================================
// SOLAR SOLUTION DATA
// ==========================================================

const solutions = [
  {
    id: "on-grid",
    number: "01",
    name: "On-Grid Solar",
    subtitle: "Grid-connected solar generation",
    description:
      "A solar solution connected to the utility grid. Solar electricity can serve your property's energy demand while grid electricity remains available when solar production is insufficient.",
    icon: Grid2X2,
    idealFor: "Homes, offices and commercial properties with grid access",
    features: [
      {
        label: "Utility grid connection",
        value: "Connected",
        status: "yes",
      },
      {
        label: "Battery storage",
        value: "Not included by default",
        status: "no",
      },
      {
        label: "Solar energy generation",
        value: "Yes",
        status: "yes",
      },
      {
        label: "Power during grid outages",
        value: "Not normally available",
        status: "no",
      },
    ],
    highlight: "A practical option for grid-connected properties",
    theme: "on-grid",
  },
  {
    id: "off-grid",
    number: "02",
    name: "Off-Grid Solar",
    subtitle: "Independent energy system",
    description:
      "A standalone solar solution designed to operate independently of the utility grid, typically combining solar panels, battery storage and suitable power management equipment.",
    icon: BatteryCharging,
    idealFor: "Remote sites and locations without reliable grid access",
    features: [
      {
        label: "Utility grid connection",
        value: "Independent",
        status: "no",
      },
      {
        label: "Battery storage",
        value: "Core system component",
        status: "yes",
      },
      {
        label: "Solar energy generation",
        value: "Yes",
        status: "yes",
      },
      {
        label: "Power during grid outages",
        value: "Not dependent on the grid",
        status: "yes",
      },
    ],
    highlight: "Designed for properties requiring independent power",
    theme: "off-grid",
  },
  {
    id: "hybrid",
    number: "03",
    name: "Hybrid Solar",
    subtitle: "Solar, battery and grid integration",
    description:
      "A flexible solar solution that combines solar generation, battery storage and utility grid connectivity. Stored energy can be used when solar production is unavailable or insufficient.",
    icon: Layers3,
    idealFor: "Homes and businesses seeking solar with battery backup",
    features: [
      {
        label: "Utility grid connection",
        value: "Connected",
        status: "yes",
      },
      {
        label: "Battery storage",
        value: "Supported",
        status: "yes",
      },
      {
        label: "Solar energy generation",
        value: "Yes",
        status: "yes",
      },
      {
        label: "Power during grid outages",
        value: "With suitable backup design",
        status: "yes",
      },
    ],
    highlight: "Combines grid flexibility with battery storage",
    theme: "hybrid",
    featured: true,
  },
];

// ==========================================================
// COMPARISON ROWS
// ==========================================================

const comparisonRows = [
  {
    label: "Grid connection",
    values: ["Connected", "Independent", "Connected"],
  },
  {
    label: "Battery storage",
    values: [
      "Not included by default",
      "Core component",
      "Supported",
    ],
  },
  {
    label: "Solar generation",
    values: ["Yes", "Yes", "Yes"],
  },
  {
    label: "Grid electricity",
    values: [
      "Available",
      "Not required",
      "Available",
    ],
  },
  {
    label: "Backup during grid outage",
    values: [
      "Not normally available",
      "Independent of grid",
      "With suitable backup design",
    ],
  },
  {
    label: "Typical application",
    values: [
      "Grid-connected properties",
      "Remote or independent sites",
      "Properties needing storage",
    ],
  },
];

// ==========================================================
// COMPONENT
// ==========================================================

const PricingComparison = () => {
  return (
    <section
      className="solar-solutions"
      id="solar-solutions"
      aria-labelledby="solar-solutions-title"
    >
      <div
        className="solar-solutions__background"
        aria-hidden="true"
      />

      <div className="container">
        {/* SECTION HEADER */}

        <motion.div
          className="solar-solutions__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="solar-solutions__eyebrow">
            <span />
            <span>UNDERSTANDING SOLAR TECHNOLOGY</span>
            <span />
          </div>

          <h2
            id="solar-solutions-title"
            className="solar-solutions__title"
          >
            Find the Right
            <span> Solar System for Your Property</span>
          </h2>

          <p className="solar-solutions__intro">
            Every property has different energy requirements.
            Explore how on-grid, off-grid and hybrid solar systems
            work to identify the solution that fits your needs.
          </p>
        </motion.div>

        {/* SOLUTION CARDS */}

        <div className="solar-solutions__cards">
          {solutions.map((solution, index) => {
            const SolutionIcon = solution.icon;

            return (
              <motion.article
                key={solution.id}
                className={`solar-solutions__card solar-solutions__card--${solution.theme} ${
                  solution.featured
                    ? "solar-solutions__card--featured"
                    : ""
                }`}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                }}
              >
                {solution.featured && (
                  <span className="solar-solutions__featured-label">
                    Flexible Solution
                  </span>
                )}

                <div className="solar-solutions__card-top">
                  <span className="solar-solutions__number">
                    {solution.number}
                  </span>

                  <span className="solar-solutions__icon">
                    <SolutionIcon size={25} strokeWidth={1.7} />
                  </span>
                </div>

                <div className="solar-solutions__card-heading">
                  <h3>{solution.name}</h3>
                  <span>{solution.subtitle}</span>
                </div>

                <p className="solar-solutions__description">
                  {solution.description}
                </p>

                <div className="solar-solutions__ideal">
                  <span className="solar-solutions__ideal-icon">
                    <Building2 size={17} />
                  </span>

                  <div>
                    <small>SUITABLE FOR</small>
                    <p>{solution.idealFor}</p>
                  </div>
                </div>

                <div className="solar-solutions__card-divider" />

                <div className="solar-solutions__highlights">
                  <span className="solar-solutions__highlights-icon">
                    <Check size={15} />
                  </span>
                  <p>{solution.highlight}</p>
                </div>

                <Link
                  to="/contact"
                  className="solar-solutions__card-link"
                  aria-label={`Discuss ${solution.name} with Shasar Solar`}
                >
                  <span>Discuss This Solution</span>
                  <ArrowRight size={17} />
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* TECHNICAL COMPARISON TABLE */}

        <motion.div
          className="solar-solutions__comparison"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
        >
          <div className="solar-solutions__comparison-header">
            <div>
              <span className="solar-solutions__comparison-eyebrow">
                SYSTEM OVERVIEW
              </span>

              <h3>Compare the Key Differences</h3>

              <p>
                A quick technical overview of the three solar
                system configurations.
              </p>
            </div>

            <span className="solar-solutions__comparison-symbol">
              <Network size={25} />
            </span>
          </div>

          <div className="solar-solutions__table-scroll">
            <table className="solar-solutions__table">
              <thead>
                <tr>
                  <th scope="col">SYSTEM FEATURES</th>
                  <th scope="col">ON-GRID</th>
                  <th scope="col">OFF-GRID</th>
                  <th scope="col">HYBRID</th>
                </tr>
              </thead>

              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>

                    {row.values.map((value, index) => (
                      <td key={`${row.label}-${index}`}>
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="solar-solutions__table-note">
            System configuration, backup capability and equipment
            requirements depend on the property's load profile,
            site conditions and engineering design.
          </p>
        </motion.div>

        {/* BOTTOM CONSULTATION PANEL */}

        <motion.div
          className="solar-solutions__bottom"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
        >
          <div className="solar-solutions__bottom-content">
            <span className="solar-solutions__bottom-icon">
              <Sun size={24} />
            </span>

            <div>
              <span className="solar-solutions__bottom-label">
                NOT SURE WHICH SYSTEM YOU NEED?
              </span>

              <h3>
                Let's identify the right solar solution for your property.
              </h3>

              <p>
                Our team can review your energy requirements,
                property conditions and backup needs to help
                determine a suitable system configuration.
              </p>
            </div>
          </div>

          <Link
            to="/contact"
            className="solar-solutions__bottom-cta"
          >
            <span>Talk to Our Team</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingComparison;
