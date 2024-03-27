import React, { useState, useEffect } from "react";
import {
  SmileTwoTone,
  LikeTwoTone,
  HeartTwoTone,
  FrownTwoTone,
  MessageOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { theme, Space, Divider, Button } from "antd";
import "../styles/FoContent.css";
import { homeApi } from "../api/module/home";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FoArticleOverview = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [postData, setPostData] = useState(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const getPostData = async () => {
      try {
        const data = await homeApi.getPostData();
        console.log(data);
        setPostData(data);
      } catch (error) {
        console.error("獲取貼文資料錯誤", error);
      }
    };
    getPostData();
  }, []);

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
        {postData &&
          postData.map((item, index) => (
            <React.Fragment key={index}>
              <p>
                {t(item.topic)} . <SmileTwoTone />
                {t(item.name)} . {item.timestamp}
              </p>
              <h2>{item.title}</h2>
              <div className="article_summary">
                <p>{item.postContent.overview}</p>
                <img
                  width={100}
                  src={item.postContent.photoPath}
                  alt="contentPhoto"
                />
              </div>
              <div className="respond">
                <Space className="likes">
                  <LikeTwoTone />
                  <p>{item.likes.thumbs}</p>
                  <FrownTwoTone twoToneColor="#52c41a" />
                  <p>{item.likes.cryingFace}</p>
                </Space>

                <Space className="comment">
                  <MessageOutlined />
                  <p>{item.comments.length}</p>
                </Space>

                <Space className="button_collect">
                  <HeartTwoTone twoToneColor="#eb2f96" />
                  <p>{t("collect")}</p>

                  <Button
                    type="primary"
                    icon={<PoweroffOutlined />}
                    onClick={() => navigate(`/post/${item.postID}`)}
                    style={{marginLeft:'3rem'}}
                  >
                    {t("clickMe")}
                  </Button>
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
