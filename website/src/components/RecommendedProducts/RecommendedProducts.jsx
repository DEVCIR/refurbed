// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
// import { Link } from "react-router-dom";

// const RecommendedProducts = ({ id, category, allProducts }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [recommended, setRecommended] = useState([]);

//   useEffect(() => {
//     if (!category || !allProducts?.length) {
//       setRecommended([]);
//       return;
//     }

//     const filtered = allProducts.filter(
//       (product) => product.category?.name === category
//     );

//     const shuffled = filtered
//       .filter(product => product.id !== id)
//       .sort(() => 0.5 - Math.random());

//     setRecommended(shuffled.slice(0, 4));
//   }, [id, category, allProducts]);

//   return (
//     <section className="bg-custom-bg1 ">
//       <div className="container py-10 relative w-full">
//         {recommended.length > 0 ? (
//           <div>
//             <div className="flex items-center justify-between gap-3 max-w-fit mb-9 relative mt-16">
//               <h2 className="text-xl md:text-2xl font-semibold text-custom-dark-text">
//                 Recommended options
//               </h2>
//             </div>
//             <div className="relative md:px-5 lg:px-0">
//               <Swiper
//                 modules={[Navigation]}
//                 navigation={{
//                   nextEl: ".custom-next4",
//                   prevEl: ".custom-prev4",
//                 }}
//                 slidesPerView={2}
//                 spaceBetween={20}
//                 breakpoints={{
//                   640: { slidesPerView: 2 },
//                   768: { slidesPerView: 3 },
//                   1024: { slidesPerView: 4 },
//                 }}
//                 className="relative"
//               >
//                 {recommended.map((product, index) => (
//                   <SwiperSlide key={index}>
//                     <Link
//                       to={`/p/${product.id}`}
//                       className="block group"
//                       onClick={() => window.scrollTo(0, 0)}
//                     >
//                       <div className="bg-white w-full flex items-center justify-center py-5 overflow-hidden">
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="h-32 px-2 md:px-6 object-contain group-hover:scale-110 transition-transform duration-300"
//                         />
//                       </div>
//                       <p className="text-sm px-2 md:px-6 mt-4 text-center text-custom-dark-text font-medium line-clamp-2 h-[20px]">
//                         {product.name}
//                       </p>
//                       <p className="text-custom-accent px-2 md:px-6 text-center font-semibold mt-1 text-sm h-[20px]">
//                         €{product.currentPrice}
//                       </p>
//                     </Link>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//               <button className="custom-prev4 hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-[42px] h-[42px] border-1 border-custom-pri bg-white text-custom-pri rounded-md text-xl items-center justify-center">
//                 <MdArrowBackIos className="relative left-[3px]" />
//               </button>
//               <button className="custom-next4 hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[42px] h-[42px] border-1 border-custom-pri bg-white text-custom-pri rounded-md text-xl items-center justify-center">
//                 <MdArrowForwardIos />
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div></div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default RecommendedProducts;

// _______________________________________________________________________________________________

import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
import iphoneImage from "./../../assets/product-images/iphone-13.webp";

const RecommendedProducts = () => {
  const recommended = [
    {
      id: 1,
      currentPrice: "€360.99",
      image: iphoneImage,
      color: "black",
      storage: "128 GB",
      condition: "Very good",
      warranty: "12 months",
    },
    {
      id: 2,
      currentPrice: "€360.99",
      image: iphoneImage,
      color: "blue",
      storage: "128 GB",
      condition: "Very good",
      warranty: "12 months",
    },
    {
      id: 3,
      currentPrice: "€366.99",
      image: iphoneImage,
      color: "green",
      storage: "256 GB",
      condition: "Good",
      warranty: "12 months",
    },
    {
      id: 4,
      currentPrice: "€368.99",
      image: iphoneImage,
      color: "white",
      storage: "256 GB",
      condition: "Very good",
      warranty: "12 months",
    },
    {
      id: 5,
      currentPrice: "€360.99",
      image: iphoneImage,
      color: "red",
      storage: "256 GB",
      condition: "Good",
      warranty: "12 months",
    },
    {
      id: 6,
      currentPrice: "€370.99",
      image: iphoneImage,
      color: "black",
      storage: "512 GB",
      condition: "Excellent",
      warranty: "24 months",
    },
    {
      id: 7,
      currentPrice: "€375.99",
      image: iphoneImage,
      color: "blue",
      storage: "512 GB",
      condition: "Very good",
      warranty: "24 months",
    },
  ];

  const containerRef = React.useRef(null);

  const scrollBackward = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollForward = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-[#f9f9f7]">
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto py-10 relative px-4">
        {recommended.length > 0 && (
          <div className="mt-14">
            <h2 className="text-3xl md:text-3xl font-semibold text-custom-dark-text mb-6 text-left">
              Recommended options
            </h2>
            <div className="relative">
              <div
                className="flex space-x-4 overflow-x-hidden pb-4"
                ref={containerRef}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {recommended.map((product) => (
                  <div key={product.id} className="flex-shrink-0 w-80">
                    <Link
                      to={`/p/${product.id}`}
                      className="block group"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow duration-300 flex h-full">
                        <div className="w-1/3 flex items-center justify-center p-2">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-28 object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="w-2/3 pl-4 flex flex-col justify-between mt-4">
                          <div>
                            <div className="mt-1 space-y-1">
                              <p className="text-base font-semibold text-[#79746d] capitalize">
                                {product.color}
                              </p>
                              <p className="text-base text-[#797d77]">
                                {product.storage}
                              </p>
                              <p className="text-base text-[#797d77]">
                                {product.condition}
                              </p>
                              <p className="text-base text-[#797d77]">
                                {product.warranty}
                              </p>
                            </div>
                          </div>
                          <p className="text-[#2e845f] font-semibold text-base mt-2 text-right">
                            {product.currentPrice}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex flex-col space-y-3">
                <button
                  onClick={scrollForward}
                  className="w-10 h-10 border border-[#5a47b2] bg-white text-gray-600 rounded-full flex items-center justify-center shadow-md hover:border-gray-200"
                >
                  <MdArrowForwardIos className="text-sm" />
                </button>
                <button
                  onClick={scrollBackward}
                  className="w-10 h-10 border border-[#5a47b2] bg-white text-gray-600 rounded-full flex items-center justify-center shadow-md hover:border-gray-200"
                >
                  <MdArrowBackIos className="text-base" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecommendedProducts;
