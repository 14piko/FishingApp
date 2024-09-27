import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import FishServices from "../../services/FishServices";
import { useEffect, useState } from "react";
import moment from "moment";

export default function EditFishes() {

    const navigate = useNavigate();
    const routeParams = useParams();
    const [fish, setFishes] = useState({});

    async function getFish(){
        const response = await FishServices.getById(routeParams.id);
        if (response.error) {
            setErrorMessage(response.message); 
            return;
        }
        response.message.huntStart = moment.utc(response.message.huntStart).format('yyyy-MM-DD');
        response.message.huntEnd = moment.utc(response.message.huntEnd).format('yyyy-MM-DD');
        setFishes(response.message);
    }

    useEffect(() => {
        getFish();
    },[]);

    async function edit(fish) {
      
        const response = await FishServices.editFish(routeParams.id, fish);
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
            huntStart: moment.utc(results.get('huntStart')),
            huntEnd: moment.utc(results.get('huntEnd')),
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
                    <Form.Control type="date" name="huntStart"  
                    defaultValue={fish.huntStart}/>
                </Form.Group>

                <Form.Group controlId="huntEnd">
                    <Form.Label>Hunt end</Form.Label>
                    <Form.Control type="date" name="huntEnd"  
                    defaultValue={fish.huntEnd}/>
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