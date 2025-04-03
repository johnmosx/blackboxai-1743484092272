import { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Space, Upload, message } from 'antd';
import { MapContainer, TileLayer, Polygon, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const FieldForm = ({ farmerId, cropTypes, onFinish, onCancel }) => {
  const [form] = Form.useForm();
  const [geoJson, setGeoJson] = useState(null);
  const [mapCenter] = useState([51.505, -0.09]); // Default center

  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        // Handle drawing logic here
        // For simplicity, we'll just use a single polygon
        setGeoJson({
          type: "Polygon",
          coordinates: [[
            [e.latlng.lat, e.latlng.lng],
            [e.latlng.lat + 0.01, e.latlng.lng],
            [e.latlng.lat + 0.01, e.latlng.lng + 0.01],
            [e.latlng.lat, e.latlng.lng + 0.01]
          ]]
        });
      }
    });
    return null;
  };

  const handleSubmit = (values) => {
    if (!geoJson) {
      message.error('Please draw the field boundary on the map');
      return;
    }
    onFinish({ ...values, geoJson, farmerId });
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="name" label="Field Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="area" label="Area (ha)" rules={[{ required: true }]}>
        <Input type="number" />
      </Form.Item>

      <Form.Item label="Field Boundary">
        <MapContainer center={mapCenter} zoom={13} style={{ height: '300px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapEvents />
          {geoJson && <Polygon positions={geoJson.coordinates} />}
        </MapContainer>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};