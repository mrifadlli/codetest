import React, { useEffect, useState } from "react";
import { Badge, Button, Input, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Users } from "@/types";
import { PlusOutlined } from '@ant-design/icons';

interface TableUserProps {
    data: Users[];
    onDeleteUser: (user_id: number) => void;
    onViewUser: (user_id: number) => void;
    onEditUser: (user_id: number) => void;
    handleToggleCreateModal: () => void;
}

const TableUser: React.FC<TableUserProps> = ({ data, onDeleteUser, onViewUser, onEditUser, handleToggleCreateModal }) => {
    const [searchText, setSearchText] = useState<string>("");
    const [filteredData, setFilteredData] = useState<Users[]>(data);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handleSearch = (value: string) => {
        setSearchText(value);
        const lowerCaseValue = value.toLowerCase();
        const filtered = data.filter(
            (user) =>
                user.name.toLowerCase().includes(lowerCaseValue) ||
                user.gender.toLowerCase().includes(lowerCaseValue) ||
                user.status.toLowerCase().includes(lowerCaseValue) ||
                String(user.id).toLowerCase().includes(lowerCaseValue)
        );
        setFilteredData(filtered);
    };
    const columns: ColumnsType<Users> = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
            responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Badge
                    status={status === 'active' ? 'success' : 'error'}
                    text={status === 'active' ? 'Active' : 'Inactive'}
                />
            ),
            responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
            title: "Action",
            key: "action",
            width: 75,
            render: (_, user) => (
                <Space size="middle">
                    <Button onClick={() => onViewUser(user.id)} color="primary" variant="filled">View</Button>
                    <Button onClick={() => onEditUser(user.id)} color="default" variant="filled">Edit</Button>
                    <Button onClick={() => onDeleteUser(user.id)} color="danger" variant="filled">
                        Delete
                    </Button>
                </Space>
            ),
            responsive: ['xs', 'sm', 'md', 'lg']
        },
    ];

    return (
        <div>
            <div className="flex justify-between">
                <Button onClick={handleToggleCreateModal} icon={<PlusOutlined />}>
                    Create User
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
            <Table columns={columns} dataSource={filteredData} rowKey="id" scroll={{ x: '100%' }} pagination={{ responsive: true }} />;
        </div>
    )
};

export default TableUser;

