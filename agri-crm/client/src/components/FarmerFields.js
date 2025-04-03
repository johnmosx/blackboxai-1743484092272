import { Table, Button, Space } from 'antd';
import FieldForm from './FieldForm';

export default function FarmerFields({ fields, farmerId }) {
  const [selectedField, setSelectedField] = useState(null);
  const [showFieldForm, setShowFieldForm] = useState(false);

  const columns = [
    {
      title: 'Field Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Area (ha)',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, field) => (
        <Space>
          <Button onClick={() => {
            setSelectedField(field);
            setShowFieldForm(true);
          }}>Edit</Button>
          <Button>View History</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button 
        type="primary" 
        onClick={() => {
          setSelectedField(null);
          setShowFieldForm(true);
        }}
      >
        Add Field
      </Button>
      <Table 
        columns={columns} 
        dataSource={fields} 
        rowKey="id" 
      />
      {showFieldForm && (
        <FieldForm
          field={selectedField}
          farmerId={farmerId}
          onClose={() => setShowFieldForm(false)}
        />
      )}
    </div>
  );
}