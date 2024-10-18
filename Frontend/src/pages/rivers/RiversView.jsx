import { Pagination, Form, Card, Row, Col, Button, Modal } from "react-bootstrap";
import RiverServices from "../../services/RiverServices";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaWater } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import './css/RiversView.css';
import useLoading from "../../hooks/useLoading";

export default function RiversView() {

    const [rivers, setRivers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [riverToDelete, setRiverToDelete] = useState(null);
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const [page, setPage] = useState(1);
    const [condition, setCondition] = useState('');

    async function getRivers() {
        showLoading();
        const response = await RiverServices.getPaginator(page, condition);
        hideLoading();
        if (response.error) {
            alert(response.message);
            return;
        }
        if (response.message.length === 0) {
            setPage(page - 1);
            return;
        }
        setRivers(response.message);
        hideLoading();
    }

    useEffect(() => {
        getRivers();
    }, [page, condition]);

    async function deleteAsync(id) {
        showLoading();
        const response = await RiverServices.deleteRiver(id);
        hideLoading();
        if (response.error) {
            alert(response.message);
            return;
        }
        getRivers();
        setShowDeleteModal(false);
    }

    function handleDelete(id) {
        setRiverToDelete(id);
        setShowDeleteModal(true);
    }

    function confirmDelete() {
        deleteAsync(riverToDelete);
    }

    function changeCondition(e) {
        if (e.nativeEvent.key === "Enter") {
            setPage(1);
            setCondition(e.nativeEvent.srcElement.value);
            setRivers([]);
        }
    }

    function nextPage() {
        setPage(page + 1);
    }

    function previousPage() {
        if (page === 1) {
            return;
        }
        setPage(page - 1);
    }

    return (
        <>
        <br></br>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-primary">
                    <FaWater className="me-2" /> River list
                </h1>
            </div>
            <Link to={RoutesNames.NEW_RIVER}>
                <Button variant="success" size="lg" className="mb-4">
                    Add new river
                </Button>
            </Link>
            <Row>
                <Col sm={12} lg={7} md={7}>
                    <Form.Control
                        type="text"
                        name="search"
                        placeholder="Search rivers by name [Enter]"
                        maxLength={255}
                        defaultValue=""
                        onKeyUp={changeCondition}
                    />
                </Col>
            </Row>
            <br></br>
            <Row xs={1} md={2} lg={3} className="g-4">
                {rivers.map((river, index) => (
                    <Col key={index}>
                        <Card className="shadow-sm river-card">
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-between align-items-center">
                                    <span className="text-info fs-4">{river.name}</span>
                                    <span className="badge bg-secondary">{river.length} km</span>
                                </Card.Title>
                                <div className="d-flex justify-content-end">
                                    <Button 
                                        variant="outline-success" 
                                        className="me-2"
                                        onClick={() => navigate(`/rivers/${river.id}`)}
                                    >
                                        <FaEdit /> Edit
                                    </Button>
                                    <Button 
                                        variant="outline-danger" 
                                        onClick={() => handleDelete(river.id)}
                                    >
                                        <FaTrash /> Delete
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <hr />

            {rivers && rivers.length > 0 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Pagination size="lg">
                        <Pagination.Prev onClick={previousPage} />
                        <Pagination.Item disabled>{page}</Pagination.Item>
                        <Pagination.Next onClick={nextPage} />
                    </Pagination>
                </div>
            )}

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this river?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
