import "../mock/mockServer";
import "../styles/Home.css";
import React, { useState, useEffect } from "react";

import { I18nextProvider, t } from "react-i18next";
import { homeApi } from "../api/module/home";
import { Layout } from "antd";

import FoHeader from "../components/FoHeader";
import FoSider from "../components/FoSider";
import FoHomeContent from "../components/FoHomeContent";
import FoFooter from "../components/FoFooter";
import Login from "./Login";

const { Sider } = Layout;

const Home = () => {
  const [showLogin, setLogin] = useState(false);
  const [member, setMember] = useState(null);
  useEffect(() => {
    const getMember = async () => {
      try {
        const data = await homeApi.getMember();
        console.log(data);
        setMember(data);
      } catch (error) {
        console.error("獲取會員資料錯誤", error);
      }
    };
    getMember();
  }, []);

  return (
    <Layout>
      <Sider>
        <FoSider />
      </Sider>
      <Layout className="main">
        <FoHeader onLoginButtonClick={() => setLogin(!showLogin)} />
        <FoHomeContent />
        <FoFooter />
      </Layout>
      {showLogin && <Login />}
    </Layout>
  );
};
export default Home;
