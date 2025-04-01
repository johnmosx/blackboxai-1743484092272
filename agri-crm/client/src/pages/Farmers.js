import React, { useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FarmerTable from '../components/FarmerTable';

const Farmers = () => {
  const [farmers, setFarmers] = useState([
    { id: 1, name: 'John Doe', location: 'North Field', contact: '555-1234' },
    { id: 2, name: 'Jane Smith', location: 'South Field', contact: '555-5678' },
    { id: 3, name: 'Robert Johnson', location: 'East Field', contact: '555-9012' },
  ]);

  const handleDelete = (id) => {
    setFarmers(farmers.filter(farmer => farmer.id !== id));
  };

  return (
    <Container>
      <Row className="mb-4 align-items-center">
        <Col>
          <h2>Farmers Management</h2>
        </Col>
        <Col className="text-end">
          <Button as={Link} to="/farmers/new" variant="primary">
            Add New Farmer
          </Button>
        </Col>
      </Row>
      <FarmerTable farmers={farmers} onDelete={handleDelete} />
    </Container>
  );
};

export default Farmers;