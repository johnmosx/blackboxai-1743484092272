import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Badge, ListGroup, Alert } from 'react-bootstrap';
import api from '../api';

const FarmerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [farmer, setFarmer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFarmer = async () => {
      try {
        const response = await api.get(`/farmers/${id}`);
        setFarmer(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch farmer');
      } finally {
        setIsLoading(false);
      }
    };
    fetchFarmer();
  }, [id]);

  if (isLoading) return <Container className="p-4">Loading...</Container>;
  if (error) return <Container className="p-4"><Alert variant="danger">{error}</Alert></Container>;
  if (!farmer) return <Container className="p-4">Farmer not found</Container>;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Farmer Details</h4>
              <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                Back
              </Button>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h5>Basic Information</h5>
                  <ListGroup variant="flush">
                    <ListGroup.Item><strong>Name:</strong> {farmer.name}</ListGroup.Item>
                    <ListGroup.Item><strong>Location:</strong> {farmer.location}</ListGroup.Item>
                    <ListGroup.Item><strong>Contact:</strong> {farmer.contact}</ListGroup.Item>
                    <ListGroup.Item><strong>Farm Size:</strong> {farmer.farmSize} acres</ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <h5>Crops</h5>
                  {farmer.crops && farmer.crops.length > 0 ? (
                    <div className="d-flex flex-wrap gap-2">
                      {farmer.crops.map((crop, index) => (
                        <Badge key={index} bg="success" pill>{crop}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p>No crops recorded</p>
                  )}
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-end">
              <Button 
                variant="primary"
                onClick={() => navigate(`/farmers/${farmer.id}`)}
              >
                Edit Farmer
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FarmerView;