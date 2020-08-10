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
import { setTabs, SetTabs } from "./pages/Layout/action";
import { TabItem } from "./pages/Layout/reducer";

function App() {
  useEffect(() => {
    const userJSON = localStorage.getItem("USER_INFO");
    const tabsJSON = localStorage.getItem("GLOBAL_TABS");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      store.dispatch(addUser(user));
    }
    // console.log(store.getState()?.layoutReducer?.tabs?.length < 1)
    // if (tabsJSON && store.getState()?.layoutReducer?.tabs?.length < 1) {
    //   const tabs = JSON.parse(tabsJSON);
    //   store.dispatch<any>(setTabs(tabs));
    // }
    // store.subscribe(() =>{
    //   const state =  store.getState()
    // });
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
