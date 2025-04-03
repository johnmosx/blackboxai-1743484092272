import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message, Form, Space } from 'antd';
import { 
  getCropTypes, 
  createCropType, 
  updateCropType, 
  deleteCropType 
} from '../api';
import { useAuth } from '../contexts/AuthContext';

const Crops = () => {
  const [cropTypes, setCropTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentCropType, setCurrentCropType] = useState(null);
  const [form] = Form.useForm();
  const { user } = useAuth();

  useEffect(() => {
    fetchCropTypes();
  }, []);

  const fetchCropTypes = async () => {
    setLoading(true);
    try {
      const data = await getCropTypes();
      setCropTypes(data);
    } catch (error) {
      message.error('Failed to fetch crop types');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCropType(id);
      message.success('Crop type deleted successfully');
      fetchCropTypes();
    } catch (error) {
      message.error('Failed to delete crop type');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (currentCropType) {
        await updateCropType(currentCropType.id, values);
        message.success('Crop type updated successfully');
      } else {
        await createCropType(values);
        message.success('Crop type created successfully');
      }
      setVisible(false);
      fetchCropTypes();
    } catch (error) {
      message.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => user?.role === 'Administrator' ? (
        <Space>
          <Button 
            type="link" 
            onClick={() => {
              setCurrentCropType(record);
              form.setFieldsValue(record);
              setVisible(true);
            }}
          >
            Edit
          </Button>
          <Button 
            type="link" 
            danger
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ) : null,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <h1 className="text-2xl font-bold">Crop Type Management</h1>
        {user?.role === 'Administrator' && (
          <Button 
            type="primary" 
            onClick={() => {
              setCurrentCropType(null);
              form.resetFields();
              setVisible(true);
            }}
          >
            Add Crop Type
          </Button>
        )}
      </div>
      
      <Table 
        columns={columns} 
        dataSource={cropTypes} 
        loading={loading}
        rowKey="id"
      />

      <Modal
        title={currentCropType ? "Edit Crop Type" : "Add New Crop Type"}
        visible={visible}
        onOk={() => form.submit()}
        onCancel={() => setVisible(false)}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the crop type name!' }]}
          >
            <input className="ant-input" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
          >
            <textarea className="ant-input" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Crops;