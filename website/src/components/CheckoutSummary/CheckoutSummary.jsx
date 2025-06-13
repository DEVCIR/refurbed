import { useEffect, useState } from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import { BiPackage } from 'react-icons/bi';
import { TbRefresh } from 'react-icons/tb';
import { Toaster, toast } from "sonner";
import confetti from 'canvas-confetti';
import { useNavigate } from "react-router-dom";

const CheckoutSummary = ({ data }) => {
  const navigate = useNavigate();
  const [showVoucherInput, setShowVoucherInput] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  const [fetchedProduct, setFetchedProduct] = useState('');
  const [currentPrice, setCurrentPrice] = useState();
  const [discountedPrice, setDiscountedPrice] = useState();
  const [inventoryID, setInventoryID] = useState();
  const [voucher, setVoucher] = useState();
  const [quantity, setQuantity] = useState();
  const [discountAmount, setDiscountAmount] = useState(0);

  let totalItems = data.reduce((acc, item) => acc + item.quantity, 0);
  let totalPrice = data.reduce((acc, item) => acc + item.currentPrice * item.quantity, 0).toFixed(2);

  useEffect(() => {
    console.log("Data of product ", data);
    setFetchedProduct(data);

    if (data && data.length > 0) {
      const price = data[0].currentPrice;
      const id = data[0].id;
      const quantity = data[0].quantity;
      setCurrentPrice(price);
      setDiscountedPrice(price); // Initially set discounted price equal to current price
      setInventoryID(id);
      setQuantity(quantity);
      console.log("Current price:", price);
      console.log("Inventory Id: ", id);
      console.log("Quantity: ", quantity);
    }
  }, [data]);

  useEffect(() => {
    if (voucher && currentPrice) {
      let calculatedDiscount = 0;
      let newDiscountedPrice = currentPrice;
      
      if (voucher.discount_type === 'percentage') {
        calculatedDiscount = currentPrice * (voucher.voucher_discount / 100);
        newDiscountedPrice = currentPrice - calculatedDiscount;
      } else if (voucher.discount_type === 'fixed') {
        calculatedDiscount = voucher.voucher_discount;
        newDiscountedPrice = currentPrice - calculatedDiscount;
      }
      
      setDiscountAmount(calculatedDiscount);
      setDiscountedPrice(newDiscountedPrice);
      
      console.log("Discount type:", voucher.discount_type);
      console.log("Discount amount:", calculatedDiscount);
      console.log("Discounted price:", newDiscountedPrice);
    }
  }, [voucher, currentPrice]);

  const runConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleVoucherClick = () => {
    setShowVoucherInput(!showVoucherInput);
    setVoucherApplied(false);
  };

  const checkVoucherCode = async (code) => {
    if (!code.trim()) {
      toast.error("Please enter a voucher code");
      return;
    }
    
    setIsChecking(true);
    
    try {
      const response = await fetch(`https://admin.mobileswholesale.co.uk/api/voucher`);
      const voucherData = await response.json();
      
      const foundVoucher = voucherData.find(voucher => 
        voucher.voucher_code.toLowerCase() === code.trim().toLowerCase()
      );
      
      if (foundVoucher) {
        runConfetti();
        setVoucherApplied(true);
        setVoucher(foundVoucher); 
        console.log("Voucher found id:", foundVoucher.id);
        console.log("Voucher discount type:", foundVoucher.discount_type);
        console.log("Voucher discount amount:", foundVoucher.voucher_discount); 
        toast.success("Voucher code is available!");
      } else {
        toast.error("Voucher code is not available");
      }
    } catch (error) {
      console.error("Error checking voucher code:", error);
      toast.error("Error checking voucher code. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleVoucherSubmit = (e) => {
    e.preventDefault();
    checkVoucherCode(voucherCode);
  };

  const generateOrderNumber = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `ORD-${randomNum}`;
  };

  // const placeOrder = async () => {
  //   setIsPlacingOrder(true);
    
  //   try {
  //     // Use discounted price if voucher is applied
  //     const priceToUse = voucherApplied ? discountedPrice : currentPrice;
      
  //     const orderData = {
  //       order_number: generateOrderNumber(),
  //       customer_id: 3,
  //       voucher_id: voucher ? voucher.id : null,
  //       order_date: new Date().toISOString().split('T')[0], 
  //       status: "Pending",
  //       total_amount: currentPrice * quantity, // Original total before discount
  //       discount_amount: voucherApplied ? discountAmount * quantity : 0, // Total discount applied
  //       tax_amount: 100,
  //       shipping_amount: 100,
  //       grand_total: (priceToUse * quantity) + 100 + 100, // Use discounted price for grand total
  //       payment_method: "credit card",
  //       payment_status: "Unpaid",
  //       created_by: 13
  //     };
  
  //     console.log("Order data being sent:", orderData);
  
  //     const orderResponse = await fetch('https://admin.mobileswholesale.co.uk/api/orders', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //       },
  //       body: JSON.stringify(orderData)
  //     });
  
  //     if (!orderResponse.ok) {
  //       const errorData = await orderResponse.json();
  //       console.error("Order creation failed:", errorData);
  //       throw new Error('Failed to place order');
  //     }
  
  //     const orderResult = await orderResponse.json();
  //     console.log("Order placed successfully:", orderResult);
      
  //     // Create order items
  //     for (const item of data) {
  //       const orderItemData = {
  //         order_id: orderResult.id,
  //         inventory_id: item.id,
  //         quantity: item.quantity,
  //         unit_price: voucherApplied ? discountedPrice : item.currentPrice, // Use discounted price if voucher applied
  //         discount_amount: voucherApplied ? discountAmount : 0, // Include discount amount per item
  //         total_price: (voucherApplied ? discountedPrice : item.currentPrice) * item.quantity
  //       };
  
  //       console.log("Order item data being sent:", orderItemData);
  
  //       const orderItemResponse = await fetch('https://admin.mobileswholesale.co.uk/api/order-items', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Accept': 'application/json',
  //         },
  //         body: JSON.stringify(orderItemData)
  //       });
  
  //       if (!orderItemResponse.ok) {
  //         const errorData = await orderItemResponse.json();
  //         console.error("Order item creation failed:", errorData);
  //         throw new Error(`Failed to create order item for product ${item.id}`);
  //       }
  
  //       const orderItemResult = await orderItemResponse.json();
  //       console.log("Order item created successfully:", orderItemResult);
  //     }
  
  //     // Generate random numbers for invoice and delivery note
  //     const randomNumForInvoice = Math.floor(100000 + Math.random() * 900000);
  //     const randomNumForDelivery = Math.floor(100000 + Math.random() * 900000);
  //     const randomNumForTracking = Math.floor(100000 + Math.random() * 900000);
  
  //     // Calculate dates
  //     const currentDate = new Date().toISOString().split('T')[0];
  //     const dueDate = new Date();
  //     dueDate.setDate(dueDate.getDate() + 5);
  //     const formattedDueDate = dueDate.toISOString().split('T')[0];
  
  //     // Create invoice
  //     const invoiceData = {
  //       invoice_number: `INV-${randomNumForInvoice}`,
  //       order_id: orderResult.id,
  //       customer_id: 3,
  //       invoice_date: currentDate,
  //       due_date: formattedDueDate,
  //       status: "Draft",
  //       created_by: 13
  //     };
  
  //     const invoiceResponse = await fetch('https://admin.mobileswholesale.co.uk/api/invoices', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //       },
  //       body: JSON.stringify(invoiceData)
  //     });
  
  //     if (!invoiceResponse.ok) {
  //       const errorData = await invoiceResponse.json();
  //       console.error("Invoice creation failed:", errorData);
  //       throw new Error('Failed to create invoice');
  //     }
  
  //     const invoiceResult = await invoiceResponse.json();
  //     console.log("Invoice created successfully:", invoiceResult);
  
  //     // Create delivery note
  //     const deliveryNoteData = {
  //       delivery_number: `DEV-${randomNumForDelivery}`,
  //       order_id: orderResult.id,
  //       customer_id: 3,
  //       delivery_date: currentDate,
  //       shipping_method: "online",
  //       tracking_number: `TRA-${randomNumForTracking}`,
  //       status: "Preparing",
  //       created_by: 13
  //     };
  
  //     const deliveryNoteResponse = await fetch('https://admin.mobileswholesale.co.uk/api/delivery-notes', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //       },
  //       body: JSON.stringify(deliveryNoteData)
  //     });
  
  //     if (!deliveryNoteResponse.ok) {
  //       const errorData = await deliveryNoteResponse.json();
  //       console.error("Delivery note creation failed:", errorData);
  //       throw new Error('Failed to create delivery note');
  //     }
  
  //     const deliveryNoteResult = await deliveryNoteResponse.json();
  //     console.log("Delivery note created successfully:", deliveryNoteResult);
  
  //     // Create delivery note items for each product
  //     for (const item of data) {
  //       const deliveryNoteItemData = {
  //         delivery_note_id: deliveryNoteResult.id,
  //         inventory_id: item.id,
  //         quantity: item.quantity
  //       };
  
  //       console.log("Delivery note item data being sent:", deliveryNoteItemData);
  
  //       const deliveryNoteItemResponse = await fetch('https://admin.mobileswholesale.co.uk/api/delivery-note-items', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Accept': 'application/json',
  //         },
  //         body: JSON.stringify(deliveryNoteItemData)
  //       });
  
  //       if (!deliveryNoteItemResponse.ok) {
  //         const errorData = await deliveryNoteItemResponse.json();
  //         console.error("Delivery note item creation failed:", errorData);
  //         throw new Error(`Failed to create delivery note item for product ${item.id}`);
  //       }
  
  //       const deliveryNoteItemResult = await deliveryNoteItemResponse.json();
  //       console.log("Delivery note item created successfully:", deliveryNoteItemResult);
  //     }
  
  //     toast.success("Order placed successfully!");
  //     runConfetti();
              
  //   } catch (error) {
  //     console.error("Error placing order:", error);
  //     toast.error(error.message || "Failed to place order. Please try again.");
  //   } finally {
  //     setIsPlacingOrder(false);
  //   }
  // };

  const proceedToCheckout = () => {
    const orderData = {
      items: data,
      totalItems: data.reduce((acc, item) => acc + item.quantity, 0),
      originalPrice: data.reduce((acc, item) => acc + item.currentPrice * item.quantity, 0),
      discountAmount: voucherApplied ? discountAmount * data.reduce((acc, item) => acc + item.quantity, 0) : 0,
      voucherApplied,
      voucher: voucherApplied ? voucher : null,
      grandTotal: voucherApplied 
        ? (discountedPrice * data.reduce((acc, item) => acc + item.quantity, 0)) + 100 + 100
        : data.reduce((acc, item) => acc + item.currentPrice * item.quantity, 0) + 100 + 100
    };

    navigate('/checkout', { state: { orderData } });
  };


  return (
    <div className="w-full max-h-fit p-4 rounded-xl shadow-lg bg-white text-gray-800 relative">
      <Toaster position="top-center" richColors />
      
      <h2 className="text-xl font-semibold mb-4">Summary</h2>

      <div className="bg-green-50 rounded-lg p-4">
        <div className="flex justify-between text-sm font-semibold mb-1">
          <span>{totalItems} Items</span>
          <span>€{totalPrice}</span>
        </div>
        
        {voucherApplied && (
          <div className="flex justify-between text-sm text-red-600 font-semibold">
            <span>Discount {voucher.discount_type === 'percentage' ? `(${voucher.voucher_discount}%)` : '(fixed)'}</span>
            <span>-€{(discountAmount * quantity).toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-sm text-emerald-700 font-semibold">
          <span>Shipping</span>
          <span>included</span>
        </div>

        <hr className="my-2 border-gray-200" />

        <div className="flex justify-between text-lg font-bold text-emerald-800">
          <span>Total</span>
          <span>€{voucherApplied ? ((discountedPrice * quantity) + 100 + 100).toFixed(2) : totalPrice}</span>
        </div>

        <p className="text-sm text-gray-500 mt-1">Price includes VAT.</p>
      </div>

      <div className="mt-4">
        {!voucherApplied ? (
          <>
            <p 
              className="text-sm underline font-semibold cursor-pointer hover:text-emerald-700"
              onClick={handleVoucherClick}
            >
              Do you have a voucher code?
            </p>
            
            {showVoucherInput && (
              <form onSubmit={handleVoucherSubmit} className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  placeholder="Enter voucher code"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  disabled={isChecking}
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:bg-emerald-400"
                  disabled={isChecking}
                >
                  {isChecking ? "Checking..." : "Apply"}
                </button>
              </form>
            )}
          </>
        ) : (
          <div className="p-2 bg-green-50 rounded-md text-green-700 font-medium flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Voucher Applied Successfully!
          </div>
        )}
      </div>

      <div className="mt-4 space-y-3 text-sm text-gray-800 font-medium">
        <div className="flex items-center gap-2">
          <FaShieldAlt className="text-emerald-700 text-lg" />
          Min. 12 month warranty
        </div>
        <div className="flex items-center gap-2">
          <BiPackage className="text-emerald-700 text-lg" />
          Free return shipping
        </div>
        <div className="flex items-center gap-2">
          <TbRefresh className="text-emerald-700 text-lg" />
          30 day return policy
        </div>
      </div>

      <button 
        className="mt-6 w-full bg-custom-pri-light text-white font-semibold py-3 rounded-lg hover:bg-custom-pri transition duration-200"
        // onClick={placeOrder}
        onClick={proceedToCheckout}
        disabled={isPlacingOrder}
      >
        {isPlacingOrder ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default CheckoutSummary;