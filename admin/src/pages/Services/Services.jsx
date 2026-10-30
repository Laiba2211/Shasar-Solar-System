import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Image as ImageIcon,
  Video,
  RefreshCw,
  X,
  Upload,
  Save,
  XCircle,
} from "lucide-react";

import "./services.css";

const API_BASE_URL = "http://localhost:5000";
const API_URL = `${API_BASE_URL}/api/services`;

// ==========================================================
// SERVICE CATEGORIES
// ==========================================================

const SERVICE_CATEGORIES = [
  "Residential Solar",
  "Commercial Solar",
  "Industrial Solar",
  "Solar Battery Storage",
  "Solar Maintenance",
  "Solar Cleaning",
  "EV Charging",
  "Solar Water Heating",
  "Energy Audit",
  "Off-Grid Solar",
  "Other",
];

// ==========================================================
// DUBAI / UAE OPTIONS
// ==========================================================

const SYSTEM_SIZE_OPTIONS = [
  "1–5 kW",
  "5–10 kW",
  "10–50 kW",
  "50–100 kW",
  "100+ kW",
];

const SUITABLE_FOR_OPTIONS = [
  "Villas",
  "Apartments",
  "Offices",
  "Warehouses",
  "Factories",
  "Commercial Buildings",
  "Industrial Facilities",
  "Schools",
  "Hotels",
  "Farms",
];

// ==========================================================
// INITIAL FORM
// ==========================================================

const initialForm = {
  title: "",
  slug: "",
  description: "",

  category: "",

  serviceArea: "",
  suitableFor: [],
  systemSize: "",

  startingPrice: "",
  priceUnit: "",
  pricingDescription: "",
};

// ==========================================================
// MEDIA URL
// ==========================================================

const getMediaUrl = (mediaUrl) => {
  if (!mediaUrl) {
    return "";
  }

  if (
    mediaUrl.startsWith("http://") ||
    mediaUrl.startsWith("https://")
  ) {
    return mediaUrl;
  }

  if (mediaUrl.startsWith("/uploads")) {
    return `${API_BASE_URL}${mediaUrl}`;
  }

  return mediaUrl;
};

// ==========================================================
// SLUG GENERATOR
// ==========================================================

const createSlug = (value) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

// ==========================================================
// NORMALIZE ARRAY
// ==========================================================

const normalizeArray = (value, fallback = []) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return fallback;
};

// ==========================================================
// COMPONENT
// ==========================================================

const Services = () => {
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // ========================================================
  // MODAL
  // ========================================================

  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  // ========================================================
  // FORM
  // ========================================================

  const [form, setForm] = useState(initialForm);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [mediaType, setMediaType] = useState("");

  // ========================================================
  // MODAL SCROLL LOCK
  // ========================================================

  useEffect(() => {
    if (!showModal) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape" && !saving) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [showModal, saving]);

  // ========================================================
  // FETCH SERVICES
  // ========================================================

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to fetch services."
        );
      }

      setServices(
        Array.isArray(result.data)
          ? result.data
          : []
      );
    } catch (error) {
      console.error(
        "Fetch services error:",
        error
      );

      setError(
        error.message ||
          "Unable to load services. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================================
  // INITIAL LOAD
  // ========================================================

  useEffect(() => {
    fetchServices();
  }, []);

  // ========================================================
  // SEARCH
  // ========================================================
  //
  // Search works completely on the already-loaded
  // services state.
  //
  // No API request is made while typing.
  //
  // Searches:
  // - title
  // - slug
  // - description
  // - category
  // - service area
  // - suitableFor
  // - system size
  // - starting price
  // - price unit
  // - pricing description
  //
  // Case-insensitive + whitespace-safe.
  // ========================================================

  const normalizeSearchValue = (value) =>
    String(value ?? "")
      .normalize("NFKC")
      .trim()
      .toLowerCase()
      .replace(/[-_]+/g, " ")
      .replace(/\\s+/g, " ");

  const normalizedSearch = normalizeSearchValue(search);

  const filteredServices = services.filter((service) => {
    if (!normalizedSearch) {
      return true;
    }

    const suitableForValues = Array.isArray(service.suitableFor)
      ? service.suitableFor
      : normalizeArray(service.suitableFor, []);

    const searchableText = [
      service.title,
      service.slug,
      service.description,
      service.category,
      service.serviceArea,
      service.systemSize,
      service.startingPrice,
      service.priceUnit,
      service.pricingDescription,
      ...suitableForValues,
    ]
      .map(normalizeSearchValue)
      .filter(Boolean)
      .join(" ");

    return searchableText.includes(normalizedSearch);
  });

  // ========================================================
  // MEDIA RENDER
  // ========================================================

  const renderMedia = (service) => {
    if (!service.mediaUrl) {
      return (
        <div className="services-page__media-placeholder">
          <ImageIcon size={24} />
        </div>
      );
    }

    const mediaUrl = getMediaUrl(
      service.mediaUrl
    );

    if (service.mediaType === "video") {
      return (
        <div className="services-page__media">
          <video
            src={mediaUrl}
            muted
            playsInline
            preload="metadata"
          />

          <div className="services-page__media-type">
            <Video size={13} />
            Video
          </div>
        </div>
      );
    }

    return (
      <div className="services-page__media">
        <img
          src={mediaUrl}
          alt={
            service.title || "Service media"
          }
          loading="lazy"
        />

        <div className="services-page__media-type">
          <ImageIcon size={13} />
          Image
        </div>
      </div>
    );
  };

  // ========================================================
  // ADD SERVICE
  // ========================================================

  const handleAdd = () => {
    setEditingService(null);

    setForm({
      ...initialForm,
      suitableFor: [],
    });

    setSelectedFile(null);
    setPreviewUrl("");
    setMediaType("");
    setError("");
    setShowModal(true);
  };

  // ========================================================
  // EDIT SERVICE
  // ========================================================

  const handleEdit = (service) => {
    setEditingService(service);

    setForm({
      title: service.title || "",
      slug: service.slug || "",
      description: service.description || "",

      category: service.category || "",

      serviceArea:
        service.serviceArea || "",

      suitableFor: normalizeArray(
        service.suitableFor,
        []
      ),

      systemSize:
        service.systemSize || "",

      startingPrice:
        service.startingPrice !== undefined &&
        service.startingPrice !== null
          ? service.startingPrice
          : "",

      priceUnit:
        service.priceUnit || "",

      pricingDescription:
        service.pricingDescription || "",
    });

    setSelectedFile(null);

    setPreviewUrl(
      service.mediaUrl
        ? getMediaUrl(service.mediaUrl)
        : ""
    );

    setMediaType(
      service.mediaType || ""
    );

    setError("");
    setShowModal(true);
  };

  // ========================================================
  // CLOSE MODAL
  // ========================================================

  const closeModal = () => {
    if (saving) {
      return;
    }

    setShowModal(false);
    setEditingService(null);
    setForm(initialForm);
    setSelectedFile(null);
    setPreviewUrl("");
    setMediaType("");
    setError("");
  };

  // ========================================================
  // INPUT CHANGE
  // ========================================================

  const handleInputChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  // ========================================================
  // TITLE + SLUG
  // ========================================================

  const handleTitleChange = (event) => {
    const title = event.target.value;

    setForm((previousForm) => ({
      ...previousForm,

      title,

      slug:
        !editingService ||
        previousForm.slug ===
          createSlug(previousForm.title)
          ? createSlug(title)
          : previousForm.slug,
    }));
  };

  // ========================================================
  // FILE CHANGE
  // ========================================================

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");

    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
    ];

    const allowedVideoTypes = [
      "video/mp4",
      "video/webm",
      "video/quicktime",
    ];

    const isImage =
      allowedImageTypes.includes(
        file.type
      );

    const isVideo =
      allowedVideoTypes.includes(
        file.type
      );

    if (!isImage && !isVideo) {
      setError(
        "Please select a JPG, PNG, WEBP image or MP4, WEBM, MOV video."
      );

      event.target.value = "";

      return;
    }

    if (
      isImage &&
      file.size > 5 * 1024 * 1024
    ) {
      setError(
        "Image size must be 5MB or smaller."
      );

      event.target.value = "";

      return;
    }

    if (
      isVideo &&
      file.size > 50 * 1024 * 1024
    ) {
      setError(
        "Video size must be 50MB or smaller."
      );

      event.target.value = "";

      return;
    }

    setSelectedFile(file);

    setMediaType(
      isImage ? "image" : "video"
    );

    const objectUrl =
      URL.createObjectURL(file);

    setPreviewUrl(objectUrl);
  };

  // ========================================================
  // SUITABLE FOR
  // ========================================================

  const handleSuitableForChange = (
    option
  ) => {
    setForm((previousForm) => {
      const current =
        previousForm.suitableFor || [];

      const exists =
        current.includes(option);

      return {
        ...previousForm,

        suitableFor: exists
          ? current.filter(
              (item) => item !== option
            )
          : [...current, option],
      };
    });
  };

  // ========================================================
  // CREATE / UPDATE
  // ========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      // ----------------------------------------------------
      // VALIDATION
      // ----------------------------------------------------

      if (!form.title.trim()) {
        throw new Error(
          "Service title is required."
        );
      }

      if (!form.description.trim()) {
        throw new Error(
          "Service description is required."
        );
      }

      if (!form.slug.trim()) {
        throw new Error(
          "Service slug is required."
        );
      }

      if (!form.category) {
        throw new Error(
          "Please select a service category."
        );
      }

      if (
        !editingService &&
        !selectedFile
      ) {
        throw new Error(
          "Please select an image or video."
        );
      }

      // ----------------------------------------------------
      // FORM DATA
      // ----------------------------------------------------

      const formData = new FormData();

      formData.append(
        "title",
        form.title.trim()
      );

      formData.append(
        "slug",
        form.slug
          .trim()
          .toLowerCase()
      );

      formData.append(
        "description",
        form.description.trim()
      );

      // ----------------------------------------------------
      // MEDIA
      // ----------------------------------------------------

      if (selectedFile) {
        formData.append(
          "media",
          selectedFile
        );
      }

      // ----------------------------------------------------
      // CATEGORY
      // ----------------------------------------------------

      formData.append(
        "category",
        form.category
      );

      // ----------------------------------------------------
      // DUBAI / UAE INFORMATION
      // ----------------------------------------------------

      formData.append(
        "serviceArea",
        form.serviceArea.trim()
      );

      formData.append(
        "suitableFor",
        JSON.stringify(
          (form.suitableFor || [])
            .filter(Boolean)
        )
      );

      formData.append(
        "systemSize",
        form.systemSize
      );

      // ----------------------------------------------------
      // PRICING
      // ----------------------------------------------------

      formData.append(
        "startingPrice",
        String(
          form.startingPrice || ""
        )
      );

      formData.append(
        "priceUnit",
        form.priceUnit.trim()
      );

      formData.append(
        "pricingDescription",
        form.pricingDescription.trim()
      );

      // ----------------------------------------------------
      // CREATE / UPDATE
      // ----------------------------------------------------

      const url = editingService
        ? `${API_URL}/${editingService._id}`
        : API_URL;

      const method = editingService
        ? "PUT"
        : "POST";

      const response = await fetch(
        url,
        {
          method,
          body: formData,
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            `Unable to ${
              editingService
                ? "update"
                : "create"
            } service.`
        );
      }

      // ----------------------------------------------------
      // LOCAL STATE
      // ----------------------------------------------------

      if (editingService) {
        setServices(
          (previousServices) =>
            previousServices.map(
              (service) =>
                service._id ===
                editingService._id
                  ? result.data
                  : service
            )
        );
      } else {
        setServices(
          (previousServices) => [
            result.data,
            ...previousServices,
          ]
        );
      }

      closeModal();
    } catch (error) {
      console.error(
        "Save service error:",
        error
      );

      setError(
        error.message ||
          "Unable to save service. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // ========================================================
  // DELETE
  // ========================================================

  const handleDelete = async (
    service
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${service.title}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `${API_URL}/${service._id}`,
        {
          method: "DELETE",
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Unable to delete service."
        );
      }

      setServices(
        (previousServices) =>
          previousServices.filter(
            (item) =>
              item._id !==
              service._id
          )
      );
    } catch (error) {
      console.error(
        "Delete service error:",
        error
      );

      setError(
        error.message ||
          "Unable to delete service. Please try again."
      );
    }
  };

  // ========================================================
  // LOADING
  // ========================================================

  if (loading) {
    return (
      <section className="services-page">
        <div className="services-page__loading">
          <RefreshCw
            size={24}
            className="services-page__loading-icon"
          />

          <span>
            Loading services...
          </span>
        </div>
      </section>
    );
  }

  // ========================================================
  // PAGE
  // ========================================================

  return (
    <section className="services-page">

      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="services-page__header">

        <div>
          <div className="services-page__eyebrow">
            SERVICE MANAGEMENT
          </div>

          <h1>Services</h1>

          <p>
            Manage your solar services,
            media, UAE information and
            pricing from one place.
          </p>
        </div>

        <button
          type="button"
          className="services-page__add-button"
          onClick={handleAdd}
        >
          <Plus size={18} />
          <span>Add Service</span>
        </button>

      </div>

      {/* ====================================================
          ERROR
      ==================================================== */}

      {error && !showModal && (
        <div
          className="services-page__error"
          role="alert"
        >
          <XCircle size={18} />

          <span>{error}</span>

          <button
            type="button"
            onClick={fetchServices}
          >
            Retry
          </button>
        </div>
      )}

      {/* ====================================================
          STATS
      ==================================================== */}

      <div className="services-page__stats">

        <div className="services-page__stat">
          <span>Total Services</span>

          <strong>
            {services.length}
          </strong>
        </div>

        <div className="services-page__stat">
          <span>Active</span>

          <strong>
            {
              services.filter(
                (service) =>
                  service.isActive !==
                  false
              ).length
            }
          </strong>
        </div>

        <div className="services-page__stat">
          <span>Images</span>

          <strong>
            {
              services.filter(
                (service) =>
                  service.mediaType ===
                  "image"
              ).length
            }
          </strong>
        </div>

        <div className="services-page__stat">
          <span>Videos</span>

          <strong>
            {
              services.filter(
                (service) =>
                  service.mediaType ===
                  "video"
              ).length
            }
          </strong>
        </div>

      </div>

      {/* ====================================================
          TOOLBAR
      ==================================================== */}

      <div className="services-page__toolbar">

        <div className="services-page__search">

          <Search size={18} />

          <input
            type="search"
            placeholder="Search services..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            aria-label="Search services"
          />

          {search && (
            <button
              type="button"
              className="services-page__search-clear"
              onClick={() =>
                setSearch("")
              }
              aria-label="Clear search"
              title="Clear search"
            >
              <X size={15} />
            </button>
          )}

        </div>

        <button
          type="button"
          className="services-page__refresh"
          onClick={fetchServices}
        >
          <RefreshCw size={17} />
          <span>Refresh</span>
        </button>

      </div>

      {/* ====================================================
          SERVICE TABLE
      ==================================================== */}

      <div className="services-page__card">

        <div className="services-page__card-header">

          <div>
            <h2>All Services</h2>

            <span>
              {filteredServices.length} service
              {filteredServices.length !== 1
                ? "s"
                : ""}
            </span>
          </div>

        </div>

        {filteredServices.length === 0 ? (
          <div className="services-page__empty">

            <div className="services-page__empty-icon">
              <ImageIcon size={28} />
            </div>

            <h3>
              {search
                ? "No services found"
                : "No services available"}
            </h3>

            <p>
              {search
                ? "Try a different search term."
                : "Create your first service to get started."}
            </p>

          </div>
        ) : (
          <div className="services-page__table-wrapper">

            <table className="services-page__table">

              <thead>
                <tr>
                  <th>Service</th>
                  <th>Category</th>
                  <th>Media</th>
                  <th>Pricing</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredServices.map(
                  (service) => (
                    <tr
                      key={
                        service._id ||
                        service.id
                      }
                    >

                      {/* SERVICE */}

                      <td>

                        <div className="services-page__service">

                          {renderMedia(
                            service
                          )}

                          <div className="services-page__service-info">

                            <strong>
                              {
                                service.title
                              }
                            </strong>

                            <span>
                              /
                              {
                                service.slug
                              }
                            </span>

                            <p>
                              {
                                service.description
                              }
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td>

                        <span className="services-page__media-badge">
                          {
                            service.category ||
                            "—"
                          }
                        </span>

                      </td>

                      {/* MEDIA */}

                      <td>

                        <span className="services-page__media-badge">

                          {service.mediaType ===
                          "video" ? (
                            <>
                              <Video
                                size={14}
                              />
                              Video
                            </>
                          ) : (
                            <>
                              <ImageIcon
                                size={14}
                              />
                              Image
                            </>
                          )}

                        </span>

                      </td>

                      {/* PRICING */}

                      <td>

                        {service.startingPrice ? (
                          <span>
                            AED{" "}
                            {
                              service.startingPrice
                            }

                            {service.priceUnit
                              ? ` / ${service.priceUnit}`
                              : ""}
                          </span>
                        ) : (
                          <span>
                            —
                          </span>
                        )}

                      </td>

                      {/* ACTIONS */}

                      <td>

                        <div className="services-page__actions">

                          <button
                            type="button"
                            className="services-page__action services-page__action--edit"
                            title="Edit service"
                            onClick={() =>
                              handleEdit(
                                service
                              )
                            }
                          >
                            <Pencil
                              size={16}
                            />
                          </button>

                          <button
                            type="button"
                            className="services-page__action services-page__action--delete"
                            title="Delete service"
                            onClick={() =>
                              handleDelete(
                                service
                              )
                            }
                          >
                            <Trash2
                              size={16}
                            />
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* ====================================================
          ADD / EDIT MODAL
      ==================================================== */}

      {showModal && (

        <div
          className="services-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeModal();
            }
          }}
        >

          <div
            className="services-modal"
            role="dialog"
            aria-modal="true"
          >

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="services-modal__header">

              <div>

                <span className="services-modal__eyebrow">
                  {editingService
                    ? "SERVICE MANAGEMENT"
                    : "NEW SERVICE"}
                </span>

                <h2>
                  {editingService
                    ? "Edit Service"
                    : "Add Service"}
                </h2>

                <p>
                  {editingService
                    ? "Update your service information."
                    : "Create a solar service for your website."}
                </p>

              </div>

              <button
                type="button"
                className="services-modal__close"
                onClick={closeModal}
                disabled={saving}
              >
                <X size={20} />
              </button>

            </div>

            {/* ==================================================
                FORM
            ================================================== */}

            <form onSubmit={handleSubmit}>

              <div className="services-modal__body">

                {/* ERROR */}

                {error && (
                  <div
                    className="services-page__error services-modal__error"
                    role="alert"
                  >
                    <XCircle size={18} />

                    <span>
                      {error}
                    </span>
                  </div>
                )}

                {/* ==================================================
                    01 — TITLE / SLUG / DESCRIPTION
                ================================================== */}

                <section className="services-modal__section services-modal__section--full">

                  <div className="services-modal__section-heading">

                    <div>

                      <span>01</span>

                      <div>

                        <h3>
                          Basic Information
                        </h3>

                        <p>
                          Add the basic information for your service.
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="services-modal__section-grid">

                    {/* TITLE */}

                    <div className="services-modal__field">

                      <label htmlFor="service-title">
                        Service Title
                        <span>*</span>
                      </label>

                      <input
                        id="service-title"
                        type="text"
                        name="title"
                        value={
                          form.title
                        }
                        onChange={
                          handleTitleChange
                        }
                        placeholder="e.g. Residential Solar Installation"
                        maxLength={150}
                        required
                      />

                    </div>

                    {/* SLUG */}

                    <div className="services-modal__field">

                      <label htmlFor="service-slug">
                        Slug
                        <span>*</span>
                      </label>

                      <input
                        id="service-slug"
                        type="text"
                        name="slug"
                        value={
                          form.slug
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="residential-solar-installation"
                        maxLength={180}
                        required
                      />

                      <small>
                        URL-friendly service identifier.
                      </small>

                    </div>

                    {/* DESCRIPTION */}

                    <div className="services-modal__field services-modal__field--full">

                      <label htmlFor="service-description">
                        Description
                        <span>*</span>
                      </label>

                      <textarea
                        id="service-description"
                        name="description"
                        value={
                          form.description
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="Describe this solar service..."
                        rows={5}
                        maxLength={500}
                        required
                      />

                      <small>
                        {
                          form.description.length
                        }
                        /500
                      </small>

                    </div>

                  </div>

                </section>

                {/* ==================================================
                    02 — MEDIA
                ================================================== */}

                <section className="services-modal__section services-modal__section--full">

                  <div className="services-modal__section-heading">

                    <div>

                      <span>02</span>

                      <div>

                        <h3>
                          Service Media
                        </h3>

                        <p>
                          Upload the image or video for this service.
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="services-modal__field">

                    <label htmlFor="service-media">

                      Service Media

                      {!editingService && (
                        <span>*</span>
                      )}

                    </label>

                    <div className="services-modal__upload">

                      <input
                        id="service-media"
                        type="file"
                        name="media"
                        accept=".jpg,.jpeg,.png,.webp,.mp4,.webm,.mov"
                        onChange={
                          handleFileChange
                        }
                      />

                      <label htmlFor="service-media">

                        <Upload size={20} />

                        <strong>
                          {selectedFile
                            ? selectedFile.name
                            : "Choose Image or Video"}
                        </strong>

                        <span>
                          JPG, JPEG, PNG, WEBP up to 5MB · MP4, WEBM, MOV up to 50MB
                        </span>

                      </label>

                    </div>

                    {/* PREVIEW */}

                    {previewUrl && (

                      <div className="services-modal__preview">

                        <div className="services-modal__preview-label">

                          <span>
                            Media Preview
                          </span>

                          <span>

                            {mediaType ===
                            "video" ? (
                              <>
                                <Video
                                  size={14}
                                />
                                Video
                              </>
                            ) : (
                              <>
                                <ImageIcon
                                  size={14}
                                />
                                Image
                              </>
                            )}

                          </span>

                        </div>

                        <div className="services-modal__preview-media">

                          {mediaType ===
                          "video" ? (
                            <video
                              src={
                                previewUrl
                              }
                              controls
                              muted
                              playsInline
                            />
                          ) : (
                            <img
                              src={
                                previewUrl
                              }
                              alt="Service preview"
                            />
                          )}

                        </div>

                      </div>

                    )}

                    {editingService &&
                      !selectedFile && (
                        <small>
                          Leave empty to keep the existing media.
                        </small>
                      )}

                  </div>

                </section>

                {/* ==================================================
                    03 — SERVICE CATEGORY
                ================================================== */}

                <section className="services-modal__section">

                  <div className="services-modal__section-heading">

                    <div>

                      <span>03</span>

                      <div>

                        <h3>
                          Service Category
                        </h3>

                        <p>
                          Select the category for this service.
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="services-modal__section-grid">

                    <div className="services-modal__field services-modal__field--full">

                      <label htmlFor="service-category">

                        Service Category

                        <span>*</span>

                      </label>

                      <select
                        id="service-category"
                        name="category"
                        value={
                          form.category
                        }
                        onChange={
                          handleInputChange
                        }
                        required
                      >

                        <option value="">
                          Select service category
                        </option>

                        {SERVICE_CATEGORIES.map(
                          (category) => (
                            <option
                              key={
                                category
                              }
                              value={
                                category
                              }
                            >
                              {
                                category
                              }
                            </option>
                          )
                        )}

                      </select>

                    </div>

                  </div>

                </section>

                {/* ==================================================
                    04 — DUBAI / UAE INFORMATION
                ================================================== */}

                <section className="services-modal__section">

                  <div className="services-modal__section-heading">

                    <div>

                      <span>04</span>

                      <div>

                        <h3>
                          Dubai / UAE Information
                        </h3>

                        <p>
                          Define service coverage and suitable customers.
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="services-modal__section-grid">

                    {/* SERVICE AREA */}

                    <div className="services-modal__field services-modal__field--full">

                      <label htmlFor="service-area">
                        Service Area
                      </label>

                      <input
                        id="service-area"
                        type="text"
                        name="serviceArea"
                        value={
                          form.serviceArea
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="Dubai, Abu Dhabi, Sharjah, Ajman, UAE"
                      />

                      <small>
                        Enter multiple areas separated by commas.
                      </small>

                    </div>

                    {/* SUITABLE FOR */}

                    <div className="services-modal__field services-modal__field--full">

                      <label>
                        Suitable For
                      </label>

                      <div className="services-modal__chips">

                        {SUITABLE_FOR_OPTIONS.map(
                          (option) => (

                            <button
                              type="button"
                              key={option}
                              className={`services-modal__chip ${
                                (
                                  form.suitableFor ||
                                  []
                                ).includes(
                                  option
                                )
                                  ? "is-selected"
                                  : ""
                              }`}
                              onClick={() =>
                                handleSuitableForChange(
                                  option
                                )
                              }
                            >
                              {option}
                            </button>

                          )
                        )}

                      </div>

                    </div>

                    {/* SYSTEM SIZE */}

                    <div className="services-modal__field">

                      <label htmlFor="system-size">
                        System Size
                      </label>

                      <select
                        id="system-size"
                        name="systemSize"
                        value={
                          form.systemSize
                        }
                        onChange={
                          handleInputChange
                        }
                      >

                        <option value="">
                          Select system size
                        </option>

                        {SYSTEM_SIZE_OPTIONS.map(
                          (size) => (
                            <option
                              key={size}
                              value={size}
                            >
                              {size}
                            </option>
                          )
                        )}

                      </select>

                    </div>

                  </div>

                </section>

                {/* ==================================================
                    05 — PRICING
                ================================================== */}

                <section className="services-modal__section">

                  <div className="services-modal__section-heading">

                    <div>

                      <span>05</span>

                      <div>

                        <h3>
                          Pricing
                        </h3>

                        <p>
                          Add Dubai / UAE pricing information for this service.
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="services-modal__section-grid">

                    {/* STARTING PRICE */}

                    <div className="services-modal__field">

                      <label htmlFor="starting-price">
                        Starting Price
                      </label>

                      <input
                        id="starting-price"
                        type="number"
                        name="startingPrice"
                        value={
                          form.startingPrice
                        }
                        onChange={
                          handleInputChange
                        }
                        min="0"
                        step="0.01"
                        placeholder="450"
                      />

                      <small>
                        Enter price in AED.
                      </small>

                    </div>

                    {/* PRICE UNIT */}

                    <div className="services-modal__field">

                      <label htmlFor="price-unit">
                        Price Unit
                      </label>

                      <input
                        id="price-unit"
                        type="text"
                        name="priceUnit"
                        value={
                          form.priceUnit
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="per kW"
                      />

                    </div>

                    {/* DESCRIPTION */}

                    <div className="services-modal__field services-modal__field--full">

                      <label htmlFor="pricing-description">
                        Pricing Description
                      </label>

                      <textarea
                        id="pricing-description"
                        name="pricingDescription"
                        value={
                          form.pricingDescription
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="Starting from AED 450. Final pricing depends on system size and site requirements."
                        rows={4}
                      />

                    </div>

                  </div>

                </section>

              </div>

              {/* ==================================================
                  FOOTER
              ================================================== */}

              <div className="services-modal__footer">

                <button
                  type="button"
                  className="services-modal__cancel"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="services-modal__submit"
                  disabled={saving}
                >

                  {saving ? (
                    <>
                      <RefreshCw
                        size={17}
                        className="services-page__loading-icon"
                      />

                      {editingService
                        ? "Updating..."
                        : "Creating..."}
                    </>
                  ) : (
                    <>
                      {editingService ? (
                        <Save size={17} />
                      ) : (
                        <Plus size={17} />
                      )}

                      {editingService
                        ? "Update Service"
                        : "Create Service"}
                    </>
                  )}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </section>
  );
};

export default Services;