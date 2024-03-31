import { Layout, theme } from "antd";
import "@/assets/styles/App.css";
import FoSider from "./FoSider";
import FoFooter from "./FoFooter";
import FoHeader from "./FoHeader";
const { Content } = Layout;

const FoLayout = ({ children }) => {
    const {
    token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <FoSider />
            <Layout>
                <FoHeader />
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
