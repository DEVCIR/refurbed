import { useCallback, useEffect, useState, useRef } from "react";
import "./Hero.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbTimeDuration30 } from "react-icons/tb";
import { GiReturnArrow, GiPineTree } from "react-icons/gi";
import { Link } from "react-router-dom";
import { FadeUpAll } from "../../animations/gsapAnimations";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/category/getAllCategories";
import { setCategories } from "../../features/category/categorySlice";

const Hero = () => {
  const dispatch = useDispatch();
  const [categoriess, setCategoriess] = useState([]);
  const allCategories = useSelector((state) => state.category.allCategories);
  const swiperRef = useRef(null);

  console.log(useSelector((st) => st.category.allCategories));
  const getData = useCallback(async () => {
    try {
      const data = await fetchCategories();
      console.log("Fetched categories:", data);
      dispatch(setCategories(data));
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }, [dispatch]);

  useEffect(() => {
    if (allCategories.length === 0) {
      getData();
    }
    setCategoriess(allCategories);
  }, [allCategories, getData]);

  useEffect(() => {
    if (swiperRef.current && categoriess.length > 0) {
      console.log("Updating Swiper with categories:", categoriess.length);
      swiperRef.current.update();
      swiperRef.current.navigation.update();
      console.log("Prev button:", swiperRef.current.navigation.prevEl);
      console.log("Next button:", swiperRef.current.navigation.nextEl);
    }
  }, [categoriess]);

  useEffect(() => {
    if (categoriess.length > 0) {
      FadeUpAll(".fade-up");
    }
  }, [categoriess]);

  return (
    <div className="bg-green-900 pt-10 w-full text-white hero-main">
      <div className="relative w-11/12 md:w-10/12 lg:w-8/12 mx-auto px-5">
        <h2 className="w-[95%] text-center text-2xl md:text-3xl font-semibold mb-10">
          Refurbished products with at least 12 months’ warranty
        </h2>
        {categoriess.length > 0 ? (
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              console.log("Swiper initialized");
            }}
            observer={true}
            observeParents={true}
            observeSlideChildren={true}
            slidesPerView={1}
            spaceBetween={20}
            loop={categoriess.length > 1}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            breakpoints={{
              640: { slidesPerView: Math.min(categoriess.length, 3) },
              768: { slidesPerView: Math.min(categoriess.length, 4) },
              1150: { slidesPerView: Math.min(categoriess.length, 6) },
            }}
            modules={[Navigation]}
          >
            {categoriess.map((cat, index) => {
              console.log("category:");
              console.log(cat);
              let image = `${cat.img}`;
              return (
                <SwiperSlide key={cat.id || index}>
                  <Link to={`/c/${cat.name}`}>
                    <div className="fade-up bg-white text-black rounded-xl p-5 flex flex-col items-center justify-center shadow-md">
                      <img
                        src={image}
                        alt={cat.name}
                        className="w-28 h-28 object-contain mb-4"
                      />
                      <p className="font-medium text-base text-center">
                        {cat.name}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div>Loading categories...</div>
        )}

        <button className="custom-prev flex absolute left-[0] top-[62.5%] -translate-y-1/2 z-10 w-[42px] h-[42px] border-1 border-[#6357a1] bg-white text-[#6357a1] rounded-md text-xl items-center justify-center">
          <MdArrowBackIos className="relative left-[3px]" />
        </button>
        <button className="custom-next flex absolute right-[0] top-[62.5%] -translate-y-1/2 z-10 w-[42px] h-[42px] border-1 border-[#6357a1] bg-white text-[#6357a1] rounded-md text-xl items-center justify-center">
          <MdArrowForwardIos />
        </button>
      </div>

      <div className="bg-custom-bg2 w-full mt-12 py-5">
        <div className="text-custom-dark-text flex flex-wrap justify-around text-xs md:text-sm">
          <div className="flex items-center gap-2 w-[40%] lg:w-auto">
            <CiDeliveryTruck className="text-custom-accent text-4xl" />
            <span className="text-base">Delivery included</span>
          </div>
          <div className="flex items-center gap-2 w-[40%] lg:w-auto">
            <TbTimeDuration30 className="text-custom-accent text-4xl" />
            <span className="text-base">30-day free trial</span>
          </div>
          <div className="flex items-center gap-2 w-[40%] lg:w-auto">
            <GiReturnArrow className="text-custom-accent text-4xl" />
            <span className="text-base">Min 12-month warranty</span>
          </div>
          <div className="flex items-center gap-2 w-[40%] lg:w-auto">
            <GiPineTree className="text-custom-accent text-4xl" />
            <span className="text-base">Saves CO₂ vs new</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
