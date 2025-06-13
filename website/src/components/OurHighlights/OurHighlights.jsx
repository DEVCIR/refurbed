"use client";

import { useEffect } from "react";
import fitnessImg from "../../assets/highlight-images/fitness.webp";
import kitchenImg from "../../assets/highlight-images/kitchen.webp";
import { FadeUpAll } from "../../animations/gsapAnimations";
import HighlightCard from "./HighlightCard"; // Import the new component

const highlightsData = [
  {
    imageSrc: fitnessImg,
    imageAlt: "Fitness",
    title: "Optimise your fitness",
    description:
      "More sustainable and affordable gym equipment for your perfect home workout.",
    linkTo: "/",
  },
  {
    imageSrc: kitchenImg,
    imageAlt: "Kitchen",
    title: "Hot kitchen deals",
    description:
      "Cook up a storm with useful kitchen gadgets up to 40% cheaper than new",
    linkTo: "/",
  },
];

const OurHighlights = () => {
  useEffect(() => {
    FadeUpAll(".fade-up");
  }, []);

  return (
    <section className="py-12 justify-center items-center flex bg-custom-bg1">
      <div className="w-full">
        <h2 className="fade-up text-2xl md:text-2xl font-semibold mb-6 w-11/12 md:w-10/12 lg:w-8/12 mx-auto">
          Our highlights
        </h2>

        <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlightsData.map((highlight, index) => (
            <HighlightCard
              key={index}
              imageSrc={highlight.imageSrc}
              imageAlt={highlight.imageAlt}
              title={highlight.title}
              description={highlight.description}
              linkTo={highlight.linkTo}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurHighlights;
