import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Button, CardTitle, Table } from "reactstrap";
import { connect } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Toaster, toast } from "sonner";
import { API_BASE_URL } from "../../Service";

const SupplierTable = (props) => {
  document.title = "Supplier | Lexa - Responsive Bootstrap 5 Admin Dashboard";

  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Supplier", link: "#" },
  ];

  const [supplierData, setSupplierData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSupplierData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/suppliers`);
      const result = await response.json();

      if (result.data && result.data.data && Array.isArray(result.data.data)) {
        setSupplierData(result.data.data);
        console.log("Suppliers loaded:", result.data.data);
      } else {
        setSupplierData([]);
        console.warn("Unexpected data format:", result);
      }
    } catch (error) {
      console.error("Error fetching supplier data:", error);
      setSupplierData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    props.setBreadcrumbItems("Suppliers", breadcrumbItems);
    fetchSupplierData();
  }, [props]);

  const displayField = (value) => {
    return value ? value : "N/A";
  };

  const handleEditClick = (supplierId) => {
    props.onEditSupplierClick(supplierId);
  };

  const handleDeleteClick = async (supplierId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/suppliers/${supplierId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted supplier from state
        setSupplierData((prevData) =>
          prevData.filter((supplier) => supplier.id !== supplierId),
        );
        toast.success("Supplier deleted successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to delete supplier");
      }
    } catch (error) {
      console.error("Error deleting supplier:", error);
      toast.error("An error occurred while deleting the supplier");
    }
  };

  return (
    <React.Fragment>
      <Toaster position="top-right" richColors />
      <Row style={{ minHeight: "70vh" }}>
        <Col>
          <Card>
            <CardBody>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Col>
                  <CardTitle className="h4">Suppliers</CardTitle>
                </Col>
                <Col
                  style={{ display: "flex", gap: "10px" }}
                  className="text-end"
                >
                  <Button color="success" onClick={props.onAddSupplierClick}>
                    Add Supplier
                  </Button>
                  <Button color="success" onClick={props.onUploadSupplierClick}>
                    Upload Supplier File
                  </Button>
                </Col>
              </div>

              {loading ? (
                <div className="text-center">Loading suppliers...</div>
              ) : (
                <div className="table-responsive">
                  <Table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Contact Person</th>
                        <th>Address</th>
                        <th>Tax ID</th>
                        <th>Payment Terms</th>
                        <th>Notes</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supplierData.length > 0 ? (
                        supplierData.map((supplier) => (
                          <tr key={supplier.id}>
                            <td>
                              {supplier.user
                                ? `${displayField(supplier.user.name)}`
                                : "N/A"}
                            </td>
                            <td>{displayField(supplier.contact_person)}</td>
                            <td>{displayField(supplier.address)}</td>
                            <td>{displayField(supplier.tax_id)}</td>
                            <td>{displayField(supplier.payment_terms)}</td>
                            <td>{displayField(supplier.notes)}</td>
                            <td>
                              <div style={{ display: "flex", gap: "5px" }}>
                                <Button
                                  color="primary"
                                  size="sm"
                                  onClick={() => handleEditClick(supplier.id)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  color="danger"
                                  size="sm"
                                  onClick={() => handleDeleteClick(supplier.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center">
                            No supplier data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default connect(null, { setBreadcrumbItems })(SupplierTable);
