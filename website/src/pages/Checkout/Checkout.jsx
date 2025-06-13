import React, { useState, useEffect } from "react";
import { ChevronDown, CreditCard, Package, MapPin, Truck, Check, ShoppingCart, ChevronRight } from "lucide-react";
import blogImg from "../../assets/product-images/tablets.webp"
import { useLocation, useNavigate } from "react-router-dom";
import { countries } from 'countries-list';
import logo from "../../assets/logos/refurbed-logo.svg";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState(null);
    const [formValid, setFormValid] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (!location.state?.orderData) {
          navigate('/cart');
        } else {
          setOrderData(location.state.orderData);
        }
      }, [location.state, navigate]);
    
      const [billingType, setBillingType] = useState("individual");
      const [deliveryType, setDeliveryType] = useState("same");
      const [paymentType, setPaymentType] = useState("card");
      const [savedAddress, setSavedAddress] = useState("");
      const [country, setCountry] = useState("United States");
      const [city, setCity] = useState("San Francisco");

      useEffect(() => {
        // Simple form validation
        if (firstName && lastName && phoneNumber && address && city) {
          setFormValid(true);
        } else {
          setFormValid(false);
        }
      }, [firstName, lastName, phoneNumber, address, city]);

      if (!orderData) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
      }

      const validateForm = () => {
        const errors = {};
        
        if (!firstName.trim()) {
          errors.firstName = "First name is required";
        }
        
        if (!lastName.trim()) {
          errors.lastName = "Last name is required";
        }
        
        if (!phoneNumber.trim()) {
          errors.phoneNumber = "Phone number is required";
        } else if (!/^\d{10,}$/.test(phoneNumber.replace(/\D/g, ''))) {
          errors.phoneNumber = "Please enter a valid phone number";
        }
        
        if (!address.trim()) {
          errors.address = "Address is required";
        }
        
        if (!city.trim()) {
          errors.city = "City is required";
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
      };

      const handleContinueToPayment = () => {
        if (validateForm()) {
          navigate('/payment', { 
            state: { 
              orderData,
              billingInfo: {
                firstName,
                lastName,
                phoneNumber,
                address,
                city,
                country,
                deliveryType
              }
            } 
          });
        }
      };

  const originalPrice = orderData.items.reduce((total, item) => total + (item.currentPrice * item.quantity), 0);
  const savings = orderData.voucherApplied ? orderData.discountAmount : 0;
  const tax = 100; 
  const total = originalPrice - savings + tax;

  const countryList = Object.entries(countries).map(([code, country]) => ({
    code,
    name: country.name
})).sort((a, b) => a.name.localeCompare(b.name));
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">

              <h1 className="text-2xl font-semibold text-gray-900 mt-10 flex justify-center items-center">Checkout</h1>
<div className="w-[90%] mb-12 mt-10 mx-auto">
  <div className="flex justify-between border-b border-gray-200 pb-2">
    <div className="flex-1 text-left">
      <button className="text-lg font-semibold text-gray-500 hover:text-[#322d81] hover:border-b-2 hover:border-[#322d81] pb-1 px-3 transition-all duration-300 hover:scale-105 cursor-pointer">
        Accessories
      </button>
    </div>
    <div className="flex-1 text-center">
      <button className="text-lg font-semibold text-gray-500 hover:text-[#322d81] hover:border-b-2 hover:border-[#322d81] pb-1 px-3 transition-all duration-300 hover:scale-105 cursor-pointer">
        Cart
      </button>
    </div>
    <div className="flex-1 text-right">
      <button className="text-lg font-semibold text-[#322d81] border-b-2 border-[#322d81] pb-1 px-3 transition-all duration-300 hover:text-[#4b45ad] hover:scale-105 cursor-pointer">
        Checkout
      </button>
    </div>
  </div>
</div>

      <div className="mx-auto px-4">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8 tracking-tight">
  Delivery Info
  <span className="block w-20 mt-2 h-1 bg-blue-600"></span>
</h1>

        <div className="flex flex-col lg:flex-row gap-8">

          <div className="w-full lg:w-7/12 space-y-6">
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Billing address
              </h2>
                            
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="relative">
                  <select 
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={savedAddress}
                    onChange={(e) => setSavedAddress(e.target.value)}
                  >
                    <option value="">Choose one of your address</option>
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                  <input 
                    type="text" 
                    placeholder="Enter your first name" 
                    className={`block w-full px-3 py-2 border ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  {formErrors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                  <input 
                    type="text" 
                    placeholder="Enter your last name" 
                    className={`block w-full px-3 py-2 border ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  {formErrors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
                  )}
                </div>
              </div>
              
{/* Phone Number Field */}
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
  <div className="flex">
    <div className="relative inline-block w-36"> {/* Adjusted width for optimal display */}
      <select 
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        {Object.entries(countries)
          .map(([code, country]) => ({
            code,
            phone: country.phone,
            name: country.name,
            emoji: country.emoji
          }))
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((country) => (
            <option 
              key={country.code} 
              value={`+${country.phone}`}
            >
              {country.emoji} {country.code} +{country.phone}
            </option>
          ))
        }
      </select>
      <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
    </div>
    <input 
      type="text" 
      placeholder="123-456-7890" 
      className={`block w-full px-3 py-2 border ${formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      required
    />
  </div>
  {formErrors.phoneNumber && (
    <p className="mt-1 text-sm text-red-600">{formErrors.phoneNumber}</p>
  )}
</div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address*</label>
                <textarea 
                  placeholder="Enter here your address" 
                  rows="3" 
                  className={`block w-full px-3 py-2 border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></textarea>
                {formErrors.address && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                
              <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country*</label>
            <div className="relative">
                <select 
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                    {countryList.map((country) => (
                        <option key={country.code} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
        </div>
                
        <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
  <input
    type="text"
    value={city}
    onChange={(e) => setCity(e.target.value)}
    placeholder="Enter your city"
    className={`block w-full px-3 py-2 border ${formErrors.city ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
    required
  />
  {formErrors.city && (
    <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
  )}
</div>
              </div>
            </div>
            
            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                <Truck className="w-5 h-5 mr-2 text-blue-600" />
                Delivery address
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    name="deliveryType" 
                    checked={deliveryType === "same"} 
                    onChange={() => setDeliveryType("same")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Delivery to the same address</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    name="deliveryType" 
                    checked={deliveryType === "another"} 
                    onChange={() => setDeliveryType("another")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Delivery to another address</span>
                </label>
                                
                {deliveryType === "pickup" && (
                  <div className="pl-6 text-sm text-gray-500 italic">
                    Select the store from which you want to pick up the products!
                  </div>
                )}
              </div>
            </div>
            
            {/* Payment Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                Payment details
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    name="paymentType" 
                    checked={paymentType === "card"} 
                    onChange={() => setPaymentType("card")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Online with bank card</span>
                </label>
                                                
              </div>
            </div>
          </div>
          
          {/* Right side - Cart items and order summary */}
          <div className="w-full lg:w-5/12">
            <div className="sticky top-8">
              {/* Cart Items */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6 transition-all duration-300 hover:shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                  <ShoppingCart className="w-5 h-5 mr-2 text-blue-600" />
                  Cart Items
                </h2>
                
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {orderData.items.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-start space-x-4 p-3 border-b border-gray-100 last:border-b-0 hover:bg-blue-50 transition-colors duration-200 rounded-md"
                    >
                      <div className="flex-shrink-0">
                        <img src={item.image || blogImg} alt={item.name} className="h-16 w-16 object-cover rounded-md" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</p>
                        {item.description && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                        )}
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded">
                              ×{item.quantity}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">
                            €{(item.currentPrice * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Order summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Original price</span>
                    <span className="text-gray-800">€{originalPrice.toFixed(2)}</span>
                  </div>
                  
                  {orderData.voucherApplied && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-green-600">-€{savings.toFixed(2)}</span>
                    </div>
                  )}
                                    
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-800">€{tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="pt-3 mt-3 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-800">Total</span>
                      <span className="text-lg font-bold text-blue-600">€{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={handleContinueToPayment}
                  className={`mt-6 w-full py-3 px-4 rounded-md font-medium flex items-center justify-center transition-colors duration-300 transform hover:scale-[1.01] active:scale-[0.99] ${
                    formValid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-300 text-white cursor-not-allowed'
                  }`}
                >
                  Continue to payment
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}