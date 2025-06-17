// _____________________________________________________________________________________________________________________________________________

import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { connect } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { toast } from "sonner";
import { API_BASE_URL } from "../../Service";
import { setNotifications } from "../../store/notification/actions";

const ListingOverview = (props) => {
  document.title =
    "Listing Overview | Lexa - Responsive Bootstrap 5 Admin Dashboard";

  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Listing Overview", link: "#" },
  ];

  const [listings, setListings] = useState([]);
  const [groupedListings, setGroupedListings] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentListing, setCurrentListing] = useState(null);
  const [productNotifications, setProductNotifications] = useState({});
  const [showWelcome, setShowWelcome] = useState(true);
  const [dismissedNotifications, setDismissedNotifications] = useState([]);

  const fetchListings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/listings`);
      const result = await response.json();
      setListings(result.data.data);

      // Group listings by product
      const grouped = groupListingsByProduct(result.data.data);
      setGroupedListings(grouped);

      checkForProductNotifications(result.data.data);
    } catch (error) {
      console.error("Error fetching listings data:", error);
      toast.error("Failed to fetch listings data");
    }
  };

  const groupListingsByProduct = (listingsData) => {
    const productMap = {};

    listingsData.forEach((listing) => {
      if (!listing.product?.id) return;

      if (!productMap[listing.product.id]) {
        productMap[listing.product.id] = {
          productName: listing.product?.model_name || "N/A",
          listings: [],
        };
      }
      productMap[listing.product.id].listings.push(listing);
    });

    return Object.values(productMap);
  };

  const checkForProductNotifications = (listingsData) => {
    const productMap = {};
    const newNotifications = {};

    listingsData.forEach((listing) => {
      if (!listing.product?.id) return;

      if (!productMap[listing.product.id]) {
        productMap[listing.product.id] = [];
      }
      productMap[listing.product.id].push(listing);
    });

    Object.keys(productMap).forEach((productId) => {
      // Skip if this notification was already dismissed
      if (dismissedNotifications.includes(productId)) return;

      const productListings = productMap[productId];

      if (productListings.length > 1) {
        const marketplaces = new Set();
        let hasSold = false;
        let hasListed = false;

        productListings.forEach((listing) => {
          marketplaces.add(listing.marketplace?.id);
          if (listing.is_active) hasListed = true;
          else hasSold = true;
        });

        if (marketplaces.size > 1 && hasSold && hasListed) {
          const soldListing = productListings.find((l) => !l.is_active);
          const listedListings = productListings.filter((l) => l.is_active);

          newNotifications[productId] = {
            productName: productListings[0].product?.model_name || "N/A",
            soldMarketplace: soldListing.marketplace?.name || "N/A",
            listedMarketplaces: listedListings
              .map((l) => l.marketplace?.name || "N/A")
              .join(", "),
            soldListingId: soldListing.id,
          };
        }
      }
    });

    props.setNotifications(newNotifications);
    setProductNotifications(newNotifications);
  };

  const toggleModal = (listing = null) => {
    setCurrentListing(listing);
    setModal(!modal);
  };

  const handleStatusUpdate = async () => {
    if (!currentListing) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/listings/${currentListing.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_active: !currentListing.is_active,
          }),
        },
      );

      if (response.ok) {
        toast.success("Listing status updated successfully");
        fetchListings();
      } else {
        throw new Error("Failed to update listing");
      }
    } catch (error) {
      console.error("Error updating listing:", error);
      toast.error("Failed to update listing status");
    } finally {
      toggleModal();
    }
  };

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    // Mark all current notifications as dismissed
    setDismissedNotifications(Object.keys(productNotifications));
  };

  useEffect(() => {
    props.setBreadcrumbItems("Listing Overview", breadcrumbItems);
    fetchListings();
  }, [props]);

  return (
    <React.Fragment>
      {/* Welcome Popup with Action Required notifications */}
      {showWelcome && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(5px)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "10px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
              textAlign: "center",
              maxWidth: "500px",
              width: "90%",
            }}
          >
            <h2 style={{ color: "#495057", marginBottom: "1rem" }}>
              Hello Admin
            </h2>
            <p style={{ color: "#6c757d", marginBottom: "1.5rem" }}>
              Welcome to the Listings Overview Dashboard
            </p>

            {/* Action Required Notifications */}
            {Object.keys(productNotifications).length > 0 && (
              <div
                style={{
                  margin: "1rem 0",
                  textAlign: "left",
                  maxHeight: "200px",
                  overflowY: "auto",
                  border: "1px solid #f8d7da",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <h5 style={{ color: "#856404", marginBottom: "0.5rem" }}>
                  Action Required:
                </h5>
                {Object.values(productNotifications).map(
                  (notification, index) => (
                    <Alert
                      color="warning"
                      key={index}
                      style={{ marginBottom: "0.5rem" }}
                    >
                      Remove product "{notification.productName}" from
                      marketplace: {notification.listedMarketplaces}. This
                      product is marked as Sold in{" "}
                      {notification.soldMarketplace}.
                    </Alert>
                  ),
                )}
              </div>
            )}

            <Button
              color="primary"
              onClick={handleCloseWelcome}
              style={{ padding: "0.5rem 1.5rem" }}
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Blur effect when popup is visible */}
      <div
        style={{
          filter: showWelcome ? "blur(5px)" : "none",
          transition: "filter 0.3s ease-out",
          pointerEvents: showWelcome ? "none" : "auto",
        }}
      >
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
                  <Col>
                    <CardTitle className="h4">Listings Overview</CardTitle>
                  </Col>
                </div>

                <div className="table-rep-plugin">
                  <div
                    className="table-responsive mb-0"
                    data-pattern="priority-columns"
                  >
                    <Table
                      id="tech-companies-1"
                      className="table table-striped table-bordered"
                    >
                      <Thead>
                        <Tr>
                          <Th>Product</Th>
                          <Th>Marketplace</Th>
                          <Th>Status</Th>
                          <Th>Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {groupedListings.map((group, groupIndex) => (
                          <React.Fragment key={groupIndex}>
                            {group.listings.map((listing, index) => (
                              <Tr key={listing.id}>
                                {index === 0 ? (
                                  <Td rowSpan={group.listings.length}>
                                    {group.productName}
                                    <div className="text-muted small">
                                      Marketplaces:{" "}
                                      {group.listings
                                        .map(
                                          (l) => l.marketplace?.name || "N/A",
                                        )
                                        .join(", ")}
                                    </div>
                                  </Td>
                                ) : null}
                                <Td>{listing.marketplace?.name || "N/A"}</Td>
                                <Td>
                                  <span
                                    className={`badge bg-${listing.is_active ? "success" : "danger"}`}
                                  >
                                    {listing.is_active ? "Listed" : "Sold"}
                                  </span>
                                </Td>
                                <Td>
                                  <Button
                                    color="primary"
                                    onClick={() => toggleModal(listing)}
                                    disabled={!listing.is_active}
                                  >
                                    {listing.is_active
                                      ? "Mark as sold"
                                      : "Already sold"}
                                  </Button>
                                </Td>
                              </Tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </Tbody>
                    </Table>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Update Listing Status</ModalHeader>
          <ModalBody>
            {currentListing && (
              <div>
                <p>
                  Are you sure you want to mark this listing as{" "}
                  {currentListing.is_active ? "Sold" : "Listed"}?
                </p>
                <p>
                  <strong>Product:</strong>{" "}
                  {currentListing.product?.model_name || "N/A"}
                </p>
                <p>
                  <strong>Marketplace:</strong>{" "}
                  {currentListing.marketplace?.name || "N/A"}
                </p>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleStatusUpdate}>
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      </div>

      <style>
        {`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `}
      </style>
    </React.Fragment>
  );
};

export default connect(null, { setBreadcrumbItems, setNotifications })(
  ListingOverview,
);
