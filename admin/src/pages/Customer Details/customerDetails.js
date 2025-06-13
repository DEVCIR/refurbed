import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { FiUser, FiShoppingBag, FiDollarSign, FiPackage, FiPercent, FiCreditCard } from 'react-icons/fi';

export default function CustomerInvoices() {
  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState({
    customers: true,
    invoices: false
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/customers');
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        setCustomers(data.data.data);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load customers");
      } finally {
        setLoading(prev => ({ ...prev, customers: false }));
      }
    };

    fetchCustomers();
  }, []);

  const handleCustomerChange = async (event) => {
    const customerId = event.target.value;
    if (!customerId) {
      setSelectedCustomer(null);
      setInvoices([]);
      return;
    }

    const selected = customers.find(c => c.id == customerId);
    setSelectedCustomer(selected);

    setLoading(prev => ({ ...prev, invoices: true }));
    setInvoices([]);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/invoices?customer_id=${customerId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch invoices');
      }
      const data = await response.json();
      
      if (data.data.data.length === 0) {
        toast.error("No invoices found for this customer");
      } else {
        setInvoices(data.data.data);
      }
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load invoices');
    } finally {
      setLoading(prev => ({ ...prev, invoices: false }));
    }
  };

  const calculateSummary = () => {
    if (invoices.length === 0) return null;
    
    let totalOrders = invoices.length;
    let totalItems = 0;
    let totalRevenue = 0;
    
    invoices.forEach(invoice => {
      invoice.order?.items?.forEach(item => {
        totalItems += item.quantity;
        totalRevenue += parseFloat(item.total_price);
      });
    });
    
    return {
      totalOrders,
      totalItems,
      totalRevenue: totalRevenue.toFixed(2)
    };
  };

  const summary = calculateSummary();

  return (
    <div className="container-fluid py-4">
      <Toaster position="top-right" richColors />
      
      <Card className="mb-5 shadow-sm border-0" style={{ borderRadius: '12px' }}>
        <CardBody className="p-4">
          <CardTitle tag="h5" className="mb-4 d-flex align-items-center">
            <FiUser className="me-2" /> Customer Selection
          </CardTitle>
          
          <div className="row mb-3">
            <label className="col-md-2 col-form-label fw-bold">Select Customer</label>
            <div className="col-md-10">
              <select 
                onChange={handleCustomerChange} 
                className="form-select form-select-lg border-2"
                disabled={loading.customers}
                style={{ borderRadius: '8px', borderColor: '#e0e0e0' }}
              >
                <option value="">Select a customer</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.user.name} ({customer.user.email})
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {selectedCustomer && (
            <div className="mt-4 p-3 bg-light rounded-3">
              <div className="row">
                <div className="col-md-6">
                  <h5 className="fw-bold">Customer Details</h5>
                  <p className="mb-1 fs-5"><span className="text-muted">Name:</span> {selectedCustomer.user.name}</p>
                  <p className="mb-1 fs-5"><span className="text-muted">Email:</span> {selectedCustomer.user.email}</p>
                </div>
                <div className="col-md-6">
                  <h5 className="fw-bold">Shipping Address</h5>
                  <p className="mb-1 fs-5">{selectedCustomer.address || 'No address provided'}</p>
                </div>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {loading.invoices && (
        <div className="text-center my-5 py-4">
          <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading customer orders...</p>
        </div>
      )}

      {!loading.invoices && invoices.length === 0 && selectedCustomer && (
        <div className="alert alert-info mt-4">
          <FiShoppingBag className="me-2" />
          No orders found for this customer.
        </div>
      )}

      {summary && (
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px', backgroundColor: '#f8f9fa' }}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                    <FiShoppingBag className="text-primary" size={24} />
                  </div>
                  <div>
                    <h5 className="mb-0 text-muted fw-bold">Total Orders</h5>
                    <h3 className="mb-0">{summary.totalOrders}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px', backgroundColor: '#f8f9fa' }}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                    <FiPackage className="text-success" size={24} />
                  </div>
                  <div>
                    <h5 className="mb-0 text-muted fw-bold">Total Items Quantity</h5>
                    <h3 className="mb-0">{summary.totalItems}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px', backgroundColor: '#f8f9fa' }}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="bg-warning bg-opacity-10 p-3 rounded-circle me-3">
                    <FiDollarSign className="text-warning" size={24} />
                  </div>
                  <div>
                    <h5 className="mb-0 text-mute fw-boldd">Total Revenue</h5>
                    <h3 className="mb-0">${summary.totalRevenue}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {invoices.length > 0 && (
        <div className="row">
          {invoices.map((invoice, invoiceIndex) => (
            <div key={invoice.id} className="col-12 mb-4">
              <Card className="shadow-sm border-0" style={{ borderRadius: '12px' }}>
                <CardBody className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h5 className="mb-1">
                        <FiCreditCard className="me-2" />
                        Order #{invoice.order?.order_number || 'N/A'}
                      </h5>
                      <small className="text-muted">
                        Invoice Date: {new Date(invoice.created_at).toLocaleDateString()}
                      </small>
                    </div>
                    <span className="badge bg-primary bg-opacity-10 text-primary p-2">
                      ${parseFloat(invoice.order?.total_amount || 0).toFixed(2)}
                    </span>
                  </div>
                                    
                  <h5 className="fw-bold mb-3">Order Items</h5>
                  <div className="row">
                    {invoice.order?.items?.map((item, itemIndex) => (
                      <div key={itemIndex} className="col-md-6 mb-3">
                        <div className="card border-0 bg-light h-100">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-3">
                                {item.inventory?.variant?.product?.feature_imageUrl ? (
                                  <img 
                                    src={`http://127.0.0.1:8000/storage/${item.inventory.variant.product.feature_imageUrl}`} 
                                    alt="Product" 
                                    className="img-fluid rounded-3"
                                    style={{ width: '100%', height: '80px', objectFit: 'cover' }}
                                  />
                                ) : (
                                  <div className="bg-secondary bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center" 
                                    style={{ width: '100%', height: '80px' }}>
                                    <FiPackage size={24} className="text-muted" />
                                  </div>
                                )}
                              </div>
                              <div className="col-9">
                                <h5 className="mb-1">{item.inventory?.variant?.product?.model_name || 'Unknown Product'}</h5>
                                <div className="d-flex justify-content-between">
                                  <small className="text-muted">Qty: {item.quantity}</small>
                                  <small className="text-muted">${parseFloat(item.unit_price).toFixed(2)} each</small>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                  <div>
                                    {item.discount_amount > 0 && (
                                      <span className="badge bg-danger bg-opacity-10 text-danger">
                                        <FiPercent size={12} className="me-1" />
                                        ${parseFloat(item.discount_amount).toFixed(2)} off
                                      </span>
                                    )}
                                  </div>
                                  <h6 className="mb-0">${parseFloat(item.total_price).toFixed(2)}</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}