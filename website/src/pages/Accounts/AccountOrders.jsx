import React from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";


const AccountOrders = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">My orders (0)</h1>

      <div className="flex flex-col items-center justify-center text-center mt-20">
      <IoBagHandleOutline className="text-7xl mb-6" />
        <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
        <p className="text-sm text-gray-700 mb-6 max-w-md">
          Your purchases will contribute to the circular economy. They will be
          visible here.
        </p>
        <Link to="/">
        <button className="bg-custom-pri-light hover:bg-custom-pri text-white font-semibold px-6 py-3 rounded-md">
          Start shopping
        </button>
        </Link>
      </div>
    </>
  );
};

export default AccountOrders;
