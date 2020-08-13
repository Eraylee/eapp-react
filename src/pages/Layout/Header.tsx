import React, { useCallback } from "react";
import { Menu, Dropdown, Button, Select, Space, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Login/action";
import { useNavigate } from "react-router-dom";
import { AppState } from "@/store";

import darkVars from "@/themes/dark.json";
import lightVars from "@/themes/light.json";
import { Theme, ThemeName } from "./reducer";
import { setTheme } from "./action";

const Option = Select.Option;

export default () => {
  const { user } = useSelector((state: AppState) => state.loginReducer);
  const { theme } = useSelector((state: AppState) => state.layoutReducer);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleLogout = useCallback(() => {
    dispatch(logout());
    nav("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChangeCurrentTheme = useCallback((name) => {
    let vars = name === ThemeName.LIGHT ? lightVars : darkVars;
    // vars = Object.assign(vars, { "@white": "#fff", "@black": "#000" });
    const theme: Theme = {
      vars,
      name,
    };
    localStorage.setItem("APP_THEME", JSON.stringify(theme));
    dispatch(setTheme(theme));
    window.less.modifyVars(vars).catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout}>退出登录</Menu.Item>
    </Menu>
  );
  return (
    <Card bordered={false} className='header-layout'>
      <Space>
        <Select
          style={{ width: 100 }}
          value={theme.name}
          onChange={handleChangeCurrentTheme}
        >
          <Option value={ThemeName.LIGHT}>亮色</Option>
          <Option value={ThemeName.DARK}>暗色</Option>
        </Select>
        <Dropdown overlay={menu} placement='bottomCenter' arrow>
          <Button>{user.nickname}</Button>
        </Dropdown>
      </Space>
    </Card>
  );
};
