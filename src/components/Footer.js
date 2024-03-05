import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const CustomFooter = () => {
  return <Footer style={footerStyle}>Footer</Footer>;
};

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
  border: "5px solid purple",
};

export default CustomFooter;
