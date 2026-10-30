import { motion } from "framer-motion";

const stats = [

    {
        number:"10+",
        label:"Years Experience"
    },

    {
        number:"400+",
        label:"Projects Delivered"
    },

    {
        number:"DEWA",
        label:"Approved Engineers"
    },

    {
        number:"24/7",
        label:"Technical Support"
    }

];

const ServicesHeroStats = () => {

    return (

        <motion.div
        className="row g-4 services-hero-stats"
        initial={{opacity:0,y:40}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        transition={{duration:0.7}}
        >

            {stats.map((item,index)=>(

                <div
                key={index}
                className="col-6 col-lg-3"
                >

                    <div className="services-stat-card">

                        <h3>{item.number}</h3>

                        <p>{item.label}</p>

                    </div>

                </div>

            ))}

        </motion.div>

    );

};

export default ServicesHeroStats;