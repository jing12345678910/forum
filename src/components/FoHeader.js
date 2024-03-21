import React, { useState, useEffect } from "react";
import {
  Layout,
  theme,
  Input,
  Space,
  Button,
  Flex,
  Dropdown,
  message,
} from "antd";
import logo from "../srcImages/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { GlobalOutlined, SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useAppStore } from "../store/AppStore"; // 1
import { getTheme, setTheme } from "../utils/localStorage";
import "../mock/post.json";

import i18n from "../i18n";

import "../styles/FoHeader.css";
import posts from "../mock/post.json";

const { Header } = Layout;

const items = [
  {
    key: "zh_TW",
    label: (
      <Button onClick={() => i18n.changeLanguage("zh_TW")}>繁體中文</Button>
    ),
  },
  {
    key: "en_US",
    danger: true,
    label: (
      <Button onClick={() => i18n.changeLanguage("en_US")}>English</Button>
    ),
  },
];

const FoHeader = ({ isLoginPage }) => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [size] = useState("large"); // default is 'middle'
  const [searchValue, setSearchValue] = useState("");
  const { t } = useTranslation();
  const appStore = useAppStore();
  const [messageApi, contextHolder] = message.useMessage();
  const { isLightMode, setIsLightMode } = appStore;

  const setBodyThemeClass = (theme) => {
    const body = document.body;
    body.className = "";
    body.classList.toggle(theme);
  };
  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    setTheme(!isLightMode ? "light" : "dark"); // localStorage => 'dark'
    setBodyThemeClass(getTheme("theme")); // 'dark'
  };
  const onSearch = (e) => {
    setSearchValue(e.target.value);
    const keyword = e.target.value.trim();
    const filterPost = posts.filter((post) => post.title.includes(keyword));
    console.log(filterPost);
  };

  useEffect(() => {
    const currentTheme = getTheme(); // 預設 light
    setBodyThemeClass(currentTheme);
  }, []);
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
              <Input
                placeholder={t("search topic")}
                value={searchValue}
                onChange={onSearch}
                size="large"
              />
            </Space>
          </div>
          <div className="header_right">
            <Flex gap="small" align="flex-start" vertical>
              <Flex gap="small" wrap="wrap">
                {isLoginPage ? (
                  <Button size={size} onClick={() => navigate("/signup")}>
                    {t("signup")}
                  </Button>
                ) : (
                  <Button size={size} onClick={() => navigate("/login")}>
                    {t("login")}
                  </Button>
                )}
                <Button type="primary" size={size}>
                  {t("download")}
                </Button>
                <Dropdown menu={{ items }}>
                  <Button onClick={(e) => e.preventDefault()}>
                    <GlobalOutlined />
                  </Button>
                </Dropdown>
                <Button type="primary" size={size} onClick={toggleTheme}>
                  {isLightMode ? <SunOutlined /> : <MoonOutlined />}
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
