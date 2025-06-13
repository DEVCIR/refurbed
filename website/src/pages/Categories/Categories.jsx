import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import RecommendedForYou from "../../components/RecommendedForYou/RecommendedForYou";
import Review from "../../components/Review/Review";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import AppleIcon from "../../assets/logos/apple-logo.png";
import SamsungIcon from "../../assets/logos/samsunglogo.png";
import XioamiIcon from "../../assets/logos/xioamilogo.png";
import HuaweiIcon from "../../assets/logos/huaweilogo.png";
import PayPalIcon from "../../assets/payment-logos/paypallogo1.png";

const Categories = () => {
  const { category } = useParams();
  const allProducts = useSelector((state) => state.products.allProducts);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [sortOption, setSortOption] = useState("Most Popular");
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  useEffect(() => {
    console.log("All Products:", allProducts);
    console.log("Category: ", category);

    if (allProducts && Array.isArray(allProducts)) {
      // Filter products based on category if a category is provided
      if (category) {
        // Case-insensitive comparison to be more user-friendly
        const filteredProducts = allProducts.filter((product) => {
          // Check if product.category is an object with a name property
          if (product.category && product.category.name) {
            return (
              product.category.name.toLowerCase() === category.toLowerCase()
            );
          }
          // Also check if category is a direct string value (to handle both formats)
          else if (product.category && typeof product.category === "string") {
            return product.category.toLowerCase() === category.toLowerCase();
          }
          return false;
        });
        console.log("Filtered Products:", filteredProducts);
        setCategoryProducts(filteredProducts);
      } else {
        // If no category is provided, show all products
        setCategoryProducts(allProducts);
      }
      setIsLoading(false);
    }
  }, [allProducts, category]);

  // Apply both brand and price filters
  const filteredProducts = categoryProducts.filter((product) => {
    const matchesPrice = selectedPrice
      ? product.currentPrice >= selectedPrice.min &&
        product.currentPrice < selectedPrice.max
      : true;

    const matchesBrand = selectedBrand
      ? product.brand &&
        product.brand.toLowerCase() === selectedBrand.toLowerCase()
      : true;

    return matchesPrice && matchesBrand;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "Lowest Price") return a.currentPrice - b.currentPrice;
    if (sortOption === "Highest Price") return b.currentPrice - a.currentPrice;
    return b.popularity - a.popularity;
  });

  useEffect(() => {
    const handleClickOutside = () => {
      setShowPriceDropdown(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const noCategoryProducts = category && categoryProducts.length === 0;

  const brandOptions = [
    {
      name: "Apple",
      icon: <img src={AppleIcon} alt="Apple" width="28" height="28" />,
    },
    {
      name: "Samsung",
      icon: <img src={SamsungIcon} alt="Samsung" width="28" height="28" />,
    },
    { name: "Google", icon: "G" },
    {
      name: "Xiaomi",
      icon: <img src={XioamiIcon} alt="Xioami" width="24" height="24" />,
    },
    {
      name: "Huawei",
      icon: <img src={HuaweiIcon} alt="Huawei" width="24" height="24" />,
    },
  ];

  const priceOptions = [
    { label: "€0 - 100" },
    { label: "€100 - 200" },
    { label: "€200 - 300" },
    { label: "€300 - 500" },
    { label: "€500+" },
  ];

  return (
    <>
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto px-4 py-8">
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">{">"}</span>
          <span>Products</span>
        </div>

        <h1 className="text-4xl font-semibold mb-2 text-custom-dark-text">
          {category || "Phones & Smartphones:"}
        </h1>
        <p className="text-gray-700 mb-6 text-lg">
          High-quality refurbished {category || "Phones & Smartphones"} at a
          great price. Your more sustainable choice, with a minimum 12-month
          warranty.
        </p>

        {!noCategoryProducts && (
          <>
            <div className="mb-6">
              <div className="flex flex-col">
                <div className="flex flex-wrap items-start gap-8">
                  <div>
                    <h1 className="font-semibold text-black mb-3 text-xl">
                      Filter by: Brand
                    </h1>
                    <div className="flex flex-wrap gap-2">
                      {brandOptions.map((brand) => (
                        <button
                          key={brand.name}
                          className={`px-4 py-2 flex items-center gap-2 border rounded-md hover:border-black ${
                            selectedBrand === brand.name
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300"
                          }`}
                          onClick={() =>
                            setSelectedBrand(
                              selectedBrand === brand.name ? null : brand.name,
                            )
                          }
                        >
                          <span>{brand.icon}</span>
                          <span>{brand.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h1 className="font-semibold text-black mb-3 text-xl">
                      Filter by: Price
                    </h1>
                    <div className="flex flex-wrap gap-2">
                      {priceOptions.map((price) => (
                        <button
                          key={price.label}
                          className={`px-4 py-2 border rounded-md hover:border-black ${
                            selectedPrice?.label === price.label
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300"
                          }`}
                          onClick={() =>
                            setSelectedPrice(
                              selectedPrice?.label === price.label
                                ? null
                                : price,
                            )
                          }
                        >
                          {price.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    className="text-blue-600 flex items-center"
                    onClick={() => {}}
                  >
                    <span>Show all filters</span>
                    <span className="ml-1 text-xl">+</span>
                  </button>
                </div>
              </div>
            </div>
            <hr className="border-gray-200 my-6" />

            <div className="flex justify-end mb-6">
              <div className="relative">
                <div className="flex items-center">
                  <label
                    htmlFor="sort"
                    className="block text-sm font-medium text-gray-700 mr-2"
                  >
                    Sort by:
                  </label>
                  <div className="relative">
                    <select
                      id="sort"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="border border-gray-300 text-custom-dark-text rounded-md px-4 py-2 pr-8 appearance-none cursor-pointer"
                    >
                      <option>Most Popular</option>
                      <option>Lowest Price</option>
                      <option>Highest Price</option>
                    </select>
                    <BsChevronDown className="absolute top-1/2 right-2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {!noCategoryProducts && (
          <div className="mb-4 text-sm text-gray-600">
            Showing {sortedProducts.length}{" "}
            {sortedProducts.length === 1 ? "product" : "products"}
            {selectedPrice ? ` in price range ${selectedPrice.label}` : ""}
            {selectedBrand ? ` by ${selectedBrand}` : ""}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {noCategoryProducts ? (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-medium text-gray-800 mb-2">
                No products available
              </h2>
              <p className="text-gray-600">
                No products are available for the category:{" "}
                <strong>{category}</strong>
              </p>
              <Link
                to="/"
                className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                View all products
              </Link>
            </div>
          ) : sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <Link
                key={product.id}
                to={`/p/${product.id}`}
                className="block group"
              >
                <ProductCard product={product} />
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              No products found matching the selected filters.
            </div>
          )}
        </div>
      </div>

      <RecommendedForYou />
      <Review />
      <NewsLetter />
    </>
  );
};

export default Categories;
