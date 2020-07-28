import React from "react";
import { Button } from "antd";

import "./style.less";

const Login = (props: any) => {
  return (
    <div className='component-login-root'>
      <div className='card'>
        <h5>ERAYLEE</h5>
        <Button>登录</Button>
      </div>
    </div>
  );
};

export default Login;
