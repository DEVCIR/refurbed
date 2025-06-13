import { useEffect } from "react";
import "./EnvironmentalPromotion.css";
import { FaHandHoldingWater, FaTree, FaRecycle } from "react-icons/fa";
import { PiCloudCheckDuotone } from "react-icons/pi";
import { GiMountains } from "react-icons/gi";
import { ImBin } from "react-icons/im";
import { MdCo2 } from "react-icons/md";
import { useState } from "react";
import BorderButton from "../BorderButton/BorderButton";
import { Link } from "react-router-dom";
import { FadeUpAll } from "../../animations/gsapAnimations";

const stats = [
  {
    icon: <FaHandHoldingWater />,
    value: "104 billion l",
    title: "Virtual water saved*",
    subtitle: "since foundation",
    info: "This represents the amount of virtual water saved by using refurbished products.",
  },
  {
    icon: <FaTree />,
    value: "> 6.6 million",
    title: "Trees planted**",
    subtitle: "since foundation",
    info: "Over 6.6 million trees have been planted as part of our sustainability efforts.",
  },
  {
    icon: <ImBin />,
    value: "1001 †",
    title: "E-waste saved",
    subtitle: "since foundation",
    info: "This is the amount of electronic waste saved by refurbishing devices.",
  },
  {
    icon: <MdCo2 />,
    value: "304,608 †",
    title: "CO₂ saved",
    subtitle: "since foundation",
    info: "This is the amount of CO₂ emissions reduced through our initiatives.",
  },
];

const cards = [
  {
    icon: <FaRecycle size={28} />,
    title: "Electronic waste recycling",
    description:
      "Our partner buys electronic waste in countries where minimal recycling is done and makes this material available for new products.",
  },
  {
    icon: <PiCloudCheckDuotone size={28} />,
    title: "CO₂ removal from the atmosphere",
    description:
      "We support projects that remove CO₂ from the air and store it permanently – for example in rocks or algae.",
  },
  {
    icon: <GiMountains size={28} />,
    title: "Restoration of landscapes",
    description:
      "Goes beyond solely planting trees. Ecosystems are repaired and jobs are created.",
  },
];

const EnvironmentalPromotion = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    FadeUpAll(".fade-up");
  }, []);

  return (
    <section className="py-12 justify-center items-center flex bg-custom-bg1">
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto">
        <div className="bg-custom-bg2 rounded-lg overflow-hidden">
          <div className="top-part bg-cover px-6 md:px-10 py-4 md:py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="fade-up flex items-center bg-white rounded-full p-2 md:p-3 shadow-sm"
                >
                  <div className="flex-shrink-0 h-full aspect-square bg-green-100 flex justify-center items-center text-3xl text-custom-accent rounded-full shadow-md p-4">
                    {item.icon}
                  </div>
                  <div className="flex flex-col items-center w-full relative">
                    <p className="text-lg md:text-xl font-semibold text-black flex items-center">
                      {item.value}
                      <span
                        className="text-custom-pri-light ml-2 cursor-pointer relative"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        ⓘ
                        {hoveredIndex === index && (
                          <div
                            className={`absolute top-1/2 ${
                              index % 2 === 0
                                ? "left-full ml-2"
                                : "right-full mr-2"
                            } -translate-y-1/2 bg-white text-gray-600 font-normal text-sm rounded-md shadow-lg p-3 w-64 z-10`}
                          >
                            {item.info}
                          </div>
                        )}
                      </span>
                    </p>
                    <p className="text-sm md:text-base font-medium text-black">
                      {item.title}
                    </p>
                    <p className="text-sm text-black">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center px-4 py-10">
            <h2 className="fade-up text-xl md:text-2xl font-semibold text-black mb-6">
              Promotion of environmental protection projects
            </h2>

            <p className="fade-up max-w-[85%] mx-auto text-sm md:text-base text-black leading-relaxed">
              Refurbished products are more sustainable than new ones – this is{" "}
              <a
                href="#"
                className="text-custom-pri-light underline hover:text-custom-pri"
              >
                scientifically proven
              </a>
              . This also shows that everyone can make a significant
              contribution to environmental protection, and together, we can do
              even more. With your support, we therefore promote tried and
              tested, as well as new, measures to protect our earth. In this
              way, we can ensure a livable future together.
            </p>
          </div>
          <div className="text-center px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-7xl mx-auto">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="fade-up bg-white rounded-lg shadow-sm relative pt-10 pb-6 px-6"
                >
                  <div className="absolute top-2 left-1/2 z-10 -translate-x-1/2 text-custom-accent bg-[#CFF1D5] shadow rounded-full w-12 h-12 flex items-center justify-center">
                    {card.icon}
                  </div>
                  <div className="absolute top-0 left-0 w-full h-8 bg-custom-accent rounded-t-lg" />
                  <h3 className="text-lg font-semibold text-custom-accent mt-8 z-10 relative">
                    {card.title}
                  </h3>
                  <p className="text-black mt-4 text-base leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            <Link to="/">
              <BorderButton>Learn more</BorderButton>
            </Link>

            <div className="fade-up mt-10 text-sm text-black space-y-1 max-w-4xl mx-auto">
              <p>
                *Savings compared to new purchase based on the environmental
                impacts through our{" "}
                <a
                  href="#"
                  className="text-custom-pri-light underline hover:text-custom-pri"
                >
                  ISO 14040/44 verified calculation model
                </a>
                .
              </p>
              <p>
                **Between 2018 and 2024, we planted over 6.6 million trees,
                which we are very proud of. Since February 2024, we have been
                supporting a number of highly effective{" "}
                <a
                  href="#"
                  className="text-custom-pri-light underline hover:text-custom-pri"
                >
                  environmental protection projects
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnvironmentalPromotion;
