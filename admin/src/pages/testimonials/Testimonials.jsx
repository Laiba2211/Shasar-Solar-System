
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CheckCircle2,
  Clock3,
  Edit3,
  Eye,
  Filter,
  MessageSquareQuote,
  Plus,
  RefreshCw,
  Search,
  Star,
  Trash2,
  XCircle,
} from "lucide-react";

import TestimonialForm from "../../components/testimonials/TestimonialForm";

import "./Testimonials.css";


/* ==========================================================
   API
========================================================== */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";

const TESTIMONIALS_API =
  `${API_BASE_URL}/api/testimonials`;


/* ==========================================================
   HELPERS
========================================================== */

const getImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return "";
  }

  const value = String(imageUrl).trim();

  if (!value) {
    return "";
  }

  /*
   * Ignore old/local Windows paths.
   */
  if (
    /^[a-zA-Z]:[\\/]/.test(value) ||
    value.startsWith("\\\\")
  ) {
    return "";
  }

  /*
   * Already absolute URL.
   */
  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:")
  ) {
    return value;
  }

  /*
   * Server upload path.
   */
  if (value.startsWith("/")) {
    return `${API_BASE_URL}${value}`;
  }

  return `${API_BASE_URL}/${value}`;
};


const getInitials = (name = "") => {
  const words = String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length) {
    return "CL";
  }

  if (words.length === 1) {
    return words[0]
      .substring(0, 2)
      .toUpperCase();
  }

  return `${words[0][0]}${words[words.length - 1][0]}`
    .toUpperCase();
};


const getErrorMessage = async (
  response,
  fallback
) => {
  try {
    const result = await response.json();

    return (
      result?.message ||
      result?.error ||
      fallback
    );
  } catch {
    return fallback;
  }
};


const getTestimonialsFromResponse = (
  result
) => {
  if (Array.isArray(result)) {
    return result;
  }

  if (Array.isArray(result?.data)) {
    return result.data;
  }

  if (Array.isArray(result?.testimonials)) {
    return result.testimonials;
  }

  return [];
};


const getStatsFromResponse = (
  result
) => {
  if (
    result?.data &&
    typeof result.data === "object"
  ) {
    return result.data;
  }

  return {};
};


/* ==========================================================
   DEFAULT STATS
========================================================== */

const DEFAULT_STATS = {
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0,
  featured: 0,
  published: 0,
};


/* ==========================================================
   COMPONENT
========================================================== */

const Testimonials = () => {
  /* --------------------------------------------------------
     DATA
  -------------------------------------------------------- */

  const [
    testimonials,
    setTestimonials,
  ] = useState([]);

  const [
    stats,
    setStats,
  ] = useState(DEFAULT_STATS);


  /* --------------------------------------------------------
     UI STATE
  -------------------------------------------------------- */

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    deletingId,
    setDeletingId,
  ] = useState(null);

  const [
    actionId,
    setActionId,
  ] = useState(null);


  /* --------------------------------------------------------
     SEARCH / FILTER
  -------------------------------------------------------- */

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("all");

  const [
    ratingFilter,
    setRatingFilter,
  ] = useState("all");

  const [
    featuredFilter,
    setFeaturedFilter,
  ] = useState("all");


  /* --------------------------------------------------------
     FORM MODAL
  -------------------------------------------------------- */

  const [
    showForm,
    setShowForm,
  ] = useState(false);

  const [
    editingTestimonial,
    setEditingTestimonial,
  ] = useState(null);


  /* --------------------------------------------------------
     VIEW MODAL
  -------------------------------------------------------- */

  const [
    selectedTestimonial,
    setSelectedTestimonial,
  ] = useState(null);


  /* ========================================================
     FETCH TESTIMONIALS
  ======================================================== */

  const fetchTestimonials =
    useCallback(
      async ({
        silent = false,
      } = {}) => {
        try {
          if (silent) {
            setRefreshing(true);
          } else {
            setLoading(true);
          }

          const response =
            await fetch(
              TESTIMONIALS_API
            );

          if (!response.ok) {
            throw new Error(
              await getErrorMessage(
                response,
                "Failed to fetch testimonials."
              )
            );
          }

          const result =
            await response.json();

          const testimonialList =
            getTestimonialsFromResponse(
              result
            );

          setTestimonials(
            testimonialList
          );
        } catch (error) {
          console.error(
            "Fetch testimonials error:",
            error
          );

          window.alert(
            error.message ||
              "Failed to fetch testimonials."
          );
        } finally {
          setLoading(false);

          if (silent) {
            setRefreshing(false);
          }
        }
      },
      []
    );


  /* ========================================================
     FETCH STATS
  ======================================================== */

  const fetchStats =
    useCallback(
      async () => {
        try {
          const response =
            await fetch(
              `${TESTIMONIALS_API}/stats`
            );

          if (!response.ok) {
            return;
          }

          const result =
            await response.json();

          const statsData =
            getStatsFromResponse(
              result
            );

          setStats({
            ...DEFAULT_STATS,
            ...statsData,
          });
        } catch (error) {
          console.error(
            "Fetch testimonial stats error:",
            error
          );
        }
      },
      []
    );


  /* ========================================================
     INITIAL LOAD
  ======================================================== */

  useEffect(() => {
    fetchTestimonials();
    fetchStats();
  }, [
    fetchTestimonials,
    fetchStats,
  ]);


  /* ========================================================
     REFRESH
  ======================================================== */

  const handleRefresh =
    async () => {
      if (refreshing) {
        return;
      }

      await Promise.all([
        fetchTestimonials({
          silent: true,
        }),
        fetchStats(),
      ]);
    };


  /* ========================================================
     FILTERED TESTIMONIALS
  ======================================================== */

  const filteredTestimonials =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      return testimonials.filter(
        (testimonial) => {

          /* ----------------------------------------------
             SEARCH
          ---------------------------------------------- */

          if (normalizedSearch) {
            const searchableText = [
              testimonial.clientName,
              testimonial.email,
              testimonial.designation,
              testimonial.location,
              testimonial.serviceType,
              testimonial.comment,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

            if (
              !searchableText.includes(
                normalizedSearch
              )
            ) {
              return false;
            }
          }


          /* ----------------------------------------------
             STATUS
          ---------------------------------------------- */

          if (
            statusFilter !== "all" &&
            testimonial.status !==
              statusFilter
          ) {
            return false;
          }


          /* ----------------------------------------------
             RATING
          ---------------------------------------------- */

          if (
            ratingFilter !== "all" &&
            Number(
              testimonial.rating
            ) !==
              Number(ratingFilter)
          ) {
            return false;
          }


          /* ----------------------------------------------
             FEATURED
          ---------------------------------------------- */

          if (
            featuredFilter === "featured" &&
            !testimonial.isFeatured
          ) {
            return false;
          }

          if (
            featuredFilter ===
              "not-featured" &&
            testimonial.isFeatured
          ) {
            return false;
          }


          return true;
        }
      );
    }, [
      testimonials,
      search,
      statusFilter,
      ratingFilter,
      featuredFilter,
    ]);


  /* ========================================================
     OPEN ADD
  ======================================================== */

  const handleAdd =
    () => {
      if (saving) {
        return;
      }

      setEditingTestimonial(null);
      setShowForm(true);
    };


  /* ========================================================
     OPEN EDIT
  ======================================================== */

  const handleEdit =
    (testimonial) => {
      if (saving) {
        return;
      }

      setEditingTestimonial(
        testimonial
      );

      setShowForm(true);
    };


  /* ========================================================
     CLOSE FORM
  ======================================================== */

  const handleCloseForm =
    () => {
      /*
       * Do not allow the form to close while
       * a save request is running.
       */
      if (saving) {
        return;
      }

      setShowForm(false);
      setEditingTestimonial(null);
    };


  /* ========================================================
     SAVE TESTIMONIAL
  ======================================================== */

  const handleSave =
    async (formData) => {
      try {
        setSaving(true);

        const isEditing =
          Boolean(
            editingTestimonial?._id
          );

        const url = isEditing
          ? `${TESTIMONIALS_API}/${editingTestimonial._id}`
          : TESTIMONIALS_API;

        const method = isEditing
          ? "PUT"
          : "POST";

        const payload =
          new FormData();


        /* ----------------------------------------------
           BASIC DATA
        ---------------------------------------------- */

        payload.append(
          "clientName",
          formData.clientName?.trim() ||
            ""
        );

        payload.append(
          "email",
          formData.email?.trim() ||
            ""
        );

        payload.append(
          "designation",
          formData.designation?.trim() ||
            ""
        );

        payload.append(
          "location",
          formData.location?.trim() ||
            ""
        );

        payload.append(
          "serviceType",
          formData.serviceType?.trim() ||
            ""
        );

        payload.append(
          "rating",
          String(
            Number(formData.rating) ||
              5
          )
        );

        payload.append(
          "comment",
          formData.comment?.trim() ||
            ""
        );


        /* ----------------------------------------------
           IMAGE
        ---------------------------------------------- */

        payload.append(
          "imageUrl",
          formData.imageUrl?.trim() ||
            ""
        );


        /* ----------------------------------------------
           STATUS
        ---------------------------------------------- */

        payload.append(
          "status",
          formData.status ||
            "approved"
        );


        /* ----------------------------------------------
           PUBLISHING
        ---------------------------------------------- */

        payload.append(
          "consentToPublish",
          String(
            formData.consentToPublish ??
              true
          )
        );

        payload.append(
          "isFeatured",
          String(
            formData.isFeatured ??
              false
          )
        );


        /* ----------------------------------------------
           DISPLAY ORDER
        ---------------------------------------------- */

        payload.append(
          "displayOrder",
          String(
            Number(
              formData.displayOrder
            ) || 0
          )
        );


        /* ----------------------------------------------
           ADMIN NOTE
        ---------------------------------------------- */

        payload.append(
          "adminNote",
          formData.adminNote?.trim() ||
            ""
        );


        /* ----------------------------------------------
           NEW IMAGE FILE
        ---------------------------------------------- */

        if (
          formData.imageFile instanceof
          File
        ) {
          payload.append(
            "image",
            formData.imageFile
          );
        }


        /* ----------------------------------------------
           REQUEST
        ---------------------------------------------- */

        const response =
          await fetch(url, {
            method,
            body: payload,
          });


        if (!response.ok) {
          throw new Error(
            await getErrorMessage(
              response,
              isEditing
                ? "Failed to update testimonial."
                : "Failed to create testimonial."
            )
          );
        }


        /* ----------------------------------------------
           SUCCESS
        ---------------------------------------------- */

        await response.json();

        setShowForm(false);
        setEditingTestimonial(
          null
        );

        await Promise.all([
          fetchTestimonials({
            silent: true,
          }),
          fetchStats(),
        ]);
      } catch (error) {
        console.error(
          "Save testimonial error:",
          error
        );

        window.alert(
          error.message ||
            "Failed to save testimonial."
        );
      } finally {
        setSaving(false);
      }
    };


  /* ========================================================
     DELETE
  ======================================================== */

  const handleDelete =
    async (testimonial) => {
      if (
        !testimonial?._id
      ) {
        return;
      }

      const confirmed =
        window.confirm(
          `Delete testimonial from "${testimonial.clientName}"? This action cannot be undone.`
        );

      if (!confirmed) {
        return;
      }

      try {
        setDeletingId(
          testimonial._id
        );

        const response =
          await fetch(
            `${TESTIMONIALS_API}/${testimonial._id}`,
            {
              method: "DELETE",
            }
          );

        if (!response.ok) {
          throw new Error(
            await getErrorMessage(
              response,
              "Failed to delete testimonial."
            )
          );
        }

        setSelectedTestimonial(
          null
        );

        await Promise.all([
          fetchTestimonials({
            silent: true,
          }),
          fetchStats(),
        ]);
      } catch (error) {
        console.error(
          "Delete testimonial error:",
          error
        );

        window.alert(
          error.message ||
            "Failed to delete testimonial."
        );
      } finally {
        setDeletingId(null);
      }
    };


  /* ========================================================
     APPROVE
  ======================================================== */

  const handleApprove =
    async (testimonial) => {
      if (
        !testimonial?._id
      ) {
        return;
      }

      try {
        setActionId(
          testimonial._id
        );

        const response =
          await fetch(
            `${TESTIMONIALS_API}/${testimonial._id}/approve`,
            {
              method: "PATCH",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                consentToPublish: true,
              }),
            }
          );

        if (!response.ok) {
          throw new Error(
            await getErrorMessage(
              response,
              "Failed to approve testimonial."
            )
          );
        }

        await Promise.all([
          fetchTestimonials({
            silent: true,
          }),
          fetchStats(),
        ]);
      } catch (error) {
        console.error(
          "Approve testimonial error:",
          error
        );

        window.alert(
          error.message ||
            "Failed to approve testimonial."
        );
      } finally {
        setActionId(null);
      }
    };


  /* ========================================================
     REJECT
  ======================================================== */

  const handleReject =
    async (testimonial) => {
      if (
        !testimonial?._id
      ) {
        return;
      }

      try {
        setActionId(
          testimonial._id
        );

        const response =
          await fetch(
            `${TESTIMONIALS_API}/${testimonial._id}/reject`,
            {
              method: "PATCH",
            }
          );

        if (!response.ok) {
          throw new Error(
            await getErrorMessage(
              response,
              "Failed to reject testimonial."
            )
          );
        }

        await Promise.all([
          fetchTestimonials({
            silent: true,
          }),
          fetchStats(),
        ]);
      } catch (error) {
        console.error(
          "Reject testimonial error:",
          error
        );

        window.alert(
          error.message ||
            "Failed to reject testimonial."
        );
      } finally {
        setActionId(null);
      }
    };


  /* ========================================================
     FEATURED
  ======================================================== */

  const handleToggleFeatured =
    async (testimonial) => {
      if (
        !testimonial?._id
      ) {
        return;
      }

      try {
        setActionId(
          testimonial._id
        );

        const response =
          await fetch(
            `${TESTIMONIALS_API}/${testimonial._id}/featured`,
            {
              method: "PATCH",
            }
          );

        if (!response.ok) {
          throw new Error(
            await getErrorMessage(
              response,
              "Failed to update featured status."
            )
          );
        }

        await Promise.all([
          fetchTestimonials({
            silent: true,
          }),
          fetchStats(),
        ]);
      } catch (error) {
        console.error(
          "Toggle featured error:",
          error
        );

        window.alert(
          error.message ||
            "Failed to update featured status."
        );
      } finally {
        setActionId(null);
      }
    };


  /* ========================================================
     RESET FILTERS
  ======================================================== */

  const resetFilters =
    () => {
      setSearch("");
      setStatusFilter("all");
      setRatingFilter("all");
      setFeaturedFilter("all");
    };


  /* ========================================================
     STATUS CLASS
  ======================================================== */

  const getStatusClass =
    (status) => {
      switch (status) {
        case "approved":
          return "testimonial-status-approved";

        case "pending":
          return "testimonial-status-pending";

        case "rejected":
          return "testimonial-status-rejected";

        default:
          return "";
      }
    };


  /* ========================================================
     RENDER STARS
  ======================================================== */

  const renderStars =
    (rating = 0) => {
      const numericRating =
        Number(rating) || 0;

      return (
        <div
          className="admin-testimonial-stars"
          aria-label={`${numericRating} out of 5 stars`}
        >
          {[1, 2, 3, 4, 5].map(
            (star) => (
              <Star
                key={star}
                size={14}
                strokeWidth={1.8}
                fill={
                  star <=
                  numericRating
                    ? "currentColor"
                    : "none"
                }
              />
            )
          )}
        </div>
      );
    };


  /* ========================================================
     LOADING
  ======================================================== */

  if (loading) {
    return (
      <div className="admin-testimonials-page">
        <div className="container-fluid">
          <div className="admin-testimonials-loading">
            <div
              className="spinner-border"
              role="status"
              aria-hidden="true"
            />

            <span>
              Loading testimonials...
            </span>
          </div>
        </div>
      </div>
    );
  }


  /* ========================================================
     MAIN
  ======================================================== */

  return (
    <div className="admin-testimonials-page">
      <div className="container-fluid">

        {/* ==================================================
            PAGE HEADER
        ================================================== */}

        <div className="admin-testimonials-header">

          <div className="admin-testimonials-heading">

            <div className="admin-testimonials-eyebrow">
              <MessageSquareQuote
                size={16}
              />

              <span>
                CLIENT EXPERIENCES
              </span>
            </div>

            <h1>
              Testimonials
            </h1>

            <p>
              Manage client experiences,
              publishing status, featured
              reviews, and testimonial
              content from one place.
            </p>

          </div>


          <div className="admin-testimonials-header-actions">

            <button
              type="button"
              className="admin-testimonials-refresh-btn"
              onClick={handleRefresh}
              disabled={refreshing}
              title="Refresh testimonials"
            >
              <RefreshCw
                size={17}
                className={
                  refreshing
                    ? "is-spinning"
                    : ""
                }
              />

              <span>
                {refreshing
                  ? "Refreshing..."
                  : "Refresh"}
              </span>

            </button>


            <button
              type="button"
              className="admin-testimonials-add-btn"
              onClick={handleAdd}
            >
              <Plus size={18} />

              <span>
                Add Testimonial
              </span>

            </button>

          </div>

        </div>


        {/* ==================================================
            STATISTICS
        ================================================== */}

        <div className="admin-testimonial-stats">

          <div className="admin-testimonial-stat-card">

            <div className="admin-testimonial-stat-icon total">
              <MessageSquareQuote
                size={20}
              />
            </div>

            <div>
              <span>
                Total
              </span>

              <strong>
                {stats.total}
              </strong>
            </div>

          </div>


          <div className="admin-testimonial-stat-card">

            <div className="admin-testimonial-stat-icon published">
              <CheckCircle2
                size={20}
              />
            </div>

            <div>
              <span>
                Published
              </span>

              <strong>
                {stats.published}
              </strong>
            </div>

          </div>


          <div className="admin-testimonial-stat-card">

            <div className="admin-testimonial-stat-icon pending">
              <Clock3 size={20} />
            </div>

            <div>
              <span>
                Pending
              </span>

              <strong>
                {stats.pending}
              </strong>
            </div>

          </div>


          <div className="admin-testimonial-stat-card">

            <div className="admin-testimonial-stat-icon featured">
              <Star size={20} />
            </div>

            <div>
              <span>
                Featured
              </span>

              <strong>
                {stats.featured}
              </strong>
            </div>

          </div>


          <div className="admin-testimonial-stat-card">

            <div className="admin-testimonial-stat-icon rejected">
              <XCircle size={20} />
            </div>

            <div>
              <span>
                Rejected
              </span>

              <strong>
                {stats.rejected}
              </strong>
            </div>

          </div>

        </div>


        {/* ==================================================
            TOOLBAR
        ================================================== */}

        <div className="admin-testimonials-toolbar">

          <div className="admin-testimonial-search">

            <Search size={18} />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search by client, email, service, location..."
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
                aria-label="Clear search"
              >
                <XCircle size={16} />
              </button>
            )}

          </div>


          <div className="admin-testimonial-filters">

            <div className="admin-testimonial-filter">

              <Filter size={15} />

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
                aria-label="Filter by status"
              >
                <option value="all">
                  All Status
                </option>

                <option value="approved">
                  Approved
                </option>

                <option value="pending">
                  Pending
                </option>

                <option value="rejected">
                  Rejected
                </option>
              </select>

            </div>


            <div className="admin-testimonial-filter">

              <Star size={15} />

              <select
                value={ratingFilter}
                onChange={(event) =>
                  setRatingFilter(
                    event.target.value
                  )
                }
                aria-label="Filter by rating"
              >
                <option value="all">
                  All Ratings
                </option>

                <option value="5">
                  5 Stars
                </option>

                <option value="4">
                  4 Stars
                </option>

                <option value="3">
                  3 Stars
                </option>

                <option value="2">
                  2 Stars
                </option>

                <option value="1">
                  1 Star
                </option>

              </select>

            </div>


            <div className="admin-testimonial-filter">

              <select
                value={featuredFilter}
                onChange={(event) =>
                  setFeaturedFilter(
                    event.target.value
                  )
                }
                aria-label="Filter featured testimonials"
              >
                <option value="all">
                  All Testimonials
                </option>

                <option value="featured">
                  Featured
                </option>

                <option value="not-featured">
                  Not Featured
                </option>

              </select>

            </div>


            {(search ||
              statusFilter !== "all" ||
              ratingFilter !== "all" ||
              featuredFilter !== "all") && (
              <button
                type="button"
                className="admin-testimonial-clear-filters"
                onClick={resetFilters}
              >
                Clear
              </button>
            )}

          </div>

        </div>


        {/* ==================================================
            RESULT INFO
        ================================================== */}

        <div className="admin-testimonials-result-bar">

          <div>

            <strong>
              {filteredTestimonials.length}
            </strong>

            <span>
              {filteredTestimonials.length ===
              1
                ? " testimonial"
                : " testimonials"}
            </span>

          </div>


          {filteredTestimonials.length !==
            testimonials.length && (
            <span>
              filtered from{" "}
              {testimonials.length}
            </span>
          )}

        </div>


        {/* ==================================================
            EMPTY STATE
        ================================================== */}

        {filteredTestimonials.length ===
          0 && (
          <div className="admin-testimonials-empty">

            <div className="admin-testimonials-empty-icon">
              <MessageSquareQuote
                size={30}
              />
            </div>

            <h3>
              No testimonials found
            </h3>

            <p>
              {testimonials.length ===
              0
                ? "There are no testimonials yet. Add your first client experience."
                : "No testimonials match your current search or filters."}
            </p>


            {testimonials.length ===
              0 ? (
              <button
                type="button"
                className="admin-testimonials-add-btn"
                onClick={handleAdd}
              >
                <Plus size={18} />
                Add Testimonial
              </button>
            ) : (
              <button
                type="button"
                className="admin-testimonial-reset-btn"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            )}

          </div>
        )}


        {/* ==================================================
            TESTIMONIAL LIST
        ================================================== */}

        {filteredTestimonials.length >
          0 && (
          <div className="admin-testimonials-list">

            {filteredTestimonials.map(
              (testimonial) => {

                const imageUrl =
                  getImageUrl(
                    testimonial.imageUrl
                  );

                const isActionLoading =
                  actionId ===
                  testimonial._id;

                const isDeleting =
                  deletingId ===
                  testimonial._id;


                return (
                  <article
                    key={
                      testimonial._id
                    }
                    className={`admin-testimonial-row ${
                      testimonial.isFeatured
                        ? "is-featured"
                        : ""
                    }`}
                  >

                    {/* --------------------------------------
                        CLIENT
                    -------------------------------------- */}

                    <div className="admin-testimonial-client">

                      <div className="admin-testimonial-avatar">

                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={
                              testimonial.clientName ||
                              "Client"
                            }
                            onError={(
                              event
                            ) => {
                              event.currentTarget.style.display =
                                "none";

                              event.currentTarget.parentElement.classList.add(
                                "show-initials"
                              );
                            }}
                          />
                        ) : null}

                        <span>
                          {getInitials(
                            testimonial.clientName
                          )}
                        </span>

                      </div>


                      <div className="admin-testimonial-client-info">

                        <div className="admin-testimonial-name-line">

                          <h3>
                            {testimonial.clientName ||
                              "Unnamed Client"}
                          </h3>


                          {testimonial.isFeatured && (
                            <span className="admin-testimonial-featured-badge">

                              <Star
                                size={11}
                                fill="currentColor"
                              />

                              Featured

                            </span>
                          )}

                        </div>


                        <p>
                          {testimonial.designation ||
                            "Client"}
                        </p>


                        {testimonial.email && (
                          <small>
                            {testimonial.email}
                          </small>
                        )}

                      </div>

                    </div>


                    {/* --------------------------------------
                        EXPERIENCE
                    -------------------------------------- */}

                    <div className="admin-testimonial-experience">

                      <div className="admin-testimonial-rating-line">

                        {renderStars(
                          testimonial.rating
                        )}

                        <strong>
                          {Number(
                            testimonial.rating
                          ) || 0}
                          /5
                        </strong>

                      </div>


                      <p>
                        “
                        {testimonial.comment ||
                          "No comment provided."}
                        ”
                      </p>

                    </div>


                    {/* --------------------------------------
                        SERVICE
                    -------------------------------------- */}

                    <div className="admin-testimonial-service">

                      <span>
                        Service
                      </span>

                      <strong>
                        {testimonial.serviceType ||
                          "Not specified"}
                      </strong>


                      {testimonial.location && (
                        <small>
                          {testimonial.location}
                        </small>
                      )}

                    </div>


                    {/* --------------------------------------
                        STATUS
                    -------------------------------------- */}

                    <div className="admin-testimonial-status-column">

                      <span
                        className={`admin-testimonial-status ${getStatusClass(
                          testimonial.status
                        )}`}
                      >

                        {testimonial.status ===
                          "approved" && (
                          <CheckCircle2
                            size={13}
                          />
                        )}


                        {testimonial.status ===
                          "pending" && (
                          <Clock3
                            size={13}
                          />
                        )}


                        {testimonial.status ===
                          "rejected" && (
                          <XCircle
                            size={13}
                          />
                        )}


                        {testimonial.status ||
                          "unknown"}

                      </span>


                      {testimonial.consentToPublish && (
                        <small className="admin-testimonial-published-label">
                          Public
                        </small>
                      )}

                    </div>


                    {/* --------------------------------------
                        ACTIONS
                    -------------------------------------- */}

                    <div className="admin-testimonial-actions">

                      {/* VIEW */}

                      <button
                        type="button"
                        className="admin-testimonial-icon-btn view"
                        title="View testimonial"
                        onClick={() =>
                          setSelectedTestimonial(
                            testimonial
                          )
                        }
                      >
                        <Eye size={16} />
                      </button>


                      {/* EDIT */}

                      <button
                        type="button"
                        className="admin-testimonial-icon-btn edit"
                        title="Edit testimonial"
                        onClick={() =>
                          handleEdit(
                            testimonial
                          )
                        }
                      >
                        <Edit3 size={16} />
                      </button>


                      {/* APPROVE */}

                      {testimonial.status !==
                        "approved" && (
                        <button
                          type="button"
                          className="admin-testimonial-icon-btn approve"
                          title="Approve testimonial"
                          disabled={
                            isActionLoading
                          }
                          onClick={() =>
                            handleApprove(
                              testimonial
                            )
                          }
                        >
                          <CheckCircle2
                            size={16}
                          />
                        </button>
                      )}


                      {/* REJECT */}

                      {testimonial.status !==
                        "rejected" && (
                        <button
                          type="button"
                          className="admin-testimonial-icon-btn reject"
                          title="Reject testimonial"
                          disabled={
                            isActionLoading
                          }
                          onClick={() =>
                            handleReject(
                              testimonial
                            )
                          }
                        >
                          <XCircle
                            size={16}
                          />
                        </button>
                      )}


                      {/* FEATURED */}

                      <button
                        type="button"
                        className={`admin-testimonial-icon-btn featured ${
                          testimonial.isFeatured
                            ? "active"
                            : ""
                        }`}
                        title={
                          testimonial.isFeatured
                            ? "Remove featured"
                            : "Mark featured"
                        }
                        disabled={
                          isActionLoading ||
                          testimonial.status ===
                            "rejected"
                        }
                        onClick={() =>
                          handleToggleFeatured(
                            testimonial
                          )
                        }
                      >
                        <Star
                          size={16}
                          fill={
                            testimonial.isFeatured
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>


                      {/* DELETE */}

                      <button
                        type="button"
                        className="admin-testimonial-icon-btn delete"
                        title="Delete testimonial"
                        disabled={
                          isDeleting
                        }
                        onClick={() =>
                          handleDelete(
                            testimonial
                          )
                        }
                      >

                        {isDeleting ? (
                          <span className="testimonial-mini-spinner" />
                        ) : (
                          <Trash2
                            size={16}
                          />
                        )}

                      </button>

                    </div>

                  </article>
                );
              }
            )}

          </div>
        )}

      </div>


      {/* ====================================================
          TESTIMONIAL FORM MODAL
      ==================================================== */}

      {showForm && (
        <div
          className="admin-testimonial-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="testimonial-form-title"
        >

          <div
            className="admin-testimonial-modal-dialog"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >

            <div className="admin-testimonial-modal-content">

              <TestimonialForm
                testimonial={
                  editingTestimonial
                }
                onSave={
                  handleSave
                }
                onClose={
                  handleCloseForm
                }
                loading={saving}
              />

            </div>

          </div>

        </div>
      )}


      {/* ====================================================
          FORM BACKDROP
      ==================================================== */}

      {showForm && (
        <div
          className="admin-testimonial-backdrop"
          onClick={() => {
            if (!saving) {
              handleCloseForm();
            }
          }}
          aria-hidden="true"
        />
      )}


      {/* ====================================================
          VIEW MODAL
      ==================================================== */}

      {selectedTestimonial && (
        <div
          className="admin-testimonial-view-overlay"
          role="dialog"
          aria-modal="true"
        >

          <div className="admin-testimonial-view-modal">

            {/* ----------------------------------------------
                VIEW HEADER
            ---------------------------------------------- */}

            <div className="admin-testimonial-view-header">

              <div>

                <span>
                  CLIENT EXPERIENCE
                </span>

                <h2>
                  Testimonial Details
                </h2>

              </div>


              <button
                type="button"
                onClick={() =>
                  setSelectedTestimonial(
                    null
                  )
                }
                aria-label="Close"
              >
                <XCircle size={21} />
              </button>

            </div>


            {/* ----------------------------------------------
                VIEW BODY
            ---------------------------------------------- */}

            <div className="admin-testimonial-view-body">

              <div className="admin-testimonial-view-client">

                <div className="admin-testimonial-view-avatar">

                  {getImageUrl(
                    selectedTestimonial.imageUrl
                  ) ? (
                    <img
                      src={getImageUrl(
                        selectedTestimonial.imageUrl
                      )}
                      alt={
                        selectedTestimonial.clientName
                      }
                    />
                  ) : (
                    <span>
                      {getInitials(
                        selectedTestimonial.clientName
                      )}
                    </span>
                  )}

                </div>


                <div>

                  <h3>
                    {
                      selectedTestimonial.clientName
                    }
                  </h3>

                  <p>
                    {
                      selectedTestimonial.designation
                    }
                  </p>


                  {selectedTestimonial.location && (
                    <small>
                      {
                        selectedTestimonial.location
                      }
                    </small>
                  )}

                </div>

              </div>


              {/* RATING */}

              <div className="admin-testimonial-view-rating">

                {renderStars(
                  selectedTestimonial.rating
                )}

                <strong>
                  {
                    selectedTestimonial.rating
                  }
                  /5
                </strong>

              </div>


              {/* COMMENT */}

              <blockquote>
                “
                {
                  selectedTestimonial.comment
                }
                ”
              </blockquote>


              {/* META */}

              <div className="admin-testimonial-view-meta">

                <div>
                  <span>
                    Service
                  </span>

                  <strong>
                    {
                      selectedTestimonial.serviceType ||
                      "Not specified"
                    }
                  </strong>
                </div>


                <div>
                  <span>
                    Status
                  </span>

                  <strong>
                    {
                      selectedTestimonial.status
                    }
                  </strong>
                </div>


                <div>
                  <span>
                    Publishing
                  </span>

                  <strong>
                    {selectedTestimonial.consentToPublish
                      ? "Public"
                      : "Private"}
                  </strong>
                </div>


                <div>
                  <span>
                    Featured
                  </span>

                  <strong>
                    {selectedTestimonial.isFeatured
                      ? "Yes"
                      : "No"}
                  </strong>
                </div>

              </div>


              {/* ADMIN NOTE */}

              {selectedTestimonial.adminNote && (
                <div className="admin-testimonial-admin-note">

                  <span>
                    Admin Note
                  </span>

                  <p>
                    {
                      selectedTestimonial.adminNote
                    }
                  </p>

                </div>
              )}

            </div>


            {/* ----------------------------------------------
                VIEW FOOTER
            ---------------------------------------------- */}

            <div className="admin-testimonial-view-footer">

              <button
                type="button"
                className="admin-testimonial-secondary-btn"
                onClick={() =>
                  setSelectedTestimonial(
                    null
                  )
                }
              >
                Close
              </button>


              <button
                type="button"
                className="admin-testimonial-primary-btn"
                onClick={() => {

                  const testimonial =
                    selectedTestimonial;

                  setSelectedTestimonial(
                    null
                  );

                  handleEdit(
                    testimonial
                  );

                }}
              >

                <Edit3 size={16} />

                Edit Testimonial

              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};


export default Testimonials;

