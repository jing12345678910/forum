import React from "react";
import { RiseOutlined } from "@ant-design/icons";
import { Layout, Menu, Divider } from "antd";

import "../styles/App.css";

const { Sider } = Layout;

const customItems = [
  { key: "1", icon: <RiseOutlined />, label: "即時熱門看板" },
  { key: "2", icon: <RiseOutlined />, label: "所有看板" },
  { key: "3", icon: <RiseOutlined />, label: "創作者排行榜" },
];
const categories = [
  { key: "1", icon: <RiseOutlined />, label: "股票版" },
  { key: "2", icon: <RiseOutlined />, label: "股票版" },
  { key: "3", icon: <RiseOutlined />, label: "股票版" },
];

const SiderComponent = () => {
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={customItems}
        />
        <Divider />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={categories}
        />
      </Sider>
      
    </Layout>
  );
};
export default SiderComponent;
