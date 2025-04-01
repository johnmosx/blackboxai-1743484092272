import React from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand href="/">Agri-CRM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                <FaUserCircle size={20} className="me-2" />
                Admin
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#profile">Profile</Dropdown.Item>
                <Dropdown.Item href="#settings">Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#logout">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;