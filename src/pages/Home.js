import "../mock/mockServer";
import "../styles/App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { I18nextProvider, t } from "react-i18next";
import { homeApi } from "../api/module/home";
import { Layout } from "antd";

import FoHeader from "../components/FoHeader";
import FoSider from "../components/FoSider";
import FoContent from "../components/FoContent";
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
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Layout>
            <Sider>
              <FoSider />
            </Sider>
            <Layout className="main">
              <FoHeader onLoginButtonClick={() => setLogin(!showLogin)} />
              <FoContent />
              <FoFooter />
            </Layout>
          </Layout>
        }
      />
      <Route exact path="/login" element={<Login />} />
    </Routes>
  );
};
export default Home;
