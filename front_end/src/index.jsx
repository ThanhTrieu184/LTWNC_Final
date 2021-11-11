import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./styles/index.css";
import App from "./App";
import { store } from "./redux/store";

const appRoot = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(appRoot, document.getElementById("root"));
