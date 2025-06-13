import React, { useState, useEffect } from "react";
import { FadeUpAll } from "../../animations/gsapAnimations";

const faqs = [
  {
    question: "What is a refurbished product?",
    answer:
      "Refurbed is an online marketplace for refurbished electronics. All refurbed iPhone 13 function like new, but are much cheaper. How is that the case? Once sourced, experts put our products through an up to 40-step refurbishment process to ensure that all products work and look like new. This results in us offering better value products that are also more sustainable.",
  },
  {
    question: "Why is refurbed the best place to buy refurbished products?",
    answer:
      "refurbed iPhone 13 are great value, at up to 40% cheaper than new. Equally as important is trust. We give you a minimum 12-month warranty on each device and a 30-day free trial period, during which you can return for a full refund. This means you save money, and get to test the device to make sure it works perfectly for you.",
  },
  {
    question:
      "How does refurbed guarantee the quality of its refurbished products?",
    answer:
      "Every refurbed partner is specialised in certain brands. They mostly buy exhibit and corporate phones in large quantities at low prices. Their specialisation makes the renewal processes very efficient, resulting in 100% renewed products that are up to 40% cheaper than new devices.",
  },
  {
    question: "What warranty and support does refurbed offer on its products?",
    answer:
      "All products purchased on refurbed come with a minimum 12-month warranty and dedicated customer support.",
  },
  {
    question:
      "How does purchasing refurbished products benefit the environment?",
    answer:
      "Buying refurbished reduces electronic waste and conserves natural resources by extending the lifecycle of electronic devices.",
  },
];

const Faq = () => {
  const [openIndices, setOpenIndices] = useState([]);

  const toggleFAQ = (index) => {
    setOpenIndices((prevIndices) =>
      prevIndices.includes(index)
        ? prevIndices.filter((i) => i !== index)
        : [...prevIndices, index],
    );
  };

  useEffect(() => {
    FadeUpAll(".fade-up");
  }, []);

  return (
    <section className="bg-custom-bg1 flex justify-center items-center">
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto py-12">
        <h2 className="fade-up text-2xl md:text-3xl font-semibold text-custom-dark-text mb-8">
          Frequently asked questions
        </h2>
        <div className="border-t border-dashed border-gray-300 mb-8"></div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`fade-up ${index !== faqs.length - 1 ? "border-b border-gray-200" : ""} text-custom-dark-text pb-4`}
            >
              <button
                className="flex items-center gap-3 w-full text-left text-xl font-normal focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-xl">
                  {openIndices.includes(index) ? "–" : "+"}
                </span>
                <span>{faq.question}</span>
              </button>
              {openIndices.includes(index) && (
                <p className="mt-3 text-black text-xl leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
