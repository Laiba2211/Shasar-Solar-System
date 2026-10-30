
import { useEffect, useState } from "react";
import {
  Building2,
  Save,
  RotateCcw,
  MapPin,
  Clock3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import SettingsSection from "../components/SettingsSection";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";

const DEFAULT_SETTINGS = {
  address:
    "Saeed Khalid Building, Office #05, Saeed Port, Deira, Dubai, United Arab Emirates",
  city: "Dubai",
  country: "United Arab Emirates",
  businessHours: "24/7",
  website: "",
};

const BusinessSettings = () => {
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
  // LOAD BUSINESS SETTINGS
  // ==========================================================

  const loadSettings = async () => {
    setIsLoading(true);
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
            "Unable to load business settings."
        );
      }

      const business = result?.data?.business || {};

      setFormData({
        address:
          business.address ??
          DEFAULT_SETTINGS.address,

        city:
          business.city ??
          DEFAULT_SETTINGS.city,

        country:
          business.country ??
          DEFAULT_SETTINGS.country,

        businessHours:
          business.businessHours ??
          DEFAULT_SETTINGS.businessHours,

        website:
          business.website ??
          DEFAULT_SETTINGS.website,
      });
    } catch (error) {
      console.error(
        "Load business settings error:",
        error
      );

      setError(
        error?.message ||
          "Unable to load business settings."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // ==========================================================
  // HANDLE INPUT CHANGE
  // ==========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
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
  // SAVE BUSINESS SETTINGS
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
        `${API_BASE_URL}/api/settings/business`,
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
            "Unable to save business settings."
        );
      }

      const savedBusiness =
        result?.data || {};

      setFormData({
        address:
          savedBusiness.address ??
          formData.address,

        city:
          savedBusiness.city ??
          formData.city,

        country:
          savedBusiness.country ??
          formData.country,

        businessHours:
          savedBusiness.businessHours ??
          formData.businessHours,

        website:
          savedBusiness.website ??
          formData.website,
      });

      setMessage(
        "Business settings saved successfully."
      );
    } catch (error) {
      console.error(
        "Save business settings error:",
        error
      );

      setError(
        error?.message ||
          "Unable to save business settings."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsSection
      title="Business Information"
      description="Manage the company information used across your business and public website."
      icon={Building2}
    >
      <form
        className="settings-form"
        onSubmit={handleSubmit}
      >
        {/* ======================================================
            STATUS
        ====================================================== */}

        {isLoading && (
          <div
            className="settings-form__status"
            role="status"
          >
            Loading business settings...
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
            BUSINESS LOCATION
        ====================================================== */}

        <div className="settings-business__group">
          <div className="settings-business__group-header">
            <MapPin size={17} />

            <div>
              <h3>Business Location</h3>

              <p>
                Keep your company's primary business
                location up to date.
              </p>
            </div>
          </div>

          <div className="settings-form__grid">
            <div className="settings-form__field settings-business__full">
              <label htmlFor="businessAddress">
                Business Address
              </label>

              <textarea
                id="businessAddress"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter complete business address"
                maxLength={300}
                rows={3}
                disabled={isLoading || isSaving}
              />

              <small>
                Primary office or registered business
                address.
              </small>
            </div>

            <div className="settings-form__field">
              <label htmlFor="businessCity">
                City
              </label>

              <input
                id="businessCity"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="Dubai"
                maxLength={100}
                disabled={isLoading || isSaving}
              />
            </div>

            <div className="settings-form__field">
              <label htmlFor="businessCountry">
                Country
              </label>

              <input
                id="businessCountry"
                name="country"
                type="text"
                value={formData.country}
                onChange={handleChange}
                placeholder="United Arab Emirates"
                maxLength={100}
                disabled={isLoading || isSaving}
              />
            </div>
          </div>
        </div>

        {/* ======================================================
            BUSINESS HOURS
        ====================================================== */}

        <div className="settings-business__group">
          <div className="settings-business__group-header">
            <Clock3 size={17} />

            <div>
              <h3>Business Hours</h3>

              <p>
                Define the normal operating hours shown
                to customers.
              </p>
            </div>
          </div>

          <div className="settings-form__grid">
            <div className="settings-form__field">
              <label htmlFor="businessHours">
                Business Hours
              </label>

              <input
                id="businessHours"
                name="businessHours"
                type="text"
                value={formData.businessHours}
                onChange={handleChange}
                placeholder="e.g. Mon - Sun, 24/7"
                maxLength={100}
                disabled={isLoading || isSaving}
              />

              <small>
                Example: Mon - Sun, 24/7
              </small>
            </div>

            <div className="settings-form__field">
              <label htmlFor="businessWebsite">
                Website
              </label>

              <input
                id="businessWebsite"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                maxLength={250}
                disabled={isLoading || isSaving}
              />

              <small>
                Public company website address.
              </small>
            </div>
          </div>
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

export default BusinessSettings;





