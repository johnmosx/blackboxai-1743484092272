import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" selectedKeys={[]}>
        <Menu.Item key="1" onClick={() => navigate('/')}>Dashboard</Menu.Item>
        <Menu.Item key="2" onClick={() => navigate('/farmers')}>Farmers</Menu.Item>
        <Menu.Item key="3" onClick={() => navigate('/reports')}>Reports</Menu.Item>
        {currentUser && (
          <Menu.Item key="4" onClick={() => navigate('/profile')}>Profile</Menu.Item>
        )}
      </Menu>
      {currentUser ? (
        <Button 
          type="text" 
          style={{ color: 'white', float: 'right' }}
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Logout
        </Button>
      ) : (
        <Button 
          type="text" 
          style={{ color: 'white', float: 'right' }}
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      )}
    </Header>
  );
};

export default AppHeader;