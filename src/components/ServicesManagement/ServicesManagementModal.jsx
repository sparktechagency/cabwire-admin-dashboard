import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, message, Modal, Upload } from 'antd';
import { useEffect, useState } from 'react';

const ServicesManagementModal = ({
  mode = 'create',
  visible,
  onCancel,
  onSubmit,
  initialValues = {}
}) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (mode === 'edit' && visible) {
      form.setFieldsValue(initialValues);
      if (initialValues.image) {
        setImageUrl(initialValues.image);
        setFileList([{
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: initialValues.image,
        }]);
      }
    } else if (mode === 'create' && visible) {
      form.resetFields();
      setImageUrl(null);
      setFileList([]);
    }
  }, [mode, visible, initialValues, form]);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      // Check if image is uploaded
      if (!imageUrl) {
        message.error('Please upload an image!');
        return;
      }

      const formData = {
        ...values,
        image: imageUrl
      };
      console.log('Form submitted with data:', formData); // This will log the complete data
      onSubmit(formData);

      if (mode === 'create') {
        form.resetFields();
        setImageUrl(null);
        setFileList([]);
      }
    }).catch(err => {
      console.log('Validation failed:', err);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setImageUrl(null);
    setFileList([]);
    onCancel();
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      return Upload.LIST_IGNORE;
    }
    return false; // Return false to handle upload manually
  };

  const handleChange = (info) => {
    let newFileList = [...info.fileList];

    // Limit to 1 file
    newFileList = newFileList.slice(-1);

    if (info.file.status === 'done') {
      // Get base64 URL for the image
      getBase64(info.file.originFileObj, url => {
        setImageUrl(url);
        setFileList(newFileList);
      });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    } else {
      setFileList(newFileList);
    }
  };

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Upload Image</div>
    </div>
  );

  const modalFooter = (
    <div>
      <Button
        style={{ paddingLeft: "30px", paddingRight: "30px", fontSize: "16px", marginRight: 8 }}
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button
        type="primary"
        style={{ paddingLeft: "40px", paddingRight: "40px", fontSize: "16px" }}
        onClick={handleSubmit}
      >
        {mode === 'create' ? 'Create' : 'Update'}
      </Button>
    </div>
  );

  const modalTitle = mode === 'create'
    ? 'Create New Service'
    : 'Edit Service';

  return (
    <Modal
      title={<span style={{ fontWeight: "bold", color: "#041B44", paddingTop: "20px", paddbottom: "20px" }}>{modalTitle}</span>}
      open={visible}
      onCancel={handleCancel}
      footer={modalFooter}
      closable={false}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={mode === 'edit' ? initialValues : {
          serviceName: "",
          baseFare: ""
        }}
      >
        <Form.Item
          name="serviceName"
          label={<span style={{ fontWeight: "bold" }}>Service Name</span>}
          rules={[{ required: true, message: 'Please input service name!' }]}
        >
          <Input placeholder="Enter service name" />
        </Form.Item>

        <Form.Item
          name="baseFare"
          label={<span style={{ fontWeight: "bold" }}>Base Fare ($)</span>}
          rules={[{ required: true, message: 'Please input base fare!' }]}
        >
          <Input type="number" placeholder="Enter base fare" />
        </Form.Item>

        <Form.Item
          name="image"
          label={<span style={{ fontWeight: "bold" }}>Service Image</span>}
          rules={[{ required: true, message: 'Please upload an image!' }]}
        >
          <Upload
            name="image"
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            accept="image/*"
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="service"
                style={{ width: '100%' }}
                preview={false}
              />
            ) : uploadButton}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ServicesManagementModal;