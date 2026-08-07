// ===========================================================
// ROI Savings Calculator
// Utility Functions
// Shasar Solar System
// ===========================================================

// ===========================================================
// Slider Configuration
// Change these values anytime.
// ===========================================================

export const ROI_CONFIG = {
  minBill: 500,
  maxBill: 10000,
  defaultBill: 2000,
};

// ===========================================================
// Currency Formatter
// ===========================================================

export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-AE", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
};

// ===========================================================
// Number Formatter
// ===========================================================

export const formatNumber = (value, decimals = 0) => {
  return Number(value).toFixed(decimals);
};

// ===========================================================
// Main ROI Calculation
// ===========================================================

export const calculateROI = (monthlyBill) => {

  const bill = Number(monthlyBill);

  // --------------------------------------------
  // Estimated Monthly Savings
  // Assume 70% reduction in electricity bill
  // --------------------------------------------

  const monthlySavings = bill * 0.70;

  // --------------------------------------------
  // Annual Savings
  // --------------------------------------------

  const annualSavings = monthlySavings * 12;

  // --------------------------------------------
  // Recommended System Size
  // Approximation:
  // Every AED 400 monthly bill ≈ 1 kW
  // --------------------------------------------

  const systemSize = bill / 400;

  // --------------------------------------------
  // Installation Cost
  // Approximation:
  // AED 4,800 per kW
  // --------------------------------------------

  const installationCost = systemSize * 4800;

  // --------------------------------------------
  // Payback Period
  // --------------------------------------------

  const paybackYears = installationCost / annualSavings;

  // --------------------------------------------
  // CO₂ Reduction
  // Approximation:
  // 1 kW = 1.45 Tons annually
  // --------------------------------------------

  const co2Reduction = systemSize * 1.45;

  // --------------------------------------------
  // Trees Equivalent
  // Approximation:
  // 1 Ton CO₂ ≈ 40 Trees
  // --------------------------------------------

  const treesPlanted = co2Reduction * 40;

  return {

    monthlySavings,

    annualSavings,

    systemSize,

    installationCost,

    paybackYears,

    co2Reduction,

    treesPlanted,

  };

};