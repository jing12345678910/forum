import React from "react";
import {} from "@ant-design/icons";
import { Layout } from "antd";

import "../styles/App.css";

const { Footer } = Layout;

const FoFooter = () => {
  return (
    <Footer
      style={{
        textAlign: "center",

        width: "100%",
      }}
    >
      <p>
        上大學、出社會的你，快加入討論專屬年輕人的流行話題！
        完成身份驗證即可發文、留言與抽卡認識新朋友
      </p>
      ©{new Date().getFullYear()} Created by Anna Lai
    </Footer>
  );
};
export default FoFooter;
