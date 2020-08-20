import React, { useEffect } from "react";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { setUser } from "./pages/Login/store";
import "@/styles/global.less";
import { setTheme, Theme } from "./pages/Layout/store";
import moment from "moment";
import "moment/locale/zh-cn";
import { useDispatch } from "react-redux";

moment.locale("zh-cn");

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const userJSON = localStorage.getItem("USER_INFO");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      dispatch(setUser(user));
    }
    const themeJSON = localStorage.getItem("APP_THEME");
    if (themeJSON) {
      const theme: Theme = JSON.parse(themeJSON);
      dispatch(setTheme(theme));
      window.less.modifyVars(theme.vars).catch((error) => console.error(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
