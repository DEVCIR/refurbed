import { useState, useEffect } from "react";
import ProductFeatures from "../ProductFeatures/ProductFeatures";
import Specs from "../Specs/Specs";

export default function Description() {
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold text-custom-dark-text mb-6">
          Description
        </h1>

        <div className="border-t border-dashed border-gray-300 mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 w-full">
          {/* Left Column - Description Content */}
          <div className="md:col-span-7">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                Your refurbed product
              </h2>
              <p className="text-gray-700 text-lg">
                Refurbed products are more sustainable and up to 40% cheaper
                compared to a new device. Your trusted refurbed product comes
                with a minimum 12-month warranty and a 30-day free returns
                policy, with no questions asked.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">
                iPhone 13 - Description
              </h2>
              <h3 className="text-2xl font-semibold mb-3">
                Discover the iPhone 13: Colours, Features & Why Refurbished is
                the Best Deal
              </h3>
              <p className="text-gray-700 text-lg">
                The iPhone 13 is a crowd-favourite, packed with cutting-edge
                features, vibrant colours, and impressive performance. At
                refurbed, we offer fully unlocked, high-quality refurbished
                iPhone 13s at fantastic prices, meaning they're ready to use on
                any network provider.
              </p>

              <h4 className="mt-4 text-xl font-semibold">
                iPhone 13: Colour Options to Suit Your Style
              </h4>
              <p className="mt-4 text-gray-700 text-lg">
                Apple's iPhone 13 comes in a stylish range of colours that
                appeal to every taste: - Pink – soft and stylish - Blue – bold
                yet elegant - Midnight – a sleek classic - Starlight – bright
                and fresh - (PRODUCT)RED – striking and impactful. Whether you
                prefer a subtle or statement look, the iPhone 13 colours have
                you covered.
              </p>

              <h3 className="text-xl font-semibold mt-4">
                Storage Options for Every Need
              </h3>
              <p className="mt-4 text-gray-700 text-lg">
                The iPhone 13 is available in a variety of storage sizes: -
                128GB – for everyday use and essential apps - 256GB – ideal for
                multimedia lovers - 512GB – perfect for power users. These
                options make it easy to choose the right storage size, ensuring
                you don't run out of space.
              </p>

              <h4 className="mt-4 text-xl font-semibold">
                Key Features of the iPhone 13
              </h4>
              <p className="mt-4 text-gray-700 text-lg">
                The iPhone 13 is built with user convenience in mind: - Wireless
                Charging – Easily charge your device with Qi-certified wireless
                chargers. - Powerful Processor – The A15 Bionic chip ensures
                smooth performance, even for demanding tasks. - Stellar Camera -
                12.0 MP dual camera system with a wide- angle and
                ultra-wide-angle lens, image stabilisation, cinema mode, night
                mode, and more.
              </p>

              <h4 className="mt-4 text-xl font-normal">
                iPhone 13 vs. iPhone 13 Pro, Pro Max & Mini
              </h4>
              <p className="mt-4 text-gray-700 text-lg">
                Each model in the iPhone 13 range offers unique features: -
                iPhone 13 Pro & Pro Max – With display that refreshes at a rate
                of 120Hz improved camera system, and larger battery, the Pro
                models suit professional photographers or users who need extra
                power. - iPhone 13 Mini – Compact and lightweight, this model is
                ideal for those who prefer a smaller phone without compromising
                on performance.
              </p>

              <h4 className="mt-4 text-xl font-normal">
                iPhone 13 vs. iPhone 14: Size Comparison
              </h4>
              <p className="mt-4 text-gray-700 text-lg">
                The iPhone 13 and iPhone 14 have similar sizes, though the
                iPhone 14’s slightly slimmer bezels make the display seem more
                expansive. For users who value a balance between screen size and
                portability, and want a phone at an even more attractive price
                point, the iPhone 13 remains a fantastic option.
              </p>

              <h4 className="mt-4 text-xl font-semibold">
                Why Choose a Refurbished iPhone 13?
              </h4>
              <p className="mt-4 text-gray-700 text-lg">
                Buying a refurbished iPhone 13 from refurbed is a smart choice
                for those who want the latest technology at a better price: - Up
                to 40% less than a new iPhone 13. - Eco-friendly choice, giving
                electronics a second life. - Professionally refurbished,
                ensuring like-new quality with a minimum 12-month warranty.
              </p>

              <p className="mt-4 text-gray-700 text-lg">
                With our refurbished iPhones, you get unbeatable value, quality,
                and flexibility to switch networks. Discover the iPhone 13 at
                refurbed today!
              </p>
            </div>
          </div>

          {/* Right Column - Tabs and Features/Specs */}
          <div className="md:col-span-5">
            <div className="border-b border-gray-200">
              <div className="flex space-x-8">
                <button
                  className={`py-4 text-lg font-medium relative ${
                    activeTab === "features"
                      ? "text-black"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("features")}
                >
                  Product features
                  {activeTab === "features" && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-700"></div>
                  )}
                </button>
                <button
                  className={`py-4 text-lg font-medium relative ${
                    activeTab === "specs"
                      ? "text-black"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("specs")}
                >
                  Specs
                  {activeTab === "specs" && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-700"></div>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-10">
              {activeTab === "features" ? <ProductFeatures /> : <Specs />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
