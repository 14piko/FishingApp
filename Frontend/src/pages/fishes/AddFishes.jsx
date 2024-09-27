import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import FishServices from "../../services/FishServices";

export default function AddFishes() {
    const navigate = useNavigate();
  
    async function add(fish) {
        const response = await FishServices.addFish(fish);

        if (response.error) {
            setErrorMessage(response.message);  
            return;
        }

        navigate(RoutesNames.FISH_VIEW);
    }

    function doSubmit(e) {
        e.preventDefault();
        setErrorMessage(""); 

        const results = new FormData(e.target);

        add({
            name: results.get('name'),
            huntStart: moment.utc(results.get('huntStart')),
            huntEnd: moment.utc(results.get('huntEnd')),
            description: results.get('description')
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
                    <Form.Control type="date" name="huntStart"  />
                </Form.Group>

                <Form.Group controlId="huntEnd">
                    <Form.Label>Hunt end</Form.Label>
                    <Form.Control type="date" name="huntEnd"  />
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