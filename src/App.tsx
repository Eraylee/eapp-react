import React, { useEffect } from "react";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import zhCN from "antd/es/locale/zh_CN";
import { store } from "./store";
import { setUser } from "./pages/Login/action";
import "@/styles/global.less";
import { setTheme } from "./pages/Layout/action";
import { Theme } from "./pages/Layout/reducer";

function App() {
  useEffect(() => {
    const userJSON = localStorage.getItem("USER_INFO");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      store.dispatch(setUser(user));
    }
    const themeJSON = localStorage.getItem("APP_THEME");
    if (themeJSON) {
      const theme: Theme = JSON.parse(themeJSON);
      store.dispatch(setTheme(theme));
      window.less.modifyVars(theme.vars).catch((error) => console.error(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Provider store={store}>
      <IntlProvider locale='zh'>
        <ConfigProvider locale={zhCN}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </ConfigProvider>
      </IntlProvider>
    </Provider>
  );
}

export default App;
