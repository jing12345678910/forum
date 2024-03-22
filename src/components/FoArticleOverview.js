import React from "react";
import {
  SmileTwoTone,
  LikeTwoTone,
  HeartTwoTone,
  FrownTwoTone,
  MessageOutlined,
} from "@ant-design/icons";
import { theme, Space, Divider } from "antd";
import "../styles/FoContent.css";
import post from "../mock/post.json";
import members from "../mock/members.json";
import topics from "../mock/topics.json";
import { useTranslation } from "react-i18next";

const FoArticleOverview = () => {
  const { t } = useTranslation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const topicMap = {};
  topics.forEach((topic) => {
    topicMap[topic["topic-id"]] = topic["topic-name"];
  });

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
              {t(topicMap[item["topic-id"]])} . <SmileTwoTone />
              {t(members[item.author - 1].name)} . {item.timestamp}
            </p>
            <h2>{item.title}</h2>
            <div className="article_summary">
              <p>{item["post-content"].overview}</p>
              <img
                width={100}
                src={item["post-content"].photoPath}
                alt="contentPhoto"
              />
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
                <p>{item.length}</p>
              </Space>

              <Space className="button_collect">
                <HeartTwoTone twoToneColor="#eb2f96" />
                <p>{t("collect")}</p>
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
