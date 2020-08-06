import React, { useCallback } from "react";
import { Menu as AMenu } from "antd";
import { Menu, MenuTypes } from "@/api/types";
import { useNavigate } from "react-router-dom";
const { SubMenu, Item } = AMenu;

interface MenuLayoutProps {
  menus: Menu[];
}

const MenuLayout = ({ menus }: MenuLayoutProps) => {
  const nav = useNavigate();
  const handleClick = useCallback(
    (path: string) => () => {
      nav(path);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <AMenu defaultSelectedKeys={["1"]} mode="inline">
      {menus.map((v) =>
        v.type === MenuTypes.LAYOUT ? (
          <SubMenu key={v.id} title={v.name}>
            {v.children?.map((i) => (
              <Item onClick={handleClick(i.path)} key={i.id}>
                {i.name}
              </Item>
            ))}
          </SubMenu>
        ) : (
          <Item onClick={handleClick(v.path)} key={v.id}>
            {v.name}
          </Item>
        )
      )}
    </AMenu>
  );
};

MenuLayout.defaultProps = {
  menus: [],
} as MenuLayoutProps;

export default MenuLayout;
