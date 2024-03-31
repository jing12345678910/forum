import { FireFilled, FileTextFilled, BulbFilled } from "@ant-design/icons";
import { Layout, Menu, Divider } from "antd";
import FoTopicIcons from "../FoTopicIcons";
import { useTranslation } from "react-i18next";

const { Sider } = Layout;

const FoSider = ({ onTopicSelect }) => {
  const { t } = useTranslation();
  const customItems = [
    { key: "1", icon: <FireFilled />, label: t("hot") },
    { key: "2", icon: <FileTextFilled />, label: t("all") },
    { key: "3", icon: <BulbFilled />, label: t("creatorRanking") },
  ];
  const categories = FoTopicIcons().map((topic) => ({
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
      />
    </Sider>
  );
};
export default FoSider;
