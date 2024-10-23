import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import UserServices from "../../services/UserServices";
import { useState } from "react";
import useLoading from "../../hooks/useLoading";

export default function AddUsers() {
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const [errorMessage, setErrorMessage] = useState(""); 

    async function add(user) {
        showLoading();
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
            }else if(error.response.status === 409){
                setErrorMessage("User with this OIB already exists.");
            }else{
                setErrorMessage("An unexpected error occurred while updating the user.");
            }
        }
        hideLoading();
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

        const password = results.get('password');
        const repeatPassword = results.get('repeatPassword');
        if (password !== repeatPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        add({
            firstName: results.get('firstName'),
            lastName: results.get('lastName'),
            email: results.get('email'),
            password: password ,
            role: results.get('role'),
            oib: results.get('oib'),
            licenseNumber: results.get('licenseNumber')
        });
    }

    return (
        <Container>
        <br></br>
        <h2>Adding new user</h2>
        <hr />

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form onSubmit={doSubmit}>
            <Form.Group controlId="firstName">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" name="firstName" placeholder="Enter user first name" required />
            </Form.Group>

            <Form.Group controlId="lastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" name="lastName" placeholder="Enter user last name" required />
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter user email" required />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Enter password" required />
            </Form.Group>

            <Form.Group controlId="repeatPassword">
                    <Form.Label>Repeat password</Form.Label>
                    <Form.Control type="password" name="repeatPassword" placeholder="Enter repeat password" required />
                </Form.Group>

            <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control as="select" name="role" required>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="oib">
                <Form.Label>OIB</Form.Label>
                <Form.Control type="number" name="oib" placeholder="Enter user OIB" required />
            </Form.Group>

            <Form.Group controlId="licenseNumber">
                <Form.Label>License number</Form.Label>
                <Form.Control type="number" name="licenseNumber" placeholder="Enter user license number"  required />
            </Form.Group>

            <hr />
            <Row>
                <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                    <Link to={RoutesNames.USER_VIEW} className="btn btn-danger width">
                        Cancel
                    </Link>
                </Col>
                <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                    <Button variant="primary" type="submit" className="width">
                        Add new user
                    </Button>
                </Col>
            </Row>
        </Form>
    </Container>
    );
}