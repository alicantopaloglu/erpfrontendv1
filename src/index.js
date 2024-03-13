import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Protected from "./scenes/login/Protected";
import Logins from "./scenes/login/Logins";
import { BrowserRouter, Routes,Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
   
    <App/>
    
    </BrowserRouter>
  </React.StrictMode>
);
