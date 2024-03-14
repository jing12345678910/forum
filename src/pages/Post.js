import React, { useState, useEffect } from "react";
import { Layout, theme, Divider, Flex, Tag, Space, Button, Input } from "antd";
import {
  SmileTwoTone,
  LikeTwoTone,
  HeartTwoTone,
  FrownTwoTone,
  MessageOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import FoHeader from "../components/FoHeader";
import FoSider from "../components/FoSider";
import FoFooter from "../components/FoFooter";
import book from "../imgs/book.jpg";
import cry from "../imgs/cry.jpg";
import "../styles/Post.css";
const { TextArea } = Input;
const onChange = (e) => {
  console.log("Change:", e.target.value);
};

const { Content, Sider } = Layout;
const Post = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  // navigate(`./post/${id}`);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [value, setValue] = useState("");
  return (
    <Layout>
      <Sider>
        <FoSider />
      </Sider>
      <Layout>
        <FoHeader />
        <div className="post_content">
          <Content
            style={{
              margin: "24px 16px 0",
              flex: 4,
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
              <div className="board">
                <img src={book} width={50} alt="書" />
                <p>考試版</p>
                <p>
                  <a href="#">追蹤</a>
                </p>
              </div>
              <Divider />

              <h1>對年齡好焦慮</h1>
              <div className="board">
                <SmileTwoTone />
                <p>匿名</p>
                <p>2022 年 12 月 29 日 00:35</p>
              </div>
              <p>
                過了25就覺得年齡是個好尷尬的話題🥲不知道有沒有女生懂我
                無法避免自己終有一天會變老妹阿姨
                被這樣叫不是很開心（我不會這樣叫其他比我大的姐姐）對於網友或是非求學生活圈的人
                我都不敢說出我的實際年齡 只敢開玩笑帶過或謊報一個年齡
                常常被問你是大學生嗎都覺得很心虛 本人實際年齡已經要27
                雖然真的被猜中年齡也不會開心 因為ig偶爾會接觸到一些網美
                大部分都比自己年輕漂亮 大家對於問年齡話題有什麼好的應對方式嗎
                或是要怎麼釋懷被比較年齡 以及被叫老妹阿姨之類的狀況
              </p>
              <img src={cry} width={150} alt="" />
              <>
                <Divider orientation="left"></Divider>
                <div className="tags_responses">
                  <Flex
                    gap="4px 0"
                    wrap="wrap"
                    style={{ alignItems: "center" }}
                  >
                    <Tag color="orange">女生</Tag>
                    <Tag color="green">心事</Tag>
                    <Tag color="purple">閒聊</Tag>
                  </Flex>

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
                <div className="respond">
                  <SmileTwoTone />
                  <p>原PO</p>
                </div>
                <p style={{ marginLeft: "3rem" }}>更焦慮</p>
                <div style={{ marginLeft: "1rem" }}>
                  <p className="comment">
                    <span style={{ verticalAlign: "middle" }}>B1-1</span>
                    <span>2022 年 12 月 29 日 01:13</span>
                    <span>回覆</span>
                  </p>
                </div>
                <div className="respond">
                  <>
                    <SmileTwoTone />
                    <p>回覆人的名字</p>
                  </>
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
          </Content>
          <Content
            style={{
              margin: "24px 16px 0",
              flex: 1,
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
              Content
            </div>
          </Content>
        </div>
        <FoFooter />
      </Layout>
    </Layout>
  );
};

export default Post;
