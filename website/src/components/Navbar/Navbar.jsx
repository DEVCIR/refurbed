import { CiShoppingCart, CiUser, CiSearch } from "react-icons/ci";
import logo from "../../assets/logos/refurbed-logo.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartData = useSelector((state) => state.cart.cartData);
  const totalQty = cartData.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-7 py-4">
        {/* Logo and Links */}
        <div className="flex justify-between md:justify-start w-full md:max-w-fit gap-10">
          <div className="flex items-center text-[#2E2A85] font-bold text-2xl">
            <Link to="/">
              <img
                src={logo}
                alt="Brand logo"
                className="w-20 md:w-24 lg:w-28"
              />
            </Link>
          </div>

          <div className="flex items-center gap-6 text-custom-pri font-normal text-sm">
            <Link to="/products" className="hover:text-custom-pri-light">
              products
            </Link>
            <Link to="/" className="hover:text-custom-pri-light">
              Sell
            </Link>
            <Link to="/" className="hover:text-custom-pri-light">
              Help
            </Link>
            <Link to="/blog" className="hover:text-custom-pri-light">
              Blogs
            </Link>
            <Link to="/claim_refund" className="hover:text-custom-pri-light">
              Refund
            </Link>
          </div>
        </div>

        {/* Search + Icons */}
        <div className="flex items-center justify-between gap-6 w-full">
          <div className="flex items-center w-full md:w-[70%] md:ml-auto border border-gray-300 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 text-gray-600 focus:outline-none"
            />
            <button className="px-4">
              <CiSearch className="text-black" />
            </button>
          </div>

          <div className="flex items-center gap-4 text-custom-pri">
            <Link to="/account">
              <CiUser className="text-xl cursor-pointer hover:text-custom-pri-light" />
            </Link>
            <div className="relative">
              <Link to="/cart">
                <CiShoppingCart className="text-xl cursor-pointer hover:text-custom-pri-light" />
                {totalQty > 0 && (
                  <span className="absolute -top-1 -right-1 bg-custom-pri text-white text-[8px] min-w-[12px] h-[12px] flex items-center justify-center rounded-full px-1 font-bold">
                    {totalQty}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
