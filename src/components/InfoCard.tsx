import { Button, Card, message } from "antd";
import { InfoCircleOutlined, CopyOutlined } from "@ant-design/icons";

const { Meta } = Card;

interface InfoCardProps {
    token: string | undefined;
}

export default function InfoCard({ token }: InfoCardProps) {
    const handleCopy = () => {
        if (!token) {
            message.error("Token is missing!");
            return;
        }
        navigator.clipboard.writeText(token);
        message.success("Token copied to clipboard!");
    };

    return (
        <Card className="w-[240px]">
            <Meta
                title={
                    <div className="flex items-center space-x-1.5">
                        <InfoCircleOutlined />
                        <h1>Use this token</h1>
                    </div>
                }
                description={token || "No token available"}
            />
            <Button
                onClick={handleCopy}
                className="mt-4"
                icon={<CopyOutlined />}
            >
                Copy
            </Button>
        </Card>
    );
};
