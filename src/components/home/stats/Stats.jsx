import { motion } from "framer-motion";
import {
  CalendarClock,
  BriefcaseBusiness,
  Zap,
  BadgeCheck,
} from "lucide-react";

import StatCard from "./StatCard";
import "./stats.css";

const stats = [
  {
    id: 1,
    value: 12,
    suffix: "+",
    title: "Years Experience",
    icon: CalendarClock,
  },
  {
    id: 2,
    value: 450,
    suffix: "+",
    title: "Projects Completed",
    icon: BriefcaseBusiness,
  },
  {
    id: 3,
    value: 125,
    suffix: " MW",
    title: "MW Installed",
    icon: Zap,
  },
  {
    id: 4,
    value: 100,
    suffix: "%",
    title: "Client Satisfaction",
    icon: BadgeCheck,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const Stats = () => {
  return (
    <section className="stats-section">

      <div className="container">

        <motion.div
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map((item) => (
            <StatCard
              key={item.id}
              {...item}
            />
          ))}
        </motion.div>

      </div>

    </section>
  );
};

export default Stats;