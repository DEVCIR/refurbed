import { API_BASE_URL } from "../service";

const blogAPI = {
  baseURL: API_BASE_URL,

  async getAllBlogs() {
    const response = await fetch(`${this.baseURL}/blog`);
    if (!response.ok) throw new Error("Failed to fetch blogs");
    return response.json();
  },

  async getBlog(id) {
    const response = await fetch(`${this.baseURL}/blog/${id}`);
    if (!response.ok) throw new Error("Failed to fetch blog");
    return response.json();
  },

  async createBlog(blogData) {
    const formData = new FormData();
    formData.append("heading", blogData.heading);
    formData.append("content", blogData.content);
    if (blogData.image) {
      formData.append("image", blogData.image);
    }

    const response = await fetch(`${this.baseURL}/blog`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to create blog");
    return response.json();
  },

  async updateBlog(id, blogData) {
    const formData = new FormData();
    if (blogData.heading) formData.append("heading", blogData.heading);
    if (blogData.content) formData.append("content", blogData.content);
    if (blogData.image) formData.append("image", blogData.image);

    const response = await fetch(`${this.baseURL}/blog/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to update blog");
    return response.json();
  },

  async deleteBlog(id) {
    const response = await fetch(`${this.baseURL}/blog/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete blog");
  },
};

export default blogAPI;
