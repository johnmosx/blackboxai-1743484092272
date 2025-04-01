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
      email: formData.get('email'),
      location: formData.get('location')
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
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              name="email" 
              defaultValue={initialValues?.email} 
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

          <Button variant="primary" type="submit" className="w-100">
            {initialValues ? 'Update Farmer' : 'Create Farmer'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FarmerForm;