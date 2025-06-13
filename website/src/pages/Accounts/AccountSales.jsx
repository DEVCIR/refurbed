import React from "react";
import { BsBox2, BsClipboard2Check } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";


const steps = [
  {
    icon: <BsClipboard2Check className="text-custom-pri-light text-xl" />,
    title: "Check your offer",
    description:
      "Specify which device you want to sell and get an instant offer.",
  },
  {
    icon: <BsBox2 className="text-custom-pri-light text-xl" />,
    title: "Send your device",
    description: "Send the device, insured and free of charge.",
  },
  {
    icon: <IoWalletOutline className="text-custom-pri-light text-xl" />,
    title: "Get money",
    description: "Receive a bank transfer after the product arrives.",
  },
];

const AccountSales = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">My Sales (0)</h1>

      <div className="flex flex-col items-center text-center mt-20">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
          Nothing sold yet
        </h2>

        <p className="text-gray-700">
          Get cash for your old phone and support the circular economy.
        </p>

        <div className="w-full px-4 py-12 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-gray-50 rounded-full p-3 shrink-0">
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-start text-sm mb-1">{step.title}</h3>
                  <p className="text-gray-700 text-start text-xs">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="bg-custom-pri-light hover:bg-custom-pri text-white font-semibold px-6 py-3 rounded-md">
          Sell Now
        </button>
      </div>
    </>
  );
};

export default AccountSales;
