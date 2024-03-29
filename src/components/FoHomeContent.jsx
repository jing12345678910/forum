import { Layout, theme } from "antd";
import "../styles/FoContent.css";
import FoArticleOverview from "./FoArticleOverview";

const { Content } = Layout;
const FoHomeContent = ({ postData ,onDelete,onEdit,onCollect}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Layout>
        <Content
          style={{
            margin: "24px 16px 0",
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
            <>
              <FoArticleOverview data={postData} onDelete={onDelete} onEdit={onEdit} onCollect={onCollect}/>
            </>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default FoHomeContent;