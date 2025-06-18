import { useState, useEffect } from "react";
import { FaTruck } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import BorderButton from "../BorderButton/Index";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/Index";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("Most Popular");
  const [visibleCount, setVisibleCount] = useState(8);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const allProducts = useSelector((state) => state.products.allProducts);

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "Lowest Price") return a.price - b.price;
    if (sortOption === "Highest Price") return b.price - a.price;
    return b.popularity - a.popularity;
  });

  const visibleProducts = sortedProducts.slice(0, visibleCount);

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div>
          <h2 className="text-lg font-semibold">
            Refurbed products with a minimum warranty of 12 months
          </h2>
          <div className="flex items-center gap-2 mt-2 text-blue-700 font-medium">
            <FaTruck />
            <span>Delivery included</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">Sort by:</label>
          <div className="relative inline-block">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 text-custom-dark-text text-sm font-light rounded-md px-4 py-2 pr-8 appearance-none cursor-pointer"
            >
              <option>Most Popular</option>
              <option>Lowest Price</option>
              <option>Highest Price</option>
            </select>
            <BsChevronDown className="absolute right-2 top-3 pointer-events-none text-gray-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {visibleProducts.map((product) => (
          <Link to={`/p/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
      {visibleCount < sortedProducts.length && (
        <div className="mt-8 text-center">
          <BorderButton onclick={handleShowMore}>More</BorderButton>
        </div>
      )}
    </div>
  );
};

export default ProductList;
