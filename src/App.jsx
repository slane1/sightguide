import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from './contexts/DataContext';
// Import von Components
import Header from "./components/Header.jsx";
import ListView from "./components/ListView.jsx"
import Footer from "./components/Footer.jsx";

export default function App() {
  const { loading } = useContext(DataContext);

  return (
    <>
      <Header />
      <h1 className="text-black">Sightguide</h1>
      {loading ? (
      <p>Loading...</p>
      ) : ( <ListView />)}
      <Footer />
    </>
  );
}
