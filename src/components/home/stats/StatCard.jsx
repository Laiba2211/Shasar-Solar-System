import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const StatCard = ({
  value,
  suffix,
  title,
  icon: Icon,
}) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let start = 0;

    const duration = 1800;

    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <motion.article
      ref={ref}
      className="stat-card"
      variants={{
        hidden: {
          opacity: 0,
          y: 40,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
          },
        },
      }}
      whileHover={{
        y: -8,
      }}
    >
      <div className="stat-icon">
        <Icon size={26} />
      </div>

      <h3 className="stat-number">
        {count}
        {suffix}
      </h3>

      <p className="stat-title">
        {title}
      </p>
    </motion.article>
  );
};

export default StatCard;