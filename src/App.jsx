import { useState } from "react";
import Data from "./components/Data.jsx";
import Header from "./components/Header.jsx";
import Sort from "./components/Sort.jsx";

export default function App() {

  return (
    <>
      <Header />
      <h1>Sightguide</h1>
      <Data />
    </>
  );
}