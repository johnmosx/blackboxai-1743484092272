import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';

const Layout = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Container fluid className="px-0">
      <Row className="g-0">
        <Header />
        <Col md={2} className="bg-light" style={{ minHeight: '100vh' }}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <main className="p-4">
            {children}
          </main>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;