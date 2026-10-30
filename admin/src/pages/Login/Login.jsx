import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sun,
  ArrowRight,
  LockKeyhole,
} from "lucide-react";

import LoginForm from "../../components/auth/LoginForm/LoginForm";

import "./login.css";

const Login = () => {
  return (
    <main className="admin-login">
      {/* Background decoration */}
      <div
        className="admin-login__glow admin-login__glow--one"
        aria-hidden="true"
      />

      <div
        className="admin-login__glow admin-login__glow--two"
        aria-hidden="true"
      />

      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100 py-4">
          <div className="col-12 col-md-9 col-lg-6 col-xl-5">

            <motion.div
              className="admin-login__card"
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.65,
                ease: "easeOut",
              }}
            >
              {/* Brand */}
              <motion.div
                className="admin-login__brand"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.15,
                  duration: 0.5,
                }}
              >
                <div className="admin-login__logo">
                  <Sun size={23} strokeWidth={2.3} />
                </div>

                <div>
                  <strong>Shasar Solar</strong>
                  <span>Administration Portal</span>
                </div>
              </motion.div>

              {/* Security badge */}
              <motion.div
                className="admin-login__security"
                initial={{
                  opacity: 0,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.25,
                  duration: 0.45,
                }}
              >
                <ShieldCheck size={16} />

                <span>
                  Secure administrator access
                </span>
              </motion.div>

              {/* Heading */}
              <div className="admin-login__heading">
                <h1>
                  Welcome back
                  <span>Administrator</span>
                </h1>

                <p>
                  Sign in to manage your solar projects,
                  services, inquiries and business operations.
                </p>
              </div>

              {/* Login Form */}
              <LoginForm />

              {/* Security note */}
              <div className="admin-login__security-note">
                <LockKeyhole size={15} />

                <span>
                  Your administrator credentials are
                  securely protected.
                </span>
              </div>

              {/* Footer */}
              <div className="admin-login__footer">
                <span>
                  Shasar Solar System
                </span>

                <span className="admin-login__footer-dot">
                  •
                </span>

                <span>
                  Admin Portal
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;