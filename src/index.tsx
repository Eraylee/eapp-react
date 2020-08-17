import React from "react";
import ReactDOM from "react-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/react";
import App from "./App";
Sentry.init({
  dsn:
    "https://52e6034bc12b44a080cc55989e743e2a@o434992.ingest.sentry.io/5392675",
});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
