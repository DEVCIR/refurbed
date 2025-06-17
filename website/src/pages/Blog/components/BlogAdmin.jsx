import { useState, useEffect, useRef } from "react";
import blogAPI from "../../../services/blogAPI";

const BlogAdmin = ({ onBack }) => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    heading: "",
    content: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [quillLoaded, setQuillLoaded] = useState(false);
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (window.Quill) {
      setQuillLoaded(true);
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js";
    script.onload = () => {
      setQuillLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (quillLoaded && showForm && quillRef.current && !editorRef.current) {
      // Clear any existing content
      quillRef.current.innerHTML = "";

      const toolbarOptions = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["link", "image"],
        ["blockquote", "code-block"],
        ["clean"],
      ];

      try {
        editorRef.current = new window.Quill(quillRef.current, {
          theme: "snow",
          placeholder: "Write your blog content here...",
          modules: {
            toolbar: toolbarOptions,
          },
        });

        if (formData.content) {
          editorRef.current.clipboard.dangerouslyPasteHTML(formData.content);
        }
        // Set initial content if editing

        // Set up text change handler
        editorRef.current.on("text-change", () => {
          const html = editorRef.current.root.innerHTML;
          setFormData((prev) => ({ ...prev, content: html }));
        });

        // Ensure the editor is focusable and clickable
        setTimeout(() => {
          if (editorRef.current) {
            // Make sure the editor container is properly set up
            const editorContainer = editorRef.current.root;
            if (editorContainer) {
              editorContainer.setAttribute("contenteditable", "true");
              editorContainer.style.minHeight = "300px";
              editorContainer.style.cursor = "text";

              // Add click handler to ensure focus
              // eslint-disable-next-line no-unused-vars
              editorContainer.addEventListener("click", (e) => {
                if (editorRef.current) {
                  editorRef.current.focus();
                }
              });
            }
          }
        }, 200);
      } catch (error) {
        console.error("Error initializing Quill editor:", error);
      }
    }

    return () => {
      if (!showForm && editorRef.current) {
        try {
          editorRef.current.off("text-change");
          editorRef.current = null;
        } catch (error) {
          console.error("Error cleaning up editor:", error);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quillLoaded, showForm]);

  // Separate effect for handling content updates when editing
  useEffect(() => {
    if (editorRef.current && editingBlog && formData.content && showForm) {
      // Small delay to ensure editor is fully ready
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.clipboard.dangerouslyPasteHTML(formData.content);
        }
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingBlog, showForm]);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const data = await blogAPI.getAllBlogs();
      setBlogs(data);
    } catch (error) {
      console.error("Error loading blogs:", error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.heading || !formData.content) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      // Get the latest content from Quill editor
      const currentContent = editorRef.current
        ? editorRef.current.root.innerHTML
        : formData.content;

      const submissionData = {
        ...formData,
        content: currentContent,
      };

      if (editingBlog) {
        await blogAPI.updateBlog(editingBlog.id, submissionData);
      } else {
        await blogAPI.createBlog(submissionData);
      }

      handleCloseForm();
      loadBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      heading: blog.heading,
      content: blog.content,
      image: null,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await blogAPI.deleteBlog(id);
        loadBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const handleCloseForm = () => {
    // Properly cleanup editor before closing
    if (editorRef.current) {
      try {
        editorRef.current.off("text-change");
        editorRef.current = null;
      } catch (error) {
        console.error("Error cleaning up editor:", error);
      }
    }

    setShowForm(false);
    setEditingBlog(null);
    setFormData({ heading: "", content: "", image: null });
  };

  // Strip HTML tags for preview in table
  const stripHtml = (html) => {
    if (!html) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <button
              onClick={onBack}
              className="text-purple-600 hover:text-purple-800 mb-2"
            >
              ← Back to Blog
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              Blog Administration
            </h1>
          </div>
          <button
            onClick={() => {
              setEditingBlog(null);
              setFormData({ heading: "", content: "", image: null });
              setShowForm(true);
            }}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Create New Post
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.heading}
                  onChange={(e) =>
                    setFormData({ ...formData, heading: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                {quillLoaded ? (
                  <div
                    className="border border-gray-300 rounded-lg overflow-hidden bg-white"
                    style={{ minHeight: "350px" }}
                  >
                    <div
                      ref={quillRef}
                      style={{
                        minHeight: "300px",
                        backgroundColor: "white",
                        cursor: "text",
                      }}
                    />
                  </div>
                ) : (
                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <p className="text-gray-500">Loading rich text editor...</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Featured Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || !quillLoaded}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {loading
                    ? "Saving..."
                    : editingBlog
                      ? "Update Post"
                      : "Create Post"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Content Preview
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {blog.heading}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {stripHtml(blog.content || "")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(
                        blog.created_at || new Date(),
                      ).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;
