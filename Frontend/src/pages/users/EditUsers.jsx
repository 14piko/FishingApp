import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import UserServices from "../../services/UserServices";
import { useEffect, useState } from "react";

export default function EditUsers() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [users, setUsers] = useState({});
    const [errorMessage, setErrorMessage] = useState("");  

    async function getUser() {
        try {
            const response = await UserServices.getById(routeParams.id);
            if (response.error) {
                setErrorMessage(response.message); 
                return;
            }
            setUsers(response.message);
        } catch (error) {
            setErrorMessage("An unexpected error occurred while fetching the user.");
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    async function edit(user) {
        try {
            const response = await UserServices.editUser(routeParams.id, user);
            if (response.error) {
                setErrorMessage(response.message);  // Postavi poruku greške
                return;
            }
            navigate(RoutesNames.USER_VIEW);
        } catch (error) {
            if(error.response.data.message == 'Invalid OIB.'){
                setErrorMessage("Invalid OIB.");
            }else if(error.response.data.message == 'Another user with this OIB already exists.'){
                setErrorMessage("Another user with this OIB already exists.");
            }else{
                setErrorMessage("An unexpected error occurred while updating the user.");
            }
        }
    }

    function doSubmit(e) {
        e.preventDefault();
        setErrorMessage("");  

        const results = new FormData(e.target);

        const oib = results.get('oib');
        if (oib.length !== 11 || isNaN(oib)) {
            setErrorMessage('OIB must have 11 digits!');
            return;
        }

        const licenseNumber = results.get('licenseNumber');
        if (licenseNumber.length !== 6 || isNaN(licenseNumber)) {
            setErrorMessage('License number must have 6 digits!');
            return;
        }

        edit({
            firstName: results.get('firstName'),
            lastName: results.get('lastName'),
            email: results.get('email'),
            password: results.get('password'),
            role: results.get('role'),
            oib: results.get('oib'),
            licenseNumber: results.get('licenseNumber')
        });
    }

    return (
        <Container>
            <h2>Edit user</h2>
            <hr />

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form onSubmit={doSubmit}>
                <Form.Group controlId="firstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        required
                        defaultValue={users.firstName}
                    />
                </Form.Group>

                <Form.Group controlId="lastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        required
                        defaultValue={users.lastName}
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        required
                        defaultValue={users.email}
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        required
                        defaultValue={users.password}
                    />
                </Form.Group>

                <Form.Group controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                        type="text"
                        name="role"
                        required
                        defaultValue={users.role}
                    />
                </Form.Group>

                <Form.Group controlId="oib">
                    <Form.Label>OIB</Form.Label>
                    <Form.Control
                        type="number"
                        name="oib"
                        required
                        defaultValue={users.oib}
                    />
                </Form.Group>

                <Form.Group controlId="licenseNumber">
                    <Form.Label>License number</Form.Label>
                    <Form.Control
                        type="number"
                        name="licenseNumber"
                        required
                        defaultValue={users.licenseNumber}
                    />
                </Form.Group>

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                        <Link to={RoutesNames.USER_VIEW} className="btn btn-danger width">
                            Cancel
                        </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                        <Button variant="primary" type="submit" className="siroko">
                            Save changes
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}