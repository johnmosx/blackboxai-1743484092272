import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Select, message } from 'antd';
import { getUsers, updateUser } from '../api';

const { Option } = Select;

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
      setUsers(response);
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

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await updateUser(currentUser.id, values);
      message.success('User role updated successfully');
      setVisible(false);
      fetchUsers();
    } catch (error) {
      message.error('Failed to update user role');
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
        <Button 
          type="link" 
          onClick={() => handleUpdateRole(record)}
        >
          Update Role
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table 
        columns={columns} 
        dataSource={users} 
        loading={loading}
        rowKey="id"
      />

      <Modal
        title="Update User Role"
        visible={visible}
        onOk={handleSubmit}
        onCancel={() => setVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select>
              <Option value="Administrator">Administrator</Option>
              <Option value="Manager">Manager</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;