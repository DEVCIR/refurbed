import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Check, Package, Printer, ArrowRight, Home, Calendar, CreditCard } from 'lucide-react';
import blogImg from "../../assets/product-images/tablets.webp";

export default function OrderSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [billingInfo, setBillingInfo] = useState(null);
  const [estimatedDelivery, setEstimatedDelivery] = useState(null);

  useEffect(() => {
    if (!location.state?.orderData || !location.state?.orderNumber) {
      navigate('/');
    } else {
      setOrderData(location.state.orderData);
      setOrderNumber(location.state.orderNumber);
      setPaymentDetails(location.state.paymentDetails);
      setBillingInfo(location.state.billingInfo);
      
      // Calculate estimated delivery date (5-7 days from now)
      const today = new Date();
      const minDelivery = new Date(today);
      minDelivery.setDate(today.getDate() + 5);
      
      const maxDelivery = new Date(today);
      maxDelivery.setDate(today.getDate() + 7);
      
      setEstimatedDelivery({
        min: minDelivery.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
        max: maxDelivery.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
      });
    }
  }, [location.state, navigate]);

  if (!orderData || !orderNumber) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const originalPrice = orderData.items.reduce((total, item) => total + (item.currentPrice * item.quantity), 0);
  const savings = orderData.voucherApplied ? orderData.discountAmount : 0;
  const tax = 100;
  const total = originalPrice - savings + tax;

  const printOrder = () => {
    window.print();
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
          <p className="text-lg text-gray-600">Thank you for your purchase.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row justify-between mb-6 pb-6 border-b border-gray-100">
            <div>
              <div className="text-sm text-gray-500 mb-1">Order Number</div>
              <div className="text-lg font-semibold text-gray-800">#{orderNumber}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Order Date</div>
              <div className="text-lg font-semibold text-gray-800">
                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Total Amount</div>
              <div className="text-lg font-semibold text-blue-600">€{total.toFixed(2)}</div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h2>
            
            <div className="space-y-4">
              {orderData.items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <img src={item.image || blogImg} alt={item.name} className="h-16 w-16 object-cover rounded-md" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    {item.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                    )}
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <span className="text-xs font-medium text-gray-800 bg-gray-200 px-2 py-1 rounded">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
              <div className="flex items-start mb-3">
                <Package className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-800">Shipping Information</h3>
                  <p className="text-sm text-gray-600 mt-1">Estimated delivery: {estimatedDelivery.min} - {estimatedDelivery.max}</p>
                </div>
              </div>
              
              <div className="text-sm text-gray-700">
                <p className="mb-1">{billingInfo ? `${billingInfo.firstName} ${billingInfo.lastName}` : 'John Doe'}</p>
                <p className="mb-1">{billingInfo?.address || '123 Main Street'}</p>
                <p className="mb-1">{billingInfo?.city || 'San Francisco'}</p>
                <p>{billingInfo?.country || 'United States'}</p>
              </div>
            </div>
            
            <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
              <div className="flex items-start mb-3">
                <CreditCard className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-800">Payment Information</h3>
                  <p className="text-sm text-gray-600 mt-1">Payment successful</p>
                </div>
              </div>
              
              <div className="text-sm text-gray-700">
                <p className="mb-1">{paymentDetails?.cardType || "Credit Card"}</p>
                <p className="mb-1">**** **** **** {paymentDetails?.last4 || "1234"}</p>
                <p className="mt-3 font-medium">Total paid: €{total.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
            <button 
              onClick={printOrder}
              className="flex-1 flex items-center justify-center text-gray-700 bg-gray-100 border border-gray-200 py-2.5 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors"
            >
              <Printer className="mr-2 h-5 w-5" />
              Print Order
            </button>
            
            <Link 
              to="/"
              className="flex-1 flex items-center justify-center text-white bg-blue-600 py-2.5 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">What happens next?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-4 border border-gray-200 bg-white rounded-lg hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Order Confirmation</h3>
              <p className="text-sm text-gray-600">You'll receive an email confirmation shortly.</p>
            </div>
            
            <div className="p-4 border border-gray-200 bg-white rounded-lg hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Order Processing</h3>
              <p className="text-sm text-gray-600">We'll notify you when your order ships.</p>
            </div>
            
            <div className="p-4 border border-gray-200 bg-white rounded-lg hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Order Delivery</h3>
              <p className="text-sm text-gray-600">Expected delivery in 5-7 business days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}