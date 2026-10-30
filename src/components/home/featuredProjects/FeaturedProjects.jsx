import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import featuredProjectsData from "../../../data/featuredProjectsData";
import ProjectCard from "./ProjectCard";

import "./featuredProjects.css";

const FeaturedProjects = () => {

    const navigate = useNavigate();

    // Home Page shows only featured projects
    const featuredProjects = featuredProjectsData.slice(0, 6);

    return (

        <section
            className="featured-projects-section py-5"
            id="featured-projects"
        >

            <div className="container">

                {/* ==========================================
                    Section Header
                ========================================== */}

                <motion.div
                    className="row justify-content-center mb-5"
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
                        duration: .7,
                    }}
                >

                    <div className="col-xl-8 col-lg-9 text-center">

                        <span className="projects-badge">

                            Our Portfolio

                        </span>

                        <h2 className="projects-title">

                            Featured Projects

                        </h2>

                        <p className="projects-description">

                            Discover a selection of our latest residential,
                            commercial, and industrial solar installations
                            across the UAE, delivering reliable renewable
                            energy solutions with exceptional performance,
                            long-term savings, and sustainable impact.

                        </p>

                    </div>

                </motion.div>

                {/* ==========================================
                    Projects Grid
                ========================================== */}

                <div className="row g-4">

                    {featuredProjects.map((project, index) => (

                        <div
                            className="col-lg-4 col-md-6 col-12"
                            key={project.id}
                        >

                            <ProjectCard
                                project={project}
                                index={index}
                            />

                        </div>

                    ))}

                </div>

                {/* ==========================================
                    Bottom CTA
                ========================================== */}

                <motion.div
                    className="text-center mt-5"
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        delay: .4,
                    }}
                >

                    <button
                        className="projects-btn"
                        onClick={() => navigate("/projects")}
                    >

                        View All Projects

                        <ArrowRight
                            size={18}
                            className="ms-2"
                        />

                    </button>

                </motion.div>

            </div>

        </section>

    );

};

export default FeaturedProjects;