import { Container, Card, Row, Col, Button, Badge, Modal } from "react-bootstrap";
import FishServices from "../../services/FishServices";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaFish } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import moment from "moment";
import './css/FishesView.css';  
import useLoading from "../../hooks/useLoading";

export default function FishesView() {
    const [fish, setFishes] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [fishToDelete, setFishToDelete] = useState(null);

    const navigate = useNavigate();

    const { showLoading, hideLoading } = useLoading();

    async function getFishes() {
        showLoading();
        await FishServices.get()
            .then((answer) => {
                setFishes(answer);
            })
            .catch((e) => {
                console.log(e);
            });

            hideLoading();
    }

    useEffect(() => {
        getFishes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function formatDate(date) {
        if (date == null) {
            return "Undefined";
        }
        return moment.utc(date).format("DD.MM.");
    }

    async function deleteAsync(id) {
        showLoading();
        const response = await FishServices.deleteFish(id);
        hideLoading();
        if (response.error) {
            alert(response.message);
            return;
        }
        getFishes();
        setShowDeleteModal(false);
    }

    function handleDelete(id) {
        setFishToDelete(id);
        setShowDeleteModal(true);
    }

    function confirmDelete() {
        deleteAsync(fishToDelete);
    }

    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-primary">
                    <FaFish className="me-2" /> Fish list
                </h1>
            </div>
            <Link to={RoutesNames.NEW_FISH}>
                <Button variant="success" size="lg" className="mb-4">
                    Add new fish
                </Button>
            </Link>
            <Row xs={1} md={2} lg={3} className="g-4">
                {fish &&
                    fish.map((fish, index) => (
                        <Col key={index}>
                            <Card className="shadow-sm fish-card">
                                <Card.Body>
                                    <Card.Title className="d-flex justify-content-between align-items-center">
                                        <span className="text-info fs-4">{fish.name}</span>
                                        <Badge bg="primary">{formatDate(fish.huntStart)} - {formatDate(fish.huntEnd)}</Badge>
                                    </Card.Title>
                                    <Card.Text className="fish-description">{fish.description}</Card.Text>
                                    <div className="d-flex justify-content-end">
                                        <Button 
                                            variant="outline-success" 
                                            className="me-2"
                                            onClick={() => navigate(`/fishes/${fish.id}`)}
                                        >
                                            <FaEdit /> Edit
                                        </Button>
                                        <Button 
                                            variant="outline-danger" 
                                            onClick={() => handleDelete(fish.id)}
                                        >
                                            <FaTrash /> Delete
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
            </Row>

            {/* Modal for confirming deletion */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this fish?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
