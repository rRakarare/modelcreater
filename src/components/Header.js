import React from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
        <LinkContainer to="/">
        <Navbar.Brand>React-Bootstrap</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default Header
