import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  FaTachometerAlt,
  FaUsers,
  FaSeedling,
  FaChartBar,
  FaUser,
  FaCog
} from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <Nav className="flex-column p-3" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Nav.Link onClick={() => navigate('/')}>
        <FaTachometerAlt className="me-2" />
        Dashboard
      </Nav.Link>
      
      <Nav.Link onClick={() => navigate('/farmers')}>
        <FaUsers className="me-2" />
        Farmers
      </Nav.Link>

      <Nav.Link onClick={() => navigate('/crops')}>
        <FaSeedling className="me-2" />
        Crops
      </Nav.Link>

      <Nav.Link onClick={() => navigate('/reports')}>
        <FaChartBar className="me-2" />
        Reports
      </Nav.Link>

      {currentUser.user?.role === 'Administrator' && (
        <Nav.Link onClick={() => navigate('/users')}>
          <FaUser className="me-2" />
          User Management
        </Nav.Link>
      )}

      <Nav.Link onClick={() => navigate('/profile')}>
        <FaUser className="me-2" />
        My Profile
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