import { Input, Modal, Select, Switch } from 'antd'
import React from 'react'

interface CreatePropsModalProps {
  open: boolean;
  title: string;
  body: string;
  setTitle: (value: string) => void;
  setBody: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const { TextArea } = Input;

export default function CreatePostModal({ open, title, setTitle, body, setBody, onClose, onSubmit }: CreatePropsModalProps) {
  return (
    <Modal
      open={open}
      title="Create post"
      onCancel={onClose}
      onOk={onSubmit}
    >
      <div className='flex flex-col space-y-3 my-4'>
        <Input
          required
          variant="outlined"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          rows={10}
          required
          placeholder='Content (Body)'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
    </Modal>
  )
}
