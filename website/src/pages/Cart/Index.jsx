import { FaCheck } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { CgSearchLoading } from "react-icons/cg";
import logo from "@/assets/logos/refurbed-logo.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CartItem from "@/components/CartItem/Index";
import { useSelector } from "react-redux";
import CheckoutSummary from "@/components/CheckoutSummary/Index";

export default function Cart() {
  const cartData = useSelector((state) => state.cart.cartData);
  const allProducts = useSelector((state) => state.products.allProducts);

  const [cartStatus, setCartStatus] = useState("loading");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!cartData.length) {
      setCartStatus("empty");
      setCartItems([]);
    } else {
      setCartStatus("filled");
      const items = cartData
        .map(({ id, quantity }) => {
          const product = allProducts.find((p) => p.id === id);
          return product ? { ...product, quantity } : null;
        })
        .filter(Boolean);
      setCartItems(items);
    }
  }, [cartData, allProducts]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white">
      {/* Top Section */}
      <header className="w-full flex flex-col">
        {/* First row with logo and help */}
        <div className="w-full flex items-center justify-between px-6 py-4">
          <Link to="/" className="cursor-pointer">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </Link>
          <button className="text-[#584a9f] text-lg">Help</button>
        </div>

        {/* First horizontal line */}
        <hr className="border-t border-gray-200 w-full" />

        {/* Benefits row - now aligned to right */}
        <div className="w-full flex items-center justify-end py-4 bg-gray-50 px-6">
          <div className="flex flex-wrap justify-end gap-6 text-lg text-gray-600">
            <div className="flex items-center gap-1">
              <FaCheck className="text-[#336b59] text-lg" />
              Min. 12-month warranty
            </div>
            <div className="flex items-center gap-1">
              <FaCheck className="text-[#336b59] text-lg" />
              Free shipping
            </div>
            <div className="flex items-center gap-1">
              <FaCheck className="text-[#336b59] text-lg" />
              Free returns
            </div>
            <div className="flex items-center gap-1">
              <FaCheck className="text-[#336b59] text-lg" />
              Free 30-day trial
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-200 w-full" />
      </header>

      <div className="w-[90%] mb-12 mt-10">
        <div className="flex justify-between border-b border-gray-200 pb-2">
          <div className="flex-1 text-left">
            <button className="text-xl font-semibold text-gray-500 hover:text-[#322d81] hover:border-b-2 hover:border-[#322d81] pb-1 px-3 transition-all duration-300 hover:scale-105 cursor-pointer">
              Accessories
            </button>
          </div>
          <div className="flex-1 text-center">
            <button className="text-xl font-semibold text-[#322d81] border-b-2 border-[#322d81] pb-1 px-3 transition-all duration-300 hover:text-[#4b45ad] hover:scale-105 cursor-pointer">
              Cart
            </button>
          </div>
          <div className="flex-1 text-right">
            <button className="text-xl font-semibold text-gray-500 hover:text-[#322d81] hover:border-b-2 hover:border-[#322d81] pb-1 px-3 transition-all duration-300 hover:scale-105 cursor-pointer">
              Checkout
            </button>
          </div>
        </div>
      </div>

      <section className="w-full min-h-[100dvh] flex items-center py-4 bg-custom-bg2 border-b">
        {/* Cart Section */}
        {cartStatus === "empty" && (
          <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <FiShoppingCart className="text-6xl text-gray-300 mb-4" />
            <h2 className="text-2xl text-custom-dark-text font-semibold mb-6">
              Your cart is currently empty
            </h2>

            <Link to={`/products`} className="block group">
              <button className="bg-custom-pri text-white px-8 py-3 rounded-md hover:bg-custom-pri-light transition">
                Continue shopping
              </button>
            </Link>
          </main>
        )}

        {cartStatus === "loading" && (
          <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <CgSearchLoading className="text-6xl text-gray-300 mb-4" />
            <h2 className="text-2xl text-custom-grey-text font-semibold mb-6">
              Cart Items Loading...
            </h2>
          </main>
        )}

        {cartStatus === "filled" && (
          <main className="w-[95%] flex flex-row justify-center text-center mx-auto gap-8">
            <CartItem items={cartItems} />
            <CheckoutSummary data={cartItems} />
          </main>
        )}
      </section>

      <div className="w-full bg-[#322d81] text-white py-3 text-center text-xl">
        © Refurbed Marketplace GmbH | T&C | Privacy Policy | Imprint | Legal
        Notices
      </div>
    </div>
  );
}
