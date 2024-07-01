import React, { useState } from "react";

import Header from "./components/Header";

import "./scss/app.scss";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

export const SerchContex = React.createContext("");

function App() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="wrapper">
      <SerchContex.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              {" "}
              <Route path="/" element={<Home searchValue={searchValue} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SerchContex.Provider>
    </div>
  );
}

export default App;
