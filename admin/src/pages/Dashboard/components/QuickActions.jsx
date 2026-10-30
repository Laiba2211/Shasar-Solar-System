import React from "react";
import {
  BarChart3,
  BriefcaseBusiness,
  FilePlus2,
  MessageSquare,
  Settings,
  Star,
  Wrench,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Project",
      description: "Create a new solar project",
      icon: FilePlus2,
      path: "/admin/projects",
      className: "quick-action-project",
    },
    {
      title: "Manage Services",
      description: "Update your service catalog",
      icon: Wrench,
      path: "/admin/services",
      className: "quick-action-service",
    },
    {
      title: "View Inquiries",
      description: "Review customer inquiries",
      icon: MessageSquare,
      path: "/admin/inquiries",
      className: "quick-action-inquiry",
    },
    {
      title: "Testimonials",
      description: "Review customer testimonials",
      icon: Star,
      path: "/admin/testimonials",
      className: "quick-action-testimonial",
    },
    {
      title: "View Analytics",
      description: "Explore detailed reports",
      icon: BarChart3,
      path: "/admin/analytics",
      className: "quick-action-analytics",
    },
    {
      title: "Settings",
      description: "Manage admin settings",
      icon: Settings,
      path: "/admin/settings",
      className: "quick-action-settings",
    },
  ];

  return (
    <section className="dashboard-panel quick-actions-panel">
      <div className="dashboard-panel-header">
        <div className="dashboard-panel-heading">
          <div className="dashboard-panel-icon quick-actions-icon">
            <BriefcaseBusiness
              size={19}
              strokeWidth={2}
            />
          </div>

          <div>
            <h2 className="dashboard-panel-title">
              Quick Actions
            </h2>

            <p className="dashboard-panel-subtitle">
              Access frequently used admin sections
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-quick-actions-grid">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              type="button"
              key={action.path}
              className={`dashboard-quick-action ${action.className}`}
              onClick={() => navigate(action.path)}
            >
              <div className="dashboard-quick-action-icon">
                <Icon
                  size={19}
                  strokeWidth={2}
                />
              </div>

              <div className="dashboard-quick-action-content">
                <span className="dashboard-quick-action-title">
                  {action.title}
                </span>

                <span className="dashboard-quick-action-description">
                  {action.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;