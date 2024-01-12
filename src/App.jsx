import { useState } from "react";
import Data from "./components/Data.jsx";
import Header from "./components/Header.jsx";

export default function App() {

  return (
    <>
      <Header />
      <h1>Sightguide</h1>
      <Data />
    </>
  );
}