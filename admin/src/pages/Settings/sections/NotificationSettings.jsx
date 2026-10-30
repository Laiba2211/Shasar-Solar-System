
import { useEffect, useState } from "react";
import {
  Bell,
  Save,
  RotateCcw,
  Mail,
  MessageSquareText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import SettingsSection from "../components/SettingsSection";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";

const DEFAULT_SETTINGS = {
  newInquiry: true,
  inquiryStatus: true,
  testimonialSubmission: true,
  systemAlerts: true,
  emailNotifications: true,
};

const NotificationSettings = () => {
  const [formData, setFormData] = useState(
    DEFAULT_SETTINGS
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ==========================================================
  // GET AUTH TOKEN
  // ==========================================================

  const getAuthToken = () => {
    return (
      localStorage.getItem("adminToken") ||
      sessionStorage.getItem("adminToken")
    );
  };

  // ==========================================================
  // LOAD NOTIFICATION SETTINGS
  // ==========================================================

  const loadSettings = async () => {
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error(
          "Your admin session has expired. Please log in again."
        );
      }

      const response = await fetch(
        `${API_BASE_URL}/api/settings`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let result;

      try {
        result = await response.json();
      } catch {
        throw new Error(
          "The server returned an invalid response."
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to load notification settings."
        );
      }

      const notifications =
        result?.data?.notifications || {};

      setFormData({
        emailNotifications:
          notifications.emailNotifications ??
          DEFAULT_SETTINGS.emailNotifications,

        newInquiry:
          notifications.newInquiry ??
          DEFAULT_SETTINGS.newInquiry,

        inquiryStatus:
          notifications.inquiryStatus ??
          DEFAULT_SETTINGS.inquiryStatus,

        testimonialSubmission:
          notifications.testimonialSubmission ??
          DEFAULT_SETTINGS.testimonialSubmission,

        systemAlerts:
          notifications.systemAlerts ??
          DEFAULT_SETTINGS.systemAlerts,
      });
    } catch (error) {
      console.error(
        "Load notification settings error:",
        error
      );

      setError(
        error?.message ||
          "Unable to load notification settings."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // ==========================================================
  // TOGGLE
  // ==========================================================

  const handleToggle = (name) => {
    setFormData((current) => ({
      ...current,
      [name]: !current[name],
    }));

    setMessage("");
    setError("");
  };

  // ==========================================================
  // RESET
  // ==========================================================

  const handleReset = () => {
    setFormData({
      ...DEFAULT_SETTINGS,
    });

    setMessage("");
    setError("");
  };

  // ==========================================================
  // SAVE
  // ==========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    setIsSaving(true);
    setMessage("");
    setError("");

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error(
          "Your admin session has expired. Please log in again."
        );
      }

      const response = await fetch(
        `${API_BASE_URL}/api/settings/notifications`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      let result;

      try {
        result = await response.json();
      } catch {
        throw new Error(
          "The server returned an invalid response."
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to save notification settings."
        );
      }

      const savedNotifications =
        result?.data || {};

      setFormData({
        emailNotifications:
          savedNotifications.emailNotifications ??
          formData.emailNotifications,

        newInquiry:
          savedNotifications.newInquiry ??
          formData.newInquiry,

        inquiryStatus:
          savedNotifications.inquiryStatus ??
          formData.inquiryStatus,

        testimonialSubmission:
          savedNotifications.testimonialSubmission ??
          formData.testimonialSubmission,

        systemAlerts:
          savedNotifications.systemAlerts ??
          formData.systemAlerts,
      });

      setMessage(
        "Notification settings saved successfully."
      );
    } catch (error) {
      console.error(
        "Save notification settings error:",
        error
      );

      setError(
        error?.message ||
          "Unable to save notification settings."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsSection
      title="Notifications"
      description="Control which admin notifications and business alerts you want to receive."
      icon={Bell}
    >
      <form
        className="settings-form"
        onSubmit={handleSubmit}
      >
        {/* ======================================================
            STATUS MESSAGE
        ====================================================== */}

        {isLoading && (
          <div
            className="settings-form__status"
            role="status"
          >
            Loading notification settings...
          </div>
        )}

        {message && !isLoading && (
          <div
            className="settings-form__status settings-form__status--success"
            role="status"
          >
            <CheckCircle2 size={17} />
            <span>{message}</span>
          </div>
        )}

        {error && !isLoading && (
          <div
            className="settings-form__status settings-form__status--error"
            role="alert"
          >
            <AlertCircle size={17} />
            <span>{error}</span>
          </div>
        )}

        {/* ======================================================
            MASTER EMAIL NOTIFICATIONS
        ====================================================== */}

        <div className="settings-notifications__master">
          <div className="settings-notifications__master-icon">
            <Mail size={18} />
          </div>

          <div className="settings-notifications__master-content">
            <strong>Email Notifications</strong>

            <span>
              Enable or disable admin email notifications.
            </span>
          </div>

          <button
            type="button"
            className={`settings-toggle ${
              formData.emailNotifications
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleToggle("emailNotifications")
            }
            disabled={isLoading || isSaving}
            aria-pressed={
              formData.emailNotifications
            }
            aria-label="Toggle email notifications"
          >
            <span />
          </button>
        </div>

        {/* ======================================================
            BUSINESS NOTIFICATIONS
        ====================================================== */}

        <div className="settings-notifications__group">
          <div className="settings-notifications__group-header">
            <MessageSquareText size={17} />

            <div>
              <h3>Business Notifications</h3>

              <p>
                Stay informed about activity coming
                through your website.
              </p>
            </div>
          </div>

          <NotificationRow
            title="New Inquiry"
            description="Receive an alert when a new customer inquiry is submitted."
            checked={formData.newInquiry}
            disabled={
              !formData.emailNotifications ||
              isLoading ||
              isSaving
            }
            onChange={() =>
              handleToggle("newInquiry")
            }
          />

          <NotificationRow
            title="Inquiry Status Updates"
            description="Receive notifications when an inquiry status changes."
            checked={formData.inquiryStatus}
            disabled={
              !formData.emailNotifications ||
              isLoading ||
              isSaving
            }
            onChange={() =>
              handleToggle("inquiryStatus")
            }
          />

          <NotificationRow
            title="Testimonial Submissions"
            description="Receive an alert when a new testimonial is submitted."
            checked={
              formData.testimonialSubmission
            }
            disabled={
              !formData.emailNotifications ||
              isLoading ||
              isSaving
            }
            onChange={() =>
              handleToggle(
                "testimonialSubmission"
              )
            }
          />
        </div>

        {/* ======================================================
            SYSTEM ALERTS
        ====================================================== */}

        <div className="settings-notifications__group">
          <div className="settings-notifications__group-header">
            <CheckCircle2 size={17} />

            <div>
              <h3>System Alerts</h3>

              <p>
                Important application and administration
                notifications.
              </p>
            </div>
          </div>

          <NotificationRow
            title="System Alerts"
            description="Receive important alerts related to the admin system."
            checked={formData.systemAlerts}
            disabled={
              !formData.emailNotifications ||
              isLoading ||
              isSaving
            }
            onChange={() =>
              handleToggle("systemAlerts")
            }
          />
        </div>

        {/* ======================================================
            ACTIONS
        ====================================================== */}

        <div className="settings-form__actions">
          <button
            type="button"
            className="settings-form__reset"
            onClick={handleReset}
            disabled={isLoading || isSaving}
          >
            <RotateCcw size={16} />

            <span>Reset</span>
          </button>

          <button
            type="submit"
            className="settings-form__save"
            disabled={isLoading || isSaving}
          >
            <Save size={16} />

            <span>
              {isSaving
                ? "Saving..."
                : "Save Changes"}
            </span>
          </button>
        </div>
      </form>
    </SettingsSection>
  );
};

// ==========================================================
// NOTIFICATION ROW
// ==========================================================

const NotificationRow = ({
  title,
  description,
  checked,
  disabled,
  onChange,
}) => {
  return (
    <div
      className={`settings-notification-row ${
        disabled ? "disabled" : ""
      }`}
    >
      <div>
        <strong>{title}</strong>

        <p>{description}</p>
      </div>

      <button
        type="button"
        className={`settings-toggle ${
          checked ? "active" : ""
        }`}
        onClick={onChange}
        disabled={disabled}
        aria-pressed={checked}
        aria-label={`Toggle ${title}`}
      >
        <span />
      </button>
    </div>
  );
};

export default NotificationSettings;
