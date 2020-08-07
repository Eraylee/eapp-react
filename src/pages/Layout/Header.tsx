import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { Immutable } from "immer";
import { User } from "@/api/types";

interface HeaderLayoutProps {
  user: Immutable<Partial<User>>;
}

export const HeaderLayout = ({ user }: HeaderLayoutProps) => {
  const menu = (
    <Menu>
      <Menu.Item>退出登录</Menu.Item>
    </Menu>
  );

  return (
    <div className="header-layout">
      <Dropdown overlay={menu} placement="bottomCenter" arrow>
        <Button>{user.nickname}</Button>
      </Dropdown>
    </div>
  );
};
HeaderLayout.defaultProps = {
  user: {},
} as HeaderLayoutProps;

export default HeaderLayout;
