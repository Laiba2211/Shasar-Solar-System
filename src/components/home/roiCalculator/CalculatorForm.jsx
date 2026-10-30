import { Zap } from "lucide-react";

import { ROI_CONFIG } from "../../../utils/roiCalculations";

const CalculatorForm = ({
  monthlyBill,
  setMonthlyBill,
}) => {

  // ===========================================
  // Handle Number Input
  // ===========================================

  const handleInputChange = (e) => {

    const value = Number(e.target.value);

    if (value < ROI_CONFIG.minBill) {
      setMonthlyBill(ROI_CONFIG.minBill);
      return;
    }

    if (value > ROI_CONFIG.maxBill) {
      setMonthlyBill(ROI_CONFIG.maxBill);
      return;
    }

    setMonthlyBill(value);

  };

  // ===========================================
  // Handle Slider
  // ===========================================

  const handleSliderChange = (e) => {

    setMonthlyBill(Number(e.target.value));

  };

  return (

    <div className="calculator-card card border-0 h-100">

      <div className="card-body p-4 p-lg-5">

        {/* =====================================
            Header
        ====================================== */}

        <div className="calculator-header mb-4">

          <div className="calculator-icon">

            <Zap size={28} />

          </div>

          <h3 className="calculator-title">

            Estimate Your Solar Savings

          </h3>

          <p className="calculator-subtitle">

            Enter your average monthly electricity bill
            to instantly estimate your potential savings.

          </p>

        </div>

        {/* =====================================
            Number Input
        ====================================== */}

        <div className="mb-4">

          <label
            htmlFor="monthlyBill"
            className="form-label calculator-label"
          >
            Average Monthly Electricity Bill (AED)
          </label>

          <input
            id="monthlyBill"
            type="number"
            className="form-control calculator-input"
            value={monthlyBill}
            min={ROI_CONFIG.minBill}
            max={ROI_CONFIG.maxBill}
            step="100"
            onChange={handleInputChange}
            aria-label="Monthly Electricity Bill"
          />

        </div>

        {/* =====================================
            Range Slider
        ====================================== */}

        <div className="mb-2">

          <input
            type="range"
            className="form-range calculator-range"
            value={monthlyBill}
            min={ROI_CONFIG.minBill}
            max={ROI_CONFIG.maxBill}
            step="100"
            onChange={handleSliderChange}
            aria-label="Electricity Bill Slider"
          />

        </div>

        {/* =====================================
            Slider Values
        ====================================== */}

        <div className="d-flex justify-content-between calculator-range-values">

          <span>

            AED {ROI_CONFIG.minBill}

          </span>

          <span>

            AED {monthlyBill.toLocaleString()}

          </span>

          <span>

            AED {ROI_CONFIG.maxBill}

          </span>

        </div>

      </div>

    </div>

  );

};

export default CalculatorForm;