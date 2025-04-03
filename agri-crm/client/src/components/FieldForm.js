import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function FieldForm({ field, cropTypes }) {
  const [geoJson, setGeoJson] = useState(field?.geoJson || null);
  
  return (
    <Form>
      {/* Field name and other inputs */}
      <Form.Item name="geoJson" label="Field Boundaries">
        <MapContainer center={[51.505, -0.09]} zoom={13}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {geoJson && <Polygon positions={geoJson.coordinates} />}
        </MapContainer>
      </Form.Item>
      <Form.Item name="cropTypeId" label="Current Crop">
        <Select>
          {cropTypes.map(crop => (
            <Select.Option key={crop.id} value={crop.id}>
              {crop.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
}