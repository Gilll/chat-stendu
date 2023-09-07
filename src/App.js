import React from "react";
import "./styles/scss/style.scss";
import 'antd/dist/antd.min.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {
  return (
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
  );
}

export default App;
