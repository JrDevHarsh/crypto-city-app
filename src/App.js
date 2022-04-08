import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coinpage from "./Components/Coinpage";
import CoinsTable from "./Components/CoinsTable";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<CoinsTable />} />
          <Route path="/coins/:id" element={<Coinpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
