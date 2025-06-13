import { useState } from "react";
import { Link } from "react-router-dom";
import AccountOrders from "./AccountOrders";
import AccountRequests from "./AccountRequests";
import AccountSales from "./AccountSales";
import ChangePassword from "./ChangePassword";

const AccountOptions = () => {
  const [loggedEmail, setLoggedEmail] = useState("placeholder@gmail.com");
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="container ">
      <div className="flex justify-between items-center text-xs sm:text-sm mb-3 lg:mb-0">
        <div className="hidden lg:block text-gray-700">
          <Link to="/">Home</Link> &gt;{" "}
          <span className="text-custom-dark-text font-medium">{activeTab}</span>
        </div>
        <div className="text-custom-dark-text py-4 font-semibold">
          Logged in as: <span className="font-normal">{loggedEmail}</span>{" "}
          <span className="ml-4 text-custom-accent cursor-pointer">
            Log out
          </span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row min-h-[90dvh]">
        {/* Sidebar */}
        <aside className="w-full lg:w-[20%] lg:py-6 border-b lg:border-b-0">
          <h2 className="hidden lg:block text-lg font-semibold mb-6">
            Account
          </h2>
          <ul className="flex justify-between lg:flex-col md:gap-4 lg:gap-2 overflow-x-auto text-xs sm:text-sm md:font-medium">
            <li
              className={`whitespace-nowrap w-full text-center lg:text-start px-3 md:px-4 py-2 cursor-pointer lg:hover:bg-gray-100 lg:hover:rounded ${
                activeTab === "orders"
                  ? "lg:bg-gray-100 lg:rounded border-b-2 border-custom-pri-light lg:border-b-0"
                  : ""
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </li>
            <li
              className={`whitespace-nowrap w-full text-center lg:text-start px-3 md:px-4 py-2 cursor-pointer lg:hover:bg-gray-100 lg:hover:rounded ${
                activeTab === "requests"
                  ? "lg:bg-gray-100 lg:rounded border-b-2 border-custom-pri-light lg:border-b-0"
                  : ""
              }`}
              onClick={() => setActiveTab("requests")}
            >
              Requests
            </li>
            <li
              className={`whitespace-nowrap w-full text-center lg:text-start px-3 md:px-4 py-2 cursor-pointer lg:hover:bg-gray-100 lg:hover:rounded ${
                activeTab === "sales"
                  ? "lg:bg-gray-100 lg:rounded border-b-2 border-custom-pri-light lg:border-b-0"
                  : ""
              }`}
              onClick={() => setActiveTab("sales")}
            >
              My sales
            </li>
            <li
              className={`whitespace-nowrap w-full text-center lg:text-start px-3 md:px-4 py-2 cursor-pointer lg:hover:bg-gray-100 lg:hover:rounded ${
                activeTab === "change password"
                  ? "lg:bg-gray-100 lg:rounded border-b-2 border-custom-pri-light lg:border-b-0"
                  : ""
              }`}
              onClick={() => setActiveTab("change password")}
            >
              Change password
            </li>
          </ul>
        </aside>

        <main className="flex-1 lg:px-6 py-6">
          {activeTab === "orders" && <AccountOrders />}
          {activeTab === "requests" && (
            <AccountRequests setActiveTab={setActiveTab} />
          )}
          {activeTab === "sales" && <AccountSales />}
          {activeTab === "change password" && <ChangePassword />}
        </main>
      </div>
    </div>
  );
};

export default AccountOptions;
