import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import BorderButton from "@/components/BorderButton/Index";
import { Link } from "react-router-dom";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full container py-8 text-custom-dark-text font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-sm mb-4">
        <Link to="/" className="text-gray-600 cursor-pointer underline">
          Home
        </Link>
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <MdOutlineEmail className="text-lg" />
            <span>service@refurbed.ie</span>
          </div>
          <div className="flex items-center space-x-1">
            <FiPhone className="text-lg" />
            <span>1800 851 212</span>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6">We’re delighted to help</h1>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#efe4ff] p-6 rounded-md">
          <h2 className="font-semibold text-lg mb-2">
            Questions regarding your order?
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            Do you have a question regarding your order? In order for us to help
            you in the quickest way possible, please create a new inquiry in the
            customer area.
          </p>
          <button className="bg-custom-pri-light text-white font-semibold px-6 py-3 rounded-md text-sm hover:bg-custom-pri">
            Ask about your Order
          </button>
        </div>

        <div className="border border-gray-300 p-6 rounded-md">
          <h2 className="font-semibold text-lg mb-2">
            Questions regarding shipping or returns?
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            We have compiled all frequently asked questions on a dedicated page.
            Check to see if your question is among them.
          </p>
          <BorderButton>Go to answers</BorderButton>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="border border-gray-300 p-6 rounded-md">
          <h2 className="font-semibold text-lg mb-2">General Questions?</h2>
          <p className="text-sm text-gray-700 mb-4">
            Do you have a general question, problem, or suggestion? You can
            contact us by email, phone, or by filling out the contact form
            below.
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="* First name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="* Surname"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="* Email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                onChange={handleChange}
              />
              <input
                type="number"
                name="phone"
                value={formData.phone}
                placeholder="Telephone Number"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                onChange={handleChange}
              />
            </div>

            <textarea
              rows="4"
              name="message"
              value={formData.message}
              placeholder="* Message"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              onChange={handleChange}
            ></textarea>

            <button
              type="submit"
              className="bg-custom-pri-light text-white font-semibold px-6 py-2 rounded-md text-sm hover:bg-custom-pri"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="border border-gray-300 p-6 rounded-md flex items-center max-h-fit">
          <div>
            <h2 className="font-semibold text-lg mb-2">
              Contact us via all standards channels
            </h2>
            <p className="text-sm text-gray-700">
              Use our contact form, call us at <strong>1800 851 212</strong> or
              write an email:{" "}
              <a
                href="mailto:service@refurbed.ie"
                className="text-[#3e2f7f] underline"
              >
                service@refurbed.ie
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
