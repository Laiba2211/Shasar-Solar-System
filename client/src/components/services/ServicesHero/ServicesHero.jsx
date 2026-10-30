import { motion } from "framer-motion";

import ServicesHeroBadge from "./ServicesHeroBadge";
import ServicesHeroButtons from "./ServicesHeroButtons";
import ServicesHeroStats from "./ServicesHeroStats";

import "./servicesHero.css";
const ServicesHero = () => {

    return (

<section className="services-hero">

<div className="services-hero-pattern"></div>

<div className="container">

<div className="row justify-content-center">

<div className="col-xl-9 col-lg-10">

<ServicesHeroBadge/>

<motion.h1
className="services-hero-title"
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{delay:.2}}
>

Complete Solar Energy Solutions

<span>

Built for Homes, Businesses & Industries

</span>

</motion.h1>

<motion.p
className="services-hero-description"
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{delay:.35}}
>

From residential rooftop systems to large-scale commercial and industrial solar projects, Shasar Solar delivers complete engineering, installation, maintenance, and energy optimization services across Dubai and the UAE using premium technology and certified expertise.

</motion.p>

<ServicesHeroButtons/>

<ServicesHeroStats/>

</div>

</div>

</div>

</section>

    );

};

export default ServicesHero;