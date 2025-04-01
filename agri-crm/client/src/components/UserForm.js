import React from 'react';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const UserForm = ({ initialValues, onFinish }) => {
  const [form] = Form.useForm();

  const roles = [
    { value: 'Administrator', label: 'Administrator' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Farm Expert', label: 'Farm Expert' }
  ];

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: 'Please input username' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please input email' },
          { type: 'email', message: 'Please enter a valid email' }
        ]}
      >
        <Input />
      </Form.Item>

      {!initialValues && (
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input password' }]}
        >
          <Input.Password />
        </Form.Item>
      )}

      <Form.Item
        name="role"
        label="Role"
        rules={[{ required: true, message: 'Please select role' }]}
      >
        <Select>
          {roles.map(role => (
            <Option key={role.value} value={role.value}>
              {role.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? 'Update User' : 'Create User'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;