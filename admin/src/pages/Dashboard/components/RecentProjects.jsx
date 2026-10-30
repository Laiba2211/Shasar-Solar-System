import React from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  Play,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecentProjects = ({
  data = [],
  loading = false,
}) => {
  const navigate = useNavigate();

  const projects = Array.isArray(data)
    ? data.slice(0, 5)
    : [];

  const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000";

  const getMediaUrl = (mediaUrl) => {
    if (!mediaUrl || typeof mediaUrl !== "string") {
      return "";
    }

    if (
      mediaUrl.startsWith("http://") ||
      mediaUrl.startsWith("https://")
    ) {
      return mediaUrl;
    }

    if (mediaUrl.startsWith("/")) {
      return `${API_BASE_URL}${mediaUrl}`;
    }

    return `${API_BASE_URL}/${mediaUrl}`;
  };

  const formatYear = (year) => {
    if (!year) {
      return "—";
    }

    return String(year);
  };

  const formatCapacity = (capacity) => {
    if (
      capacity === null ||
      capacity === undefined ||
      capacity === ""
    ) {
      return "—";
    }

    return String(capacity);
  };

  const getStatusClass = (status) => {
    if (!status || typeof status !== "string") {
      return "project-status-default";
    }

    const normalizedStatus =
      status.toLowerCase().trim();

    switch (normalizedStatus) {
      case "completed":
        return "project-status-completed";

      case "ongoing":
      case "in progress":
      case "in-progress":
        return "project-status-ongoing";

      case "planned":
      case "upcoming":
        return "project-status-planned";

      case "cancelled":
      case "canceled":
        return "project-status-cancelled";

      default:
        return "project-status-default";
    }
  };

  return (
    <section className="dashboard-panel recent-projects-panel">
      <div className="dashboard-panel-header">
        <div className="dashboard-panel-heading">
          <div className="dashboard-panel-icon recent-projects-icon">
            <BriefcaseBusiness
              size={19}
              strokeWidth={2}
            />
          </div>

          <div>
            <h2 className="dashboard-panel-title">
              Recent Projects
            </h2>

            <p className="dashboard-panel-subtitle">
              Latest solar projects in your portfolio
            </p>
          </div>
        </div>

        <button
          type="button"
          className="dashboard-view-all-btn"
          onClick={() => navigate("/admin/projects")}
        >
          View All
          <ArrowRight
            size={15}
            strokeWidth={2}
          />
        </button>
      </div>

      <div className="dashboard-project-list">
        {loading ? (
          Array.from({ length: 4 }).map(
            (_, index) => (
              <div
                className="dashboard-project-item dashboard-project-loading"
                key={index}
              >
                <div className="dashboard-skeleton dashboard-project-media-skeleton" />

                <div className="dashboard-project-content-skeleton">
                  <div className="dashboard-skeleton dashboard-skeleton-project-title" />
                  <div className="dashboard-skeleton dashboard-skeleton-project-meta" />
                  <div className="dashboard-skeleton dashboard-skeleton-project-meta-short" />
                </div>

                <div className="dashboard-skeleton dashboard-skeleton-project-status" />
              </div>
            )
          )
        ) : projects.length === 0 ? (
          <div className="dashboard-empty-state">
            <BriefcaseBusiness
              size={30}
              strokeWidth={1.7}
            />

            <h3>No recent projects</h3>

            <p>
              Your latest solar projects will appear here.
            </p>
          </div>
        ) : (
          projects.map((project, index) => {
            const mediaUrl = getMediaUrl(
              project.image || project.video
            );

            const hasVideo =
              Boolean(project.video) &&
              !project.image;

            const title =
              project.title ||
              "Untitled Project";

            const location =
              project.location ||
              "Location not specified";

            const capacity =
              formatCapacity(project.capacity);

            const year = formatYear(project.year);

            const status =
              project.status || "";

            return (
              <article
                className="dashboard-project-item"
                key={
                  project._id ||
                  project.id ||
                  `${title}-${index}`
                }
              >
                <button
                  type="button"
                  className="dashboard-project-media"
                  onClick={() =>
                    navigate("/admin/projects")
                  }
                  aria-label={`Open project ${title}`}
                >
                  {mediaUrl ? (
                    hasVideo ? (
                      <video
                        src={mediaUrl}
                        className="dashboard-project-media-content"
                        muted
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <img
                        src={mediaUrl}
                        alt={title}
                        className="dashboard-project-media-content"
                        loading="lazy"
                      />
                    )
                  ) : (
                    <div className="dashboard-project-media-placeholder">
                      <BriefcaseBusiness
                        size={25}
                        strokeWidth={1.7}
                      />
                    </div>
                  )}

                  {hasVideo && mediaUrl && (
                    <span className="dashboard-project-video-badge">
                      <Play
                        size={12}
                        fill="currentColor"
                        strokeWidth={1.8}
                      />
                    </span>
                  )}
                </button>

                <div className="dashboard-project-content">
                  <div className="dashboard-project-title-row">
                    <h3 className="dashboard-project-title">
                      {title}
                    </h3>

                    {status && (
                      <span
                        className={`dashboard-project-status ${getStatusClass(
                          status
                        )}`}
                      >
                        {status}
                      </span>
                    )}
                  </div>

                  <div className="dashboard-project-meta">
                    <span className="dashboard-project-meta-item">
                      <MapPin
                        size={14}
                        strokeWidth={2}
                      />
                      {location}
                    </span>

                    <span className="dashboard-project-meta-item">
                      <Zap
                        size={14}
                        strokeWidth={2}
                      />
                      {capacity}
                    </span>

                    <span className="dashboard-project-meta-item">
                      <CalendarDays
                        size={14}
                        strokeWidth={2}
                      />
                      {year}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="dashboard-row-action dashboard-project-action"
                  onClick={() =>
                    navigate("/admin/projects")
                  }
                  aria-label={`Open project ${title}`}
                  title="Open project"
                >
                  <ArrowRight
                    size={16}
                    strokeWidth={2}
                  />
                </button>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
};

export default RecentProjects;