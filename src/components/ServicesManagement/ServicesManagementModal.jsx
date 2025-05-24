import { Button, Form, Input, Modal, Select } from 'antd';
import { useEffect } from 'react';

const { Option } = Select;

const ServicesManagementModal = ({ 
  mode = 'create', // 'create' or 'edit'
  visible, 
  onCancel, 
  onSubmit,
  institutions = [],
  initialValues = {}
}) => {
  const [form] = Form.useForm();

  // Set form values when mode changes or initialValues update
  useEffect(() => {
    if (mode === 'edit' && visible) {
      form.setFieldsValue(initialValues);
    } else if (mode === 'create' && visible) {
      form.resetFields();
    }
  }, [mode, visible, initialValues, form]);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSubmit(values);
      if (mode === 'create') {
        form.resetFields();
      }
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const modalFooter = (
    <div>
      <Button 
        style={{paddingLeft: "30px", paddingRight: "30px", fontSize: "16px", marginRight: 8}} 
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button 
        type="primary" 
        style={{paddingLeft: "40px", paddingRight: "40px", fontSize: "16px"}} 
        onClick={handleSubmit} 
        className=""
      >
        {mode === 'create' ? 'Create' : 'Update'}
      </Button>
    </div>
  );

  const modalTitle = mode === 'create' 
    ? 'Create New Category' 
    : 'Edit Category';

  return (
    <Modal
      title={<span style={{ fontWeight: "bold", color:"#041B44", paddingTop:"20px", paddbottom:"20px" }}>{modalTitle}</span>}
      open={visible}
      onCancel={handleCancel}
      footer={modalFooter}
      closable={false}
    >
      <Form 
        form={form} 
        layout="vertical"
        initialValues={mode === 'edit' ? initialValues : {
          name: "",
          institution: ""
        }}
      >
        <Form.Item 
          name="serviceName" 
          label={<span style={{ fontWeight: "bold" }}>Services Name</span>}
          rules={[{ required: true, message: 'Please input services name!' }]}
        >
          <Input placeholder="Enter services name" />
        </Form.Item>

         <Form.Item 
          name="basePrice" 
          label={<span style={{ fontWeight: "bold" }}>Base Price</span>}
          rules={[{ required: true, message: 'Please input base price!' }]}
        >
          <Input placeholder="Enter base price" />
        </Form.Item>

         <Form.Item 
          name="ratePerKm" 
          label={<span style={{ fontWeight: "bold" }}>Rate Per Km ($)</span>}
          rules={[{ required: true, message: 'Please input rate per km!' }]}
        >
          <Input placeholder="Enter rate per km" />
        </Form.Item>

         <Form.Item 
          name="highestHour" 
          label={<span style={{ fontWeight: "bold" }}>Highest Hour</span>}
          rules={[{ required: true, message: 'Please input highest hour!' }]}
        >
          <Input placeholder="Enter highest hour" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ServicesManagementModal;