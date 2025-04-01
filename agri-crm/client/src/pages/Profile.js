import React from 'react';
import { Card, Typography } from 'antd';
import ChangePassword from '../components/ChangePassword';
import { useAuth } from '../contexts/AuthContext';

const { Title } = Typography;

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div style={{ padding: 24 }}>
      <Card title={<Title level={3}>User Profile</Title>}>
        <div style={{ marginBottom: 24 }}>
          <p><strong>Username:</strong> {currentUser?.username}</p>
          <p><strong>Email:</strong> {currentUser?.email}</p>
          <p><strong>Role:</strong> {currentUser?.role}</p>
        </div>

        <Title level={4}>Change Password</Title>
        <ChangePassword />
      </Card>
    </div>
  );
};

export default Profile;