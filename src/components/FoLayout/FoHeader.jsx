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
import { useAppStore } from "@/store/AppStore"; 
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
    //1.獲取原數據
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

  //解構 - 從theme.useToken()返回的結果中 提取 token 屬性，再從 token 屬性中提取 colorBgContainer 屬性，並將其賦值給一個名為colorBgContainer的變數。
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [size] = useState("large"); // default is 'middle'
  const { t } = useTranslation();
  const [postData, setPostData] = useState(null);
  const appStore = useAppStore();

  //用zustand管理全局的變更主題狀態
  const { isLightMode, setIsLightMode } = appStore;

  //狀態改變 class改變
  const setBodyThemeClass = (theme) => {
    const body = document.body;
    body.className = "";
    body.classList.toggle(theme);
  };

  const toggleTheme = () => {
    //切換 isLightMode 狀態的值
    setIsLightMode(!isLightMode);
    //如果 isLightMode 的值為 true，即當前是明亮模式，則將主題設置為 "dark"，否則設置為 "light"
    setTheme(!isLightMode ? "light" : "dark"); // localStorage => 'dark'
    setBodyThemeClass(getTheme("theme")); 
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
