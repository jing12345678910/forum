import React from "react";
import {
  SmileTwoTone,
  LikeTwoTone,
  HeartTwoTone,
  FrownTwoTone,
  MessageOutlined,
} from "@ant-design/icons";
import { Layout, theme, Space, Divider } from "antd";
import "../styles/FoContent.css";
import post from "../mock/post.json";
import member from "../mock/member.json";
// import photo from "../imgs/animation_photo.jpg";
const memberName = member[post[0].author - 1].name;

const FoArticleOverview = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <>
        {post.map((item, index) => (
          <React.Fragment key={index}>
            <p>
              {item.subject} . <SmileTwoTone />
              {memberName} . {item.timestamp}
            </p>
            <h2>{item.title}</h2>
            <div className="article_summary">
              <p>{item["post-content"].overview}</p>
              <img width={100} src={require(`${item["post-content"].photoPath}`)} alt="contentPhoto" />
              {/* <img width={100} src={photo} alt="contentPhoto" /> */}
            </div>
            <div className="respond">
              <Space>
                <LikeTwoTone />
                <p>{item.likes.thumbs}</p>
                <FrownTwoTone twoToneColor="#52c41a" />
                <p>{item.likes["crying-face"]}</p>
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
          </React.Fragment>
        ))}
      </>
    </div>
  );
};

export default FoArticleOverview;
