import React from "react";
import {} from "@ant-design/icons";
import { Layout } from "antd";
import { useTranslation } from "react-i18next";
import "../styles/App.css";

const { Footer } = Layout;

const FoFooter = () => {
  const { t } = useTranslation();
  return (
    <Footer
      style={{
        textAlign: "center",

        width: "100%",
      }}
    >
      <p>{t("footer line 1")}</p>
      <p>{t("footer line 2")}</p>©{new Date().getFullYear()} Created by Anna Lai
    </Footer>
  );
};
export default FoFooter;
