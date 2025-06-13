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

function AddBlog({ props, onBackClick }) {
    document.title = "Add Blog | Lexa - Responsive Bootstrap 5 Admin Dashboard";

    const breadcrumbItems = [
        { title: "Lexa", link: "#" },
        { title: "Blog", link: "#" },
        { title: "Add Blog", link: "#" },
    ];

    const [formData, setFormData] = useState({
        heading: "",
        content: "",
        image: null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                image: file,
            });

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('heading', formData.heading);
            formDataToSend.append('content', formData.content);
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            const response = await fetch('http://localhost:8000/api/blog', {
                method: "POST",
                body: formDataToSend,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Error creating blog post');
            }

            toast.success('Blog post created successfully', {
                duration: 1500,
                onAutoClose: () => {
                    onBackClick();
                }
            });

        } catch (error) {
            console.error("Error:", error);
            toast.error(error.message || 'An error occurred. Please try again.');
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
                            <div style={{ 'display': 'flex', 'justifyContent': 'space-between', 'marginBottom': '10px' }}>
                                <CardTitle className="h4">Add Blog Post</CardTitle>
                                <Button color="success" style={{ marginLeft: 2, padding: '5px 15px' }} onClick={onBackClick}>Back</Button>
                            </div>
                            <Form onSubmit={handleSubmit}>
                              
                                <Row className="mb-3">
                                    <Label htmlFor="heading" className="col-md-2 col-form-label">
                                        Heading
                                    </Label>
                                    <Col md={10}>
                                        <Input
                                            type="text"
                                            name="heading"
                                            id="heading"
                                            value={formData.heading}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Col>
                                </Row>

                                
                                <Row className="mb-3">
                                    <Label htmlFor="content" className="col-md-2 col-form-label">
                                        Content
                                    </Label>
                                    <Col md={10}>
                                        <Input
                                            type="textarea"
                                            name="content"
                                            id="content"
                                            value={formData.content}
                                            onChange={handleChange}
                                            required
                                            rows={8}
                                        />
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Label htmlFor="image" className="col-md-2 col-form-label">
                                        Image
                                    </Label>
                                    <Col md={10}>
                                        <Input
                                            type="file"
                                            name="image"
                                            id="image"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                        {previewImage && (
                                            <div className="mt-2">
                                                <img 
                                                    src={previewImage} 
                                                    alt="Preview" 
                                                    style={{ maxWidth: '200px', maxHeight: '200px' }} 
                                                />
                                            </div>
                                        )}
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col className="text-end">
                                        <Button type="submit" color="primary" disabled={isSubmitting}>
                                            {isSubmitting ? 'Creating...' : 'Add Blog Post'}
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

export default connect(null, { setBreadcrumbItems })(AddBlog);