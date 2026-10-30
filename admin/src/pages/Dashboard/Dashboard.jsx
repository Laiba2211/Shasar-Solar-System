import React, { useCallback, useEffect, useState } from "react";

import DashboardHeader from "./components/DashboardHeader";
import DashboardKpiGrid from "./components/DashboardKpiGrid";
import InquiryTrend from "./components/InquiryTrend";
import InquiryStatus from "./components/InquiryStatus";
import CustomerDemand from "./components/CustomerDemand";
import AttentionRequired from "./components/AttentionRequired";
import QuickActions from "./components/QuickActions";
import RecentInquiries from "./components/RecentInquiries";
import RecentProjects from "./components/RecentProjects";
import RecentTestimonials from "./components/RecentTestimonials";
import ContentOverview from "./components/ContentOverview";

import "./Dashboard.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const Dashboard = () => {
  const [dateFilter, setDateFilter] = useState("last_30_days");

  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("adminToken") ||
        sessionStorage.getItem("adminToken");

      if (!token) {
        throw new Error("Admin authentication token not found.");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/admin/dashboard?date=${encodeURIComponent(
          dateFilter
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to load dashboard data."
        );
      }

      setDashboardData(result.data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);

      setError(
        err.message || "Something went wrong while loading dashboard."
      );
    } finally {
      setLoading(false);
    }
  }, [dateFilter]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleDateFilterChange = (value) => {
    setDateFilter(value);
  };

  const handleRefresh = () => {
    fetchDashboard();
  };

  return (
    <div className="dashboard-page">
      <DashboardHeader
        dateFilter={dateFilter}
        onDateFilterChange={handleDateFilterChange}
        onRefresh={handleRefresh}
        loading={loading}
      />

      {loading && !dashboardData ? (
        <div className="dashboard-loading">
          <div className="dashboard-loading-spinner" />
          <p>Loading dashboard...</p>
        </div>
      ) : error && !dashboardData ? (
        <div className="dashboard-error">
          <div className="dashboard-error-content">
            <h3>Unable to load dashboard</h3>
            <p>{error}</p>

            <button
              type="button"
              className="dashboard-retry-btn"
              onClick={handleRefresh}
            >
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <>
          <DashboardKpiGrid
            overview={dashboardData?.overview}
            inventory={dashboardData?.inventory}
            loading={loading}
          />

          <div className="dashboard-main-grid">
            <InquiryTrend
              data={dashboardData?.inquiryTrend || []}
              reporting={dashboardData?.reporting}
              loading={loading}
            />

            <InquiryStatus
              data={dashboardData?.inquiryStatus || []}
              loading={loading}
            />
          </div>

          <div className="dashboard-main-grid">
            <CustomerDemand
              data={dashboardData?.customerDemand || []}
              loading={loading}
            />

            <AttentionRequired
              data={dashboardData?.attentionRequired || []}
              loading={loading}
            />
          </div>

          <QuickActions />

          <div className="dashboard-main-grid">
            <RecentInquiries
              data={dashboardData?.recentInquiries || []}
              loading={loading}
            />

            <RecentProjects
              data={dashboardData?.recentProjects || []}
              loading={loading}
            />
          </div>

          <div className="dashboard-main-grid">
            <RecentTestimonials
              data={dashboardData?.recentTestimonials || []}
              loading={loading}
            />

            <ContentOverview
              data={dashboardData?.contentOverview}
              loading={loading}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;