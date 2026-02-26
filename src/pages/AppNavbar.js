import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './AppNavbar.css';

const Title = styled.h2({
  color:'white',
  fontWeight: 'bold',
  
})


function AppNavbar() {
  return (
    <Navbar expand="lg" className="custom-navbar" variant="dark">
      <Container fluid>
       <Title>Employee Management</Title>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Right Menu */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={Link}to="/" className="nav-link">
             Home
            </Nav.Link>
            <Nav.Link as={Link}to="/addEmployee" className="nav-link">
              Add Employee
            </Nav.Link>
            <Nav.Link as={Link} to="/viewEmployees" className="nav-link">
              View Employees
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
