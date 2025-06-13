import React, { useState, useEffect } from "react";

import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  FormGroup,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import Select from 'react-select';
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from '../../Service';

function AddInventory({ props, onInventoryAdded }) {
  const navigate = useNavigate()
  document.title = "Add Product | Lexa - Responsive Bootstrap 5 Admin Dashboard";

  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Products", link: "#" },
    { title: "Add Product", link: "#" },
  ];

  const [formData, setFormData] = useState({
    brand_name: "",
    model_name: "",
    storage_gb: "",
    color: "",
    network_type: "",
    condition: "Brand New",
    sku: "",
    serial_no: "",
    imei: "",
    product_description: "",
    feature_imageUrl: null,
    all_imageUrls: [],
    supplier_id: "",
    discount_type: "fixed",
    discount_price: "",
    purchase_price: "",
    selling_price: "",
    stock_status: "In Stock",
    quantity: "",
    purchase_order_no: "",
    location: "",
    wholesale_price: "",
    category: "",
  });


  const [supplierOptions, setSupplierOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  useEffect(() => {
    
    const fetchSuppliers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/suppliers`);
        const data = await response.json();
        const options = data.data.data.map(supplier => ({
          value: supplier.id,
          label: supplier.user.name
        }));
        setSupplierOptions(options);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/product-categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategories();
  }, []);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
  if (name === "category") {
    const selectedCategory = categories.find(cat => cat.id.toString() === value);
    setSelectedCategoryName(selectedCategory ? selectedCategory.name : "");
  }
};

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "feature_imageUrl") {
      setFormData({
        ...formData,
        [name]: files[0], 
      });
    } else if (name === "all_imageUrls") {
      setFormData({
        ...formData,
        [name]: Array.from(files), 
      });
    }
  };

  
  const generateBarcode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Current formData:", formData);
    console.log("Submitting with category ID:", formData.category);

    const formDataToSend = new FormData();
    const generatedBarcode = generateBarcode();
    
    for (const key in formData) {
      if (key === "all_imageUrls") {
        formData[key].forEach((file, index) => {
          formDataToSend.append(`all_imageUrls[${index}]`, file);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    formDataToSend.append('barcode', generatedBarcode);
    console.log("BArcode: ", generatedBarcode)

    try {
      const response = await fetch(`${BASE_URL}/inventory`, {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      console.log('Result', result)
      toast.success('Inventory Added Successfully');
      
      setTimeout(() => {
        if (typeof onInventoryAdded === 'function') {
          onInventoryAdded();
        } else {
          console.error("onInventoryAdded is not a function");
        }
      }, 2000);

    } catch (error) {
      console.error("Error adding inventory:", error);
      toast.error('Error adding inventory. Please try again.')
      
    }
  };

  return (
    <React.Fragment>
      <Toaster position="top-right" richColors />
      <Row>
        <Col>
          <Card>
            <CardBody>
              <CardTitle className="h4">Add Product</CardTitle>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Label htmlFor="brand_name" className="col-md-2 col-form-label">
                    Brand Name
                  </Label>
                  <Col md={10}>
                    <Input
                      type="text"
                      name="brand_name"
                      id="brand_name"
                      value={formData.brand_name}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>

                
                <Row className="mb-3">
                  <Label htmlFor="model_name" className="col-md-2 col-form-label">
                    Model
                  </Label>
                  <Col md={10}>
                    <Input
                      type="text"
                      name="model_name"
                      id="model_name"
                      value={formData.model_name}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Label htmlFor="storage_gb" className="col-md-2 col-form-label">
                    Storage
                  </Label>
                  <Col md={10}>
                    <Input
                      type="text"
                      name="storage_gb"
                      id="storage_gb"
                      value={formData.storage_gb}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Label htmlFor="color" className="col-md-2 col-form-label">
                    Color
                  </Label>
                  <Col md={10}>
                    <Input
                      type="text"
                      name="color"
                      id="color"
                      value={formData.color}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
  <Label htmlFor="category" className="col-md-2 col-form-label">
    Category
  </Label>
  <Col md={10}>
    <Input
      type="select"
      name="category"
      id="category"
      value={formData.category}
      onChange={handleChange}
      required
    >
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </Input>
  </Col>
</Row>

{selectedCategoryName === "phones" && (
  <Row className="mb-3">
    <Label htmlFor="network_type" className="col-md-2 col-form-label">
      Network Type
    </Label>
    <Col md={10}>
      <Input
        type="text"
        name="network_type"
        id="network_type"
        value={formData.network_type}
        onChange={handleChange}
        required={selectedCategoryName === "phones"}
      />
    </Col>
  </Row>
)}

{selectedCategoryName === "phones" && (
  <Row className="mb-3">
    <Label htmlFor="imei" className="col-md-2 col-form-label">
      IMEI
    </Label>
    <Col md={10}>
      <Input
        type="text"
        name="imei"
        id="imei"
        value={formData.imei}
        onChange={handleChange}
        required={selectedCategoryName === "phones"}
      />
    </Col>
  </Row>
)}
              
                <Row className="mb-3">
                  <Label htmlFor="condition" className="col-md-2 col-form-label">
                    Condition
                  </Label>
                  <Col md={10}>
                    <Input
                      type="select"
                      name="condition"
                      id="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      required
                    >
                      <option value="Brand New">Brand New (Sealed device)</option>
                      <option value="14 Days">14 Days (Open-box device with all accessories)</option>
                      <option value="Grade A">Grade A (Excellent condition, no cosmetic signs)</option>
                      <option value="Grade B">Grade B (Minor wear and tear, fully functional)</option>
                      <option value="Grade C">Grade C (Heavy wear and tear, fully functional)</option>
                      <option value="Grade D">Grade D (1-2 issues, stock list items, no iCloud issues)</option>
                      <option value="Grade E">Grade E (Doesn't power up, 3-5 problems, requires assignment)</option>
                    </Input>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Label htmlFor="sku" className="col-md-2 col-form-label">
                    SKU
                  </Label>
                  <Col md={10}>
                    <Input
                      type="text"
                      name="sku"
                      id="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Label htmlFor="serial_no" className="col-md-2 col-form-label">
                    Serial No
                  </Label>
                  <Col md={10}>
                    <Input
                      type="text"
                      name="serial_no"
                      id="serial_no"
                      value={formData.serial_no}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Label htmlFor="product_description" className="col-md-2 col-form-label">
                    Product Description
                  </Label>
                  <Col md={10}>
                    <Input
                      type="textarea"
                      name="product_description"
                      id="product_description"
                      value={formData.product_description}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Label htmlFor="feature_imageUrl" className="col-md-2 col-form-label">
                    Feature Image
                  </Label>
                  <Col md={10}>
                    <Input
                      type="file"
                      name="feature_imageUrl"
                      id="feature_imageUrl"
                      onChange={handleFileChange}
                    />
                  </Col>
                </Row>

               
                <Row className="mb-3">
                  <Label htmlFor="all_imageUrls" className="col-md-2 col-form-label">
                    All Images
                  </Label>
                  <Col md={10}>
                    <Input
                      type="file"
                      name="all_imageUrls"
                      id="all_imageUrls"
                      onChange={handleFileChange}
                      multiple
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Label htmlFor="supplier_id" className="col-md-2 col-form-label">
                    Supplier ID
                  </Label>
                  <Col md={10}>
                    <Select
                      options={supplierOptions}
                      onChange={(selectedOption) => setFormData({ ...formData, supplier_id: selectedOption.value })}
                      required
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Label htmlFor="discount_type" className="col-md-2 col-form-label">
                    Discount Type
                  </Label>
                  <Col md={10}>
                    <Input
                      type="select"
                      name="discount_type"
                      id="discount_type"
                      value={formData.discount_type}
                      onChange={handleChange}
                      required
                    >
                      <option value="fixed">Fixed</option>
                      <option value="percentage">Percentage</option>
                    </Input>
                  </Col>
                </Row>

              
                <Row className="mb-3">
                  <Label htmlFor="discount_price" className="col-md-2 col-form-label">
                    Discount Amount
                  </Label>
                  <Col md={10}>
                    <Input
                      type="number"
                      name="discount_price"
                      id="discount_price"
                      value={formData.discount_price}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Label htmlFor="wholesale_price" className="col-md-2 col-form-label">
                    Wholesale Price
                  </Label>
                  <Col md={10}>
                    <Input
                      type="number"
                      name="wholesale_price"
                      id="wholesale_price"
                      value={formData.wholesale_price}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>

                
                <Row className="mb-3">
                  <Label htmlFor="purchase_price" className="col-md-2 col-form-label">
                    Purchase Price
                  </Label>
                  <Col md={10}>
                    <Input
                      type="number"
                      name="purchase_price"
                      id="purchase_price"
                      value={formData.purchase_price}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>

                
                <Row className="mb-3">
                  <Label htmlFor="selling_price" className="col-md-2 col-form-label">
                    Selling Price
                  </Label>
                  <Col md={10}>
                    <Input
                      type="number"
                      name="selling_price"
                      id="selling_price"
                      value={formData.selling_price}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>

                
                <Row className="mb-3">
                  <Label htmlFor="stock_status" className="col-md-2 col-form-label">
                    Status
                  </Label>
                  <Col md={10}>
                    <Input
                      type="select"
                      name="stock_status"
                      id="stock_status"
                      value={formData.stock_status}
                      onChange={handleChange}
                      required
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Sold">Sold</option>
                      <option value="Returned">Returned</option>
                      <option value="Defective">Returned</option>
                    </Input>
                  </Col>
                </Row>

                
                <Row className="mb-3">
                  <Label htmlFor="quantity" className="col-md-2 col-form-label">
                    Stock Quantity
                  </Label>
                  <Col md={10}>
                    <Input
                      type="number"
                      name="quantity"
                      id="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>

                
                <Row className="mb-3">
                  <Label htmlFor="location" className="col-md-2 col-form-label">
                    Location
                  </Label>
                  <Col md={10}>
                    <Input
                      type="text"
                      name="location"
                      id="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>

                
                <Row className="mb-3">
                  <Col className="text-end">
                    <Button type="submit" color="primary">
                      Add Product
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
};

export default connect(null, { setBreadcrumbItems })(AddInventory);