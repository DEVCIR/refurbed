import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import blogImg from "../../assets/product-images/tablets.webp"

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/blog')
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts')
        }
        const data = await response.json()
        setBlogPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  if (loading) {
    return (
      <section className="container py-12">
        <div className="text-center">Loading blog posts...</div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container py-12">
        <div className="text-center text-red-500">Error: {error}</div>
      </section>
    )
  }

  return (
    <section className="container py-12">
      <h2 className="text-2xl md:text-3xl text-center mb-4">
        The refurbed Blog
      </h2>
      <p className="text-center text-gray-600 text-lg md:text-xl sm:max-w-[80%] lg:max-w-[70%] mx-auto mb-12">
        Explore stories, background information and expert opinions on refurbed and sustainable shopping.
      </p>

      <div className="grid gap-10 md:max-w-[85%] mx-auto">
        {blogPosts.map((post) => (
          <BlogCard 
            key={post.id}
            title={post.heading}
            summary={post.content}
            // image={post.image ? `http://localhost:8000/api/storage/${post.image}` : blogImg}
            image={`http://localhost:8000/storage/${post.image}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Blog;