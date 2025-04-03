import { Form, Input, Button, message } from 'antd';

export default function FarmerForm({ farmer, onSave }) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      initialValues={farmer || {}}
      onFinish={async (values) => {
        try {
          await onSave(values);
          message.success('Farmer saved successfully');
        } catch (error) {
          message.error('Failed to save farmer');
        }
      }}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="Phone">
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email">
        <Input type="email" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Save Farmer
      </Button>
    </Form>
  );
}