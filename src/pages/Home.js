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
import { getPost, setPost, } from "../utils/localStorage";

const { Sider } = Layout;

const Home = () => {
  const [showLogin, setLogin] = useState(false);
  const [member, setMember] = useState(null);
  const [postData, setPostData] = useState([]);

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
    const getPost = async () => {
      //1.拿API資料
      try {
        const data = await homeApi.getPostData();
        //2.存取狀態
        setPostData(data); //改變畫面狀態
        setPost(data);

        console.log(data);
      } catch (error) {
        console.error("獲取會員資料錯誤", error);
      }
    };
    getMember();
    getPost();
  }, []);

  const handleAddPost=(newData)=>{
    // //調用新增資料的函式
    // addPost(newData);
    //更新狀態  //4.響應式數據修改=>畫面重渲染
    setPostData([...postData, newData]);
  };
  return (
    <Layout>
      <Sider>
        <FoSider />
      </Sider>
      <Layout className="main">
        <FoHeader
          onLoginButtonClick={() => setLogin(!showLogin)}
          handleAddPost={handleAddPost}
        />
        <FoHomeContent postData={postData} />
        <FoFooter />
      </Layout>
      {showLogin && <Login />}
    </Layout>
  );
};
export default Home;
