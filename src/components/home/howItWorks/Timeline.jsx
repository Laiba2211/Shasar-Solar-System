import { motion } from "framer-motion";

import processSteps from "../../../data/processSteps";
import TimelineItem from "./TimelineItem";

const Timeline = () => {
  return (
    <section className="timeline-wrapper">

      {/* Animated Timeline Line */}

      <motion.div
        className="timeline-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      />

      <div className="container">

        <div className="row justify-content-center">

          {processSteps.map((step, index) => (

            <div
              className="col-lg-2 col-md-4 col-sm-6 col-12"
              key={step.id}
            >
              <TimelineItem
                step={step}
                index={index}
              />
            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Timeline;