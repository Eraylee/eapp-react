import React, { useCallback } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

import "./style.less";
import { LoginReq } from "@/api/types";
import { useDispatch } from "react-redux";
import { login } from "./action";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = useCallback(async (values: LoginReq) => {
    const res = dispatch(await login(values));
    if (res) {
      nav("/dashboard");
    }
  }, []);

  return (
    <div className='login-page-root'>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{ username: "", password: "" }}
        onFinish={handleLogin}
      >
        <Form.Item
          name='username'
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Username'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Password'
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Button type='primary' htmlType='submit' block>
          Log in
        </Button>
      </Form>
    </div>
  );
};

export default Login;
