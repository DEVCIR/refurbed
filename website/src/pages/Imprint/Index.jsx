export default function Imprint() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Navigation */}
      <div className="max-w-4xl mx-auto mb-8">
        <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
          Home
        </a>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Impressum
        </h1>

        {/* Return Information Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            You want to return your product?
          </h2>
          <p className="text-gray-700 text-sm mb-6 leading-relaxed">
            Please do not send it back to the company address. We are an online
            marketplace. There is no shop at the address. All relevant
            information on the return can be found here:
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
            Return
          </button>
        </div>

        {/* Company Information */}
        <div className="grid md:grid-cols-2 gap-8 text-sm">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Company headquarters
              </h3>
              <div className="text-gray-700 space-y-1">
                <p>Refurbed Marketplace GmbH</p>
                <p>Jakov-Lind Street 7</p>
                <p>1020 Vienna</p>
                <p>Austria</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Managing director:
              </h3>
              <div className="text-gray-700 space-y-1">
                <p>Kilian Kaminski</p>
                <p>Peter Windischhofer</p>
              </div>
            </div>

            <div>
              <div className="text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Commercial court:</span> Vienna
                </p>
                <p>
                  <span className="font-medium">
                    Commercial register number:
                  </span>{" "}
                  FN 590622m
                </p>
                <p>
                  <span className="font-medium">VAT ID:</span> ATU79534819
                </p>
                <p>
                  <span className="font-medium">Share capital:</span> €35 000
                </p>
                <p>
                  <span className="font-medium">
                    Supervisory authority according to ECG:
                  </span>
                </p>
                <p>Magistratisches Bezirksamt for the 2nd district</p>
              </div>
            </div>

            <div>
              <p className="text-gray-700">
                In our public relations and interest representation activities,
                we are obliged to the Code of Conduct of the Austrian{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Public Affairs Association (ÖPAV)
                </a>
                .
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <div className="text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Tel:</span> +43 (0) 720 271717-0
                </p>
                <p>
                  <span className="font-medium">Customer Service:</span>{" "}
                  service-refurbed.de
                </p>
                <p>
                  <span className="font-medium">E-mail:</span> info.refurbed.com
                </p>
                <p>
                  <span className="font-medium">Free hotline:</span> 0800 - 700
                  12 10
                </p>
                <p>
                  <span className="font-medium">Mon - Fri</span> 09:00 - 19:00
                </p>
              </div>
            </div>

            <div>
              <div className="text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">
                    Responsible for the content according to Section 55 RSTV:
                  </span>
                </p>
                <p>Peter Windischhofer</p>
              </div>
            </div>

            <div>
              <div className="text-gray-700 space-y-2">
                <p>
                  <span className="font-medium">
                    Alternative dispute resolution pursuant to Art. 14 para. 1
                    ODR-VO and 36 VSBG:
                  </span>
                </p>
                <p>
                  The European Commission provides a platform for online dispute
                  resolution (OS), which can be found at{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                  . We are ready to participate in out-of-court arbitration
                  proceedings.
                </p>
              </div>
            </div>

            <div>
              <div className="text-gray-700">
                <p>
                  <span className="font-medium">
                    Disclosure according to Art 24 (2) DSA:
                  </span>{" "}
                  The average monthly number of active users of our marketplace
                  during the last 6 months is 45 000 000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
