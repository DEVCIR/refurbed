import {
  PiTelevisionSimpleBold,
  PiCookingPotBold,
  PiDevicesBold,
  PiPrinterBold,
  PiGameControllerBold,
} from "react-icons/pi";
import tabletImg from "../../assets/product-images/tablets.webp";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PopularCategories = () => {
  const allCategories = useSelector((state) => state.category.allCategories);

  const popularCategories = allCategories.slice(0, 4);
  const otherCategories = allCategories;

  return (
    <div className="container py-10">
      <h2 className="text-sm text-gray-600 mb-2">Home</h2>
      <h1 className="text-2xl font-semibold mb-8">Popular categories</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {popularCategories.map((item, index) => (
            <Link
              to={`/c/${item.name.toLowerCase()}`}
              key={index}
              className="border border-gray-200 rounded-xl flex flex-col items-center justify-center p-4 hover:shadow transition"
            >
              <div className="w-20 h-20 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src={item.img || tabletImg}
                  alt={item.name}
                  className="object-contain max-h-full"
                />
              </div>
              <p className="text-base font-semibold text-center">{item.name}</p>
            </Link>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Other categories</h2>
          <ul className="space-y-4">
            {otherCategories.map((cat, idx) => (
              <Link
                to="/"
                key={idx}
                className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer"
              >
                {cat.icon}
                <span>{cat.name}</span>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
