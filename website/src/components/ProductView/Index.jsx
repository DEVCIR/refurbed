import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "sonner";
import visaLogo from "@/assets/payment-logos/visa_white.svg";
import mastercardLogo from "@/assets/payment-logos/mastercard.svg";
import applePayLogo from "@/assets/payment-logos/pay_apple_pay.svg";
import googlePayLogo from "@/assets/payment-logos/pay_google_pay.svg";
import paypalLogo from "@/assets/payment-logos/pay_paypal_logo.svg";
import paypal from "./../../assets/payment-logos/paypal.png";
import klarnaLogo from "@/assets/payment-logos/klarna.svg";
import appleLogo from "./../../assets/logos/apple-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "@/features/cart/cartSlice";

const ProductView = ({ product }) => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.cartData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // iPhone 13 product data
  const productPhone = {
    contract: "Without contract",
    price: 322.0,
    oldPrice: 618.73,
    ratingsCount: "143189",
    optics: "Good",
    battery: "New",
    sim: "Dual SIM (eSIM, Nano-SIM)",
    warranty: "12 months",
  };

  const handleAddToCart = (addProductId) => {
    const existingItem = cartData.find((item) => item.id === addProductId);

    let updatedCart;
    if (existingItem) {
      updatedCart = cartData.map((item) =>
        item.id === addProductId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      updatedCart = [...cartData, { id: addProductId, quantity: 1 }];
    }

    dispatch(setCart(updatedCart));
    toast.success("Product added to cart!");
  };

  const categoryName = product.category?.name || "N/A";

  return (
    <div className="bg-white">
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto px-4 py-2 text-sm text-[#7f807c] cursor-pointer">
        <div className="flex items-center gap-2">
          <span>Home</span>
          <span>&gt;</span>
          <span>Products</span>
          <span>&gt;</span>
          <span>Cell phones & smartphones</span>
          <span>&gt;</span>
          <span>iPhones</span>
        </div>
      </div>

      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div>
            {/* 30 days money back */}
            <div className="mb-4 mt-2">
              <div className="text-sm text-[#5731c9] bg-[#f5ecff] inline-block px-2  rounded">
                30 days money back
              </div>
            </div>

            {/* Product name and info */}
            <div className="mb-2">
              <div className="flex items-center gap-2 mb-1">
                <img src={appleLogo} alt="Apple" className="w-8 h-8" />
                <h1 className="text-3xl">{product.name}</h1>
              </div>

              <div className="flex">
                <div className="w-10"></div>
                <div className="flex flex-col">
                  <p className="text-base">{productPhone.contract}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex text-[#00ae73] cursor-pointer">
                      ★★★★<span className="text-[#00ae73]">½</span>
                    </div>
                    <span className="text-xs text-gray-500 ml-1 cursor-pointer">
                      ({product.ratingsCount})
                    </span>
                    <span className="text-xs text-black ml-1 cursor-pointer">
                      ▼
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product image */}
            <div className="mb-4 mt-8">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-[240px] mx-auto"
              />
              <p className="text-center text-sm text-gray-500 mt-2">
                Symbolic image
              </p>
            </div>

            {/* Scope of delivery */}
            <div className="flex items-start mt-4">
              <div className="flex-shrink-0 mr-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v2h2a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2h2V4zm4 2V4h4v2H8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-900">
                  Scope of delivery:
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  USB-C cable compatible with this smartphone
                </p>
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div>
            {/* Color selection */}
            <div className="mb-4 mt-16">
              <div className="flex justify-between mb-1">
                <label className="text-sm text-[#777874] font-bold">
                  Color
                </label>
              </div>
              <div className="relative">
                <select className="w-full border border-[#ededed] rounded p-2 pr-8 appearance-none bg-white">
                  <option value={product.color} disabled selected>
                    {product.color}
                  </option>
                  {["blue", "red", "pink", "green"]
                    .filter((color) => color !== product.color) // Remove current color from list
                    .map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Storage space */}
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <label className="text-sm text-[#777874] font-bold">
                  Storage space
                </label>
              </div>
              <div className="relative">
                <select className="w-full border border-[#ededed] rounded p-2 pr-8 appearance-none bg-white">
                  <option value={product.storage} disabled selected>
                    {product.storage}
                  </option>
                  {["128", "256", "512"]
                    .filter((storage) => storage !== product.storage)
                    .map((storage) => (
                      <option key={storage} value={storage}>
                        {storage}
                      </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Choose optics */}
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <label className="text-sm text-[#777874] font-bold">
                  Choose optics{" "}
                  <span className="text-sm text-[#5a47b2] cursor-pointer underline">
                    (Info)
                  </span>
                </label>
              </div>
              <div className="relative">
                <select className="w-full border border-[#ededed] rounded p-2 pr-8 appearance-none bg-white">
                  <option>Excellent</option>
                  <option>Very good</option>
                  <option>Good</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Select battery */}
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <label className="text-sm text-[#777874] font-bold">
                  Select battery{" "}
                  <span className="text-sm text-[#5a47b2] cursor-pointer underline">
                    (Info)
                  </span>
                </label>
              </div>
              <div className="relative">
                <select className="w-full border border-[#ededed] rounded p-2 pr-8 appearance-none bg-white">
                  <option>Optimal</option>
                  <option>New</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* SIM */}
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <label className="text-sm text-[#777874] font-bold">SIM</label>
              </div>
              <div className="relative">
                <select
                  className="w-full border border-[#ededed] rounded p-2 pr-8 appearance-none bg-white"
                  disabled
                >
                  <option>Dual SIM (eSIM, Nano-SIM)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Warranty information */}
            <div className="mb-4 pb-3 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 font-semibold">
                  Included warranty from the dealer:
                </span>
                <span className="flex items-center text-sm text-[#5f9786]">
                  <FaCheckCircle className="mr-1" />
                  12 months
                </span>
              </div>
            </div>

            {/* Extended warranty options */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 font-semibold">
                  Extended warranty
                  <span className="text-sm text-[#5a47b2] cursor-pointer underline">
                    (What is insured?)
                  </span>
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="warranty-18"
                      className="mr-2 w-5 h-5 border-2 border-[#5a47b2] rounded focus:ring-[#5a47b2] hover:border-white cursor-pointer"
                    />
                    <label htmlFor="warranty-18" className="text-sm">
                      extend by 18 months
                    </label>
                  </div>
                  <span className="text-sm text-gray-600">+19.99 €</span>
                </div>
                <div className="text-xs text-gray-500 ml-5">
                  30 months insured (12 + 18)
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="warranty-18"
                      className="mr-2 w-5 h-5 border-2 border-[#5a47b2] rounded focus:ring-[#5a47b2] hover:border-white cursor-pointer"
                    />
                    <label htmlFor="warranty-18" className="text-sm">
                      extend by 30 months
                    </label>
                  </div>
                  <span className="text-sm text-gray-600">+32.99 €</span>
                </div>
                <div className="text-xs text-gray-500 ml-5">
                  42 months insured (12 + 30)
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Best Deal Heading */}
            <div className="mb-2 mt-14">
              <h1 className="text-sm font-semibold text-white bg-[#125d59] inline-block px-2">
                Bester deal
              </h1>
            </div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-3xl font-semibold text-[#0e8460]">
                {product.currentPrice || "N/A"} €
              </h2>
              <div className="text-right">
                <div className="flex items-center justify-end text-[#0e8460] font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  in stock
                </div>
              </div>
            </div>

            <div className="text-sm mb-4 text-gray-500">
              Old Price:{" "}
              <span className="line-through">
                {product.oldPrice || "N/A"} €
              </span>
              {product.oldPrice && product.currentPrice
                ? ` (-${Math.round(
                    ((product.oldPrice - product.currentPrice) /
                      product.oldPrice) *
                      100,
                  )}%)`
                : ""}
            </div>

            {/* Compare products link */}
            <div className="flex items-center mb-4 hover:opacity-80 transition-opacity duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#5a47b2] mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              <a
                href="#"
                className="text-[#5a47b2] font-bold underline text-base "
              >
                Compare with similar products
              </a>
            </div>

            {/* PayPal installments */}
            <div className="mb-2">
              <div className="flex items-center text-sm">
                <span>Pay in 3, 6, 12 or 24 monthly installments with</span>
                <img src={paypal} alt="PayPal" className="h-12 ml-2" />
                <span className="ml-1 text-blue-600 cursor-pointer">ⓘ</span>
              </div>
            </div>

            {/* Old device banner */}
            <div className="bg-[#f4ebff] p-2 mb-4 rounded">
              <div className="flex items-center text-[#5a47b2]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium text-[#5a47b2] underline">
                  Do you still need your old device?
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-1">
                <div className="w-6 h-6 mr-2 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <h2 className="font-medium text-gray-900">
                  Including shipping costs
                </h2>
              </div>
              <div className="text-[#bf7c34] text-sm font-bold ml-8">
                Fast delivery (1-2 business days)
              </div>
              <div className="text-xs text-gray-500 ml-8">May 14 - May 15</div>
            </div>

            {/* Feature grid with appropriate icons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {/* Works like new */}
              <div className="flex items-center text-sm">
                <div className="w-5 h-5 mr-2 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12l2 2 6-6" />
                  </svg>
                </div>
                <span className="text-gray-800">Works like new</span>
              </div>

              {/* 30 days free return */}
              <div className="flex items-center text-sm">
                <div className="w-5 h-5 mr-2 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 16v-6h-4M4 8v6h4" />
                    <path d="M4 12h16" />
                    <path d="M17 3l3 3-3 3" />
                    <path d="M7 21l-3-3 3-3" />
                  </svg>
                </div>
                <span className="text-gray-800">30 days free return</span>
              </div>

              {/* Min. 12 months warranty */}
              <div className="flex items-center text-sm">
                <div className="w-5 h-5 mr-2 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.2 7-6.2-4.6-6.2 4.6 2.2-7-6-4.6h7.6z" />
                  </svg>
                </div>
                <span className="text-gray-800">Min. 12 months warranty</span>
              </div>

              {/* Flexible payment methods */}
              <div className="flex items-center text-sm">
                <div className="w-5 h-5 mr-2 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
                <span className="text-gray-800">Flexible payment methods</span>
              </div>

              {/* Promotion of environmental protection projects */}
              <div className="flex items-center text-sm">
                <div className="w-5 h-5 mr-2 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <span className="text-gray-800">
                  Promotion of environmental protection projects
                </span>
              </div>

              {/* More environmentally friendly than new */}
              <div className="flex items-center text-sm">
                <div className="w-5 h-5 mr-2 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M12 22c6.5-6 8-12 8-16.5a6 6 0 00-6-5.5c-2.5 0-4.5 2-6 3.5C6.5 2 4.5 0 2 0a6 6 0 00-6 5.5c0 4.5 1.5 10.5 8 16.5z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M8 14l3 3 5-5" />
                  </svg>
                </div>
                <span className="text-gray-800">
                  More environmentally friendly than new
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <button
                onClick={() => handleAddToCart(product.id)}
                className="w-full bg-indigo-900 text-white py-3 rounded font-medium hover:bg-indigo-800"
              >
                Add to Cart
              </button>

              <button className="w-full bg-white border border-indigo-900 text-indigo-900 py-3 rounded font-medium hover:bg-indigo-50">
                Order now - pay in installments
              </button>
            </div>

            <div className="flex flex-col items-center mt-16">
              <div className="flex items-center gap-1">
                <p className="text-sm font-medium text-black">
                  Sales & Shipping:
                </p>
                <a
                  href="#"
                  className="text-sm font-bold text-[#5a47b2] underline"
                >
                  mobilshop3000
                </a>
                <span className="text-gray-800">|</span>
                <a href="#" className="text-sm text-[#5a47b2]">
                  All Offers
                </a>
              </div>
              <div className="w-full text-xs mt-1">
                <span className="text-[#0e8460] ">
                  Less CO<sub>2</sub> emissions - domestic shipment.
                </span>
                <span className="text-gray-600">
                  {" "}
                  <b>Shipping from:</b> Germany
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#e5e5e3] mt-10 p-4 flex justify-end">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">Secure Transaction</span>
          </div>
          <div className="flex items-center space-x-4">
            <img src={visaLogo} alt="Visa" className="h-6" />
            <img src={mastercardLogo} alt="Mastercard" className="h-6" />
            <img src={applePayLogo} alt="Apple Pay" className="h-6" />
            <img src={googlePayLogo} alt="Google Pay" className="h-6" />
            <img src={paypalLogo} alt="PayPal" className="h-6" />
            <img src={klarnaLogo} alt="Klarna" className="h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
