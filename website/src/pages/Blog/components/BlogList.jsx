import React, { useState, useEffect } from "react";
import { Calendar, ArrowRight, Search } from "lucide-react";
import blogAPI from "@/services/blogAPI";
import { API_BASE_URL, BASE_URL } from "../../../service";

const BlogList = ({ onSelectBlog }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = blogs.filter(
        (blog) =>
          blog.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (blog.content &&
            blog.content.toLowerCase().includes(searchTerm.toLowerCase())),
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [searchTerm, blogs]);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const data = await blogAPI.getAllBlogs();
      setBlogs(data);
      console.log("Blogs Data:");
      console.log(data);
      setFilteredBlogs(data);
    } catch (error) {
      console.error("Error loading blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const extractTextFromHTML = (html, maxLength = 200) => {
    if (!html) return "";

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    let text = tempDiv.textContent || tempDiv.innerText || "";
    text = text.replace(/\s+/g, " ").trim();

    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            The refurbed Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover stories, background information and expert knowledge about
            refurbed and sustainable shopping.
          </p>

          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts found.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                {blog.image && (
                  <div className="aspect-video bg-gray-200">
                    <img
                      src={`${BASE_URL}/storage/${blog.image}`}
                      alt={blog.heading}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {blog.heading}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {extractTextFromHTML(blog.content)}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(blog.created_at || new Date())}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectBlog(blog.id)}
                    className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
                  >
                    READ MORE
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
