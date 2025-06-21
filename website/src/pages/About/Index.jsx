const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Main Content Container - 8 columns centered */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-start-3 lg:col-span-8">
            {/* We are refurbed section */}
            <div className="text-center py-16">
              <h1 className="text-4xl font-normal text-gray-900 mb-8">
                We are refurbed
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                We are the fastest growing marketplace for renewed products in
                the German-speaking countries. Our products are up to 40%
                cheaper and more sustainable compared to new equipment. They are
                renewed in up to 40 steps, look like new and function as new.
              </p>
            </div>

            {/* Our vision section */}
            <div className="text-center py-16">
              <h2 className="text-4xl font-normal text-gray-900 mb-8">
                Our vision
              </h2>
              <div className="space-y-6 max-w-2xl mx-auto">
                <p className="text-lg text-gray-700 leading-relaxed">
                  We offer a better alternative to new and used products. And
                  that - thanks to the refurbed carefree package - without any
                  risk to our customers.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our goal is to make the refurbed idea known throughout Europe
                  and thereby contribute to a more sustainable world.
                </p>
              </div>
            </div>

            {/* Quality criteria section - Full width gray background */}
            <div className="bg-gray-100 py-16 rounded-xl mb-8">
              <div className="text-center">
                <p className="text-xl text-gray-800 leading-relaxed mb-8 max-w-xl mx-auto">
                  Refurbed has developed a catalogue of quality criteria to meet
                  the highest demands on a permanent basis.
                </p>
                <a
                  href="#"
                  className="inline-block text-teal-600 font-medium tracking-wide uppercase text-sm hover:text-teal-700 transition-colors"
                >
                  LEARN MORE
                </a>
              </div>
            </div>

            {/* Beginning and rise of an idea section */}
            <div className="text-center py-16">
              <h2 className="text-4xl font-normal text-gray-900 mb-16">
                Beginning and rise of an idea
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="space-y-6">
                  <p className="text-base text-gray-700 leading-relaxed">
                    Our story begins with a problem. Founder Peter purchased an
                    iPhone via a website for second-hand goods. However, this
                    went down after only a few weeks and without guarantee he
                    had to pay the damage out of his own pocket.
                  </p>
                  <p className="text-base text-gray-700 leading-relaxed">
                    Rare debt? Partly, certainly. However, he has consciously
                    decided against the safety of a new device... and for good
                    reason!
                  </p>
                </div>

                <div className="space-y-6">
                  <p className="text-base text-gray-700 leading-relaxed">
                    Many people are not aware of how environmentally harmful
                    electronic new devices are. During production, vast amounts
                    of CO2 emissions are created, valuable resources are used
                    and in the end only problematic electronic waste remains,
                    which has to be disposed of.
                  </p>
                  <p className="text-base text-gray-700 leading-relaxed">
                    The idea for refurbed was born: a platform for renewed and
                    high-quality products, with uniform, high standards in terms
                    of quality, safety and guarantee. This should enable
                    consumers to buy sustainable devices easily and without
                    risk.
                  </p>
                </div>
              </div>
            </div>

            {/* Features section */}
            <div className="py-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Guarantee */}
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <svg
                      className="w-12 h-12 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Guarantee
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    30 days right of return and at least 12 months warranty
                  </p>
                </div>

                {/* Save Money */}
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <svg
                      className="w-12 h-12 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Buy Refurbed, Save money
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Save up to 40% compared to new devices
                  </p>
                </div>

                {/* Environmental */}
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <svg
                      className="w-12 h-12 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    More environmentally friendly than new
                  </h3>
                </div>
              </div>
            </div>

            {/* The team section */}
            <div className="text-center py-16">
              <h2 className="text-4xl font-normal text-gray-900 mb-16">
                The team
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Peter Windischhofer */}
                <div className="text-center">
                  <div className="mb-6">
                    <img
                      src="/images/peter-windischhofer.png"
                      alt="Peter Windischhofer"
                      className="w-48 h-48 object-cover mx-auto rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Peter Windischhofer
                  </h3>
                  <p className="text-xs font-medium text-gray-600 tracking-wide uppercase mb-4">
                    FOUNDER
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Long-term consultant at McKinsey & Company. Core area
                    E-commerce. Before business studies in Vienna, Shanghai and
                    San Francisco.
                  </p>
                </div>

                {/* Kilian Kaminski */}
                <div className="text-center">
                  <div className="mb-6">
                    <img
                      src="/images/kilian-kaminski.png"
                      alt="Kilian Kaminski"
                      className="w-48 h-48 object-cover mx-auto rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Kilian Kaminski
                  </h3>
                  <p className="text-xs font-medium text-gray-600 tracking-wide uppercase mb-4">
                    FOUNDER
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Former Head of the Refurbished Products Program, and New Key
                    Account Manager at Amazon Germany. Before business studies
                    in Hamburg, Shanghai and London.
                  </p>
                </div>

                {/* Jürgen Riedl */}
                <div className="text-center">
                  <div className="mb-6">
                    <img
                      src="/images/jurgen-riedl.png"
                      alt="Jürgen Riedl"
                      className="w-48 h-48 object-cover mx-auto rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Jürgen Riedl
                  </h3>
                  <p className="text-xs font-medium text-gray-600 tracking-wide uppercase mb-4">
                    FOUNDER
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Founder and technical director of several international
                    startups. Before studied Software & Information Engineering
                    at the Technical University of Vienna.
                  </p>
                </div>
              </div>
            </div>

            {/* Full team photo section - Wider container */}
            <div className="py-16">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <div className="mb-12">
                    <img
                      src="/images/refurbed-team-photo.png"
                      alt="The entire refurbed team"
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="flex justify-center">
                    <a
                      href="#"
                      className="inline-block bg-blue-600 text-white font-medium px-8 py-3 rounded hover:bg-blue-700 transition-colors uppercase tracking-wide text-sm"
                    >
                      OPEN POSITIONS
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Known from section */}
            <div className="py-16">
              <div className="text-center">
                <h2 className="text-4xl font-normal text-gray-900 mb-16">
                  Known from
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center">
                  {/* Top row */}
                  <div className="flex justify-center">
                    <img
                      src="/placeholder.svg?height=40&width=120"
                      alt="Süddeutsche Zeitung"
                      className="h-8 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="flex justify-center">
                    <img
                      src="/placeholder.svg?height=40&width=120"
                      alt="Der Tagesspiegel"
                      className="h-8 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="flex justify-center">
                    <img
                      src="/placeholder.svg?height=40&width=120"
                      alt="Frankfurter Allgemeine"
                      className="h-8 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="flex justify-center">
                    <img
                      src="/placeholder.svg?height=40&width=120"
                      alt="Die Welt"
                      className="h-8 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="flex justify-center">
                    <img
                      src="/placeholder.svg?height=40&width=120"
                      alt="Forbes"
                      className="h-8 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="flex justify-center">
                    <img
                      src="/placeholder.svg?height=40&width=120"
                      alt="RTL"
                      className="h-8 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>

                  {/* Bottom row */}
                  <div className="flex justify-center">
                    <img
                      src="/placeholder.svg?height=40&width=120"
                      alt="n-tv"
                      className="h-8 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="flex justify-center">
                    <img
                      src="/placeholder.svg?height=40&width=120"
                      alt="VOX"
                      className="h-8 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="flex justify-center">
                    <img
                      src="/placeholder.svg?height=40&width=120"
                      alt="taz"
                      className="h-8 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="flex justify-center">
                    <img
                      src="/placeholder.svg?height=40&width=120"
                      alt="UTOPIA"
                      className="h-8 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="flex justify-center">
                    <img
                      src="/placeholder.svg?height=40&width=120"
                      alt="Bild"
                      className="h-8 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="flex justify-center">
                    <img
                      src="/placeholder.svg?height=40&width=120"
                      alt="EIT Climate-KIC"
                      className="h-8 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
