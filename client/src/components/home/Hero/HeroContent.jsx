import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

const HeroContent = () => {
  return (
    <div className="hero-content">
      <HeroBadge />

      <h6
        id="hero-heading"
        className="hero-title"
      >
        Power Your Home With

        <span> Smart Solar Energy </span>

        Solutions
      </h6>

      <p className="hero-description">
        Shasar Solar System delivers premium residential and
        commercial solar panel installation, helping families
        and businesses reduce electricity costs while embracing
        clean, reliable, and sustainable renewable energy.
      </p>

      <HeroButtons />

      <HeroStats />
    </div>
  );
};

export default HeroContent;