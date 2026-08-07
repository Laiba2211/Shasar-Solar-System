import heroVideo from "../../../assets/videos/hero-video.mp4";

const HeroMedia = () => {
  return (
    <video
      className="hero-video"
      autoPlay
      muted
      loop
      playsInline
    >
      <source src={heroVideo} type="video/mp4" />
    </video>
  );
};

export default HeroMedia;