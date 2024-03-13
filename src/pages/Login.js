import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MinusOutlined,
  PlusOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import {
  QRCode,
  Button,
  Breadcrumb,
  Layout,
  theme,
  Checkbox,
  Form,
  Input,
} from "antd";

import "../styles/SignUpSignIn.css";

const { Content } = Layout;
const onFinish = (values) => {
  console.log("Received values of form: ", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
// useEffect(() => {
//   if (token) {
//     Navigate("/dashboard");
//   }
// }, [token]);
const Login = () => {
  const navigate = useNavigate();
  const Params = useParams;
  const { id } = Params;
  // navigate(`./post/${id}`);

  const [size, setSize] = useState(160);
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
          <Breadcrumb.Item>首頁</Breadcrumb.Item>
          <Breadcrumb.Item>
            註冊<b>/</b>登入
          </Breadcrumb.Item>
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
            <div className="qr_code">
              <Button.Group
                style={{
                  marginBottom: 16,
                }}
              >
                <Button
                  onClick={decline}
                  disabled={size <= 48}
                  icon={<MinusOutlined />}
                >
                  Smaller
                </Button>
                <Button
                  onClick={increase}
                  disabled={size >= 300}
                  icon={<PlusOutlined />}
                >
                  Larger
                </Button>
              </Button.Group>
              <QRCode
                errorLevel="H"
                size={size}
                iconSize={size / 4}
                value="https://ant.design/"
                icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              />
            </div>
            <div className="input_form">
              <h1>註冊/登入</h1>
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
                      message: "Please input your Username!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="常用信箱"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密碼"
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>記得我</Checkbox>
                  </Form.Item>

                  <a className="login-form-forgot" href="#">
                    忘記密碼
                  </a>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    登入
                  </Button>
                  或 <a href="">註冊</a>
                </Form.Item>
              </Form>
            </div>
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};
export default Login;
