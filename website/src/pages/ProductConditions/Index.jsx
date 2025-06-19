import { Check } from "lucide-react";

export default function ProductConditions() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Refurbed means used, completely renewed and therefore again as new -
            and with guarantee.
          </h1>
          <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Our products are available in the states Excellent (works as new and
            looks like new), Very good (works as new, may have very light signs
            of use) and Good (works as new, can have clear signs of use).
          </p>
          <div className="mt-8 text-sm">
            What the well-known product tester SunTech says about our refurbed™
            iPhone 7:
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm">
            <span>
              "I was expecting the device exactly as we requested. I can not
              find a single scratch."
            </span>
          </div>
          <div className="mt-2 flex items-center justify-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4" />
              Guarantee
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4" />
              Buy Refurbed, Save Money
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4" />
              More environmentally friendly than new
            </span>
          </div>
        </div>
      </div>

      {/* Excellent Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Excellent</h2>
            <p className="text-gray-600 mb-6">Like new, only better.</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Works perfectly</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Professionally tested and cleaned</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Cheaper than new products</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>No data from the previous customer</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Valid software license</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>
                  Free warranty: 30 days test and free return shipment
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>
                  Saves electronic waste, CO2 emissions and water compared to
                  virgin material
                </span>
              </li>
            </ul>
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">
                Handheld devices - (e.g. & Mobile phones, tablets, cameras...)
              </h3>
              <p className="text-sm text-gray-600">
                The product may have minimal dents, scratches or wear and tear,
                which can be visible from a distance of 30 cm. The functionality
                is not affected.
              </p>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">
                Large equipment - (e.g. & Laptops, kitchen appliances...)
              </h3>
              <p className="text-sm text-gray-600">
                The product can display traces visible signs of use such as
                scratches, dents or other signs of wear that are visible from a
                distance of 1 meter. The functionality is not affected.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/placeholder.svg?height=300&width=250"
              alt="iPhone excellent condition"
              width={250}
              height={300}
              className="rounded-lg object-cover"
            />
            <img
              src="/placeholder.svg?height=300&width=250"
              alt="iPhone excellent condition back"
              width={250}
              height={300}
              className="rounded-lg object-cover"
            />
            <img
              src="/placeholder.svg?height=300&width=250"
              alt="iPhone excellent condition side"
              width={250}
              height={300}
              className="rounded-lg object-cover"
            />
            <img
              src="/placeholder.svg?height=300&width=250"
              alt="iPhone excellent condition detail"
              width={250}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>

      {/* Battery Power Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Battery power</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-gray-700">
                Battery performance is crucial, which is why our refurbished
                devices maintain batteries with significantly improved capacity
                compared to typical used devices. During the refurbishment
                process, we test the batteries of the products and renew or
                replace them if the capacity of a new device. Some devices may
                have batteries that are not user-replaceable, but we ensure they
                meet our high standards for performance.
              </p>
              <p className="text-gray-700">
                Electronic waste during the refurbishing process, wireless
                signals do not exchange batteries and try to achieve the best
                possible performance. The battery performance that cannot be
                guaranteed by normal wear and tear but at clinical performance
                drops significantly over time.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-gray-700">
                To avoid unnecessary electro-waste, batteries with higher
                performance are not replaced by new ones.
              </p>
              <p className="text-gray-700">
                However, less 10% of their capacity after only a few charging
                cycles. The battery capacity is guaranteed to be at least 80% of
                the original capacity. There is no Replacement in case there is
                a loss of 20%.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Very Good Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/placeholder.svg?height=300&width=250"
              alt="iPhone very good condition"
              width={250}
              height={300}
              className="rounded-lg object-cover"
            />
            <img
              src="/placeholder.svg?height=300&width=250"
              alt="iPhone very good condition back"
              width={250}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Very good</h2>
            <p className="text-gray-600 mb-6">Like new, only better.</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Works perfectly</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Professionally tested and cleaned</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Cheaper than new products</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>No data from the previous customer</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Valid software license</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>
                  Free warranty: 30 days test and free return shipment
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>
                  Saves electronic waste, CO2 emissions and water compared to
                  virgin material
                </span>
              </li>
            </ul>
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">
                Handheld devices - (e.g. & Mobile phones, tablets, cameras...)
              </h3>
              <p className="text-sm text-gray-600">
                The product may have minimal dents, scratches or wear and tear,
                which can be visible from a distance of 30 cm. The functionality
                is not affected.
              </p>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">
                Large equipment - (e.g. & Laptops, kitchen appliances...)
              </h3>
              <p className="text-sm text-gray-600">
                The product can display traces visible signs of use such as
                scratches, dents or other signs of wear that are visible from a
                distance of 1 meter. The functionality is not affected.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Good Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Good</h2>
              <p className="text-gray-600 mb-6">Like new, only better.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Works perfectly</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Professionally tested and cleaned</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Cheaper than new products</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>No data from the previous customer</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Valid software license</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>
                    Free warranty: 30 days test and free return shipment
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>
                    Saves electronic waste, CO2 emissions and water compared to
                    virgin material
                  </span>
                </li>
              </ul>
              <div className="mt-8 p-4 bg-white rounded-lg">
                <h3 className="font-semibold mb-2">
                  Handheld devices - (e.g. & Mobile phones, tablets, cameras...)
                </h3>
                <p className="text-sm text-gray-600">
                  The product can have visible signs of use such as scratches or
                  dents, which can be visible from a distance of 30 cm. The
                  functionality is not affected.
                </p>
              </div>
              <div className="mt-4 p-4 bg-white rounded-lg">
                <h3 className="font-semibold mb-2">
                  Large equipment - (e.g. & Laptops, kitchen appliances...)
                </h3>
                <p className="text-sm text-gray-600">
                  The product can display more visible signs of use such as
                  scratches, dents or other signs of wear. Bottom of a notebook
                  or back of a coffee machine may have clear signs of use.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/placeholder.svg?height=300&width=250"
                alt="iPhone good condition"
                width={250}
                height={300}
                className="rounded-lg object-cover"
              />
              <img
                src="/placeholder.svg?height=300&width=250"
                alt="iPhone good condition back"
                width={250}
                height={300}
                className="rounded-lg object-cover"
              />
              <img
                src="/placeholder.svg?height=300&width=250"
                alt="iPhone good condition detail"
                width={250}
                height={300}
                className="rounded-lg object-cover"
              />
              <img
                src="/placeholder.svg?height=300&width=250"
                alt="iPhone good condition side"
                width={250}
                height={300}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Top Products Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our top products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-gray-100 rounded-lg p-8 mb-4">
              <img
                src="/placeholder.svg?height=120&width=80"
                alt="Mobile phones"
                width={80}
                height={120}
                className="mx-auto"
              />
            </div>
            <h3 className="font-semibold">Mobile phones</h3>
          </div>
          <div className="text-center">
            <div className="bg-gray-100 rounded-lg p-8 mb-4">
              <img
                src="/placeholder.svg?height=120&width=80"
                alt="Tablets"
                width={80}
                height={120}
                className="mx-auto"
              />
            </div>
            <h3 className="font-semibold">Tablets</h3>
          </div>
          <div className="text-center">
            <div className="bg-gray-100 rounded-lg p-8 mb-4">
              <img
                src="/placeholder.svg?height=80&width=120"
                alt="Laptops"
                width={120}
                height={80}
                className="mx-auto"
              />
            </div>
            <h3 className="font-semibold">Laptops</h3>
          </div>
          <div className="text-center">
            <div className="bg-gray-100 rounded-lg p-8 mb-4">
              <img
                src="/placeholder.svg?height=120&width=120"
                alt="Smartwatches"
                width={120}
                height={120}
                className="mx-auto rounded-full"
              />
            </div>
            <h3 className="font-semibold">Smartwatches</h3>
          </div>
          <div className="text-center">
            <div className="bg-gray-100 rounded-lg p-8 mb-4">
              <img
                src="/placeholder.svg?height=80&width=120"
                alt="Monitors"
                width={120}
                height={80}
                className="mx-auto"
              />
            </div>
            <h3 className="font-semibold">Monitors</h3>
          </div>
          <div className="text-center">
            <div className="bg-gray-100 rounded-lg p-8 mb-4">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Audio"
                width={100}
                height={100}
                className="mx-auto"
              />
            </div>
            <h3 className="font-semibold">Audio</h3>
          </div>
          <div className="text-center">
            <div className="bg-gray-100 rounded-lg p-8 mb-4">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Desktops"
                width={100}
                height={100}
                className="mx-auto"
              />
            </div>
            <h3 className="font-semibold">Desktops</h3>
          </div>
          <div className="text-center">
            <div className="bg-gray-100 rounded-lg p-8 mb-4">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Cameras"
                width={100}
                height={100}
                className="mx-auto"
              />
            </div>
            <h3 className="font-semibold">Cameras</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
