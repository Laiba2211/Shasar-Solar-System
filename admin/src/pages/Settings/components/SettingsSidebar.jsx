import {
  Settings2,
  UserRound,
  Palette,
  ShieldCheck,
  Bell,
  Building2,
  MonitorCog,
} from "lucide-react";

const settingsItems = [
  {
    id: "general",
    label: "General",
    icon: Settings2,
  },
  {
    id: "profile",
    label: "Admin Profile",
    icon: UserRound,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
  },
  {
    id: "security",
    label: "Security",
    icon: ShieldCheck,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "business",
    label: "Business",
    icon: Building2,
  },
  {
    id: "system",
    label: "System",
    icon: MonitorCog,
  },
];

const SettingsSidebar = ({
  activeSection,
  onSectionChange,
}) => {
  return (
    <aside className="settings-page__sidebar">
      {settingsItems.map((item) => {
        const Icon = item.icon;

        const isActive =
          activeSection === item.id;

        return (
          <button
            key={item.id}
            type="button"
            className={`settings-page__nav-item ${
              isActive ? "active" : ""
            }`}
            onClick={() =>
              onSectionChange(item.id)
            }
          >
            <Icon
              size={17}
              strokeWidth={1.9}
            />

            <span>{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
};

export default SettingsSidebar;