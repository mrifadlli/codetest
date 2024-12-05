import React, { useState } from "react";
import { UserOutlined, DiffOutlined, LoadingOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Space, Avatar, Button, Spin } from "antd";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import useUserStore from "@/store/users";
import UriPath from "@/pages/utils/uri_path.enum";
import Pages from '@/pages'

const { Content, Footer, Sider } = Layout;

const DashboardLayout: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [isDropdown, setIsDrowpdown] = useState(false)
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const router = useRouter();
  const isAuthenticated = useAuth();
  const { username } = useUserStore();

  const items = [
    { label: "User", key: UriPath.DASHBOARD_USERS, icon: <UserOutlined /> },
    { label: "Post", key: UriPath.DASHBOARD_POSTS, icon: <DiffOutlined /> },
  ];

  const handleMenuClick = (e: { key: string }) => {
    router.push(e.key);
  };

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    router.push(UriPath.PAGE);
  };

  // if (!isAuthenticated)
  //   return (
  //     <div className="glassmorphism-container flex justify-center items-center">
  //       <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: "#4A90E2" }} spin />} />
  //     </div>
  //   );

  return (
    <Layout style={{ minHeight: "100vh", width: "100%", position: "relative" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <h1 onClick={() => router.push(UriPath.PAGE)} className="text-base p-4 text-center cursor-pointer">{collapsed ? "CS" : "CodeTest Synapsis"}</h1>
        <Menu
          onClick={handleMenuClick}
          theme="dark"
          defaultSelectedKeys={[router.pathname]}
          mode="inline"
          items={items}
        />
      </Sider>
      {isDropdown && (
        <div className="absolute border right-4 top-14 z-50">
          <Button size="large" variant="solid" type="primary" color="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
      <Layout>
        <Content style={{ margin: "5px 25px"}}>
          <div className="flex justify-between items-center mb-2">
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              <Breadcrumb.Item>{title}</Breadcrumb.Item>
            </Breadcrumb>

            <div onClick={() => setIsDrowpdown(!isDropdown)} className="cursor-pointer">
              <Space size={5} wrap>
                {username || "root"}
                <Avatar icon={<UserOutlined />} />
              </Space>
            </div>
          </div>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {!isAuthenticated ? (
              <div className="glassmorphism-container">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: "#4A90E2" }} spin />} />
              </div>
            ) : (
              children
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          mrifadlli ©{new Date().getFullYear()} created with happiness
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
