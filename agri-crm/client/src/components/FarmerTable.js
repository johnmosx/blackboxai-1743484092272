import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FarmerTable = ({ farmers, onDelete }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this farmer?')) {
      try {
        // TODO: Add API call here
        onDelete(id);
      } catch (err) {
        console.error('Failed to delete farmer:', err);
        alert('Failed to delete farmer. Please try again.');
      }
    }
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Contact</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {farmers.map((farmer) => (
          <tr key={farmer.id}>
            <td>{farmer.name}</td>
            <td>{farmer.location}</td>
            <td>{farmer.contact}</td>
            <td>
              <Button 
                as={Link}
                to={`/farmers/view/${farmer.id}`}
                variant="info"
                size="sm"
                className="me-2"
              >
                View
              </Button>
              <Button
                as={Link}
                to={`/farmers/${farmer.id}`}
                variant="primary"
                size="sm"
                className="me-2"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(farmer.id)}
                variant="danger"
                size="sm"
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default FarmerTable;