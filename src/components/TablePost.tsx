import React, { useEffect, useState } from "react";
import { Button, Input, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { Posts } from "@/types";
import { PlusOutlined } from '@ant-design/icons';

interface TabelPostProps {
    data: Posts[];
    onDeletePost: (post_id: number) => void;
    onViewPost: (post_id: number) => void;
    handleToggleCreateModal: () => void;
    handleToggleEditDrawer: (post_id: number) => void;
}

const TableUser: React.FC<TabelPostProps> = ({ data, onDeletePost, onViewPost, handleToggleCreateModal, handleToggleEditDrawer }) => {
    const [searchText, setSearchText] = useState<string>("");
    const [filteredData, setFilteredData] = useState<Posts[]>(data);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handleSearch = (value: string) => {
        setSearchText(value);
        const lowerCaseValue = value.toLowerCase();
        const filtered = data.filter(
            (post) =>
                post.title.toLowerCase().includes(lowerCaseValue) ||
                post.body.toLowerCase().includes(lowerCaseValue) ||
                String(post.id).toLowerCase().includes(lowerCaseValue) ||
                String(post.user_id).toLowerCase().includes(lowerCaseValue)
        );
        setFilteredData(filtered);
    };

    const columns: ColumnsType<Posts> = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            width: 300,
            responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
            title: "User Id",
            dataIndex: "user_id",
            key: "user_id",
            width: 300,
            responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            width: 700,
            responsive: ['xs', 'sm', 'md', 'lg'],
        },
        // {
        //     title: "Body",
        //     dataIndex: "body",
        //     key: "body",
        //     responsive: ['xs', 'sm', 'md', 'lg'],
        // },
        {
            title: 'Action',
            key: 'action',
            width: 200,
            responsive: ['xs', 'sm', 'md', 'lg'],
            render: (_, post) => (
                <Space size="middle">
                    <Button onClick={() => onViewPost(post.id)} variant="filled" color="primary">View</Button>
                    <Button onClick={() => handleToggleEditDrawer(post.id)} variant="filled" color="default">Edit</Button>
                    <Button onClick={() => onDeletePost(post.id)} variant="filled" color="danger">Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between">
                <Button onClick={handleToggleCreateModal} icon={<PlusOutlined />}>
                    Create Post
                </Button>
                <Input.Search
                    placeholder="Search by name, gender, or status"
                    allowClear
                    onSearch={handleSearch}
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchText}
                    style={{ marginBottom: 16, width: 300 }}
                />
            </div>

            <Table columns={columns} dataSource={filteredData} rowKey="id" scroll={{ x: '100%' }}
                pagination={{ responsive: true }} />
        </div>
    )
}


export default TableUser;
