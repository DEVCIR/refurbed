import { useState } from "react";

export default function DeliveryStatus() {
  const [orderNumber, setOrderNumber] = useState("");
  const [lastName, setLastName] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      setShowError(true);
      return;
    }
    setShowError(false);
    // Handle form submission
    console.log("Checking delivery status for:", { orderNumber, lastName });
  };

  const productCategories = [
    {
      name: "Cell phones",
      icon: (
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="w-8 h-12 bg-gray-800 rounded-md relative">
            <div className="w-6 h-1 bg-gray-600 rounded-full absolute top-1 left-1"></div>
            <div className="w-4 h-6 bg-green-400 rounded absolute bottom-1 left-2"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Tablets",
      icon: (
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="w-12 h-9 bg-gray-800 rounded border-2 border-gray-600 relative">
            <div className="w-8 h-5 bg-green-400 rounded absolute top-1 left-1"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Laptops",
      icon: (
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="relative">
            <div className="w-12 h-8 bg-gray-300 rounded-t border border-gray-400"></div>
            <div className="w-14 h-1 bg-gray-600 rounded-b"></div>
            <div className="w-8 h-5 bg-green-400 rounded absolute top-1 left-2"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Smartwatches",
      icon: (
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="relative">
            <div className="w-8 h-10 bg-gray-800 rounded-lg"></div>
            <div className="w-2 h-3 bg-gray-600 rounded absolute -top-1 left-3"></div>
            <div className="w-2 h-3 bg-gray-600 rounded absolute -bottom-1 left-3"></div>
            <div className="w-6 h-6 bg-green-400 rounded absolute top-2 left-1"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Monitor",
      icon: (
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="relative">
            <div className="w-12 h-8 bg-gray-800 rounded border border-gray-600"></div>
            <div className="w-4 h-2 bg-gray-600 rounded absolute -bottom-2 left-4"></div>
            <div className="w-8 h-1 bg-gray-600 rounded absolute -bottom-3 left-2"></div>
            <div className="w-8 h-5 bg-green-400 rounded absolute top-1 left-2"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Audio",
      icon: (
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="relative">
            <div className="w-6 h-6 bg-white rounded-full border-2 border-gray-300"></div>
            <div className="w-6 h-6 bg-white rounded-full border-2 border-gray-300 absolute top-0 left-4"></div>
            <div className="w-2 h-4 bg-gray-600 rounded absolute top-6 left-4"></div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-center text-2xl font-semibold text-gray-900 mb-12">
          Check delivery status
        </h1>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Left Section - Form */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Check delivery status
            </h2>
            <p className="text-gray-600 mb-8">
              Enter your order number and last name to see the status of your
              delivery.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="orderNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Order number
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => {
                    setOrderNumber(e.target.value);
                    if (showError && e.target.value.trim()) {
                      setShowError(false);
                    }
                  }}
                  placeholder="z.B. 123456"
                  className={`w-full px-4 py-3 border-2 border-dashed rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    showError ? "border-red-400 bg-red-50" : "border-gray-300"
                  }`}
                />
                {showError && (
                  <p className="text-red-500 text-sm mt-1">
                    Gib deine Bestellnummer ein
                  </p>
                )}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 underline text-sm mt-2 inline-block"
                >
                  Where can I find the order number?
                </a>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="z.B.Musterfrau"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Check delivery status
              </button>
            </form>
          </div>

          {/* Right Section - Registration Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Don't have your order number handy?
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              You can find all the details in your account.
            </p>
            <button className="bg-white border-2 border-purple-700 text-purple-700 hover:bg-purple-50 font-medium py-3 px-6 rounded-lg transition-colors mx-auto">
              To register
            </button>
          </div>
        </div>

        {/* You might also like section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            You might also like
          </h2>
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {productCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex flex-col items-center">
                    {category.icon}
                    <h3 className="text-sm font-medium text-gray-900 mt-4 text-center">
                      {category.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrow */}
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full bg-white rounded-full border border-gray-300 p-2 hover:bg-gray-50 transition-colors">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
