import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <Container fluid className="px-0">
      <Row className="g-0">
        <Col md={2} className="bg-light" style={{ minHeight: '100vh' }}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Header />
          <main className="p-4">
            {children}
          </main>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;