import { useState } from "react";
import {
  ShieldCheck,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";

import SettingsSection from "../components/SettingsSection";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const INITIAL_FORM_DATA = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const SecuritySettings = () => {
  const [formData, setFormData] =
    useState(INITIAL_FORM_DATA);

  const [showPassword, setShowPassword] =
    useState({
      current: false,
      new: false,
      confirm: false,
    });

  const [isSaving, setIsSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSuccessMessage("");
  };

  // =========================================================
  // TOGGLE PASSWORD VISIBILITY
  // =========================================================

  const togglePassword = (field) => {
    setShowPassword((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  // =========================================================
  // VALIDATE FORM
  // =========================================================

  const validateForm = () => {
    if (!formData.currentPassword) {
      return "Please enter your current password.";
    }

    if (!formData.newPassword) {
      return "Please enter a new password.";
    }

    if (formData.newPassword.length < 8) {
      return (
        "New password must contain at least 8 characters."
      );
    }

    if (formData.newPassword.length > 100) {
      return (
        "New password cannot exceed 100 characters."
      );
    }

    if (
      formData.newPassword ===
      formData.currentPassword
    ) {
      return (
        "New password must be different from your current password."
      );
    }

    if (!formData.confirmPassword) {
      return "Please confirm your new password.";
    }

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      return (
        "New password and confirmation password do not match."
      );
    }

    return "";
  };

  // =========================================================
  // RESET FORM
  // =========================================================

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);

    setShowPassword({
      current: false,
      new: false,
      confirm: false,
    });

    setError("");
    setSuccessMessage("");
  };

  // =========================================================
  // CHANGE PASSWORD
  // =========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      setSuccessMessage("");
      return;
    }

    try {
      setIsSaving(true);
      setError("");
      setSuccessMessage("");

      // -------------------------------------------------------
      // GET ADMIN TOKEN
      // -------------------------------------------------------

      const token =
        localStorage.getItem("adminToken") ||
        sessionStorage.getItem("adminToken");

      if (!token) {
        throw new Error(
          "Admin authentication token not found."
        );
      }

      // -------------------------------------------------------
      // SEND PASSWORD CHANGE REQUEST
      // -------------------------------------------------------

      const response = await fetch(
        `${API_BASE_URL}/api/admin/change-password`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            currentPassword:
              formData.currentPassword,

            newPassword:
              formData.newPassword,

            confirmPassword:
              formData.confirmPassword,
          }),
        }
      );

      // -------------------------------------------------------
      // READ RESPONSE
      // -------------------------------------------------------

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to update password."
        );
      }

      // -------------------------------------------------------
      // SUCCESS
      // -------------------------------------------------------

      setFormData(INITIAL_FORM_DATA);

      setShowPassword({
        current: false,
        new: false,
        confirm: false,
      });

      setSuccessMessage(
        "Password updated successfully."
      );
    } catch (saveError) {
      console.error(
        "Change admin password error:",
        saveError
      );

      setError(
        saveError.message ||
          "Unable to update password."
      );

      setSuccessMessage("");
    } finally {
      setIsSaving(false);
    }
  };

  // =========================================================
  // PASSWORD FIELD
  // =========================================================

  const renderPasswordField = (
    id,
    name,
    label,
    value,
    field,
    placeholder
  ) => {
    const isVisible =
      showPassword[field];

    return (
      <div className="settings-form__field">
        <label htmlFor={id}>
          {label}
        </label>

        <div className="settings-password__input">
          <LockKeyhole
            size={16}
            strokeWidth={1.9}
          />

          <input
            id={id}
            name={name}
            type={
              isVisible
                ? "text"
                : "password"
            }
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            autoComplete={
              field === "current"
                ? "current-password"
                : "new-password"
            }
            maxLength={100}
          />

          <button
            type="button"
            onClick={() =>
              togglePassword(field)
            }
            aria-label={
              isVisible
                ? `Hide ${label}`
                : `Show ${label}`
            }
            disabled={isSaving}
          >
            {isVisible ? (
              <EyeOff
                size={17}
                strokeWidth={1.9}
              />
            ) : (
              <Eye
                size={17}
                strokeWidth={1.9}
              />
            )}
          </button>
        </div>
      </div>
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <SettingsSection
      title="Security"
      description="Protect your administrator account by keeping your password secure and up to date."
      icon={ShieldCheck}
    >
      <form
        className="settings-form"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* =================================================
            SECURITY NOTICE
            ================================================= */}

        <div className="settings-security__notice">
          <div className="settings-security__notice-icon">
            <ShieldCheck
              size={18}
              strokeWidth={1.9}
            />
          </div>

          <div>
            <strong>
              Password Security
            </strong>

            <p>
              Use a strong password with at least
              8 characters. Avoid using easily
              guessed personal information.
            </p>
          </div>
        </div>

        {/* =================================================
            PASSWORD FIELDS
            ================================================= */}

        <div className="settings-security__fields">
          {renderPasswordField(
            "currentPassword",
            "currentPassword",
            "Current Password",
            formData.currentPassword,
            "current",
            "Enter current password"
          )}

          {renderPasswordField(
            "newPassword",
            "newPassword",
            "New Password",
            formData.newPassword,
            "new",
            "Enter new password"
          )}

          {renderPasswordField(
            "confirmPassword",
            "confirmPassword",
            "Confirm New Password",
            formData.confirmPassword,
            "confirm",
            "Confirm new password"
          )}
        </div>

        {/* =================================================
            ERROR MESSAGE
            ================================================= */}

        {error && (
          <div
            className="settings-feedback settings-feedback--error"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* =================================================
            SUCCESS MESSAGE
            ================================================= */}

        {successMessage && (
          <div
            className="settings-feedback settings-feedback--success"
            role="status"
          >
            {successMessage}
          </div>
        )}

        {/* =================================================
            ACTIONS
            ================================================= */}

        <div className="settings-form__actions">
          <button
            type="button"
            className="settings-form__reset"
            onClick={handleReset}
            disabled={isSaving}
          >
            <RotateCcw
              size={16}
              strokeWidth={1.9}
            />

            <span>
              Reset
            </span>
          </button>

          <button
            type="submit"
            className="settings-form__save"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />

                <span>
                  Updating...
                </span>
              </>
            ) : (
              <>
                <Save
                  size={16}
                  strokeWidth={1.9}
                />

                <span>
                  Update Password
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </SettingsSection>
  );
};

export default SecuritySettings;