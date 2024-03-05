import React from "react";
import { Layout, Flex } from "antd";
import CustomHeader from "./components/Header";
import CustomContent from "./components/Content";
import CustomFooter from "./components/Footer";

const { Header, Content, Footer } = Layout;

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "calc(100% - 8px)",
  maxWidth: "calc(100% - 8px)",
};
const App = () => (
  <Flex gap="middle" wrap="wrap">
    <Layout style={layoutStyle}>
      <Header>
        <CustomHeader />
      </Header>
      <Content>
        <CustomContent />
      </Content>
    </Layout>
  </Flex>
);
export default App;
