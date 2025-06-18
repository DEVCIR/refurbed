import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "@/features/cart/cartSlice";

export default function CartItem({ items }) {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.cartData);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const increaseQty = (id) => {
    const updatedCart = cartData.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );
    dispatch(setCart(updatedCart));
  };

  const decreaseQty = (id) => {
    const updatedCart = cartData
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item,
      )
      .filter((item) => item.quantity > 0);
    dispatch(setCart(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartData.filter((item) => item.id !== id);
    dispatch(setCart(updatedCart));
  };

  return (
    <div className="w-full">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-100 transition-all hover:shadow-lg"
        >
          {/* Product Header with Name and Price */}
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
            <div className="font-bold text-xl text-emerald-700">
              €{item.currentPrice.toFixed(2)}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Product Image with improved styling */}
            <div className="w-full md:w-1/4 flex justify-center">
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center w-32 h-32">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Product Details with improved layout */}
            <div className="flex-1">
              {/* Specification Info */}
              <div className="bg-gray-50 p-3 rounded-lg mb-3 text-sm">
                <p className="text-gray-700 font-medium">
                  Warranty: 12 Months | {item.storage || "256 GB"} | Dual-SIM |{" "}
                  {item.color}, Very good
                </p>
              </div>

              {/* Price Discount Info */}
              <div className="bg-green-50 p-3 rounded-lg mb-4 text-sm">
                <p className="text-emerald-700 font-semibold flex items-center">
                  <span className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 11l5-5m0 0l5 5m-5-5v12"
                      />
                    </svg>
                  </span>
                  Price reduction: Instead of €
                  {(item.currentPrice * 1.07).toFixed(2)}, the device is now €
                  {item.currentPrice.toFixed(2)}
                </p>
              </div>

              {/* Protection Plan Info */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-100 rounded-full p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-blue-800">Full Protection</h3>
                </div>
                <div className="text-sm space-y-1 text-gray-700 ml-7">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>{" "}
                    Display, water, and fall damages
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>{" "}
                    Worldwide coverage
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> No
                    automatic renewal
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quantity Controls and Remove Button */}
          <div className="mt-6 flex justify-end items-center">
            <div className="flex items-center">
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  onClick={() => decreaseQty(item.id)}
                >
                  −
                </button>
                <span className="px-4 py-1 flex items-center justify-center font-medium">
                  {item.quantity}
                </span>
                <button
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  onClick={() => increaseQty(item.id)}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="ml-6 text-red-500 hover:text-red-700 font-medium flex items-center transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
