import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaSeedling,
  FaChartBar,
  FaCog,
  FaUserShield
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

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
      
      {currentUser?.role === 'Administrator' && (
        <Nav.Link 
          className="mb-2"
          onClick={() => navigate('/users')}
        >
          <FaUserShield className="me-2" />
          User Management
        </Nav.Link>
      )}

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