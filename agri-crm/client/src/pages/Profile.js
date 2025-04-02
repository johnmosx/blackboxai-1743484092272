import React from 'react';
import { Card, Typography, Descriptions, Avatar } from 'antd';
import ChangePassword from '../components/ChangePassword';
import { useAuth } from '../contexts/AuthContext';

const { Title } = Typography;

const Profile = () => {
  const { currentUser } = useAuth();
  const user = currentUser.user;
  return (
    <div style={{ padding: 24 }}>
      <Card 
        title={<Title level={3}>User Profile</Title>}
        extra={<Avatar size={60} padding={10}>{user?.username?.charAt(0)}</Avatar>}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Username">{user?.username}</Descriptions.Item>
          <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
          <Descriptions.Item label="Role">{user?.role}</Descriptions.Item>
        </Descriptions>

        <div style={{ marginTop: 24 }}>
          <Title level={4}>Change Password</Title>
          <ChangePassword />
        </div>
      </Card>
    </div>
  );
};

export default Profile;