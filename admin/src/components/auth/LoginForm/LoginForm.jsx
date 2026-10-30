import { useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  LogIn,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./loginForm.css";

const initialForm = {
  email: "",
  password: "",
  remember: false,
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";

const LoginForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================================
  // HANDLE INPUT CHANGE
  // ==========================================================

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    if (error) {
      setError("");
    }
  };

  // ==========================================================
  // HANDLE LOGIN
  // ==========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prevent duplicate requests
    if (loading) {
      return;
    }

    setError("");

    const email = form.email.trim();
    const password = form.password;

    // ========================================================
    // FRONTEND VALIDATION
    // ========================================================

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);

    try {
      // ======================================================
      // ADMIN LOGIN API
      // ======================================================

      const response = await fetch(
        `${API_BASE_URL}/api/admin/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      // ======================================================
      // READ SERVER RESPONSE
      // ======================================================

      let result;

      try {
        result = await response.json();
      } catch {
        throw new Error(
          "The server returned an invalid response."
        );
      }

      // ======================================================
      // TEMPORARY FRONTEND LOGIN DEBUG
      // Does NOT print the password or token
      // ======================================================

      console.log("========== FRONTEND LOGIN DEBUG ==========");
      console.log("API URL:", `${API_BASE_URL}/api/admin/login`);
      console.log("HTTP status:", response.status);
      console.log("Response OK:", response.ok);
      console.log("Login success:", result?.success);
      console.log(
        "Token received:",
        !!result?.data?.token
      );
      console.log(
        "Admin received:",
        !!result?.data?.admin
      );
      console.log(
        "Admin role:",
        result?.data?.admin?.role
      );
      console.log("==========================================");

      // ======================================================
      // LOGIN FAILED
      // ======================================================

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Invalid email or password."
        );
      }

      // ======================================================
      // GET AUTHENTICATION DATA
      // ======================================================

      const token = result?.data?.token;
      const admin = result?.data?.admin;

      if (!token || !admin) {
        throw new Error(
          "Login response is missing authentication data."
        );
      }

      // ======================================================
      // CLEAR OLD AUTH DATA
      // ======================================================

      localStorage.removeItem("adminToken");
      localStorage.removeItem("admin");

      sessionStorage.removeItem("adminToken");
      sessionStorage.removeItem("admin");

      // ======================================================
      // SAVE AUTHENTICATION
      // ======================================================

      const storage = form.remember
        ? localStorage
        : sessionStorage;

      storage.setItem(
        "adminToken",
        token
      );

      storage.setItem(
        "admin",
        JSON.stringify(admin)
      );

      // ======================================================
      // VERIFY STORAGE
      // ======================================================

      console.log("========== AUTH STORAGE DEBUG ==========");
      console.log(
        "Storage:",
        form.remember
          ? "localStorage"
          : "sessionStorage"
      );
      console.log(
        "Token stored:",
        !!storage.getItem("adminToken")
      );
      console.log(
        "Admin stored:",
        !!storage.getItem("admin")
      );
      console.log("========================================");

      // ======================================================
      // REDIRECT TO ADMIN DASHBOARD
      // ======================================================

      console.log(
        "Redirecting to /admin/dashboard..."
      );

      navigate(
        "/admin/dashboard",
        {
          replace: true,
        }
      );
    } catch (error) {
      console.error(
        "Admin login error:",
        error
      );

      setError(
        error?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <form
      className="admin-login-form"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* =====================================================
          ERROR MESSAGE
      ===================================================== */}

      <div
        className={`admin-login-form__message ${
          error
            ? "admin-login-form__message--visible"
            : ""
        }`}
        role="alert"
        aria-live="polite"
      >
        {error}
      </div>

      {/* =====================================================
          EMAIL
      ===================================================== */}

      <div className="admin-login-form__field">
        <label htmlFor="admin-email">
          Email Address
        </label>

        <div className="admin-login-form__input-wrapper">
          <Mail
            size={18}
            aria-hidden="true"
          />

          <input
            id="admin-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="admin@shasartech.com"
            autoComplete="email"
            disabled={loading}
            required
          />
        </div>
      </div>

      {/* =====================================================
          PASSWORD
      ===================================================== */}

      <div className="admin-login-form__field">
        <label htmlFor="admin-password">
          Password
        </label>

        <div className="admin-login-form__input-wrapper">
          <LockKeyhole
            size={18}
            aria-hidden="true"
          />

          <input
            id="admin-password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
            disabled={loading}
            required
          />

          <button
            type="button"
            className="admin-login-form__password-toggle"
            onClick={() =>
              setShowPassword(
                (previous) => !previous
              )
            }
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            disabled={loading}
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          OPTIONS
      ===================================================== */}

      <div className="admin-login-form__options">
        <label className="admin-login-form__remember">
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
            disabled={loading}
          />

          <span>
            Remember me
          </span>
        </label>

        <button
          type="button"
          className="admin-login-form__forgot"
          disabled={loading}
        >
          Forgot password?
        </button>
      </div>

      {/* =====================================================
          SUBMIT
      ===================================================== */}

      <button
        type="submit"
        className="admin-login-form__submit"
        disabled={loading}
      >
        {loading ? (
          <>
            <span
              className="admin-login-form__spinner"
              aria-hidden="true"
            />

            <span>
              Signing in...
            </span>
          </>
        ) : (
          <>
            <span>
              Sign in to Dashboard
            </span>

            <LogIn size={18} />
          </>
        )}
      </button>
    </form>
  );
};

export default LoginForm;