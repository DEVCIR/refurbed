import React, { useEffect, useState } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { connect } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Toaster, toast } from "sonner";

const RmasTable = (props) => {
  document.title = "RMA Items | Lexa - Responsive Bootstrap 5 Admin Dashboard";

  const [rmaItems, setRmaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [totalPrice, setTotalPrice] = useState();
  const [unitPrice, setUnitPrice] = useState();

  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "RMA", link: "#" },
    { title: "RMA Items", link: "#" },
  ];

  useEffect(() => {
    props.setBreadcrumbItems('RMA Items', breadcrumbItems);
    fetchRmaItems();
  }, []);

  useEffect(()=>{
    console.log("Selected RMA Data",rmaItems);
  },[rmaItems]);

  useEffect(() => {
    console.log("Total Price:", totalPrice);
  }, [totalPrice]);

  const fetchRmaItems = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/rma-items");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      const filteredItems = data.data.data.filter(item => !item.is_active);
      setRmaItems(filteredItems);
    } catch (error) {
      console.error("Error fetching RMA items:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const getStatusBadge = (isActive) => {
    return isActive ? (
      <Badge color="success" className="badge-lg">Active</Badge>
    ) : (
      <Badge color="danger" className="badge-lg">Inactive</Badge>
    );
  };

const [myInvID,setMyInvID]=useState("")
  
  const toggleModal = (itemId = null,myData) => {
    setSelectedItemId(itemId);

    setMyInvID(myData?.inventory_id)
    console.log("RMA item id: ",myData?.rma_id);
    console.log("This is my inventory Id",myData?.inventory_id)
    console.log("This is my customer Id",myData?.rma.customer_id)
    console.log("This is product quantity ",myData?.quantity)
    setModal(!modal);
  };

  const formatDate = (dateString) => {
  if (!dateString) return "N/A"; 
  
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateDaysDifference = (requestDate) => {
    if (!requestDate) return 0;
    
    const currentDate = new Date();
    const requestedDate = new Date(requestDate);
    currentDate.setHours(0, 0, 0, 0);
    requestedDate.setHours(0, 0, 0, 0);
    
    const timeDifference = currentDate.getTime() - requestedDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    
    return daysDifference;
  };

  const shouldHighlightRow = (requestDate) => {
    const daysDifference = calculateDaysDifference(requestDate);
    return daysDifference > 14;
  };

  const handleEditConfirm = async () => {
    try {
      
      const orderItemsResponse = await fetch(`http://localhost:8000/api/order-items?inventory_id=${myInvID}`);
      
      if (!orderItemsResponse.ok) {
        throw new Error(`HTTP error! status: ${orderItemsResponse.status}`);
      }
      
      const orderItemsData = await orderItemsResponse.json();
  
      const fetchedTotalPrice = orderItemsData.data.data[0]?.total_price;
      setTotalPrice(fetchedTotalPrice);
  
      const fetchedUnitPrice = orderItemsData.data.data[0]?.unit_price;
      setUnitPrice(fetchedUnitPrice);
      
      console.log("Fetched Total Price:", fetchedTotalPrice);
      console.log("Fetched Unit Price:", fetchedUnitPrice);
  
      
      const response = await fetch(`http://localhost:8000/api/rma-items/${selectedItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_active: true 
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      toast.success('RMA item status updated successfully!');
  
      
      const rmaItem = rmaItems.find(item => item.id === selectedItemId);
      const randomNumber = Math.floor(Math.random() * 900) + 100;
      
    
      const creditNoteData = {
        credit_note_number: `CRE-${randomNumber}`,
        rma_id: rmaItem?.rma_id,
        customer_id: rmaItem?.rma.customer_id,
        issue_date: new Date().toISOString().split('T')[0], 
        total_amount: fetchedTotalPrice,
        status: "Issued",
        created_by: 13
      };
  
      
      const creditNoteResponse = await fetch("http://localhost:8000/api/credit-notes", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(creditNoteData)
      });
  
      if (!creditNoteResponse.ok) {
        throw new Error(`HTTP error! status: ${creditNoteResponse.status}`);
      }
  
      const creditNoteResult = await creditNoteResponse.json();
      console.log("Credit note created:", creditNoteResult);
      toast.success('Credit note created successfully!');

      const creditNoteItemData = {
        credit_note_id: creditNoteResult.id, 
        inventory_id: rmaItem?.inventory_id,
        quantity: rmaItem?.quantity,
        unit_price: fetchedUnitPrice,
        total_price: fetchedTotalPrice
      };
  
      console.log("Credit Note Item Data:", creditNoteItemData);
  
      const creditNoteItemResponse = await fetch("http://localhost:8000/api/credit-notes-item", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(creditNoteItemData)
      });
  
      if (!creditNoteItemResponse.ok) {
        throw new Error(`HTTP error! status: ${creditNoteItemResponse.status}`);
      }
  
      const creditNoteItemResult = await creditNoteItemResponse.json();
      console.log("Credit note item created:", creditNoteItemResult);
      toast.success('Credit note item created successfully!');
  
      await fetchRmaItems();
      
    } catch (error) {
      console.error("Error in operation:", error);
      toast.error(`Failed to complete operation: ${error.message}`);
    } finally {
      toggleModal(); 
    }
  };

  return (
    <React.Fragment>
      <Toaster richColors position="top-right" />
      
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Inactive RMA Items</CardTitle>
              <p className="card-title-desc">
                List of Return Merchandise Authorization items that are not active.
              </p>

              <div className="table-responsive">
                {loading ? (
                  <p>Loading RMA items...</p>
                ) : error ? (
                  <p className="text-danger">Error loading RMA items: {error}</p>
                ) : (
                  <Table className="table mb-0">
                    <thead>
                      <tr>
                        <th>RMA No</th>
                        <th>Customer Name</th>
                        <th>Order Number</th>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Days</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rmaItems.length > 0 ? (
                        rmaItems.map((item) => {
                          const daysDifference = calculateDaysDifference(item.rma?.request_date);
                          const isOverdue = shouldHighlightRow(item.rma?.request_date);
                          
                          return (
<tr 
  key={item.id}
  style={{
    backgroundColor: isOverdue ? '#ffebee' : '',
    position: 'relative'
  }}
>
  {[
    item.rma?.rma_number,
    item.rma?.customer?.user?.name,
    item.rma?.order?.order_number,
    formatDate(item.rma?.request_date),
    item.inventory?.variant?.product?.model_name,
    item.quantity,
    item.reason,
    getStatusBadge(item.is_active),
    <span style={isOverdue ? { color: '#d32f2f', fontWeight: 'bold' } : {}}>{daysDifference} days</span>,
    <div className="d-flex gap-2">
      <Button
        color="primary"
        size="mm"
        disabled={isOverdue}
        onClick={() => toggleModal(item.id, item)}
      >
        Edit
      </Button>
    </div>
  ].map((content, idx) => (
    <td
      key={idx}
      style={{
        position: 'relative'
      }}
    >
      
      <div
        style={isOverdue ? {
          filter: 'blur(1.2px)',
          opacity: 0.5
        } : {}}
      >
        {content}
      </div>

      {isOverdue && idx === 4 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300%', 
            padding: '6px 12px',
            borderRadius: '6px',
            fontWeight: 'bold',
            color: '#d32f2f',
            zIndex: 5,
            fontSize: '13px',
            pointerEvents: 'none',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
            border: '1px solid #d32f2f' 
          }}
        >
          RMA request expired after 14 days
        </div>
      )}
    </td>
  ))}
</tr>
  );
    })
       ) : (
            <tr>
                          <td colSpan="10" className="text-center">
                            No inactive RMA items found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirm Edit</ModalHeader>
        <ModalBody>
          Are you sure you want to activate this RMA item?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            No
          </Button>
          <Button color="primary" onClick={handleEditConfirm}>
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default connect(null, { setBreadcrumbItems })(RmasTable);