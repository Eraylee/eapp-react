import React from "react";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import LocaleProvider from "rsuite/lib/IntlProvider";
import zhCN from "rsuite/lib/IntlProvider/locales/zh_CN";
import "@/assets/styles/global.less";

function App() {
  return (
    <IntlProvider locale="zh">
      <LocaleProvider locale={zhCN}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </LocaleProvider>
    </IntlProvider>
  );
}

export default App;
