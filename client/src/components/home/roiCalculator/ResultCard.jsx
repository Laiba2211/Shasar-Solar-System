import { motion } from "framer-motion";

const ResultCard = ({
  icon: Icon,
  title,
  value,
  prefix = "",
  suffix = "",
  subtitle,
}) => {
  console.log("Icon:", Icon);

  return (
    <motion.article className="card p-4">
      <div className="result-icon">
        {Icon ? <Icon size={28} /> : null}
      </div>

      <h3>
        {prefix}
        {value}
        {suffix}
      </h3>

      <h4>{title}</h4>

      <p>{subtitle}</p>
    </motion.article>
  );
};

export default ResultCard;