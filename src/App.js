import React from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";
import Home from "./pages/Home";
import NotFoundBlock from "./components/NotFoundBlock";
import Cart from "./pages/Cart";
import MainLayout from "./layouts/MainLayout";
import FullPizza from "./pages/FullPizza";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route element={<Home />} path="" />
        <Route element={<Cart />} path="cart" />
        <Route element={<NotFoundBlock />} path="*" />
        <Route element={<FullPizza />} path="pizza/:id" />
      </Route>
    </Routes>
  );
}

export default App;
