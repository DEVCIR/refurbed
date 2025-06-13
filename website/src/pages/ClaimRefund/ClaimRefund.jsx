import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import { connect } from "react-redux";
import { Search } from "lucide-react";
import GenerateCreditNote from "./generateCreditNote";

const ClaimRefund = (props) => {
  document.title = "Credit Note";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [reasons, setReasons] = useState({}); 
  const [showCreditNote, setShowCreditNote] = useState(false);
  const [selectedItemsData, setSelectedItemsData] = useState([]);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      
      const queryParams = [];
      
      if (name) queryParams.push(`name=${encodeURIComponent(name)}`);
      if (email) queryParams.push(`email=${encodeURIComponent(email)}`);
      if (invoiceNumber) queryParams.push(`invoice_number=${encodeURIComponent(invoiceNumber)}`);
      
      const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
      
      const response = await fetch(`https://admin.mobileswholesale.co.uk/api/invoices${queryString}`);
      const data = await response.json();
      
      if (data.data.data.length > 0) {
        setCustomerData(data.data.data);
        toast.success("Customer data found successfully!");
  
        const orderIds = data.data.data.map(invoice => invoice.order_id);
        const orderItemsPromises = orderIds.map(orderId => 
          fetch(`https://admin.mobileswholesale.co.uk/api/order-items?order_id=${orderId}`).then(res => res.json())
        );
  
        const orderItemsResults = await Promise.all(orderItemsPromises);
        const allOrderItems = orderItemsResults.flatMap(result => result.data.data);
        setOrderItems(allOrderItems);
        setSelectedItems([]);
        setReasons({});
      } else {
        setCustomerData(null);
        setOrderItems([]);
        setSelectedItems([]);
        setReasons({});
        toast.error("No customer available with the provided information");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  const handleGenerate = () => {
    const itemsData = selectedItems.map(id => {
      const item = orderItems.find(item => item.inventory?.id === id);
      return {
        inventory_id: id,
        quantity: item?.quantity,
        reason: reasons[id] || "",
        product_name: item?.inventory?.variant?.product?.model_name,
        total_price: item?.total_price
      };
    });
    
    setSelectedItemsData(itemsData);
    setShowCreditNote(true);
  };

  const handleCheckboxChange = (inventoryId) => {
    setSelectedItems(prevSelected => {
      if (prevSelected.includes(inventoryId)) {
        const newReasons = {...reasons};
        delete newReasons[inventoryId];
        setReasons(newReasons);
        return prevSelected.filter(id => id !== inventoryId);
      } else {
        setReasons(prev => ({...prev, [inventoryId]: ""}));
        return [...prevSelected, inventoryId];
      }
    });
  };

  const handleReasonChange = (inventoryId, value) => {
    setReasons(prev => ({
      ...prev,
      [inventoryId]: value
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {showCreditNote ? (
        <GenerateCreditNote 
          customerData={customerData} 
          selectedItems={selectedItemsData}
          onBack={() => setShowCreditNote(false)}
        />
      ) : (
        <div className="w-full max-w-screen-4xl mx-auto space-y-6">
          {/* Search Section - Updated layout */}
          <div className="bg-white rounded-xl mt-10 shadow-md overflow-hidden border border-gray-200 w-full max-w-screen-4xl mx-auto">
            <div className="bg-custom-pri px-6 py-4">
              <h1 className="text-xl font-bold text-white">Find Your Order</h1>
              <p className="text-blue-100">Verify your purchase to begin the refund process</p>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap items-end gap-4">
                <div className="flex-grow min-w-48">
                  <label htmlFor="name-input" className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name
                  </label>
                  <input
                    id="name-input"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter customer name"
                  />
                </div>

                <div className="flex-grow min-w-48">
                  <label htmlFor="email-input" className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Email
                  </label>
                  <input
                    id="email-input"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter customer email"
                  />
                </div>
                
                <div className="flex-grow min-w-48">
                  <label htmlFor="invoice-input" className="block text-sm font-medium text-gray-700 mb-1">
                    Invoice Number
                  </label>
                  <input
                    id="invoice-input"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    placeholder="Enter invoice number"
                  />
                </div>
                
                <button
                  className={`px-6 py-2 h-10 rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2
                    ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-custom-pri-light hover:bg-custom-pri shadow-md'}`}
                  onClick={handleSearch}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search size={18} />
                      Search
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {customerData && (
            <div className="space-y-6">
              {/* Customer Invoices Section */}
  
  <div className="bg-white rounded-xl shadow-md mt-20 overflow-hidden border border-gray-200 w-full max-w-screen-4xl mx-auto">
    <div className="w-full max-w-8xl bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      {/* Card Header */}
      <div className="bg-custom-pri px-6 py-4">
        <h2 className="text-lg font-bold text-white">INVOICE #{customerData[0]?.invoice_number}</h2>
        <p className="text-pink-100">{customerData[0]?.customer.user.name}'s Order</p>
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-700">Customer Email</p>
              <p className="text-gray-800">{customerData[0]?.customer.user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Payment Method</p>
              <p className="text-gray-800">{customerData[0]?.order.payment_method}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-sm text-gray-700">Order Total</p>
              <p className="text-gray-800">${customerData[0]?.order.total_amount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-700">Discount</p>
              <p className="text-gray-800">${customerData[0]?.order.discount_amount}</p>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3">
              <p className="text-sm font-semibold text-gray-700">Grand Total</p>
              <p className="text-lg font-bold text-gray-800">${customerData[0]?.order.grand_total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


              {orderItems.length > 0 && (
                
  <div className="space-y-6">
  {/* Order Items Section */}
  <div className="bg-white mt-20 rounded-xl shadow-md overflow-hidden border border-gray-200">
    <div className="bg-custom-pri px-6 py-4">
      <h1 className="text-xl font-bold text-white">Order Items</h1>
      <p className="text-blue-100">Select items for credit note</p>
    </div>
    
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orderItems.map((item, index) => (
          <div key={`item-${index}`} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Product Image */}
            <div className="relative h-48 bg-gray-200 flex items-center justify-center">
              <img 
                src={`http://localhost:8000/storage/${item.inventory?.variant?.product?.feature_imageUrl}`} 
                className="h-40 w-auto object-contain"
                alt="Product"
              />
              <div className="absolute top-3 left-3">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  checked={selectedItems.includes(item.inventory?.id)}
                  onChange={() => handleCheckboxChange(item.inventory?.id)}
                />
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {item.inventory?.variant?.product?.model_name}
              </h3>
              
              <div className="flex justify-between items-center mt-3">
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="font-medium">{item.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">${item.total_price}</p>
                </div>
              </div>
              
              {selectedItems.includes(item.inventory?.id) && (
                <div className="mt-3">
                  <label className="block text-sm text-gray-500 mb-1">Reason for return</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 text-sm"
                    value={reasons[item.inventory?.id] || ""}
                    onChange={(e) => handleReasonChange(item.inventory?.id, e.target.value)}
                    placeholder="Enter reason"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {selectedItems.length > 0 && (
    <div className="flex justify-end">
      <button
        className="px-6 py-2.5 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 font-medium
          bg-custom-pri-light hover:bg-custom-pri transition-all shadow-md"
        onClick={handleGenerate}
      >
        Generate Credit Note
      </button>
    </div>
  )}
</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default connect(null)(ClaimRefund);