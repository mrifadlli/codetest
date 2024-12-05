import { useState } from "react";
import { Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { getUsers } from "./api";
import InfoCard from "@/components/InfoCard";
import CredentialsModal from "@/components/CredentialsModal";
import UriPath from './utils/uri_path.enum'
import useUserStore from '@/store/users'

export default function Home() {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { setAllUsers, setUsername } = useUserStore()
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name || !token) {
      message.error("Please provide all the required credentials forms!");
      return;
    }

    try {
      const users = await getUsers(token);
      setAllUsers(users);

      localStorage.setItem("name", name);
      localStorage.setItem("token", token);
      setUsername(name)
      message.success("Credentials are valid.");
      router.push(UriPath.DASHBOARD_USERS);
    } catch (error) {
      message.error("Invalid credentials!");
      localStorage.removeItem("name");
      localStorage.removeItem("token");
    }
  };

  return (
    <main className="relative flex justify-center items-center w-full h-screen">
      <div className="absolute left-4 bottom-10">
        <InfoCard token={process.env.NEXT_PUBLIC_TOKEN_ACCESS} />
      </div>

      <div className="space-y-4">
        <h1 className="font-mono text-xl">CodeTest Synapsis</h1>
        <Button
          onClick={() => setOpenModal(true)}
          icon={<UserOutlined />}
          size="large"
        >
          Enter
        </Button>
      </div>

      <CredentialsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        name={name}
        token={token}
        setName={setName}
        setToken={setToken}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
