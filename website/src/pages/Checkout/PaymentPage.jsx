import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, CreditCard, Check, ArrowLeft, Calendar, CreditCardIcon, Shield, AlertCircle } from "lucide-react";
import blogImg from "../../assets/product-images/tablets.webp";

export default function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState(null);
    const [billingInfo, setBillingInfo] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState("pending"); 
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [errors, setErrors] = useState({});
  
    useEffect(() => {
      if (!location.state?.orderData) {
        navigate('/checkout');
      } else {
        setOrderData(location.state.orderData);
        setBillingInfo(location.state.billingInfo || {});
        
        // Pre-fill cardholder name with billing name if available
        if (location.state.billingInfo?.firstName && location.state.billingInfo?.lastName) {
          setCardName(`${location.state.billingInfo.firstName} ${location.state.billingInfo.lastName}`);
        }
      }
    }, [location.state, navigate]);
  
    if (!orderData) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }
  
    const originalPrice = orderData.items.reduce((total, item) => total + (item.currentPrice * item.quantity), 0);
    const savings = orderData.voucherApplied ? orderData.discountAmount : 0;
    const tax = 100;
    const total = originalPrice - savings + tax;
  
    const formatCardNumber = (value) => {
      // Remove all non-digits
      const digits = value.replace(/\D/g, '');
      // Add space after every 4 digits
      const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
      // Limit to 19 characters (16 digits + 3 spaces)
      return formatted.slice(0, 19);
    };
  
    const formatExpiryDate = (value) => {
      // Remove all non-digits
      const digits = value.replace(/\D/g, '');
      // Format as MM/YY
      if (digits.length > 2) {
        return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
      }
      return digits;
    };
  
    const handleCardNumberChange = (e) => {
      const formatted = formatCardNumber(e.target.value);
      setCardNumber(formatted);
    };
  
    const handleExpiryDateChange = (e) => {
      const formatted = formatExpiryDate(e.target.value);
      setExpiryDate(formatted);
    };
  
    const validateForm = () => {
      const newErrors = {};
      
      // Card number validation (should be 16 digits without spaces)
      if (!cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number";
      }
      
      // Card name validation
      if (!cardName.trim()) {
        newErrors.cardName = "Please enter the cardholder name";
      }
      
      // Expiry date validation (should be in MM/YY format)
      if (!expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        newErrors.expiryDate = "Please enter a valid expiry date (MM/YY)";
      } else {
        // Check if card is not expired
        const [month, year] = expiryDate.split('/');
        const expiryDateObj = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const currentDate = new Date();
        
        if (expiryDateObj < currentDate) {
          newErrors.expiryDate = "Card has expired";
        }
      }
      
      // CVV validation (should be 3 or 4 digits)
      if (!cvv.match(/^\d{3,4}$/)) {
        newErrors.cvv = "Please enter a valid CVV (3-4 digits)";
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handlePaymentSubmit = (e) => {
      e.preventDefault();
      
      if (!validateForm()) {
        return;
      }
      
      setPaymentStatus("processing");
      
      setTimeout(() => {
        setPaymentStatus("success");
        
        setTimeout(() => {
          navigate('/order-success', { 
            state: { 
              orderData,
              billingInfo,
              orderNumber: Math.floor(100000 + Math.random() * 900000).toString(),
              paymentDetails: {
                last4: cardNumber.slice(-4),
                cardType: getCardType(cardNumber)
              }
            } 
          });
        }, 2000);
      }, 3000);
    };
  
    const getCardType = (cardNumber) => {
      const cleanNumber = cardNumber.replace(/\s/g, '');
      
      if (cleanNumber.startsWith('4')) {
        return 'Visa';
      } else if (/^5[1-5]/.test(cleanNumber)) {
        return 'MasterCard';
      } else if (/^3[47]/.test(cleanNumber)) {
        return 'American Express';
      } else if (/^6(?:011|5)/.test(cleanNumber)) {
        return 'Discover';
      } else {
        return 'Unknown';
      }
    };
  
    const goBack = () => {
      navigate(-1);
    };
  
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="mx-auto px-4 w-full">
          <button 
            onClick={goBack}
            className="flex items-center text-blue-600 mb-6 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to checkout
          </button>
          
          <h1 className="text-3xl font-semibold text-gray-900 mb-8 tracking-tight">
          Complete Your Payment
  <span className="block w-20 mt-2 h-1 bg-blue-600"></span>
</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left side - Payment form */}
            <div className="w-full lg:w-8/12">
              {paymentStatus === "success" ? (
                <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
                  <p className="text-gray-600 mb-6">Your order has been processed successfully.</p>
                  <p className="text-gray-500">Redirecting to order confirmation...</p>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-6">
                    <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                    Card Payment
                  </h2>
                  
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start">
                    <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                    <p className="text-sm text-blue-700">
                      Your payment information is secured with SSL encryption. We do not store your card details.
                    </p>
                  </div>
                  
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number*</label>
                      <div className={`relative ${errors.cardNumber ? 'shake' : ''}`}>
                        <input 
                          type="text" 
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456" 
                          className={`pl-10 block w-full px-3 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                          maxLength={19}
                        />
                        <CreditCardIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                      {errors.cardNumber && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name*</label>
                      <input 
                        type="text" 
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Smith" 
                        className={`block w-full px-3 py-2 border ${errors.cardName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                      />
                      {errors.cardName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.cardName}
                        </p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date*</label>
                        <div className={`relative ${errors.expiryDate ? 'shake' : ''}`}>
                          <input 
                            type="text" 
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            placeholder="MM/YY" 
                            className={`pl-10 block w-full px-3 py-2 border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                            maxLength={5}
                          />
                          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        {errors.expiryDate && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.expiryDate}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV*</label>
                        <input 
                          type="password" 
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                          placeholder="123" 
                          className={`block w-full px-3 py-2 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                          maxLength={4}
                        />
                        {errors.cvv && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.cvv}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={paymentStatus === "processing"}
                      className={`mt-2 w-full text-white py-3 px-4 rounded-md font-medium flex items-center justify-center transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] ${
                        paymentStatus === "processing" 
                          ? "bg-blue-400 cursor-not-allowed" 
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {paymentStatus === "processing" ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          Pay €{total.toFixed(2)}
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
            
            {/* Right side - Order summary */}
            <div className="w-full lg:w-4/12">
              <div className="sticky top-8">              
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Order summary</h2>
                  
                  <div className="space-y-4 max-h-60 overflow-y-auto mb-4">
                    {orderData.items.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex items-start space-x-4 p-3 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex-shrink-0">
                          <img src={item.image || blogImg} alt={item.name} className="h-12 w-12 object-cover rounded-md" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs font-medium text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
                              ×{item.quantity}
                            </span>
                            <span className="text-sm font-semibold text-gray-900">
                              €{(item.currentPrice * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3 pt-3 border-t border-gray-200">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }