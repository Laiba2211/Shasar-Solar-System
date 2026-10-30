import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  RefreshCw,
  Eye,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Building2,
  Zap,
  CalendarDays,
  Clock3,
  ChevronLeft,
  ChevronRight,
  Inbox,
  CheckCircle2,
  AlertCircle,
  CircleDot,
  MessageSquare,
  UserRound,
  X,
  ExternalLink,
  Filter,
  Check,
  LoaderCircle,
} from "lucide-react";

import "./Inquiries.css";

/* ==========================================================
   API CONFIGURATION
========================================================== */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";

/* ==========================================================
   CONSTANTS
========================================================== */

const STATUS_OPTIONS = [
  {
    value: "",
    label: "All Statuses",
  },
  {
    value: "new",
    label: "New",
  },
  {
    value: "contacted",
    label: "Contacted",
  },
  {
    value: "in_progress",
    label: "In Progress",
  },
  {
    value: "resolved",
    label: "Resolved",
  },
  {
    value: "closed",
    label: "Closed",
  },
];

const PROJECT_TYPE_OPTIONS = [
  {
    value: "",
    label: "All Project Types",
  },
  {
    value: "Residential Solar",
    label: "Residential Solar",
  },
  {
    value: "Commercial Solar",
    label: "Commercial Solar",
  },
  {
    value: "Industrial Solar",
    label: "Industrial Solar",
  },
  {
    value: "Solar Battery Storage",
    label: "Solar Battery Storage",
  },
  {
    value: "Solar Maintenance",
    label: "Solar Maintenance",
  },
  {
    value: "Solar Cleaning",
    label: "Solar Cleaning",
  },
  {
    value: "EV Charging",
    label: "EV Charging",
  },
  {
    value: "Solar Consultation",
    label: "Solar Consultation",
  },
  {
    value: "Other",
    label: "Other",
  },
];

const DATE_OPTIONS = [
  {
    value: "all",
    label: "All Time",
  },
  {
    value: "today",
    label: "Today",
  },
  {
    value: "week",
    label: "This Week",
  },
  {
    value: "month",
    label: "This Month",
  },
];

/* ==========================================================
   HELPERS
========================================================== */

const getAuthToken = () =>
  localStorage.getItem("token") ||
  sessionStorage.getItem("token") ||
  localStorage.getItem("adminToken") ||
  sessionStorage.getItem("adminToken") ||
  "";

const formatDate = (dateValue) => {
  if (!dateValue) {
    return "—";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatDateTime = (dateValue) => {
  if (!dateValue) {
    return "—";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getRelativeTime = (dateValue) => {
  if (!dateValue) {
    return "";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const difference =
    Date.now() - date.getTime();

  const minutes = Math.floor(
    difference / (1000 * 60),
  );

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(
    minutes / 60,
  );

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(
    hours / 24,
  );

  if (days < 7) {
    return `${days}d ago`;
  }

  return formatDate(dateValue);
};

const getStatusLabel = (status) => {
  const option =
    STATUS_OPTIONS.find(
      (item) => item.value === status,
    );

  return (
    option?.label ||
    "New"
  );
};

const getStatusIcon = (status) => {
  switch (status) {
    case "contacted":
      return Phone;

    case "in_progress":
      return Clock3;

    case "resolved":
      return CheckCircle2;

    case "closed":
      return Check;

    case "new":
    default:
      return CircleDot;
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case "contacted":
      return "status-contacted";

    case "in_progress":
      return "status-in-progress";

    case "resolved":
      return "status-resolved";

    case "closed":
      return "status-closed";

    case "new":
    default:
      return "status-new";
  }
};

const getInitials = (name = "") => {
  const parts = String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0]
      .substring(0, 2)
      .toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`
    .toUpperCase();
};

const truncateText = (
  value = "",
  length = 80,
) => {
  const text = String(value);

  if (text.length <= length) {
    return text;
  }

  return `${text.substring(
    0,
    length,
  )}...`;
};

/* ==========================================================
   API HELPER
========================================================== */

const apiRequest = async (
  endpoint,
  options = {},
) => {
  const token = getAuthToken();

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type":
          "application/json",
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
        ...(options.headers || {}),
      },
    },
  );

  let result = null;

  try {
    result = await response.json();
  } catch {
    result = null;
  }

  if (
    response.status === 401
  ) {
    throw new Error(
      result?.message ||
        "Your admin session has expired. Please log in again.",
    );
  }

  if (!response.ok) {
    throw new Error(
      result?.message ||
        "Something went wrong. Please try again.",
    );
  }

  return result;
};

/* ==========================================================
   MAIN COMPONENT
========================================================== */

const Inquiries = () => {
  /* ========================================================
     DATA STATE
  ======================================================== */

  const [inquiries, setInquiries] =
    useState([]);

  const [stats, setStats] =
    useState({
      total: 0,
      new: 0,
      contacted: 0,
      inProgress: 0,
      resolved: 0,
      closed: 0,
      unread: 0,
    });

  /* ========================================================
     UI STATE
  ======================================================== */

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [actionError, setActionError] =
    useState("");

  const [selectedInquiry, setSelectedInquiry] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);

  const [inquiryToDelete, setInquiryToDelete] =
    useState(null);

  const [deleting, setDeleting] =
    useState(false);

  const [updatingId, setUpdatingId] =
    useState(null);

  /* ========================================================
     FILTER STATE
  ======================================================== */

  const [searchInput, setSearchInput] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [projectTypeFilter, setProjectTypeFilter] =
    useState("");

  const [dateFilter, setDateFilter] =
    useState("all");

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  const [sort, setSort] =
    useState("newest");

  /* ========================================================
     PAGINATION
  ======================================================== */

  const [page, setPage] =
    useState(1);

  const [limit] =
    useState(20);

  const [pagination, setPagination] =
    useState({
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    });

  /* ========================================================
     DEBOUNCED SEARCH
  ======================================================== */

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setSearch(
          searchInput.trim(),
        );

        setPage(1);
      }, 400);

    return () =>
      clearTimeout(timer);
  }, [searchInput]);

  /* ========================================================
     FETCH STATS
  ======================================================== */

  const fetchStats =
    useCallback(async () => {
      const result =
        await apiRequest(
          "/api/contact/admin/stats",
        );

      setStats(
        result?.data || {
          total: 0,
          new: 0,
          contacted: 0,
          inProgress: 0,
          resolved: 0,
          closed: 0,
          unread: 0,
        },
      );
    }, []);

  /* ========================================================
     BUILD INQUIRY QUERY
  ======================================================== */

  const buildInquiryQuery =
    useCallback(() => {
      const params =
        new URLSearchParams();

      params.set(
        "page",
        String(page),
      );

      params.set(
        "limit",
        String(limit),
      );

      params.set(
        "sort",
        sort,
      );

      if (search) {
        params.set(
          "search",
          search,
        );
      }

      if (statusFilter) {
        params.set(
          "status",
          statusFilter,
        );
      }

      if (projectTypeFilter) {
        params.set(
          "projectType",
          projectTypeFilter,
        );
      }

      if (dateFilter) {
        params.set(
          "date",
          dateFilter,
        );
      }

      if (fromDate) {
        params.set(
          "from",
          fromDate,
        );
      }

      if (toDate) {
        params.set(
          "to",
          toDate,
        );
      }

      return params.toString();
    }, [
      page,
      limit,
      sort,
      search,
      statusFilter,
      projectTypeFilter,
      dateFilter,
      fromDate,
      toDate,
    ]);

  /* ========================================================
     FETCH INQUIRIES
  ======================================================== */

  const fetchInquiries =
    useCallback(
      async ({
        showLoading = false,
        showRefreshing = false,
      } = {}) => {
        try {
          if (showLoading) {
            setLoading(true);
          }

          if (showRefreshing) {
            setRefreshing(true);
          }

          setError("");

          const query =
            buildInquiryQuery();

          const result =
            await apiRequest(
              `/api/contact/admin?${query}`,
            );

          setInquiries(
            result?.data?.inquiries ||
              [],
          );

          setPagination(
            result?.data?.pagination || {
              page: 1,
              limit,
              total: 0,
              totalPages: 0,
              hasNextPage: false,
              hasPreviousPage: false,
            },
          );
        } catch (requestError) {
          console.error(
            "Fetch inquiries error:",
            requestError,
          );

          setError(
            requestError?.message ||
              "Unable to load inquiries.",
          );
        } finally {
          if (showLoading) {
            setLoading(false);
          }

          if (showRefreshing) {
            setRefreshing(false);
          }
        }
      },
      [
        buildInquiryQuery,
        limit,
      ],
    );

  /* ========================================================
     INITIAL LOAD
  ======================================================== */

  useEffect(() => {
    const loadPage =
      async () => {
        setLoading(true);
        setError("");

        try {
          await Promise.all([
            fetchInquiries({
              showLoading: false,
            }),
            fetchStats(),
          ]);
        } catch (requestError) {
          console.error(
            "Inquiry page load error:",
            requestError,
          );
        } finally {
          setLoading(false);
        }
      };

    loadPage();
  }, [
    fetchInquiries,
    fetchStats,
  ]);

  /* ========================================================
     FETCH WHEN FILTERS / PAGINATION CHANGE
  ======================================================== */

  useEffect(() => {
    if (loading) {
      return;
    }

    fetchInquiries();
  }, [
    search,
    statusFilter,
    projectTypeFilter,
    dateFilter,
    fromDate,
    toDate,
    sort,
    page,
  ]);

  /* ========================================================
     REFRESH
  ======================================================== */

  const handleRefresh =
    async () => {
      try {
        setRefreshing(true);
        setActionError("");

        await Promise.all([
          fetchInquiries(),
          fetchStats(),
        ]);
      } catch (requestError) {
        setActionError(
          requestError?.message ||
            "Unable to refresh inquiries.",
        );
      } finally {
        setRefreshing(false);
      }
    };

  /* ========================================================
     FILTER RESET
  ======================================================== */

  const hasActiveFilters =
    Boolean(
      searchInput ||
        statusFilter ||
        projectTypeFilter ||
        dateFilter !== "all" ||
        fromDate ||
        toDate,
    );

  const clearFilters =
    () => {
      setSearchInput("");
      setSearch("");
      setStatusFilter("");
      setProjectTypeFilter("");
      setDateFilter("all");
      setFromDate("");
      setToDate("");
      setSort("newest");
      setPage(1);
    };

  /* ========================================================
     VIEW INQUIRY
  ======================================================== */

  const handleViewInquiry =
    async (inquiry) => {
      setSelectedInquiry(
        inquiry,
      );

      setShowDetails(true);
      setActionError("");

      if (!inquiry.isRead) {
        try {
          await apiRequest(
            `/api/contact/admin/${inquiry._id}/read`,
            {
              method: "PATCH",
              body: JSON.stringify({
                isRead: true,
              }),
            },
          );

          setInquiries(
            (current) =>
              current.map(
                (item) =>
                  item._id ===
                  inquiry._id
                    ? {
                        ...item,
                        isRead: true,
                      }
                    : item,
              ),
          );

          setSelectedInquiry(
            (current) =>
              current
                ? {
                    ...current,
                    isRead: true,
                  }
                : current,
          );

          setStats(
            (current) => ({
              ...current,
              unread: Math.max(
                0,
                current.unread - 1,
              ),
            }),
          );
        } catch (requestError) {
          console.error(
            "Mark inquiry as read error:",
            requestError,
          );
        }
      }
    };

  /* ========================================================
     CLOSE DETAIL MODAL
  ======================================================== */

  const closeDetails =
    () => {
      setShowDetails(false);
      setSelectedInquiry(null);
    };

  /* ========================================================
     UPDATE STATUS
  ======================================================== */

  const handleStatusChange =
    async (
      inquiry,
      nextStatus,
    ) => {
      if (
        !inquiry?._id ||
        !nextStatus ||
        nextStatus ===
          inquiry.status
      ) {
        return;
      }

      try {
        setUpdatingId(
          inquiry._id,
        );

        setActionError("");

        const result =
          await apiRequest(
            `/api/contact/admin/${inquiry._id}/status`,
            {
              method: "PATCH",
              body: JSON.stringify({
                status: nextStatus,
              }),
            },
          );

        const updatedInquiry =
          result?.data?.inquiry;

        if (updatedInquiry) {
          setInquiries(
            (current) =>
              current.map(
                (item) =>
                  item._id ===
                  inquiry._id
                    ? updatedInquiry
                    : item,
              ),
          );

          setSelectedInquiry(
            (current) =>
              current &&
              current._id ===
                inquiry._id
                ? updatedInquiry
                : current,
          );
        }

        await fetchStats();
      } catch (requestError) {
        console.error(
          "Update inquiry status error:",
          requestError,
        );

        setActionError(
          requestError?.message ||
            "Unable to update inquiry status.",
        );
      } finally {
        setUpdatingId(null);
      }
    };

  /* ========================================================
     TOGGLE READ STATUS
  ======================================================== */

  const handleToggleRead =
    async (inquiry) => {
      if (!inquiry?._id) {
        return;
      }

      try {
        setUpdatingId(
          inquiry._id,
        );

        setActionError("");

        const nextReadState =
          !inquiry.isRead;

        const result =
          await apiRequest(
            `/api/contact/admin/${inquiry._id}/read`,
            {
              method: "PATCH",
              body: JSON.stringify({
                isRead:
                  nextReadState,
              }),
            },
          );

        const updatedInquiry =
          result?.data?.inquiry;

        if (updatedInquiry) {
          setInquiries(
            (current) =>
              current.map(
                (item) =>
                  item._id ===
                  inquiry._id
                    ? updatedInquiry
                    : item,
              ),
          );

          setSelectedInquiry(
            (current) =>
              current &&
              current._id ===
                inquiry._id
                ? updatedInquiry
                : current,
          );
        }

        await fetchStats();
      } catch (requestError) {
        console.error(
          "Toggle inquiry read status error:",
          requestError,
        );

        setActionError(
          requestError?.message ||
            "Unable to update read status.",
        );
      } finally {
        setUpdatingId(null);
      }
    };

  /* ========================================================
     DELETE CONFIRMATION
  ======================================================== */

  const openDeleteConfirmation =
    (inquiry) => {
      setInquiryToDelete(
        inquiry,
      );

      setShowDeleteConfirm(
        true,
      );

      setActionError("");
    };

  const closeDeleteConfirmation =
    () => {
      if (deleting) {
        return;
      }

      setShowDeleteConfirm(
        false,
      );

      setInquiryToDelete(
        null,
      );
    };

  /* ========================================================
     DELETE INQUIRY
  ======================================================== */

  const handleDeleteInquiry =
    async () => {
      if (
        !inquiryToDelete?._id
      ) {
        return;
      }

      try {
        setDeleting(true);
        setActionError("");

        await apiRequest(
          `/api/contact/admin/${inquiryToDelete._id}`,
          {
            method: "DELETE",
          },
        );

        setInquiries(
          (current) =>
            current.filter(
              (item) =>
                item._id !==
                inquiryToDelete._id,
            ),
        );

        setShowDeleteConfirm(
          false,
        );

        setInquiryToDelete(
          null,
        );

        if (
          selectedInquiry?._id ===
          inquiryToDelete._id
        ) {
          setShowDetails(
            false,
          );

          setSelectedInquiry(
            null,
          );
        }

        await Promise.all([
          fetchStats(),
          fetchInquiries(),
        ]);
      } catch (requestError) {
        console.error(
          "Delete inquiry error:",
          requestError,
        );

        setActionError(
          requestError?.message ||
            "Unable to delete inquiry.",
        );
      } finally {
        setDeleting(false);
      }
    };

  /* ========================================================
     PAGINATION HELPERS
  ======================================================== */

  const paginationPages =
    useMemo(() => {
      const totalPages =
        pagination.totalPages ||
        0;

      const currentPage =
        pagination.page || page;

      if (totalPages <= 1) {
        return [];
      }

      const pages = [];

      const start = Math.max(
        1,
        currentPage - 2,
      );

      const end = Math.min(
        totalPages,
        currentPage + 2,
      );

      for (
        let number = start;
        number <= end;
        number += 1
      ) {
        pages.push(number);
      }

      return pages;
    }, [
      pagination,
      page,
    ]);

  const handlePreviousPage =
    () => {
      if (
        pagination.hasPreviousPage
      ) {
        setPage(
          (current) =>
            Math.max(
              1,
              current - 1,
            ),
        );
      }
    };

  const handleNextPage =
    () => {
      if (
        pagination.hasNextPage
      ) {
        setPage(
          (current) =>
            current + 1,
        );
      }
    };

  /* ========================================================
     RESULT RANGE
  ======================================================== */

  const resultStart =
    pagination.total === 0
      ? 0
      : (pagination.page - 1) *
          pagination.limit +
        1;

  const resultEnd =
    Math.min(
      pagination.page *
        pagination.limit,
      pagination.total,
    );

  /* ========================================================
     STATUS ICON
  ======================================================== */

  const renderStatusIcon =
    (status) => {
      const Icon =
        getStatusIcon(status);

      return (
        <Icon
          size={13}
          strokeWidth={2.4}
        />
      );
    };

  /* ========================================================
     LOADING STATE
  ======================================================== */

  if (loading) {
    return (
      <div className="inquiries-page">
        <div className="inquiries-loading-state">
          <div className="inquiries-loading-spinner">
            <LoaderCircle
              size={30}
              className="spin"
            />
          </div>

          <h5>
            Loading inquiries
          </h5>

          <p>
            Fetching the latest
            customer inquiries...
          </p>
        </div>
      </div>
    );
  }

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <div className="inquiries-page">

      {/* ====================================================
          PAGE HEADER
      ==================================================== */}

      <div className="inquiries-page-header">

        <div className="inquiries-heading">

          <div className="inquiries-heading-icon">
            <Inbox
              size={24}
              strokeWidth={2}
            />
          </div>

          <div>
            <div className="inquiries-eyebrow">
              CUSTOMER COMMUNICATION
            </div>

            <h1>
              Inquiries
            </h1>

            <p>
              Manage and track customer
              inquiries from your
              website.
            </p>
          </div>

        </div>

        <div className="inquiries-header-actions">

          <button
            type="button"
            className="inquiries-refresh-btn"
            onClick={handleRefresh}
            disabled={refreshing}
            title="Refresh inquiries"
          >
            <RefreshCw
              size={17}
              className={
                refreshing
                  ? "spin"
                  : ""
              }
            />

            <span>
              Refresh
            </span>
          </button>

        </div>

      </div>


      {/* ====================================================
          ACTION ERROR
      ==================================================== */}

      {actionError && (
        <div className="inquiries-alert inquiries-alert-error">
          <AlertCircle
            size={18}
          />

          <span>
            {actionError}
          </span>

          <button
            type="button"
            onClick={() =>
              setActionError("")
            }
            aria-label="Dismiss error"
          >
            <X size={16} />
          </button>
        </div>
      )}


      {/* ====================================================
          STATISTICS
      ==================================================== */}

      <div className="inquiries-stats-grid">

        <div className="inquiry-stat-card stat-total">
          <div className="inquiry-stat-icon">
            <Inbox size={20} />
          </div>

          <div className="inquiry-stat-content">
            <span>
              Total Inquiries
            </span>

            <strong>
              {stats.total}
            </strong>
          </div>
        </div>


        <div className="inquiry-stat-card stat-new">
          <div className="inquiry-stat-icon">
            <CircleDot size={20} />
          </div>

          <div className="inquiry-stat-content">
            <span>
              New
            </span>

            <strong>
              {stats.new}
            </strong>
          </div>
        </div>


        <div className="inquiry-stat-card stat-progress">
          <div className="inquiry-stat-icon">
            <Clock3 size={20} />
          </div>

          <div className="inquiry-stat-content">
            <span>
              In Progress
            </span>

            <strong>
              {stats.inProgress}
            </strong>
          </div>
        </div>


        <div className="inquiry-stat-card stat-resolved">
          <div className="inquiry-stat-icon">
            <CheckCircle2 size={20} />
          </div>

          <div className="inquiry-stat-content">
            <span>
              Resolved
            </span>

            <strong>
              {stats.resolved}
            </strong>
          </div>
        </div>


        <div className="inquiry-stat-card stat-unread">
          <div className="inquiry-stat-icon">
            <MessageSquare size={20} />
          </div>

          <div className="inquiry-stat-content">
            <span>
              Unread
            </span>

            <strong>
              {stats.unread}
            </strong>
          </div>
        </div>

      </div>


      {/* ====================================================
          MAIN CARD
      ==================================================== */}

      <div className="inquiries-main-card">

        {/* ==================================================
            TOOLBAR
        ================================================== */}

        <div className="inquiries-toolbar">

          <div className="inquiries-search-wrapper">

            <Search
              size={18}
              className="inquiries-search-icon"
            />

            <input
              type="search"
              className="inquiries-search-input"
              placeholder="Search by name, email, phone, company, location..."
              value={searchInput}
              onChange={(event) =>
                setSearchInput(
                  event.target.value,
                )
              }
            />

            {searchInput && (
              <button
                type="button"
                className="inquiries-search-clear"
                onClick={() =>
                  setSearchInput("")
                }
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}

          </div>


          <div className="inquiries-filter-icon">
            <Filter size={17} />
          </div>


          <select
            className="form-select inquiries-filter-select"
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(
                event.target.value,
              );
              setPage(1);
            }}
          >
            {STATUS_OPTIONS.map(
              (option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ),
            )}
          </select>


          <select
            className="form-select inquiries-filter-select inquiries-project-filter"
            value={projectTypeFilter}
            onChange={(event) => {
              setProjectTypeFilter(
                event.target.value,
              );
              setPage(1);
            }}
          >
            {PROJECT_TYPE_OPTIONS.map(
              (option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ),
            )}
          </select>


          <select
            className="form-select inquiries-filter-select"
            value={dateFilter}
            onChange={(event) => {
              setDateFilter(
                event.target.value,
              );
              setPage(1);
            }}
          >
            {DATE_OPTIONS.map(
              (option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ),
            )}
          </select>


          <select
            className="form-select inquiries-filter-select inquiries-sort-select"
            value={sort}
            onChange={(event) => {
              setSort(
                event.target.value,
              );
              setPage(1);
            }}
          >
            <option value="newest">
              Newest First
            </option>

            <option value="oldest">
              Oldest First
            </option>
          </select>


          {hasActiveFilters && (
            <button
              type="button"
              className="inquiries-clear-filter-btn"
              onClick={clearFilters}
            >
              <X size={15} />
              Clear
            </button>
          )}

        </div>


        {/* ==================================================
            CUSTOM DATE RANGE
        ================================================== */}

        {(dateFilter ===
          "custom" ||
          fromDate ||
          toDate) && (
          <div className="inquiries-custom-date-row">

            <div className="inquiries-date-field">
              <label>
                From
              </label>

              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(event) => {
                  setFromDate(
                    event.target.value,
                  );
                  setPage(1);
                }}
              />
            </div>


            <div className="inquiries-date-field">
              <label>
                To
              </label>

              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(event) => {
                  setToDate(
                    event.target.value,
                  );
                  setPage(1);
                }}
              />
            </div>

          </div>
        )}


        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (
          <div className="inquiries-inline-error">

            <AlertCircle
              size={18}
            />

            <div>
              <strong>
                Unable to load inquiries
              </strong>

              <span>
                {error}
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                fetchInquiries({
                  showRefreshing: true,
                })
              }
            >
              Try Again
            </button>

          </div>
        )}


        {/* ==================================================
            EMPTY STATE
        ================================================== */}

        {!error &&
          inquiries.length === 0 && (
            <div className="inquiries-empty-state">

              <div className="inquiries-empty-icon">
                <Inbox
                  size={30}
                />
              </div>

              <h4>
                {hasActiveFilters
                  ? "No matching inquiries"
                  : "No inquiries yet"}
              </h4>

              <p>
                {hasActiveFilters
                  ? "Try adjusting your search or filters to find the inquiry you are looking for."
                  : "Customer inquiries submitted through your website will appear here automatically."}
              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  className="inquiries-empty-action"
                  onClick={
                    clearFilters
                  }
                >
                  Clear Filters
                </button>
              )}

            </div>
          )}


        {/* ==================================================
            DESKTOP TABLE
        ================================================== */}

        {!error &&
          inquiries.length > 0 && (
            <div className="inquiries-table-wrapper">

              <table className="table inquiries-table">

                <thead>
                  <tr>
                    <th>
                      Customer
                    </th>

                    <th>
                      Project
                    </th>

                    <th>
                      Contact
                    </th>

                    <th>
                      Location
                    </th>

                    <th>
                      Received
                    </th>

                    <th>
                      Status
                    </th>

                    <th className="text-end">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {inquiries.map(
                    (inquiry) => (
                      <tr
                        key={
                          inquiry._id
                        }
                        className={
                          !inquiry.isRead
                            ? "inquiry-row-unread"
                            : ""
                        }
                      >

                        {/* CUSTOMER */}

                        <td>
                          <div className="inquiry-customer-cell">

                            <div className="inquiry-avatar">
                              {getInitials(
                                inquiry.fullName,
                              )}
                            </div>

                            <div className="inquiry-customer-info">

                              <div className="inquiry-name-line">

                                {!inquiry.isRead && (
                                  <span
                                    className="inquiry-unread-dot"
                                    title="Unread"
                                  />
                                )}

                                <strong>
                                  {inquiry.fullName ||
                                    "Unknown Client"}
                                </strong>

                              </div>

                              {inquiry.companyName && (
                                <span className="inquiry-company">
                                  <Building2
                                    size={12}
                                  />

                                  {
                                    inquiry.companyName
                                  }
                                </span>
                              )}

                            </div>

                          </div>
                        </td>


                        {/* PROJECT */}

                        <td>
                          <div className="inquiry-project-cell">

                            <strong>
                              {inquiry.projectType ||
                                "Other"}
                            </strong>

                            {inquiry.systemSize && (
                              <span>
                                <Zap
                                  size={12}
                                />

                                {
                                  inquiry.systemSize
                                }
                              </span>
                            )}

                          </div>
                        </td>


                        {/* CONTACT */}

                        <td>
                          <div className="inquiry-contact-cell">

                            {inquiry.email && (
                              <a
                                href={`mailto:${inquiry.email}`}
                                onClick={(event) =>
                                  event.stopPropagation()
                                }
                                title={
                                  inquiry.email
                                }
                              >
                                <Mail
                                  size={13}
                                />

                                {truncateText(
                                  inquiry.email,
                                  27,
                                )}
                              </a>
                            )}

                            {inquiry.phone && (
                              <a
                                href={`tel:${inquiry.phone}`}
                                onClick={(event) =>
                                  event.stopPropagation()
                                }
                              >
                                <Phone
                                  size={13}
                                />

                                {
                                  inquiry.phone
                                }
                              </a>
                            )}

                          </div>
                        </td>


                        {/* LOCATION */}

                        <td>
                          <div className="inquiry-location-cell">

                            <MapPin
                              size={14}
                            />

                            <span>
                              {truncateText(
                                inquiry.location ||
                                  "—",
                                25,
                              )}
                            </span>

                          </div>
                        </td>


                        {/* DATE */}

                        <td>
                          <div className="inquiry-date-cell">

                            <strong>
                              {formatDate(
                                inquiry.createdAt,
                              )}
                            </strong>

                            <span>
                              {getRelativeTime(
                                inquiry.createdAt,
                              )}
                            </span>

                          </div>
                        </td>


                        {/* STATUS */}

                        <td>
                          <div className="inquiry-status-wrapper">

                            <select
                              className={`inquiry-status-select ${getStatusClass(
                                inquiry.status,
                              )}`}
                              value={
                                inquiry.status ||
                                "new"
                              }
                              disabled={
                                updatingId ===
                                inquiry._id
                              }
                              onChange={(
                                event,
                              ) =>
                                handleStatusChange(
                                  inquiry,
                                  event.target
                                    .value,
                                )
                              }
                            >
                              {STATUS_OPTIONS.filter(
                                (
                                  option,
                                ) =>
                                  option.value,
                              ).map(
                                (
                                  option,
                                ) => (
                                  <option
                                    key={
                                      option.value
                                    }
                                    value={
                                      option.value
                                    }
                                  >
                                    {
                                      option.label
                                    }
                                  </option>
                                ),
                              )}
                            </select>

                            {updatingId ===
                              inquiry._id && (
                              <LoaderCircle
                                size={14}
                                className="status-loading spin"
                              />
                            )}

                          </div>
                        </td>


                        {/* ACTIONS */}

                        <td>
                          <div className="inquiry-actions">

                            <button
                              type="button"
                              className="inquiry-action-btn inquiry-view-btn"
                              onClick={() =>
                                handleViewInquiry(
                                  inquiry,
                                )
                              }
                              title="View inquiry"
                            >
                              <Eye
                                size={16}
                              />
                            </button>


                            <button
                              type="button"
                              className={`inquiry-action-btn ${
                                inquiry.isRead
                                  ? "inquiry-read-btn"
                                  : "inquiry-unread-btn"
                              }`}
                              onClick={() =>
                                handleToggleRead(
                                  inquiry,
                                )
                              }
                              disabled={
                                updatingId ===
                                inquiry._id
                              }
                              title={
                                inquiry.isRead
                                  ? "Mark as unread"
                                  : "Mark as read"
                              }
                            >
                              {inquiry.isRead ? (
                                <MessageSquare
                                  size={16}
                                />
                              ) : (
                                <Mail
                                  size={16}
                                />
                              )}
                            </button>


                            <button
                              type="button"
                              className="inquiry-action-btn inquiry-delete-btn"
                              onClick={() =>
                                openDeleteConfirmation(
                                  inquiry,
                                )
                              }
                              title="Delete inquiry"
                            >
                              <Trash2
                                size={16}
                              />
                            </button>

                          </div>
                        </td>

                      </tr>
                    ),
                  )}

                </tbody>

              </table>

            </div>
          )}


        {/* ==================================================
            PAGINATION
        ================================================== */}

        {pagination.total >
          0 && (
          <div className="inquiries-pagination">

            <div className="inquiries-pagination-info">
              Showing{" "}
              <strong>
                {resultStart}
              </strong>{" "}
              to{" "}
              <strong>
                {resultEnd}
              </strong>{" "}
              of{" "}
              <strong>
                {pagination.total}
              </strong>{" "}
              inquiries
            </div>


            <div className="inquiries-pagination-controls">

              <button
                type="button"
                className="inquiries-pagination-arrow"
                onClick={
                  handlePreviousPage
                }
                disabled={
                  !pagination.hasPreviousPage
                }
                aria-label="Previous page"
              >
                <ChevronLeft
                  size={17}
                />
              </button>


              {paginationPages.map(
                (pageNumber) => (
                  <button
                    key={
                      pageNumber
                    }
                    type="button"
                    className={`inquiries-page-number ${
                      pageNumber ===
                      pagination.page
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setPage(
                        pageNumber,
                      )
                    }
                  >
                    {
                      pageNumber
                    }
                  </button>
                ),
              )}


              <button
                type="button"
                className="inquiries-pagination-arrow"
                onClick={
                  handleNextPage
                }
                disabled={
                  !pagination.hasNextPage
                }
                aria-label="Next page"
              >
                <ChevronRight
                  size={17}
                />
              </button>

            </div>

          </div>
        )}

      </div>


      {/* ====================================================
          DETAIL MODAL
      ==================================================== */}

      {showDetails &&
        selectedInquiry && (
          <div
            className="inquiries-modal-backdrop"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeDetails();
              }
            }}
          >

            <div
              className="inquiries-detail-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="inquiry-detail-title"
            >

              {/* MODAL HEADER */}

              <div className="inquiries-modal-header">

                <div>
                  <div className="inquiries-modal-eyebrow">
                    INQUIRY DETAILS
                  </div>

                  <h3 id="inquiry-detail-title">
                    {selectedInquiry.fullName ||
                      "Customer Inquiry"}
                  </h3>
                </div>

                <button
                  type="button"
                  className="inquiries-modal-close"
                  onClick={
                    closeDetails
                  }
                  aria-label="Close inquiry details"
                >
                  <X size={19} />
                </button>

              </div>


              {/* MODAL BODY */}

              <div className="inquiries-modal-body">

                {/* PROFILE */}

                <div className="inquiry-detail-profile">

                  <div className="inquiry-detail-avatar">
                    {getInitials(
                      selectedInquiry.fullName,
                    )}
                  </div>

                  <div className="inquiry-detail-profile-info">

                    <h4>
                      {
                        selectedInquiry.fullName
                      }
                    </h4>

                    {selectedInquiry.companyName && (
                      <span>
                        <Building2
                          size={14}
                        />

                        {
                          selectedInquiry.companyName
                        }
                      </span>
                    )}

                    <div className="inquiry-detail-status-row">

                      <span
                        className={`inquiry-status-badge ${getStatusClass(
                          selectedInquiry.status,
                        )}`}
                      >
                        {renderStatusIcon(
                          selectedInquiry.status,
                        )}

                        {getStatusLabel(
                          selectedInquiry.status,
                        )}
                      </span>

                      {!selectedInquiry.isRead && (
                        <span className="inquiry-new-badge">
                          New
                        </span>
                      )}

                    </div>

                  </div>

                </div>


                {/* CONTACT INFORMATION */}

                <div className="inquiry-detail-section">

                  <div className="inquiry-detail-section-title">
                    <UserRound
                      size={16}
                    />

                    Contact Information
                  </div>


                  <div className="inquiry-detail-grid">

                    <div className="inquiry-detail-item">

                      <span>
                        Email
                      </span>

                      {selectedInquiry.email ? (
                        <a
                          href={`mailto:${selectedInquiry.email}`}
                        >
                          <Mail
                            size={14}
                          />

                          {
                            selectedInquiry.email
                          }

                          <ExternalLink
                            size={12}
                          />
                        </a>
                      ) : (
                        <strong>
                          —
                        </strong>
                      )}

                    </div>


                    <div className="inquiry-detail-item">

                      <span>
                        Phone
                      </span>

                      {selectedInquiry.phone ? (
                        <a
                          href={`tel:${selectedInquiry.phone}`}
                        >
                          <Phone
                            size={14}
                          />

                          {
                            selectedInquiry.phone
                          }

                          <ExternalLink
                            size={12}
                          />
                        </a>
                      ) : (
                        <strong>
                          —
                        </strong>
                      )}

                    </div>


                    <div className="inquiry-detail-item">

                      <span>
                        Location
                      </span>

                      <strong>
                        <MapPin
                          size={14}
                        />

                        {
                          selectedInquiry.location ||
                          "—"
                        }
                      </strong>

                    </div>


                    <div className="inquiry-detail-item">

                      <span>
                        Submitted
                      </span>

                      <strong>
                        <CalendarDays
                          size={14}
                        />

                        {formatDateTime(
                          selectedInquiry.createdAt,
                        )}
                      </strong>

                    </div>

                  </div>

                </div>


                {/* PROJECT INFORMATION */}

                <div className="inquiry-detail-section">

                  <div className="inquiry-detail-section-title">
                    <Zap
                      size={16}
                    />

                    Project Information
                  </div>


                  <div className="inquiry-detail-project-grid">

                    <div className="inquiry-detail-project-card">

                      <span>
                        Project Type
                      </span>

                      <strong>
                        {
                          selectedInquiry.projectType ||
                          "—"
                        }
                      </strong>

                    </div>


                    <div className="inquiry-detail-project-card">

                      <span>
                        System Size
                      </span>

                      <strong>
                        {
                          selectedInquiry.systemSize ||
                          "Not specified"
                        }
                      </strong>

                    </div>

                  </div>

                </div>


                {/* MESSAGE */}

                <div className="inquiry-detail-section">

                  <div className="inquiry-detail-section-title">
                    <MessageSquare
                      size={16}
                    />

                    Customer Message
                  </div>

                  <div className="inquiry-message-box">
                    {selectedInquiry.message ||
                      "No message provided."}
                  </div>

                </div>


                {/* STATUS UPDATE */}

                <div className="inquiry-detail-section">

                  <div className="inquiry-detail-section-title">
                    <Clock3
                      size={16}
                    />

                    Inquiry Status
                  </div>

                  <div className="inquiry-detail-status-control">

                    <select
                      className={`form-select inquiry-detail-status-select ${getStatusClass(
                        selectedInquiry.status,
                      )}`}
                      value={
                        selectedInquiry.status ||
                        "new"
                      }
                      disabled={
                        updatingId ===
                        selectedInquiry._id
                      }
                      onChange={(
                        event,
                      ) =>
                        handleStatusChange(
                          selectedInquiry,
                          event.target
                            .value,
                        )
                      }
                    >
                      {STATUS_OPTIONS.filter(
                        (
                          option,
                        ) =>
                          option.value,
                      ).map(
                        (
                          option,
                        ) => (
                          <option
                            key={
                              option.value
                            }
                            value={
                              option.value
                            }
                          >
                            {
                              option.label
                            }
                          </option>
                        ),
                      )}
                    </select>

                    {updatingId ===
                      selectedInquiry._id && (
                      <LoaderCircle
                        size={16}
                        className="spin"
                      />
                    )}

                  </div>

                </div>

              </div>


              {/* MODAL FOOTER */}

              <div className="inquiries-modal-footer">

                <div className="inquiry-modal-footer-left">

                  {selectedInquiry.email && (
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="inquiry-reply-btn"
                    >
                      <Mail
                        size={16}
                      />

                      Reply to Client
                    </a>
                  )}

                  <button
                    type="button"
                    className="inquiry-modal-read-btn"
                    onClick={() =>
                      handleToggleRead(
                        selectedInquiry,
                      )
                    }
                    disabled={
                      updatingId ===
                      selectedInquiry._id
                    }
                  >
                    {selectedInquiry.isRead ? (
                      <>
                        <Mail
                          size={15}
                        />

                        Mark Unread
                      </>
                    ) : (
                      <>
                        <Check
                          size={15}
                        />

                        Mark Read
                      </>
                    )}
                  </button>

                </div>


                <div className="inquiry-modal-footer-right">

                  <button
                    type="button"
                    className="inquiry-modal-delete-btn"
                    onClick={() =>
                      openDeleteConfirmation(
                        selectedInquiry,
                      )
                    }
                  >
                    <Trash2
                      size={15}
                    />

                    Delete
                  </button>

                  <button
                    type="button"
                    className="inquiry-modal-close-btn"
                    onClick={
                      closeDetails
                    }
                  >
                    Close
                  </button>

                </div>

              </div>

            </div>

          </div>
        )}


      {/* ====================================================
          DELETE CONFIRMATION MODAL
      ==================================================== */}

      {showDeleteConfirm &&
        inquiryToDelete && (
          <div
            className="inquiries-modal-backdrop inquiries-confirm-backdrop"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeDeleteConfirmation();
              }
            }}
          >

            <div
              className="inquiries-confirm-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-inquiry-title"
            >

              <div className="inquiries-confirm-icon">
                <Trash2
                  size={23}
                />
              </div>

              <h3 id="delete-inquiry-title">
                Delete inquiry?
              </h3>

              <p>
                This will permanently
                remove the inquiry from
                the database. This action
                cannot be undone.
              </p>

              <div className="inquiries-confirm-client">
                <div className="inquiry-avatar-small">
                  {getInitials(
                    inquiryToDelete.fullName,
                  )}
                </div>

                <div>
                  <strong>
                    {
                      inquiryToDelete.fullName
                    }
                  </strong>

                  <span>
                    {
                      inquiryToDelete.email
                    }
                  </span>
                </div>
              </div>


              <div className="inquiries-confirm-actions">

                <button
                  type="button"
                  className="inquiries-confirm-cancel"
                  onClick={
                    closeDeleteConfirmation
                  }
                  disabled={deleting}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="inquiries-confirm-delete"
                  onClick={
                    handleDeleteInquiry
                  }
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <LoaderCircle
                        size={16}
                        className="spin"
                      />

                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2
                        size={16}
                      />

                      Delete Inquiry
                    </>
                  )}
                </button>

              </div>

            </div>

          </div>
        )}

    </div>
  );
};

export default Inquiries;