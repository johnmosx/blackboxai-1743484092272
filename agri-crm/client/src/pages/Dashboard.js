import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DashboardCard from '../components/DashboardCard';
import { 
  FaUsers,
  FaSeedling, 
  FaChartLine,
  FaMoneyBillWave
} from 'react-icons/fa';

const Dashboard = () => {
  return (
    <Container>
      <h2 className="mb-4">Dashboard</h2>
      <Row>
        <Col md={3}>
          <DashboardCard 
            title="Total Farmers" 
            value="248" 
            icon={FaUsers}
            variant="primary"
          />
        </Col>
        <Col md={3}>
          <DashboardCard 
            title="Active Crops" 
            value="12" 
            icon={FaSeedling}
            variant="success"
          />
        </Col>
        <Col md={3}>
          <DashboardCard 
            title="Revenue" 
            value="$24,580" 
            icon={FaMoneyBillWave}
            variant="info"
          />
        </Col>
        <Col md={3}>
          <DashboardCard 
            title="Growth Rate" 
            value="+12.5%" 
            icon={FaChartLine}
            variant="warning"
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={8}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Recent Activity</h5>
              {/* Activity chart/table will go here */}
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Quick Actions</h5>
              {/* Quick action buttons will go here */}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;