import { Modal } from 'antd';
import React from 'react'

interface DeleteModalProps {
    open: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    data: string;
}

export default function DeleteModal({ open, onCancel, onSubmit, data }: DeleteModalProps) {
    return (
        <Modal
            open={open}
            onCancel={onCancel}
            onOk={onSubmit}
            title={`Delete ${data}`}
        >
            <h1>Are you sure want delete this {data} ?</h1>
        </Modal>
    )
}
