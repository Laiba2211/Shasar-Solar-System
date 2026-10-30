import {
  Star,
  FolderKanban,
  BadgeCheck,
  Users,
} from "lucide-react";

import { motion } from "framer-motion";

const stats = [
  {
    icon: Star,
    title: "Rated Excellence",
    value: "★★★★★",
  },
  {
    icon: FolderKanban,
    title: "Projects",
    value: "500+",
  },
  {
    icon: BadgeCheck,
    title: "Customer Satisfaction",
    value: "98%",
  },
  {
    icon: Users,
    title: "Experience",
    value: "10+ Years",
  },
];

const HeroStats = () => {
  return (
    <motion.div
      className="hero-stats"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
            delayChildren: 0.45,
          },
        },
      }}
    >
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={index}
            className="hero-stat-card"
            variants={{
              hidden: {
                opacity: 0,
                y: 25,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            transition={{
              duration: 0.6,
            }}
            whileHover={{
              y: -6,
            }}
          >
            <div className="hero-stat-icon">
              <Icon size={20} />
            </div>

            <div className="hero-stat-content">
              <h3>{item.value}</h3>

              <p>{item.title}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default HeroStats;