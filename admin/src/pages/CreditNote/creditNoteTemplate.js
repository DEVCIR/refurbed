import { API_BASE_URL } from "../../Service";
import { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CreditNoteTemplate(creditNote, onBackClick) {
  const [seller, setSeller] = useState({
    name: "John Smith",
    address: "4490 Oak Drive",
    city: "Albany, NY 12210",
  });

  const [customer, setCustomer] = useState({
    name: "Jessie M Horne",
    email: "",
    phone: "",
    address: "4312 Wood Road",
    city: "New York, NY 10031",
    country: "",
  });

  const [shipTo, setShipTo] = useState({
    name: "Jessie M Horne",
    address: "2019 Redbud Drive",
    city: "New York, NY 10011",
  });

  const [creditInfo, setCreditInfo] = useState({
    creditNoteNumber: "INT-001",
    creditNoteDate: "11/02/2019",
    purchaseOrderNumber: "2412/2019",
    dueDate: "26/02/2019",
  });

  const [items, setItems] = useState([
    {
      id: 1,
      description: "Front and rear brake cables",
      unitPrice: 100.0,
      quantity: 1,
      amount: 100.0,
    },
    {
      id: 2,
      description: "New set of pedal arms",
      unitPrice: 25.0,
      quantity: 2,
      amount: 50.0,
    },
    {
      id: 3,
      description: "Labor 3hrs",
      unitPrice: 15.0,
      quantity: 3,
      amount: 45.0,
    },
  ]);

  const [taxRate, setTaxRate] = useState(5.0);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const [bankInfo, setBankInfo] = useState({
    bankName: "Name of Bank",
    accountNumber: "1234567890",
    routingNumber: "098765432",
  });

  const templateRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/credit-notes-item/?credit_note_id=${creditNote.creditNote.id}`,
        );
        const result = await response.json();

        const fetchedItems = result.data.data.map((item) => ({
          id: item.id,
          description:
            `${item.inventory.variant.product.brand.brand_name} ${item.inventory.variant.product.model_name}` ||
            "",
          unitPrice: parseFloat(item.unit_price),
          quantity: item.quantity,
          amount: parseFloat(item.total_price),
        }));

        setItems(fetchedItems);

        setCreditInfo({
          creditNoteNumber: result.data.data[0].credit_note.credit_note_number,
          creditNoteDate: new Date(
            result.data.data[0].credit_note.issue_date,
          ).toLocaleDateString(),
          purchaseOrderNumber:
            result.data.data[0].credit_note.rma.order.order_number, // Assuming this is the PO number
          dueDate: new Date(
            result.data.data[0].credit_note.updated_at,
          ).toLocaleDateString(), // Example for due date
        });
        setCustomer({
          name: result.data.data[0].credit_note.customer.user.name || "",
          email: result.data.data[0].credit_note.customer.user.email || "",
          phone:
            result.data.data[0].credit_note.customer.user.phone_number || "",
          address: result.data.data[0].credit_note.customer.address || "",
          city: result.data.data[0].credit_note.customer.city || "",
          country: result.data.data[0].credit_note.customer.country || "",
        });
      } catch (error) {
        console.error("Error fetching credit note data:", error);
      }
    };

    fetchData();
  }, [creditNote.id]);

  useEffect(() => {
    console.log("Credit Note Data => ", creditNote);
    calculateTotals();
  }, [items, taxRate]);

  const calculateTotals = () => {
    const calculatedSubtotal = items.reduce(
      (sum, item) => sum + item.amount,
      0,
    );
    const calculatedTax = calculatedSubtotal * (taxRate / 100);
    const calculatedTotal = calculatedSubtotal + calculatedTax;

    setSubtotal(calculatedSubtotal);
    setTax(calculatedTax);
    setTotal(calculatedTotal);
  };

  const handleItemChange = (id, field, value) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };

        if (field === "unitPrice" || field === "quantity") {
          updatedItem.amount = updatedItem.unitPrice * updatedItem.quantity;
        }

        return updatedItem;
      }
      return item;
    });

    setItems(updatedItems);
  };

  const addNewRow = () => {
    const newId =
      items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    setItems([
      ...items,
      { id: newId, description: "", unitPrice: 0, quantity: 0, amount: 0 },
    ]);
  };

  const removeRow = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const downloadPDF = () => {
    html2canvas(templateRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 200;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("credit_note_template.pdf");
    });
  };

  return (
    <>
      <button onClick={onBackClick.onBackClick} style={styles.backButton}>
        Back
      </button>
      <button onClick={downloadPDF} style={styles.downloadButton}>
        Download PDF
      </button>
      <div style={styles.container} ref={templateRef}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <input
              type="text"
              value={seller.name}
              onChange={(e) => setSeller({ ...seller, name: e.target.value })}
              style={styles.headerName}
            />
          </div>
          <div style={styles.headerRight}>
            <h1 style={styles.headerTitle}>CREDIT NOTE</h1>
          </div>
        </div>

        <div style={styles.sellerInfo}>
          <input
            type="text"
            value={seller.address}
            onChange={(e) => setSeller({ ...seller, address: e.target.value })}
            style={styles.inputNoBorder}
          />
          <br />
          <input
            type="text"
            value={seller.city}
            onChange={(e) => setSeller({ ...seller, city: e.target.value })}
            style={styles.inputNoBorder}
          />
        </div>

        <div style={styles.spacer}></div>

        <div style={styles.infoContainer}>
          <div style={styles.infoColumn}>
            <div style={styles.infoLabel}>Customer</div>
            <input
              type="text"
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
              style={styles.inputNoBorder}
            />
            <input
              type="text"
              value={customer.email}
              onChange={(e) =>
                setCustomer({ ...customer, email: e.target.value })
              }
              style={styles.inputNoBorder}
            />
            <input
              type="text"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
              style={styles.inputNoBorder}
            />
          </div>
          <div style={styles.infoColumn}>
            <div style={styles.infoLabel}>Ship To</div>
            <input
              type="text"
              value={customer.address}
              onChange={(e) =>
                setCustomer({ ...customer, address: e.target.value })
              }
              style={styles.inputNoBorder}
            />
            <input
              type="text"
              value={customer.city}
              onChange={(e) =>
                setCustomer({ ...customer, city: e.target.value })
              }
              style={styles.inputNoBorder}
            />
            <input
              type="text"
              value={customer.country}
              onChange={(e) =>
                setCustomer({ ...customer, country: e.target.value })
              }
              style={styles.inputNoBorder}
            />
          </div>
          <div style={styles.infoColumnRight}>
            <table style={styles.infoTable}>
              <tbody>
                <tr>
                  <td style={styles.infoTableLabel}>Credit Note #</td>
                  <td style={styles.infoTableValue}>
                    <input
                      type="text"
                      value={creditInfo.creditNoteNumber}
                      onChange={(e) =>
                        setCreditInfo({
                          ...creditInfo,
                          creditNoteNumber: e.target.value,
                        })
                      }
                      style={styles.inputNoBorder}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={styles.infoTableLabel}>Credit Note Date</td>
                  <td style={styles.infoTableValue}>
                    <input
                      type="text"
                      value={creditInfo.creditNoteDate}
                      onChange={(e) =>
                        setCreditInfo({
                          ...creditInfo,
                          creditNoteDate: e.target.value,
                        })
                      }
                      style={styles.inputNoBorder}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={styles.infoTableLabel}>P.O.#</td>
                  <td style={styles.infoTableValue}>
                    <input
                      type="text"
                      value={creditInfo.purchaseOrderNumber}
                      onChange={(e) =>
                        setCreditInfo({
                          ...creditInfo,
                          purchaseOrderNumber: e.target.value,
                        })
                      }
                      style={styles.inputNoBorder}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={styles.infoTableLabel}>Due Date</td>
                  <td style={styles.infoTableValue}>
                    <input
                      type="text"
                      value={creditInfo.dueDate}
                      onChange={(e) =>
                        setCreditInfo({
                          ...creditInfo,
                          dueDate: e.target.value,
                        })
                      }
                      style={styles.inputNoBorder}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={styles.itemsTableContainer}>
          <table style={styles.itemsTable}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>QTY</th>
                <th style={styles.tableHeader}>DESCRIPTION</th>
                <th style={styles.tableHeader}>UNIT PRICE</th>
                <th style={styles.tableHeader}>AMOUNT</th>
                <th style={styles.tableHeaderActions}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td style={styles.tableCell}>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "quantity",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      style={styles.tableCellInput}
                    />
                  </td>
                  <td style={styles.tableCell}>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(item.id, "description", e.target.value)
                      }
                      style={{ ...styles.tableCellInput, textAlign: "left" }}
                    />
                  </td>
                  <td style={styles.tableCell}>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "unitPrice",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      style={styles.tableCellInput}
                    />
                  </td>
                  <td style={styles.tableCell}>
                    <input
                      type="number"
                      value={item.amount}
                      readOnly
                      style={{
                        ...styles.tableCellInput,
                        backgroundColor: "#f9f9f9",
                      }}
                    />
                  </td>
                  <td style={styles.tableCellAction}>
                    <button
                      onClick={() => removeRow(item.id)}
                      style={styles.removeButton}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={addNewRow} style={styles.addButton}>
            + Add Row
          </button>

          <div style={styles.totalsContainer}>
            <div style={styles.totalsTable}>
              <div style={styles.totalsRow}>
                <div style={styles.totalsLabel}>Subtotal</div>
                <div style={styles.totalsValue}>{subtotal.toFixed(2)}</div>
              </div>
              <div style={styles.totalsRow}>
                <div style={styles.totalsLabel}>
                  Sales Tax
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) =>
                      setTaxRate(parseFloat(e.target.value) || 0)
                    }
                    style={styles.taxRateInput}
                  />
                  %
                </div>
                <div style={styles.totalsValue}>{tax.toFixed(2)}</div>
              </div>
              <div style={styles.totalRow}>
                <div style={styles.totalLabel}>TOTAL</div>
                <div style={styles.totalValue}>${total.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.termsContainer}>
          <h3 style={styles.termsTitle}>Terms & Conditions</h3>
          <p style={styles.termsText}>Payment is due within 15 days</p>

          <div style={styles.bankInfo}>
            <input
              type="text"
              value={bankInfo.bankName}
              onChange={(e) =>
                setBankInfo({ ...bankInfo, bankName: e.target.value })
              }
              style={styles.inputNoBorder}
            />
            <br />
            <div style={styles.bankInfoRow}>
              Account number:
              <input
                type="text"
                value={bankInfo.accountNumber}
                onChange={(e) =>
                  setBankInfo({ ...bankInfo, accountNumber: e.target.value })
                }
                style={{ ...styles.inputNoBorder, width: "150px" }}
              />
            </div>
            <div style={styles.bankInfoRow}>
              Routing:
              <input
                type="text"
                value={bankInfo.routingNumber}
                onChange={(e) =>
                  setBankInfo({ ...bankInfo, routingNumber: e.target.value })
                }
                style={{ ...styles.inputNoBorder, width: "150px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    lineHeight: "1.4",
    color: "#333",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    marginTop: "12px",
  },
  headerLeft: {
    padding: 2,
    flex: "1",
  },
  headerRight: {
    flex: "1",
    textAlign: "right",
  },
  headerName: {
    fontSize: "20px",
    fontWeight: "bold",
    border: "none",
    width: "100%",
    outline: "none",
  },
  headerTitle: {
    backgroundColor: "#d9534f",
    color: "white",
    padding: "10px 20px",
    margin: "0",
    textAlign: "right",
    fontSize: "22px",
  },
  sellerInfo: {
    marginBottom: "30px",
  },
  spacer: {
    height: "30px",
  },
  infoContainer: {
    display: "flex",
    marginBottom: "30px",
  },
  infoColumn: {
    flex: "1",
    paddingRight: "15px",
  },
  infoColumnRight: {
    flex: "1",
    paddingLeft: "15px",
  },
  infoLabel: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  infoTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  infoTableLabel: {
    fontWeight: "bold",
    paddingBottom: "10px",
    verticalAlign: "top",
  },
  infoTableValue: {
    textAlign: "right",
    paddingBottom: "10px",
    verticalAlign: "top",
  },
  inputNoBorder: {
    border: "none",
    borderBottom: "1px dotted #ccc",
    outline: "none",
    padding: "3px 0",
    marginBottom: "5px",
    width: "100%",
    fontSize: "14px",
  },
  itemsTableContainer: {
    marginBottom: "30px",
  },
  itemsTable: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #ddd",
    marginBottom: "10px",
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
    padding: "10px",
    textAlign: "center",
    fontWeight: "bold",
    border: "1px solid #ddd",
  },
  tableHeaderActions: {
    backgroundColor: "#f5f5f5",
    padding: "10px",
    width: "30px",
    border: "1px solid #ddd",
  },
  tableCell: {
    padding: "0",
    border: "1px solid #ddd",
  },
  tableCellInput: {
    width: "100%",
    padding: "8px",
    border: "none",
    textAlign: "center",
    outline: "none",
    fontSize: "14px",
  },
  tableCellAction: {
    padding: "0",
    border: "1px solid #ddd",
    textAlign: "center",
    width: "30px",
  },
  removeButton: {
    background: "none",
    border: "none",
    color: "#d9534f",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    width: "100%",
    height: "100%",
    padding: "8px 0",
  },
  addButton: {
    backgroundColor: "#5cb85c",
    color: "white",
    border: "none",
    padding: "8px 15px",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "14px",
    marginBottom: "20px",
  },
  totalsContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  totalsTable: {
    width: "40%",
  },
  totalsRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 0",
    borderBottom: "1px solid #eee",
  },
  totalsLabel: {
    display: "flex",
    alignItems: "center",
  },
  totalsValue: {
    textAlign: "right",
    fontWeight: "normal",
  },
  taxRateInput: {
    width: "40px",
    margin: "0 5px",
    padding: "2px 5px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    fontSize: "12px",
    textAlign: "center",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    fontWeight: "bold",
    borderBottom: "2px solid #333",
  },
  totalLabel: {
    fontWeight: "bold",
  },
  totalValue: {
    textAlign: "right",
    fontWeight: "bold",
    fontSize: "16px",
  },
  termsContainer: {
    marginTop: "50px",
  },
  termsTitle: {
    fontWeight: "bold",
    marginBottom: "5px",
    fontSize: "16px",
  },
  termsText: {
    marginTop: "0",
  },
  bankInfo: {
    marginTop: "20px",
  },
  bankInfoRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  },
  backButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "14px",
    marginRight: "10px",
  },
  downloadButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "14px",
  },
};
