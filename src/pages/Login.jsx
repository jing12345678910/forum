import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  Button,
  Breadcrumb,
  Layout,
  theme,
  Checkbox,
  Form,
  Input,
  message,
} from "antd";

import "../styles/Login.css";
import FoSider from "../components/FoSider";
import FoFooter from "../components/FoFooter";
import FoHeader from "../components/FoHeader";
import main_picture from "../srcImages/main-picture.jpg";
import { useTranslation } from "react-i18next";

const { Content, Sider } = Layout;

// useEffect(() => {
//   if (token) {
//     Navigate("/dashboard");
//   }
// }, [token]);
const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { t } = useTranslation();

  const navigate = useNavigate();
  const Params = useParams;
  const { id } = Params;
  // navigate(`./post/${id}`);

  const success = () => {
    messageApi.open({
      type: "success",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
    });
  };

  const [size, setSize] = useState(160);
  const onFinish = (values) => {
    const { username, password } = values;
    if (username.trim() === "123" || password.trim() === "") {
      messageApi.error("帳號和密碼不能為空");
      // messageApi.error("This is an error message");
    } else {
      messageApi.success("登入成功");
      // messageApi.success("This is a success message") ,
    }
  };
  const onFinishFailed = (errorInfo) => {
  };
  const increase = () => {
    setSize((prevSize) => {
      const newSize = prevSize + 10;
      if (newSize > 300) {
        return 300;
      }
      return newSize;
    });
  };

  const decline = () => {
    setSize((prevSize) => {
      const newSize = prevSize - 10;
      if (newSize < 48) {
        return 48;
      }
      return newSize;
    });
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider>
        <FoSider />
      </Sider>
      <div className="main">
        <FoHeader isLoginPage={true} />
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>{t("home")}</Breadcrumb.Item>
            <Breadcrumb.Item>{t("login")}</Breadcrumb.Item>
          </Breadcrumb>
          <div>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: "60vh",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
              className="container"
            >
              <div className="main_picture">
                <img
                  src={main_picture}
                  alt="主圖"
                  width="500"
                  style={{ borderRadius: "80px" }}
                />
              </div>
              <div className="input_form">
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
                    name="username"
                    rules={[
                      {
                        required: true,
                        // message: "Please input your Username!",
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
                  <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>{t("rememberMe")}</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="#">
                      {t("forgetPassword")}
                    </a>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      {t("login")}
                    </Button>
                    {t("or")} <a href="/signup"> {t("signup")}</a>
                  </Form.Item>
                </Form>
              </div>
            </Content>
            <FoFooter />
          </div>
        </Layout>
      </div>
    </Layout>
  );
};
export default Login;
