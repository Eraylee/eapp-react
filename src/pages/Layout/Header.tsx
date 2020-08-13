import React, { useCallback } from "react";
import { Menu, Dropdown, Button, Select, Space, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Login/action";
import { useNavigate } from "react-router-dom";
import { AppState } from "@/store";

import darkVars from "@/dark.json";
import lightVars from "@/light.json";
import { Theme, ThemeName, Locale } from "./reducer";
import { setTheme, setLocale } from "./action";
import { useLocale } from "@/locales";

const Option = Select.Option;

export default () => {
  const { user } = useSelector((state: AppState) => state.loginReducer);
  const { theme, locale } = useSelector(
    (state: AppState) => state.layoutReducer
  );
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleLogout = useCallback(() => {
    dispatch(logout());
    nav("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { formatMessage } = useLocale();
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
  const handleChangeLocate = useCallback((v) => {
    dispatch(setLocale(v));
  }, []);
  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout}>退出登录</Menu.Item>
    </Menu>
  );
  return (
    <Card bordered={false} className="header-layout">
      <Space>
        <Select
          style={{ width: 100 }}
          value={locale}
          onChange={handleChangeLocate}
        >
          <Option value={Locale.ZH}>中文</Option>
          <Option value={Locale.EN}>英文</Option>
        </Select>

        <Select
          style={{ width: 100 }}
          value={theme.name}
          onChange={handleChangeCurrentTheme}
        >
          <Option value="light">{formatMessage({ id: "theme.light" })}</Option>
          <Option value="dark">{formatMessage({ id: "theme.dark" })}</Option>
        </Select>
        <Dropdown overlay={menu} placement="bottomCenter" arrow>
          <Button>{user.nickname}</Button>
        </Dropdown>
      </Space>
    </Card>
  );
};
