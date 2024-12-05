import React, { useEffect } from 'react';
import { Button, Col, Drawer, Form, Input, message, Row, Select, Space } from 'antd';
import { viewPost } from '@/pages/api';
import { UpdatePost } from '@/types';
import usePostStore from '@/store/posts';


// const { Option } = Select;
const { TextArea } = Input;

interface EditPostDrawerProps {
    open: boolean;
    onClose: () => void;
    onSumbit: (post_data: UpdatePost, post_id: number) => void;
}

const EditPostDrawer: React.FC<EditPostDrawerProps> = ({ open, onClose, onSumbit }) => {
    const { setId, id, setPost, title, setTitle, body, setBody, user_id, setUserId } = usePostStore()
    const [form] = Form.useForm();
    const fetchUserDetail = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Invalid credentials!");
            }
            const data = await viewPost(token, id);
            setPost(data);
            setTitle(data.title)
            setBody(data.body)
            setUserId(data.user_id)
            setId(data.id)
            form.setFieldsValue({
                title: data.title,
                body: data.body,
            });
        } catch (error: any) {
            message.error(error.message || 'Failed to fetch user details');
        }
    };

    useEffect(() => {
        if (open && id) {
            fetchUserDetail();
        }
    }, [open, id]);

    return (
        <Drawer
            title="Edit post"
            width={500}
            onClose={onClose}
            open={open}
            styles={{
                body: {
                    paddingBottom: 80,
                },
            }}
            extra={
                <Space>
                    <Button size='middle' onClick={onClose}>Cancel</Button>
                    <Button size='middle' onClick={() => onSumbit({ id, user_id, title, body }, id)} type="primary">
                        Edit
                    </Button>
                </Space >
            }
        >
            <Form layout="vertical" form={form}>
                <Form.Item
                    name="title"
                    label="Title post"
                    rules={[{ required: true, message: 'Please enter title post' }]}
                >
                    <Input placeholder="Please enter title post" onChange={(e) => setTitle(e.target.value)} />
                </Form.Item>
                <Form.Item
                    name="body"
                    label="Body post"
                    rules={[{ required: true, message: 'Please enter body post' }]}
                >
                    <TextArea
                        rows={10}
                        placeholder="Please enter body post"
                        onChange={(e) => setBody(e.target.value)}
                    />
                </Form.Item>
            </Form>
        </Drawer >
    );
};

export default EditPostDrawer;