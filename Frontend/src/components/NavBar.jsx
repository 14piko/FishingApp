﻿import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { RoutesNames, APP_URL } from '../constants';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import useAuth from '../hooks/useAuth';

export default function NavBar() {
    const navigate = useNavigate();
    const { logout, isLoggedIn } = useAuth();

    function OpenSwaggerURL(){
        window.open(APP_URL + "/swagger/index.html", "_blank")
    }

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
                        <Nav.Link onClick={()=> OpenSwaggerURL()}>API Docs</Nav.Link>
                        {isLoggedIn ? (
                                <>
                        <NavDropdown title="Programs" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => navigate(RoutesNames.USER_VIEW)}>Users</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate(RoutesNames.FISH_VIEW)}>Fishes</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate(RoutesNames.RIVER_VIEW)}>Rivers</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate(RoutesNames.FISHING_VIEW)}>Fishings</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link onClick={logout}>Odjava</Nav.Link>
                        </>
                        ) : (
                        <Nav.Link onClick={() => navigate(RoutesNames.LOGIN)}>
                        Login
                        </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}