import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message, Form, Space, Card, Input, Spin } from 'antd';
import {
  getCropTypes, 
  createCropType, 
  updateCropType, 
  deleteCropType 
} from '../api';

import { 
  getPhenologyStages,
  createPhenologyStage,
  updatePhenologyStage,
  deletePhenologyStage
} from '../api';

import { useAuth } from '../contexts/AuthContext';
import {BsFillPencilFill, BsTrashFill} from "react-icons/bs";

const { Panel } = Collapse;
const { TextArea } = Input;

const Crops = () => {
  const [cropTypes, setCropTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentCropType, setCurrentCropType] = useState(null);
  const [form] = Form.useForm();

  const [selectedCropType, setSelectedCropType] = useState(null);
  const [stages, setStages] = useState([]);
  const [stageModalVisible, setStageModalVisible] = useState(false);
  const [currentStage, setCurrentStage] = useState(null);
  const [stageForm] = Form.useForm();

  useEffect(() => {
    stageForm.setFieldsValue({
      name: '',
      description: '',
      order: stages.length > 0 ? Math.max(...stages.map(s => s.order)) + 1 : 1,
      startDay: 0
    });
  }, [stageForm, stages]);

  
  const authContext = useAuth();
  const user = authContext?.currentUser?.user;
  const isAdmin = user?.role === 'Administrator';

  useEffect(() => {
    fetchCropTypes();
  }, []);

  useEffect(() => {
    if (selectedCropType) {
      fetchStages(selectedCropType.id);
    }
  }, [selectedCropType]);

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
          message.error(error.message || 'Failed to delete crop type');
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
      setOpen(false);
      fetchCropTypes();
    } catch (error) {
      message.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setFormLoading(false);
    }
  };

 // Add to component functions
const fetchStages = async (cropTypeId) => {
  try {
    const data = await getPhenologyStages(cropTypeId);
    setStages(data);
  } catch (error) {
    message.error('Failed to load stages');
  }
};

const handleStageSubmit = async (values) => {
  try {
    if (currentStage) {
      await updatePhenologyStage(currentStage.id, values);
      message.success('Stage updated');
    } else {
      await createPhenologyStage({
        ...values,
        cropTypeId: selectedCropType.id
      });
      message.success('Stage created');
    }
    setStageModalVisible(false);
    fetchStages(selectedCropType.id);
  } catch (error) {
    message.error(error.message || 'Operation failed');
  }
};

const handleDeleteStage = async (id) => {
  Modal.confirm({
    title: 'Delete Stage',
    content: 'Are you sure?',
    onOk: async () => {
      try {
        await deletePhenologyStage(id);
        message.success('Stage deleted');
        fetchStages(selectedCropType.id);
      } catch (error) {
        message.error('Failed to delete stage');
      }
    }
  });
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
      title: 'Actions',
      key: 'actions',
      render: (_, record) => isAdmin ? (
        <Space>
          <Button 
            type="link" 
            onClick={() => {
              setCurrentCropType(record);
              form.setFieldsValue(record);
              setOpen(true);
            }}
          >
            <BsFillPencilFill />
          </Button>
          <Button 
            type="link" 
            danger
            onClick={() => handleDelete(record.id)}
          >
            <BsTrashFill />
          </Button>
        </Space>
      ) : null,
    },
  ];
  if (!authContext) {
    return <Spin size="large" />;
  }

  return (
    <div className="p-4">
      <Card
  title="Crop Type Management"
  extra={isAdmin && (
    <Button 
      type="primary" 
      onClick={() => {
        setCurrentCropType(null);
        form.resetFields();
        setOpen(true);
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
    onRow={(record) => ({
      onClick: () => setSelectedCropType(record)
    })}
  />

    {selectedCropType && (
      <div style={{ marginTop: 24 }}>
        <Card 
          title={`Phenology Stages for ${selectedCropType.name}`}
          extra={isAdmin && (
            <Button 
              type="primary" 
              size="small"
              onClick={() => {
                setCurrentStage(null);
                stageForm.setFieldsValue({
                  name: '',
                  description: '',
                  order: stages.length > 0 ? Math.max(...stages.map(s => s.order)) + 1 : 1,
                  startDay: 0
                });
                setStageModalVisible(true);
              }}
            >
              Add Stage
            </Button>
          )}
        >
          <Collapse accordion>
            {stages.map(stage => (
              <Panel 
                header={`${stage.order}. ${stage.name}`} 
                key={stage.id}
                extra={isAdmin && (
                  <Space>
                    <Button 
                      size="small" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentStage(stage);
                        stageForm.setFieldsValue({
                          ...stage,
                          startDay: stage.startDay || 0
                        });
                        setStageModalVisible(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="small" 
                      danger
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteStage(stage.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Space>
                )}
              >
              <p><strong>Description:</strong> {stage.description}</p>
              <p><strong>Starts:</strong> Day {stage.startDay} after planting</p>
              </Panel>
            ))}
          </Collapse>
        </Card>
      </div>
    )}

    {/* Stage Modal */}
      <Modal
        title={currentStage ? "Edit Stage" : "Add New Stage"}
        visible={stageModalVisible}
        onOk={() => stageForm.submit()}
        onCancel={() => {
          setStageModalVisible(false);
          stageForm.resetFields();
        }}
        afterClose={() => {
          setCurrentStage(null);
          stageForm.resetFields();
        }}
      >
      <Form
        form={stageForm}
        onFinish={handleStageSubmit}
        initialValues={currentStage || { 
          order: stages.length > 0 ? Math.max(...stages.map(s => s.order)) + 1 : 1,
          startDay: 0 
        }}
      >
        <Form.Item
          name="name"
          label="Stage Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      <Form.Item
        name="order" 
        label="Order"
        rules={[{ required: true }]}
      >
        <Input type="number" min={1} />
      </Form.Item>
      <Form.Item
        name="startDay"
        label="Start Day (days after planting)"
        rules={[{ required: true }]}
      >
        <Input type="number" min={0} />
      </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  </Card>

      <Modal
        title={currentCropType ? "Edit Crop Type" : "Create New Crop Type"}
        open={open}
        onOk={() => form.submit()}
        onCancel={() => setOpen(false)}
        confirmLoading={formLoading}
        width={600}
        okText={currentCropType ? "Update" : "Create"}
        okButtonProps={{ style: { backgroundColor: '#1890ff', borderColor: '#1890ff' } }}
      >
        <div style={{ padding: '20px 0' }}>
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
              <Input 
                placeholder="Enter crop type name" 
                style={{ padding: '10px' }}
              />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { max: 200, message: 'Description cannot exceed 200 characters' }
              ]}
            >
              <Input.TextArea 
                placeholder="Enter description (optional)"
                rows={4}
                style={{ padding: '10px' }}
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Crops;