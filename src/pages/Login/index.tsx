import React from "react";
import { Form, Input, Button, Card } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

import "./style.less";
import { useDispatch } from "react-redux";
import { login } from "./store";
import { useNavigate, useLocation } from "react-router-dom";

const Login: React.FC = () => {
  const nav = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogin = async (values: any) => {
    const res = await dispatch(login(values));
    if (!!res) {
      const redirectUrl =
        (location?.state as any)?.from?.pathname || "/dashboard";
      nav(redirectUrl);
    }
  };

  return (
    <div className='login-page-root'>
      <Card bordered={false}>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{ username: "", password: "" }}
          onFinish={handleLogin}
        >
          <Form.Item name='username' rules={[{ required: true }]}>
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='用户名'
            />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true }]}>
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='密码'
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Button type='primary' htmlType='submit' block>
            登录
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
