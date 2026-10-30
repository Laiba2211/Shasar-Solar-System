import React, { useMemo } from "react";
import { TrendingUp } from "lucide-react";

const InquiryTrend = ({
  data = [],
  reporting = {},
  loading = false,
}) => {
  const chartData = useMemo(() => {
    if (!Array.isArray(data)) {
      return [];
    }

    return data
      .filter(
        (item) =>
          item &&
          typeof item.date === "string" &&
          Number.isFinite(Number(item.count))
      )
      .map((item) => ({
        date: item.date,
        count: Number(item.count) || 0,
      }));
  }, [data]);

  const maxValue = useMemo(() => {
    if (!chartData.length) {
      return 0;
    }

    return Math.max(
      ...chartData.map((item) => item.count)
    );
  }, [chartData]);

  const totalInquiries = useMemo(() => {
    return chartData.reduce(
      (total, item) => total + item.count,
      0
    );
  }, [chartData]);

  const chartPoints = useMemo(() => {
    if (!chartData.length) {
      return "";
    }

    const width = 1000;
    const height = 260;
    const horizontalPadding = 30;
    const verticalPadding = 24;

    const usableWidth =
      width - horizontalPadding * 2;

    const usableHeight =
      height - verticalPadding * 2;

    const denominator =
      Math.max(chartData.length - 1, 1);

    return chartData
      .map((item, index) => {
        const x =
          horizontalPadding +
          (index / denominator) * usableWidth;

        const normalizedValue =
          maxValue > 0
            ? item.count / maxValue
            : 0;

        const y =
          height -
          verticalPadding -
          normalizedValue * usableHeight;

        return `${x},${y}`;
      })
      .join(" ");
  }, [chartData, maxValue]);

  const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const visibleLabels = useMemo(() => {
    if (!chartData.length) {
      return [];
    }

    if (chartData.length <= 7) {
      return chartData.map((item, index) => ({
        ...item,
        index,
      }));
    }

    const maxLabels = 6;

    const indexes = Array.from(
      { length: maxLabels },
      (_, index) =>
        Math.round(
          (index * (chartData.length - 1)) /
            (maxLabels - 1)
        )
    );

    return indexes.map((index) => ({
      ...chartData[index],
      index,
    }));
  }, [chartData]);

  return (
    <section className="dashboard-panel inquiry-trend-panel">
      <div className="dashboard-panel-header">
        <div className="dashboard-panel-heading">
          <div className="dashboard-panel-icon inquiry-trend-icon">
            <TrendingUp
              size={19}
              strokeWidth={2}
            />
          </div>

          <div>
            <h2 className="dashboard-panel-title">
              Inquiry Trend
            </h2>

            <p className="dashboard-panel-subtitle">
              Daily inquiries during the selected period
            </p>
          </div>
        </div>

        <div className="dashboard-panel-summary">
          <span className="dashboard-panel-summary-label">
            Total
          </span>

          <strong className="dashboard-panel-summary-value">
            {loading ? "—" : totalInquiries}
          </strong>
        </div>
      </div>

      <div className="dashboard-chart-container">
        {loading ? (
          <div className="dashboard-chart-loading">
            <div className="dashboard-chart-skeleton" />
          </div>
        ) : chartData.length === 0 ? (
          <div className="dashboard-empty-state">
            <TrendingUp
              size={30}
              strokeWidth={1.7}
            />

            <h3>No inquiry data</h3>

            <p>
              There are no inquiries for the selected
              reporting period.
            </p>
          </div>
        ) : (
          <>
            <div className="dashboard-chart-y-axis">
              <span>{maxValue}</span>
              <span>
                {Math.round(maxValue * 0.75)}
              </span>
              <span>
                {Math.round(maxValue * 0.5)}
              </span>
              <span>
                {Math.round(maxValue * 0.25)}
              </span>
              <span>0</span>
            </div>

            <div className="dashboard-line-chart">
              <div className="dashboard-chart-grid">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <svg
                className="dashboard-chart-svg"
                viewBox="0 0 1000 260"
                preserveAspectRatio="none"
                role="img"
                aria-label="Inquiry trend chart"
              >
                <polyline
                  points={chartPoints}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="dashboard-chart-line"
                />

                {chartData.map((item, index) => {
                  const width = 1000;
                  const height = 260;
                  const horizontalPadding = 30;
                  const verticalPadding = 24;

                  const usableWidth =
                    width -
                    horizontalPadding * 2;

                  const usableHeight =
                    height -
                    verticalPadding * 2;

                  const denominator =
                    Math.max(
                      chartData.length - 1,
                      1
                    );

                  const x =
                    horizontalPadding +
                    (index / denominator) *
                      usableWidth;

                  const normalizedValue =
                    maxValue > 0
                      ? item.count / maxValue
                      : 0;

                  const y =
                    height -
                    verticalPadding -
                    normalizedValue *
                      usableHeight;

                  return (
                    <circle
                      key={`${item.date}-${index}`}
                      cx={x}
                      cy={y}
                      r="5"
                      className="dashboard-chart-point"
                    />
                  );
                })}
              </svg>

              <div className="dashboard-chart-labels">
                {visibleLabels.map((item) => (
                  <span
                    key={`${item.date}-${item.index}`}
                  >
                    {formatDate(item.date)}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {!loading && reporting?.timezone && (
        <div className="dashboard-chart-footer">
          Reporting timezone: {reporting.timezone}
        </div>
      )}
    </section>
  );
};

export default InquiryTrend;