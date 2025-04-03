import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message, Form, Space, Card, Tag } from 'antd';
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
  const [formLoading, setFormLoading] = useState(false);
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
      setCropTypes(Array.isArray(data) ? data : []);
    } catch (error) {
      message.error('Failed to fetch crop types');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Delete Crop Type',
      content: 'Are you sure you want to delete this crop type?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteCropType(id);
          message.success('Crop type deleted successfully');
          fetchCropTypes();
        } catch (error) {
          message.error('Failed to delete crop type');
        }
      }
    });
  };

  const handleSubmit = async (values) => {
    setFormLoading(true);
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
    } finally {
      setFormLoading(false);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text}</strong>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => text || '-'
    },
    {
      title: 'Status',
      key: 'status',
      render: () => <Tag color="green">Active</Tag>
    },
    {
      title: 'Actions',
      key: 'actions',
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
    <div className="p-4">
      <Card
        title="Crop Type Management"
        extra={user?.role === 'Administrator' && (
          <Button 
            type="primary" 
            onClick={() => {
              setCurrentCropType(null);
              form.resetFields();
              setVisible(true);
            }}
          >
            Add New Crop Type
          </Button>
        )}
      >
        <Table 
          columns={columns} 
          dataSource={cropTypes} 
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={currentCropType ? "Edit Crop Type" : "Create New Crop Type"}
        open={visible}
        onOk={() => form.submit()}
        onCancel={() => setVisible(false)}
        confirmLoading={formLoading}
        width={600}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{
            name: '',
            description: ''
          }}
        >
          <Form.Item
            name="name"
            label="Crop Type Name"
            rules={[
              { required: true, message: 'Please input the crop type name' },
              { max: 50, message: 'Name cannot exceed 50 characters' }
            ]}
          >
            <input className="ant-input" placeholder="Enter crop type name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { max: 200, message: 'Description cannot exceed 200 characters' }
            ]}
          >
            <textarea 
              className="ant-input" 
              placeholder="Enter description (optional)"
              rows={4} 
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Crops;