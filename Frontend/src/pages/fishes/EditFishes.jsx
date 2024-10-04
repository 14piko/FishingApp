import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import FishServices from "../../services/FishServices";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import moment from "moment";
import { FaCalendarAlt } from 'react-icons/fa';
import useLoading from "../../hooks/useLoading";

export default function EditFishes() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [fish, setFishes] = useState({});
    const [huntStart, setHuntStart] = useState(null);
    const [huntEnd, setHuntEnd] = useState(null);
    const { showLoading, hideLoading } = useLoading();

    async function getFish() {
        showLoading();
        const response = await FishServices.getById(routeParams.id);
        hideLoading();
        if (response.error) {
            setErrorMessage(response.message);
            return;
        }
        setHuntStart(moment.utc(response.message.huntStart).toDate());
        setHuntEnd(moment.utc(response.message.huntEnd).toDate());
        setFishes(response.message);
    }

    useEffect(() => {
        getFish();
    }, []);

    async function edit(fish) {
        showLoading();
        const response = await FishServices.editFish(routeParams.id, fish);
        hideLoading();
        if (response.error) {
            setErrorMessage(response.message);
            return;
        }
        navigate(RoutesNames.FISH_VIEW);
    }

    function doSubmit(e) {
        e.preventDefault();
        const results = new FormData(e.target);

        edit({
            name: results.get('name'),
            huntStart: moment(huntStart).format('YYYY-MM-DD'),
            huntEnd: moment(huntEnd).format('YYYY-MM-DD'),
            description: results.get('description')
        });
    }

    return (
        <Container>
            <h2>Edit fish</h2>
            <hr />

            <Form onSubmit={doSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Fish name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        required
                        defaultValue={fish.name}
                    />
                </Form.Group>

                <Form.Group controlId="huntStart">
                    <Form.Label>Hunt start</Form.Label>
                    <div className="input-container">
                        <DatePicker
                            selected={huntStart}
                            onChange={date => setHuntStart(date)}
                            dateFormat="dd.MM.yyyy"
                            className="form-control date-input" 
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
                        />
                        <FaCalendarAlt className="calendar-icon" />
                    </div>
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        required
                        defaultValue={fish.description}
                    />
                </Form.Group>

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                        <Link to={RoutesNames.FISH_VIEW} className="btn btn-danger width">
                            Cancel
                        </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                        <Button variant="primary" type="submit" className="width">
                            Save changes
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}