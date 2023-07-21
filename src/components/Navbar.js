import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarComponent({ loggedIn, onLogout }) {
  return (
    <>
      {loggedIn && (
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Muchen Kayam</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/data">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={onLogout}>Logout</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default NavbarComponent;
