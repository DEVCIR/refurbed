import { useEffect } from "react";
import { Link } from "react-router-dom";
import refurbImg from "../../assets/refurb-process/refurb-image.webp";
import BorderButton from "../BorderButton/BorderButton";
import { FadeUpAll } from "../../animations/gsapAnimations";
import bgImg from "./../../assets/background-images/refurbishment_process.webp";

const steps = [
  {
    id: 1,
    title: "Supplier buys pre-loved tech",
    img: refurbImg,
  },
  {
    id: 2,
    title: "Data cleanse",
    img: refurbImg,
  },
  {
    id: 3,
    title: "Swap of faulty parts",
    img: refurbImg,
  },
  {
    id: 4,
    title: "External preparation",
    img: refurbImg,
  },
  {
    id: 5,
    title: "Sold via refurbed",
    img: refurbImg,
  },
];

const RefurbProcess = () => {
  useEffect(() => {
    FadeUpAll(".fade-up");
  }, []);

  return (
    <>
      <img
        src={bgImg}
        alt="refurbishment process"
        className="fixed top-0 left-0 w-screen h-screen -z-1"
      />

      <section className="container bg-transparent pt-16 md:pt-24 pb-8 md:pb-12">
        <div className="bg-[rgba(246,246,250,0.9)] mx-auto px-4 py-8 rounded-lg md:text-center">
          <h2 className="fade-up text-xl md:text-2xl font-semibold mb-4">
            The refurbed Process
          </h2>
          <p className="fade-up text-custom-dark-text text-md md:text-lg md:max-w-[80%] mx-auto mb-12">
            refurbed products undergo an up-to 40 step process until they are
            like new again – we have highlighted 5 key steps below:
          </p>

          {/* Step Grid */}
          <div className="flex flex-wrap gap-8 xl:gap-12 justify-center items-center">
            {steps.map((step) => (
              <div key={step.id} className="fade-up flex flex-col items-center">
                <div className="w-28 h-28 md:w-36 md:h-36 xl:w-38 xl:h-38 rounded-full overflow-hidden shadow-lg mb-4">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm md:text-base text-center font-medium max-w-[100px]">
                  {step.id}. {step.title}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
        </div>
        <div className="flex justify-center mt-12">
          <Link to="/">
            <BorderButton>Learn more</BorderButton>
          </Link>
        </div>
      </section>
    </>
  );
};

export default RefurbProcess;
