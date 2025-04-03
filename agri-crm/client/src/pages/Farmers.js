import { useState, useEffect } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { getFarmers, createFarmer } from '../api';
import FarmerForm from '../components/FarmerForm';

export default function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isManager } = useAuth();

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
      message.error('Failed to create farmer');
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
  ];

  return (
    <div>
      <h1>Farmers Management</h1>
      
      {isManager && (
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
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <FarmerForm 
          onFinish={handleCreateFarmer} 
          onCancel={() => setIsModalVisible(false)}
        />
      </Modal>
    </div>
  );
}