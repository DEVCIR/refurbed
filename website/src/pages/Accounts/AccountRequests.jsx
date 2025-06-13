import React from "react";

const AccountRequests = ({ setActiveTab }) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Your requests</h1>

      <div className="flex flex-col items-center text-center mt-20">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
          No messages yet
        </h2>

        <p className="text-gray-700 mb-6 max-w-md">
          Please select an order to contact a seller. You’ll see the
          conversation here.
        </p>

        <button
          onClick={() => setActiveTab("orders")}
          className="bg-custom-pri-light hover:bg-custom-pri text-white font-semibold px-6 py-3 rounded-md"
        >
          My orders
        </button>
      </div>
    </>
  );
};

export default AccountRequests;
