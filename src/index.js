import React from "react";
import ReactDOM from "react-dom/client";
import "./stylesheets/all.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { HashRouter } from "react-router-dom";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.REACT_APP_API_KEY}`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
