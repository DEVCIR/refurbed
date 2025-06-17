import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Toaster, toast } from "sonner";
import { API_BASE_URL } from "../../Service";

function AddProductCategory({ props, onBackClick }) {
  document.title =
    "Add Product Category | Lexa - Responsive Bootstrap 5 Admin Dashboard";

  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Product Management", link: "#" },
    { title: "Add Category", link: "#" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    created_by: "",
  });

  const [users, setUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users");
      const result = await response.json();

      const adminUsers = result.data.filter((user) => user.role === "admin");
      setUsers(adminUsers);
      setLoadingUsers(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const categoryData = {
      name: formData.name,
      created_by: formData.created_by,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/product-categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_TOKEN_HERE",
          },
          body: JSON.stringify(categoryData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error creating product category");
      }

      toast.success("Product category created successfully", {
        duration: 1500,
        onAutoClose: () => {
          onBackClick();
        },
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <Toaster position="top-right" richColors />
      <Row>
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
                <CardTitle className="h4">Add Product Category</CardTitle>
                <Button
                  color="success"
                  style={{ marginLeft: 2, padding: "5px 15px" }}
                  onClick={onBackClick}
                >
                  Back
                </Button>
              </div>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Label htmlFor="name" className="col-md-2 col-form-label">
                    Category Name
                  </Label>
                  <Col md={10}>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter category name"
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Label
                    htmlFor="created_by"
                    className="col-md-2 col-form-label"
                  >
                    Created By (Admin)
                  </Label>
                  <Col md={10}>
                    {loadingUsers ? (
                      <Input type="select" disabled>
                        <option>Loading admins...</option>
                      </Input>
                    ) : (
                      <Input
                        type="select"
                        name="created_by"
                        id="created_by"
                        value={formData.created_by}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Admin</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name} ({user.email})
                          </option>
                        ))}
                      </Input>
                    )}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col className="text-end">
                    <Button
                      type="submit"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating..." : "Add Category"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default connect(null, { setBreadcrumbItems })(AddProductCategory);
