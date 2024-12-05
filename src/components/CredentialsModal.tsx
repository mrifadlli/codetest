import { Modal, Input } from "antd";

interface CredentialsModalProps {
    open: boolean;
    onClose: () => void;
    name: string;
    token: string;
    setName: (value: string) => void;
    setToken: (value: string) => void;
    onSubmit: () => void;
}

export default function CredentialsModal({
    open,
    onClose,
    name,
    token,
    setName,
    setToken,
    onSubmit,
}: CredentialsModalProps) {
    return (
        <Modal
            open={open}
            title="Enter Credentials"
            onCancel={onClose}
            onOk={onSubmit}
        >
            <div className="flex flex-col space-y-3 my-4">
                <Input
                    required
                    variant="outlined"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    required
                    variant="outlined"
                    placeholder="Token GoRest"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />
            </div>
        </Modal>
    )
}
