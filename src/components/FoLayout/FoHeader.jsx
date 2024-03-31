import { useState, useEffect } from "react";
import {
  Layout,
  theme,
  Input,
  Space,
  Button,
  Flex,
  Dropdown,
  message,
  QRCode,
  Popover,
  Image,
  Tooltip,
} from "antd";
import logo from "@/assets/images/srcImages/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import {
  GlobalOutlined,
  SunOutlined,
  MoonOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useAppStore } from "@/store/AppStore"; // 1
import { setPost, getPost, getTheme, setTheme } from "@/utils/localStorage";
import { homeApi } from "@/api/module/home";

import i18n from "@/i18n";

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
    label: (
      <Button onClick={() => i18n.changeLanguage("en_US")}>English</Button>
    ),
  },
];

const FoHeader = ({ isLoginPage, SearchPost, searchValue, setSearchValue }) => {
  const addPost = (newData) => {
    //1.獲取數據
    const data = getPost();
    //2.定義新增數據
    const post = {
      postID: Math.round(Math.random() * 100),
      topic: "exam",
      title: "必讀章節",
      overview: "讀書戰士們加油",
      text: "好想上榜～～～ 讀書戰士們加油",
      photoPath: "images/book.jpg",
      name: "anna",
      likes: {
        thumbs: 0,
        cryingFace: 0,
        heart: 0,
      },
      creatAt: 1711181251,
      comments: [],
    };
    const newPosts = [...data, post];
    //3.存進數據庫=>更新資料
    setPost(newPosts);
  };
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [size] = useState("large"); // default is 'middle'
  const { t } = useTranslation();
  const [postData, setPostData] = useState(null);
  const appStore = useAppStore();
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

  useEffect(() => {
    const getPostData = async () => {
      try {
        const data = await homeApi.getPostData();
        setPostData(data);
      } catch (error) {}
    };
    const currentTheme = getTheme(); // 預設 light
    getPostData();
    setBodyThemeClass(currentTheme);
  }, []);
  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        style={{ padding: "0 10px" }}
      >
        <Flex gap="small" wrap="wrap" align="center">
          <Link to="/">
            <Image src={logo} alt="logo" />
          </Link>

          <Space>
            <Input
              placeholder={t("search topic")}
              value={searchValue}
              size="large"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Flex wrap="wrap" gap="small">
              <Tooltip title="search">
                <Button
                  type="dashed"
                  shape="circle"
                  icon={<SearchOutlined />}
                  onClick={() => SearchPost(searchValue)}
                />
              </Tooltip>
            </Flex>
          </Space>
        </Flex>

        <Flex gap="small" wrap="wrap" align="center">
          <Button size={size} onClick={() => navigate("/addpost")}>
            {t("addNewPost")}
          </Button>
          {isLoginPage ? (
            <Button size={size} onClick={() => navigate("/signup")}>
              {t("signup")}
            </Button>
          ) : (
            <Button size={size} onClick={() => navigate("/login")}>
              {t("login")}
            </Button>
          )}
          <Popover
            overlayInnerStyle={{
              padding: 0,
            }}
            content={<QRCode value="https://ant.design" bordered={false} />}
          >
            <Button type="primary" size={size}>
              {t("download")}
            </Button>
          </Popover>
          <Dropdown menu={{ items }}>
            <Button size={size} onClick={(e) => e.preventDefault()}>
              <GlobalOutlined />
            </Button>
          </Dropdown>
          <Button type="primary" size={size} onClick={toggleTheme}>
            {isLightMode ? <SunOutlined /> : <MoonOutlined />}
          </Button>
        </Flex>
      </Flex>
    </Header>
  );
};
export default FoHeader;
