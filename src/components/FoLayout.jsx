import { Layout, theme } from "antd";
import FoSider from "./FoSider";
import FoFooter from "./FoFooter";
const { Header, Sider, Content } = Layout;
const FoLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider>
        <FoSider />
      </Sider>
      <Layout>
        <Header />
        <Content
          style={{
            margin: "24px 16px 0",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
        <FoFooter />
      </Layout>
    </Layout>
  );
};

export default FoLayout;
