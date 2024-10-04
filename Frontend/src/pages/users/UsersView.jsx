import { Container, Card, Button, Modal, Row, Col } from "react-bootstrap";
import UserService from "../../services/UserServices";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import './css/UsersView.css';
import useLoading from "../../hooks/useLoading";

export default function UsersView() {
    const [users, setUsers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();

    async function getUsers() {
        showLoading();
        await UserService.get()
            .then((answer) => {
                setUsers(answer);
            })
            .catch((e) => { console.log(e) });
        hideLoading();
    }

    useEffect(() => {
        getUsers();
    }, []);

    async function deleteAsync(id) {
        showLoading();
        const response = await UserService.deleteUser(id);
        hideLoading();
        if (response.error) {
            alert(response.message);
            return;
        }
        getUsers();
        setShowDeleteModal(false);
    }

    function handleDelete(id) {
        setUserToDelete(id);
        setShowDeleteModal(true);
    }

    function confirmDelete() {
        deleteAsync(userToDelete);
    }

    return (
        <Container className="users-view">
            <Link to={RoutesNames.NEW_USER}>
                <Button variant="primary" className="mb-3">Add new user</Button>
            </Link>
            <Row>
                {users.map((user, index) => (
                    <Col sm={12} md={6} lg={4} key={index} className="mb-4">
                        <Card className="user-card">
                            <Card.Body>
                                <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{user.role}</Card.Subtitle>
                                <Card.Text>
                                    <strong>Email:</strong> {user.email}<br />
                                    <strong>OIB:</strong> {user.oib}<br />
                                    <strong>License Number:</strong> {user.licenseNumber}
                                </Card.Text>
                                <div className="action-icons">
                                    <FaEdit 
                                        style={{ color: 'green', cursor: 'pointer', marginRight: '10px', fontSize: '1.5rem' }} 
                                        onClick={() => navigate(`/users/${user.id}`)} 
                                    />
                                    <FaTrash 
                                        style={{ color: 'red', cursor: 'pointer', fontSize: '1.5rem' }} 
                                        onClick={() => handleDelete(user.id)} 
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
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
