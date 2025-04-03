import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getFarmers, createFarmer, updateFarmer } from '../api';
import FarmerForm from '../components/FarmerForm';
import FarmerFields from '../components/FarmerFields';
import {Button, Space, Table} from "antd";

export default function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const { isManager } = useAuth();

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    const data = await getFarmers();
    setFarmers(data);
  };

  const handleSaveFarmer = async (values) => {
    if (selectedFarmer) {
      await updateFarmer(selectedFarmer.id, values);
    } else {
      await createFarmer(values);
    }
    fetchFarmers();
    setSelectedFarmer(null);
  };

  return (
    <div>
      <h1>Farmers Management</h1>
      {isManager && (
        <div>
          <Button 
            type="primary" 
            onClick={() => setSelectedFarmer({})}
          >
            Add New Farmer
          </Button>
          {selectedFarmer && (
            <FarmerForm 
              farmer={selectedFarmer} 
              onSave={handleSaveFarmer} 
            />
          )}
          <Table
            dataSource={farmers}
            columns={[
              { title: 'Name', dataIndex: 'name' },
              { title: 'Phone', dataIndex: 'phone' },
              { 
                title: 'Actions',
                render: (_, farmer) => (
                  <Space>
                    <Button onClick={() => setSelectedFarmer(farmer)}>
                      Edit
                    </Button>
                    <Button onClick={() => {/* View fields */}}>
                      View Fields
                    </Button>
                  </Space>
                )
              }
            ]}
            rowKey="id"
          />
        </div>
      )}
    </div>
  );
}