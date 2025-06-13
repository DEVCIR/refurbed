import React from "react";

const ChangePassword = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Change Password</h1>

      <form className="w-full max-w-md py-6 space-y-6">
        <div className="relative">
          <label
            htmlFor="password"
            className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-700"
          >
            Password *
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 rounded-md px-3 pt-3 pb-1 h-10 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="repeat-password"
            className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-700"
          >
            Repeat password *
          </label>
          <input
            type="password"
            id="repeat-password"
            className="w-full border border-gray-300 rounded-md px-3 pt-3 pb-1 h-10 outline-none focus:ring-1 focus:ring-custom-pri-light"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-custom-pri-light text-white font-semibold py-3 rounded-lg hover:bg-custom-pri transition-colors"
        >
          Save
        </button>
      </form>
    </>
  );
};

export default ChangePassword;
