import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import RiverServices from "../../services/RiverServices";
import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";

export default function EditRiver() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [river, setRiver] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const { showLoading, hideLoading } = useLoading();

    async function getRiver() {
        showLoading();
        const response = await RiverServices.getById(routeParams.id);
        hideLoading();
        if (response.error) {
            setErrorMessage(response.message); 
            return;
        }
        setRiver(response.message);
    }

    useEffect(() => {
        getRiver();
    }, []);

    async function edit(river) {
        showLoading();
        const response = await RiverServices.editRiver(routeParams.id, river);
        hideLoading();
        if (response.error) {
            setErrorMessage(response.message); 
            return;
        }
        navigate(RoutesNames.RIVER_VIEW);
    }

    function doSubmit(e) {
        e.preventDefault();
        const results = new FormData(e.target);

        edit({
            name: results.get('name'),
            length: results.get('length').toString()  
        });
    }

    return (
        <Container className="mt-5">
            <h2 className="text-primary">Edit River</h2>
            <hr />
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={doSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>River Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        required
                        defaultValue={river.name}
                    />
                </Form.Group>

                <Form.Group controlId="length">
                    <Form.Label>River Length (in km)</Form.Label>
                    <Form.Control 
                        type="number" 
                        name="length" 
                        required 
                        step="0.01" 
                        min="0" 
                        defaultValue={river.length}
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
                            Save Changes
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
