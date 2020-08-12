import React, { useCallback, useState } from "react";
import { Menu, Dropdown, Button, Select, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Login/action";
import { useNavigate } from "react-router-dom";
import { AppState } from "@/store";

import darkVars from "@/dark.json";
import lightVars from "@/light.json";

const Option = Select.Option;

export default () => {
  const { user } = useSelector((state: AppState) => state.loginReducer);
  const [themeName, setThemeName] = useState("light");
  // const [themeVars, setThemeVars] = useState(lightVars);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleLogout = useCallback(() => {
    dispatch(logout());
    nav("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChangeCurrentTheme = useCallback((value) => {
    try {
      let vars = value === "light" ? lightVars : darkVars;
      vars = Object.assign(vars, { "@white": "#fff", "@black": "#000" });
      localStorage.setItem("APP-THEME", JSON.stringify(vars));
      localStorage.setItem("THEME_NAME", value);
      console.log(window.less);
      window.less.modifyVars(vars).catch((error) => console.error(error));
      setThemeName(value);
    } catch (error) {
      console.error(error);
    }
  }, []);
  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout}>退出登录</Menu.Item>
    </Menu>
  );

  return (
    <div className="header-layout">
      <Space>
        <Select
          style={{ width: 80 }}
          value={themeName}
          onChange={handleChangeCurrentTheme}
        >
          <Option value="light">light</Option>
          <Option value="dark">dark</Option>
        </Select>
        <Dropdown overlay={menu} placement="bottomCenter" arrow>
          <Button>{user.nickname}</Button>
        </Dropdown>
      </Space>
    </div>
  );
};
