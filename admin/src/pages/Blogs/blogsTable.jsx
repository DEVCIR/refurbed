import { API_BASE_URL, BASE_URL } from "../../Service";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { connect } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { toast } from "sonner";

const BlogTable = (props) => {
  document.title = "Blog Table | Lexa - Responsive Bootstrap 5 Admin Dashboard";

  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Blog Table", link: "#" },
  ];

  const [blogs, setBlogs] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/blog`);
      const result = await response.json();
      setBlogs(result);
    } catch (error) {
      console.error("Error fetching blog data:", error);
      toast.error("Failed to fetch blog data");
    }
  };

  useEffect(() => {
    props.setBreadcrumbItems("Blog Table", breadcrumbItems);
    fetchBlogs();
  }, [props]);

  const onDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/blog/${blogId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Blog post deleted successfully");
        fetchBlogs();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to delete blog post");
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
      toast.error("Failed to delete blog post");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <React.Fragment>
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
                  <CardTitle className="h4">Blog Table</CardTitle>
                </Col>
                <div style={{ display: "flex" }} className="text-end">
                  <Button
                    color="success"
                    style={{ marginLeft: 2, padding: "10px 0" }}
                    onClick={props.onAddBlogClick}
                  >
                    Add Blog Post
                  </Button>
                </div>
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
                        <Th>Heading</Th>
                        <Th>Content</Th>
                        <Th>Image</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {blogs.map((blog) => (
                        <Tr key={blog.id}>
                          <Td>{blog.heading}</Td>
                          <Td>
                            {blog.content.length > 50
                              ? `${blog.content.substring(0, 50)}...`
                              : blog.content}
                          </Td>
                          <Td>
                            {blog.image ? (
                              <img
                                src={`${BASE_URL}/storage/${blog.image}`}
                                alt="Blog"
                                style={{
                                  maxWidth: "100px",
                                  maxHeight: "60px",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                }}
                              />
                            ) : (
                              <span className="text-muted">No image</span>
                            )}
                          </Td>
                          <Td>
                            <Button
                              color="danger"
                              onClick={() => onDelete(blog.id)}
                              disabled={isDeleting}
                            >
                              {isDeleting ? "Deleting..." : "Delete"}
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default connect(null, { setBreadcrumbItems })(BlogTable);
