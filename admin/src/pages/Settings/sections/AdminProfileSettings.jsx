import { useEffect, useState } from "react";
import {
  UserRound,
  Save,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

import SettingsSection from "../components/SettingsSection";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const AdminProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [initialFormData, setInitialFormData] =
    useState({
      name: "",
      email: "",
    });

  const [isLoading, setIsLoading] = useState(true);

  const [isSaving, setIsSaving] = useState(false);

  const [feedback, setFeedback] = useState({
    type: "",
    message: "",
  });

  // ========================================================
  // GET ADMIN TOKEN
  // ========================================================

  const getAdminToken = () => {
    return (
      localStorage.getItem("adminToken") ||
      sessionStorage.getItem("adminToken")
    );
  };

  // ========================================================
  // LOAD ADMIN PROFILE
  // ========================================================

  const loadProfile = async () => {
    const token = getAdminToken();

    if (!token) {
      setFeedback({
        type: "error",
        message:
          "Admin authentication token not found. Please login again.",
      });

      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/admin/profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to load admin profile."
        );
      }

      const profileData = {
        name: result.data?.name || "",
        email: result.data?.email || "",
      };

      setFormData(profileData);
      setInitialFormData(profileData);

      setFeedback({
        type: "",
        message: "",
      });
    } catch (error) {
      console.error(
        "Load admin profile error:",
        error
      );

      setFeedback({
        type: "error",
        message:
          error.message ||
          "Unable to load admin profile.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ========================================================
  // LOAD PROFILE ON PAGE OPEN
  // ========================================================

  useEffect(() => {
    loadProfile();
  }, []);

  // ========================================================
  // HANDLE INPUT CHANGE
  // ========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (feedback.message) {
      setFeedback({
        type: "",
        message: "",
      });
    }
  };

  // ========================================================
  // RESET
  // ========================================================

const handleReset = () => {
  setFormData({
    name: "",
    email: "",
  });

  setFeedback({
    type: "",
    message: "",
  });
};

  // ========================================================
  // SAVE PROFILE
  // ========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = getAdminToken();

    if (!token) {
      setFeedback({
        type: "error",
        message:
          "Admin authentication token not found. Please login again.",
      });

      return;
    }

    const name = formData.name.trim();
    const email = formData.email.trim();

    // ------------------------------------------------------
    // VALIDATION
    // ------------------------------------------------------

    if (!name) {
      setFeedback({
        type: "error",
        message: "Admin name is required.",
      });

      return;
    }

    if (name.length < 2) {
      setFeedback({
        type: "error",
        message:
          "Admin name must contain at least 2 characters.",
      });

      return;
    }

    if (!email) {
      setFeedback({
        type: "error",
        message: "Admin email is required.",
      });

      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setFeedback({
        type: "error",
        message:
          "Please enter a valid email address.",
      });

      return;
    }

    // ------------------------------------------------------
    // UPDATE PROFILE
    // ------------------------------------------------------

    try {
      setIsSaving(true);

      setFeedback({
        type: "",
        message: "",
      });

      const response = await fetch(
        `${API_BASE_URL}/api/admin/profile`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name,
            email,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to update admin profile."
        );
      }

      const updatedProfile = {
        name: result.data?.name || name,
        email: result.data?.email || email,
      };

      setFormData(updatedProfile);
      setInitialFormData(updatedProfile);

      setFeedback({
        type: "success",
        message:
          result.message ||
          "Admin profile updated successfully.",
      });
    } catch (error) {
      console.error(
        "Update admin profile error:",
        error
      );

      setFeedback({
        type: "error",
        message:
          error.message ||
          "Unable to update admin profile.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // ========================================================
  // LOADING
  // ========================================================

  if (isLoading) {
    return (
      <SettingsSection
        title="Admin Profile"
        description="Manage the administrator profile information used in the admin panel."
        icon={UserRound}
      >
        <div className="settings-state">
          Loading admin profile...
        </div>
      </SettingsSection>
    );
  }

  // ========================================================
  // UI
  // ========================================================

  return (
    <SettingsSection
      title="Admin Profile"
      description="Manage the administrator profile information used in the admin panel."
      icon={UserRound}
    >
      <form
        className="settings-form"
        onSubmit={handleSubmit}
      >
        <div className="settings-form__grid">
          <div className="settings-form__field">
            <label htmlFor="adminName">
              Admin Name
            </label>

            <input
              id="adminName"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter admin name"
              maxLength={100}
              autoComplete="name"
              disabled={isSaving}
            />

            <small>
              Name displayed for the administrator account.
            </small>
          </div>

          <div className="settings-form__field">
            <label htmlFor="adminEmail">
              Admin Email
            </label>

            <input
              id="adminEmail"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              maxLength={150}
              autoComplete="email"
              disabled={isSaving}
            />

            <small>
              Email associated with the administrator account.
            </small>
          </div>
        </div>

        {/* ACCOUNT SECURITY */}

        <div className="settings-profile__info">
          <div className="settings-profile__info-icon">
            <ShieldCheck size={18} />
          </div>

          <div>
            <strong>Account Security</strong>

            <p>
              Password and authentication settings will be
              managed separately from your profile information.
            </p>
          </div>
        </div>

        {/* FEEDBACK */}

        {feedback.message && (
          <div
            className={`settings-feedback settings-feedback--${feedback.type}`}
            role="alert"
          >
            {feedback.message}
          </div>
        )}

        {/* ACTIONS */}

        <div className="settings-form__actions">
          <button
            type="button"
            className="settings-form__reset"
            onClick={handleReset}
            disabled={isSaving}
          >
            <RotateCcw size={16} />

            <span>Reset</span>
          </button>

          <button
            type="submit"
            className="settings-form__save"
            disabled={isSaving}
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

export default AdminProfileSettings;