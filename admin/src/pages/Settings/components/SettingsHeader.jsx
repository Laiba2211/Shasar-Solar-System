import { Settings } from "lucide-react";

const SettingsHeader = () => {
  return (
    <div className="settings-page__header">
      <div className="settings-page__header-content">
        <div className="settings-page__header-icon">
          <Settings
            size={22}
            strokeWidth={1.9}
          />
        </div>

        <div>
          <h1>Settings</h1>

          <p>
            Manage your admin account, company preferences,
            security, notifications, and system settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsHeader;