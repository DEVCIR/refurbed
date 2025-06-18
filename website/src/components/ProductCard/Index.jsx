import { useEffect } from "react";
import { FadeUpAll } from "@/animations/gsapAnimations";

const ProductCard = ({ product }) => {
  useEffect(() => {
    FadeUpAll(".fade-up");
  }, []);

  return (
    <div
      key={product.id}
      className="fade-up relative bg-gray-100 rounded-lg shadow-sm overflow-hidden h-80 flex flex-col transition-all duration-300 hover:shadow-md hover:scale-[1.02] group"
    >
      {product.tag && (
        <div className="absolute top-3 left-3 px-2 py-1 bg-green-600 text-white text-xs font-medium rounded z-10">
          {product.tag}
        </div>
      )}
      <div className="flex-grow flex items-center justify-center p-4 bg-white">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 bg-gray-100">
        <h3 className="text-lg font-medium text-gray-800 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[#197a61] font-semibold text-lg mt-1">
          €{product.currentPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
