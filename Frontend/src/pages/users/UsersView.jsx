import { Button, Card, Col, Form, Pagination, Row, Modal } from "react-bootstrap";
import UserService from "../../services/UserServices";
import { useEffect, useState } from "react";
import { APP_URL, RoutesNames } from "../../constants";
import { Link } from "react-router-dom";
import defaultUserImage from '../../assets/defaultUser.png'; 
import useLoading from "../../hooks/useLoading";
import { FaEdit, FaTrash, FaUsers } from "react-icons/fa";

export default function UsersView(){

    const [users, setUsers] = useState();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [page, setPage] = useState(1);
    const [condition, setCondition] = useState('');

    const { showLoading, hideLoading } = useLoading();

    async function getUsers() {
        showLoading();
        const response = await UserService.getPaginator(page, condition);
        hideLoading();
        if (response.error) {
            alert(response.message);
            return;
        }
        if (response.message.length === 0) {
            setPage(page - 1);
            return;
        }
        setUsers(response.message);
        hideLoading();
    }

    useEffect(() => {
        getUsers();
    }, [page, condition]);

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
        const user = users.find(u => u.id === id);
    
        if (user.email === 'admin@edunova.hr') {
            alert("Admin user cannot be deleted.");
            return;
        }
    
        setUserToDelete(id);
        setShowDeleteModal(true);
    }

    function confirmDelete() {
        deleteAsync(userToDelete);
    }

    function image(users) {
        console.log(users.image)
        if (users.image != null) {
            return APP_URL + users.image + `?${Date.now()}`;
        }
        return defaultUserImage;
    }

    function changeCondition(e) {
        if (e.nativeEvent.key === "Enter") {
            setPage(1);
            setCondition(e.nativeEvent.srcElement.value);
            setUsers([]);
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
                    <FaUsers className="me-2" /> Users list
                </h1>
            </div>
            <Link to={RoutesNames.NEW_USER}>
                <Button variant="success" size="lg" className="mb-4">
                    Add new user
                </Button>
            </Link>
            <Row>
                <Col sm={12} lg={7} md={7}>
                    <Form.Control
                        type="text"
                        name="search"
                        placeholder="Search users by first name or last name [Enter]"
                        maxLength={255}
                        defaultValue=""
                        onKeyUp={changeCondition}
                    />
                </Col>
            </Row>
            <Row>
                {users && users.map((u) => (
                    <Col key={u.id} sm={12} lg={6} md={6}>
                        <Card style={{ marginTop: '1rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
                            <Row className="align-items-center">
                                <Col sm={4} className="text-center">
                                    <img 
                                        src={image(u)} 
                                        alt="User" 
                                        className="img-fluid" 
                                        style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '10px', objectFit: 'cover', marginTop: '10px', marginLeft: '10px' }} 
                                    />
                                </Col>
                                <Col sm={8}>
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                            {u.firstName} {u.lastName}
                                        </Card.Title>
                                        <Card.Text><strong>Role:</strong> {u.role}</Card.Text>
                                        <Card.Text><strong>OIB:</strong> {u.oib}</Card.Text>
                                        <Card.Text><strong>License Number:</strong> {u.licenseNumber}</Card.Text>
                                        <Row>
                                            <Col>
                                                <Link className="btn btn-primary" to={`/users/${u.id}`}>
                                                    <FaEdit />
                                                </Link>
                                            </Col>
                                            <Col>
                                                {u.email !== 'admin@edunova.hr' && (
                                                    <Button variant="danger" onClick={() => handleDelete(u.id)}>
                                                        <FaTrash />
                                                    </Button>
                                                )}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>

            <hr />

            {users && users.length > 0 && (
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
        </>
    );
}