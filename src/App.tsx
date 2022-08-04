import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";

const NotFoundBlock = React.lazy(() => import("./components/NotFoundBlock"));
const Cart = React.lazy(() => import("./pages/Cart"));
const FullPizza = React.lazy(() => import("./pages/FullPizza"));

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route element={<Home />} path="" />
        <Route
          element={
            <Suspense fallback={<div>Идет загрузка данных...</div>}>
              <Cart />
            </Suspense>
          }
          path="cart"
        />
        <Route
          element={
            <Suspense fallback={<div>Идет загрузка данных...</div>}>
              <NotFoundBlock />
            </Suspense>
          }
          path="*"
        />
        <Route
          element={
            <Suspense fallback={<div>Идет загрузка данных...</div>}>
              <FullPizza />
            </Suspense>
          }
          path="pizza/:id"
        />
      </Route>
    </Routes>
  );
};

export default App;
