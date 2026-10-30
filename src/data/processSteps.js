// ==========================================================
// Process Steps Data
// Home Page - How It Works
// ==========================================================

import {
  ClipboardCheck,
  SearchCheck,
  PencilRuler,
  FileText,
  Wrench,
  ShieldCheck,
} from "lucide-react";

const processSteps = [
  {
    id: 1,
    number: "01",
    title: "Free Consultation",
    description:
      "Discuss your energy requirements with our certified solar consultants and receive expert guidance tailored to your property.",
    icon: ClipboardCheck,
  },

  {
    id: 2,
    number: "02",
    title: "Site Inspection",
    description:
      "Our engineers perform a detailed on-site assessment to evaluate roof suitability, shading, and energy consumption.",
    icon: SearchCheck,
  },

  {
    id: 3,
    number: "03",
    title: "Custom System Design",
    description:
      "We design a high-performance solar solution optimized for efficiency, long-term savings, and your specific energy goals.",
    icon: PencilRuler,
  },

  {
    id: 4,
    number: "04",
    title: "Quotation & Approval",
    description:
      "Receive a transparent proposal with detailed pricing, expected savings, project timeline, and system specifications.",
    icon: FileText,
  },

  {
    id: 5,
    number: "05",
    title: "Installation & Testing",
    description:
      "Certified technicians install the complete solar system, perform safety inspections, and ensure peak operating performance.",
    icon: Wrench,
  },

  {
    id: 6,
    number: "06",
    title: "Monitoring & Support",
    description:
      "Enjoy continuous monitoring, preventive maintenance, warranty assistance, and lifetime customer support for peace of mind.",
    icon: ShieldCheck,
  },
];

export default processSteps;