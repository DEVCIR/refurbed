import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import visaLogo from "../../assets/payment-logos/visa_white.svg";
import mastercardLogo from "../../assets/payment-logos/mastercard.svg";
import applePayLogo from "../../assets/payment-logos/pay_apple_pay.svg";
import googlePayLogo from "../../assets/payment-logos/pay_google_pay.svg";
import paypalLogo from "../../assets/payment-logos/pay_paypal_logo.svg";
import klarnaLogo from "../../assets/payment-logos/klarna.svg";

import playStoreLogo from "../../assets/logos/play_store.svg";
import appStoreLogo from "../../assets/logos/app_store.svg";
import trustPilotLogo from "../../assets/bcorp.webp";

const Footer = () => {
  return (
    <footer className="bg-black text-custom-light-text">
      <div className="w-[95%] py-8 md:py-12">
        {/* Footer */}
        <div className="max-w-7xl mx-auto">
          {/* Top section with logo and social links */}
          <div className="flex justify-between items-center mb-12">
            <div className="text-lg sm:text-xl font-light text-custom-grey-text">
              RETHINK NEW.
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm hidden md:block font-light text-custom-grey-text">
                FOLLOW US
              </span>
              <div className="flex gap-4">
                <Link to="/">
                  <FaFacebookF className="w-5 h-5 cursor-pointer hover:text-gray-300" />
                </Link>
                <Link to="/">
                  <FaInstagram className="w-5 h-5 cursor-pointer hover:text-gray-300" />
                </Link>
                <Link to="/">
                  <FaYoutube className="w-5 h-5 cursor-pointer hover:text-gray-300" />
                </Link>
                <Link to="/">
                  <FaTwitter className="w-5 h-5 cursor-pointer hover:text-gray-300" />
                </Link>
                <Link to="/">
                  <FaLinkedinIn className="w-5 h-5 cursor-pointer hover:text-gray-300" />
                </Link>
              </div>
            </div>
          </div>

          {/* Main footer content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            {/* Company Section */}
            <div>
              <h3 className="font-light text-custom-grey-text mb-4">COMPANY</h3>
              <ul className="space-y-2 font-normal text-sm">
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Why refurbed
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Refurbishing Process
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Press
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Engineering
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help Section */}
            <div>
              <h3 className="font-light text-custom-grey-text mb-4">HELP</h3>
              <ul className="space-y-2 font-normal text-sm">
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Product Appearance
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Return
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Warranty Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-gray-300">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Delivery Status
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Become a Supplier
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="font-light text-custom-grey-text mb-4">
                FREE HOTLINE
              </h3>
              <div className="space-y-2 font-normal text-sm">
                <div className="text-2xl font-semibold">1800 851 212</div>
                <div className="flex gap-2">
                  <span>Mon - Fri</span>
                  <span>09:00 - 17:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment and App Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Payment Options */}
            <div>
              <h3 className="font-light text-custom-grey-text mb-4">
                PAYMENT OPTIONS
              </h3>
              <div className="flex flex-wrap gap-2">
                <img src={visaLogo} alt="Visa" className="w-12 h-8" />
                <img src={mastercardLogo} alt="Mastercard" className="w-12 h-8" />
                <img src={applePayLogo} alt="Apple Pay" className="w-12 h-8" />
                <img src={googlePayLogo} alt="Google Pay" className="w-12 h-8" />
                <img src={paypalLogo} alt="PayPal" className="w-12 h-8" />
                <img src={klarnaLogo} alt="Klarna" className="w-12 h-8" />
              </div>
            </div>

            {/* App Download */}
            <div>
              <h3 className="font-light text-custom-grey-text mb-4">
                GET THE REFURBED APP
              </h3>
              <div className="flex gap-4">
                <img src={playStoreLogo} alt="Google Play Store" className="w-32 h-10" />
                <img src={appStoreLogo} alt="Apple App Store" className="w-32 h-10" />
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="font-light text-custom-grey-text mb-4">REVIEWS</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <img src={trustPilotLogo} alt="" className="w-26" />
                </div>
                <div>140446 Reviews</div>
              </div>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="text-sm flex flex-wrap gap-4 pt-8 border-t border-gray-800">
            <span>© Refurbed Marketplace GmbH</span>
            <Link to="/" className="hover:text-gray-300">
              T&C
            </Link>
            <Link to="/" className="hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-gray-300">
              Imprint
            </Link>
            <Link to="/" className="hover:text-gray-300">
              Legal Notices
            </Link>
            <Link to="/" className="hover:text-gray-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;