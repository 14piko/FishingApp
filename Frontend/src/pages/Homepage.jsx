﻿import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Homepage.css'; 

export default function Homepage() {
    return (
        <div className="homepage">
            <div className="hero-section d-flex align-items-center text-center">
                <Container>
                    <h1 className="text-white display-3 fw-bold">Welcome to Fishing App!</h1>
                    <p className="text-white lead fw-bold">Track your catches, explore new locations, and join the fishing community.</p>
                    <Link to="/fishes">
                        <Button variant="success" size="lg" className="me-2">Fish list</Button>
                    </Link>
                    <Link to="/rivers">
                        <Button variant="success" size="lg" className="me-2">River list</Button>
                    </Link>
                    <br></br>
                    <br></br>
                    <Link to="/fishings">
                        <Button variant="outline-light" size="lg">Add new catch</Button>
                    </Link>
                </Container>
            </div>

            <Container className="features-section mt-5">
                <h2 className="text-center mb-5">Key Features</h2>
                <Row>
                    <Col md={4}>
                        <Card className="feature-card">
                            <Card.Body>
                                <Card.Title><strong>Track your catches</strong></Card.Title>
                                <Card.Text>Keep a detailed log of all your fishing trips, including dates, locations, and species caught.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="feature-card">
                            <Card.Body>
                                <Card.Title><strong>Explore new locations</strong></Card.Title>
                                <Card.Text>Find the best fishing spots near you, and share your favorite locations with others.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="feature-card">
                            <Card.Body>
                                <Card.Title><strong>Join the community</strong></Card.Title>
                                <Card.Text>Connect with other fishermen, share tips, and stay updated with the latest fishing trends.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <div className="cta-section text-center mt-5 py-5 bg-dark text-white">
                <Container>
                    <h2 className="mb-4">Ready to start your fishing adventure?</h2>
                    <Link to="/register">
                        <Button variant="primary" size="lg" className="me-2">Sign Up Now</Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="outline-light" size="lg">Log In</Button>
                    </Link>
                </Container>
            </div>
        </div>
    );
}
