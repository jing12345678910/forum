import React from "react";
import { FireFilled, FileTextFilled, BulbFilled } from "@ant-design/icons";
import { Layout, Menu, Divider } from "antd";


import FoTopicIcons from "./FoTopicIcons";

import "../styles/App.css";
import { useTranslation } from "react-i18next";

const { Sider } = Layout;



const FoSider = () => {
  const { t } = useTranslation();
  const customItems = [
    { key: "1", icon: <FireFilled />, label: t("hot") },
    { key: "2", icon: <FileTextFilled />, label: t("all") },
    { key: "3", icon: <BulbFilled />, label: t("creatorRanking") },
  ];
  const categories = FoTopicIcons().map((topic) => ({
    icon: topic.icon,
    label: topic.topicName,
  }));
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
        <Menu theme="dark" mode="inline" items={customItems} />
        <Divider />
        <Menu theme="dark" mode="inline" items={categories} />
      </Sider>
    </Layout>
  );
};
export default FoSider;
