import { useState, useEffect } from 'react';
import { Table, Button, Modal, message, Space } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { getFarmers, createFarmer } from '../api';
import FarmerForm from '../components/FarmerForm';

export default function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const authContext = useAuth();
  const currentUser = authContext?.currentUser?.user;
  // Check if user is admin or manager
  const canEdit = currentUser?.role === 'Administrator' || currentUser?.role === 'Manager';

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const data = await getFarmers();
      setFarmers(data);
    } catch (error) {
      message.error('Failed to load farmers');
    }
  };

  const handleCreateFarmer = async (values) => {
    try {
      await createFarmer(values);
      message.success('Farmer created successfully');
      setIsModalVisible(false);
      fetchFarmers();
    } catch (error) {
      message.error(error.message || 'Failed to create farmer');
    }
  };

  // Add to component state
  const [deletingId, setDeletingId] = useState(null);

  // Update handleDelete to track loading state
  const handleDelete = async (farmerId) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this farmer?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        setDeletingId(farmerId);
        try {
          await deleteFarmer(farmerId);
          message.success('Farmer deleted successfully');
          fetchFarmers();
        } catch (error) {
          message.error(error.message || 'Failed to delete farmer');
        } finally {
          setDeletingId(null);
        }
      }
    });
  };

  const [editingFarmer, setEditingFarmer] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleEditClick = (farmer) => {
    setEditingFarmer(farmer);
    setIsEditModalVisible(true);
  };

  const handleUpdateFarmer = async (values) => {
    try {
      await updateFarmer(editingFarmer.id, values);
      message.success('Farmer updated successfully');
      setIsEditModalVisible(false);
      fetchFarmers();
    } catch (error) {
      message.error(error.message || 'Failed to update farmer');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, farmer) => (
        canEdit && (
          <Space>
          <Button onClick={() => handleEditClick(farmer)}>Edit</Button>
          <Button 
            danger 
            onClick={() => handleDelete(farmer.id)}
            loading={deletingId === farmer.id}
          >
            Delete
          </Button>
        </Space>
        )
      ),
    },
  ];

  return (
    <div>
      <h1>Farmers Management</h1>
      
      {canEdit && (
        <Button 
          type="primary" 
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          Add New Farmer
        </Button>
      )}

      <Table 
        columns={columns} 
        dataSource={farmers} 
        rowKey="id"
        bordered
      />

      <Modal
        title="Create New Farmer"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <FarmerForm 
          initialValues={{}} 
          onFinish={handleCreateFarmer}
          onCancel={() => setIsModalVisible(false)}
        />
      </Modal>
      <Modal
      title="Edit Farmer"
      open={isEditModalVisible}
      onCancel={() => setIsEditModalVisible(false)}
      footer={null}
      destroyOnClose
    >
      <FarmerForm
        initialValues={editingFarmer || {}}
        onFinish={handleUpdateFarmer}
        onCancel={() => setIsEditModalVisible(false)}
      />
    </Modal>
    </div>
  );
}