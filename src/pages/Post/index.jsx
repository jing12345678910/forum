import { useState, useEffect } from "react";
import { theme, Divider, Flex, Tag, Space, Button, Input } from "antd";
import {
  SmileTwoTone,
  LikeTwoTone,
  HeartTwoTone,
  FrownTwoTone,
  MessageOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FoLayout from "@/components/FoLayout";
import { homeApi } from "@/api/module/home";
const { TextArea } = Input;

const Post = () => {
  const params = useParams();

  const { id } = params;

  //將colorBgContainer和borderRadiusLG兩個屬性的值從token - theme.useToken()返回的物件解構出來，分別賦值給colorBgContainer和borderRadiusLG兩個變數，以便後續在組件中使用。
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <PostContent
      id={id}
      colorBgContainer={colorBgContainer}
      borderRadiusLG={borderRadiusLG}
    />
  );
};
const PostContent = ({ id, colorBgContainer, borderRadiusLG }) => {
  const { t } = useTranslation();
  const [postData, setPostData] = useState(null);
  const [value, setValue] = useState("");
  const membersDataState = useState([]);

  useEffect(() => {
    const getPostData = async () => {
      try {
        const data = await homeApi.getPostData();
        setPostData(data);
      } catch (error) {}
    };
    getPostData();
  }, [id]);
  //當postData為null時，表示貼文數據尚未加載完成
  if (!postData) {
    return <div>Loading</div>;
  }
  const post = postData.find((item) => item.postID === parseInt(id));
  //當postData已經加載完成，但根據提供的id找不到對應的貼文時，返回"Post not found"，表示未找到貼文。
  if (!post) {
    return <div>Post not found</div>;
  }
  const { title, topic, name, text, photoPath, likes, comments, timestamp } =
    post;

  return (
    <FoLayout>
      <Flex>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Flex>
            {/* <img src={book} width={50} alt="書" /> */}
            <p>{t(topic)}</p>

            <p>
              <a href="#">{t("follow")}</a>
            </p>
          </Flex>
          <Divider />

          <h1>{title}</h1>
          <div className="board">
            <SmileTwoTone />
            <p>{t(name)}</p>
            <p>{timestamp}</p>
          </div>
          <p>{text}</p>
          <img width={100} src={photoPath} alt="contentPhoto" />
          <>
            <Divider orientation="left"></Divider>
            <Flex justify="space-between">
              <Flex gap="4px 0" wrap="wrap" style={{ alignItems: "center" }}>
                <Tag color="orange">女生</Tag>
                <Tag color="green">心事</Tag>
                <Tag color="purple">閒聊</Tag>
              </Flex>
              <Flex>
                <div style={{ marginRight: 10 }}>
                  <LikeTwoTone />
                  <span>{likes.thumbs}</span>
                </div>
                <div style={{ marginRight: 10 }}>
                  <FrownTwoTone twoToneColor="#52c41a" />
                  <span>{likes.cryingFace}</span>
                </div>
                <div style={{ marginRight: 10 }}>
                  <MessageOutlined />
                  <span>{comments.length}</span>
                </div>
                <div>
                  <HeartTwoTone twoToneColor="#eb2f96" />
                  <span>{t("collect")}</span>
                </div>
              </Flex>
            </Flex>
            <Divider orientation="left"></Divider>
            <p>
              {comments.length}
              {t("NumberOfComments")}
            </p>
            <Flex gap="4px 0" wrap="wrap">
              <Tag color="#456dc5">熱門</Tag>
              <Tag color="#cae6f2">由新至舊</Tag>
              <Tag color="#cae6f2">由舊至新</Tag>
            </Flex>
            <Divider />

            {comments.map((comment, index) => (
              <div key={index}>
                <p className="comment">
                  <span style={{ verticalAlign: "middle" }}>
                    B{comment.order}
                  </span>
                  <span>{timestamp}</span>
                  <span>{t("response")}</span>
                </p>
                <p>{comment.university}</p>
                <div className="board"> </div>
                <p className="comment">{comment.content}</p>
                <Button
                  type="link"
                  block
                  style={{ textAlign: "start", color: "GrayText" }}
                >
                  <p>{t("HideComments")}</p>
                </Button>
                <div>
                  <div />
                  <TextArea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={t("response")}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </div>
                <Divider />
              </div>
            ))}
          </>
        </div>
      </Flex>
    </FoLayout>
  );
};

export default Post;
