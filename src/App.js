import React, { useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AudioOutlined,
  DownloadOutlined,
  SmileTwoTone,
  LikeTwoTone,
  HeartTwoTone,
  FrownTwoTone,
  MessageOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  theme,
  Input,
  Space,
  Button,
  Divider,
  Flex,
  Radio,
} from "antd";
import logo from "./imgs/logo.jpg";
import animation_photo from "./imgs/animation_photo.jpg";
import "./App.css";
import post from "./mock/post.json";
import member from "./mock/member.json";

// import ContentPhoto from "./imgs/post-content-photo1.jpg";
// const ContentPhoto = "./imgs/post-content-photo1.jpg";
// const ContentPhoto = `${post[0]["post-content"][2]["photo"]}`;
const ContentPhoto = require(`${post[0]["post-content"][2]["photo"]}`);


const { Header, Content, Footer, Sider } = Layout;
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));
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
const memberName = member[post[0].author - 1].name;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [size, setSize] = useState("large"); // default is 'middle'
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
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="header_container">
            <div className="header_left">
              <img src={logo} alt="logo" />
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
                  <Button size={size}>註冊/登入</Button>
                  <Button type="primary" size={size}>
                    下載App
                  </Button>
                </Flex>
              </Flex>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <>
              <p>
                {post[0].subject} . <SmileTwoTone />
                {memberName} . {post[0].timestamp}
              </p>
              <h2>{post[0].title}</h2>
              <div className="article_summary">
                <p>{post[0]["post-content"][0]["overview"]}</p>

                <img src={ContentPhoto} alt="contentPhoto" />
              </div>
              <div className="respond">
                <Space>
                  <LikeTwoTone />
                  <p>{post[0]["likes"][0]["thumbs"]}</p>
                  <FrownTwoTone twoToneColor="#52c41a" />
                  <p>{post[0]["likes"][1]["crying-face"]}</p>
                </Space>

                <Space className="comment">
                  <MessageOutlined />
                  <p>{post[0]["comments"].length}</p>
                </Space>

                <Space className="button_collect">
                  <HeartTwoTone twoToneColor="#eb2f96" />
                  <p>收藏</p>
                </Space>
              </div>
              <Divider />
              <p>
                動漫版 . <SmileTwoTone />
                小美 . 17小時
              </p>
              <h2>澀谷街頭驚見五條悟、七海建人？</h2>
              <div className="article_summary">
                <p>
                  本來在路上遇到高大的人就會特別注意到對方了
                  何況是相當有名的五條悟跟娜娜明呢？
                </p>
                <img src={animation_photo} alt="logo" />
              </div>
              <div className="respond">
                <Space>
                  <LikeTwoTone />
                  <p>542</p>
                  <FrownTwoTone twoToneColor="#52c41a" />
                  <p>197</p>
                </Space>

                <Space className="comment">
                  <MessageOutlined />
                  <p>86</p>
                </Space>

                <Space className="button_collect">
                  <HeartTwoTone twoToneColor="#eb2f96" />
                  <p>收藏</p>
                </Space>
              </div>
              <Divider />
              <p>
                動漫版 . <SmileTwoTone />
                小美 . 17小時
              </p>
              <h2>澀谷街頭驚見五條悟、七海建人？</h2>
              <div className="article_summary">
                <p>
                  本來在路上遇到高大的人就會特別注意到對方了
                  何況是相當有名的五條悟跟娜娜明呢？
                </p>
                <img src={animation_photo} alt="logo" />
              </div>
              <div className="respond">
                <Space>
                  <LikeTwoTone />
                  <p>542</p>
                  <FrownTwoTone twoToneColor="#52c41a" />
                  <p>197</p>
                </Space>

                <Space className="comment">
                  <MessageOutlined />
                  <p>86</p>
                </Space>

                <Space className="button_collect">
                  <HeartTwoTone twoToneColor="#eb2f96" />
                  <p>收藏</p>
                </Space>
              </div>
            </>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          <p>
            上大學、出社會的你，快加入討論專屬年輕人的流行話題！
            完成身份驗證即可發文、留言與抽卡認識新朋友
          </p>
          ©{new Date().getFullYear()} Created by Anna Lai
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
