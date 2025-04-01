import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {
  FaTachometerAlt,
  FaUsers,
  FaSeedling,
  FaChartBar,
  FaCog
} from 'react-icons/fa';

const Sidebar = () => {
  return (
    <Nav className="flex-column p-3" style={{ minHeight: '100vh' }}>
      <LinkContainer to="/" exact>
        <Nav.Link className="mb-2">
          <FaTachometerAlt className="me-2" />
          Dashboard
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to="/farmers">
        <Nav.Link className="mb-2">
          <FaUsers className="me-2" />
          Farmers
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to="/crops">
        <Nav.Link className="mb-2">
          <FaSeedling className="me-2" />
          Crops
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to="/reports">
        <Nav.Link className="mb-2">
          <FaChartBar className="me-2" />
          Reports
        </Nav.Link>
      </LinkContainer>
      <div className="mt-auto">
        <LinkContainer to="/settings">
          <Nav.Link>
            <FaCog className="me-2" />
            Settings
          </Nav.Link>
        </LinkContainer>
      </div>
    </Nav>
  );
};

export default Sidebar;