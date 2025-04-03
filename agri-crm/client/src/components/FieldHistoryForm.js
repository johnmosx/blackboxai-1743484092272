import { Form, DatePicker, Input, Select, Button } from 'antd';

const FieldHistoryForm = ({ field, cropTypes, onFinish, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      cropTypeId: field.currentCropTypeId // Set default from field's current crop
    });
  }, [field, form]);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="cropTypeId" label="Crop Type" rules={[{ required: true }]}>
        <Select>
          {cropTypes.map(crop => (
            <Select.Option key={crop.id} value={crop.id}>
              {crop.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="plantingDate" label="Planting Date" rules={[{ required: true }]}>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="yieldAmount" label="Yield (kg/ha)">
        <Input type="number" />
      </Form.Item>

      <Form.Item name="fertilizerUsed" label="Fertilizer Used">
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};