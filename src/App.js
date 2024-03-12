import "./mock/mockServer";
import "./styles/App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { I18nextProvider, t } from "react-i18next";
import { homeApi } from "./api/module/home";
import { Layout } from "antd";

import HeaderComponent from "./components/HeaderComponent";
import SiderComponent from "./components/SiderComponent";
import ContentComponent from "./components/ContentComponent";
import FooterComponent from "./components/FooterComponent";
import SignUpSignIn from "./pages/SignUpSignIn";

const { Sider } = Layout;

const App = () => {
  const [showSignUpSignIn, setSignUpSignIn] = useState(false);
  const [member, setMember] = useState(null);
  useEffect(() => {
    const getMember = async () => {
      try {
        const data = await homeApi.getMember();
        setMember(data);
      } catch (error) {
        console.error("獲取會員資料錯誤", error);
      }
    };
    getMember();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Sider>
                <SiderComponent />
              </Sider>
              <Layout className="main">
                <HeaderComponent
                  onSignUpSignInButtonClick={() =>
                    setSignUpSignIn(!showSignUpSignIn)
                  }
                />
                {showSignUpSignIn && <SignUpSignIn />}
                {!showSignUpSignIn && <Outlet />}

                <FooterComponent />
              </Layout>
            </Layout>
          }
        >
          <Route index element={<ContentComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
