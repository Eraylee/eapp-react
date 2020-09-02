import React from "react";
import { Menu, Dropdown, Button, Select, Space, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Login/store";
import { useNavigate } from "react-router-dom";
import { AppState } from "@/store";
import { Profile } from "./Profile";
import { UpdatePassword } from "./UpdatePassword";

import darkVars from "@/themes/dark.json";
import lightVars from "@/themes/light.json";
import { Theme, ThemeName, setTheme } from "./store";
import { useModal } from "@/hooks";

const Option = Select.Option;

export default () => {
  const { user } = useSelector((state: AppState) => state.loginReducer);
  const { theme } = useSelector((state: AppState) => state.globalReducer);
  const { visible, confirmLoading, open, ok, close } = useModal();
  const {
    visible: updatePswVisible,
    confirmLoading: updatePswConfirmLoading,
    open: updatePswOpen,
    ok: updatePswOk,
    close: updatePswClose,
  } = useModal();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    nav("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  const handleChangeCurrentTheme = (name: ThemeName) => {
    let vars = name === ThemeName.LIGHT ? lightVars : darkVars;
    const theme: Theme = {
      vars,
      name,
    };
    localStorage.setItem("APP_THEME", JSON.stringify(theme));
    dispatch(setTheme(theme));
    window.less.modifyVars(vars).catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  const menu = (
    <Menu>
      <Menu.Item onClick={() => open()}>修改个人信息</Menu.Item>
      <Menu.Item onClick={() => updatePswOpen()}>修改密码</Menu.Item>
      <Menu.Item onClick={handleLogout}>退出登录</Menu.Item>
    </Menu>
  );
  return (
    <>
      <Card bordered={false} className="header-layout">
        <Space>
          <Select
            style={{ width: 100 }}
            value={theme.name}
            onChange={handleChangeCurrentTheme}
          >
            <Option value={ThemeName.LIGHT}>亮色</Option>
            <Option value={ThemeName.DARK}>暗色</Option>
          </Select>
          <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <Button>{user.nickname}</Button>
          </Dropdown>
        </Space>
      </Card>
      <Profile
        visible={visible}
        confirmLoading={confirmLoading}
        onClose={close}
        onOk={ok}
      />
      <UpdatePassword
        visible={updatePswVisible}
        confirmLoading={updatePswConfirmLoading}
        onClose={updatePswClose}
        onOk={updatePswOk}
      />
    </>
  );
};
