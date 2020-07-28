import React from "react";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import "@/assets/styles/global.less";

function App() {
  return (
    <IntlProvider locale='zh'>
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ConfigProvider>
    </IntlProvider>
  );
}

export default App;
