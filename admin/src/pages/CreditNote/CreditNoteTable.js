import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from "reactstrap"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { connect } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Toaster, toast } from "sonner";
import { BASE_URL } from '../../Service';

const CreditNoteTable = (props) => {
    document.title = "Responsive Table | Lexa - Responsive Bootstrap 5 Admin Dashboard";

    const breadcrumbItems = [
        { title: "Lexa", link: "#" },
        { title: "Tables", link: "#" },
        { title: "Responsive Table", link: "#" },
    ]

    const [customers, setCustomers] = useState([]);
    const [emailModal, setEmailModal] = useState(false);
    const [selectedCreditNote, setSelectedCreditNote] = useState(null);
    const [emailAddress, setEmailAddress] = useState("");
    const [isSending, setIsSending] = useState(false);

    const fetchCreditNotes = async () => {
        try {
            const response = await fetch(`${BASE_URL}/credit-notes`);
            const result = await response.json();
            setCustomers(result.data.data);
        } catch (error) {
            console.error("Error fetching credit note data:", error);
        }
    };

    useEffect(() => {
        props.setBreadcrumbItems('Responsive Table', breadcrumbItems);
        fetchCreditNotes();
    }, [props]);

    const onEdit = (customerId) => {
        props.onEditCustomer(customerId);
    };

    const handleDelete = async (customerId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Expense?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${BASE_URL}/expenses/${customerId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': "Bearer YOUR_TOKEN_HERE",
                },
            });

            if (response.ok) {
                toast.success('Customer deleted successfully');
                setCustomers(customers.filter(customer => customer.id !== customerId));
                fetchCreditNotes();
            } else {
                const errorResult = await response.json();
                console.error("Error deleting customer:", errorResult);
                toast.error('Error deleting customer. Please try again.');
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error('An error occurred while deleting the customer. Please try again.');
        }
    };

    const handleViewTemplate = (order) => {
        props.onSelectOrder(order);
    };

    const openEmailModal = (creditNote) => {
        setSelectedCreditNote(creditNote);
        setEmailAddress(creditNote.created_by?.email || "");
        setEmailModal(true);
    };

    const closeEmailModal = () => {
        setEmailModal(false);
        setSelectedCreditNote(null);
        setEmailAddress("");
    };

    const sendCreditNoteEmail = async () => {
        if (!emailAddress) {
            toast.error('Please enter a valid email address');
            return;
        }

        setIsSending(true);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/send-credit-note-email/${selectedCreditNote.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailAddress
                })
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Email sent successfully');
                setTimeout(() => closeEmailModal(), 300);
            } else {
                toast.error(result.message || 'Failed to send email');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('An error occurred while sending the email');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <React.Fragment>
            <Toaster position="top-right" richColors />
            
            <Modal isOpen={emailModal} toggle={closeEmailModal}>
                <ModalHeader toggle={closeEmailModal}>Send Credit Note Email</ModalHeader>
                <ModalBody>
                    <div className="mb-3">
                        <Label>Credit Note #: {selectedCreditNote?.credit_note_number}</Label>
                    </div>
                    <div className="mb-3">
                        <Label>Recipient Email</Label>
                        <Input
                            type="email"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            placeholder="Enter recipient email address"
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={closeEmailModal}>Cancel</Button>
                    <Button color="primary" onClick={sendCreditNoteEmail} disabled={isSending}>
                        {isSending ? 'Sending...' : 'Send Email'}
                    </Button>
                </ModalFooter>
            </Modal>

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <div style={{ 'display': 'flex', 'justifyContent': 'space-between', 'marginBottom': '10px' }}>
                                <Col>
                                    <CardTitle className="h4">Credit Note Table</CardTitle>
                                </Col>
                            </div>

                            <div className="table-rep-plugin">
                                <div className="table-responsive mb-0" data-pattern="priority-columns">
                                    <Table id="tech-companies-1" className="table table-striped table-bordered">
                                        <Thead>
                                            <Tr>
                                                <Th>Name</Th>
                                                <Th>Amount</Th>
                                                <Th>Created By</Th>
                                                <Th>Customer Type</Th>
                                                <Th>Is Active</Th>
                                                <Th>Action</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {customers.map(creditNote => (
                                                <Tr key={creditNote.id}>
                                                    <Td>{creditNote.credit_note_number}</Td>
                                                    <Td>{creditNote.total_amount}</Td>
                                                    <Td>{creditNote.created_by.name} {creditNote.created_by.last_name}</Td>
                                                    <Td>{creditNote.customer.customer_type}</Td>
                                                    <Td>{creditNote.is_active ? 'Yes' : 'No'}</Td>
                                                    <Td>
                                                        <div className="d-flex gap-2">
                                                            <Button color="warning" onClick={() => handleViewTemplate(creditNote)}>Generate Template</Button>
                                                            <Button color="info" onClick={() => openEmailModal(creditNote)}>Send Email</Button>
                                                        </div>
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
    )
}

export default connect(null, { setBreadcrumbItems })(CreditNoteTable);