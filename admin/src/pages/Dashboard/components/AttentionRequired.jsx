import React from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  MessageSquare,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ATTENTION_CONFIG = {
  inquiry: {
    icon: MessageSquare,
    className: "attention-inquiry",
  },
  inquiries: {
    icon: MessageSquare,
    className: "attention-inquiry",
  },
  testimonial: {
    icon: Star,
    className: "attention-testimonial",
  },
  testimonials: {
    icon: Star,
    className: "attention-testimonial",
  },
  project: {
    icon: FileText,
    className: "attention-project",
  },
  projects: {
    icon: FileText,
    className: "attention-project",
  },
  system: {
    icon: AlertCircle,
    className: "attention-system",
  },
};

const getAttentionConfig = (item) => {
  const type =
    typeof item?.type === "string"
      ? item.type.toLowerCase()
      : "";

  return (
    ATTENTION_CONFIG[type] || {
      icon: AlertCircle,
      className: "attention-system",
    }
  );
};

const getActionPath = (item) => {
  if (!item) {
    return null;
  }

  if (item.actionUrl) {
    return item.actionUrl;
  }

  const type =
    typeof item.type === "string"
      ? item.type.toLowerCase()
      : "";

  switch (type) {
    case "inquiry":
    case "inquiries":
      return "/admin/inquiries";

    case "testimonial":
    case "testimonials":
      return "/admin/testimonials";

    case "project":
    case "projects":
      return "/admin/projects";

    default:
      return null;
  }
};

const AttentionRequired = ({
  data = [],
  loading = false,
}) => {
  const navigate = useNavigate();

  const items = Array.isArray(data) ? data : [];

  const handleAction = (item) => {
    const path = getActionPath(item);

    if (path) {
      navigate(path);
    }
  };

  return (
    <section className="dashboard-panel attention-panel">
      <div className="dashboard-panel-header">
        <div className="dashboard-panel-heading">
          <div className="dashboard-panel-icon attention-panel-icon">
            <AlertCircle
              size={19}
              strokeWidth={2}
            />
          </div>

          <div>
            <h2 className="dashboard-panel-title">
              Attention Required
            </h2>

            <p className="dashboard-panel-subtitle">
              Items that may need your action
            </p>
          </div>
        </div>

        {!loading && items.length > 0 && (
          <span className="dashboard-attention-count">
            {items.length}
          </span>
        )}
      </div>

      <div className="dashboard-attention-list">
        {loading ? (
          Array.from({ length: 3 }).map(
            (_, index) => (
              <div
                className="dashboard-attention-item dashboard-attention-loading"
                key={index}
              >
                <div className="dashboard-attention-icon-skeleton" />

                <div className="dashboard-attention-content-skeleton">
                  <span />
                  <span />
                </div>

                <div className="dashboard-attention-action-skeleton" />
              </div>
            )
          )
        ) : items.length === 0 ? (
          <div className="dashboard-empty-state dashboard-attention-empty">
            <div className="dashboard-empty-success-icon">
              <CheckCircle2
                size={30}
                strokeWidth={1.8}
              />
            </div>

            <h3>All caught up</h3>

            <p>
              There are no items requiring attention
              right now.
            </p>
          </div>
        ) : (
          items.map((item, index) => {
            const config =
              getAttentionConfig(item);

            const Icon = config.icon;
            const actionPath =
              getActionPath(item);

            const title =
              item.title ||
              item.message ||
              "Action required";

            const description =
              item.description ||
              item.detail ||
              "";

            const priority =
              typeof item.priority === "string"
                ? item.priority.toLowerCase()
                : "";

            return (
              <div
                className="dashboard-attention-item"
                key={
                  item.id ||
                  item._id ||
                  `${title}-${index}`
                }
              >
                <div
                  className={`dashboard-attention-icon ${config.className}`}
                >
                  <Icon
                    size={17}
                    strokeWidth={2}
                  />
                </div>

                <div className="dashboard-attention-content">
                  <div className="dashboard-attention-title-row">
                    <h3 className="dashboard-attention-title">
                      {title}
                    </h3>

                    {priority && (
                      <span
                        className={`dashboard-attention-priority priority-${priority}`}
                      >
                        {priority}
                      </span>
                    )}
                  </div>

                  {description && (
                    <p className="dashboard-attention-description">
                      {description}
                    </p>
                  )}
                </div>

                {actionPath && (
                  <button
                    type="button"
                    className="dashboard-attention-action"
                    onClick={() =>
                      handleAction(item)
                    }
                    aria-label={`Open ${title}`}
                    title="Open"
                  >
                    <ArrowRight
                      size={17}
                      strokeWidth={2}
                    />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default AttentionRequired;