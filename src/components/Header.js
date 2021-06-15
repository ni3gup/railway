import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Logo from '../images/logo.png';

const Header = () => {
    return (
        <Navbar bg="primary" variant="light" expand="lg" fixed="top">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img alt="" src={Logo} width="30" height="30" className="d-inline-block align-top" /> {''}
                        Railway
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* <LinkContainer to="/running-status">
                            <Nav.Link>Running Status</Nav.Link>
                        </LinkContainer> */}
                        <LinkContainer to="/pnr-status">
                            <Nav.Link>PNR Status Enquiry</Nav.Link>
                        </LinkContainer>
                        {/* <LinkContainer to="/search-name-number">
                            <Nav.Link>Search By Name/Number</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/search-station">
                            <Nav.Link>Search By Station</Nav.Link>
                        </LinkContainer> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;
