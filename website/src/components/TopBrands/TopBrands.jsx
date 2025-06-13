import {useEffect} from "react";
import { FaApple } from "react-icons/fa";
import bestImg from "../../assets/product-images/collection_best.webp";
import macbookImg from "../../assets/product-images/collection_macbook.webp";
import iphoneImg from "../../assets/product-images/collection_iphone.webp";
import watchImg from "../../assets/product-images/collection_watch.webp";
import { Link } from "react-router-dom";
import BorderButton from "../BorderButton/BorderButton";
import { FadeUpAll } from "../../animations/gsapAnimations";

const topBrands = [
  {
    label: "Best of Apple",
    img: bestImg,
    span: "col-span-3 lg:col-span-2",
    link: "/c/apple",
  },
  {
    label: "MacBooks",
    img: macbookImg,
    link: "/c/apple",
  },
  {
    label: "iPhones",
    img: iphoneImg,
    link: "/c/apple",
  },
  {
    label: "Apple Watches",
    img: watchImg,
    link: "/c/apple",
  },
];

const TopBrands = () => {
    useEffect(() => {
      FadeUpAll(".fade-up")
    }, [])

  return (
    <section className="py-12 justify-center items-center flex bg-custom-bg1">
      <div className="w-[90%]">
        <h2 className="fade-up text-xl md:text-2xl font-semibold mb-8">
          Our Top Brands: Apple
        </h2>

        <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
          {topBrands.map((brand, index) => (
            <Link
              to={brand.link}
              key={index}
              className={`fade-up rounded-lg overflow-hidden shadow-sm bg-custom-bg2 ${
                brand.span || ""
              }`}
            >
              <div className="bg-custom-bg2">
                <div className="h-24 sm:h-48 w-full">
                  <img
                    src={brand.img}
                    alt={brand.label}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className={"text-center py-1 sm:py-4 bg-custom-bg2"}>
                  <span className="text-sm sm:text-lg font-normal flex items-center justify-center gap-2">
                    <FaApple className="hidden md:block" />
                    {brand.label}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Link to="/c/apple">
            <BorderButton>All Apple Products</BorderButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopBrands;
