import { useEffect, useState } from "react";
import {
  Palette,
  Sun,
  Moon,
  Check,
} from "lucide-react";

import SettingsSection from "../components/SettingsSection";

const AppearanceSettings = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("admin-theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("admin-theme", theme);
  }, [theme]);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  return (
    <SettingsSection
      title="Appearance"
      description="Customize the visual appearance of your admin panel."
      icon={Palette}
    >
      <div className="settings-appearance">
        <div className="settings-appearance__intro">
          <h3>Theme Preference</h3>
          <p>
            Choose how the Shasar Solar admin panel
            should appear on your device.
          </p>
        </div>

        <div className="settings-appearance__options">
          <button
            type="button"
            className={`settings-appearance__option ${
              theme === "light" ? "active" : ""
            }`}
            onClick={() => handleThemeChange("light")}
          >
            <div className="settings-appearance__option-icon">
              <Sun size={21} />
            </div>

            <div className="settings-appearance__option-content">
              <strong>Light Mode</strong>
              <span>
                Use a bright and clean admin interface.
              </span>
            </div>

            {theme === "light" && (
              <Check
                className="settings-appearance__check"
                size={18}
              />
            )}
          </button>

          <button
            type="button"
            className={`settings-appearance__option ${
              theme === "dark" ? "active" : ""
            }`}
            onClick={() => handleThemeChange("dark")}
          >
            <div className="settings-appearance__option-icon">
              <Moon size={21} />
            </div>

            <div className="settings-appearance__option-content">
              <strong>Dark Mode</strong>
              <span>
                Use a darker interface for comfortable
                viewing.
              </span>
            </div>

            {theme === "dark" && (
              <Check
                className="settings-appearance__check"
                size={18}
              />
            )}
          </button>
        </div>

        <div className="settings-appearance__status">
          <span>Current Theme</span>
          <strong>
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </strong>
        </div>
      </div>
    </SettingsSection>
  );
};

export default AppearanceSettings;