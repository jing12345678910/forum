import "./styles/App.css";
import React, { useState } from "react";

import { Layout } from "antd";

import HeaderComponent from "./components/HeaderComponent";
import SiderComponent from "./components/SiderComponent";
import ContentComponent from "./components/ContentComponent";
import FooterComponent from "./components/FooterComponent";
import SignUpSignIn from "./pages/SignUpSignIn";

const { Sider } = Layout;

const App = () => {
  const [showSignUpSignIn, setSignUpSignIn] = useState(false);

  return (
    <Layout>
      <Sider>
        <SiderComponent />
      </Sider>
      <Layout className="main">
        <HeaderComponent
          onSignUpSignInButtonClick={() => setSignUpSignIn(!showSignUpSignIn)}
        />
        {showSignUpSignIn ? <SignUpSignIn /> : <ContentComponent />}

        <FooterComponent />
      </Layout>
    </Layout>
  );
};
export default App;
