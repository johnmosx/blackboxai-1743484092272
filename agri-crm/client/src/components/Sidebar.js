import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaSeedling,
  FaChartBar,
  FaCog
} from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Nav className="flex-column p-3" style={{ minHeight: '100vh' }}>
      <Nav.Link 
        className="mb-2" 
        onClick={() => navigate('/')}
      >
        <FaTachometerAlt className="me-2" />
        Dashboard
      </Nav.Link>
      <Nav.Link 
        className="mb-2"
        onClick={() => navigate('/farmers')}
      >
        <FaUsers className="me-2" />
        Farmers
      </Nav.Link>
      <Nav.Link 
        className="mb-2"
        onClick={() => navigate('/crops')}
      >
        <FaSeedling className="me-2" />
        Crops
      </Nav.Link>
      <Nav.Link 
        className="mb-2"
        onClick={() => navigate('/reports')}
      >
        <FaChartBar className="me-2" />
        Reports
      </Nav.Link>
      <div className="mt-auto">
        <Nav.Link onClick={() => navigate('/settings')}>
          <FaCog className="me-2" />
          Settings
        </Nav.Link>
      </div>
    </Nav>
  );
};

export default Sidebar;