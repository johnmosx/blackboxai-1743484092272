import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const FarmerForm = ({ initialValues, onFinish }) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="name"
        label="Full Name"
        rules={[{ required: true, message: 'Please input farmer name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input phone number' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="location"
        label="Location"
        rules={[{ required: true, message: 'Please input location' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="farmSize"
        label="Farm Size (acres)"
        rules={[{ required: true, message: 'Please input farm size' }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        name="cropType"
        label="Primary Crop"
        rules={[{ required: true, message: 'Please select crop type' }]}
      >
        <Select>
          <Option value="wheat">Wheat</Option>
          <Option value="corn">Corn</Option>
          <Option value="soybeans">Soybeans</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? 'Update Farmer' : 'Create Farmer'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FarmerForm;