import React from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";
import Home from "./pages/Home";
import NotFoundBlock from "./components/NotFoundBlock";
import Cart from "./pages/Cart";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route element={<Home />} path="" />
        <Route element={<Cart />} path="cart" />
        <Route element={<NotFoundBlock />} path="*" />
      </Route>
    </Routes>
  );
}

export default App;
