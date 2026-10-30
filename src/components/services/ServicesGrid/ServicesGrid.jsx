import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

import ServiceCard from "./ServiceCard";
import "./servicesGrid.css";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const SERVICES_ENDPOINT = `${API_BASE_URL.replace(/\/$/, "")}/api/services`;

const ServicesGrid = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(SERVICES_ENDPOINT, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      let result;

      try {
        result = await response.json();
      } catch {
        throw new Error(
          `Server returned an invalid response (${response.status}).`
        );
      }

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message || "Failed to load services."
        );
      }

      const fetchedServices = Array.isArray(result.data)
        ? result.data
        : [];

      /*
       * Only active services are displayed publicly.
       * Backend remains the source of truth.
       */
      const activeServices = fetchedServices
        .filter(
          (service) =>
            service &&
            service.isActive !== false
        )
        .sort(
          (a, b) =>
            (Number(a.order) || 0) -
            (Number(b.order) || 0)
        );

      setServices(activeServices);
    } catch (err) {
      console.error(
        "Public services fetch error:",
        err
      );

      setError(
        "Unable to load services right now. Please try again."
      );

      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <section
      id="services-grid"
      className="services-grid-section"
    >
      <div className="container">

        {/* =========================================
            SECTION HEADER
        ========================================= */}
        <motion.div
          className="row justify-content-center text-center services-grid-header"
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
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <div className="col-lg-8">

            <span className="services-grid-badge">
              Complete Renewable Energy Solutions
            </span>

            <h2 className="services-grid-heading">
              Our Solar Services
            </h2>

            <p className="services-grid-description-text">
              We provide complete residential,
              commercial, industrial and engineering
              solar solutions across the UAE. From
              consultation and DEWA approvals to
              installation, maintenance and long-term
              support, our experienced team delivers
              reliable renewable energy solutions
              tailored to every project.
            </p>

          </div>
        </motion.div>

        {/* =========================================
            LOADING
        ========================================= */}
        {loading && (
          <div
            className="services-grid-state text-center py-5"
            role="status"
            aria-live="polite"
          >
            <div
              className="spinner-border"
              aria-hidden="true"
            />

            <p className="mt-3 mb-0">
              Loading services...
            </p>
          </div>
        )}

        {/* =========================================
            ERROR
        ========================================= */}
        {!loading && error && (
          <div
            className="services-grid-state text-center py-5"
            role="alert"
          >
            <p className="mb-3">
              {error}
            </p>

            <button
              type="button"
              className="btn btn-outline-warning d-inline-flex align-items-center gap-2"
              onClick={fetchServices}
            >
              <RefreshCw size={17} />
              Try Again
            </button>
          </div>
        )}

        {/* =========================================
            EMPTY
        ========================================= */}
        {!loading &&
          !error &&
          services.length === 0 && (
            <div
              className="services-grid-state text-center py-5"
              role="status"
            >
              <p className="mb-0">
                No services are currently available.
              </p>
            </div>
          )}

        {/* =========================================
            SERVICES
        ========================================= */}
        {!loading &&
          !error &&
          services.length > 0 && (
            <div className="row g-4 services-grid-row">

              {services.map((service) => (
                <ServiceCard
                  key={
                    service._id ||
                    service.id ||
                    service.slug
                  }
                  service={service}
                />
              ))}

            </div>
          )}

      </div>
    </section>
  );
};

export default ServicesGrid;