import React, { useEffect } from "react";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
import { store } from "./store";
import { lacaleConfig } from "./locales";
import { setUser } from "./pages/Login/action";
import "@/styles/global.less";
import { setTheme } from "./pages/Layout/action";
import { Theme } from "./pages/Layout/reducer";
import moment from "moment";
import "moment/locale/zh-cn";

function App() {
  const { locale } = store.getState().layoutReducer;

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

  const getAntdLocale = () => {
    if (locale === "en_US") {
      return enUS;
    }
    return zhCN;
  };

  useEffect(() => {
    if (locale === "en_US") {
      moment.locale("en");
    } else if (locale === "zh_CN") {
      moment.locale("zh-cn");
    }
  }, [locale]);
  return (
    <Provider store={store}>
      <IntlProvider
        locale={locale.split("_")[0]}
        messages={lacaleConfig[locale]}
      >
        <ConfigProvider locale={getAntdLocale()}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </ConfigProvider>
      </IntlProvider>
    </Provider>
  );
}

export default App;
