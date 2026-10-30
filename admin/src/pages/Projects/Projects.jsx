// ==========================================================
// SHASAR SOLAR SYSTEM
// PROJECTS MANAGEMENT
// ADMIN CRUD PAGE
// ==========================================================
import "./projects.css";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Plus,
  Search,
  X,
  RefreshCw,
  Edit3,
  Trash2,
  Image as ImageIcon,
  Video,
  MapPin,
  Zap,
  CalendarDays,
  Star,
  CheckCircle2,
  XCircle,
  Upload,
  Eye,
  EyeOff,
  Save,
} from "lucide-react";

import "./projects.css";

// ==========================================================
// API
// ==========================================================

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";

const API_URL = `${API_BASE_URL}/api/projects`;

// ==========================================================
// PROJECT TYPES
// ==========================================================

const PROJECT_TYPES = [
  "Residential",
  "Commercial",
  "Industrial",
  "Agricultural",
  "Solar Carport",
  "Off-Grid",
  "Other",
];

// ==========================================================
// INITIAL FORM
// ==========================================================

const INITIAL_FORM = {
  title: "",
  description: "",
  location: "",
  capacity: "",
  type: "",
  year: "",
  isActive: true,
  isFeatured: false,
  displayOrder: 0,
};

// ==========================================================
// IMAGE VALIDATION
// ==========================================================

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

// ==========================================================
// VIDEO VALIDATION
// ==========================================================

const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

// ==========================================================
// MEDIA URL HELPER
// ==========================================================

const getMediaUrl = (mediaPath) => {
  if (!mediaPath) {
    return "";
  }

  if (
    mediaPath.startsWith("http://") ||
    mediaPath.startsWith("https://") ||
    mediaPath.startsWith("blob:")
  ) {
    return mediaPath;
  }

  if (mediaPath.startsWith("/")) {
    return `${API_BASE_URL}${mediaPath}`;
  }

  return `${API_BASE_URL}/${mediaPath}`;
};

// ==========================================================
// COMPONENT
// ==========================================================

const Projects = () => {
  // ========================================================
  // STATE
  // ========================================================

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingProject, setEditingProject] =
    useState(null);

  const [form, setForm] =
    useState(INITIAL_FORM);

  const [imageFile, setImageFile] =
    useState(null);

  const [videoFile, setVideoFile] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [videoPreview, setVideoPreview] =
    useState("");

  // ========================================================
  // FETCH PROJECTS
  // ========================================================

  const fetchProjects = useCallback(
    async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/admin`
        );

        const result =
          await response.json();

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.message ||
              "Unable to load projects."
          );
        }

        setProjects(
          Array.isArray(result.data)
            ? result.data
            : []
        );
      } catch (fetchError) {
        console.error(
          "Fetch projects error:",
          fetchError
        );

        setError(
          fetchError.message ||
            "Unable to load projects. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ========================================================
  // INITIAL LOAD
  // ========================================================

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ========================================================
  // CLEANUP OBJECT URLS
  // ========================================================

  useEffect(() => {
    return () => {
      if (
        imagePreview &&
        imagePreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(imagePreview);
      }

      if (
        videoPreview &&
        videoPreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [imagePreview, videoPreview]);

  // ========================================================
  // AUTO CLEAR SUCCESS MESSAGE
  // ========================================================

  useEffect(() => {
    if (!success) {
      return;
    }

    const timer = setTimeout(() => {
      setSuccess("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [success]);

  // ========================================================
  // FILTERED PROJECTS
  // ========================================================

  const filteredProjects = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    if (!normalizedSearch) {
      return projects;
    }

    return projects.filter((project) => {
      const searchableText = [
        project.title,
        project.description,
        project.location,
        project.capacity,
        project.type,
        project.year,
      ]
        .filter(
          (value) =>
            value !== undefined &&
            value !== null
        )
        .join(" ")
        .toLowerCase();

      return searchableText.includes(
        normalizedSearch
      );
    });
  }, [projects, search]);

  // ========================================================
  // STATS
  // ========================================================

  const totalProjects = projects.length;

  const activeProjects = projects.filter(
    (project) =>
      project.isActive !== false
  ).length;

  const inactiveProjects =
    projects.filter(
      (project) =>
        project.isActive === false
    ).length;

  const featuredProjects =
    projects.filter(
      (project) =>
        project.isFeatured === true
    ).length;

  // ========================================================
  // RESET FORM
  // ========================================================

  const resetForm = () => {
    setForm(INITIAL_FORM);

    setEditingProject(null);

    setImageFile(null);
    setVideoFile(null);

    setImagePreview("");
    setVideoPreview("");
  };

  // ========================================================
  // OPEN ADD MODAL
  // ========================================================

  const handleAdd = () => {
    setError("");
    setSuccess("");

    resetForm();

    setShowModal(true);
  };

  // ========================================================
  // OPEN EDIT MODAL
  // ========================================================

  const handleEdit = (project) => {
    setError("");
    setSuccess("");

    setEditingProject(project);

    setForm({
      title: project.title || "",
      description:
        project.description || "",
      location:
        project.location || "",
      capacity:
        project.capacity || "",
      type: project.type || "",
      year:
        project.year !== undefined &&
        project.year !== null
          ? String(project.year)
          : "",
      isActive:
        project.isActive !== false,
      isFeatured:
        project.isFeatured === true,
      displayOrder:
        project.displayOrder !== undefined &&
        project.displayOrder !== null
          ? project.displayOrder
          : 0,
    });

    setImageFile(null);
    setVideoFile(null);

    setImagePreview(
      project.image
        ? getMediaUrl(project.image)
        : ""
    );

    setVideoPreview(
      project.video
        ? getMediaUrl(project.video)
        : ""
    );

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

    resetForm();

    setError("");
  };

  // ========================================================
  // FORM INPUT
  // ========================================================

  const handleInputChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((previousForm) => ({
      ...previousForm,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ========================================================
  // IMAGE SELECT
  // ========================================================

  const handleImageChange = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");

    if (
      !ALLOWED_IMAGE_TYPES.includes(
        file.type
      )
    ) {
      event.target.value = "";

      setImageFile(null);
      setImagePreview("");

      setError(
        "Only JPG, PNG and WEBP image files are allowed."
      );

      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      event.target.value = "";

      setImageFile(null);
      setImagePreview("");

      setError(
        "Project image must be 5MB or smaller."
      );

      return;
    }

    if (
      imagePreview &&
      imagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(imagePreview);
    }

    const previewUrl =
      URL.createObjectURL(file);

    setImageFile(file);

    setImagePreview(previewUrl);
  };

  // ========================================================
  // VIDEO SELECT
  // ========================================================

  const handleVideoChange = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");

    if (
      !ALLOWED_VIDEO_TYPES.includes(
        file.type
      )
    ) {
      event.target.value = "";

      setVideoFile(null);
      setVideoPreview("");

      setError(
        "Only MP4, WEBM and MOV video files are allowed."
      );

      return;
    }

    if (file.size > MAX_VIDEO_SIZE) {
      event.target.value = "";

      setVideoFile(null);
      setVideoPreview("");

      setError(
        "Project video must be 100MB or smaller."
      );

      return;
    }

    if (
      videoPreview &&
      videoPreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(videoPreview);
    }

    const previewUrl =
      URL.createObjectURL(file);

    setVideoFile(file);

    setVideoPreview(previewUrl);
  };

  // ========================================================
  // REMOVE IMAGE
  // ========================================================

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");

    const input =
      document.getElementById(
        "project-image"
      );

    if (input) {
      input.value = "";
    }
  };

  // ========================================================
  // REMOVE VIDEO
  // ========================================================

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview("");

    const input =
      document.getElementById(
        "project-video"
      );

    if (input) {
      input.value = "";
    }
  };

  // ========================================================
  // SUBMIT
  // ========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (saving) {
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      // ----------------------------------------------------
      // BASIC VALIDATION
      // ----------------------------------------------------

      if (
        !form.title.trim() ||
        !form.description.trim() ||
        !form.location.trim() ||
        !form.capacity.trim() ||
        !form.type ||
        !form.year
      ) {
        throw new Error(
          "Please complete all required project fields."
        );
      }

      // ----------------------------------------------------
      // IMAGE REQUIRED ONLY FOR NEW PROJECT
      // ----------------------------------------------------

     // ----------------------------------------------------
// MEDIA VALIDATION
// AT LEAST ONE MEDIA TYPE IS REQUIRED
// ----------------------------------------------------

if (
  !editingProject &&
  !imageFile &&
  !videoFile
) {
  throw new Error(
    "Please select at least a project image or video."
  );
}

      // ----------------------------------------------------
      // YEAR
      // ----------------------------------------------------

      const numericYear =
        Number(form.year);

      if (
        Number.isNaN(numericYear) ||
        numericYear < 2000 ||
        numericYear > 2100
      ) {
        throw new Error(
          "Project year must be between 2000 and 2100."
        );
      }

      // ----------------------------------------------------
      // DISPLAY ORDER
      // ----------------------------------------------------

      const numericOrder =
        form.displayOrder === ""
          ? 0
          : Number(form.displayOrder);

      if (
        Number.isNaN(numericOrder) ||
        numericOrder < 0
      ) {
        throw new Error(
          "Display order must be 0 or greater."
        );
      }

      // ----------------------------------------------------
      // FORMDATA
      // ----------------------------------------------------

      const formData =
        new FormData();

      formData.append(
        "title",
        form.title.trim()
      );

      formData.append(
        "description",
        form.description.trim()
      );

      formData.append(
        "location",
        form.location.trim()
      );

      formData.append(
        "capacity",
        form.capacity.trim()
      );

      formData.append(
        "type",
        form.type
      );

      formData.append(
        "year",
        String(numericYear)
      );

      formData.append(
        "isActive",
        String(form.isActive)
      );

      formData.append(
        "isFeatured",
        String(form.isFeatured)
      );

      formData.append(
        "displayOrder",
        String(numericOrder)
      );

      // ----------------------------------------------------
      // IMAGE
      // ----------------------------------------------------

      if (imageFile) {
        formData.append(
          "image",
          imageFile
        );
      }

      // ----------------------------------------------------
      // VIDEO
      // ----------------------------------------------------

      if (videoFile) {
        formData.append(
          "video",
          videoFile
        );
      }

      // ----------------------------------------------------
      // CREATE / UPDATE
      // ----------------------------------------------------

      const url = editingProject
        ? `${API_URL}/${editingProject._id}`
        : API_URL;

      const method = editingProject
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
              editingProject
                ? "update"
                : "create"
            } project.`
        );
      }

      // ----------------------------------------------------
      // UPDATE LOCAL STATE
      // ----------------------------------------------------

      if (editingProject) {
        setProjects(
          (previousProjects) =>
            previousProjects.map(
              (project) =>
                project._id ===
                editingProject._id
                  ? result.data
                  : project
            )
        );

        setSuccess(
          "Project updated successfully."
        );
      } else {
        setProjects(
          (previousProjects) => [
            result.data,
            ...previousProjects,
          ]
        );

        setSuccess(
          "Project created successfully."
        );
      }

      // ----------------------------------------------------
      // CLOSE
      // ----------------------------------------------------

      setShowModal(false);

      resetForm();
    } catch (saveError) {
      console.error(
        "Save project error:",
        saveError
      );

      setError(
        saveError.message ||
          "Unable to save project. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // ========================================================
  // DELETE PROJECT
  // ========================================================

  const handleDelete = async (
    project
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${project.title}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/${project._id}`,
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
            "Unable to delete project."
        );
      }

      setProjects(
        (previousProjects) =>
          previousProjects.filter(
            (item) =>
              item._id !== project._id
          )
      );

      setSuccess(
        "Project deleted successfully."
      );
    } catch (deleteError) {
      console.error(
        "Delete project error:",
        deleteError
      );

      setError(
        deleteError.message ||
          "Unable to delete project. Please try again."
      );
    }
  };

  // ========================================================
  // TOGGLE ACTIVE
  // ========================================================

  const handleToggleActive = async (
    project
  ) => {
    try {
      setError("");
      setSuccess("");

      const formData =
        new FormData();

      formData.append(
        "isActive",
        String(
          project.isActive === false
        )
      );

      const response = await fetch(
        `${API_URL}/${project._id}`,
        {
          method: "PUT",
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
            "Unable to update project status."
        );
      }

      setProjects(
        (previousProjects) =>
          previousProjects.map(
            (item) =>
              item._id === project._id
                ? result.data
                : item
          )
      );

      setSuccess(
        "Project status updated successfully."
      );
    } catch (statusError) {
      console.error(
        "Toggle project status error:",
        statusError
      );

      setError(
        statusError.message ||
          "Unable to update project status."
      );
    }
  };

  // ========================================================
  // TOGGLE FEATURED
  // ========================================================

  const handleToggleFeatured = async (
    project
  ) => {
    try {
      setError("");
      setSuccess("");

      const formData =
        new FormData();

      formData.append(
        "isFeatured",
        String(
          project.isFeatured !== true
        )
      );

      const response = await fetch(
        `${API_URL}/${project._id}`,
        {
          method: "PUT",
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
            "Unable to update featured status."
        );
      }

      setProjects(
        (previousProjects) =>
          previousProjects.map(
            (item) =>
              item._id === project._id
                ? result.data
                : item
          )
      );

      setSuccess(
        "Project featured status updated successfully."
      );
    } catch (featuredError) {
      console.error(
        "Toggle featured error:",
        featuredError
      );

      setError(
        featuredError.message ||
          "Unable to update featured status."
      );
    }
  };

  // ========================================================
  // LOADING
  // ========================================================

  if (loading) {
    return (
      <section className="projects-page">
        <div className="projects-page__loading">
          <RefreshCw
            size={24}
            className="projects-page__loading-icon"
          />

          <span>
            Loading projects...
          </span>
        </div>
      </section>
    );
  }

  // ========================================================
  // PAGE
  // ========================================================

  return (
    <section className="projects-page">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="projects-page__header">

        <div>
          <div className="projects-page__eyebrow">
            PROJECT MANAGEMENT
          </div>

          <h1>Projects</h1>

          <p>
            Manage your solar installation
            projects, media, visibility and
            display order from one place.
          </p>
        </div>

        <button
          type="button"
          className="projects-page__add-button"
          onClick={handleAdd}
        >
          <Plus size={18} />
          <span>Add Project</span>
        </button>

      </div>

      {/* ==================================================
          SUCCESS
      ================================================== */}

      {success && (
        <div
          className="projects-page__success"
          role="status"
        >
          <CheckCircle2 size={18} />

          <span>{success}</span>

          <button
            type="button"
            onClick={() =>
              setSuccess("")
            }
            aria-label="Close success message"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* ==================================================
          ERROR
      ================================================== */}

      {error && !showModal && (
        <div
          className="projects-page__error"
          role="alert"
        >
          <XCircle size={18} />

          <span>{error}</span>

          <button
            type="button"
            onClick={fetchProjects}
          >
            Retry
          </button>
        </div>
      )}

      {/* ==================================================
          STATS
      ================================================== */}

      <div className="projects-page__stats">

        <div className="projects-page__stat">
          <div className="projects-page__stat-icon">
            <Zap size={18} />
          </div>

          <div>
            <span>Total Projects</span>
            <strong>
              {totalProjects}
            </strong>
          </div>
        </div>

        <div className="projects-page__stat">
          <div className="projects-page__stat-icon">
            <CheckCircle2 size={18} />
          </div>

          <div>
            <span>Active</span>
            <strong>
              {activeProjects}
            </strong>
          </div>
        </div>

        <div className="projects-page__stat">
          <div className="projects-page__stat-icon">
            <EyeOff size={18} />
          </div>

          <div>
            <span>Inactive</span>
            <strong>
              {inactiveProjects}
            </strong>
          </div>
        </div>

        <div className="projects-page__stat">
          <div className="projects-page__stat-icon">
            <Star size={18} />
          </div>

          <div>
            <span>Featured</span>
            <strong>
              {featuredProjects}
            </strong>
          </div>
        </div>

      </div>

      {/* ==================================================
          TOOLBAR
      ================================================== */}

      <div className="projects-page__toolbar">

        <div className="projects-page__search">

          <Search size={18} />

          <input
            type="search"
            placeholder="Search projects..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            aria-label="Search projects"
          />

          {search && (
            <button
              type="button"
              className="projects-page__search-clear"
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
          className="projects-page__refresh"
          onClick={fetchProjects}
          disabled={loading}
        >
          <RefreshCw size={17} />
          <span>Refresh</span>
        </button>

      </div>

      {/* ==================================================
          PROJECT TABLE
      ================================================== */}

      <div className="projects-page__card">

        <div className="projects-page__card-header">

          <div>
            <h2>All Projects</h2>

            <span>
              {filteredProjects.length} project
              {filteredProjects.length !== 1
                ? "s"
                : ""}
            </span>
          </div>

        </div>

        {filteredProjects.length === 0 ? (
          <div className="projects-page__empty">

            <div className="projects-page__empty-icon">
              <ImageIcon size={28} />
            </div>

            <h3>
              {search
                ? "No projects found"
                : "No projects yet"}
            </h3>

            <p>
              {search
                ? "Try changing your search."
                : "Create your first solar project to get started."}
            </p>

            {!search && (
              <button
                type="button"
                onClick={handleAdd}
                className="projects-page__empty-button"
              >
                <Plus size={17} />
                Add Project
              </button>
            )}

          </div>
        ) : (
          <div className="projects-page__table-wrapper">

            <table className="projects-page__table">

              <thead>
                <tr>
                  <th>Project</th>
                  <th>Location</th>
                  <th>Capacity</th>
                  <th>Type</th>
                  <th>Year</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredProjects.map(
                  (project) => (
                    <tr
                      key={project._id}
                    >

                      {/* PROJECT */}

                      <td>
                        <div className="projects-page__project-cell">

                          <div className="projects-page__project-media">

                            {project.image ? (
                              <img
                                src={getMediaUrl(
                                  project.image
                                )}
                                alt={
                                  project.title
                                }
                              />
                            ) : (
                              <ImageIcon
                                size={20}
                              />
                            )}

                          </div>

                          <div className="projects-page__project-info">

                            <strong>
                              {project.title}
                            </strong>

                            <span>
                              {project.description
                                ? project.description.slice(
                                    0,
                                    80
                                  )
                                : "No description"}
                            </span>

                          </div>

                        </div>
                      </td>

                      {/* LOCATION */}

                      <td>
                        <div className="projects-page__table-meta">
                          <MapPin size={15} />
                          <span>
                            {project.location ||
                              "—"}
                          </span>
                        </div>
                      </td>

                      {/* CAPACITY */}

                      <td>
                        <div className="projects-page__table-meta">
                          <Zap size={15} />
                          <span>
                            {project.capacity ||
                              "—"}
                          </span>
                        </div>
                      </td>

                      {/* TYPE */}

                      <td>
                        <span className="projects-page__type-badge">
                          {project.type ||
                            "Other"}
                        </span>
                      </td>

                      {/* YEAR */}

                      <td>
                        <div className="projects-page__table-meta">
                          <CalendarDays
                            size={15}
                          />

                          <span>
                            {project.year ||
                              "—"}
                          </span>
                        </div>
                      </td>

                      {/* STATUS */}

                      <td>
                        <button
                          type="button"
                          className={`projects-page__status ${
                            project.isActive !==
                            false
                              ? "projects-page__status--active"
                              : "projects-page__status--inactive"
                          }`}
                          onClick={() =>
                            handleToggleActive(
                              project
                            )
                          }
                          title="Toggle active status"
                        >
                          {project.isActive !==
                          false ? (
                            <>
                              <CheckCircle2
                                size={14}
                              />
                              Active
                            </>
                          ) : (
                            <>
                              <EyeOff
                                size={14}
                              />
                              Inactive
                            </>
                          )}
                        </button>
                      </td>

                      {/* FEATURED */}

                      <td>
                        <button
                          type="button"
                          className={`projects-page__featured ${
                            project.isFeatured
                              ? "projects-page__featured--active"
                              : ""
                          }`}
                          onClick={() =>
                            handleToggleFeatured(
                              project
                            )
                          }
                          title="Toggle featured status"
                        >
                          <Star
                            size={15}
                            fill={
                              project.isFeatured
                                ? "currentColor"
                                : "none"
                            }
                          />

                          {project.isFeatured
                            ? "Featured"
                            : "No"}
                        </button>
                      </td>

                      {/* ORDER */}

                      <td>
                        <span className="projects-page__order">
                          {project.displayOrder ??
                            0}
                        </span>
                      </td>

                      {/* ACTIONS */}

                      <td>
                        <div className="projects-page__actions">

                          <button
                            type="button"
                            className="projects-page__action projects-page__action--edit"
                            onClick={() =>
                              handleEdit(
                                project
                              )
                            }
                            title="Edit project"
                          >
                            <Edit3
                              size={16}
                            />
                          </button>

                          <button
                            type="button"
                            className="projects-page__action projects-page__action--delete"
                            onClick={() =>
                              handleDelete(
                                project
                              )
                            }
                            title="Delete project"
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

      {/* ==================================================
          MODAL
      ================================================== */}

      {showModal && (
        <div
          className="projects-modal-overlay"
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
            className="projects-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >

            {/* ==================================================
                MODAL HEADER
            ================================================== */}

            <div className="projects-modal__header">

              <div>

                <span className="projects-modal__eyebrow">
                  {editingProject
                    ? "PROJECT MANAGEMENT"
                    : "NEW PROJECT"}
                </span>

                <h2 id="project-modal-title">
                  {editingProject
                    ? "Edit Project"
                    : "Add Project"}
                </h2>

                <p>
                  {editingProject
                    ? "Update your solar project information and media."
                    : "Create a solar installation project for your website."}
                </p>

              </div>

              <button
                type="button"
                className="projects-modal__close"
                onClick={closeModal}
                disabled={saving}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

            </div>

            {/* ==================================================
                FORM
            ================================================== */}

            <form onSubmit={handleSubmit}>

              <div className="projects-modal__body">

                {/* ERROR */}

                {error && (
                  <div
                    className="projects-page__error projects-modal__error"
                    role="alert"
                  >
                    <XCircle size={18} />

                    <span>
                      {error}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setError("")
                      }
                      aria-label="Close error"
                    >
                      <X size={15} />
                    </button>
                  </div>
                )}

                {/* ==================================================
                    01 — BASIC INFORMATION
                ================================================== */}

                <section className="projects-modal__section projects-modal__section--full">

                  <div className="projects-modal__section-heading">

                    <div>

                      <span>01</span>

                      <div>
                        <h3>
                          Basic Information
                        </h3>

                        <p>
                          Add the core information
                          for your solar project.
                        </p>
                      </div>

                    </div>

                  </div>

                  <div className="projects-modal__section-grid">

                    {/* TITLE */}

                    <div className="projects-modal__field projects-modal__field--full">

                      <label htmlFor="project-title">
                        Project Title
                        <span>*</span>
                      </label>

                      <input
                        id="project-title"
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={
                          handleInputChange
                        }
                        placeholder="e.g. Dubai Villa Solar Installation"
                        maxLength={150}
                        required
                      />

                    </div>

                    {/* DESCRIPTION */}

                    <div className="projects-modal__field projects-modal__field--full">

                      <label htmlFor="project-description">
                        Project Description
                        <span>*</span>
                      </label>

                      <textarea
                        id="project-description"
                        name="description"
                        value={
                          form.description
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="Describe the solar installation, solution delivered, project scope and key outcomes..."
                        rows={6}
                        maxLength={1000}
                        required
                      />

                      <small>
                        {form.description.length}
                        /1000 characters
                      </small>

                    </div>

                  </div>

                </section>

                {/* ==================================================
                    02 — PROJECT DETAILS
                ================================================== */}

                <section className="projects-modal__section projects-modal__section--full">

                  <div className="projects-modal__section-heading">

                    <div>

                      <span>02</span>

                      <div>
                        <h3>
                          Project Details
                        </h3>

                        <p>
                          Define location,
                          capacity, category
                          and completion year.
                        </p>
                      </div>

                    </div>

                  </div>

                  <div className="projects-modal__section-grid">

                    {/* LOCATION */}

                    <div className="projects-modal__field">

                      <label htmlFor="project-location">
                        Location
                        <span>*</span>
                      </label>

                      <input
                        id="project-location"
                        type="text"
                        name="location"
                        value={
                          form.location
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="e.g. Dubai, UAE"
                        maxLength={150}
                        required
                      />

                    </div>

                    {/* CAPACITY */}

                    <div className="projects-modal__field">

                      <label htmlFor="project-capacity">
                        System Capacity
                        <span>*</span>
                      </label>

                      <input
                        id="project-capacity"
                        type="text"
                        name="capacity"
                        value={
                          form.capacity
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="e.g. 150 kW"
                        maxLength={100}
                        required
                      />

                    </div>

                    {/* TYPE */}

                    <div className="projects-modal__field">

                      <label htmlFor="project-type">
                        Project Type
                        <span>*</span>
                      </label>

                      <select
                        id="project-type"
                        name="type"
                        value={form.type}
                        onChange={
                          handleInputChange
                        }
                        required
                      >
                        <option value="">
                          Select project type
                        </option>

                        {PROJECT_TYPES.map(
                          (type) => (
                            <option
                              key={type}
                              value={type}
                            >
                              {type}
                            </option>
                          )
                        )}
                      </select>

                    </div>

                    {/* YEAR */}

                    <div className="projects-modal__field">

                      <label htmlFor="project-year">
                        Project Year
                        <span>*</span>
                      </label>

                      <input
                        id="project-year"
                        type="number"
                        name="year"
                        value={form.year}
                        onChange={
                          handleInputChange
                        }
                        placeholder="2025"
                        min="2000"
                        max="2100"
                        required
                      />

                    </div>

                  </div>

                </section>

                {/* ==================================================
                    03 — PROJECT MEDIA
                ================================================== */}

                <section className="projects-modal__section projects-modal__section--full">

                  <div className="projects-modal__section-heading">

                    <div>

                      <span>03</span>

                      <div>
                        <h3>
                          Project Media
                        </h3>

                        <p>
                          Upload at least an image or a video.
                          You can upload both for a richer project showcase.
                        </p>
                      </div>

                    </div>

                  </div>

                  <div className="projects-media-grid">

                    {/* IMAGE */}

                    <div className="projects-media-field">

                      <div className="projects-media-field__header">

                        <div>
                          <label>
                               Project Image
                            </label>

                         <small>
                           Optional · JPG, PNG or WEBP · Max 5MB
                         </small>
                        </div>

                        <ImageIcon
                          size={20}
                        />

                      </div>

                      <label
                        htmlFor="project-image"
                        className="projects-upload"
                      >

                        {imagePreview ? (
                          <div className="projects-upload__preview">

                            <img
                              src={
                                imagePreview
                              }
                              alt="Project preview"
                            />

                            <div className="projects-upload__overlay">
                              <Upload
                                size={20}
                              />

                              <span>
                                Replace image
                              </span>
                            </div>

                          </div>
                        ) : (
                          <div className="projects-upload__empty">

                            <div className="projects-upload__icon">
                              <Upload
                                size={22}
                              />
                            </div>

                            <strong>
                              Upload project image
                            </strong>

                            <span>
                              Click to browse
                              from your PC
                            </span>

                          </div>
                        )}

                      </label>

                      <input
                        id="project-image"
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                        onChange={
                          handleImageChange
                        }
                        hidden
                      />

                      {imagePreview && (
                        <button
                          type="button"
                          className="projects-media-remove"
                          onClick={
                            removeImage
                          }
                          disabled={saving}
                        >
                          <Trash2
                            size={14}
                          />
                          Remove image
                        </button>
                      )}

                    </div>

                    {/* VIDEO */}

                    <div className="projects-media-field">

                      <div className="projects-media-field__header">

                        <div>
                          <label>
                              Project Video
                             </label>

                        <small>
                           Optional · MP4, WEBM or MOV · Max 100MB
                           </small>
                        </div>

                        <Video size={20} />

                      </div>

                      <label
                        htmlFor="project-video"
                        className="projects-upload"
                      >

                        {videoPreview ? (
                          <div className="projects-upload__preview projects-upload__preview--video">

                            <video
                              src={
                                videoPreview
                              }
                              controls
                              preload="metadata"
                            />

                            <div className="projects-upload__video-badge">
                              <Video
                                size={16}
                              />
                              Video
                            </div>

                          </div>
                        ) : (
                          <div className="projects-upload__empty">

                            <div className="projects-upload__icon">
                              <Video
                                size={22}
                              />
                            </div>

                            <strong>
                              Upload project video
                            </strong>

                            <span>
                              Click to browse
                              from your PC
                            </span>

                          </div>
                        )}

                      </label>

                      <input
                        id="project-video"
                        type="file"
                        accept=".mp4,.webm,.mov,video/mp4,video/webm,video/quicktime"
                        onChange={
                          handleVideoChange
                        }
                        hidden
                      />

                      {videoPreview && (
                        <button
                          type="button"
                          className="projects-media-remove"
                          onClick={
                            removeVideo
                          }
                          disabled={saving}
                        >
                          <Trash2
                            size={14}
                          />
                          Remove video
                        </button>
                      )}

                    </div>

                  </div>

                </section>

                {/* ==================================================
                    04 — VISIBILITY
                ================================================== */}

                <section className="projects-modal__section projects-modal__section--full">

                  <div className="projects-modal__section-heading">

                    <div>

                      <span>04</span>

                      <div>
                        <h3>
                          Visibility & Ordering
                        </h3>

                        <p>
                          Control public visibility,
                          featured status and project
                          position.
                        </p>
                      </div>

                    </div>

                  </div>

                  <div className="projects-modal__visibility-grid">

                    {/* ACTIVE */}

                    <label
                      className={`projects-toggle-card ${
                        form.isActive
                          ? "projects-toggle-card--active"
                          : ""
                      }`}
                    >

                      <input
                        type="checkbox"
                        name="isActive"
                        checked={
                          form.isActive
                        }
                        onChange={
                          handleInputChange
                        }
                      />

                      <div className="projects-toggle-card__icon">
                        {form.isActive ? (
                          <Eye
                            size={20}
                          />
                        ) : (
                          <EyeOff
                            size={20}
                          />
                        )}
                      </div>

                      <div>
                        <strong>
                          Active
                        </strong>

                        <span>
                          {form.isActive
                            ? "Visible on public website"
                            : "Hidden from public website"}
                        </span>
                      </div>

                      <div className="projects-toggle-card__switch">
                        <span />
                      </div>

                    </label>

                    {/* FEATURED */}

                    <label
                      className={`projects-toggle-card ${
                        form.isFeatured
                          ? "projects-toggle-card--active"
                          : ""
                      }`}
                    >

                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={
                          form.isFeatured
                        }
                        onChange={
                          handleInputChange
                        }
                      />

                      <div className="projects-toggle-card__icon">
                        <Star
                          size={20}
                          fill={
                            form.isFeatured
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </div>

                      <div>
                        <strong>
                          Featured
                        </strong>

                        <span>
                          {form.isFeatured
                            ? "Marked as featured"
                            : "Standard project"}
                        </span>
                      </div>

                      <div className="projects-toggle-card__switch">
                        <span />
                      </div>

                    </label>

                    {/* DISPLAY ORDER */}

                    <div className="projects-modal__field">

                      <label htmlFor="project-display-order">
                        Display Order
                      </label>

                      <input
                        id="project-display-order"
                        type="number"
                        name="displayOrder"
                        value={
                          form.displayOrder
                        }
                        onChange={
                          handleInputChange
                        }
                        min="0"
                        step="1"
                        placeholder="0"
                      />

                      <small>
                        Lower numbers appear
                        first on the public
                        Projects section.
                      </small>

                    </div>

                  </div>

                </section>

              </div>

              {/* ==================================================
                  MODAL FOOTER
              ================================================== */}

              <div className="projects-modal__footer">

                <button
                  type="button"
                  className="projects-modal__cancel"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="projects-modal__submit"
                  disabled={saving}
                >

                  {saving ? (
                    <>
                      <RefreshCw
                        size={17}
                        className="projects-modal__submit-spinner"
                      />

                      <span>
                        {editingProject
                          ? "Updating..."
                          : "Creating..."}
                      </span>
                    </>
                  ) : (
                    <>
                      {editingProject ? (
                        <Save size={17} />
                      ) : (
                        <Plus size={18} />
                      )}

                      <span>
                        {editingProject
                          ? "Update Project"
                          : "Create Project"}
                      </span>
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

export default Projects;