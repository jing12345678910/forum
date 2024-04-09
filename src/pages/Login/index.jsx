import { useState, useEffect } from "react";
import { homeApi } from "@/api/module/home";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Flex, Checkbox, Form, Input, message } from "antd";
import { useTranslation } from "react-i18next";
import { userApi } from "@/api/module/user";
import FoLayout from "@/components/FoLayout";
import main_picture from "@/assets/images/srcImages/main-picture.jpg";
import FoBreadcrumb from "@/components/FoBreadcrumb";
import {
  setToken,
  getToken,
  setAccount,
  removeAccount,
} from "@/utils/localStorage";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState(null);

  //定義myToken狀態 初始值為getToken()從local storage中獲取的 token
  const [myToken, setMyToken] = useState(getToken());

  const breadItems = [
    {
      title: t("home"),
    },
    {
      title: t("login"),
    },
  ];

  const success = () => {
    message.success("登入成功", 1);
  };
  const error = () => {
    message.error("登入失敗", 1);
  };

  //表單提交時執行
  const onFinish = async (values) => {
    setLoading(true);
    try {
      //從表單值中獲取帳號、密碼和是否記住登入狀態
      const { account, password, remember } = values;
      //userApi.login() 方法向後端發送請求進行登入
      const { token } = await userApi.login({ account, password });
      // 檢查獲取的 token 是否有效
      if (token && token !== "") {
        //將拿到的 token 存儲到 local storage 中
        setToken(token);
        //myToken狀態改變
        setMyToken(token);
        success();
        if (remember) {
          setAccount(account);
        } else {
          removeAccount(account);
        }
        //登入成功後跳轉到首頁
        navigate("/");
      } else {
        // // 登入失敗，清除 token
        // setToken(null);
        // //myToken狀態改變
        // setMyToken(null);
        error();
      }
    } catch (err) {
      console.error(err);
      error();
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const getMember = async () => {
      try {
        const data = await homeApi.getMember();
        // 確保 data 存在
        if (data) {
          console.log(data);
          setMember(data);
        }else{
          console.error("獲取會員資料錯誤：無效的數據結構", data);
        }
      } catch (error) {
        console.error("獲取會員資料錯誤", error);
      }
    };
    getMember();
  }, []);

  // useEffect(() => {
  //   if (myToken) {
  //     navigate("/");
  //   }
  //   //navigate雖然不會變化 但是加入到依賴項可以消除React警告
  // }, [myToken, navigate]);
  return (
    <FoLayout>
      <FoBreadcrumb items={breadItems} />
      <Flex
        align="center"
        justify="space-between"
        style={{ height: "100%", padding: "0 200px" }}
      >
        <img
          src={main_picture}
          alt="主圖"
          width="500"
          style={{ borderRadius: "80px" }}
        />
        <Flex vertical align="center" justify="center">
          <h1>{t("login")}</h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="account"
              rules={[
                {
                  required: true,
                  message: "請輸入帳號!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={t("CommonlyUsedEmails")}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "請輸入密碼!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={t("password")}
              />
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              style={{ textAlign: "center" }}
            >
              <div>
                <Checkbox>{t("rememberMe")}</Checkbox>
                <a href="#">{t("forgetPassword")}</a>
              </div>
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                {t("login")}
              </Button>
              {t("or")}
              <a href="/signup"> {t("signup")}</a>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </FoLayout>
  );
};
export default Login;
