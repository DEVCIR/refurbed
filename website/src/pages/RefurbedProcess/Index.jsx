import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function RefurbedProcessPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            {" "}
            <div className="flex items-center space-x-2">
              {" "}
              <a href="#" className="hover:text-purple-600">
                Home
              </a>
              <ChevronRight className="w-4 h-4" />
              <span>Your benefits</span>
            </div>
            <a href="#" className="text-purple-600 hover:underline">
              Sustainability
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              The refurbed process
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Refurbed products go through up to 40 steps until they are like
              new again - we have summarized this in 4 points.
            </p>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
              Our renewal process
            </h2>
            <div className="grid grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                      <rect
                        x="5"
                        y="2"
                        width="14"
                        height="20"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 18h.01"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                </div>
                <h3 className="font-bold text-sm text-gray-900 mb-2">
                  DATA CLEANING
                </h3>
              </div>

              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                </div>
                <h3 className="font-bold text-sm text-gray-900 mb-2">
                  COMPONENT REPLACEMENT
                </h3>
              </div>

              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                      <polygon
                        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                </div>
                <h3 className="font-bold text-sm text-gray-900 mb-2">
                  EXTERNAL PREPARATION
                </h3>
              </div>

              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <polyline
                        points="22,4 12,14.01 9,11.01"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                </div>
                <h3 className="font-bold text-sm text-gray-900 mb-2">
                  PROVISION
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* In Detail Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
              In detail
            </h2>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-16">
              <div>
                <p className="text-gray-600 leading-relaxed">
                  The renewal is usually carried out directly by verified
                  manufacturers or sellers. Each of the seller or Manufacturers
                  on refurbed have many years of experience and comprehensive
                  expertise in their specialty. We will check this carefully.
                </p>
              </div>
              <div>
                <p className="text-gray-600 leading-relaxed">
                  The refurbed browser buys large quantities of used devices
                  from companies or telecommunications providers at low prices.
                  Then the refurbed process begins.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-16">
              <div className="space-y-8">
                <div>
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">
                      1
                    </div>
                    <h3 className="font-bold text-gray-900">Data cleaning</h3>
                  </div>
                  <p className="text-sm text-gray-600 ml-9">
                    The data on the device is completely cleaned and reset to
                    the factory settings.
                  </p>
                </div>

                <div>
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">
                      3
                    </div>
                    <h3 className="font-bold text-gray-900">
                      External preparation
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 ml-9">
                    All external signs of use are eliminated for the device.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">
                      2
                    </div>
                    <h3 className="font-bold text-gray-900">
                      Component replacement
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 ml-9">
                    After extensive tests, individual components are replaced if
                    required.
                  </p>
                </div>

                <div>
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">
                      4
                    </div>
                    <h3 className="font-bold text-gray-900">Provision</h3>
                  </div>
                  <p className="text-sm text-gray-600 ml-9">
                    The equipment is offered for sale via refurbed.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                You want to convince yourself of the new appearance of refurbed
                products? Here we have sample photos of our bestsellers.
              </p>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-2"
              >
                LEARN MORE
              </Button>
            </div>
          </div>
        </section>

        {/* Top Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our top products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  name: "Mobile phones",
                  icon: "/blob_images/smartphones.webp",
                },
                {
                  name: "Tablets",
                  icon: "/blob_images/tablets.webp",
                },
                {
                  name: "Laptops",
                  icon: "/blob_images/laptops.webp",
                },
                {
                  name: "Smartwatches",
                  icon: "/blob_images/smartwatches.webp",
                },
                {
                  name: "Monitors",
                  icon: "/blob_images/monitors.webp",
                },
                {
                  name: "Desktops",
                  icon: "/blob_images/desktops.webp",
                },
                {
                  name: "Cameras",
                  icon: "/blob_images/cameras.webp",
                },
                {
                  name: "Printers",
                  icon: "/blob_images/printers.webp",
                },
              ].map((product, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow cursor-pointer border-gray-200"
                >
                  <CardContent className="p-6">
                    <div className="wbg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      {/* <product.icon className="w-8 h-8 text-gray-600" /> */}
                      <img src={product.icon} />
                    </div>
                    <h3 className="font-medium text-sm">{product.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Info Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="p-8 bg-white border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  How refurbed purchasing works
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Here you can find all the information about payment, delivery
                  and our dealers.
                </p>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Learn more
                </Button>
              </Card>

              <Card className="p-8 bg-white border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  Support & service
                </h3>
                <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                  If you have any questions, feedback and problems, we are happy
                  to assist you.
                </p>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Call us at 08007001110 or write to us at service@refurbed.de
                </p>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Contact
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
