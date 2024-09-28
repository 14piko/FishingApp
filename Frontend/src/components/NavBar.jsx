import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { RoutesNames } from '../constants';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
    const navigate = useNavigate();

    return (
        <Navbar expand="lg" className="navbar-custom">
            <Container>
                <Navbar.Brand onClick={() => navigate(RoutesNames.HOME)} className="navbar-title">
                    Fishing App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link onClick={() => navigate(RoutesNames.HOME)}>Home</Nav.Link>
                        <Nav.Link href="https://piko307-001-site1.gtempurl.com/swagger/index.html" target='_blank' rel="noopener noreferrer">
                            API Docs
                        </Nav.Link>
                        <NavDropdown title="Programs" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => navigate(RoutesNames.USER_VIEW)}>Users</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate(RoutesNames.FISH_VIEW)}>Fishes</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate(RoutesNames.RIVER_VIEW)}>Rivers</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate(RoutesNames.FISHING_VIEW)}>Fishings</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}