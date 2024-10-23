import { Form, Card, Row, Col, Button, Badge, Modal, Pagination } from "react-bootstrap";
import FishServices from "../../services/FishServices";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaFish } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { APP_URL, RoutesNames } from "../../constants";
import moment from "moment";
import './css/FishesView.css';  
import useLoading from "../../hooks/useLoading";
import defaultFishImage from '../../assets/defaultFish.png';

export default function FishesView() {
    const [fish, setFishes] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [fishToDelete, setFishToDelete] = useState(null);
    const [fishDescription, setFishDescription] = useState(''); 
    const [selectedImage, setSelectedImage] = useState(''); 
    const [page, setPage] = useState(1);
    const [condition, setCondition] = useState('');

    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();

    async function getFishes() {
        showLoading();
        const response = await FishServices.getPaginator(page, condition);
        hideLoading();
        if (response.error) {
            alert(response.message);
            return;
        }
        if (response.message.length === 0) {
            setPage(page - 1);
            return;
        }
        setFishes(response.message);
        hideLoading();
    }

    useEffect(() => {
        getFishes();
    }, [page, condition]);

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

    function changeCondition(e) {
        if (e.nativeEvent.key === "Enter") {
            setPage(1);
            setCondition(e.nativeEvent.srcElement.value);
            setFishes([]);
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

    function image(fishes) {
        if (fishes.image != null) {
            return APP_URL + fishes.image + `?${Date.now()}`;
        }
        return defaultFishImage;
    }

    function showFullDescription(description) {
        setFishDescription(description);
        setShowDescriptionModal(true);
    }

    function openImageModal(fish) {
        setSelectedImage(image(fish));
        setShowImageModal(true); 
    }

    return (
        <>
            <br />
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
            <Row>
                <Col sm={12} lg={7} md={7}>
                    <Form.Control
                        type="text"
                        name="search"
                        placeholder="Search fish by name [Enter]"
                        maxLength={255}
                        defaultValue=""
                        onKeyUp={changeCondition}
                    />
                </Col>
            </Row>
            <br />
            <Row xs={1} md={2} lg={3} className="g-4">
                {fish && fish.map((fish, index) => (
                    <Col key={index}>
                        <Card className="shadow-sm fish-card custom-card">
                            <Row className="g-0">
                                <Col md={4} className="text-center d-flex align-items-center justify-content-center">
                                    <img 
                                        src={image(fish)} 
                                        alt={fish.name} 
                                        className="img-fluid fish-image" 
                                        style={{ maxWidth: '105%', maxHeight: '105%', borderRadius: '10px', objectFit: 'cover', marginTop: '10px', marginLeft: '10px' }} 
                                        onClick={() => openImageModal(fish)} 
                                    />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title className="d-flex justify-content-between align-items-center">
                                            <span className="text-info fs-4">{fish.name}</span>
                                            <Badge bg="primary">{formatDate(fish.huntStart)} - {formatDate(fish.huntEnd)}</Badge>
                                        </Card.Title>
                                        <Card.Text className="fish-description">
                                            {fish.description.length > 100 ? (
                                                <>
                                                    {`${fish.description.substring(0, 90)}... `}
                                                    <Button 
                                                        variant="link" 
                                                        onClick={() => showFullDescription(fish.description)} 
                                                        className="p-0">
                                                        Show more
                                                    </Button>
                                                </>
                                            ) : (
                                                fish.description
                                            )}
                                        </Card.Text>
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
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>

            <hr />

            {fish && fish.length > 0 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Pagination size="lg">
                        <Pagination.Prev onClick={previousPage} />
                        <Pagination.Item disabled>{page}</Pagination.Item>
                        <Pagination.Next onClick={nextPage} />
                    </Pagination>
                </div>
            )}

            <Modal show={showDescriptionModal} onHide={() => setShowDescriptionModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Full description</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{fishDescription}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDescriptionModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm deletion</Modal.Title>
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

            <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Image</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <img src={selectedImage} alt="Enlarged" className="img-fluid" style={{ maxHeight: '80vh', maxWidth: '100%' }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowImageModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}