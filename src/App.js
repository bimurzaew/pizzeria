import React from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFoundBlock from "./components/NotFoundBlock";
import Cart from "./pages/Cart";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Cart />} path="/cart" />
            <Route element={<NotFoundBlock />} path="*" />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
