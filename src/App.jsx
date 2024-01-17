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
      {/* <Header/> */}
        <h1 className=" p-11   font-Poppins  sm:text-3x1 md:text-6xl ">Sightguide</h1>
        
        {loading ? (
        <p>Loading...</p>
        ) : ( <ListView />)}
      <Footer />
    </>
  );
}
