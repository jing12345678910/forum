import React from "react";
import { Layout } from "antd";
import "../styles/Header.css";

const { Header } = Layout;

const CustomHeader = () => {
  return (
    <Header style={headerStyle}>
      <div className="header-container">
        <div className="logo">Logo</div>
        <div className="header-content-right">
          <div className="search">search</div>
          <div className="notify">notify</div>
          <div className="member">member</div>
        </div>
      </div>
    </Header>
  );
};

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
  border: "5px solid red",
};

export default CustomHeader;
