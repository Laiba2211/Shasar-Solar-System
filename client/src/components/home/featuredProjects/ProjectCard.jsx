import { motion } from "framer-motion";
import { MapPin, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project, index }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/projects");
  };

  return (
    <motion.article
      className="project-card card h-100 border-0"
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
      }}
      whileHover={{
        y: -8,
      }}
    >
      {/* ==========================
          Project Image
      ========================== */}

      <div className="project-image-wrapper">

        <img
          src={project.image}
          alt={project.title}
          className="img-fluid project-image"
          loading="lazy"
        />

        <span className="project-category">

          {project.category}

        </span>

      </div>

      {/* ==========================
          Card Body
      ========================== */}

      <div className="card-body d-flex flex-column">

        <h3 className="project-title">

          {project.title}

        </h3>

        <p className="project-description">

          {project.description}

        </p>

        {/* ==========================
            Meta Information
        ========================== */}

        <div className="project-meta mt-auto">

          <div className="project-meta-item">

            <MapPin size={18} />

            <span>

              {project.location}

            </span>

          </div>

          <div className="project-meta-item">

            <Zap size={18} />

            <span>

              {project.capacity}

            </span>

          </div>

        </div>

        {/* ==========================
            Button
        ========================== */}

        <button
          className="project-btn mt-4"
          onClick={handleNavigate}
        >

          View Project

          <ArrowRight
            size={18}
            className="ms-2"
          />

        </button>

      </div>

    </motion.article>
  );
};

export default ProjectCard;