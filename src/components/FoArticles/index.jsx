import { useState, useEffect, Fragment } from "react";
import {
  SmileTwoTone,
  LikeTwoTone,
  HeartTwoTone,
  FrownTwoTone,
  MessageOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { theme, Space, Divider, Button, message } from "antd";
import { homeApi } from "@/api/module/home";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Flex } from "antd";

const FoArticles = ({
  data,
  onDelete,
  onEdit,
  onCollect,
  collect,
  setcollect,
}) => {
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
      {data &&
        data.map((item, index) => (
          <Fragment key={index}>
            <p>
              {t(item.topic)} . <SmileTwoTone />
              {t(item.name)} . {item.timestamp}
            </p>
            <h2>{item.title}</h2>
            <Flex justify="space-between">
              <p>{item.overview}</p>
              <img width={100} src={item.photoPath} alt="contentPhoto" />
            </Flex>
            <Flex>
              <Space className="likes">
                <LikeTwoTone />
                <p>{item.likes && item.likes.thumbs}</p>
                {/* 用布林值的方式 如果是collect icon就換顏色 */}
                <FrownTwoTone twoToneColor="#52c41a" />
                <p>{item.likes && item.likes.cryingFace}</p>
              </Space>

              <Flex>
                <Space>
                  <MessageOutlined />
                  <p>{item.comments && item.comments.length}</p>
                </Space>
              </Flex>
              <Flex>
                <Space>
                  <Button onClick={() => onCollect(item.postID)}>
                    <HeartTwoTone
                      twoToneColor={
                        collect &&
                        collect.some((post) => post.postID === item.postID)
                          ? "#eb2f96"
                          : undefined
                      }
                    />
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
              </Flex>
            </Flex>
            <Divider />
          </Fragment>
        ))}
    </div>
  );
};

export default FoArticles;
