// ==========================================================
// SHASAR SOLAR SYSTEM
// SERVICES DATA
// Single Source of Truth
// ==========================================================

// ==========================================================
// SERVICE IMAGES
// ==========================================================

import residentialSolar from "../assets/videos/services/residential-solar.mp4";
import commercialSolar from "../assets/images/services/commercial-solar.jpg";
import industrialSolar from "../assets/images/services/industrial-solar.jpeg";
import batteryStorage from "../assets/videos/services/battery-storage.mp4";
import solarMaintenance from "../assets/videos/services/solar-maintenance.mp4";
// import solarCleaning from "../assets/images/services/solar-cleaning.jpg";
import solarDesign from "../assets/images/services/solar-design.jpeg";
import energyAudit from "../assets/images/services/energy-audit.jpg";
import installationOnly from "../assets/videos/services/installation-only.mp4";
import evCharging from "../assets/images/services/ev-charging.jpg";
import agriculturalSolar from "../assets/images/services/agricultural-solar.jpg";
import solarCarports from "../assets/images/services/solar-carports.jpeg";

// ==========================================================
// HOME PAGE FEATURED SERVICES
// ==========================================================

export const featuredServices = [
  {
    id: 1,
    video: residentialSolar,
    title: "Residential Solar",
    description:
      "Premium rooftop solar systems designed for villas, apartments, and modern homes across the UAE.",
    slug: "residential-solar",
  },

  {
    id: 2,
    image: commercialSolar,
    title: "Commercial Solar",
    description:
      "Reduce operational costs with scalable commercial rooftop solar solutions for businesses.",
    slug: "commercial-solar",
  },

  {
    id: 3,
    video: batteryStorage,
    title: "Battery Storage",
    description:
      "Store excess solar energy for uninterrupted backup power and maximum energy independence.",
    slug: "battery-storage",
  },

  {
    id: 4,
    video: solarMaintenance,
    title: "Solar Maintenance",
    description:
      "Professional inspection and maintenance services to maximize efficiency and system lifespan.",
    slug: "solar-maintenance",
  },
];

// ==========================================================
// WHY CHOOSE OUR SERVICES
// ==========================================================

export const whyChooseServices = [
  {
    id: 1,
    title: "DEWA Approved Engineers",
    description:
      "Certified experts delivering fully compliant solar engineering and installation services.",
    icon: "ShieldCheck",
  },

  {
    id: 2,
    title: "Premium Equipment",
    description:
      "We install only Tier-1 solar panels, inverters, and premium electrical components.",
    icon: "BadgeCheck",
  },

  {
    id: 3,
    title: "Fast Installation",
    description:
      "Efficient project execution with minimal disruption to your home or business.",
    icon: "Clock3",
  },

  {
    id: 4,
    title: "24/7 Technical Support",
    description:
      "Dedicated after-sales service, monitoring, and maintenance whenever you need assistance.",
    icon: "Headphones",
  },
];

// ==========================================================
// COMPLETE SERVICES PAGE
// ==========================================================

export const services = [
  {
    id: 1,
    video: residentialSolar,
    title: "Residential Solar",
    description:
      "Custom rooftop solar systems designed for villas, apartments, and residential communities.",
    slug: "residential-solar",
  },

  {
    id: 2,
    image: commercialSolar,
    title: "Commercial Solar",
    description:
      "Scalable solar energy systems helping businesses reduce electricity costs and improve sustainability.",
    slug: "commercial-solar",
  },

  {
    id: 3,
     image: industrialSolar,
    title: "Industrial Solar",
    description:
      "Large-scale industrial solar installations for factories, warehouses, and manufacturing facilities.",
    slug: "industrial-solar",
  },

  {
    id: 4,
    video: batteryStorage,
    title: "Battery Storage",
    description:
      "Reliable battery storage systems for uninterrupted power and energy optimization.",
    slug: "battery-storage",
  },

  {
    id: 5,
    video: solarMaintenance,
    title: "Solar Maintenance",
    description:
      "Routine inspections and preventive maintenance to maximize system performance.",
    slug: "solar-maintenance",
  },

  // {
  //   id: 6,
  //   image: solarCleaning,
  //   title: "Solar Panel Cleaning",
  //   description:
  //     "Professional cleaning services that improve panel efficiency and long-term energy production.",
  //   slug: "solar-cleaning",
  // },

  {
    id: 7,
    image: solarDesign,
    title: "Solar Design & Engineering",
    description:
      "Complete engineering, load analysis, and customized solar system design services.",
    slug: "solar-design",
  },

  {
    id: 8,
    image: energyAudit,
    title: "Energy Audits",
    description:
      "Professional energy assessments to identify efficiency improvements and cost savings.",
    slug: "energy-audit",
  },

  {
    id: 9,
    video: installationOnly,
    title: "Installation Only",
    description:
      "Professional installation services for customers who already own solar equipment.",
    slug: "installation-only",
  },

  {
    id: 10,
    image: evCharging,
    title: "EV Charging Integration",
    description:
      "Smart EV charging systems seamlessly integrated with your solar installation.",
    slug: "ev-charging",
  },

  {
    id: 11,
    image: agriculturalSolar,
    title: "Agricultural Solar",
    description:
      "Efficient solar power systems for farms, irrigation, and agricultural facilities.",
    slug: "agricultural-solar",
  },

  {
    id: 12,
    image: solarCarports,
    title: "Solar Carports",
    description:
      "Modern solar carport structures generating renewable energy while protecting vehicles.",
    slug: "solar-carports",
  },
];
export default services;