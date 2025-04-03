import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message, Form, Space } from 'antd';
import UserForm from '../components/UserForm';
import { getUsers, updateUser, createUser, deleteUser } from '../api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      // Ensure response is an array before setting state
      setUsers(Array.isArray(response) ? response : []);
    } catch (error) {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = (user) => {
    setCurrentUser(user);
    form.setFieldsValue({ role: user.role });
    setVisible(true);
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      message.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (currentUser) {
        await updateUser(currentUser.id, values);
        message.success('User updated successfully');
      } else {
        await createUser(values);
        message.success('User created successfully');
      }
      setVisible(false);
      fetchUsers();
    } catch (error) {
      message.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            onClick={() => handleUpdateRole(record)}
          >
            Update Role
          </Button>
          <Button 
            type="link" 
            danger
            onClick={() => handleDeleteUser(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <h2>User Management</h2>
        <Button 
          type="primary" 
          onClick={() => {
            setCurrentUser(null);
            setVisible(true);
          }}
        >
          Create New User
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={users} 
        loading={loading}
        rowKey="id"
      />

      <Modal
        title={currentUser ? "Update User" : "Create New User"}
        visible={visible}
        onOk={handleSubmit}
        onCancel={() => setVisible(false)}
      >
        <UserForm 
          initialValues={currentUser}
          onFinish={async (values) => {
            await handleSubmit(values);
            setVisible(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Users;