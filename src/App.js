import React from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFoundBlock from "./components/NotFoundBlock";
import Cart from "./pages/Cart";

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Routes>
          <Route element={<Home searchValue={searchValue} />} path="/" />
          <Route element={<Cart />} path="/cart" />
          <Route element={<NotFoundBlock />} path="*" />
        </Routes>
      </div>
    </div>
  );
}

export default App;
