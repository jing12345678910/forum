import { useState, useEffect } from "react";
import { theme, Divider, Flex, Tag, Space, Button, Input } from "antd";
import {
  SmileTwoTone,
  LikeTwoTone,
  HeartTwoTone,
  FrownTwoTone,
  MessageOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
// import book from "../imgs/book.jpg";
// import cry from "../imgs/cry.jpg";
import { useTranslation } from "react-i18next";
import FoLayout from "@/components/FoLayout";

import { homeApi } from "@/api/module/home";
const { TextArea } = Input;

const Post = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { id } = params;
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
  if (!postData) {
    return <div>Loading</div>;
  }

  const post = postData.find((item) => item.postID === parseInt(id));
  if (!post) {
    return <div>Post not found</div>;
  }
  const { title, topic, name, text } = post;

  // navigate(`./post/${id}`);

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
            <p>2022 年 12 月 29 日 00:35</p>
          </div>
          <p>{text}</p>
          {/* <img src={cry} width={150} alt="" /> */}
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
                  <span>542</span>
                </div>
                <div style={{ marginRight: 10 }}>
                  <FrownTwoTone twoToneColor="#52c41a" />
                  <span>197</span>
                </div>
                <div style={{ marginRight: 10 }}>
                  <MessageOutlined />
                  <span>86</span>
                </div>
                <div>
                  <HeartTwoTone twoToneColor="#eb2f96" />
                  <span>收藏</span>
                </div>
              </Flex>
            </Flex>
            <Divider orientation="left"></Divider>
            <p>共 47 則留言</p>
            <Flex gap="4px 0" wrap="wrap">
              <Tag color="#456dc5">熱門</Tag>
              <Tag color="#cae6f2">由新至舊</Tag>
              <Tag color="#cae6f2">由舊至新</Tag>
            </Flex>
            <Divider />
            <div className="board">
              <SmileTwoTone />
              <p>嘉南藥理大學</p>
            </div>
            <p className="comment">等你到30就不會了</p>
            <p className="comment">
              <span style={{ verticalAlign: "middle" }}>B1</span>
              <span>2022 年 12 月 29 日 01:13</span>
              <span>回覆</span>
            </p>
            <Button
              type="link"
              block
              style={{ textAlign: "start", color: "GrayText" }}
            >
              <p style={{ marginLeft: "1rem" }}>隱藏留言</p>
            </Button>
            <div className="responds">
              <SmileTwoTone />
              <p>原PO</p>
            </div>
            <p style={{ marginLeft: "2rem" }}>更焦慮</p>
            <div>
              <p className="comment">
                <span style={{ verticalAlign: "middle" }}>B1-1</span>
                <span>2022 年 12 月 29 日 01:13</span>
                <span>回覆</span>
              </p>
            </div>
            <div className="responds">
              <SmileTwoTone />
              <p>回覆人的名字</p>
            </div>
            <div style={{ marginLeft: "3rem" }}>
              <div style={{ margin: "24px 0" }} />
              <TextArea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="回覆..."
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </div>
          </>
          <Divider />
        </div>
      </Flex>
    </FoLayout>
  );
};

export default Post;