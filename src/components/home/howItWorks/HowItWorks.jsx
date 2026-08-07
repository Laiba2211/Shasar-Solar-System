import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Timeline from "./Timeline";

import "./howItWorks.css";

const HowItWorks = () => {

    const navigate = useNavigate();

    return (

        <section
            className="how-it-works-section"
            id="how-it-works"
        >

            <div className="container">

                {/* ==========================
                    Section Header
                ========================== */}

                <motion.div
                    className="row justify-content-center"
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

                        <span className="how-badge">

                            ⚡ Simple Process

                        </span>

                        <h2 className="how-title">

                            How It Works

                        </h2>

                        <p className="how-description">

                            Going solar is easier than ever. From your
                            initial consultation to professional
                            installation and lifetime support, our
                            certified experts manage every step of the
                            journey with precision, transparency, and
                            unmatched customer care.

                        </p>

                    </div>

                </motion.div>

                {/* ==========================
                    Timeline
                ========================== */}

                <Timeline />

                {/* ==========================
                    Bottom CTA
                ========================== */}

                <motion.div
                    className="row mt-5"
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        delay: .5,
                    }}
                >

                    <div className="col-12 text-center">

                        <button
                            className="how-btn"
                            onClick={() => navigate("/contact")}
                        >

                            Get Free Consultation

                            <ArrowRight
                                size={18}
                                className="ms-2"
                            />

                        </button>

                    </div>

                </motion.div>

            </div>

        </section>

    );

};

export default HowItWorks;