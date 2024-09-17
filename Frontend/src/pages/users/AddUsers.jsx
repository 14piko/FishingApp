import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import UserServices from "../../services/UserServices";
import { useState } from "react";

export default function AddUsers() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(""); 

    async function add(user) {
        try {
            const response = await UserServices.addUser(user);

            if (response.error) {
                setErrorMessage(response.message);  
                return;
            }

            navigate(RoutesNames.USER_VIEW);
        } catch (error) {
            if(error.response.data.message == 'Invalid OIB.'){
                setErrorMessage("Invalid OIB.");
            }else if(error.response.data.message == 'User with this OIB already exists.'){
                setErrorMessage("User with this OIB already exists.");
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

        add({
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
            <h2>Adding new user</h2>
            <hr />

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form onSubmit={doSubmit}>
                <Form.Group controlId="firstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" name="firstName" required />
                </Form.Group>

                <Form.Group controlId="lastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" name="lastName" required />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="text" name="email" required />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" required />
                </Form.Group>

                <Form.Group controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Control type="text" name="role" required />
                </Form.Group>

                <Form.Group controlId="oib">
                    <Form.Label>OIB</Form.Label>
                    <Form.Control type="number" name="oib" required />
                </Form.Group>

                <Form.Group controlId="licenseNumber">
                    <Form.Label>License number</Form.Label>
                    <Form.Control type="number" name="licenseNumber" required />
                </Form.Group>

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                        <Link to={RoutesNames.USER_VIEW} className="btn btn-danger width">
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                        <Button variant="primary" type="submit" className="siroko">
                            Add new user
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}