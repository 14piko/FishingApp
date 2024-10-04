import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import FishServices from "../../services/FishServices";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { FaCalendarAlt } from 'react-icons/fa';
import useLoading from "../../hooks/useLoading";

export default function AddFishes() {
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const [huntStart, setHuntStart] = useState(null);
    const [huntEnd, setHuntEnd] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    async function add(fish) {
        showLoading();
        const response = await FishServices.addFish(fish);
        hideLoading();
        if (response.error) {
            setErrorMessage(response.message);  
            return;
        }
        navigate(RoutesNames.FISH_VIEW);
    }

    function doSubmit(e) {
        e.preventDefault();
        setErrorMessage(""); 

        add({
            name: e.target.name.value,
            huntStart: moment(huntStart).format('YYYY-MM-DD'),
            huntEnd: moment(huntEnd).format('YYYY-MM-DD'),
            description: e.target.description.value
        });
    }

    return (
        <Container>
            <h2>Adding new fish</h2>
            <hr />
            <Form onSubmit={doSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Fish name</Form.Label>
                    <Form.Control type="text" name="name" required />
                </Form.Group>

                <Form.Group controlId="huntStart">
                    <Form.Label>Hunt start</Form.Label>
                    <div className="input-container">
                        <DatePicker
                            selected={huntStart}
                            onChange={date => setHuntStart(date)}
                            dateFormat="dd.MM.yyyy"
                            className="form-control date-input"
                            placeholderText="Select date"
                        />
                        <FaCalendarAlt className="calendar-icon" />
                    </div>
                </Form.Group>

                <Form.Group controlId="huntEnd">
                    <Form.Label>Hunt end</Form.Label>
                    <div className="input-container">
                        <DatePicker
                            selected={huntEnd}
                            onChange={date => setHuntEnd(date)}
                            dateFormat="dd.MM.yyyy"
                            className="form-control date-input"
                            placeholderText="Select date"
                        />
                        <FaCalendarAlt className="calendar-icon" />
                    </div>
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" required />
                </Form.Group>

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                        <Link to={RoutesNames.FISH_VIEW} className="btn btn-danger width">
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                        <Button variant="primary" type="submit" className="width">
                            Add new fish
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}