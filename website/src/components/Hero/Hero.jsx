"use client";

import { useCallback, useEffect } from "react";
import "./Hero.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbTimeDuration30 } from "react-icons/tb";
import { GiReturnArrow, GiPineTree } from "react-icons/gi";
import { FadeUpAll } from "../../animations/gsapAnimations";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/category/getAllCategories";
import { setCategories } from "../../features/category/categorySlice";
import CategorySlideCard from "./CategorySlideCard"; // Import the new component
import FeatureItem from "./FeatureItem"; // Import the new component

const heroFeaturesData = [
  { Icon: CiDeliveryTruck, text: "Delivery included" },
  { Icon: TbTimeDuration30, text: "30-day free trial" },
  { Icon: GiReturnArrow, text: "Min 12-month warranty" },
  { Icon: GiPineTree, text: "Saves CO₂ vs new" },
];

const Hero = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.category.allCategories);

  const getData = useCallback(async () => {
    try {
      const data = await fetchCategories();
      console.log("Data coming: ", data);
      dispatch(setCategories(data));
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    if (allCategories.length === 0) {
      getData();
    }
    // FadeUpAll is called here to ensure animations apply after categories are loaded
    FadeUpAll(".fade-up");
  }, [dispatch, allCategories, getData]);

  return (
    <div className="bg-green-900 pt-10 w-full text-white hero-main">
      <div className="relative w-11/12 md:w-10/12 lg:w-8/12 mx-auto px-5">
        <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10">
          Refurbished products with at least 12 months’ warranty
        </h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1150: { slidesPerView: 6 },
          }}
          modules={[Navigation]}
        >
          {allCategories &&
            allCategories.map((cat, index) => (
              <SwiperSlide key={index}>
                <CategorySlideCard category={cat} />
              </SwiperSlide>
            ))}
        </Swiper>

        <button className="custom-prev flex absolute left-[0] top-[62.5%] -translate-y-1/2 z-10 w-[42px] h-[42px] border-1 border-[#6357a1] bg-white text-[#6357a1] rounded-md text-xl items-center justify-center">
          <MdArrowBackIos className="relative left-[3px]" />
        </button>
        <button className="custom-next flex absolute right-[0] top-[62.5%] -translate-y-1/2 z-10 w-[42px] h-[42px] border-1 border-[#6357a1] bg-white text-[#6357a1] rounded-md text-xl items-center justify-center">
          <MdArrowForwardIos />
        </button>
      </div>

      {/* Bottom features row */}
      <div className="bg-custom-bg2 w-full mt-12 py-5">
        <div className=" w-10/12 lg:w-8/12 mx-auto text-custom-dark-text flex flex-wrap justify-around text-xs md:text-sm">
          {heroFeaturesData.map((feature, index) => (
            <FeatureItem key={index} Icon={feature.Icon} text={feature.text} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
