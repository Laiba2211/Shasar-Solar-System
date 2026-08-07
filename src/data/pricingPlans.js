// ==========================================================
// PRICING PLANS DATA
// Dubai Solar Maintenance Packages
// ==========================================================

const pricingPlans = [
  {
    id: 1,

    name: "Basic",

    badge: "",

    price: "AED 399",

    duration: "Starting From",

    description:
      "Perfect for residential solar systems requiring routine inspections and essential maintenance services.",

    featured: false,

    buttonText: "Choose Plan",

    services: [
      "Initial System Inspection",
      "Basic Solar Panel Cleaning",
      "Performance Check",
      "Electrical Connection Inspection",
      "Monthly Maintenance Report",
      "Email Support",
    ],
  },

  {
    id: 2,

    name: "Standard",

    badge: "Most Popular",

    price: "AED 799",

    duration: "Starting From",

    description:
      "Ideal for homeowners and businesses seeking preventive maintenance with priority support.",

    featured: true,

    buttonText: "Choose Plan",

    services: [
      "Everything in Basic",
      "Deep Panel Cleaning",
      "Inverter Inspection",
      "Wiring Inspection",
      "Performance Optimization",
      "Priority Technical Support",
      "Quarterly Preventive Maintenance",
      "Detailed Performance Report",
    ],
  },

  {
    id: 3,

    name: "Premium",

    badge: "Best Value",

    price: "AED 1,299",

    duration: "Starting From",

    description:
      "Complete enterprise-grade maintenance with advanced monitoring, emergency support, and annual audits.",

    featured: false,

    buttonText: "Choose Plan",

    services: [
      "Everything in Standard",
      "Unlimited Technical Support",
      "Emergency Call-Out Priority",
      "Thermal Inspection",
      "Annual System Health Audit",
      "Remote Performance Monitoring",
      "Preventive Maintenance Visits",
      "Dedicated Account Manager",
      "Priority Spare Parts Support",
    ],
  },
];

export default pricingPlans;