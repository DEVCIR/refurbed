import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Review = () => {
  const [swiper, setSwiper] = useState(null);

  const reviews = [
    {
      title: "Phone delivered as new and on time",
      text: "Smooth process, clear steps, and a great item received!",
      name: "Brian",
      isInvited: true,
    },
    {
      title: "Simple process easy to follow way",
      text: "Arrived promptly, iPad was like new, very happy.",
      name: "Michael",
      isInvited: true,
    },
    {
      title: "Delivered on time",
      text: "iPhone 11 in top shape, exactly as described, thrilled!",
      name: "SeanOC",
      time: "4 hours ago",
      isInvited: true,
    },
    {
      title: "Got an Iphone and was really pleased",
      text: "Quick and hassle-free, fast shipping, item!",
      name: "SeanOC",
      isInvited: true,
    },
    {
      title: "Super easy transaction' fast delivery",
      text: "Excellent product, speedy delivery, just as expected.",
      name: "Taylor",
      isInvited: true,
    },
    {
      title: "Perfect product delivered very quickly",
      text: "Product delivered very quickly, just what I needed",
      name: "Sabreena",
      isInvited: true,
    },
  ];

  const StarRating = ({ rating = 5 }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`text-3xl ${i < rating ? "text-[#00b77a]" : "text-gray-300"}`}
          >
            ★
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="bg-white mt-[-40px] py-12 justify-center items-center flex">
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">Reviews</h2>
          <div className="hidden md:flex ml-auto space-x-2">
            <button
              onClick={() => swiper?.slidePrev()}
              className="w-10 h-10 rounded-full border text-xl border-[#5a47b2] flex items-center justify-center text-[#5a47b2] hover:text-gray-400 hover:border-gray-400"
            >
              <span className="sr-only">Previous</span>
              &lt;
            </button>
            <button
              onClick={() => swiper?.slideNext()}
              className="w-10 h-10 rounded-full border text-xl border-[#5a47b2] flex items-center justify-center text-[#5a47b2] hover:text-gray-400 hover:border-gray-400"
            >
              <span className="sr-only">Next</span>
              &gt;
            </button>
          </div>
        </div>

        {/* Reviews Slider */}
        <Swiper
          onSwiper={setSwiper}
          slidesPerView={1}
          spaceBetween={16}
          modules={[Navigation]}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="border border-gray-200 rounded-xl shadow-xl p-4 h-full cursor-pointer">
                {/* Rating stars */}
                <div className="flex mb-2">
                  <StarRating />
                  {review.isInvited && (
                    <div className="ml-2 flex items-center text-gray-600">
                      <span className="text-lg">Invited</span>
                    </div>
                  )}
                </div>

                {/* Review title and content */}
                <h3 className="font-medium text-xl mb-1">{review.title}</h3>
                <p className="text-lg text-gray-700 mb-2">{review.text}</p>

                {/* Reviewer info */}
                <div className="text-base">
                  <span className="font-medium">{review.name}</span>
                  {review.time && <span>, {review.time}</span>}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Review;
