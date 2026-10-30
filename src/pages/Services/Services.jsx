
import ServicesHero from "../../components/services/ServicesHero/ServicesHero";
import ServicesOverview from "../../components/services/ServicesOverview/ServicesOverview";
import WhyChooseServices from "../../components/services/WhyChooseServices/WhyChooseServices";
import ServicesGrid from "../../components/services/ServicesGrid/ServicesGrid";
import ServiceProcess from "../../components/services/ServiceProcess/ServiceProcess";
import ServicesFAQ from "../../components/services/ServicesFAQ/ServicesFAQ";
// import ServicesCTA from "../../components/services/ServicesCTA/ServicesCTA";
const Services = () => {
  return (
    <>
      <ServicesHero />
      <ServicesOverview />
      <WhyChooseServices />
      <ServicesGrid />
      <ServiceProcess />
      <ServicesFAQ />
      {/* <ServicesCTA /> */}
    </>
  );
};

export default Services;