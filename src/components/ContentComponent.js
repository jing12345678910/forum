import React from "react";
import {
  SmileTwoTone,
  LikeTwoTone,
  HeartTwoTone,
  FrownTwoTone,
  MessageOutlined,
} from "@ant-design/icons";
import { Layout, theme, Space, Divider } from "antd";

import animation_photo from "../imgs/animation_photo.jpg";
import ContentPhoto from "../imgs/animation_photo.jpg";
import "../styles/App.css";
import post from "../mock/post.json";
import member from "../mock/member.json";

// import ContentPhoto from "./imgs/post-content-photo1.jpg";
// const ContentPhoto = "./imgs/post-content-photo1.jpg";
// const ContentPhoto = `${post[0]["post-content"][2]["photo"]}`;
// const ContentPhoto = require(`${post[0]["post-content"][2]["photo"]}`);

const { Content } = Layout;

const memberName = member[post[0].author - 1].name;

const ContentComponent = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Layout>
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
      </Layout>
    </Layout>
  );
};
export default ContentComponent;
