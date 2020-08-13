import React, { useCallback } from "react";
import { Form, Input, Button, Card } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

import "./style.less";
import { useDispatch } from "react-redux";
import { login } from "./action";
import { useNavigate, useLocation } from "react-router-dom";

const Login: React.FC = () => {
  const nav = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogin = useCallback(async (values) => {
    const res = await dispatch(login(values));
    if (!!res) {
      const redirectUrl =
        (location?.state as any)?.from?.pathname || "/dashboard";

      nav(redirectUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="login-page-root">
      <Card bordered={false}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ username: "", password: "" }}
          onFinish={handleLogin}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Log in
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
