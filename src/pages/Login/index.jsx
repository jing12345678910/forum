import { useState, useEffect } from "react";
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

  const onFinish = async (values) => {
    try {
      const { account, password, remember } = values;
      const { token } = await userApi.login({ account, password });
      if (token) {
        setToken(token);
        setMyToken(token);
        success();
      }
      if (remember) {
        setAccount(account);
      } else {
        removeAccount(account);
      }
    } catch (err) {
      console.error(err);
      error();
    }
  };
  useEffect(() => {
    if (myToken) {
      navigate("/");
    }
  }, [myToken, navigate]);
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
                  // message: "Please input your Password!",
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
              <Checkbox>{t("rememberMe")}</Checkbox>
              <a href="#">{t("forgetPassword")}</a>
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
