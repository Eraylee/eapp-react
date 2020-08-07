import React, { useEffect } from "react";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";

import zhCN from "antd/es/locale/zh_CN";
import "@/assets/styles/global.less";
import { store } from "./store";
import { addUser } from "./pages/Login/action";

function App() {
  useEffect(() => {
    const userJSON = localStorage.getItem("USER_INFO");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      store.dispatch(addUser(user));
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
