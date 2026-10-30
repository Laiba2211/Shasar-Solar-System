import { useState } from "react";
import PropTypes from "prop-types";
import SettingsHeader from "./components/SettingsHeader";
import SettingsSidebar from "./components/SettingsSidebar";
import GeneralSettings from "./sections/GeneralSettings";
import AdminProfileSettings from "./sections/AdminProfileSettings";
import AppearanceSettings from "./sections/AppearanceSettings";
import SecuritySettings from "./sections/SecuritySettings";
import NotificationSettings from "./sections/NotificationSettings";
import BusinessSettings from "./sections/BusinessSettings";
import SystemSettings from "./sections/SystemSettings";
import "./Settings.css";

const Settings = () => {
  const [activeSection, setActiveSection] =
    useState("general");

  return (
    <div className="settings-page">

      {/* ==========================================
          SETTINGS HEADER
      ========================================== */}

      <SettingsHeader />

      {/* ==========================================
          SETTINGS LAYOUT
      ========================================== */}

      <div className="settings-page__layout">

        {/* ========================================
            SETTINGS SIDEBAR
        ======================================== */}

        <SettingsSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* ========================================
            SETTINGS CONTENT
        ======================================== */}

        <section className="settings-page__content">

          {/* GENERAL */}

          {activeSection === "general" && (
  <GeneralSettings />
)}

          {/* ADMIN PROFILE */}

          {activeSection === "profile" && (
  <AdminProfileSettings />
)}

          {/* APPEARANCE */}

          {activeSection === "appearance" && (
  <AppearanceSettings />
)}

          {/* SECURITY */}

       {activeSection === "security" && (
  <SecuritySettings />
)}

          {/* NOTIFICATIONS */}

          {activeSection === "notifications" && (
            <NotificationSettings />
          )}
         

          {/* BUSINESS */}

        {activeSection === "business" && (
  <BusinessSettings />
)}
          {/* SYSTEM */}

          {activeSection === "system" && (
  <SystemSettings />
)}

        </section>

      </div>
    </div>
  );
};

export default Settings;