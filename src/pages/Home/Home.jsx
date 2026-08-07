import Hero from "../../components/home/Hero/Hero";
import Marquee from "../../components/home/marquee/Marquee";
import Stats from "../../components/home/stats/Stats";
import OurExpertise from "../../components/home/expertise/OurExpertise";
// import WhyShasar from "../../components/home/whyShasar/WhyShasar";
import Pricing from "../../components/home/pricing/Pricing";
import ROICalculator from "../../components/home/roiCalculator/ROICalculator";
import HowItWorks from "../../components/home/howItWorks/HowItWorks";
import FeaturedProjects from "../../components/home/featuredProjects/FeaturedProjects";
import Testimonials from "../../components/home/testimonials/Testimonials";


const Home = () => {
  return (
    <>
      <Hero />

      <Marquee />

      <Stats />

      <OurExpertise />
       
      {/* <WhyShasar /> */}

      <Pricing />

      <ROICalculator />

      <HowItWorks />

      <FeaturedProjects />

      <Testimonials />
    </>
  );
};

export default Home;