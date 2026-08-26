import { motion } from "framer-motion";

import { teamMembers } from "../../../data/teamData";

import "./teamMembers.css";

const TeamMembers = () => {
  /*
   * Duplicate the data for seamless infinite movement.
   * Keep this exactly as part of the existing slider approach.
   */
  const sliderItems = [...teamMembers, ...teamMembers];

  return (
    <section
      className="team-members"
      id="team-members"
      aria-labelledby="team-members-title"
    >
      <div className="container-fluid px-0">

        {/* ================================
            SECTION HEADER
        ================================= */}

        <div className="container">
          <motion.div
            className="team-members__header"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="team-members__eyebrow">
              Our Team
            </span>

            <h2 id="team-members-title">
              Meet the People Behind
              <span> Our Work</span>
            </h2>
          </motion.div>
        </div>

        {/* ================================
            CONTINUOUS SLIDER
        ================================= */}

        <div className="team-members__slider">
          <div className="team-members__track">
            {sliderItems.map((member, index) => (
              <article
                className="team-member-card"
                key={`${member.id}-${index}`}
              >
                {/* MEDIA */}

                <div className="team-member-card__media">
                  {member.type === "video" ? (
                    <video
                      src={member.media}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={member.name}
                    />
                  ) : (
                    <img
                      src={member.media}
                      alt={member.name}
                      loading="lazy"
                    />
                  )}

                  <div className="team-member-card__overlay" />
                </div>

                {/* NAME ONLY */}

                <div className="team-member-card__name">
                  <h3>{member.name}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;