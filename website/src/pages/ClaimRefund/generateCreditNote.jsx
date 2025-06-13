import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const GenerateCreditNote = ({ customerData, selectedItems, onBack }) => {
  function generateRMA() {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `RMA-${date}-${random}`;
  }
  
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [customerID, setCustomerID] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [rmasNumber, setRmasNumber] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [generalReason, setGeneralReason] = useState('');

  useEffect(() => {
    setSelectedProducts(selectedItems || []);
  }, [selectedItems]);

  useEffect(() => {
    if (customerData && customerData.length > 0) {
      const customer = customerData[0];
      setInvoiceNumber(customer.invoice_number);
      setCustomerID(customer.customer_id);
      setCustomerName(customer.customer?.user?.name);
      setCustomerEmail(customer.customer?.user?.email);
      setOrderId(customer.order?.id);
    }
  }, [customerData]);

  useEffect(() => {
    if (invoiceNumber && customerID && orderId) {
      const generatedRMAS = generateRMA();
      setRmasNumber(generatedRMAS);
    }
  }, [invoiceNumber, customerID, orderId]);


  const handleCreateRMAS = async () => {
    try {
      const currentDate = new Date().toISOString().slice(0, 10);
  
      const rmasData = {
        rma_number: rmasNumber,
        customer_id: customerID,
        order_id: orderId,
        request_date: currentDate,
        status: "Requested",
        reason: generalReason || "The user has not provided any comments",
        resolved_by: 13,
        resolved_date: currentDate,
        is_active: 0
      };
  
      const rmasResponse = await fetch("https://admin.mobileswholesale.co.uk/api/rmas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rmasData)
      });
  
      if (!rmasResponse.ok) {
        throw new Error(`HTTP error! status: ${rmasResponse.status}`);
      }
  
      const rmasResult = await rmasResponse.json();
      const rmaId = rmasResult?.id; 
  
      console.log("RMAS created successfully:", rmasResult);
  
      if (rmaId) {
        for (const product of selectedProducts) {
          const rmaItemData = {
            rma_id: rmaId,
            inventory_id: product.inventory_id,
            quantity: product.quantity,
            reason: product.reason || "No reason provided",
            is_active: 0
          };
  
          const itemResponse = await fetch("https://admin.mobileswholesale.co.uk/api/rma-items", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(rmaItemData)
          });
  
          if (!itemResponse.ok) {
            console.error(`Failed to create rma item for inventory_id: ${product.inventory_id}`);
          } else {
            const itemResult = await itemResponse.json();
            console.log(`RMA item created successfully:`, itemResult);
          }
        }
      }
      
      toast.success("RMAS and associated items created successfully!");
      window.location.href = "/claim_refund";

    } catch (error) {
      console.error("Error creating RMAS or RMA items:", error);
      toast.error("An error occurred while creating RMAS.");
    }
  };

  return (
  //   <div className="p-6 bg-gray-50 min-h-screen">
  //   <div className="w-full max-w-screen-4xl mx-auto space-y-6">
  //     <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
  //       {/* Header */}
  //       <div className="bg-custom-pri px-6 py-4">
  //         <h1 className="text-2xl font-bold text-white">Generate Credit Note</h1>
  //         <p className="text-blue-100">
  //           Fill in the details below to generate a credit note.
  //         </p>
  //       </div>

  //       <div className="p-6">
  //         <div className="space-y-8">
  //           {/* Customer Information Section */}
  //           <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
  //             <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
  //               Customer Information
  //             </h2>
  //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //               <div className="space-y-2">
  //                 <label htmlFor="rmasNumber" className="block text-sm font-medium text-gray-700">
  //                   RMAS Number
  //                 </label>
  //                 <input
  //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
  //                   type="text"
  //                   id="rmasNumber"
  //                   name="rmasNumber"
  //                   value={rmasNumber}
  //                   readOnly
  //                 />
  //               </div>

  //               <div className="space-y-2">
  //                 <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700">
  //                   Invoice Number
  //                 </label>
  //                 <input
  //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
  //                   type="text"
  //                   id="invoiceNumber"
  //                   name="invoiceNumber"
  //                   value={invoiceNumber}
  //                   readOnly
  //                 />
  //               </div>

  //               <div className="space-y-2">
  //                 <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
  //                   Customer Name
  //                 </label>
  //                 <input
  //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
  //                   type="text"
  //                   id="customerName"
  //                   name="customerName"
  //                   value={customerName}
  //                   readOnly
  //                 />
  //               </div>

  //               <div className="space-y-2">
  //                 <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700">
  //                   Customer Email
  //                 </label>
  //                 <input
  //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
  //                   type="email"
  //                   id="customerEmail"
  //                   name="customerEmail"
  //                   value={customerEmail}
  //                   readOnly
  //                 />
  //               </div>
  //             </div>
  //           </div>

  //           {/* General Comments Section */}
  //           <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
  //             <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
  //               General Comments
  //             </h2>
  //             <div className="space-y-2">
  //               <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
  //                 Reason for Credit Note
  //               </label>
  //               <textarea
  //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //                 id="reason"
  //                 name="reason"
  //                 placeholder="Enter general reason for credit note"
  //                 rows="3"
  //                 value={generalReason}
  //                 onChange={(e) => setGeneralReason(e.target.value)}
  //               />
  //             </div>
  //           </div>

  //           {/* Products Section */}
  //           <div className="space-y-6">
  //             <h2 className="text-lg font-semibold text-gray-800">Products for Return</h2>
              
  //             {selectedProducts.map((item, index) => (
  //               <div key={index} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
  //                 <h3 className="text-lg font-medium text-blue-700 mb-4 flex items-center">
  //                   <span className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full">
  //                     Product {index + 1}
  //                   </span>
  //                 </h3>
                  
  //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //                   <div className="space-y-2">
  //                     <label htmlFor={`product-${index}`} className="block text-sm font-medium text-gray-700">
  //                       Product Name
  //                     </label>
  //                     <input
  //                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
  //                       id={`product-${index}`}
  //                       name={`product-${index}`}
  //                       value={item.product_name}
  //                       readOnly
  //                     />
  //                   </div>

  //                   <div className="space-y-2">
  //                     <label htmlFor={`quantity-${index}`} className="block text-sm font-medium text-gray-700">
  //                       Quantity
  //                     </label>
  //                     <input
  //                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
  //                       id={`quantity-${index}`}
  //                       name={`quantity-${index}`}
  //                       value={item.quantity}
  //                       readOnly
  //                     />
  //                   </div>

  //                   <div className="space-y-2">
  //                     <label htmlFor={`total_price-${index}`} className="block text-sm font-medium text-gray-700">
  //                       Total Price
  //                     </label>
  //                     <input
  //                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
  //                       id={`total_price-${index}`}
  //                       name={`total_price-${index}`}
  //                       value={item.total_price}
  //                       readOnly
  //                     />
  //                   </div>

  //                   <div className="space-y-2">
  //                     <label htmlFor={`reason-${index}`} className="block text-sm font-medium text-gray-700">
  //                       Product Reason
  //                     </label>
  //                     <textarea
  //                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //                       id={`reason-${index}`}
  //                       name={`reason-${index}`}
  //                       value={item.reason || ""}
  //                       onChange={(e) => {
  //                         const newProducts = [...selectedProducts];
  //                         newProducts[index].reason = e.target.value;
  //                         setSelectedProducts(newProducts);
  //                       }}
  //                       placeholder="Enter specific reason for this product"
  //                       rows="2"
  //                     />
  //                   </div>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>

  //           {/* Action Buttons */}
  //           <div className="flex justify-end space-x-4 pt-6">
  //             <button
  //               className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors font-medium"
  //               onClick={onBack}
  //             >
  //               Back
  //             </button>
  //             <button
  //               className="px-6 py-2.5 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 font-medium
  //                 bg-custom-pri hover:bg-custom-pri hover:to-blue-500 transition-all shadow-md"
  //               onClick={handleCreateRMAS}
  //             >
  //               Create RMAS
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>

  <div className="p-6 bg-gray-50 min-h-screen">
  <div className="w-full max-w-screen-4xl mx-auto space-y-6">
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-custom-pri px-6 py-4">
        <h1 className="text-2xl font-bold text-white">Generate Credit Note</h1>
        <p className="text-blue-100">
          Fill in the details below to generate a credit note.
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Customer Information Section */}
        <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Customer Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">RMAS Number</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">{rmasNumber}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Number</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">{invoiceNumber}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">{customerName}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Email</p>
              <p className="text-lg font-semibold text-gray-800 truncate mt-1">{customerEmail}</p>
            </div>
          </div>
        </div>

        {/* General Comments Section */}
        <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            General Comments
          </h2>
          
          <div className="space-y-2">
            <label htmlFor="reason" className="block text-sm font-medium text-blue-800">
              Reason for Credit Note
            </label>
            <textarea
              className="w-full px-4 py-3 text-gray-700 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-transparent bg-white shadow-sm"
              id="reason"
              name="reason"
              placeholder="Please provide the general reason for this credit note..."
              rows="4"
              value={generalReason}
              onChange={(e) => setGeneralReason(e.target.value)}
            />
          </div>
        </div>

        {/* Products Return Section */}
        <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Products for Return
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedProducts.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
                <div className="bg-custom-pri px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="bg-white text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full">
                      #{index + 1}
                    </span>
                    <span className="text-sm font-medium text-white">
                      ${item.total_price}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                    {item.product_name}
                  </h3>
                  
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Quantity</p>
                      <p className="font-medium">{item.quantity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Unit Price</p>
                      <p className="font-medium">${(item.total_price / item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor={`reason-${index}`} className="block text-xs font-medium text-gray-700">
                      Return Reason
                    </label>
                    <textarea
                      className="w-full px-3 py-2 text-sm border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-300"
                      id={`reason-${index}`}
                      name={`reason-${index}`}
                      value={item.reason || ""}
                      onChange={(e) => {
                        const newProducts = [...selectedProducts];
                        newProducts[index].reason = e.target.value;
                        setSelectedProducts(newProducts);
                      }}
                      placeholder="Specific reason for this product..."
                      rows="2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors font-medium flex items-center"
            onClick={onBack}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <button
            className="px-6 py-2.5 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 font-medium bg-custom-pri hover:bg-custom-pri-dark transition-all shadow-md flex items-center"
            onClick={handleCreateRMAS}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Create RMAS
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default GenerateCreditNote;