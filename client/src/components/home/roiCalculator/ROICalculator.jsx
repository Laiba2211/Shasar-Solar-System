import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  DollarSign,
  TrendingUp,
  Sun,
  Wallet,
  Clock3,
  Leaf,
} from "lucide-react";

import CalculatorForm from "./CalculatorForm";
import ResultCard from "./ResultCard";

import {
  ROI_CONFIG,
  calculateROI,
} from "../../../utils/roiCalculations";

import "./roiCalculator.css";

const ROICalculator = () => {

  // ==========================================
  // State
  // ==========================================

  const [monthlyBill, setMonthlyBill] = useState(
    ROI_CONFIG.defaultBill
  );

  // ==========================================
  // Live Calculations
  // ==========================================

  const roi = useMemo(() => {

    return calculateROI(monthlyBill);

  }, [monthlyBill]);

  // ==========================================
  // Results
  // ==========================================

  const results = [

    {
      id: 1,
      icon: DollarSign,
      title: "Monthly Savings",
      value: roi.monthlySavings,
      prefix: "AED ",
      subtitle: "Estimated monthly savings",
    },

    {
      id: 2,
      icon: TrendingUp,
      title: "Annual Savings",
      value: roi.annualSavings,
      prefix: "AED ",
      subtitle: "Estimated yearly savings",
    },

    {
      id: 3,
      icon: Sun,
      title: "Recommended System",
      value: roi.systemSize,
      suffix: " kW",
      decimals: 1,
      subtitle: "Ideal solar capacity",
    },

    {
      id: 4,
      icon: Wallet,
      title: "Installation Cost",
      value: roi.installationCost,
      prefix: "AED ",
      subtitle: "Estimated investment",
    },

    {
      id: 5,
      icon: Clock3,
      title: "Payback Period",
      value: roi.paybackYears,
      suffix: " Years",
      decimals: 1,
      subtitle: "Estimated ROI period",
    },

    {
      id: 6,
      icon: Leaf,
      title: "CO₂ Reduction",
      value: roi.co2Reduction,
      suffix: " Tons",
      decimals: 1,
      subtitle: "Annual carbon reduction",
    },

  ];

  return (

    <section
      className="roi-section py-5"
      id="roi-calculator"
    >

      <div className="container">

        {/* ==================================
            Header
        =================================== */}

        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
        >

          <span className="roi-badge">

            ⚡ Smart Solar Calculator

          </span>

          <h2 className="roi-title mt-3">

            See How Much You Could Save

          </h2>

          <p className="roi-description mx-auto">

            Estimate your annual savings,
            recommended solar system size,
            installation investment,
            and environmental impact in just a few seconds.

          </p>

        </motion.div>

        {/* ==================================
            Calculator + Results
        =================================== */}

        <div className="row g-4 align-items-start">

          {/* Calculator */}

          <div className="col-lg-5">

            <CalculatorForm
              monthlyBill={monthlyBill}
              setMonthlyBill={setMonthlyBill}
            />

          </div>

          {/* Results */}

          <div className="col-lg-7">

            <div className="row g-4">

              {results.map((item, index) => (

                <div
                  className="col-md-6"
                  key={item.id}
                >

                  <ResultCard
                    icon={item.icon}
                    title={item.title}
                    value={item.value}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    decimals={item.decimals}
                    subtitle={item.subtitle}
                    delay={index * 0.08}
                  />

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>

  );

};

export default ROICalculator;