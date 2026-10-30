import { useEffect, useState } from "react";
import {
  Settings2,
  Save,
  RotateCcw,
} from "lucide-react";

import SettingsSection from "../components/SettingsSection";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const DEFAULT_FORM_DATA = {
  companyName: "Shasar Solar Energy System",
  legalName:
    "Shasarsolar Energy Systems Contracting LLC",
  email: "Shasartech@gamail.com",
  phone: "",
  website: "",
  timezone: "Asia/Dubai",
};

const GeneralSettings = () => {
  const [formData, setFormData] =
    useState(DEFAULT_FORM_DATA);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSaving, setIsSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  // ========================================================
  // GET GENERAL SETTINGS
  // ========================================================

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        setError("");

        const token =
          localStorage.getItem("adminToken") ||
          sessionStorage.getItem("adminToken");

        if (!token) {
          throw new Error(
            "Admin authentication token not found."
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

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              "Unable to load general settings."
          );
        }

        if (result.data?.general) {
          setFormData({
            ...DEFAULT_FORM_DATA,
            ...result.data.general,
          });
        }
      } catch (fetchError) {
        console.error(
          "Load general settings error:",
          fetchError
        );

        setError(
          fetchError.message ||
            "Unable to load general settings."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // ========================================================
  // HANDLE INPUT
  // ========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSuccessMessage("");
  };

  // ========================================================
  // RESET SELECTED FIELDS
  // ========================================================

  const handleReset = () => {
    setFormData((current) => ({
      ...current,

      // ----------------------------------------------------
      // RESET ONLY THESE FIELDS
      // ----------------------------------------------------

      email: DEFAULT_FORM_DATA.email,
      phone: "",
      website: "",

      // ----------------------------------------------------
      // KEEP CURRENT VALUES
      // ----------------------------------------------------
      // companyName → unchanged
      // legalName   → unchanged
      // timezone    → unchanged
    }));

    setError("");
    setSuccessMessage("");
  };

  // ========================================================
  // SAVE GENERAL SETTINGS
  // ========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSaving(true);
      setError("");
      setSuccessMessage("");

      const token =
        localStorage.getItem("adminToken") ||
        sessionStorage.getItem("adminToken");

      if (!token) {
        throw new Error(
          "Admin authentication token not found."
        );
      }

      const response = await fetch(
        `${API_BASE_URL}/api/settings/general`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to save general settings."
        );
      }

      if (result.data) {
        setFormData((current) => ({
          ...current,
          ...result.data,
        }));
      }

      setSuccessMessage(
        "General settings saved successfully."
      );
    } catch (saveError) {
      console.error(
        "Save general settings error:",
        saveError
      );

      setError(
        saveError.message ||
          "Unable to save general settings."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <SettingsSection
      title="General Settings"
      description="Manage your company identity and primary contact information."
      icon={Settings2}
    >
      {isLoading ? (
        <div className="settings-state">
          <div
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          />

          <span>
            Loading general settings...
          </span>
        </div>
      ) : (
        <form
          className="settings-form"
          onSubmit={handleSubmit}
        >
          {/* ==================================================
              ERROR MESSAGE
          ================================================== */}

          {error && (
            <div
              className="settings-feedback settings-feedback--error"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* ==================================================
              SUCCESS MESSAGE
          ================================================== */}

          {successMessage && (
            <div
              className="settings-feedback settings-feedback--success"
              role="status"
            >
              {successMessage}
            </div>
          )}

          {/* ==================================================
              GENERAL SETTINGS FORM
          ================================================== */}

          <div className="settings-form__grid">

            {/* COMPANY NAME */}

            <div className="settings-form__group">
              <label htmlFor="companyName">
                Company Name
              </label>

              <input
                id="companyName"
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company name"
                maxLength={150}
              />
            </div>

            {/* LEGAL NAME */}

            <div className="settings-form__group">
              <label htmlFor="legalName">
                Legal Name
              </label>

              <input
                id="legalName"
                name="legalName"
                type="text"
                value={formData.legalName}
                onChange={handleChange}
                placeholder="Legal company name"
                maxLength={200}
              />
            </div>

            {/* COMPANY EMAIL */}

            <div className="settings-form__group">
              <label htmlFor="email">
                Company Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="company@example.com"
                maxLength={150}
              />
            </div>

            {/* PHONE NUMBER */}

            <div className="settings-form__group">
              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+971 XX XXX XXXX"
                maxLength={50}
              />
            </div>

            {/* WEBSITE */}

            <div className="settings-form__group">
              <label htmlFor="website">
                Website
              </label>

              <input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                maxLength={250}
              />
            </div>

            {/* TIMEZONE */}

            <div className="settings-form__group">
              <label htmlFor="timezone">
                Timezone
              </label>

              <select
                id="timezone"
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
              >
                <option value="Asia/Dubai">
                  Asia/Dubai — UAE
                </option>

                <option value="Asia/Karachi">
                  Asia/Karachi — Pakistan
                </option>

                <option value="UTC">
                  UTC
                </option>
              </select>
            </div>
          </div>

          {/* ==================================================
              ACTION BUTTONS
          ================================================== */}

          <div className="settings-form__actions">

            {/* RESET */}

            <button
              type="button"
              className="settings-button settings-button--secondary"
              onClick={handleReset}
              disabled={isSaving}
            >
              <RotateCcw
                size={16}
                strokeWidth={1.9}
              />

              <span>Reset</span>
            </button>

            {/* SAVE */}

            <button
              type="submit"
              className="settings-button settings-button--primary"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />

                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save
                    size={16}
                    strokeWidth={1.9}
                  />

                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </SettingsSection>
  );
};

export default GeneralSettings;