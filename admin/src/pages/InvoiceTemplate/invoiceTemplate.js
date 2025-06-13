// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// export default function InvoiceTemplate() {
//   const invoiceRef = useRef(null);
//   const invoiceFields = ['Invoice No', 'Invoice Date', 'Due Date'];
//   const location = useLocation();
//   const invoiceData = location.state || {};
//   const [invoiceValues, setInvoiceValues] = useState({
//     'Invoice No': invoiceData.invoiceNumber || '#INV123',
//     'Invoice Date': invoiceData.invoiceDate || '04/19/2025',
//     'Due Date': invoiceData.dueDate || '04/19/2025'
//   });
  
//   const [paymentValues, setPaymentValues] = useState({
//     'Account': '',
//     'A/C Name': '',
//     'Bank Details': ''
//   });
  
  
//   const [companyName, setCompanyName] = useState('');
//   const [recipientName, setRecipientName] = useState(invoiceData.customerName || '');
//   const [items, setItems] = useState(invoiceData.items || []);
//   const [profilePicture, setProfilePicture] = useState(invoiceData.profilePicture || '');
//   const [useTax, setUseTax] = useState(true);
//   const [useTaxFixed, setUseTaxFixed] = useState(true);
//   const [taxFixed, setTaxFixed] = useState(invoiceData.taxFixed || 0);
//   const [subtotal, setSubtotal] = useState(0);
//   const [taxRate, setTaxRate] = useState(10);
//   const [taxAmount, setTaxAmount] = useState(0);
//   const [total, setTotal] = useState(0);

//   const addNewRow = () => {
//     if (items.length === 0) {
//       setItems([...items, { description: '', qty: '', rate: '', amount: 0 }]);
//     }
//   };

//   const removeRow = (indexToRemove) => {
//     setItems(items.filter((_, index) => index !== indexToRemove));
//   };

//   const updateItem = (index, field, value) => {
//     const newItems = [...items];
//     newItems[index][field] = value;
    
//     if (field === 'qty' || field === 'rate') {
//       const qty = parseFloat(field === 'qty' ? value : newItems[index].qty) || 0;
//       const rate = parseFloat(field === 'rate' ? value : newItems[index].rate) || 0;
//       newItems[index].amount = qty * rate;
//     }
    
//     setItems(newItems);
//   };
  
//   useEffect(() => {
//     const newSubtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
//     setSubtotal(newSubtotal);
    
//     const newTaxAmount = useTax ? newSubtotal * (taxRate / 100) : 0;
//   setTaxAmount(newTaxAmount);
  
//   const fixedTax = useTaxFixed ? parseFloat(taxFixed) : 0;
  
//   setTotal(newSubtotal + newTaxAmount + fixedTax);
// }, [items, taxRate, taxFixed, useTax, useTaxFixed]);

  
//   useEffect(() => {
//     if (items.length === 0) {
//       addNewRow();
//     }
//   }, []);
  
// const downloadPDF = () => {
//   const input = invoiceRef.current;
  
  
//   const invoiceWidth = input.offsetWidth;
//   const invoiceHeight = input.offsetHeight;
  
  
//   const pdfWidth = 210; 
//   const pdfHeight = 297; 
  
 
//   const pdfWidthPx = pdfWidth * 3.78;
//   const pdfHeightPx = pdfHeight * 3.78;
  
  
//   const scale = Math.min(pdfWidthPx / invoiceWidth, 1);
  
//   html2canvas(input, {
//     scale: scale,
//     logging: false,
//     useCORS: true,
//     allowTaint: true,
//     windowWidth: invoiceWidth,
//     windowHeight: invoiceHeight
//   }).then((canvas) => {
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4');
    
   
//     const imgWidth = pdfWidth - 20; 
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    
//     const xPos = (pdfWidth - imgWidth) / 2;
//     let yPos = 10; 
    
    
//     pdf.addImage(imgData, 'PNG', xPos, yPos, imgWidth, imgHeight);
//     yPos += imgHeight;    
//     pdf.save(`Invoice_${invoiceValues['Invoice No'].replace('#', '')}.pdf`);
//   });
// };


//   return (
//     <div style={{ 
//       fontFamily: 'Arial, sans-serif', 
//       maxWidth: '800px', 
//       margin: '0 auto', 
//       padding: '20px',
//       boxSizing: 'border-box'
//     }}>
//       <div ref={invoiceRef}>
//         <h1 style={{ 
//           fontSize: '24px', 
//           fontWeight: 'bold', 
//           color: '#333', 
//           marginBottom: '20px' 
//         }}>INVOICE</h1>
        
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//           <div style={{ width: '40%' }}>
//             <div style={{ 
//               border: '1px dashed #ccc', 
//               padding: '20px', 
//               marginBottom: '15px',
//               background: '#f5f9ff',
//               borderRadius: '4px',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               justifyContent: 'center',
//               minHeight: '100px'
//             }}>
//           <div>
//   <input
//     type="file"
//     id="upload-img"
//     accept="image/png, image/jpeg"
//     style={{ display: 'none' }}
//   />
//   <label htmlFor="upload-img" style={{ cursor: 'pointer', display: 'inline-block' }}>
//     <div style={{ color: '#a0c0e0', fontSize: '24px', marginBottom: '5px' }}>
//       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//         <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//         <polyline points="14 2 14 8 20 8"></polyline>
//       </svg>
//     </div>
//   </label>
// </div>

//               <span style={{ color: '#a0c0e0', fontSize: '14px' }}>Upload Image</span>
//             </div>
            
//             <div style={{ marginBottom: '10px' }}>
//               <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
//                 <div style={{ 
//                   width: '24px', 
//                   height: '24px', 
//                   borderRadius: '50%', 
//                   background: '#e0e0e0', 
//                   display: 'flex', 
//                   justifyContent: 'center', 
//                   alignItems: 'center', 
//                   marginRight: '8px' 
//                 }}>
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
//                     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                     <circle cx="12" cy="7" r="4"></circle>
//                   </svg>
//                 </div>
//                 <span style={{ fontWeight: '500', color: '#666' }}>XYZ Company</span>
//               </div>
//               <div style={{ paddingLeft: '32px' }}>
//                 <input 
//                   type="text" 
//                   value={companyName} 
//                   onChange={(e) => setCompanyName(e.target.value)}
//                   placeholder="xyz company details"
//                   style={{ 
//                     width: '100%', 
//                     border: 'none', 
//                     background: 'transparent', 
//                     outline: 'none',
//                     color: '#999',
//                     fontSize: '13px'
//                   }} 
//                 />
//               </div>
//             </div>
//           </div>
          
// <div style={{ width: '55%' }}>
//   <div style={{ marginBottom: '20px' }}>
//     <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>BILLED TO :</div>
    
    
//     <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
      
//       <div style={{ 
//         width: '30px', 
//         height: '30px', 
//         borderRadius: '50%', 
//         overflow: 'hidden',
//         marginRight: '12px',
//         flexShrink: 0,
//         backgroundColor: '#f0f0f0'
//       }}>
//         {profilePicture ? (
//           <img 
//             src={`${profilePicture}`} 
//             alt="Customer" 
//             style={{ 
//               width: '80%', 
//               height: '80%', 
//               objectFit: 'cover',
//               display: 'block' 
//             }}
//             onError={(e) => {
//               e.target.style.display = 'none';
//               e.target.parentNode.style.backgroundColor = '#e0e0e0';
//             }}
//           />
//         ) : (
//           <div style={{
//             width: '80%',
//             height: '80%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             color: '#999',
//             fontSize: '12px'
//           }}>
//             No Image
//           </div>
//         )}
//       </div>

      
//       <div style={{ flex: 1 }}>
//         <div style={{ fontWeight: '500', color: '#666', marginBottom: '8px' }}>
//           {recipientName || 'Customer name'}
//         </div>

//         <div style={{ marginBottom: '5px' }}>
//           <input 
//             type="text" 
//             value={recipientName} 
//             onChange={(e) => setRecipientName(e.target.value)}
//             placeholder="Customer name"
//             style={{ 
//               width: '100%', 
//               border: 'none', 
//               background: 'transparent', 
//               outline: 'none',
//               color: '#666',
//               fontSize: '13px',
//               padding: '3px 0'
//             }} 
//           />
//         </div>

//         <div style={{ marginBottom: '5px' }}>
//           <input 
//             type="email" 
//             value={invoiceData.customerEmail || ''} 
//             onChange={(e) => {}}
//             placeholder="Email of Customer"
//             style={{ 
//               width: '100%', 
//               border: 'none', 
//               background: 'transparent', 
//               outline: 'none',
//               color: '#666',
//               fontSize: '13px',
//               padding: '3px 0'
//             }} 
//             readOnly
//           />
//         </div>

//         <div>
//           <input 
//             type="text" 
//             value={invoiceData.customerCity || ''} 
//             onChange={(e) => {}}
//             placeholder="Address of Customer (City + Country)"
//             style={{ 
//               width: '100%', 
//               border: 'none', 
//               background: 'transparent', 
//               outline: 'none',
//               color: '#666',
//               fontSize: '13px',
//               padding: '3px 0'
//             }} 
//             readOnly
//           />
//         </div>
//       </div>
//     </div>
//   </div>
  
  
//   <div style={{ 
//     background: '#f7faff', 
//     borderRadius: '4px', 
//     padding: '15px',
//     marginBottom: '20px'
//   }}>
//     {invoiceFields.map((field, index) => (
//       <div 
//         key={index} 
//         style={{ 
//           display: 'flex', 
//           justifyContent: 'space-between',
//           marginBottom: index < invoiceFields.length - 1 ? '8px' : 0
//         }}
//       >
//         <div style={{ fontWeight: '500', color: '#555' }}>{field} :</div>
//         <div style={{ color: '#333' }}>{invoiceValues[field]}</div>
//       </div>
//     ))}
//   </div>
// </div>
//         </div>
        
//         <div style={{ marginBottom: '20px' }}>
//           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//             <thead>
//               <tr style={{ background: '#f5f9ff' }}>
//                 <th style={{ padding: '10px', textAlign: 'left', fontSize: '14px', borderBottom: '1px solid #eee' }}>Item Description</th>
//                 <th style={{ padding: '10px', textAlign: 'center', fontSize: '14px', borderBottom: '1px solid #eee', width: '80px' }}>Qty</th>
//                 <th style={{ padding: '10px', textAlign: 'center', fontSize: '14px', borderBottom: '1px solid #eee', width: '100px' }}>Rate</th>
//                 <th style={{ padding: '10px', textAlign: 'right', fontSize: '14px', borderBottom: '1px solid #eee', width: '100px' }}>Amount</th>
//                 <th style={{ padding: '10px', textAlign: 'center', fontSize: '14px', borderBottom: '1px solid #eee', width: '50px' }}>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item, index) => (
//                 <tr key={index}>
//                   <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
//                     <input 
//                       type="text" 
//                       value={item.description} 
//                       onChange={(e) => updateItem(index, 'description', e.target.value)}
//                       placeholder="Item description"
//                       style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none' }} 
//                     />
//                   </td>
//                   <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
//                     <input 
//                       type="number" 
//                       value={item.qty} 
//                       onChange={(e) => updateItem(index, 'qty', e.target.value)}
//                       placeholder="0"
//                       style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center', outline: 'none' }} 
//                     />
//                   </td>
//                   <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
//                     <input 
//                       type="number" 
//                       value={item.rate} 
//                       onChange={(e) => updateItem(index, 'rate', e.target.value)}
//                       placeholder="0.00"
//                       style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center', outline: 'none' }} 
//                     />
//                   </td>
//                   <td style={{ padding: '10px', borderBottom: '1px solid #eee', textAlign: 'right' }}>
//                     {item.amount ? item.amount.toFixed(2) : '0.00'}
//                   </td>
//                   <td style={{ padding: '10px', borderBottom: '1px solid #eee', textAlign: 'center' }}>
//                     <button 
//                       onClick={() => removeRow(index)}
//                       style={{ 
//                         background: 'transparent',
//                         border: 'none',
//                         color: '#ff5252',
//                         cursor: 'pointer',
//                         padding: '5px'
//                       }}
//                     >
//                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <line x1="18" y1="6" x2="6" y2="18"></line>
//                         <line x1="6" y1="6" x2="18" y2="18"></line>
//                       </svg>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
          
          
//           <div style={{ 
//             padding: '10px', 
//             textAlign: 'center', 
//             borderBottom: '1px solid #eee',
//             marginTop: items.length === 0 ? '10px' : '0'
//           }}>
//             <button 
//               onClick={addNewRow}
//               style={{ 
//                 background: 'transparent',
//                 border: 'none',
//                 color: '#4a90e2',
//                 cursor: 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 width: '100%',
//                 padding: '5px 0'
//               }}
//             >
//               <span style={{ marginRight: '5px', fontSize: '16px' }}>+</span> Add new row
//             </button>
//           </div>
//         </div>
        
       
//         <div style={{ display: 'flex', justifyContent: 'right',alignItems:'right'
//          }}>
         
     
          
          
//           <div style={{ width: '48%' }}>
//             <div style={{ 
//               display: 'flex', 
//               justifyContent: 'space-between', 
//               padding: '10px 0', 
//               borderBottom: '1px solid #eee' 
//             }}>
//               <span>Sub Total</span>
//               <span>{subtotal.toFixed(2)}</span>
//             </div>
            
//             <div style={{ 
//   display: 'flex', 
//   justifyContent: 'space-between', 
//   alignItems: 'center',
//   padding: '10px 0', 
//   borderBottom: '1px solid #eee' 
// }}>
//   <div style={{ display: 'flex', alignItems: 'center' }}>
//     <input
//       type="checkbox"
//       checked={useTax}
//       onChange={() => setUseTax(!useTax)}
//       style={{ marginRight: '10px' }}
//     />
//     <span style={{ marginRight: '10px' }}>Tax</span>
//     {useTax && (
//       <>
//         <input 
//           type="number" 
//           value={taxRate}
//           onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
//           style={{ 
//             width: '63px', 
//             padding: '2px 5px', 
//             border: '1px solid #ddd',
//             borderRadius: '3px',
//             textAlign: 'center'
//           }} 
//         />
//         <span style={{ marginLeft: '5px' }}>%</span>
//       </>
//     )}
//   </div>
//   <span>{useTax ? taxAmount.toFixed(2) : '0.00'}</span>
// </div>
            
// <div style={{ 
//   display: 'flex', 
//   justifyContent: 'space-between', 
//   alignItems: 'center',
//   padding: '10px 0', 
//   borderBottom: '1px solid #eee' 
// }}>
//   <div style={{ display: 'flex', alignItems: 'center' }}>
//     <input
//       type="checkbox"
//       checked={useTaxFixed}
//       onChange={() => setUseTaxFixed(!useTaxFixed)}
//       style={{ marginRight: '10px' }}
//     />
//     <span style={{ marginRight: '10px' }}>Tax Fixed</span>
//   </div>
//   <span>{useTaxFixed ? taxFixed.toFixed(2) : '0.00'}</span>
// </div>


//             <div style={{ 
//               display: 'flex', 
//               justifyContent: 'space-between', 
//               padding: '15px 0',
//               background: '#f5f9ff',
//               fontWeight: '500',
//               marginTop: '10px'
//             }}>
//               <span>Total</span>
//               <span>{total.toFixed(2)}</span>
//             </div>
//           </div>

          
//         </div>
//         <div style={{ width: '100%',marginTop:'10px'}}>
//             <div style={{ marginTop: '20px' }}>
//               <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '10px' }}>Terms & Conditions</h3>
//               <p style={{ 
//                 fontSize: '13px', 
//                 color: '#666', 
//                 fontStyle: 'italic', 
//                 lineHeight: '1.5' 
//               }}>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//               </p>
//             </div>
//           </div>
//       </div>
      
//       <div style={{ marginTop: '30px', textAlign: 'center' }}>
//         <button 
//           onClick={downloadPDF}
//           style={{ 
//             background: '#4a90e2',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             padding: '12px 25px',
//             fontSize: '16px',
//             fontWeight: '500',
//             cursor: 'pointer',
//             boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//             transition: 'background 0.3s ease'
//           }}
//           onMouseOver={(e) => e.currentTarget.style.background = '#3a7bc8'}
//           onMouseOut={(e) => e.currentTarget.style.background = '#4a90e2'}
//         >
//           Download Invoice
//         </button>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function InvoiceTemplate() {
  const invoiceRef = useRef(null);
  const invoiceFields = ['Invoice No', 'Invoice Date', 'Due Date'];
  const location = useLocation();
  const invoiceData = location.state || {};
  const [invoiceValues, setInvoiceValues] = useState({
    'Invoice No': invoiceData.invoiceNumber || '#INV123',
    'Invoice Date': invoiceData.invoiceDate || '04/19/2025',
    'Due Date': invoiceData.dueDate || '04/19/2025'
  });
  
  const [paymentValues, setPaymentValues] = useState({
    'Account': invoiceData.account || '',
    'A/C Name': invoiceData.acName || '',
    'Bank Details': invoiceData.bankDetails || ''
  });
  
  const [companyName, setCompanyName] = useState(invoiceData.companyName || 'XYZ Company');
  const [companyDetails, setCompanyDetails] = useState(invoiceData.companyDetails || '123 Business St, City, Country\ninfo@xyzcompany.com\n+1 (123) 456-7890');
  const [recipientName, setRecipientName] = useState(invoiceData.customerName || '');
  const [items, setItems] = useState(invoiceData.items || []);
  const [profilePicture, setProfilePicture] = useState(invoiceData.profilePicture || '');
  const [useTax, setUseTax] = useState(true);
  const [useTaxFixed, setUseTaxFixed] = useState(true);
  const [taxFixed, setTaxFixed] = useState(invoiceData.taxFixed || 0);
  const [subtotal, setSubtotal] = useState(0);
  const [taxRate, setTaxRate] = useState(invoiceData.taxRate || 10);
  const [taxAmount, setTaxAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [notes, setNotes] = useState(invoiceData.notes || 'Thank you for your business. Please make payment by the due date.');

  const addNewRow = () => {
    setItems([...items, { description: '', qty: '', rate: '', amount: 0 }]);
  };

  const removeRow = (indexToRemove) => {
    setItems(items.filter((_, index) => index !== indexToRemove));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    
    if (field === 'qty' || field === 'rate') {
      const qty = parseFloat(field === 'qty' ? value : newItems[index].qty) || 0;
      const rate = parseFloat(field === 'rate' ? value : newItems[index].rate) || 0;
      newItems[index].amount = qty * rate;
    }
    
    setItems(newItems);
  };
  
  useEffect(() => {
    const newSubtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
    setSubtotal(newSubtotal);
    
    const newTaxAmount = useTax ? newSubtotal * (taxRate / 100) : 0;
    setTaxAmount(newTaxAmount);
  
    const fixedTax = useTaxFixed ? parseFloat(taxFixed) : 0;
    setTotal(newSubtotal + newTaxAmount + fixedTax);
  }, [items, taxRate, taxFixed, useTax, useTaxFixed]);
  
  useEffect(() => {
    if (items.length === 0) {
      addNewRow();
    }
    
    // Initialize with passed data if available
    if (invoiceData.items && invoiceData.items.length > 0) {
      setItems(invoiceData.items);
    }
  }, [invoiceData.items]);

  // const downloadPDF = () => {
  //   const input = invoiceRef.current;
  //   const invoiceWidth = input.scrollWidth;
  //   const invoiceHeight = input.scrollHeight;
  //   const pdfWidth = 210; 
  //   const pdfHeight = (invoiceHeight * pdfWidth) / invoiceWidth;

  //   html2canvas(input, {
  //     scale: 2, 
  //     logging: false,
  //     useCORS: true,
  //     allowTaint: true,
  //     width: invoiceWidth,
  //     height: invoiceHeight,
  //     scrollX: 0,
  //     scrollY: 0,
  //     windowWidth: invoiceWidth,
  //     windowHeight: invoiceHeight
  //   }).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF({
  //       orientation: pdfHeight > pdfWidth ? 'p' : 'l',
  //       unit: 'mm',
  //       format: [pdfWidth, pdfHeight]
  //     });

  //     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
  //     pdf.save(`Invoice_${invoiceValues['Invoice No'].replace('#', '')}.pdf`);
  //   });
  // };

  const downloadPDF = () => {
  // Create a clone of the invoice element to modify for PDF
  const input = invoiceRef.current;
  const clone = input.cloneNode(true);
  
  // Remove the download button from the clone
  const downloadButtons = clone.querySelectorAll('button');
  downloadButtons.forEach(button => {
    if (button.textContent.includes('Download Invoice')) {
      button.style.display = 'none';
    }
  });

  // Hide any elements you don't want in the PDF
  const elementsToHide = clone.querySelectorAll('.pdf-hide');
  elementsToHide.forEach(el => el.style.display = 'none');

  // Temporarily add the clone to the document to calculate dimensions
  clone.style.position = 'absolute';
  clone.style.left = '-9999px';
  document.body.appendChild(clone);

  // Get dimensions
  const width = clone.scrollWidth;
  const height = clone.scrollHeight;

  // Generate PDF
  html2canvas(clone, {
    scale: 3,
    logging: false,
    useCORS: true,
    width: width,
    height: height,
    windowWidth: width,
    windowHeight: height
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: width > height ? 'l' : 'p',
      unit: 'mm',
      format: [width * 0.264583, height * 0.264583] // Convert px to mm
    });

    pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    pdf.save(`Invoice_${invoiceValues['Invoice No'].replace('#', '')}.pdf`);
    
    // Remove the clone from the document
    document.body.removeChild(clone);
  });
};



  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ 
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      boxSizing: 'border-box',
      color: '#333'
    }}>
      <div ref={invoiceRef} style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        padding: '40px',
        border: '1px solid #eaeaea',
        width: '100%'
      }}>
        {/* Header Section */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '40px',
          borderBottom: '1px solid #f0f0f0',
          paddingBottom: '30px'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '15px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '8px',
                overflow: 'hidden',
                marginRight: '15px',
                backgroundColor: '#f5f7fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {profilePicture ? (
                  <img 
                    src={profilePicture} 
                    alt="Company Logo" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain'
                    }}
                  />
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                )}
              </div>
              <div>
                <h1 style={{ 
                  fontSize: '28px', 
                  fontWeight: '700', 
                  color: '#2d3748',
                  margin: 0
                }}>{companyName}</h1>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#718096', 
                  marginTop: '4px'
                }}>INVOICE</p>
              </div>
            </div>
            
            <textarea
              value={companyDetails}
              onChange={(e) => setCompanyDetails(e.target.value)}
              style={{ 
                width: '100%', 
                border: 'none', 
                background: 'transparent', 
                outline: 'none',
                color: '#4a5568',
                fontSize: '14px',
                lineHeight: '1.6',
                resize: 'none',
                minHeight: '80px',
                fontFamily: 'inherit'
              }}
              placeholder="Company address and contact details"
            />
          </div>
          
          <div style={{ 
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            padding: '20px',
            minWidth: '200px'
          }}>
            {invoiceFields.map((field, index) => (
              <div 
                key={index} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}
              >
                <div style={{ 
                  fontSize: '14px', 
                  color: '#64748b',
                  fontWeight: '500'
                }}>{field}</div>
                <div style={{ 
                  fontSize: '14px', 
                  color: '#334155',
                  fontWeight: '600'
                }}>{invoiceValues[field]}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Client and Payment Info */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: '40px'
        }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#2d3748',
              marginBottom: '15px'
            }}>BILL TO</h3>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start',
              marginBottom: '15px'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '8px', 
                overflow: 'hidden',
                marginRight: '15px',
                backgroundColor: '#f0f4f8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8'
              }}>
                {invoiceData.customerImage ? (
                  <img 
                    src={invoiceData.customerImage} 
                    alt="Client" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                )}
              </div>
              
              <div style={{ flex: 1 }}>
                <input 
                  type="text" 
                  value={recipientName} 
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Client name"
                  style={{ 
                    width: '100%', 
                    border: 'none', 
                    background: 'transparent', 
                    outline: 'none',
                    color: '#1e293b',
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    padding: '2px 0'
                  }} 
                />
                <div style={{ 
                  color: '#64748b',
                  fontSize: '14px',
                  marginBottom: '6px',
                  padding: '2px 0'
                }}>
                  {invoiceData.customerEmail || 'client@example.com'}
                </div>
                <div style={{ 
                  color: '#64748b',
                  fontSize: '14px',
                  padding: '2px 0'
                }}>
                  {invoiceData.customerAddress || 'Client address'}
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ flex: 1, paddingLeft: '30px' }}>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#2d3748',
              marginBottom: '15px'
            }}>PAYMENT INFO</h3>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '13px', 
                color: '#64748b',
                marginBottom: '4px'
              }}>Account Number</label>
              <input 
                type="text" 
                value={paymentValues['Account']} 
                onChange={(e) => setPaymentValues({...paymentValues, 'Account': e.target.value})}
                placeholder="1234 5678 9012"
                style={{ 
                  width: '100%', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border 0.2s'
                }} 
              />
            </div>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '13px', 
                color: '#64748b',
                marginBottom: '4px'
              }}>Account Name</label>
              <input 
                type="text" 
                value={paymentValues['A/C Name']} 
                onChange={(e) => setPaymentValues({...paymentValues, 'A/C Name': e.target.value})}
                placeholder="XYZ Company"
                style={{ 
                  width: '100%', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border 0.2s'
                }} 
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '13px', 
                color: '#64748b',
                marginBottom: '4px'
              }}>Bank Details</label>
              <textarea 
                value={paymentValues['Bank Details']} 
                onChange={(e) => setPaymentValues({...paymentValues, 'Bank Details': e.target.value})}
                placeholder="Bank name, branch, etc."
                style={{ 
                  width: '100%', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '14px',
                  outline: 'none',
                  minHeight: '80px',
                  resize: 'vertical',
                  transition: 'border 0.2s'
                }} 
              />
            </div>
          </div>
        </div>
        
        {/* Items Table */}
        <div style={{ marginBottom: '30px' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'separate', 
            borderSpacing: 0,
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <thead>
              <tr style={{ 
                backgroundColor: '#f8fafc',
                textAlign: 'left'
              }}>
                <th style={{ 
                  padding: '14px 16px', 
                  fontSize: '14px', 
                  fontWeight: '600',
                  color: '#475569',
                  borderBottom: '1px solid #e2e8f0'
                }}>Description</th>
                <th style={{ 
                  padding: '14px 16px', 
                  fontSize: '14px', 
                  fontWeight: '600',
                  color: '#475569',
                  borderBottom: '1px solid #e2e8f0',
                  width: '80px',
                  textAlign: 'center'
                }}>Qty</th>
                <th style={{ 
                  padding: '14px 16px', 
                  fontSize: '14px', 
                  fontWeight: '600',
                  color: '#475569',
                  borderBottom: '1px solid #e2e8f0',
                  width: '120px',
                  textAlign: 'right'
                }}>Unit Price</th>
                <th style={{ 
                  padding: '14px 16px', 
                  fontSize: '14px', 
                  fontWeight: '600',
                  color: '#475569',
                  borderBottom: '1px solid #e2e8f0',
                  width: '120px',
                  textAlign: 'right'
                }}>Amount</th>
                <th style={{ 
                  padding: '14px 16px', 
                  fontSize: '14px', 
                  fontWeight: '600',
                  color: '#475569',
                  borderBottom: '1px solid #e2e8f0',
                  width: '50px',
                  textAlign: 'center'
                }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} style={{
                  backgroundColor: index % 2 === 0 ? 'white' : '#f8fafc'
                }}>
                  <td style={{ 
                    padding: '12px 16px', 
                    borderBottom: '1px solid #e2e8f0',
                    verticalAlign: 'top'
                  }}>
                    <input 
                      type="text" 
                      value={item.description} 
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      placeholder="Item description"
                      style={{ 
                        width: '100%', 
                        border: 'none', 
                        background: 'transparent', 
                        outline: 'none',
                        fontSize: '14px'
                      }} 
                    />
                  </td>
                  <td style={{ 
                    padding: '12px 16px', 
                    borderBottom: '1px solid #e2e8f0',
                    textAlign: 'center'
                  }}>
                    <input 
                      type="number" 
                      value={item.qty} 
                      onChange={(e) => updateItem(index, 'qty', e.target.value)}
                      placeholder="0"
                      min="0"
                      step="1"
                      style={{ 
                        width: '100%', 
                        border: 'none', 
                        background: 'transparent', 
                        outline: 'none',
                        fontSize: '14px',
                        textAlign: 'center'
                      }} 
                    />
                  </td>
                  <td style={{ 
                    padding: '12px 16px', 
                    borderBottom: '1px solid #e2e8f0',
                    textAlign: 'right'
                  }}>
                    <input 
                      type="number" 
                      value={item.rate} 
                      onChange={(e) => updateItem(index, 'rate', e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      style={{ 
                        width: '100%', 
                        border: 'none', 
                        background: 'transparent', 
                        outline: 'none',
                        fontSize: '14px',
                        textAlign: 'right'
                      }} 
                    />
                  </td>
                  <td style={{ 
                    padding: '12px 16px', 
                    borderBottom: '1px solid #e2e8f0',
                    textAlign: 'right',
                    color: '#1e293b',
                    fontWeight: '500'
                  }}>
                    {item.amount ? item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
                  </td>
                  <td style={{ 
                    padding: '12px 16px', 
                    borderBottom: '1px solid #e2e8f0',
                    textAlign: 'center'
                  }}>
                    <button 
                      onClick={() => removeRow(index)}
                      style={{ 
                        background: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: '5px',
                        borderRadius: '4px',
                        ':hover': {
                          backgroundColor: '#fee2e2'
                        }
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <button 
            onClick={addNewRow}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '10px',
              marginTop: '10px',
              backgroundColor: 'white',
              border: '1px dashed #cbd5e1',
              borderRadius: '6px',
              color: '#3b82f6',
              fontWeight: '500',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              ':hover': {
                backgroundColor: '#f8fafc',
                borderColor: '#93c5fd'
              }
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Item
          </button>
        </div>
        
        {/* Totals Section */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          marginBottom: '40px'
        }}>
          <div style={{ width: '300px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '12px 0', 
              borderBottom: '1px solid #e2e8f0' 
            }}>
              <span style={{ color: '#64748b' }}>Subtotal</span>
              <span style={{ fontWeight: '500' }}>
                {subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '12px 0', 
              borderBottom: '1px solid #e2e8f0' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={useTax}
                  onChange={() => setUseTax(!useTax)}
                  style={{ 
                    marginRight: '10px',
                    accentColor: '#3b82f6',
                    cursor: 'pointer'
                  }}
                />
                <span style={{ marginRight: '10px', color: '#64748b' }}>Tax</span>
                {useTax && (
                  <>
                    <input 
                      type="number" 
                      value={taxRate}
                      onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                      style={{ 
                        width: '60px', 
                        padding: '4px 8px', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '4px',
                        textAlign: 'center',
                        fontSize: '14px',
                        outline: 'none'
                      }} 
                    />
                    <span style={{ marginLeft: '5px', color: '#64748b' }}>%</span>
                  </>
                )}
              </div>
              <span style={{ fontWeight: '500' }}>
                {useTax ? taxAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
              </span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '12px 0', 
              borderBottom: '1px solid #e2e8f0' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={useTaxFixed}
                  onChange={() => setUseTaxFixed(!useTaxFixed)}
                  style={{ 
                    marginRight: '10px',
                    accentColor: '#3b82f6',
                    cursor: 'pointer'
                  }}
                />
                <span style={{ marginRight: '10px', color: '#64748b' }}>Fixed Tax</span>
              </div>
              <span style={{ fontWeight: '500' }}>
                {useTaxFixed ? parseFloat(taxFixed).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
              </span>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '16px 0',
              marginTop: '10px'
            }}>
              <span style={{ 
                fontSize: '16px', 
                fontWeight: '600',
                color: '#1e293b'
              }}>Total</span>
              <span style={{ 
                fontSize: '18px', 
                fontWeight: '700',
                color: '#1e293b'
              }}>
                {total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
        
        {/* Notes Section */}
        <div style={{ 
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            color: '#2d3748',
            marginBottom: '12px'
          }}>NOTES</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ 
              width: '100%', 
              border: 'none', 
              background: 'transparent', 
              outline: 'none',
              color: '#475569',
              fontSize: '14px',
              lineHeight: '1.6',
              resize: 'none',
              minHeight: '60px',
              fontFamily: 'inherit'
            }}
            placeholder="Additional notes or terms..."
          />
        </div>
        
        {/* Footer */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          paddingTop: '20px',
          borderTop: '1px solid #e2e8f0'
        }}>
          <div style={{ 
  color: '#2d3748', 
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '1.6'
}}>
  <div style={{ marginBottom: '8px' }}>Thank you for your business!</div>
  <div>Please contact us at contact@xyzcompany.com for any questions</div>
</div>
          <div style={{ textAlign: 'right' }} className="pdf-hide">
            <button 
              onClick={downloadPDF}
              style={{ 
                display: 'inline-flex',
        alignItems: 'center',
        padding: '8px 16px',
        backgroundColor: '#3b82f6',
        color: 'white',
        borderRadius: '6px',
        fontWeight: '500',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'background 0.2s',
        border: 'none',
        ':hover': {
          backgroundColor: '#2563eb'
                }
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}