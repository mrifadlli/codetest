import React, { useEffect } from 'react';
import { Button, Col, Drawer, Form, Input, message, Row, Select, Space } from 'antd';
import useUserStore from '@/store/users';
import { viewUser } from '@/pages/api';
import { UpdateUser } from '@/types';

const { Option } = Select;

interface EditUserDrawerProps {
  open: boolean;
  onClose: () => void;
  onSumbit: (user_data: UpdateUser, user_id: number) => void;
}

const EditUserDrawer: React.FC<EditUserDrawerProps> = ({ open, onClose, onSumbit }) => {
  const { id, setName, setEmailAddress, setGender, setStatus, setUser, name, email_address, gender, status } = useUserStore()
  const [form] = Form.useForm();
  const fetchUserDetail = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Invalid credentials!");
      }
      const data = await viewUser(token, id);
      setUser(data);
      setName(data.name);
      setEmailAddress(data.email);
      setGender(data.gender);
      setStatus(data.status);
      form.setFieldsValue({
        email: data.email,
        name: data.name,
        gender: data.gender,
        status: data.status,
      });
    } catch (error: any) {
      message.error(error.message || 'Failed to fetch user details');
    }
  };

  const handleCancelEditDrawer = () =>{
    setName('')
    setEmailAddress('')
    setGender('')
    setUser(null)
    onClose()
  }

  useEffect(() => {
    if (open && id) {
      fetchUserDetail();
    }
  }, [open, id]);

  return (
    <Drawer
      title="Edit user"
      width={500}
      onClose={handleCancelEditDrawer}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button size='middle' onClick={handleCancelEditDrawer}>Cancel</Button>
          <Button size='middle' onClick={() => onSumbit({ name, email: email_address, gender, status }, id)} type="primary">
            Edit
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email address"
              rules={[{ required: true, message: 'Please enter email address' }]}
            >
              <Input onChange={(e) => setEmailAddress(e.target.value)} placeholder="Please enter user name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <Input onChange={(e) => setName(e.target.value)} placeholder="Please enter user name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: 'Please select an gender' }]}
            >
              <Select onChange={(e) => setGender(e)} placeholder="Please select an gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select the status' }]}
            >
              <Select onChange={(e) => setStatus(e)} placeholder="Please select the status">
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default EditUserDrawer;