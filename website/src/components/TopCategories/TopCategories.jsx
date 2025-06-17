"use client";

import { useEffect } from "react";
import Iphones from "../../assets/TopCategories/phone2.webp";
import Samsung from "../../assets/TopCategories/phone3.webp";
import Macbook from "../../assets/TopCategories/macbooks.webp";
import Lenovo from "../../assets/TopCategories/lenovo.webp";
import Apple from "../../assets/TopCategories/apple.webp";
import Ipad from "../../assets/TopCategories/ipad.webp";
import Airpod from "../../assets/TopCategories/airpod.webp";
import { Link } from "react-router-dom";
import { FadeUpAll } from "../../animations/gsapAnimations";

// Define CategoryCard component within the same file
const CategoryCard = ({
  to,
  imageSrc,
  imageAlt,
  title,
  aspectRatioClass,
  className,
}) => {
  return (
    <Link
      to={to}
      className={`rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:brightness-105 ${className || ""}`}
    >
      <div className={`${aspectRatioClass} w-full h-auto`}>
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-full py-2 text-center bg-[#e5e5e3]">
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
    </Link>
  );
};

const topCategoriesData = [
  {
    to: "/c/iphones",
    imageSrc: Iphones,
    imageAlt: "iPhones collection",
    title: "iPhones",
    aspectRatioClass: "aspect-video",
    className: "w-[98%] mx-auto", // Specific styling for these two cards
  },
  {
    to: "/c/samsung",
    imageSrc: Samsung,
    imageAlt: "Samsung phones collection",
    title: "Samsung phones",
    aspectRatioClass: "aspect-video",
    className: "w-[98%] mx-auto", // Specific styling for these two cards
  },
];

const smallerCategoriesData = [
  {
    to: "/c/macbooks",
    imageSrc: Macbook,
    imageAlt: "MacBooks collection",
    title: "MacBooks",
    aspectRatioClass: "aspect-square",
  },
  {
    to: "/c/lenovo",
    imageSrc: Lenovo,
    imageAlt: "Lenovo collection",
    title: "Lenovo",
    aspectRatioClass: "aspect-square",
  },
  {
    to: "/c/watches",
    imageSrc: Apple,
    imageAlt: "Apple Watches collection",
    title: "Apple Watches",
    aspectRatioClass: "aspect-square",
  },
  {
    to: "/c/ipads",
    imageSrc: Ipad,
    imageAlt: "iPads collection",
    title: "iPads",
    aspectRatioClass: "aspect-square",
  },
  {
    to: "/c/airpods",
    imageSrc: Airpod,
    imageAlt: "AirPods collection",
    title: "AirPods",
    aspectRatioClass: "aspect-square",
  },
];

const TopCategories = () => {
  useEffect(() => {
    FadeUpAll(".fade-up");
  }, []);

  return (
    <section className="py-12 justify-center items-center flex bg-custom-bg1">
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto flex flex-col gap-4">
        <h2 className="fade-up text-2xl md:text-2xl font-semibold mb-8">
          Discover out top categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {topCategoriesData.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>

        {/* Responsive grid for smaller categories */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {smallerCategoriesData.map((category, index) => (
            <CategoryCard
              key={index}
              {...category}
              // Apply col-span-2 for the third item on smaller screens,
              // and revert to col-span-1 on large screens
              className={index === 2 ? "col-span-2 lg:col-span-1" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
