import { ShieldCheck } from "lucide-react";

const MarqueeItem = ({ title }) => {
  return (
    <div className="marquee-item">

      <ShieldCheck
        size={18}
        className="marquee-icon"
      />

      <span>{title}</span>

    </div>
  );
};

export default MarqueeItem;