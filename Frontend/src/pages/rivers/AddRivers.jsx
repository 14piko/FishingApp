import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import RiverServices from "../../services/RiverServices";
import { useState } from "react";

export default function AddRiver() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    async function add(river) {
        const response = await RiverServices.addRiver(river);
        if (response.error) {
            setErrorMessage(response.message);  
            return;
        }
        navigate(RoutesNames.RIVER_VIEW);
    }

    function doSubmit(e) {
        e.preventDefault();
        setErrorMessage(""); 

        const results = new FormData(e.target);

        add({
            name: results.get('name'),
            length: results.get('length').toString()  
        });
    }

    return (
        <Container className="mt-5">
            <h2 className="text-primary">Add New River</h2>
            <hr />
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={doSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>River name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="length">
                    <Form.Label>River length (in km)</Form.Label>
                    <Form.Control 
                        type="number" 
                        name="length" 
                        required 
                        step="0.01" 
                        min="0"
                        placeholder="Enter length in kilometers"
                    />
                </Form.Group>

                <hr />
                <Row>
                    <Col xs={6}>
                        <Link to={RoutesNames.RIVER_VIEW} className="btn btn-danger w-100">
                            Cancel
                        </Link>
                    </Col>
                    <Col xs={6}>
                        <Button variant="primary" type="submit" className="w-100">
                            Add River
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}