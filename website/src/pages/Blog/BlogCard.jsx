import React from "react";
import blogImg from "../../assets/product-images/tablets.webp";

const BlogCard = ({ title, summary, image }) => {
  return (
    <div className="flex flex-col border-b-1 border-gray-400 pb-10 lg:flex-row gap-6">
      <img
        src={image}
        alt="Blog visual"
        className="w-full lg:w-[400px] h-[250px] object-cover"
        onError={(e) => {
          e.target.src = blogImg;
        }}
      />
      <div className="flex flex-col justify-between">
        <h3 className="text-custom-dark-text text-lg mb-4 leading-snug">
          {title}
        </h3>
        <p className="text-gray-700 text-sm mb-4">{summary}</p>
        <a
          href="#"
          className="text-custom-accent underline underline-offset-4 text-sm mt-auto pb-2"
        >
          READ ON
        </a>
      </div>
    </div>
  );
};

export default BlogCard; 