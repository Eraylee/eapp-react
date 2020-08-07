import React, { useCallback } from "react";
import { Menu as AMenu } from "antd";
import { Menu, MenuTypes } from "@/api/types";
import { useNavigate } from "react-router-dom";
import { Immutable } from "immer";
import * as icons from "@ant-design/icons";

const { SubMenu, Item } = AMenu;

interface MenuLayoutProps {
  menus: Immutable<Menu[]>;
}

const getIcon = (iconType: string) => {
  return React.createElement((icons as any)[iconType]);
};

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
    <AMenu mode="inline">
      {menus.map((v) =>
        v.type === MenuTypes.LAYOUT ? (
          <SubMenu key={v.id} title={v.name} icon={getIcon(v.icon)}>
            {v.children?.map((i) => (
              <Item
                onClick={handleClick(i.path)}
                key={i.id}
                icon={getIcon(i.icon)}
              >
                {i.name}
              </Item>
            ))}
          </SubMenu>
        ) : (
          <Item onClick={handleClick(v.path)} key={v.id} icon={getIcon(v.icon)}>
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
