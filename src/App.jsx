import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "./contexts/DataContext";
import ListView from "./components/ListView.jsx";
import Footer from "./components/Footer.jsx";
import { Route, Routes } from "react-router-dom";
import Detail from "./components/Detail.jsx";

export default function App() {
  const { loading } = useContext(DataContext);

  return (
    <>
      <h1 className="p-11 font-Poppins sm:text-3x1 md:text-6xl">Sightguide</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path=":itemPath" element={<Detail />} />
        </Routes>
      )}
      <Footer />
    </>
  );
}
