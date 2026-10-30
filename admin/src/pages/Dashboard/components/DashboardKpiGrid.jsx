import React from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  MessageSquare,
  Target,
} from "lucide-react";

import DashboardKpiCard from "./DashboardKpiCard";

const DashboardKpiGrid = ({
  overview = {},
  inventory = {},
  loading = false,
}) => {
  const kpiCards = [
    {
      title: "Total Inquiries",
      value: overview.totalInquiries ?? 0,
      description: "Current reporting period",
      icon: MessageSquare,
      iconClass: "kpi-inquiries",
    },
    {
      title: "New Leads",
      value: overview.newLeads ?? 0,
      description: "New customer inquiries",
      icon: FileText,
      iconClass: "kpi-new-leads",
    },
    {
      title: "Qualified Leads",
      value: overview.qualifiedLeads ?? 0,
      description: "Qualified opportunities",
      icon: Target,
      iconClass: "kpi-qualified",
    },
    {
      title: "Converted Leads",
      value: overview.convertedLeads ?? 0,
      description: "Converted opportunities",
      icon: CheckCircle2,
      iconClass: "kpi-converted",
    },
    {
      title: "Total Projects",
      value: inventory.totalProjects ?? 0,
      description: "All projects in system",
      icon: BriefcaseBusiness,
      iconClass: "kpi-projects",
    },
    {
      title: "Active Services",
      value: inventory.activeServices ?? 0,
      description: "Currently active services",
      icon: CircleDollarSign,
      iconClass: "kpi-services",
    },
  ];

  return (
    <section
      className="dashboard-kpi-grid"
      aria-label="Dashboard key performance indicators"
    >
      {kpiCards.map((card) => (
        <DashboardKpiCard
          key={card.title}
          title={card.title}
          value={card.value}
          description={card.description}
          icon={card.icon}
          iconClass={card.iconClass}
          loading={loading}
        />
      ))}
    </section>
  );
};

export default DashboardKpiGrid;