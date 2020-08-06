import React from "react";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";

import zhCN from "antd/es/locale/zh_CN";
import "@/assets/styles/global.less";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <IntlProvider locale="zh">
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
