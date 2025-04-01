import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const FarmerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [farmer, setFarmer] = useState({
    name: '',
    location: '',
    contact: '',
    farmSize: '',
    crops: []
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchFarmer = async () => {
        try {
          const response = await api.get(`/farmers/${id}`);
          setFarmer(response.data);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to fetch farmer');
        }
      };
      fetchFarmer();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (id) {
        await api.put(`/farmers/${id}`, farmer);
      } else {
        await api.post('/farmers', farmer);
      }
      navigate('/farmers');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save farmer');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarmer(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="mb-4">{id ? 'Edit' : 'Add'} Farmer</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={farmer.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={farmer.location}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={farmer.contact}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Farm Size (acres)</Form.Label>
              <Form.Control
                type="number"
                name="farmSize"
                value={farmer.farmSize}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button 
                variant="primary" 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Farmer'}
              </Button>
              <Button 
                variant="outline-secondary" 
                onClick={() => navigate('/farmers')}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FarmerForm;