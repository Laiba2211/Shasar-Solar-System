import PricingHero from "../../components/pricing/PricingHero/PricingHero";
import PricingPlans from "../../components/pricing/PricingPlans/PricingPlans";
import PricingComparison from "../../components/pricing/PricingComparison/PricingComparison";
import PricingFAQ from "../../components/pricing/PricingFAQ/PricingFAQ";
const Pricing = () => {
  return (
    <>
      <PricingHero />
      <PricingPlans />
      <PricingComparison />
      <PricingFAQ />
    </>
  );
};

export default Pricing;