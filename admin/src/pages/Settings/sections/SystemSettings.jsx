import {
  MonitorCog,
  CheckCircle2,
  Server,
  Database,
  Globe2,
  Code2,
} from "lucide-react";

import SettingsSection from "../components/SettingsSection";

const SystemSettings = () => {
  const systemInfo = [
    {
      label: "Application",
      value: "Shasar Solar Admin Panel",
      icon: MonitorCog,
      status: "Active",
    },
    {
      label: "Frontend",
      value: "React + Vite",
      icon: Code2,
      status: "Running",
    },
    {
      label: "Backend",
      value: "Node.js + Express",
      icon: Server,
      status: "Connected",
    },
    {
      label: "Database",
      value: "MongoDB",
      icon: Database,
      status: "Connected",
    },
    {
      label: "Environment",
      value: "Development",
      icon: Globe2,
      status: "Active",
    },
  ];

  return (
    <SettingsSection
      title="System Settings"
      description="View basic application, server, and database information."
      icon={MonitorCog}
    >
      <div className="settings-system">
        <div className="settings-system__status">
          <div className="settings-system__status-icon">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <strong>System Status</strong>
            <span>
              The admin panel is currently operational.
            </span>
          </div>

          <span className="settings-system__badge">
            Operational
          </span>
        </div>

        <div className="settings-system__grid">
          {systemInfo.map((item) => {
            const Icon = item.icon;

            return (
              <div
                className="settings-system__card"
                key={item.label}
              >
                <div className="settings-system__card-icon">
                  <Icon size={18} />
                </div>

                <div className="settings-system__card-content">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>

                <span className="settings-system__card-status">
                  {item.status}
                </span>
              </div>
            );
          })}
        </div>

        <div className="settings-system__note">
          <strong>Security Notice</strong>
          <p>
            Sensitive configuration values, database
            credentials, authentication secrets, and API
            keys are not displayed in the admin panel.
          </p>
        </div>
      </div>
    </SettingsSection>
  );
};

export default SystemSettings;