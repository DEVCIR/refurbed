import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { connect } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { toast } from "sonner";

const ProductCategories = (props) => {
    document.title = "Product Categories | Lexa - Responsive Bootstrap 5 Admin Dashboard";

    const breadcrumbItems = [
        { title: "Lexa", link: "#" },
        { title: "Product Management", link: "#" },
        { title: "Categories", link: "#" },
    ]

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/product-categories');
            const result = await response.json();
            setCategories(result);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching categories data:", error);
            toast.error('Failed to fetch categories data');
            setLoading(false);
        }
    };

    useEffect(() => {
        props.setBreadcrumbItems('Product Categories', breadcrumbItems);
        fetchCategories();
    }, [props]);

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <div style={{ 'display': 'flex', 'justifyContent': 'space-between', 'marginBottom': '10px' }}>
                                <Col>
                                    <CardTitle className="h4">Product Categories</CardTitle>
                                </Col>
                                <div style={{ display: 'flex' }} className="text-end">
                                    <Button color="success" style={{ marginLeft: 2, padding: '10px 0' }} onClick={props.onAddCategoryClick}>Add Category</Button>
                                </div>
                            </div>

                            <div className="table-rep-plugin">
                                <div
                                    className="table-responsive mb-0"
                                    data-pattern="priority-columns"
                                >
                                    {loading ? (
                                        <div>Loading categories...</div>
                                    ) : (
                                        <Table
                                            id="tech-companies-1"
                                            className="table table-striped table-bordered"
                                        >
                                            <Thead>
                                                <Tr>
                                                    <Th>Name</Th>
                                                    <Th>Created By</Th>
                                                    <Th>Creator Email</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {categories.map(category => (
                                                    <Tr key={category.id}>
                                                        <Td>{category.name}</Td>
                                                        <Td>{category.creator?.name || 'N/A'}</Td>
                                                        <Td>{category.creator?.email || 'N/A'}</Td>
                                                    </Tr>
                                                ))}
                                            </Tbody>
                                        </Table>
                                    )}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(ProductCategories);