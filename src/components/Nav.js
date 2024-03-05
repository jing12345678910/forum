import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
const items = [
  {
    label: "Feed",
    key: "Feed",
  },
  {
    label: "Following",
    key: "Following",
  },
  {
    label: "College Life",
    key: "College Life",
  },
  {
    label: "Relationships",
    key: "Relationships",
  },
];
const App = () => {
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
export default App;
