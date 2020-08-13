import React, { useCallback, useEffect } from "react";
import { Menu as AMenu, Card } from "antd";
import { MenuTypes, Menu } from "@/api/apis/system";
import { useNavigate } from "react-router-dom";

import * as icons from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@/store";
import { getMenuTree, addTab, setActiveKey } from "./action";
import { Immutable } from "immer";
import { ThemeName } from "./reducer";

const { SubMenu, Item } = AMenu;

const getIcon = (iconType: string) => {
  return React.createElement((icons as any)[iconType]);
};

export interface SiderLayoutProps {
  themeName: ThemeName;
}

const SiderLayout = ({ themeName }: SiderLayoutProps) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMenuTree());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = useCallback(
    (params: Immutable<Menu>) => () => {
      dispatch(
        addTab({
          title: params.name,
          key: String(params.id),
          path: params.path,
        })
      );
      dispatch(setActiveKey(String(params.id)));
      nav(params.path);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const { menus } = useSelector((state: AppState) => state.layoutReducer);
  return (
    <Card bordered={false} className="layout-sider" bodyStyle={{ padding: 0 }}>
      <div className="logo">
        <p>ERAYLEE</p>
      </div>
      <AMenu mode="inline" theme={themeName}>
        {menus.map((v) =>
          v.type === MenuTypes.LAYOUT ? (
            <SubMenu key={v.id} title={v.name} icon={getIcon(v.icon)}>
              {v.children?.map((i) => (
                <Item
                  onClick={handleClick(i)}
                  key={i.id}
                  icon={getIcon(i.icon)}
                >
                  {i.name}
                </Item>
              ))}
            </SubMenu>
          ) : (
            <Item onClick={handleClick(v)} key={v.id} icon={getIcon(v.icon)}>
              {v.name}
            </Item>
          )
        )}
      </AMenu>
    </Card>
  );
};
SiderLayout.defaultProps = {
  themeName: ThemeName.LIGHT,
} as SiderLayoutProps;
export default SiderLayout;
