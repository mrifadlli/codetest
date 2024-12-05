import { Input, Modal, Select, Switch } from 'antd'
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import React from 'react'

interface CreateUserModalProps {
  open: boolean;
  name: string;
  setName: (value: string) => void;
  email_address: string;
  setEmailAddress: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
  handleSwitchStatusUser: (value: boolean) => void
}

export default function CreateUserModal({ open, name, setName, email_address, setEmailAddress, gender, setGender, onClose, onSubmit, handleSwitchStatusUser }: CreateUserModalProps) {
  return (
    <Modal
      open={open}
      title="Create user"
      onCancel={onClose}
      onOk={onSubmit}
    >
      <div className='flex flex-col space-y-3 my-4'>
        <Input
          required
          variant="outlined"
          placeholder="Email address"
          value={email_address}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        <Input
          required
          variant="outlined"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Select
          allowClear
          onChange={(e) => setGender(e)}
          options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]}
          placeholder="Gender"
        />
        <div className='space-y-1'>
          <p className='text-neutral-700'>{'Status user'}</p>
          <Switch
            defaultChecked
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={handleSwitchStatusUser}
          />
        </div>
      </div>
    </Modal>
  )
}
