import React, { useCallback } from "react";
import { Menu, Dropdown, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Login/action";
import { useNavigate } from "react-router-dom";
import { AppState } from "@/store";

export default () => {
  const { user } = useSelector((state: AppState) => state.loginReducer);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleLogout = useCallback(() => {
    dispatch(logout());
    nav("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout}>退出登录</Menu.Item>
    </Menu>
  );

  return (
    <div className='header-layout'>
      <Dropdown overlay={menu} placement='bottomCenter' arrow>
        <Button>{user.nickname}</Button>
      </Dropdown>
    </div>
  );
};
