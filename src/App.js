import React from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFoundBlock from "./components/NotFoundBlock";
import Cart from "./pages/Cart";

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Cart />} path="/cart" />
            <Route element={<NotFoundBlock />} path="*" />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
