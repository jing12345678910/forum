import React, { useState } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Layout, theme, Input, Space, Button, Flex } from "antd";
import logo from "../imgs/logo.jpg";
import { Link ,useNavigate} from "react-router-dom";

import "../styles/FoHeader.css";

const { Header } = Layout;

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);

const FoHeader = ({ isLoginPage }) => {
  const navigate=useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [size] = useState("large"); // default is 'middle'
  return (
    <Layout>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      >
        <div className="header_container">
          <div className="header_left">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>

            <Space direction="vertical">
              <Search
                placeholder="搜什麼主題?"
                onSearch={onSearch}
                enterButton
                size="large"
                suffix={suffix}
              />
            </Space>
          </div>
          <div className="header_right">
            <Flex gap="small" align="flex-start" vertical>
              <Flex gap="small" wrap="wrap">
                {isLoginPage ? (
                  <Button size={size} onClick={() => navigate("/signup")}>
                    註冊
                  </Button>
                ) : (
                  <Button size={size} onClick={() => navigate("/login")}>
                    登入
                  </Button>
                )}

                <Button type="primary" size={size}>
                  下載App
                </Button>
              </Flex>
            </Flex>
          </div>
        </div>
      </Header>
    </Layout>
  );
};
export default FoHeader;
