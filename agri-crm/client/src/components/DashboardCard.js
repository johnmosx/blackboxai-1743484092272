import React from 'react';
import { Card } from 'react-bootstrap';

const DashboardCard = ({ title, value, icon: Icon, variant }) => {
  return (
    <Card className="mb-4" border={variant} style={{ minHeight: '120px' }}>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Title className="mb-0 text-muted">{title}</Card.Title>
          <Icon size={24} className={`text-${variant}`} />
        </div>
        <Card.Text as="div" className="mt-auto">
          <h2 className="mb-0">{value}</h2>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DashboardCard;