import React, { useState, useEffect } from "react";
import { 
  Row, 
  Col, 
  Card, 
  CardBody, 
  CardTitle, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Alert
} from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import ReactPaginate from "react-paginate";
import { FaPlus, FaTimes, FaCheck, FaInfoCircle, FaChevronDown, FaEdit } from "react-icons/fa";

const ProductGrading = () => {
  document.title = "Products Table | Lexa - Responsive Bootstrap 5 Admin Dashboard";

  const conditionChecklists = {
    phones: [
      "Screen condition (no cracks/scratches)",
      "Battery health (80% or above)",
      "Camera functionality",
      "Speaker and microphone working",
      "No water damage"
    ],
    tvs: [
      "Screen condition (no dead pixels)",
      "Remote control working",
      "All ports functional",
      "No image retention/burn-in",
      "Sound system working"
    ],
    desktops: [
      "Power on/off properly",
      "All ports working",
      "No unusual noises",
      "RAM and storage as advertised",
      "No physical damage"
    ],
    accessories: [
      "No physical damage",
      "Full functionality",
      "Original packaging",
      "All components included",
      "No signs of wear"
    ],
    printers: [
      "Power on/off properly",
      "Print quality test passed",
      "No paper jams",
      "All connectivity working",
      "Ink/toner levels acceptable"
    ],
    cameras: [
      "Lens condition (no scratches)",
      "Sensor condition",
      "Shutter count acceptable",
      "All buttons functioning",
      "LCD screen condition"
    ],
    laptops: [
      "Keyboard and touchpad working",
      "No dead pixels on display",
      "Battery holds charge",
      "All ports functional",
      "No overheating issues"
    ],
    consoles: [
      "Power on/off properly",
      "Disc drive working",
      "All controller ports functional",
      "No overheating issues",
      "Original controllers included"
    ]
  };

  const [products, setProducts] = useState([]);
  const [gradings, setGradings] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentGradingId, setCurrentGradingId] = useState(null);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchProducts();
    fetchGradings();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/products");
      const data = await response.json();
      setProducts(data.data.data);
      setPageCount(Math.ceil(data.data.total / itemsPerPage));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchGradings = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/gradings");
      const data = await response.json();
      setGradings(data.data || data); // Handle different response structures
    } catch (error) {
      console.error("Error fetching gradings:", error);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const toggleModal = (product = null, isUpdate = false) => {
    setSelectedProduct(product);
    setSelectedConditions([]);
    setDropdownOpen(false);
    setAlert({ show: false, message: '', type: 'success' });
    setIsUpdateMode(isUpdate);
    setCurrentGradingId(null);
    
    // If it's update mode, fetch existing conditions
    if (isUpdate && product) {
      const existingGrading = gradings.find(grading => grading.product_id === product.id);
      if (existingGrading) {
        setCurrentGradingId(existingGrading.id);
        try {
          const conditions = JSON.parse(existingGrading.product_condition);
          // Extract condition names from the stored object keys
          const conditionNames = Object.keys(conditions).map(key => 
            key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          );
          
          // Match stored conditions with available checklist items
          const availableConditions = getChecklistForCategory(product.category);
          const matchedConditions = availableConditions.filter(condition => {
            const normalizedCondition = condition.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_');
            return Object.keys(conditions).includes(normalizedCondition);
          });
          
          setSelectedConditions(matchedConditions);
        } catch (error) {
          console.error("Error parsing existing conditions:", error);
        }
      }
    }
    
    setModalOpen(!modalOpen);
  };

  const handleConditionChange = (condition) => {
    setSelectedConditions(prev => 
      prev.includes(condition) 
        ? prev.filter(item => item !== condition)
        : [...prev, condition]
    );
  };

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  const handleSaveFeatures = async () => {
    if (!selectedProduct || selectedConditions.length === 0) {
      showAlert('Please select at least one condition', 'danger');
      return;
    }

    setIsLoading(true);
    
    // Convert selected conditions array to JSON object format
    const conditionsObject = {};
    selectedConditions.forEach((condition, index) => {
      const key = condition.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_');
      conditionsObject[key] = 'passed';
    });
    
    const gradingData = {
      product_id: selectedProduct.id,
      product_condition: JSON.stringify(conditionsObject)
    };

    console.log('Sending grading data:', gradingData);

    try {
      let response;
      
      if (isUpdateMode && currentGradingId) {
        // Update existing grading
        response = await fetch(`http://127.0.0.1:8000/api/gradings/${currentGradingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(gradingData),
        });
      } else {
        // Create new grading
        response = await fetch('http://127.0.0.1:8000/api/gradings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(gradingData),
        });
      }

      console.log('Response status:', response.status);

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response received:', textResponse);
        showAlert('Server returned invalid response format', 'danger');
        return;
      }

      if (response.ok) {
        const result = await response.json();
        console.log('Grading saved successfully:', result);
        showAlert(
          isUpdateMode ? 'Conditions updated successfully!' : 'Conditions saved successfully!', 
          'success'
        );
        
        // Refresh gradings data
        await fetchGradings();
        
        // Close modal after 1.5 seconds
        setTimeout(() => {
          toggleModal();
        }, 1500);
      } else {
        try {
          const errorData = await response.json();
          console.error('Error saving grading:', errorData);
          showAlert(errorData.message || `Failed to save conditions (${response.status})`, 'danger');
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
          showAlert(`Failed to save conditions (${response.status})`, 'danger');
        }
      }
    } catch (error) {
      console.error('Network error:', error);
      if (error.message.includes('JSON')) {
        showAlert('Server response format error. Please check the API endpoint.', 'danger');
      } else {
        showAlert('Network error occurred. Please try again.', 'danger');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getChecklistForCategory = (category) => {
    if (!category || !category.name) return [];
    const categoryName = category.name.toLowerCase();
    return conditionChecklists[categoryName] || [];
  };

  const hasExistingGrading = (productId) => {
    return gradings.some(grading => grading.product_id === productId);
  };

  const getExistingConditionsCount = (productId) => {
    const grading = gradings.find(grading => grading.product_id === productId);
    if (!grading) return 0;
    
    try {
      const conditions = JSON.parse(grading.product_condition);
      return Object.keys(conditions).length;
    } catch (error) {
      return 0;
    }
  };

  const currentProducts = products.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const getSelectedText = () => {
    if (selectedConditions.length === 0) {
      return 'Select conditions...';
    }
    if (selectedConditions.length === 1) {
      return selectedConditions[0];
    }
    return `${selectedConditions.length} conditions selected`;
  };

  return (
    <React.Fragment>
      <Row style={{ minHeight: '60vh' }}>
        <Col>
          <Card>
            <CardBody>
              <CardTitle className="h4">Products Table</CardTitle>
              
              <div className="table-rep-plugin">
                <div className="table-responsive mb-0">
                  <Table id="tech-companies-1" className="table table-striped table-bordered">
                    <Thead>
                      <Tr>
                        <Th className="text-center">Feature Image</Th>
                        <Th className="text-center">SKU</Th>
                        <Th className="text-center">Model</Th>
                        <Th className="text-center">Category</Th>
                        <Th className="text-center">Status</Th>
                        <Th className="text-center">Grading Status</Th>
                        <Th className="text-center">Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {currentProducts.map((product) => (
                        <Tr key={product.id}>
                          <Td className="text-center">
                            <img 
                              src={product.feature_imageUrl || "https://via.placeholder.com/50"} 
                              alt="Feature" 
                              width="50" 
                              className="mx-auto d-block"
                              onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = "https://via.placeholder.com/50";
                              }}
                            />
                          </Td>
                          <Td className="text-center align-middle">{product.sku}</Td>
                          <Td className="text-center align-middle">{product.model_name}</Td>
                          <Td className="text-center align-middle">{product.category.name}</Td>
                          <Td className="text-center align-middle">
                            <span className={`badge ${product.is_active ? 'bg-success' : 'bg-danger'}`}>
                              {product.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </Td>
                          <Td className="text-center align-middle">
                            {hasExistingGrading(product.id) ? (
                              <span className="badge bg-info">
                                {getExistingConditionsCount(product.id)} conditions set
                              </span>
                            ) : (
                              <span className="badge bg-secondary">No grading</span>
                            )}
                          </Td>
                          <Td className="text-center align-middle">
                            <div className="d-flex gap-1 justify-content-center">
                              <button 
                                className="btn btn-primary btn-sm d-flex align-items-center"
                                onClick={() => toggleModal(product, false)}
                              >
                                <FaPlus className="me-1" /> Add
                              </button>
                              {hasExistingGrading(product.id) && (
                                <button 
                                  className="btn btn-warning btn-sm d-flex align-items-center"
                                  onClick={() => toggleModal(product, true)}
                                >
                                  <FaEdit className="me-1" /> Update
                                </button>
                              )}
                            </div>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </div>

                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination justify-content-end"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                  forcePage={currentPage}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Product Details Modal */}
      <Modal isOpen={modalOpen} toggle={() => toggleModal()} centered size="lg">
        <ModalHeader toggle={() => toggleModal()} className="bg-primary text-white">
          <FaInfoCircle className="me-2" />
          {selectedProduct?.model_name || 'Product Details'} - 
          {isUpdateMode ? ' Update Conditions' : ' Add Conditions'}
        </ModalHeader>
        <ModalBody>
          {alert.show && (
            <Alert color={alert.type} className="mb-3">
              {alert.message}
            </Alert>
          )}
          
          {selectedProduct && (
            <div className="row">
              <div className="col-md-4 text-center">
                <img 
                  src={selectedProduct.feature_imageUrl || "https://via.placeholder.com/200"} 
                  alt={selectedProduct.model_name} 
                  className="img-fluid rounded mb-3"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://via.placeholder.com/200";
                  }}
                />
                <h5>{selectedProduct.model_name}</h5>
                <p className="text-muted text-capitalize">
                  {selectedProduct.category?.name || 'Uncategorized'}
                </p>
                {isUpdateMode && (
                  <p className="text-warning">
                    <strong>Update Mode</strong>
                  </p>
                )}
              </div>
              
              <div className="col-md-8">
                <h5 className="mb-3">
                  {isUpdateMode ? 'Update Condition Checklist' : 'Condition Checklist'}
                </h5>
                
                {/* Custom Multiselect Dropdown */}
                <div className="dropdown" style={{ position: 'relative' }}>
                  <button
                    className="btn btn-outline-secondary dropdown-toggle w-100 text-start d-flex justify-content-between align-items-center"
                    type="button"
                    onClick={toggleDropdown}
                    style={{ minHeight: '40px' }}
                  >
                    <span className="text-truncate">
                      {getSelectedText()}
                    </span>
                    <FaChevronDown className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {dropdownOpen && (
                    <div 
                      className="dropdown-menu show w-100" 
                      style={{ 
                        position: 'absolute', 
                        top: '100%', 
                        left: 0, 
                        zIndex: 1000,
                        maxHeight: '250px',
                        overflowY: 'auto'
                      }}
                    >
                      {getChecklistForCategory(selectedProduct.category).length === 0 ? (
                        <div className="dropdown-item text-muted">
                          No conditions available for this category
                        </div>
                      ) : (
                        getChecklistForCategory(selectedProduct.category).map((condition, index) => (
                          <div key={index} className="dropdown-item-text p-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`condition-${index}`}
                                checked={selectedConditions.includes(condition)}
                                onChange={() => handleConditionChange(condition)}
                              />
                              <label 
                                className="form-check-label w-100" 
                                htmlFor={`condition-${index}`}
                                style={{ cursor: 'pointer' }}
                              >
                                {condition}
                              </label>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
                
                {/* Selected Items Display */}
                {selectedConditions.length > 0 && (
                  <div className="mt-3">
                    <h5>Selected Conditions:</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {selectedConditions.map((condition, index) => (
                        <span key={index} className="badge bg-primary" style={{ fontSize: '1rem' }}>
                          {condition}
                          <button
                            className="btn-close btn-close-white ms-2"
                            style={{ fontSize: '0.6em' }}
                            onClick={() => handleConditionChange(condition)}
                            aria-label="Remove"
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </ModalBody>
        
        <ModalFooter>
          <Button color="secondary" onClick={() => toggleModal()} disabled={isLoading}>
            <FaTimes className="me-1" /> Close
          </Button>
          <Button 
            color={isUpdateMode ? "warning" : "primary"}
            onClick={handleSaveFeatures}
            disabled={!selectedProduct || selectedConditions.length === 0 || isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {isUpdateMode ? 'Updating...' : 'Saving...'}
              </>
            ) : (
              <>
                <FaCheck className="me-1" /> 
                {isUpdateMode ? 'Update Conditions' : 'Save Conditions'}
              </>
            )}
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default ProductGrading;