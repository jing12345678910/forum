import React from "react";
import { Layout, Input } from "antd";
import "../styles/Content.css";
import mainPicture from "../imgs/main-picture.jpg";
import Nav from "./Nav"
import BriefArticle from "./BriefArticle"

const { Content } = Layout;

const CustomContent = () => {
  return (
    <Content style={contentStyle}>
      <div className="upper-part">
        <div className="img-container">
          <img src={mainPicture} alt="mainPicture" />
          <div className="overlay-content">
            <h2>
              Share your stories, ask questions, and get help from other teens
            </h2>
            <input type="text" placeholder="What's on your mind?" />
          </div>
        </div>
      </div>
      <div className="lower-part">
        <Nav />
        <BriefArticle />
        <BriefArticle />
        <BriefArticle />
      </div>
    </Content>
  );
};

const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#4096ff",
  border: "5px solid green",
};

export default CustomContent;
