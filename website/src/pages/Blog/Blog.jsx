import BlogList from "./components/BlogList";
import { useState } from "react";
import BlogPost from "./components/BlogPost";
import BlogAdmin from "./components/BlogAdmin";

const Blog = ({ CurrentView = "list" }) => {
  const [currentView, setCurrentView] = useState(CurrentView);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const handleSelectBlog = (blogId) => {
    setSelectedBlogId(blogId);
    setCurrentView("post");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedBlogId(null);
  };

  const handleShowAdmin = () => {
    setCurrentView("admin");
  };

  return (
    <div className="min-h-screen">
      {currentView === "list" && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={handleShowAdmin}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm"
          >
            Admin Panel
          </button>
        </div>
      )}

      {currentView === "list" && <BlogList onSelectBlog={handleSelectBlog} />}

      {currentView === "post" && selectedBlogId && (
        <BlogPost blogId={selectedBlogId} onBack={handleBackToList} />
      )}

      {currentView === "admin" && <BlogAdmin onBack={handleBackToList} />}
    </div>
  );
};

export default Blog;
