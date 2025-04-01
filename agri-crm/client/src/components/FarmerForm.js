import React from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const FarmerForm = ({ initialValues, onFinish }) => {
  const [error, setError] = React.useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const farmerData = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      location: formData.get('location'),
      farmSize: formData.get('farmSize'),
      cropType: formData.get('cropType')
    };
    
    try {
      setError('');
      onFinish(farmerData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">
          {initialValues ? 'Edit Farmer' : 'Add New Farmer'}
        </h2>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control 
              type="text" 
              name="name" 
              defaultValue={initialValues?.name} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control 
              type="tel" 
              name="phone" 
              defaultValue={initialValues?.phone} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control 
              type="text" 
              name="location" 
              defaultValue={initialValues?.location} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Farm Size (acres)</Form.Label>
            <Form.Control 
              type="number" 
              name="farmSize" 
              defaultValue={initialValues?.farmSize} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Primary Crop</Form.Label>
            <Form.Select name="cropType" defaultValue={initialValues?.cropType}>
              <option value="wheat">Wheat</option>
              <option value="corn">Corn</option>
              <option value="soybeans">Soybeans</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            {initialValues ? 'Update Farmer' : 'Create Farmer'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FarmerForm;