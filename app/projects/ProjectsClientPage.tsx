"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react"; // Import useRef
import { useRouter } from "next/navigation";
import { projectsApi } from "@/lib/api";

function timeAgo(date: string) {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
}

export default function ProjectsClientPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Recent");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState<number | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [credits, setCredits] = useState(25);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [imageUrl, setImageUrl] = useState<string>(""); // Changed from imagePreview
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState("");
  const hasFetched = useRef(false); // Add a ref to track fetch status

  useEffect(() => {
    const fetchProjects = async () => {
      if (hasFetched.current) return; // Prevent re-fetching
      hasFetched.current = true; // Mark as fetched

      try {
        setLoadingProjects(true);
        const response = await projectsApi.list();
        if (response.success) {
          setProjects(response.data);
        } else {
          setProjectsError(response.message || "Failed to fetch projects");
        }
      } catch (error: any) {
        setProjectsError(error.message || "Network error. Please try again.");
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();

    // Load user data from localStorage
    const storedUserData = localStorage.getItem("user_data");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    // Close dropdowns when clicking outside
    const handleClickOutside = () => {
      setUserDropdownOpen(false);
      setShowContextMenu(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    router.push("/login");
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setCreateError("");

    if (!projectName.trim()) {
      setCreateError("Project name is required");
      setIsCreating(false);
      return;
    }

    if (!imageUrl.trim()) {
      // Check imageUrl
      setCreateError("Project image URL is required");
      setIsCreating(false);
      return;
    }

    try {
      const projectData = {
        name: projectName,
        image: imageUrl, // Send the image URL
      };

      const data = await projectsApi.create(projectData);

      if (data.success) {
        // Assuming the API returns { success: true, ... }
        console.log("Project created:", data);
        // Close modal and reset form
        setShowCreateModal(false);
        setProjectName("");
        setImageUrl(""); // Reset imageUrl
        // Add the new project to the list
        setProjects([data.data, ...projects]);
      } else {
        setCreateError(data.message || "Failed to create project");
      }
    } catch (error: any) {
      console.error("Create project error:", error);
      setCreateError(error.message || "Network error. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setProjectName("");
    setImageUrl(""); // Reset imageUrl
    setCreateError("");
  };

  if (loadingProjects) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ background: "#1A1D21" }}
      >
        <div className="w-12 h-12 rounded-full border-4 border-[#181C1F] border-t-[#FAD406] animate-spin" />
      </div>
    );
  }

  if (projectsError) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ background: "#1A1D21" }}
      >
        <div className="text-center text-red-400">
          <p>Error: {projectsError}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#1A1D21",
      }}
    >
      <div className="flex h-screen">
        {/* Sidebar */}
        <div
          className="w-64 p-6 border-r relative"
          style={{
            background: "#1A1D21",
            borderColor: "#2C2F33",
          }}
        >
          {/* Create Project Button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-[#FAD406] text-black rounded-lg font-semibold hover:bg-[#e8c406] transition-all mb-6"
            style={{
              fontFamily: "Inter",
              fontSize: "14px",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12h14"></path>
            </svg>
            <span>Create Project</span>
          </button>

          {/* Upload File */}
          <button className="flex items-center space-x-3 text-gray-400 hover:text-white cursor-pointer transition-all mb-4 w-full px-2 py-2 rounded-lg hover:bg-gray-800/50">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <span
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
              }}
            >
              Upload File
            </span>
          </button>

          {/* Help & Support */}
          <button className="flex items-center space-x-3 text-gray-400 hover:text-white cursor-pointer transition-all w-full px-2 py-2 rounded-lg hover:bg-gray-800/50">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <path d="M12 17h.01"></path>
            </svg>
            <span
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
              }}
            >
              Help & Support
            </span>
          </button>

          {/* Premium Card */}
          <div
            className="absolute bottom-6 left-6 right-6 rounded-2xl p-5 border"
            style={{
              background:
                "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)",
              borderColor: "rgba(139, 92, 246, 0.3)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>

              {projects.length === 0 ? (
                /* Show Pro Plan Status */
                <>
                  <p
                    className="text-white text-sm font-medium mb-1 leading-snug"
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    You have purchased
                    <br />
                    the <span className="font-bold">Pro</span> plan
                  </p>
                  <p
                    className="text-gray-400 text-xs"
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    Expire in 90 days
                  </p>
                </>
              ) : (
                /* Show Upgrade Option */
                <>
                  <p
                    className="text-white text-sm font-medium mb-3 leading-snug"
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    Ready to go upgrade for premium features
                  </p>
                  <button
                    className="w-full py-2.5 px-4 bg-[#FAD406] text-black rounded-lg font-semibold hover:bg-[#e8c406] transition-all text-sm shadow-lg"
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    View Plan
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Workspace Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1
                className="text-white text-3xl font-bold mb-1"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Workspace
              </h1>
              <p
                className="text-gray-400"
                style={{
                  fontFamily: "Inter",
                  fontSize: "15px",
                }}
              >
                {projects.length > 0
                  ? "Continue building amazing AI videos"
                  : "Nothing here yet... but the story starts with you!"}
              </p>
            </div>

            {/* Search Bar - Only show when there are projects */}
            {projects.length > 0 && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Searching your files..."
                  className="w-80 px-4 py-2 pl-10 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#FAD406]"
                  style={{
                    background: "#2C2F33",
                    borderColor: "#3A3D41",
                    color: "#9CA3AF",
                    fontFamily: "Inter",
                  }}
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
            )}
          </div>

          {/* Empty State or Projects Content */}
          {projects.length === 0 ? (
            /* Empty State */
            <div
              className="flex items-center justify-center"
              style={{ minHeight: "calc(100vh - 250px)" }}
            >
              <div className="text-center max-w-2xl">
                {/* Illustration */}
                <div className="mb-8 relative">
                  <svg
                    className="mx-auto"
                    width="300"
                    height="300"
                    viewBox="0 0 300 300"
                    fill="none"
                  >
                    {/* Person */}
                    <ellipse
                      cx="180"
                      cy="280"
                      rx="40"
                      ry="8"
                      fill="#3A3D41"
                      opacity="0.3"
                    />
                    <path
                      d="M160 240 L160 200 L150 180 L140 200 L140 240"
                      fill="#6B7280"
                    />
                    <path d="M160 200 L180 220 L200 200" fill="#9CA3AF" />
                    <path d="M140 200 L120 220 L100 200" fill="#9CA3AF" />
                    <circle cx="150" cy="170" r="20" fill="#D1D5DB" />

                    {/* Lightbulb */}
                    <ellipse
                      cx="120"
                      cy="120"
                      rx="35"
                      ry="45"
                      fill="#E5E7EB"
                      opacity="0.9"
                    />
                    <rect
                      x="110"
                      y="165"
                      width="20"
                      height="15"
                      rx="3"
                      fill="#D1D5DB"
                    />
                    <path
                      d="M115 120 L125 120 M120 110 L120 100"
                      stroke="#FAD406"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Gear 1 */}
                    <circle
                      cx="80"
                      cy="180"
                      r="25"
                      fill="none"
                      stroke="#9CA3AF"
                      strokeWidth="8"
                    />
                    <circle cx="80" cy="180" r="12" fill="#6B7280" />
                    <circle cx="80" cy="155" r="5" fill="#9CA3AF" />
                    <circle cx="80" cy="205" r="5" fill="#9CA3AF" />
                    <circle cx="55" cy="180" r="5" fill="#9CA3AF" />
                    <circle cx="105" cy="180" r="5" fill="#9CA3AF" />

                    {/* Gear 2 */}
                    <circle
                      cx="110"
                      cy="220"
                      r="20"
                      fill="none"
                      stroke="#9CA3AF"
                      strokeWidth="6"
                    />
                    <circle cx="110" cy="220" r="10" fill="#6B7280" />
                    <circle cx="110" cy="200" r="4" fill="#9CA3AF" />
                    <circle cx="110" cy="240" r="4" fill="#9CA3AF" />
                    <circle cx="90" cy="220" r="4" fill="#9CA3AF" />
                    <circle cx="130" cy="220" r="4" fill="#9CA3AF" />

                    {/* Paper Airplane */}
                    <path
                      d="M200 90 L240 110 L210 115 L200 140 L195 115 Z"
                      fill="#9CA3AF"
                    />
                    <path d="M240 110 L210 115 L220 105 Z" fill="#6B7280" />
                  </svg>
                </div>

                {/* Text Content */}
                <h2
                  className="text-white text-2xl font-semibold mb-3"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  Your AI Video Workspace is Ready!
                </h2>
                <p
                  className="text-gray-400 text-base leading-relaxed"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  No projects yet — start creating your first AI-powered video
                  today.
                  <br />
                  Bring your ideas to life with just a few clicks!
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div
                className="flex space-x-8 mb-6 border-b"
                style={{ borderColor: "#2C2F33" }}
              >
                {["Recent", "All Projects", "Trash"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-1 border-b-2 transition-all ${
                      activeTab === tab
                        ? "border-white text-white"
                        : "border-transparent text-gray-500 hover:text-gray-300"
                    }`}
                    style={{
                      fontFamily: "Inter",
                      fontSize: "15px",
                      fontWeight: activeTab === tab ? "500" : "400",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map((project) => (
                  <Link key={project.id} href={`/projects/${project.id}`}>
                    <div
                      className="relative group rounded-xl overflow-hidden border transition-all cursor-pointer hover:border-gray-600"
                      style={{ background: "#2C2F33", borderColor: "#3A3D41" }}
                    >
                      <div className="relative h-44 bg-gray-700 flex items-center justify-center">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="text-gray-300"
                            style={{ fontFamily: "Inter", fontSize: "13px" }}
                          >
                            {project.name}
                          </span>
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowContextMenu(
                                  showContextMenu === project.id
                                    ? null
                                    : project.id
                                );
                              }}
                              className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded transition-all"
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <circle cx="12" cy="12" r="1.5"></circle>
                                <circle cx="19" cy="12" r="1.5"></circle>
                                <circle cx="5" cy="12" r="1.5"></circle>
                              </svg>
                            </button>
                            {showContextMenu === project.id && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute top-full right-0 mt-2 w-44 rounded-lg shadow-xl overflow-hidden z-50"
                                style={{
                                  background: "#2C2F33",
                                  border: "1px solid #3A3D41",
                                }}
                              >
                                <div className="py-1">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteProject(project.id);
                                    }}
                                    className="flex items-center space-x-3 w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-gray-800 transition-all"
                                    style={{ fontFamily: "Inter" }}
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                    >
                                      <polyline points="3 6 5 6 21 6"></polyline>
                                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <p
                          className="text-gray-500"
                          style={{ fontFamily: "Inter", fontSize: "12px" }}
                        >
                          Edited {timeAgo(project.updated_at)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-md rounded-2xl p-6"
            style={{
              background: "#2C2F33",
              border: "1px solid #3A3D41",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Modal Title */}
            <h2
              className="text-white text-2xl font-bold mb-6"
              style={{
                fontFamily: "Inter",
              }}
            >
              Create New Project
            </h2>

            {/* Error Message */}
            {createError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg">
                <p
                  className="text-red-400 text-sm"
                  style={{ fontFamily: "Inter" }}
                >
                  {createError}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleCreateProject} className="space-y-5">
              {/* Project Name */}
              <div>
                <label
                  className="block text-white text-sm font-medium mb-2"
                  style={{ fontFamily: "Inter" }}
                >
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name"
                  className="w-full px-4 py-3 rounded-lg border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FAD406]"
                  style={{
                    background: "#1A1D21",
                    borderColor: "#3A3D41",
                    fontFamily: "Inter",
                  }}
                  required
                />
              </div>

              {/* Image URL Input */}
              <div>
                <label
                  className="block text-white text-sm font-medium mb-2"
                  style={{ fontFamily: "Inter" }}
                >
                  Project Image URL
                </label>
                <input
                  type="url" // Use type="url" for URL input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                  className="w-full px-4 py-3 rounded-lg border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FAD406]"
                  style={{
                    background: "#1A1D21",
                    borderColor: "#3A3D41",
                    fontFamily: "Inter",
                  }}
                  required
                />
              </div>

              {/* Image Preview */}
              {imageUrl && (
                <div className="w-full h-48 rounded-lg overflow-hidden border border-[#3A3D41]">
                  <img
                    src={imageUrl}
                    alt="Image Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Submit Button */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 rounded-lg font-medium transition-all"
                  style={{
                    background: "#3A3D41",
                    color: "#9CA3AF",
                    fontFamily: "Inter",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 px-4 py-3 bg-[#FAD406] text-black rounded-lg font-semibold hover:bg-[#e8c406] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  {isCreating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    "Create Project"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
