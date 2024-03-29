import { useState, useEffect, Fragment } from "react";
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

const FoArticleOverview = ({ data, onDelete, onEdit, onCollect }) => {
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
        setPostData(data);
      } catch (error) {}
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
        {data &&
          data.map((item, index) => (
            <Fragment key={index}>
              <p>
                {t(item.topic)} . <SmileTwoTone />
                {t(item.name)} . {item.timestamp}
              </p>
              <h2>{item.title}</h2>
              <div className="article_summary">
                <p>{item.overview}</p>
                <img width={100} src={item.photoPath} alt="contentPhoto" />
              </div>
              <div className="respond">
                <Space className="likes">
                  <LikeTwoTone />
                  <p>{item.likes && item.likes.thumbs}</p>
                  <FrownTwoTone twoToneColor="#52c41a" />
                  <p>{item.likes && item.likes.cryingFace}</p>
                </Space>

                <Space className="comment">
                  <MessageOutlined />
                  <p>{item.comments && item.comments.length}</p>
                </Space>

                <Space className="button_collect">
                  <Button onClick={() => onCollect(item.postID)}>
                    <HeartTwoTone twoToneColor="#eb2f96" />
                  </Button>
                  <p>{t("collect")}</p>

                  <Button
                    type="primary"
                    icon={<PoweroffOutlined />}
                    onClick={() => navigate(`/post/${item.postID}`)}
                    style={{ marginLeft: "3rem" }}
                  >
                    {t("clickMe")}
                  </Button>
                  <Button onClick={() => onDelete(item.postID)}>
                    {t("delete")}
                  </Button>
                  <Button onClick={() => onEdit(item.postID)}>
                    {t("edit")}
                  </Button>
                </Space>
              </div>
              <Divider />
            </Fragment>
          ))}
      </>
    </div>
  );
};

export default FoArticleOverview;
