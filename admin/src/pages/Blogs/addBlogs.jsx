import React, { useState, useEffect, useRef } from "react";
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
  const [quillLoaded, setQuillLoaded] = useState(false);
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (window.Quill) {
      setQuillLoaded(true);
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js";
    script.onload = () => {
      setQuillLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (quillLoaded && quillRef.current && !editorRef.current) {
      // Clear any existing content
      quillRef.current.innerHTML = "";

      const toolbarOptions = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["link", "image"],
        ["blockquote", "code-block"],
        ["clean"],
      ];

      try {
        editorRef.current = new window.Quill(quillRef.current, {
          theme: "snow",
          placeholder: "Write your blog content here...",
          modules: {
            toolbar: toolbarOptions,
          },
        });

        // Set initial content if exists
        if (formData.content) {
          editorRef.current.clipboard.dangerouslyPasteHTML(formData.content);
        }

        // Set up text change handler
        editorRef.current.on("text-change", () => {
          const html = editorRef.current.root.innerHTML;
          setFormData((prev) => ({ ...prev, content: html }));
        });

        // Ensure the editor is focusable
        setTimeout(() => {
          if (editorRef.current) {
            const editorContainer = editorRef.current.root;
            if (editorContainer) {
              editorContainer.setAttribute("contenteditable", "true");
              editorContainer.style.minHeight = "300px";
              editorContainer.style.cursor = "text";
            }
          }
        }, 200);
      } catch (error) {
        console.error("Error initializing Quill editor:", error);
      }
    }

    return () => {
      if (editorRef.current) {
        try {
          editorRef.current.off("text-change");
          editorRef.current = null;
        } catch (error) {
          console.error("Error cleaning up editor:", error);
        }
      }
    };
  }, [quillLoaded]);

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
      // Get the latest content from Quill editor
      const currentContent = editorRef.current
        ? editorRef.current.root.innerHTML
        : formData.content;

      const formDataToSend = new FormData();
      formDataToSend.append("heading", formData.heading);
      formDataToSend.append("content", currentContent);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await fetch("http://localhost:8000/api/blog", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error creating blog post");
      }

      toast.success("Blog post created successfully", {
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
                <CardTitle className="h4">Add Blog Post</CardTitle>
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
                    {quillLoaded ? (
                      <div
                        className="border border-gray-300 rounded-lg overflow-hidden bg-white"
                        style={{ minHeight: "350px" }}
                      >
                        <div
                          ref={quillRef}
                          style={{
                            minHeight: "300px",
                            backgroundColor: "white",
                            cursor: "text",
                          }}
                        />
                      </div>
                    ) : (
                      <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                        <p className="text-gray-500">
                          Loading rich text editor...
                        </p>
                      </div>
                    )}
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
                          style={{ maxWidth: "200px", maxHeight: "200px" }}
                        />
                      </div>
                    )}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col className="text-end">
                    <Button
                      type="submit"
                      color="primary"
                      disabled={isSubmitting || !quillLoaded}
                    >
                      {isSubmitting ? "Creating..." : "Add Blog Post"}
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

export default connect(null, { setBreadcrumbItems })(AddBlog);
