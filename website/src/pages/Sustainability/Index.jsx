import React from "react";

const SustainabilityPage = () => {
  return (
    <div className="bg-[#2d8a7a] min-h-screen text-white font-sans">
      {/* Header Section */}
      <div className="text-center pt-10 pb-5">
        <div className="text-2xl font-bold mb-10">⟲refurbed</div>

        <h1 className="text-5xl font-bold mb-8 leading-tight max-w-4xl mx-auto px-4">
          Sustainability at refurbed
        </h1>

        <p className="text-base leading-relaxed max-w-2xl mx-auto mb-16 opacity-90 px-4">
          We operate with the intention to make a positive contribution and
          reduce the environmental impact of consumption as much as possible. We
          would like to give you more insights on this page - and also present
          the various pillars of sustainability on which we build.
        </p>
      </div>

      {/* Content Section */}
      <div className="flex justify-center items-start gap-16 mb-20 px-10 flex-wrap">
        <div className="flex-shrink-0">
          <img
            src="https://d9hhrg4mnvzow.cloudfront.net/nachhaltigkeit.refurbed.de/926aed70-eir25-teaser.gif"
            alt="Laptop showing Sustainability Report 2024 on wooden desk with pink flowers"
            className="w-80 h-52 rounded-lg object-cover shadow-lg"
          />
        </div>

        <div className="flex-shrink-0 text-left">
          <h3 className="text-lg font-bold mb-4">Read now:</h3>
          <p className="text-base leading-6 mb-6 max-w-xs">
            Our 2024 Sustainability Report with our Deep Dive Story on Trade-in
          </p>
          <button className="bg-[#7ed321] text-[#2d8a7a] border-none py-3 px-10 rounded-full text-base font-bold cursor-pointer transition-all duration-300 hover:bg-[#6bc91a]">
            Download
          </button>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="text-center px-10 pb-16">
        <h2 className="text-4xl font-bold mb-16 leading-tight max-w-4xl mx-auto">
          Since our founding, we have already saved so much*:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 max-w-5xl mx-auto mb-10">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl">
              🌍
            </div>
            <div className="text-4xl font-bold mb-2">350,000 t</div>
            <div className="text-sm opacity-90">CO₂e</div>
          </div>

          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl">
              💧
            </div>
            <div className="text-4xl font-bold mb-2">116 Bn l</div>
            <div className="text-sm opacity-90">Virtual Water</div>
          </div>

          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl">
              ⚡
            </div>
            <div className="text-4xl font-bold mb-2">1,136 t</div>
            <div className="text-sm opacity-90">Electronic Waste</div>
          </div>

          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl">
              🔧
            </div>
            <div className="text-4xl font-bold mb-2">130 t</div>
            <div className="text-sm opacity-90">CRITICAL Raw Materials</div>
          </div>

          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl">
              ⚠️
            </div>
            <div className="text-4xl font-bold mb-2">4 t</div>
            <div className="text-sm opacity-90">CONFLICT MATERIALS</div>
          </div>
        </div>

        <p className="text-xs opacity-70 leading-relaxed max-w-4xl mx-auto px-5">
          *Savings compared to new purchases based on environmental impact data
          according to an ISO 14040/44 verified life cycle assessment. Virtual
          water consumption is a method that takes into account the total water
          consumption in the supply chain. The savings in critical and
          conflict-generating materials are exclusively related to smartphones
          (as of May 2023).
        </p>
      </div>
    </div>
  );
};

export default SustainabilityPage;
