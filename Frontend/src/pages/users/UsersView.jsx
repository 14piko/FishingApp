import { Container, Table, Button, Modal } from "react-bootstrap";
import UserService from "../../services/UserServices";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import './css/UsersView.css';

export default function UsersView() {
    const [users, setUsers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const navigate = useNavigate();

    async function getUsers() {
        await UserService.get()
            .then((answer) => {
                setUsers(answer);
            })
            .catch((e) => { console.log(e) });
    }

    useEffect(() => {
        getUsers();
    }, []);

    async function deleteAsync(id) {
        const response = await UserService.deleteUser(id);
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
            <Table striped bordered hover responsive className="users-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>OIB</th>
                        <th>License Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.oib}</td>
                            <td>{user.licenseNumber}</td>
                            <td>
                                <FaEdit 
                                    style={{ color: 'green', cursor: 'pointer', marginRight: '10px', fontSize: '1.5rem' }} 
                                    onClick={() => navigate(`/users/${user.id}`)} 
                                />
                                <FaTrash 
                                    style={{ color: 'red', cursor: 'pointer', fontSize: '1.5rem' }} 
                                    onClick={() => handleDelete(user.id)} 
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

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
