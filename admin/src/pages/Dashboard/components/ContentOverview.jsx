import React from "react";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  FolderKanban,
  MessageSquare,
  Settings,
  Star,
  Wrench,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContentOverview = ({
  data = {},
  loading = false,
}) => {
  const navigate = useNavigate();

  const overview = data || {};

  const items = [
    {
      key: "projects",
      title: "Projects",
      value: overview.totalProjects ?? 0,
      description: `${overview.activeProjects ?? 0} active`,
      icon: FolderKanban,
      className: "content-overview-projects",
      path: "/admin/projects",
    },
    {
      key: "services",
      title: "Services",
      value: overview.totalServices ?? 0,
      description: `${overview.activeServices ?? 0} active`,
      icon: Wrench,
      className: "content-overview-services",
      path: "/admin/services",
    },
    {
      key: "testimonials",
      title: "Testimonials",
      value: overview.totalTestimonials ?? 0,
      description: `${overview.approvedTestimonials ?? 0} approved`,
      icon: Star,
      className: "content-overview-testimonials",
      path: "/admin/testimonials",
    },
    {
      key: "inquiries",
      title: "Inquiries",
      value: overview.totalInquiries ?? 0,
      description: `${overview.unreadInquiries ?? 0} unread`,
      icon: MessageSquare,
      className: "content-overview-inquiries",
      path: "/admin/inquiries",
    },
  ];

  return (
    <section className="dashboard-panel content-overview-panel">
      <div className="dashboard-panel-header">
        <div className="dashboard-panel-heading">
          <div className="dashboard-panel-icon content-overview-icon">
            <BarChart3
              size={19}
              strokeWidth={2}
            />
          </div>

          <div>
            <h2 className="dashboard-panel-title">
              Content Overview
            </h2>

            <p className="dashboard-panel-subtitle">
              Current website and admin content
            </p>
          </div>
        </div>

        <button
          type="button"
          className="dashboard-view-all-btn"
          onClick={() =>
            navigate("/admin/settings")
          }
        >
          Manage
          <ArrowRight
            size={15}
            strokeWidth={2}
          />
        </button>
      </div>

      <div className="dashboard-content-overview-grid">
        {loading
          ? Array.from({ length: 4 }).map(
              (_, index) => (
                <div
                  className="dashboard-content-overview-card dashboard-content-overview-loading"
                  key={index}
                >
                  <div className="dashboard-skeleton dashboard-content-icon-skeleton" />

                  <div className="dashboard-content-overview-text-skeleton">
                    <div className="dashboard-skeleton dashboard-content-title-skeleton" />
                    <div className="dashboard-skeleton dashboard-content-value-skeleton" />
                    <div className="dashboard-skeleton dashboard-content-description-skeleton" />
                  </div>
                </div>
              )
            )
          : items.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  type="button"
                  className={`dashboard-content-overview-card ${item.className}`}
                  key={item.key}
                  onClick={() => navigate(item.path)}
                >
                  <div className="dashboard-content-overview-top">
                    <div className="dashboard-content-overview-icon">
                      <Icon
                        size={18}
                        strokeWidth={2}
                      />
                    </div>

                    <ArrowRight
                      className="dashboard-content-overview-arrow"
                      size={15}
                      strokeWidth={2}
                    />
                  </div>

                  <div className="dashboard-content-overview-body">
                    <span className="dashboard-content-overview-title">
                      {item.title}
                    </span>

                    <strong className="dashboard-content-overview-value">
                      {item.value}
                    </strong>

                    <span className="dashboard-content-overview-description">
                      {item.description}
                    </span>
                  </div>
                </button>
              );
            })}
      </div>

      {!loading && (
        <div className="dashboard-content-overview-footer">
          <div className="dashboard-content-footer-status">
            <CheckCircle2
              size={15}
              strokeWidth={2}
            />

            <span>
              Dashboard content is synchronized with your admin data.
            </span>
          </div>

          <button
            type="button"
            className="dashboard-content-footer-link"
            onClick={() =>
              navigate("/admin/analytics")
            }
          >
            View detailed analytics
            <ArrowRight
              size={14}
              strokeWidth={2}
            />
          </button>
        </div>
      )}
    </section>
  );
};

export default ContentOverview;