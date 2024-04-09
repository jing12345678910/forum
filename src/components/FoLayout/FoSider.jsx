import {
  FireFilled,
  FileTextFilled,
  BulbFilled,
  SketchOutlined,
  HeartOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Divider } from "antd";
import FoTopicIcons from "../FoTopicIcons";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

const FoSider = ({ onTopicSelect }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";

  // 如果在 Profile 頁面，渲染新的菜單項目，否則渲染舊的項目
  const customItems = isProfilePage
    ? [
        { key: "4", icon: <SketchOutlined />, label: t("Following Topics") },
        { key: "5", icon: <HeartOutlined />, label: t("collection") },
        { key: "6", icon: <IdcardOutlined />, label: t("myArticle") },
      ]
    : [
        { key: "1", icon: <FireFilled />, label: t("hot") },
        { key: "2", icon: <FileTextFilled />, label: t("all") },
        { key: "3", icon: <BulbFilled />, label: t("creatorRanking") },
      ];

  const categories = isProfilePage
    ? []
    : FoTopicIcons().map((topic) => ({
        //用主題名稱當作key
        key: topic.key,
        icon: topic.icon,
        label: topic.topicName,
      }));
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {}}
      onCollapse={(collapsed, type) => {}}
    >
      <div className="demo-logo-vertical" />
      <Menu theme="dark" mode="inline" items={customItems} />
      <Divider />
      {/* 用key作為獲取點擊的主題名稱 */}
      <Menu
        theme="dark"
        mode="inline"
        items={categories}
        onClick={(topic) => {
          onTopicSelect(topic.key);
        }}
        selectedKeys={[location.pathname]}
      />
    </Sider>
  );
};
export default FoSider;
